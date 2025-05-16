function loadLease(){

    // let node = $.docker.menu.getCurrentTabAttachNode();
    let node = local_node;

    $(function(){
        $("#imagesDg").iDatagrid({
            idField: 'ID',
            sortOrder:'asc',
            sortName:'Id',
            pageSize:50,
            queryParams:{all1:1},
            frozenColumns:[[
                {field: 'ID', title: '', checkbox: true},
                {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'center',
                    width: 210, formatter:leaseOperateFormatter},
                {field: 'Id', title: 'IMAGE ID', sortable: true,
                    formatter:$.iGrid.buildformatter([$.iGrid.templateformatter('{Id}'), $.iGrid.tooltipformatter()]),
                    width: 260},
                {field: 'Repository', title: 'REPOSITORY', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 220},
                {field: 'Tag', title: 'TAG', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 120},
            ]],
            onBeforeLoad:function (param){
                refreshLease(param)
            },
            columns: [[
                {field: 'Created', title: 'CREATED', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 180},
                {field: 'Size', title: 'SIZE', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 100},
                {field: 'LabelStr', title: 'LABELS', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 900}
            ]],
            onLoadSuccess:$.easyui.event.wrap(
                $.fn.iDatagrid.defaults.onLoadSuccess,
                function(data){
                    let dg = this;
                }
            ),
        });
    });
}

function leaseOperateFormatter(value, row, index) {
    let htmlstr = "";
    htmlstr += '<button class="layui-btn-yellowgreen layui-btn layui-btn-xs" onclick="inspectImage(\'' + index + '\', \'' + row.ID + '\')">View</button>';
    htmlstr += '<button class="layui-btn-blue layui-btn layui-btn-xs" onclick="createContainerFromImage(\'' + index + '\', \'' + row.ID + '\')">Run</button>';
    htmlstr += '<button class="layui-btn-gray layui-btn layui-btn-xs" onclick="removeLease(\'' + row.ID + '\')">Delete</button>';
    htmlstr += '<button class="layui-btn-orange layui-btn layui-btn-xs" onclick="tagLease(\'' + index + '\', \'' + row.ID + '\')">Tag</button>';

    return htmlstr;
}

function removePanel(){
    $('#layout').layout('remove', 'east');
}

function deleteBuild(){
    let node = local_node;

    $.app.confirm("您SureDelete所有的构建缓存？", function (response) {
        $.docker.request.build.delete(function(response){
            response.CachesDeleted = response.CachesDeleted||[];

            console.log(response.CachesDeleted);

            let msg = '构建缓存清理Success，Clear space{0}, Clear Build Cache{1}个'.format($.docker.utils.getSize(response.SpaceReclaimed), response.CachesDeleted.length);

            $.app.show(msg)

            reloadDg()
        }, node)
    })
}

