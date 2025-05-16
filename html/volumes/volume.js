function loadLease(){

    // let node = $.docker.menu.getCurrentTabAttachNode();
    let node = local_node;

    $(function(){
        $("#volumesDg").iDatagrid({
            idField: 'ID',
            sortOrder:'asc',
            sortName:'Name',
            pageSize:50,
            frozenColumns:[[
                {field: 'ID', title: '', checkbox: true},
                {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'center',
                    width: 150, formatter:leaseOperateFormatter},
                {field: 'Name', title: 'VOLUME NAME', sortable: true,
                    formatter:$.iGrid.buildformatter([$.iGrid.templateformatter('{Name}'), $.iGrid.tooltipformatter()]),
                    width: 390},
            ]],
            onBeforeLoad:function (param){
                console.log(param)
                refreshLease(param)
            },
            columns: [[
                {field: 'Driver', title: 'DRIVER', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 90},
                {field: 'Scope', title: 'SCOPE', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 90},
                {field: 'Created', title: 'CREATED', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 220},
                {field: 'Mountpoint', title: 'MOUNT POINT', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 450},
                {field: 'LabelStr', title: 'LABELS', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 900},
                {field: 'OptionStr', title: 'Options', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 900}

            ]],
            onLoadSuccess:$.easyui.event.wrap(
                $.fn.iDatagrid.defaults.onLoadSuccess,
                function(data){
                }
            ),
        });
    });
}

function leaseOperateFormatter(value, row, index) {
    let htmlstr = "";
    htmlstr += '<button class="layui-btn-yellowgreen layui-btn layui-btn-xs" onclick="inspectLease(\'' + index + '\')">View卷</button>';
    htmlstr += '<button class="layui-btn-gray layui-btn layui-btn-xs" onclick="removeLease(\'' + row.ID + '\')">Delete卷</button>';

    return htmlstr;
}

