function loadOrchestrators(){
    let node = local_node;

    $(function(){
        $("#orchestratorsDg").iDatagrid({
            idField: 'ID',
            sortOrder:'asc',
            sortName:'Id',
            pageSize:50,
            frozenColumns:[[
                {field: 'ID', title: '', checkbox: true},
                {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'left',
                    width1: 100, formatter:orchestratorsOperateFormatter},
                {field: 'Id', title: 'ID', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 220},
                {field: 'Name', title: 'Name', sortable: true,
                    formatter:$.iGrid.buildformatter([$.iGrid.templateformatter('{Name}'), $.iGrid.tooltipformatter()]),
                    width: 140},
            ]],
            onBeforeLoad:function (param){
                refreshOrchestrators(param)
            },
            columns: [[
                {field: 'Description', title: 'DESCRIPTION', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 300},
                {field: 'ServiceCount', title: 'SERVICE COUNT', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 170},
                {field: 'Createtime', title: 'CREATETIME', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 260}
            ]]
        });
    });
}

function orchestratorsOperateFormatter(value, row, index) {
    let htmlstr = "";
    htmlstr += '<button class="layui-btn-blue layui-btn layui-btn-xs" onclick="updateOrchestrators(\'' + row.ID + '\')">ModifyWarehouse</button>';
    htmlstr += '<button class="layui-btn-gray layui-btn layui-btn-xs" onclick="removeOrchestrators(\'' + row.ID + '\')">DeleteWarehouse</button>';
    return htmlstr;
}


function refreshOrchestrators(param){

    let pageSize = $.docker.utils.getPageRowsFromParam(param);
    let skip = $.docker.utils.getSkipFromParam(param);

    //let node = $.v3browser.menu.getCurrentTabAttachNode();
    let node = local_node;
    // WarehousePassword基于安全考虑，Only local saving，Cannot initialise Evolution\'s mail component

    $.docker.request.repos.list(function (response) {
        $('#orchestratorsDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })
    }, node);
}

function createOrchestrators(){
    updateOrchestratorsDlg({});
}

function removeOrchestrators(id){
    if(id==null){
        let rows = $('#orchestratorsDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅SupportSelection一个编排TasksDelete');
            return ;
        }

        if(rows.length==0){
            $.app.show('请Selection一个编排TasksDelete');
            return;
        }else{
            id = rows[0].ID;
        }
    }

    $.app.confirm("Delete编排TasksInformation", "您Sure要Delete所Selection的编排TasksInformation？",function () {

        let node = local_node;
        $.docker.request.repos.delete(function (data) {
            $.app.show("Delete编排TasksInformationSuccess");
            reloadDg();
        }, node, id);
    })

}

function updateOrchestrators(id){
    if(id==null){
        let rows = $('#orchestratorsDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅SupportSelection一个从编排TasksModify');
            return ;
        }

        if(rows.length==0){
            $.app.show('请Selection一个编排TasksModify');
            return;
        }else{
            id = rows[0].ID;
        }
    }
    let node = local_node;
    $.docker.request.repos.all(function (data, map) {
        let orchestratorData = map[id];
        if(orchestratorData==null){
            $.app.show('编排Tasksdoes not exist，请Refresh后再重新Edit')
            return false;
        }

        updateOrchestratorsDlg(orchestratorData);

    }, node);
}

function updateOrchestratorsDlg(orchestratorData){

    let showFn = function(row){

        let title = '';
        let isAdd = true;
        if(orchestratorData == null || orchestratorData.ID == null){
            orchestratorData = {};
            title = "Add编排Tasks";
        }else{
            title = "Modify编排Tasks{0}".format(orchestratorData.Name);
            isAdd = false;
        }

        $('#layout').layout('remove', 'east');

        let east_layout_options = {
            region:'east',
            split:false,border:false,width:'100%',collapsed:true,
            fit:true,
            iconCls:'fa fa-info-circle',
            collapsible:false,
            showHeader1:false,
            titleformat:title, title:'ServicesInformation',
            headerCls:'border_right',bodyCls:'border_right',
            // footerHtml:$.templates(service_panel_footer_html).render(rowData),
            render:function (panel, option) {

                let html = './add_orchestrator.html';

                if(!orchestratorData.updated)
                    html = './add_orchestrator.html';

                $.docker.getHtml(html, null,function (html) {
                    let cnt = $($.templates(html).render(orchestratorData));
                    panel.append(cnt);
                    $.parser.parse(cnt);
                    $('#orchestrator_main_layout').iLayout();

                    if(orchestratorData.updated){
                    }

                    loadTreeDg(orchestratorData);
                })
            }
        }

        $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
        let opts = $.iLayout.getLayoutPanelOptions('#layout',  'east');
        console.log(opts)
    }

    showFn(orchestratorData);
}

function reloadDg(){
    $('#orchestratorsDg').datagrid('reload');
    $('#layout').layout('resize');
}

function onActivated(opts, title, idx){
    console.log('Image onActivated')
    reloadDg();
    //refreshCharts();
}