function buildImage(){

    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>构建MirrorOptions</legend>
                    </fieldset>
                    <style>
                    .radiobutton.inputbox{
                        cursor: pointer;
                    }
                    </style>

                    <div style="margin-top:5px">
                            <div class="cubeui-row" style="margin-top: 5px">
                                <div class="cubeui-col-sm12" >
                                    <label class="cubeui-form-label" title="GitLibraryURI或HTTP/HTTPSContextURI。IfURIPoint单个文本Documentation，The contents of this file will be placed under the nameDockerfile_Other Organiser，and build images from this file。IfURIPointtarball，The daemon will download the file，其中的内容将用作构建的Context。IfURIPointtarball，And it\'s been assigneddockerfileParameters，则tarball内必须有一个具有相应Path的Documentation。">构建源Modalities:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-radiobutton" checked name="mode" 
                                            data-options="title:'从LocalUploadtarballDocumentation',
                                            onChange:function(checked){
                                                if(checked){
                                                    $('.upload_image_file').show();
                                                    $('.remote_image_url').hide();
                                                    
                                                    $('#import_file').filebox('enableValidation');
                                                    $('#import_file').filebox('resize');
                                                    $('#remote_uri').textbox('disableValidation');
                                                    
                                                }
                                            }
                                            " value="file" label1="LocalTarballDocumentation">
                                        <span style='line-height: 30px;padding-right:0px' title="从LocalUploadtarballDocumentation"><b>LocalTarballDocumentation</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input data-toggle="cubeui-radiobutton" name="mode"
                                            data-options="title:'从RemoteURIUploadtarballDocumentation',
                                            onChange:function(checked){
                                                if(checked){
                                                    $('.upload_image_file').hide();
                                                    $('.remote_image_url').show();
                                                    
                                                    $('#import_file').filebox('disableValidation');
                                                    $('#remote_uri').textbox('enableValidation');   
                                                    $('#remote_uri').textbox('resize');                                                 
                                                }
                                            }
                                            "
                                        value="url" label1="RemoteURI">            
                                        <span style='line-height: 30px;padding-right:0px' title="itLibraryURI或HTTP/HTTPSContextURI。IfURIPoint单个文本Documentation，The contents of this file will be placed under the nameDockerfile_Other Organiser，and build images from this file。IfURIPointtarball，The daemon will download the file，其中的内容将用作构建的Context。IfURIPointtarball，And it\'s been assigneddockerfileParameters，则tarball内必须有一个具有相应Path的Documentation"><b>RemoteURI</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>                        
                                    </div>
                                </div>
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">DockerfilePath:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="dockerfile"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'Generate contextDockerfile的Path。Default asDockerfile。'
                                                        "
                                        >
                                    </div>
                                </div>
                                             
                                <div class="upload_image_file cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">构建Mirror包:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-filebox" id="import_file" data-options="
                                            prompt:'必须是Use以下算法之一压缩的tarArchive：identity（No compression）、gzip、bzip2或xz。',
                                            buttonText: 'Select File',
                                            required:true,
                                            accept:'.tar',
                                            " style="width:100%">  
                                    </div>
                                </div>        
                                   
                                <div class="remote_image_url cubeui-col-sm12" style="margin-top: 5px;display:none">
                                    <label class="cubeui-form-label">LibraryURI:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" id="remote_uri" name="remote" data-options="
                                            prompt:'GitLibraryURI或HTTP/HTTPSContextURI。IfURIPoint单个文本Documentation，The contents of this file will be placed under the nameDockerfile_Other Organiser',                                            
                                            required:true,
                                            novalidate:true,
                                            " >  
                                    </div>
                                </div>  
                                                                          
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="以repos:tagFormat应用于图像的名称和可选Tag。If省略Tag，Assumes the default latest value。">MirrorTag:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="t"
                                               value=''
                                               data-options="
                                                        required:true,prompt:'以repos:tagFormat应用于图像的名称和可选Tag。If省略Tag，Assumes the default latest value。'
                                                        "
                                        >
                                    </div>
                                </div>   
                                       
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="要Add到/etc/hosts的额外Host">额外Host名:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="extrahosts"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'要Add到/etc/hosts的额外Host。'
                                                        "
                                        >
                                    </div>
                                </div> 
                                
                            </div> 
                            
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm3">
                                    <label class="cubeui-form-label" title="If selected；Detailed Output Generation；Uncheck；抑制Detailed Output Generation">Depression Details:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-switchbutton" checked 
                                            name="q" value="1" data-options="onText:'',offText:'',width:60">
                                    </div>
                                </div>
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm3">
                                    <label class="cubeui-form-label" title="If selected；生成Mirror时Use缓存；Uncheck；生成Mirror时不Use缓存">Use缓存:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-switchbutton" checked
                                            name="cache" value="1" data-options="onText:'',offText:'',width:60">
                                    </div>
                                </div>
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm3">
                                    <label class="cubeui-form-label" title="If selected；Success生成后Delete中间Containers。">Delete中间Containers:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-switchbutton" checked
                                            name="rm" value="1" data-options="onText:'',offText:'',width:60">
                                    </div>
                                </div>
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm3">
                                    <label class="cubeui-form-label" title="If selected；Even if it doesn\'t work，也应始终拆下中间Containers。">强制Delete:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-switchbutton"
                                            name="forcerm" value="1" data-options="onText:'',offText:'',width:60">
                                    </div>
                                </div>
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="要在Mirror上上Settings的任意键/值Label的元Data,Format为KEY1=VALUE1[ KEY2=VAVLUE2]">Label:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-tagbox" name="labels"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'键/值Label的元Data,Format为KEY1=VALUE1[ KEY2=VAVLUE2]。'
                                                        "
                                        >
                                    </div>
                                </div> 
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="String pair of variables at generation。User transfers these values during build。Docker将buildargsUsed for adoptionDockerfileRun指令Run的命令的EnvironmentContext，or for other purposesDockerfileVariable Extension in Command">构建期Parameters:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-tagbox" name="buildargs"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'构建期Parameters,Format为KEY1=VALUE1[,KEY2=VAVLUE2]。For example:，FOO=bar'
                                                        "
                                        >
                                    </div>
                                </div> 
                            </div> 
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="Target build phase">Target build phase:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="target"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'Target build phase。'
                                                        "
                                        >
                                    </div>
                                </div> 
                            </div> 
                            
<!--                            <div class="cubeui-row  {0}-build-image-progress" style="display: none">-->
<!--                                <div class="cubeui-col-sm11 cubeui-col-sm-offset1" style="margin-top: 5px">-->
<!--                                <div id="{0}-build-image-progress" data-toggle="cubeui-progressbar"></div>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm11 cubeui-col-sm-offset1 {0}-build-image-log" style="margin-top: 10px" >                                    
                                </div> 
                            </div>
                            
                    </div>
                </div>
        `;

    let id = Math.uuid();

    $.docker.utils.optionConfirm('Upload构建包进行Mirror构建', 'Selection构建包并Use构建包构建Mirror？', import_html.format(id),
        function(param, closeFn) {

            let data = {};

            if ($.extends.isEmpty(param.t)) {
                $.app.show("_Other Organiser构建Mirror的Mirror名称")
                return false;
            }

            data.dockerfile = $.extends.isEmpty(param.dockerfile, 'Dockerfile');

            data.t = $.extends.isEmpty(param.t, '');
            data.q = $.extends.isEmpty(param.t, false);
            data.nocache = $.extends.isEmpty(param.cache, 1)==1?false:true;
            data.rm = $.extends.isEmpty(param.rm, true);
            data.forcerm = $.extends.isEmpty(param.forcerm, false);
            data.target = $.extends.isEmpty(param.target, "");
            data.outputs = $.extends.isEmpty(param.outputs, "");

            let values = $.docker.utils.convert2ListParamValue(param.labels);
            //let labelstr = $.extends.isEmpty(param.labels, "");
            //let values = labelstr.split2(" ")

            if(!$.extends.isEmpty(values)){
                data.labels = $.docker.utils.getKeyValue(values);
                data.labels = $.extends.json.tostring(data.labels);
            }


            //let buildArgsStr = $.extends.isEmpty(param.buildargs, "");
            //values = buildArgsStr.split2(",")
            values = $.docker.utils.convert2ListParamValue(param.buildargs);

            if(!$.extends.isEmpty(values)){
                data.buildargs = $.docker.utils.getKeyValue(values);
                data.buildargs = $.extends.json.tostring(data.buildargs);
            }

            let buildFn = function(querydata, content){

                $('.{0}-build-image-log'.format(id)).empty()
                $('.{0}-build-image-log'.format(id)).append('<span>开始构建Mirror{0}....</span>'.format(querydata.t));
                $.app.showProgress('开始构建Mirror{0}....'.format(querydata.t));

                $.docker.request.image.build(function (json, xhr, state) {
                    console.log(json)
                    if(json){
                        if(!$.extends.isEmpty(json.stream)){
                            $('.{0}-build-image-log'.format(id)).append('<br>{0}'.format(json.stream));
                        }

                        if(!$.extends.isEmpty(json.status)){
                            $('.{0}-build-image-log'.format(id)).append('<br>{0}'.format(json.progress));
                        }

                        if(!$.extends.isEmpty(json.errorDetail)){
                            $('.{0}-build-image-log'.format(id)).append('<br><font color="red">{0}</font>'.format(json.errorDetail.message||json.errorDetail));
                        }
                        if(!$.extends.isEmpty(json.message)){
                            $('.{0}-build-image-log'.format(id)).append('<br><font color="red">{0}</font>'.format(json.message));
                        }
                    }

                }, node, content, querydata, function (xhr, status) {
                    //('#{0}-build-image-progress'.format(id)).progressbar('stopLoading');
                    //$('.{0}-build-image-progress'.format(id)).hide()

                    $.app.closeProgess();

                    if(xhr.status<400&&!this.ErrorMsg){
                        $.app.show('构建包进行Mirror构建{0}Success'.format(querydata.t.htmlEncode()));
                        reloadDg();
                    }else{
                        if(this.ErrorMsg){
                            $.app.show('构建包进行Mirror构建{0}Failed:{1}'.format(querydata.t.htmlEncode(), this.ErrorMsg));
                            $('.{0}-build-image-log'.format(id)).append('<br><font color="red">{0}</font>'.format('构建包进行Mirror构建{0}Failed:{1}'.format(querydata.t.htmlEncode(), this.ErrorMsg)));
                        }
                        else{
                            $.app.show('构建包进行Mirror构建{0}Failed'.format(querydata.t.htmlEncode()));
                            $('.{0}-build-image-log'.format(id)).append('<br><font color="red">{0}</font>'.format('构建包进行Mirror构建{0}Failed'.format(querydata.t.htmlEncode())));
                        }

                    }

                })
            }

            let mode = param.mode||'file';
            if(mode=='file'){
                let files = $('#import_file').filebox('files');
                console.log(files)

                if(files.length<1){
                    $.app.show("需要Selection进行Upload的构建包进行Mirror构建")
                    return false;
                }

                $.easyui.file.getReader(function(e){
                    console.log(e);
                    buildFn(data, this.result);

                },function(e){
                    console.log(e);
                },function(e){
                    console.log(e);
                },function(e){
                    console.log(e);
                },function(e){
                    console.log(e);
                },function(e){
                    console.log(e);
                }).readAsArrayBuffer(files[0])
            }else{
                if($.extends.isEmpty(param.remote)){
                    $.app.show("需要SelectionGitLibraryURI或HTTP/HTTPSContextURI")
                    return false;
                }

                data.remote = param.remote;
                buildFn(data, null);
            }

        }, function () {
            $('#{0}-build-image-progress'.format(id)).progressbar('stopLoading');
        }, 700, 850, null)
}

function createContainerAtImage(){

    createContainer(function (response, data) {
        reloadDg();
        $.app.confirm('Create ContainerSuccess, 是否跳转到Container management模块，Management of newly created containers？Selection“是”，Jump，Otherwise stop on the current page', function () {
            // $('#layout').layout('collapse', 'east');
            triggerNavMenuClick('ALL', 'containers');
            $('#layout').layout('collapse', 'east');
        });
    });
}

function createAndStartContainerAtImage(){

    createContainer(function(response, data) {
        let info = this;
        let node = local_node;
        reloadDg();

        if($.extends.isEmpty(response.Warnings)){

            $.app.show('Create Container{0}Success, 正在启动Containers'.format(response.Id));

            $.docker.request.container.start(function(){
                $.app.confirm('创建启动Containers{0}Success, 是否跳转到Container management模块，Management of newly created containers？Selection“是”，Jump，Otherwise stop on the current page'.format(response.Id), function () {
                    // $('#layout').layout('collapse', 'east');
                    triggerNavMenuClick('ALL', 'containers');
                    $('#layout').layout('collapse', 'east');
                });

                //$.app.show('Containers{0}启动Success'.format(response.Id));
                //reloadDg();
                //triggerNavMenuClick('ALL', 'containers');
                //$('#layout').layout('collapse', 'east');
            }, node, response.Id);
        }else{
            $.app.show('Create Container{0}Success, Warning message appears，Please start the container manually，{0}'.format(response.Warnings.join(",").htmlEncode()))
        }

    });

}

function openCreateContainerFromImagePanel(rowData){
    if(rowData == null){
        rowData = $.docker.utils.data.newContainer();
    }

    let data = rowData;
    let flag = 1;
    data.Flag = flag;

    removePanel();

    let east_layout_options = {
        region:'east',
        split:false,border:false,width:'100%',collapsed:true,
        iconCls:'fa fa-info-circle',
        collapsible:false,
        showHeader1:false,
        titleformat:'Create Container', title:'Create Container',
        headerCls:'border_right',bodyCls:'border_right',collapsible:true,
        footerHtml: $.templates(create_panel_buttons_html).render({Flag:flag,From:'image'}),
        render:function (panel, option) {

            let cnt = $($.templates(create_container_html).render(data));

            panel.append(cnt);
            $.parser.parse(cnt);

            $('#eastTabs').tabs({
                fit:true,
                border:false,
                tabPosition1:'bottom',
                narrow:true,
                pill:true,
            })

            $('#eastTabs').tabs('disableTab', 1);

            //$('#create_RestartPolicy').iCombobox('setValue', 'no');
        }
    }

    east_layout_options.onPanelClosed = function (option) {
        console.log("Close now");
        console.log(option);
    }

    $('#layout').layout('options').rowData = {};

    $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
}

function createContainerFromImage(idx, id){

    if($.extends.isEmpty(id)){
        let rows = $('#imagesDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅支持Selection一个MirrorCreate Container');
            return ;
        }

        if(rows.length==0){
            openCreateContainerFromImagePanel(null);
            return;
        }else{
            id = rows[0].ID;
        }
    }

    let node = local_node;

    $.docker.request.image.inspect(function (response){

        let data = $.docker.utils.data.newContainer();
        data.Healthcheck = {};

        data.Image = response.RepoTags[0];

        if(!$.extends.isEmpty(response.Config.ExposedPorts)){
            data.HostConfig.BindingPortMap = $.docker.utils.getPortBindingMap(response.Config.ExposedPorts);
        }

        openCreateContainerFromImagePanel(data)

    }, node, id)
}

function refreshLease(param){

    let pageSize = $.docker.utils.getPageRowsFromParam(param);

    let skip = $.docker.utils.getSkipFromParam(param);

    //let node = $.v3browser.menu.getCurrentTabAttachNode();
    let node = local_node;

    $.docker.request.image.list(function (response) {
        $('#imagesDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })
        
        refreshImageAndContainerInfo();
    }, node, skip, pageSize, param.all!=null, param.search_type, param.search_key, param.sort, param.order);
}

function _tagLease(id, repo, tag, fn){

    let node = local_node;

    let row = {
        ID:id,
        Repository:repo,
        Tag:tag
    }

    $.iDialog.openDialog({
        title: 'TagMirror',
        minimizable:false,
        id:'tagImgDlg',
        iconCls: 'fa fa-headphones',
        width: 600,
        height: 340,
        href:'./tag.html',
        render:function(opts, handler){
            let d = this;
            console.log("Open dialog");
            handler.render(row)
        },
        buttonsGroup: [{
            text: 'Tag',
            iconCls: 'fa fa-headphones',
            btnCls: 'cubeui-btn-orange',
            handler:'ajaxForm',
            beforeAjax:function(o){
                let t = this;

                o.ajaxData = $.extends.json.param2json(o.ajaxData);
                let info = o.ajaxData;

                $.app.confirm('SureTag当前Mirror为{0}:{1}'.format(info.fromImage, info.tag), function () {

                    $.docker.request.image.tag(function (response) {
                        $.app.show('Tag当前Mirror为{0}:{1}Success'.format(info.fromImage, info.tag))
                        reloadDg()

                        if(fn)
                            fn.call(t, row, info, response)
                    }, node, id, info.fromImage, info.tag)
                })

                return false;
            }
        }]
    })
}

function tagLease(index, leaseId) {
    let row = $('#imagesDg').datagrid('getRows')[index]

    _tagLease(row.ID, row.Repository, row.Tag)
}

function removeLease(leaseId) {

    let node = local_node;

    if($.extends.isEmpty(leaseId)){
        let rows = $('#imagesDg').datagrid('getChecked');

        if(rows.length == 0) {
            $.app.alert('请Selection需要Delete的Mirror')
        }else{
            $.docker.utils.deleteConfirm('DeleteMirror', '您确认要Delete当前想Selection的Mirror', function (param, closeFn){

                let ids = $.extends.collect(rows, function(r){
                    if(r.ID=='<none>:<none>'||r.ID=='<none>@<none>')
                        return r.Id;

                    return r.ID;
                });

                $.docker.request.image.deleteBulk(function(response){
                    let msg = '';
                    if(response.fail.length==0){
                        msg = 'DeleteSuccess，已经SuccessDelete'+response.ok.length+'个Mirror';
                    }else{
                        msg = '已经SuccessDelete'+response.ok.length+'个Mirror, FailedDelete'+response.fail.length+'个Mirror';
                    }

                    reloadDg()
                    closeFn()

                    $.app.show(msg)

                }, node, ids, param.force==="1", param.prune==="1")
            }, null, true)
        }

    }else{
        $.docker.utils.deleteConfirm('DeleteMirror', '您确认要Delete当前的Mirror', function (param, closeFn){
            $.docker.request.image.delete(function(response){

                let msg = 'DeleteSuccess，已经SuccessDelete'+response.length+'个Mirror';
                $.app.show(msg)

                reloadDg()
                closeFn()
            }, node, leaseId, param.force==="1", param.prune==="1")
        }, null,true)
    }
}

function reloadDg(){
    $('#imagesDg').datagrid('reload');
    $('#layout').layout('resize');
}

function emptyLease(){
    let node = local_node;
    let html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>Options</legend>
                    </fieldset>
                    <div style="margin-top:5px">      
                        <div class="cubeui-row">                              
                            <input data-toggle="cubeui-checkbox" name="dangling" value="1" label="">
                            <span style='line-height: 30px;padding-right:0px'><b>Dangling</b></span>
                        </div>
                        <div class="cubeui-row">
                            <span style='line-height: 30px;padding-right:0px'><b>清理指定MirrorLabel:</b>(Default Clean All)</span>
                        </div>
                        <div class="cubeui-row">
                            <span style='line-height: 20px;padding-right:0px;color: red'>labelFormat: label1=a,label2!=b(Not equal to),label!=...(没有Label)</span>
                        </div>
                        <div class="cubeui-row">
                            <input type="text" data-toggle="cubeui-textbox" name="labels"
                                   value='' data-options="required:false,prompt:'labelFormat: label1=a,label2!=b,label!=...'">
                        </div>
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('清理Mirror', 'Important Warning：Sure要清空所有未Use的Mirror，清理后Data卷Data将无法恢复', html,
        function(param, closeFn){

            $.docker.request.image.prune(function(response){
                let msg = 'Success清除{0}个Mirror，Recovery Space{1}'.format(response.Count, response.Size)

                closeFn();

                $.app.show(msg)
                reloadDg()
            }, node, param.labels, param.dangling==="1")
        }, null, 400)
}

function pushImage(id){
    if($.extends.isEmpty(id)){
        let rows = $('#imagesDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅支持Selection一个Mirror推送至Warehouse');
            return ;
        }

        if(rows.length==0){
            $.app.show('请Selection一个Mirror推送至Warehouse');
            return;
        }else{
            id = rows[0].ID;
        }
    }

    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>推送Mirror至WarehouseOptions</legend>
                    </fieldset>
                    <div style="margin-top:5px">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">Mirror名称:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="repos"
                                               value='{0}'
                                               data-options="
                                                        required:true,prompt:'Mirror名称，Select Fill；Like whatjoinsunsoft/docker-ui:latest'
                                                        "
                                        >
                                    </div>
                                </div>
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">WarehouseAddress:</label>
                                    <div class="cubeui-input-block">
                                    
                                        <input type="text" name="serveraddress" data-toggle="cubeui-combobox"
                                               value=''
                                               data-options="
                                                        onSelect:function(record){
                                                            console.log(record);
                                                            $('#push_username').textbox('setValue', record.Username);
                                                            $('#push_password').passwordbox('setValue', record.Password);
                                                        },
                                                        required:true,prompt:'MirrorWarehouseAddress，Format：https://index.docker.io/v1/ If不填写，As Defaultdocker hubWarehouse',
                                                        valueField:'ID',
                                                        textField:'Name',
                                                        data:$.docker.request.repos.getReposItem()
                                               ">
                                               
                                    <!--
                                        <input type="text" data-toggle="cubeui-textbox" name="serveraddress"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'MirrorWarehouseAddress，Format：https://index.docker.io/v1/ If不填写，As Defaultdocker hubWarehouse'
                                                        "
                                        >
                                        -->
                                    </div>
                                </div>
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">Username:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" id='push_username' name="username"
                                               value='{1}'
                                               data-options="
                                                        required:false,prompt:'LoginMirrorWarehouse的Username'
                                                        "
                                        >
                                    </div>
                                </div>
                               
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">Password:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-passwordbox" id='push_password' name="password"
                                               value='{2}'
                                               data-options="
                                                        required:false,prompt:'LoginMirrorWarehouse的用户Password'
                                                        "
                                        >
                                    </div>
                                </div>
                            </div> 
                    </div>
                </div>
        `;

    let username = $.app.localStorage.getItem("repos-docker-username", "");
    let password = $.app.localStorage.getItem("repos-docker-password", "");

    $.docker.request.image.inspect(function (response){

        if($.extends.isEmpty(response.RepoTags)){
            $.app.show("待推送Mirror名称和Label不正确，请先给该Mirror进行LabelOperation");
            return false;
        }

        $.docker.utils.optionConfirm('推送至MirrorWarehouse', 'Selection推送至MirrorWarehouse的推送Options？',
            import_html.format(response.RepoTags[0].htmlEncode(),username.htmlEncode(), password.htmlEncode()),
            function(param, closeFn){

                console.log(param)

                if($.extends.isEmpty(param.repos)){
                    $.app.show("_Other OrganiserMirror名称及Label")
                    return false;
                }

                let repos = $.docker.request.repos.getRepoById(node, param.serveraddress);

                if(repos == null){
                    $.app.show('没有找到对应的Warehouse信息');
                    return false;
                }

                param.serveraddress = repos.Endpoint;

                $.docker.request.image.push(function (json, xhr, status) {
                    console.log(json)
                }, node, param.repos, param.serveraddress, param.username, param.password, function () {
                    $.app.show('Mirror已经推送MirrorWarehouseSuccess');

                    // let key = $.extends.isEmpty(param.serveraddress, "default");

                    $.app.localStorage.saveItem("repos-docker-username", param.username);
                    $.app.localStorage.saveItem("repos-docker-password", param.password);

                    closeFn();
                    reloadDg()
                });

            }, null, 500);

    }, node, id);

}

