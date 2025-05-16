function loadRepository(){
    let node = local_node;

    $(function(){
        $("#reposDg").iDatagrid({
            idField: 'ID',
            sortOrder:'asc',
            sortName:'Id',
            pageSize:50,
            frozenColumns:[[
                {field: 'ID', title: '', checkbox: true},
                {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'left',
                    width1: 100, formatter:reposOperateFormatter},
                {field: 'Id', title: 'ID', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 220},
                {field: 'Name', title: 'Name', sortable: true,
                    formatter:$.iGrid.buildformatter([$.iGrid.templateformatter('{Name}'), $.iGrid.tooltipformatter()]),
                    width: 140},
            ]],
            onBeforeLoad:function (param){
                refreshRepos(param)
            },
            columns: [[
                {field: 'Endpoint', title: 'REPOS', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 260},
                {field: 'Description', title: 'DESCRIPTION', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 300},
                {field: 'Username', title: 'USERNAME', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 170},
                {field: 'Password', title: 'PASSWORD', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 170},
                {field: 'Createtime', title: 'CREATETIME', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 260}
            ]]
        });
    });
}

function reposOperateFormatter(value, row, index) {
    let htmlstr = "";
    htmlstr += '<button class="layui-btn-blue layui-btn layui-btn-xs" onclick="updateRepos(\'' + row.ID + '\')">修改Warehouse</button>';
    htmlstr += '<button class="layui-btn-gray layui-btn layui-btn-xs" onclick="removeRepos(\'' + row.ID + '\')">删除Warehouse</button>';
    return htmlstr;
}


function refreshRepos(param){

    let pageSize = $.docker.utils.getPageRowsFromParam(param);
    let skip = $.docker.utils.getSkipFromParam(param);

    //let node = $.v3browser.menu.getCurrentTabAttachNode();
    let node = local_node;
    // WarehousePassword基于安全考虑，Only local saving，Cannot initialise Evolution\'s mail component

    $.docker.request.repos.list(function (response) {

        $.each(response.list, function (idx, v) {
            v.Password = "**********"
        })

        $('#reposDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })
    }, node);
}

function createRepos(){
    updateReposDlg({});
}

function removeRepos(id){
    if(id==null){
        let rows = $('#reposDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅支持选择一个从Warehouse删除');
            return ;
        }

        if(rows.length==0){
            $.app.show('请选择一个Warehouse删除');
            return;
        }else{
            id = rows[0].ID;
        }
    }

    $.app.confirm("删除Warehouse信息", "您Sure要删除所选择的Warehouse信息？",function () {

        let node = local_node;
        $.docker.request.repos.delete(function (data) {
            $.app.show("删除Warehouse信息Success");
            reloadDg();
        }, node, id);
    })

}

function updateRepos(id){
    if(id==null){
        let rows = $('#reposDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅支持选择一个从Warehouse修改');
            return ;
        }

        if(rows.length==0){
            $.app.show('请选择一个Warehouse修改');
            return;
        }else{
            id = rows[0].ID;
        }
    }
    let node = local_node;
    $.docker.request.repos.all(function (data, map) {
        let reposData = map[id];
        if(reposData==null){
            $.app.show('Warehouse不存在，请Refresh后再重新编辑')
            return false;
        }

        updateReposDlg(reposData);

    }, node);
}

function updateReposDlg(reposData){

    let title = '';
    let isAdd = true;
    if(reposData == null || reposData.ID == null){
        reposData = {};
        title = "添加Warehouse";
    }else{
        title = "修改Warehouse{0}".format(reposData.Name);
        isAdd = false;
    }

    $.iDialog.openDialog({
        title: title,
        minimizable:false,
        id:'pullImgDlg',
        width: 600,
        height: 440,
        href:'./add_repository.html',
        render:function(opts, handler){
            let d = this;
            console.log("Open dialog");
            reposData.Password = '';
            handler.render(reposData);
        },
        buttonsGroup: [{
            text: 'Sure',
            iconCls: 'fa fa-floppy-o',
            btnCls: 'cubeui-btn-orange',
            handler:'ajaxForm',
            beforeAjax:function(o){
                let t = this;
                o.ajaxData = $.extends.json.param2json(o.ajaxData);
                let info = o.ajaxData;
                let node = local_node;
                console.log(info);

                if(isAdd){
                    info.id = null;
                }else{
                    info.id = reposData.ID
                }

                $.docker.request.repos.save(function (data) {
                    $.app.show('保存Warehouse{0}Success'.format(info.Name))
                    $.iDialog.closeOutterDialog($(t))
                    reloadDg()
                }, node, info);

                return false;
            }
        }]
    });
}

function reloadDg(){
    $('#reposDg').datagrid('reload');
    $('#layout').layout('resize');
}

function onActivated(opts, title, idx){
    console.log('Image onActivated')
    reloadDg();
    //refreshCharts();
}
