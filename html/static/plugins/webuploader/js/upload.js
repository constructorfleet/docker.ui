var upfileGrid;
var state = 'pending';
var initfilesize = 0;
var md5value = "";
var isUpFile = false;//Decision是否有DocumentationUploadSuccess，来HintdialogConduct下部Operation
$(function () {
    upfileGrid = $("#upfileGrid").datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        nowrap: true,
        animate: false,
        border: false,
        fitColumns: true,
        singleSelect: false,
        idField: 'fileId',
        pagination: false,
        columns: [[
            {field: 'ck', checkbox: true},
            {title: 'fileId', field: 'fileId', hidden: true, width: 100},
            {title: 'DocumentationName', field: 'fileName', width: 230, fixed: true},
            {title: 'Documentation大小', field: 'fileSize', width: 80, fixed: true},
            {title: 'DocumentationAuthentication', field: 'validateMd5', width: 60, fixed: true},
            {
                title: 'Upload进度', field: 'progress', width: 180, fixed: true, formatter: function (value, rec) {
                var htmlstr = '<div class="cubeui-progressbar progressbar" style="width: 170px; height: 20px;" value="' + value + '" text="' + value + '%">' +
                    '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                    '<div class="progressbar-value" style="width: ' + value + '%; height: 20px; line-height: 20px;">' +
                    '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                    '</div>' +
                    '</div>';
                return htmlstr;
            }
            },
            {title: 'UploadStatus', field: 'fileState', width: 80, fixed: true},
        ]]
    });

    // 在DocumentationStartSend前做些异步Operation。做md5Authentication
    // WebUploader会等待此异步Operation完成后，StartSendDocumentation。
    WebUploader.Uploader.register({
        "before-send-file": "beforeSendFile"
    }, {
        beforeSendFile: function (file) {
            var task = new $.Deferred();
            (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                upfileGrid.datagrid('updateRow',
                    {
                        index: upfileGrid.datagrid('getRowIndex', file.id),
                        row: {validateMd5: (percentage * 100).toFixed(2) + "%"}
                    });
            }).then(function (val) {
                $.ajax({
                    type: "POST"
                    , url: "./upload/md5Validate.do"
                    , data: {
                        type: "md5Check", md5: val
                    }
                    , cache: false
                    , timeout: 3000
                    , dataType: "json"
                }).then(function (data, textStatus, jqXHR) {
                    if (data.isHave) {   //If exists，这BackFailed给WebUploader，表明该DocumentationNo needUpload
                        task.reject();
                        uploader.skipFile(file);
                        upfileGrid.datagrid('updateRow',
                            {
                                index: upfileGrid.datagrid('getRowIndex', file.id),
                                row: {fileState: "Seconds", progress: 100}
                            });
                    } else {
                        $.extend(uploader.options.formData, {md5: val});
                        task.resolve();
                    }
                }, function (jqXHR, textStatus, errorThrown) {    //任何形式的AuthenticationFailed，都Trigger重新Upload
                    task.resolve();
                });
            });
            return $.when(task);
        }
    });


    uploader = WebUploader.create({
        // No compressionimage
        resize: false,
        // swfDocumentationPath
        swf: '/static/webuploader/js/Uploader.swf',
        // DefaultDocumentation接收Services端。
        server: '/system/attachment/upload',
        // Select File的button。Optional。
        // 内部Based on当前Run是Create，MaybeinputElements，也Maybeflash.
        pick: '#chooseFile',
        fileSingleSizeLimit: 100 * 1024 * 1024,//单个Documentation大小
        accept: [{
            title: 'file',
            extensions: 'doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip',
            mimeTypes: '.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.gif,.jpg,.jpeg,.bmp,.png,.rar,.zip'
        }]
    });

    // 当有DocumentationAdd进来When
    uploader.on('fileQueued', function (file) {
        //var fileSize = tim.formatFileSize(file.size);
        var fileSize = file.size;
        var row = {
            fileId: file.id,
            fileName: file.name,
            fileSize: fileSize,
            validateMd5: '0%',
            progress: 0,
            fileState: "等待Upload"
        };
        upfileGrid.datagrid('insertRow', {
            index: 0,
            row: row
        });
    });

    // DocumentationUpload过程中Create进度条Real timeShow。
    uploader.on('uploadProgress', function (file, percentage) {
        upfileGrid.datagrid('updateRow',
            {index: upfileGrid.datagrid('getRowIndex', file.id), row: {progress: (percentage * 100).toFixed(2)}});
    });

    //DocumentationUploadSuccess
    uploader.on('uploadSuccess', function (file) {
        var rows = upfileGrid.datagrid("getRows");
        //UploadSuccessSettingscheckboxNot Available
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].fileId == file.id) {
                $("input[type='checkbox']")[i + 1].disabled = true;
            }
        }
        $("#removeUpFile").linkbutton("disable");
        upfileGrid.datagrid('updateRow',
            {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: 'UploadSuccess'}});
        isUpFile = true;
    });
    //DocumentationUploadFailed
    uploader.on('uploadError', function (file) {
        upfileGrid.datagrid('updateRow',
            {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: 'UploadFailed'}});
    });

    uploader.on('uploadComplete', function (file) {

    });

    uploader.on('uploadFinished', function () {//Success后

    });

    uploader.on('error', function (handler) {
        if (handler == 'F_EXCEED_SIZE') {
            tim.parentAlert('error', 'Upload的单个DocumentationI can\'tGreater than' + initfilesize + '。<br>Operation无法Conduct,Call the administrator if you need anything', 'error');
        } else if (handler == 'Q_TYPE_DENIED') {
            tim.parentAlert('error', 'Not permittedUpload此类Documentation!。<br>Operation无法Conduct,Call the administrator if you need anything', 'error');
        }
    });
});//$(function(){})End

/*从队列中移除Documentation*/
function removeFile(fileId) {
    var fileRows = upfileGrid.datagrid("getSelections");
    var copyRows = [];
    for (var j = 0; j < fileRows.length; j++) {
        copyRows.push(fileRows[j]);
    }
    for (var i = 0; i < copyRows.length; i++) {
        var index = upfileGrid.datagrid('getRowIndex', copyRows[i]);
        uploader.removeFile(copyRows[i].fileId, true);
        upfileGrid.datagrid('deleteRow', index);
    }
    upfileGrid.datagrid('clearSelections');
}

function uploadToServer() {
    if (uploader.getFiles().length <= 0) {
        tim.parentAlert('Hint', 'NothingUpload的Documentation!', 'error');
        return;
    }
    if (state === 'uploading') {
        uploader.stop();
    }
    else {
        uploader.upload();
    }
}

//InitializeUploadParameters
function initUpLoad(args) {
    var opts = {};
    if (args) {
        if (args.url != null && args.url != "") {
            opts.server = args.url;
        }
        if (args.size != null && args.size != "") {
            initfilesize = args.size;
            opts.fileSingleSizeLimit = args.size;
        }
        if (args.args != null && args.args != "") {
            opts.formData = args.args;
        }
        if (opts) {
            $.extend(uploader.options, opts);
        }
    }
}

function getSuccess() {
    return isUpFile;
}