var menuContextRow = null;

function pullImage(){
    let node = local_node;

    $.iDialog.openDialog({
        title: 'PullMirror',
        minimizable:false,
        id:'pullImgDlg',
        width: 600,
        height: 440,
        href:'./pull.html',
        render:function(opts, handler){
            let d = this;
            console.log("Open dialog");
            handler.render({})
        },
        leftButtonsGroup:[{
            text: '搜索Mirror',
            iconCls: 'fa fa-search',
            btnCls: 'cubeui-btn-blue',
            handler1:'ajaxForm',
            handler:function(o){

                let dlgObj = $.iDialog.findOutterFormJquery(this)
                let imageName = $(dlgObj).find("input[name='fromImage']").val()

                $.iDialog.openDialog({
                    title: '搜索Mirror',
                    minimizable:false,
                    id:'queryForm-search',
                    width: 1200,
                    height: 640,
                    href:'./search.html',
                    render:function(opts, handler){

                        handler.render({"imageName":imageName})

                        let params = {}

                        if(!$.extends.isEmpty(imageName)){
                            params.search = 1;
                            params.term = imageName;
                        }

                        $(function () {
                            $("#searchDg").iDatagrid({
                                idField: 'name',
                                sortOrder: 'desc',
                                sortName: 'star_count',
                                pageSize: 10,
                                queryParams:params,
                                onBeforeLoad:function (param){
                                    return refreshSearch(param)
                                },
                                onRowContextMenu:function(e, index, row){
                                    menuContextRow = row

                                    $('#searchImageMm').menu('show', {
                                        left: e.pageX,
                                        top: e.pageY
                                    });

                                    $.extends.stopPropagation(e);

                                    return false;
                                },
                                frozenColumns:[[
                                    {field: 'name', title: 'NAME', sortable: true,
                                        formatter:$.iGrid.tooltipformatter(),
                                        width: 300}
                                ]],
                                columns: [[
                                    {field: 'description', title: 'DESCRIPTION', sortable: true,
                                        formatter:$.iGrid.tooltipformatter(),width: 540},
                                    {field: 'star_count', title: 'STARS', sortable: true,
                                        formatter:$.iGrid.tooltipformatter(),width: 100},
                                    {field: 'official', title: 'OFFICIAL', sortable: true,
                                        formatter:$.iGrid.tooltipformatter(),width: 100},
                                    {field: 'automated', title: 'AUTOMATED', sortable: true,
                                        formatter:$.iGrid.tooltipformatter(),width: 120}
                                ]],
                            })
                        })
                    },
                })
            }
        }],
        buttonsGroup: [{
            text: 'PullMirror',
            iconCls: 'fa fa-plus-square-o',
            btnCls: 'cubeui-btn-orange',
            handler:'ajaxForm',
            beforeAjax:function(o){
                let t = this;

                o.ajaxData = $.extends.json.param2json(o.ajaxData);
                let info = o.ajaxData;

                console.log(info)

                let repos = $.docker.request.repos.getRepoById(node, info.repo);

                if(repos == null){
                    $.app.show('没有找到对应的Warehouse信息');
                    return false;
                }

                info.repo = repos.Endpoint;

                $.docker.request.image.pull(function (response) {
                    $.app.show('PullMirror{0}:{1}Success'.format(info.fromImage, info.tag))
                    reloadDg()
                }, node, info.repo, info.fromImage, info.tag, function(xhr, state){
                    console.log('onSend')
                    console.log(xhr)

                    if(state==1){
                        console.log('onSendOver')
                        $.app.show('pullMirrorRequest已经发送')
                        //$.iDialog.closeOutterDialog($(t))
                        //reloadDg()
                    }
                }, info.username, info.password)

                return false;
            }
        }]
    });
}