function refreshLease(param){
    let pageSize = $.docker.utils.getPageRowsFromParam(param);
    
    let skip = $.docker.utils.getSkipFromParam(param);

    //let node = $.v3browser.menu.getCurrentTabAttachNode();
    let node = local_node;

    $.docker.request.volume.list(function (response) {
        $('#volumesDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })
    }, node, skip, pageSize, true, param.search_type, param.search_key, param.sort, param.order);
}

function removeLease(leaseId) {
    let node = local_node;

    if($.extends.isEmpty(leaseId)){
        let rows = $('#volumesDg').datagrid('getChecked');

        if(rows.length == 0) {
            $.app.alert('请SelectionYesDelete的租期')
        }else{
            $.docker.utils.deleteConfirm('Delete卷', '您Confirm要DeleteCurrent想Selection的Data卷', function (param, closeFn){

                let ids = $.extends.collect(rows, function(r){
                    return r.ID;
                });

                $.docker.request.volume.deleteBulk(function(response){
                    let msg = '';
                    if(response.fail.length==0){
                        msg = 'DeleteSuccess，已经SuccessDelete'+response.ok.length+'个Data卷';
                    }else{
                        msg = '已经SuccessDelete'+response.ok.length+'个Data卷, FailedDelete'+response.fail.length+'个Data卷';
                    }

                    reloadDg()
                    closeFn()

                    $.app.show(msg)

                }, node, ids, param.force==="1")
            })
        }

    }else{
        $.docker.utils.deleteConfirm('Delete卷', '您Confirm要DeleteCurrentData卷', function (param, closeFn){
            $.docker.request.volume.delete(function(response){

                let msg = 'DeleteSuccess，已经SuccessDeleteData卷{0}'.format(leaseId);
                $.app.show(msg)

                reloadDg()
                closeFn()
            }, node, leaseId, param.force==="1")
        })
    }
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
                            <span style='line-height: 30px;padding-right:0px'><b>清理AssignLabel:</b>(Default Clean All)</span>
                        </div>
                        <div class="cubeui-row">
                            <span style='line-height: 20px;padding-right:0px;color: red'>labelFormat: label1=a label2!=b(Not equal to) label!=...(NothingLabel)</span>
                        </div>
                        <div class="cubeui-row">
                            <input type="text" data-toggle="cubeui-textbox" name="labels"
                                   value='' data-options="required:false,prompt:'labelFormat: label1=a,label2!=b,label!=...'">
                        </div>
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('清理Data卷', 'Important Warning：Sure要ClearAll未Use的Data卷，清理后Data卷Data将无法Restore', html,
        function(param, closeFn){

            $.docker.request.volume.prune(function(response){
                let msg = 'SuccessClear{0}个Data卷，Recovery Space{1}'.format(response.Count, response.Size)

                closeFn();

                $.app.show(msg)
                reloadDg()
            }, node, param.labels)
        })
}

function reloadDg(){
    $('#volumesDg').datagrid('reload');
    refreshVolumeInfo()
}

function inspectLease(idx){
    showVolumePanel(idx)
}

function addLease(){


    let rowData = {};

    $('#layout').layout('remove', 'east');

    let east_layout_options = {
        region:'east',
        split:false,border:false,width:'100%',collapsed:true,
        iconCls:'fa fa-database',
        titleformat:'AddData卷'.format(rowData.Name), title:'Data卷',
        headerCls:'border_right',bodyCls:'border_right',collapsible:true,
        footerHtml:`
             <a  href="javascript:void(0)" data-toggle="cubeui-menubutton" data-options="{
                onClick:function(){
                    save()
                },
                btnCls: 'cubeui-btn-orange',
                iconCls: 'fa fa-plus-square-o'
            }">Create</a>
             <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                        $('#layout').layout('collapse', 'east');
                },
                btnCls: 'cubeui-btn-red',
                iconCls: 'fa fa-close'
            }">Close</a>
            `,
        render:$('#addVolumeTpl').html()
    }

    $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
    let opts = $.iLayout.getLayoutPanelOptions('#layout',  'east');
    console.log(opts)

    return ;
}

function save(){

    let node = local_node;

    if($('#addVolumeForm').form('validate')){

        let info = $.extends.json.param2json($('#addVolumeForm').serialize());
        console.log(info)



        let driverOpts = $.docker.utils.buildOptsData(info['driver-opt-name'],info['driver-opt-value']);
        let labels = $.docker.utils.buildOptsData(info['label-name'],info['label-value']);

        $.docker.request.volume.create(function (response) {
            $.app.show('AddData卷{0}Success'.format(info.Name))
            reloadDg()
            $('#layout').layout('collapse', 'east');

        }, node, info.Name, info.Driver, driverOpts, labels)

    }
}

function showVolumePanel(index){
    let rowData = $('#volumesDg').datagrid('getRows')[index]
    let id = rowData.ID;
    let node = local_node;
    $.docker.request.volume.inspect(function (response){
        rowData = response;

        $('#layout').layout('remove', 'east');

        let east_layout_options = {
            region:'east',
            split:false,border:false,width:'100%',collapsed:true,
            iconCls:'fa fa-database',
            titleformat:'Data卷-{0}'.format(rowData.Name), title:'Data卷',
            headerCls:'border_right',bodyCls:'border_right',collapsible:true,
            footerTpl1:'#footerTpl',
            footerHtml:`
             <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                        $('#layout').layout('collapse', 'east');
                },
                btnCls: 'cubeui-btn-red',
                iconCls: 'fa fa-close'
            }">Close</a>
            `,
            render:$.templates(html_template).render(rowData)
        }

        $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
        let opts = $.iLayout.getLayoutPanelOptions('#layout',  'east');
        console.log(opts)

    }, node, id)
}

let html_template = `    
<div style="margin: 0px;">
</div>

<div class="cubeui-fluid">
    <fieldset>
        <legend>Data卷Information</legend>
    </fieldset>
    <div class="cubeui-row">
        <div class="cubeui-col-sm12">
            <label class="cubeui-form-label">Data卷:</label>
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
            <label class="cubeui-form-label">Mountpoint:</label>
            <div class="cubeui-input-block">

                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                       value='{{>Mountpoint}}'
                       data-options="
                            "
                >
            </div>
        </div>
    </div>

    <div class="cubeui-row">
        <div class="cubeui-col-sm12">
            <label class="cubeui-form-label">Scope:</label>
            <div class="cubeui-input-block">

                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                       value='{{>Scope}}'
                       data-options="
                            "
                >
            </div>
        </div>
    </div>

    <div class="cubeui-row">
        <div class="cubeui-col-sm12">
            <label class="cubeui-form-label">CreatedAt:</label>
            <div class="cubeui-input-block">

                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                       value='{{>Created}}'
                       data-options="
                            "
                >
            </div>
        </div>
    </div>

    <div class="cubeui-row">
        <div class="cubeui-col-sm12">
            <label class="cubeui-form-label">Data卷Driver:</label>
            <div class="cubeui-input-block">

                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                       value='{{>Driver}}'
                       data-options="
                            "
                >
            </div>
        </div>
    </div>

    <fieldset>
        <legend style="margin-bottom: 0px;">DriverOptions</legend>
    </fieldset>

    <div class="cubeui-row">
        <div class="cubeui-col-sm12">
            <div class="cubeui-row">
                <div class="cubeui-col-sm4 cubeui-col-sm-offset2" style="padding-right: 5px">
                    <span style='line-height: 20px;padding-right:0px;'>Options</span>
                </div>
                <div class="cubeui-col-sm5" >
                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                </div>
            </div>
            {{props Options}}
            <div class="cubeui-row">
                <div class="cubeui-col-sm4 cubeui-col-sm-offset2" style="padding-right: 5px">
                    <input type="text" data-toggle="cubeui-textbox" readonly
                           value='{{>key}}' data-options="required:false,prompt:'LeasesID，Select Fill，Default as空，不UseLeases'">
                </div>
                <div class="cubeui-col-sm5">
                    <input type="text" data-toggle="cubeui-textbox" readonly
                           value='{{>prop}}' data-options="required:false,prompt:'LeasesID，Select Fill，Default as空，不UseLeases'">
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
            <div class="cubeui-row">
                <div class="cubeui-col-sm4 cubeui-col-sm-offset2" style="padding-right: 5px">
                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                </div>
                <div class="cubeui-col-sm5" >
                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                </div>
            </div>
            {{props Labels}}
            <div class="cubeui-row">
                <div class="cubeui-col-sm4 cubeui-col-sm-offset2" style="padding-right: 5px">
                    <input type="text" data-toggle="cubeui-textbox" readonly
                           value='{{>key}}' data-options="required:false,prompt:'LeasesID，Select Fill，Default as空，不UseLeases'">
                </div>
                <div class="cubeui-col-sm5">
                    <input type="text" data-toggle="cubeui-textbox" readonly
                           value='{{>prop}}' data-options="required:false,prompt:'LeasesID，Select Fill，Default as空，不UseLeases'">
                </div>
            </div>
            {{/props}}
        </div>
    </div>



</div>

`