function loadImage(){

    let node = local_node;

    let load_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>加载Options</legend>
                    </fieldset>
                    <div style="margin-top:5px">
                            <div class="cubeui-row">                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">MirrorDocumentation:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-filebox" id="load_file" data-options="
                                            prompt:'Select From Local File System已Export的MirrortarDocumentation...',
                                            buttonText: 'Select File',
                                            accept:'.tar',
                                            " style="width:100%">  
                                    </div>
                                </div>
                            </div> 
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('Import', 'SelectionMirrorDocumentation加载Mirror？', load_html,
        function(param, closeFn){
            console.log(param)

            let files = $('#load_file').filebox('files');
            $.easyui.file.getReader(function(e){
                console.log(e);
                $.docker.request.image.import2(function (response) {
                    console.log(response);
                }, node, this.result, function(){
                    $.app.show('加载Success');
                    reloadDg()
                });
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            }).readAsArrayBuffer(files[0])

        }, null, 400);
}

function importImage(){

    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>ImportOptions</legend>
                    </fieldset>
                    <div style="margin-top:5px">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">Mirror名称:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" id="fromImage" name="fromImage"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'Mirror名称，Select Fill；Like whatjoinsunsoft/docker-ui'
                                                        "
                                        >
                                    </div>
                                </div>
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">TAG:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="tag"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'TAG，Select Fill；为空Use默认latest'
                                                        "
                                        >
                                    </div>
                                </div>
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">TarballDocumentation:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-filebox" id="import_file" data-options="
                                            prompt:'Select From Local File SystemTarballDocumentation...',
                                            buttonText: 'Select File',
                                            accept:'.tar',
                                            " style="width:100%">  
                                    </div>
                                </div>
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label">Remarks:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="message"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'Import的Remarks Information'
                                                        "
                                        >
                                    </div>
                                </div>
                            </div> 
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('Import', 'SelectiontarballDocumentationImportMirror？', import_html,
        function(param, closeFn){


            console.log(param)

            if($.extends.isEmpty(param.fromImage)){
                $.app.show("_Other Organiser新Mirror")
                return false;
            }

            param.tag = $.extends.isEmpty(param.tag, "latest");

            let files = $('#import_file').filebox('files');
            console.log(files)

            $.easyui.file.getReader(function(e){
                console.log(e);
                
                $.docker.request.image.import(function (response) {

                    $.app.show('ImportSuccess');
                    //closeFn();
                    reloadDg()

                }, node, this.result, param.fromImage, param.tag, param.message);

            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            },function(e){
                console.log(e);
            }).readAsArrayBuffer(files[0])

        }, null, 400);
}

function inspectImage(idx){
    showImagePanel(idx)
}
function showImagePanel(index){

    let node = local_node;
    let row = $('#imagesDg').datagrid('getRows')[index]
    let id = row.Id;

    $.docker.request.image.inspect(function (response){
        let rowData = response;
        rowData.Name = row.Name;

        $('#layout').layout('remove', 'east');

        let east_layout_options = {
            region:'east',
            split:false,border:false,width:'100%',collapsed:true,
            iconCls:'fa fa-info-circle',
            collapsible:false,
            showHeader1:false,
            titleformat:'{0}-Mirror信息'.format(row.Name, row.ID), title:'Mirror',
            headerCls:'border_right',bodyCls:'border_right',collapsible:true,
            footerHtml:`
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    _tagLease('{0}','{1}','{2}', function(){
                        inspectImage({3});
                    })
            },
            btnCls: 'cubeui-btn-orange',
            iconCls: 'fa fa-headphones'
        }">Tag</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                    pushImage('{0}');
                },
                extend: '#imagesDg-toolbar',
                btnCls: 'cubeui-btn-ivory',
                iconCls: 'fa fa-arrow-circle-up'
            }">推送Mirror</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){                    
                    createContainerFromImage({3}, '{0}');
            },
            btnCls: 'cubeui-btn-blue',
            iconCls: 'fa fa-superpowers'
        }">Create Container</a>
         <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    $('#layout').layout('collapse', 'east');
            },
            btnCls: 'cubeui-btn-red',
            iconCls: 'fa fa-close'
        }">Close</a>
        `.format(row.ID, row.Repository, row.Tag, index),
            render:function (panel, option) {
                let cnt = $($.templates(image_html_template).render(rowData));

                panel.append(cnt);
                $.parser.parse(cnt);

                $('#eastTabs').tabs({
                    fit:true,
                    border:false,
                    bodyCls1:'border_right_none,border_bottom_none',
                    tabPosition1:'bottom',
                    narrow:true,
                    pill:true,
                })

                $.docker.request.image.history(function (res){

                    $('#historysDg').iDatagrid({
                        pagination:false,
                        showHeader:true,
                        showFooter:true,
                        frozenColumns:[[
                            {field: 'Image', title: 'IMAGE', sortable: false,
                                formatter:$.iGrid.tooltipformatter(),width: 400},
                        ]],
                        data:res,
                        columns: [[
                            {field: 'CreatAt', title: 'CREATED', sortable: false,
                                formatter:$.iGrid.tooltipformatter(),
                                width: 180},
                            {field: 'CreatedBy', title: 'CREATED BY', sortable: false,
                                formatter:$.iGrid.tooltipformatter(),width: 550},
                            {field: 'SizeStr', title: 'SIZE', sortable: false,
                                formatter:$.iGrid.tooltipformatter(),width: 100},
                            {field: 'Comment', title: 'COMMENT', sortable: false,
                                formatter:$.iGrid.tooltipformatter(),width: 400}
                        ]]
                    })

                }, node, id);

                let json = $.extend({}, response.ORIG)
                $("#json").JSONView(json);
            }
        }

        $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
        let opts = $.iLayout.getLayoutPanelOptions('#layout',  'east');
        console.log(opts)


    }, node, id)
}

function pullImgFromMenu(){
    let row = menuContextRow;

    let node = local_node;

    $.docker.request.image.pull(function (response) {
        $.app.show('PullMirror{0}:{1}Success'.format(row.name, 'latest'))
        reloadDg()
    }, node, null, row.name, 'latest', function(xhr, state){
        console.log('onSend')
        console.log(xhr)

        if(state==1){
            console.log('onSendOver')
            $.app.show('pullMirror{0}:{1}Request已经发送'.format(row.name, 'latest'))
        }
    })

}

function setImgFromMenu(){
    let row = menuContextRow;
    $('#pullImgDlg').find('#fromImage').textbox('setValue', row.name)
    $.iDialog.closeDialog('queryForm-search')
}

function refreshSearch(p) {
    if(!p.search){
        return ;
    }

    if($.extends.isEmpty(p.term)){
        $.app.show('No filter conditions entered');
        return false;
    }

    let pageSize = $.docker.utils.getPageRowsFromParam(p);
    let skip = $.docker.utils.getSkipFromParam(p);

    let node = local_node;

    $.docker.request.image.search(function (response) {
        $('#searchDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })
    }, node, skip, pageSize,
        (p.is_official===null||p.is_official==='ALL')?null:p.is_official,
        (p.is_automated===null||p.is_automated=='ALL')?null:p.is_automated,
        p.stars===null?null:p.stars,
        p.term, p.sort, p.order);
}


let image_html_template = `
        <div data-toggle="cubeui-tabs" id='eastTabs'>
            <div title="Basic information"
                 data-options="id:'eastTab0',iconCls:'fa fa-headphones'">                 
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>Mirror信息</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ID:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Id}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">RepoTags:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>RepoTagStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">RepoDigests:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>RepoDigestStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Parent:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Parent}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Comment:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Comment}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">CreatAt:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>CreatAt}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                   
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">DockerVersion:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>DockerVersion}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Author:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Author}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Os:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Os}} {{>Architecture}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Size:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>SizeStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                   
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">LastTagTime:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>LastTagTimeStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                </div>          
                 
            </div>
            <div title="Build Information"
                 data-options="id:'eastTab1',iconCls:'fa fa-superpowers'">
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>Build Information</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ID:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Id}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Container:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Container}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Image:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ContainerConfig.Image}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Hostname:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ContainerConfig.Hostname}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Domainname:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ContainerConfig.Domainname}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">User:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ContainerConfig.User}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStdin:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.AttachStdin}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStdout:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.AttachStdout}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStderr:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.AttachStderr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">Tty:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.Tty}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">OpenStdin:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.OpenStdin}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">StdinOnce:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:ContainerConfig.StdinOnce}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">WorkingDir:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ContainerConfig.WorkingDir}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Env</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            {{for ContainerConfig.EnvList}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:value}}</span>
                                </div>
                            </div>
                            {{/for}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Cmd</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                            <div class="cubeui-row">
                                <span style='line-height: 20px;padding-right:0px;'>{{:ContainerConfig.CmdStr}}</span>
                            </div>
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Entrypoint</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            {{for ContainerConfig.EntrypointList}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:value}}</span>
                                </div>
                            </div>
                            {{/for}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Volume</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row" style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>源Data卷</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Objective</span>
                                </div>
                            </div>
                            {{for ContainerConfig.Volumes}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:src}}</span>
                                </div>
                            </div>
                            {{/for}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">ExposedPorts</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Port</span>
                                </div>
                            </div>
                            {{props ContainerConfig.ExposedPorts}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                </div>
                            </div>
                            {{/props}}
                        </div>
                    </div>
                
                    <fieldset>
                        <legend style="margin-bottom: 0px;">LabelOptions</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                            </div>
                            {{props ContainerConfig.Labels}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                    
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
            
            
            <div title="Configure信息" 
                 data-options="id:'eastTab2',iconCls:'fa fa-gear'">
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>Build Information</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ID:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Id}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Image:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.Image}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Hostname:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.Hostname}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Domainname:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.Domainname}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">User:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.User}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStdin:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.AttachStdin}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStdout:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.AttachStdout}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">AttachStderr:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.AttachStderr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">Tty:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.Tty}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">OpenStdin:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.OpenStdin}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">StdinOnce:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.StdinOnce}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">StopSignal:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:Config.StopSignal}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">WorkingDir:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.WorkingDir}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Env</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            {{for Config.EnvList}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:value}}</span>
                                </div>
                            </div>
                            {{/for}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Cmd</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                            <div class="cubeui-row">
                                <span style='line-height: 20px;padding-right:0px;'>{{:Config.CmdStr}}</span>
                            </div>
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Entrypoint</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            {{for Config.EntrypointList}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:value}}</span>
                                </div>
                            </div>
                            {{/for}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Volume</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row" style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>源Data卷</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Objective</span>
                                </div>
                            </div>
                            {{if Config.Volumes}}
                            {{for Config.Volumes}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:src}}</span>
                                </div>
                            </div>
                            {{/for}}
                            {{/if}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">ExposedPorts</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Port</span>
                                </div>
                            </div>
                            {{props Config.ExposedPorts}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                </div>
                            </div>
                            {{/props}}
                        </div>
                    </div>
                
                    <fieldset>
                        <legend style="margin-bottom: 0px;">LabelOptions</legend>
                    </fieldset>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                            </div>
                            {{props Config.Labels}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                        </div>
                    </div>
                    
                </div>
                
                 
            </div>
            
            <div title="Historical information" 
             data-options="id:'eastTab3',iconCls:'fa fa-history',fit:true, border:false">   
                <table id="historysDg"></table>
            </div>
            
            <div title="Json" 
             data-options="id:'eastTab4',iconCls:'fa fa-text-width',fit:true, border:false">   
                <div id="json" style="word-break:break-all!important;"></div>
            </div>
        </div>
        
`

function onActivated(opts, title, idx){
    console.log('Image onActivated')
    reloadDg();
    //refreshCharts();
}