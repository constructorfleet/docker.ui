function loadLease(){

    // let node = $.docker.menu.getCurrentTabAttachNode();
    let node = local_node;

    $(function(){
        $("#networksDg").iDatagrid({
            idField: 'ID',
            sortOrder:'asc',
            sortName:'Id',
            pageSize:50,
            queryParams:{all1:1},
            frozenColumns:[[
                {field: 'ID', title: '', checkbox: true},
                {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'left',
                    width1: 100, formatter:leaseOperateFormatter},
                {field: 'Id', title: 'ID', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 220},
                {field: 'Name', title: 'Name', sortable: true,
                    formatter:$.iGrid.buildformatter([$.iGrid.templateformatter('{Name}'), $.iGrid.tooltipformatter()]),
                    width: 140},
            ]],
            onBeforeLoad:function (param){
                refreshNetworks(param)
            },
            columns: [[
                {field: 'Driver', title: 'DRIVER', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 80},
                {field: 'Scope', title: 'SCOPE', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 80},
                {field: 'Created', title: 'CREATED', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 170},
                {field: 'IPAMStr', title: 'IPAM', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 260},
                {field: 'OptionStr', title: 'OPTIONS', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),
                    width: 360},
                {field: 'LabelStr', title: 'LABELS', sortable: true,
                    formatter:$.iGrid.tooltipformatter(),width: 360}
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
    htmlstr += '<button class="layui-btn-yellowgreen layui-btn layui-btn-xs" onclick="inspectNetwork(\'' + row.ID + '\')">View</button>';
    htmlstr += '<button class="layui-btn-blue layui-btn layui-btn-xs" onclick="cloneLease(\'' + row.ID + '\')">CloningNetwork</button>';
    htmlstr += '<button class="layui-btn-gray layui-btn layui-btn-xs" onclick="removeLease(\'' + row.ID + '\')">Delete</button>';
    return htmlstr;
}



function createLease(){
    inspectNetwork();
}

function removePanel(){
    $('#layout').layout('remove', 'east');
}

function refreshNetworks(param){

    let pageSize = $.docker.utils.getPageRowsFromParam(param);

    let skip = $.docker.utils.getSkipFromParam(param);

    //let node = $.v3browser.menu.getCurrentTabAttachNode();
    let node = local_node;

    $.docker.request.network.list(function (response) {
        $('#networksDg').datagrid('loadData', {
            total: response.total,
            rows: response.list
        })

    }, node, skip, pageSize, param.driver, param.type, param.scope, param.search_type, param.search_key, param.sort, param.order);
}

function pruneLease(){

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
                            <span style='line-height: 30px;padding-right:0px'><b>清理指定NetworkLabel:</b>(Default Clean All)</span>
                        </div>
                        <div class="cubeui-row">
                            <span style='line-height: 20px;padding-right:0px;color: red'>labelFormat: label1=a,label2!=b(Not equal to),label!=...(没有Label)</span>
                        </div>
                        <div class="cubeui-row">
                            <input type="text" data-toggle="cubeui-textbox" name="labels"
                                   value='' data-options="required:false,prompt:'labelFormat: label1=a,label2!=b,label!=...'">
                        </div>
                    </div>
                    <div style="margin-top:5px">     
                        <div class="cubeui-row">
                            <span style='line-height: 30px;padding-right:0px'><b>清理在此Timetamp之前创建的Network:</b>(Default Clean All)</span>
                        </div>
                        <div class="cubeui-row">
                            <span style='line-height: 20px;padding-right:0px;color: red'>值It could beUnixTimetamp、日期Format的Timetamp或GoString for duration（For example:10m、1h30m）Format:10m,1h30m</span>
                        </div>
                        <div class="cubeui-row">
                            <input type="text" data-toggle="cubeui-textbox" name="untils"
                                   value='' data-options="required:false,prompt:'Format: 10m,1h30m'">
                        </div>
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('清理Network', 'Important Warning：Sure要清空All未Use的Network，清理后Data将无法恢复', html,
        function(param, closeFn){

            $.docker.request.network.prune(function(response){
                let msg = 'Success清除{0}个Network'.format(response.Count)

                closeFn();

                $.app.show(msg)
                reloadDg()
            }, node, param.labels, param.untils)
        }, null, 450)
}

function cloneLease(id){

    let node = local_node;

    $.docker.request.network.inspect(function (response){
        let rowData = response;
        rowData.Name = response.Name;
        rowData.updated = false;
        showNetworkPanel(rowData)
    }, node, id)
}

function removeLease(id, closePanel) {
    if($.extends.isEmpty(id)){
        let rows = $('#networksDg').datagrid('getChecked');

        if(rows.length>1){
            $.app.show('本Version仅支持Selection一个NetworkDelete');
            return ;
        }

        if(rows.length==0){
            $.app.show('请Selection一个NetworkDelete');
            return;
        }else{
            id = rows[0].ID;
        }
    }

    $.app.confirm('您确认要Delete当前Network',function (){

        let node = local_node;
        $.docker.request.network.delete(function(response){
            $.app.show("DeleteNetworkSuccess".format(""));
            reloadDg();

            if(closePanel){
                removePanel();
            }

        }, node, id)
    });

}

function reloadDg(){
    $('#networksDg').datagrid('reload');
    $('#layout').layout('resize');
}

function inspectNetwork(id){
    let node = local_node;
    if($.extends.isEmpty(id)){
        let rowData = $.docker.request.network.buildNewRowData();
        rowData.updated = false;
        showNetworkPanel(rowData)
    }else{
        $.docker.request.network.inspect(function (response){
            let rowData = response;
            rowData.Name = response.Name;
            rowData.updated = true;
            showNetworkPanel(rowData)
        }, node, id)
    }
}

function showNetworkPanel(rowData){
    $('#layout').layout('remove', 'east');

    let east_layout_options = {
        region:'east',
        split:false,border:false,width:'100%',collapsed:true,
        iconCls:'fa fa-gear',
        collapsible:false,
        showHeader1:false,
        titleformat:'Network信息-{0}'.format($.extends.isEmpty(rowData.Name, 'New')), title:'Network信息',
        headerCls:'border_right',bodyCls:'border_right',collapsible:true,
        footerHtml:$.templates(footer_html_template).render(rowData),
        render:function (panel, option) {

            let cnt = $($.templates(network_html_template).render(rowData));
            panel.append(cnt);
            $.parser.parse(cnt);

            $('#eastTabs').tabs({
                fit:true,
                border:false,
                bodyCls1:'border_right_none,border_bottom_none',
                narrow:true,
                pill:true,
            });

            if(rowData.updated){
                $('#relatedContainersDg').iDatagrid({
                    pagination:false,
                    showHeader:true,
                    showFooter:true,
                    remoteSort:false,
                    queryParams: {id:rowData.ID},
                    onBeforeLoad:function (param){
                        let id = param.id;
                        let node = local_node;

                        $.docker.request.network.inspect(function (res) {
                            let rowData = res.containersRowData;
                            $('#relatedContainersDg').datagrid('loadData', {
                                total: rowData.total,
                                rows: rowData.list
                            })
                        }, node, id);
                    },
                    frozenColumns:[[
                        {field: 'op', title: 'Operation', sortable: false, halign:'center',align:'left',
                            width1: 300, formatter:createRelatedContainerOperateFormatter(rowData.ID)},
                        {field: 'ID', title: 'ID', sortable: true,
                            formatter:$.iGrid.tooltipformatter(),width: 400},
                        {field: 'Name', title: 'NAME', sortable: true,
                            formatter:$.iGrid.tooltipformatter(),
                            width: 180},
                    ]],
                    columns: [[
                        {field: 'EndpointID', title: 'Endpoint', sortable: true,
                            formatter:$.iGrid.tooltipformatter(),width: 400},
                        {field: 'MacAddress', title: 'MacAddress', sortable: true,
                            formatter:$.iGrid.tooltipformatter(),width: 180},
                        {field: 'IPv4Address', title: 'IPv4Address', sortable: false,
                            formatter:$.iGrid.tooltipformatter(),width: 280},
                        {field: 'IPv6Address', title: 'IPv6Address', sortable: true,
                            formatter:$.iGrid.tooltipformatter(),width: 180}
                    ]]
                })
            }

        }
    }

    $.docker.utils.ui.showSlidePanel($('#layout'), east_layout_options)
    let opts = $.iLayout.getLayoutPanelOptions('#layout',  'east');
    console.log(opts)
}

function createRelatedContainerOperateFormatter(id){
    return function (value, row, index) {
        let htmlstr = "";

        //superpowers
        htmlstr += '<button class="layui-btn-brown layui-btn layui-btn-xs" onclick="disConnectContainer(\''+id+'\', \'' + row.ID + '\')">中断Network</button>';
        return htmlstr;
    }
}

function disConnectContainer(id, containerId){

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
                            <input data-toggle="cubeui-checkbox" name="force" value="1" label="">
                            <span style='line-height: 30px;padding-right:0px'><b>强制中断Connection</b></span>
                        </div>
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('中断ContainersNetworkConnection', 'Important Warning：中断Connection后，Containers可能出现不位置的Network问题或故障', html,
        function(param, closeFn){

            $.docker.request.network.disconnect(function(response){
                let msg = 'Success中断ContainersNetworkConnection，If需要该ContainersNetwork，可以手动ConnectionContainers至当前Network'.format(response.Count, response.Size)
                closeFn();
                $.app.show(msg)
                refreshConnectedContainers();
            }, node, id, containerId, param.force=="1")
        }, null, 300)
}

function connectContainerDlg(id){

    let node = local_node;

    let html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    
                    <div style="margin-top:15px">
                        
                        <div id='dg_header' style="display1:none;margin-bottom1:15px">
                                <span style='line-height: 30px;padding-right:0px'>AllContainers：</span>
                                <input id='container_search_all' value='1' data-toggle="cubeui-switchbutton" style="width:50px;height1:30px" checked="true"
                                    data-options="
                                    onText:'',offText:'',
                                    onChange: function(checked){
                                        $('#container_searchbtn').trigger('click');
                                    }
                                    ">
                
                                <span style='line-height: 30px;padding-left:2px;padding-right:10px'></span>
                
                                <input type="text" id='container_search_type' value="name" data-toggle="cubeui-combobox"
                                       data-options="
                                                width:120,
                                                required:true,prompt:'QuestionModalities，_Other Organiser',
                                                valueField:'KEY',
                                                textField:'TEXT',
                                                data:[{'KEY':'name','TEXT':'Name'},{'KEY':'label','TEXT':'Label'},{'KEY':'before','TEXT':'Before'},
                                                {'KEY':'since','TEXT':'Since'},{'KEY':'reference','TEXT':'Refer'},{'KEY':'ancestor','TEXT':'Ancestor'},
                                                {'KEY':'expose','TEXT':'Expose'},{'KEY':'publish','TEXT':'Publish'},{'KEY':'volume','TEXT':'Volume'}]
                                       ">
                                <input type="text" id='container_search_key' data-toggle="cubeui-textbox"
                                       data-options="onClear:function(){
                                            $('#container_searchbtn').trigger('click');
                                       }, prompt:'Question条件, 多条件逗No. Separate；labelModalities label1=a,label2=b',width:320">
                                <a href="javascript:void(0)" id="container_searchbtn"
                                   data-toggle="cubeui-menubutton"
                                   data-options="
                                   iconCls:'fa fa-search',
                                   btnCls:'cubeui-btn-blue',
                                   onClick:function(){
                                        let param = {};
                                        if($('#container_search_all').switchbutton('options').checked){
                                            param.all = 1;
                                        }
                                        
                                        param.search_type = $('#container_search_type').combobox('getValue');
                                        param.search_key = $('#container_search_key').textbox('getValue');
                                        
                                        $('#selectContainerDg').combogrid('grid').datagrid('reload',param)                                 
                                   }                                   
                                   ">Question</a>
                        </div>
                         
                        <div class="cubeui-row">                            
                            <div class="cubeui-col-sm12">
                                <label class="cubeui-form-label">ObjectiveContainers:</label>
                                <div class="cubeui-input-block">
                                    <input id="selectContainerDg" type="text" data-toggle="cubeui-combogrid" name="Name"
                                           value=''
                                           data-options="                                           
                                           prompt:'Containers名称，Required项目',
                                           required:true,
                                           reversed:true,
                                           editable:false,
                                           panelHeight:400,                                           
                                           idField:'ID',
                                           textField:'Name',
                                           pagination:true,
                                           queryParams:{all:1},
                                           toolbar:'#dg_header',
                                           onBeforeLoad:function (param){
                                                refreshContainer(param)
                                           },
                                            frozenColumns:[[
                                                {field: 'Id', title: 'CONTAINER ID', sortable: true,
                                                    width: 260},
                                                {field:'Name',title:'NAME',width:160},
                                            ]],
                                           columns:[[
                                               {field: 'Image', title: 'IMAGE', sortable: true,width: 220},
                                               {field: 'Created', title: 'CREATED', sortable: true,width: 220},
                                               {field: 'Status', title: 'STATUS', sortable: true,width: 220},
                                               {field: 'Port', title: 'PORTS', sortable: true,width: 350},
                                               {field: 'LabelStr', title: 'LABELS', sortable: true,width: 900}
                                           ]]"
                                    >
                                </div>
                            </div>    
                        </div>                        
                    </div>   
                    
                    <fieldset>
                        <legend>ConnectionContainersOptions</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="Add network-scoped alias for the container">Connection别名:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-tagbox" name="Aliases"
                                       value=''
                                       data-options="                               
                                           prompt:'Connection别名，Select Fill项目',
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="IPv4 address (e.g., 192.168.11.1)，根据NetworkSettings信息进行填写">IPv4Address:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="IPAddress"
                                       value=''
                                       data-options="           
                                           prompt:'IP4的Address，IPv4 address (e.g., 192.168.11.1)，根据NetworkSettings信息进行填写',
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="Global IPv6 address (e.g., 2001:db8::33)，根据NetworkSettings信息进行填写">IPv6Address:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="GlobalIPv6Address"
                                       value=''
                                       data-options="           
                                           prompt:'IP6的Address，IPv6 address (e.g., 2001:db8::33)，根据NetworkSettings信息进行填写',
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <fieldset  style="margin-top: 10px;">
                        <legend style="margin-bottom: 0px;">DriverOptions</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">                            
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>键</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addNodeOpts(this, 'connect-driver-opt')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                                    
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value=""
                                           name='connect-driver-opt-name' data-options="required:false,prompt:'Name，Like what：group '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value=""
                                           name='connect-driver-opt-value' data-options="required:false,prompt:'Corresponding value，Like what：db '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                        
                        </div>
                    </div>
                                        
                    <fieldset style="margin-top:10px">
                        <legend style="margin-bottom: 0px;">Containers链接</legend>
                    </fieldset>
                        
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>ObjectiveContainers名</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Link alias</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addConnectLinks(this, 'connect-Links')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                            
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="" 
                                           name='connect-Links-name' data-options="required:false,prompt:'ObjectiveContainers名，Like what：mysql-001 '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value=""
                                           name='connect-Links-value' data-options="required:false,prompt:'Link alias，Like what：mysqldb '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>      
                            
                        </div>
                    </div>
                    
                </div>
        `;

    $.docker.utils.optionConfirm('ConnectionContainers在当前NetworkSettings', null, html,
        function(param, closeFn){

            if($.extends.isEmpty(param.Name)){
                $.app.show("必须Selection需要Connection的ObjectiveContainers");
                return false;
            }

            console.log(param);
            param = $.extend({}, param);

            $.app.confirm("SureConnectionContainers在当前NetworkSettings", function () {

                let config = {};
                param.Aliases = $.docker.utils.convert2ListParamValue(param.Aliases)
                if(!$.extends.isEmpty(param.Aliases)){
                    config.Aliases = param.Aliases;
                }

                if(!$.extends.isEmpty(param.IPAddress)){
                    config.IPAddress = $.extends.isEmpty(param.IPAddress, "");
                }
                if(!$.extends.isEmpty(param.GlobalIPv6Address)){
                    config.GlobalIPv6Address = $.extends.isEmpty(param.GlobalIPv6Address, "");
                }

                param.DriverOpts = $.docker.utils.buildOptsData(param['connect-driver-opt-name'],param['connect-driver-opt-value']);
                if(!$.extends.isEmpty(param.DriverOpts)){
                    config.DriverOpts = param.DriverOpts;
                }

                param['Links'] = [];
                param['connect-Links-name'] = $.docker.utils.convert2ListParamValue(param['connect-Links-name']);
                param['connect-Links-value'] = $.docker.utils.convert2ListParamValue(param['connect-Links-value']);
                $.each(param['connect-Links-value'], function (idx, v) {
                    if(!$.extends.isEmpty(v) && !$.extends.isEmpty(param['connect-Links-name'][idx])){
                        param['Links'].push(param['connect-Links-name'][idx]+':'+v);
                    }
                });

                if(!$.extends.isEmpty(param.Links)){
                    config.Links = param.Links;
                }

                console.log(config);
                $.docker.request.network.connect(function (response) {
                    $.app.show("ConnectionContainers在当前NetworkSettingsSuccess");
                    closeFn();
                    refreshConnectedContainers();
                }, node, id, param.Name, config);

            })
        }, null, 550, 900)
}

function refreshContainer(param){
    let pageSize = $.docker.utils.getPageRowsFromParam(param);
    let skip = $.docker.utils.getSkipFromParam(param);

    let node = local_node;

    $.docker.request.container.list(function (response) {
        $('#selectContainerDg').combogrid('grid').datagrid('loadData',
            {
                total: response.total,
                rows: response.list
            });
    }, node, skip, pageSize, param.all==1, param.search_type, param.search_key, param.sort, param.order);
}

function refreshConnectedContainers(){
    $('#relatedContainersDg').datagrid('reload');
}

function saveNetwork(fn){

    let node = local_node;

    if($('#createNetworkForm1').form('validate') && $('#createNetworkForm2').form('validate')) {
        let info = $.extends.json.param2json($('#createNetworkForm1').serialize());

        console.log(info)
        let data = $.docker.request.network.buildNewRowData();
        data.Name = info.Name;

        if($.extends.isEmpty(info.CheckDuplicate, "")==1){
            data.CheckDuplicate = true;
        }

        if($.extends.isEmpty(info.Internal, "")==1){
            data.Internal = true;
        }

        if($.extends.isEmpty(info.Attachable, "")==1){
            data.Attachable = true;
        }

        if($.extends.isEmpty(info.Ingress, "")==1){
            data.Ingress = true;
        }

        if($.extends.isEmpty(info.EnableIPv6, "")==1){
            data.EnableIPv6 = true;
        }

        data.Scope = $.extends.isEmpty(info.Scope, "local");
        data.Driver = $.extends.isEmpty(info.Driver, "bridge");

        let labels = $.docker.utils.buildOptsData(info['Labels-name'],info['Labels-value']);
        data.Labels = labels;

        let driverOpts = $.docker.utils.buildOptsData(info['driver-opt-name'],info['driver-opt-value']);
        data.Options = driverOpts;

        info = $.extends.json.param2json($('#createNetworkForm2').serialize());
        data.IPAM.Driver = "default";

        let ipamOpts = $.docker.utils.buildOptsData(info['ipam-opt-name'],info['ipam-opt-value']);
        data.IPAM.Options = ipamOpts;

        info['network'] = [];
        if (info['network-value'] && !Array.isArray(info['network-value'])) {
            info['network-value'] = [info['network-value']];
            info['network-name'] = [info['network-name']];
        }

        if(info['network-value']){
            $.each(info['network-value'], function (idx, v) {
                info['network'].push({
                    Subnet:info['network-name'][idx],
                    Gateway:info['network-value'][idx],
                });
            });
        }
        data.IPAM.Config = info['network'];

        let doFn = function (row) {
            $.app.confirm("您SureNew当前NetworkConfigure信息？", function () {
                $.docker.request.network.create(function (response) {
                    if (fn) {
                        fn.call(row, response, row)
                    } else {
                        $.app.show('创建Configure信息{0}Success'.format(row.Name));
                        reloadDg();
                        removePanel();
                        //$('#layout').layout('collapse', 'east');
                    }
                }, node, row);
            });
        }

        doFn(data);
    }
}

let footer_html_template = `
        {{if updated}}
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                cloneLease('{{:ID}}', true);
            },
            btnCls: 'cubeui-btn-slateblue',
            iconCls: 'fa fa-ticket'
        }">Cloning</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                removeLease('{{:ID}}', true);
            },
            btnCls: 'cubeui-btn-orange',
            iconCls: 'fa fa-times'
        }">Delete</a>
        {{else}}   
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                saveNetwork();
            },
            btnCls: 'cubeui-btn-blue',
            iconCls: 'fa fa-plus'
        }">Add</a>
        {{/if}}
         <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    $('#layout').layout('collapse', 'east');
            },
            btnCls: 'cubeui-btn-red',
            iconCls: 'fa fa-close'
        }">Close</a>
`;

let network_html_template = `
        <div data-toggle="cubeui-tabs" id='eastTabs'>
            <div title="Basic information"
                 data-options="id:'eastTab0',iconCls:'fa fa-info-circle'">                 
                <div style="margin: 0px;">
                </div>
                
                <form id='createNetworkForm1'>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>Basic information</legend>
                    </fieldset>
                    
                    {{if updated}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ID:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ID}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" id="NetworkName" name="Name" readonly
                                       value='{{>Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Raft:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>SVersion}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>  
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Driver:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="CreateAt" readonly
                                       value='{{>Driver}}'
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
                
                                <input type="text" data-toggle="cubeui-textbox" name="CreateAt" readonly
                                       value='{{>Scope}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="在Network上启用IPv6">EnableIPv6:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="CreateAt" readonly
                                       value='{{>EnableIPv6Str}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="限制对Network的外部访问">Internal:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="CreateAt" readonly
                                       value='{{>InternalStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="在swarmMode，全局Scope的Network可由工作人员的常规Containers手动Connection">Attachable:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="CreateAt" readonly
                                       value='{{>AttachableStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="入口Network是以swarm模式提供路由网格的Network">Ingress:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Ingress" readonly
                                       value='{{>IngressStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    {{else}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name"
                                       value='{{>Name}}'
                                       data-options="
                                       prompt:'Network名称，Required项目',
                                       required:true,
                                            "
                                >
                            </div>
                        </div>           
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="要Use的NetworkDriver程序插件的名称。Default value：Bridge">Driver:</label>
                            <div class="cubeui-input-block">
                                <input type="text" name="Driver" value='{{>Driver}}' 
                                data-toggle="cubeui-combobox"
                                   data-options="
                                            required:false,prompt:'Empty，UseDefault value：Bridge',
                                            valueField:'KEY',
                                            textField:'TEXT',
                                            data:$.docker.driver.network.getNetworkObjectList()
                                   ">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="Scope描述Network存在的级别（For example:，ClusterScope的“swarm”Or machine level“local”）">Scope:</label>
                            <div class="cubeui-input-block">
                                <input type="text" name="Scope" value='{{>Scope}}' 
                                data-toggle="cubeui-combobox"
                                   data-options="
                                            required:false,prompt:'Empty，UseDefault value：local',
                                            valueField:'KEY',
                                            textField:'TEXT',
                                            data:[{'KEY':'','TEXT':''},{'KEY':'local','TEXT':'local'},{'KEY':'swarm','TEXT':'swarm'},{'KEY':'global','TEXT':'global'}]
                                   ">                                            
                            </div>
                        </div>
                    </div>
                                        
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="Check duplicate name的Network。由于Network主要基于随机ID而不是名称Settings密钥，并且Network名称严格来说是UseID唯一标识的Network的用户友好别名，There is therefore no guarantee of double-checking。CheckDuplicate提供了对具有相同名称但不能保证捕获All名称冲突的任何Network的最大努力检查。">
                            Check duplicate name:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if CheckDuplicate}}checked{{/if}} 
                                    name="CheckDuplicate" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                       
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="在Network上启用IPv6">EnableIPv6:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if EnableIPv6}}checked{{/if}} 
                                    name="EnableIPv6" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="限制对Network的外部访问">Internal:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if Internal}}checked{{/if}} 
                                    name="Internal" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="在swarmMode，全局Scope的Network可由工作人员的常规Containers手动Connection">Attachable:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if Attachable}}checked{{/if}} 
                                    name="Attachable" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="入口Network是以swarm模式提供路由网格的Network">Ingress:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if Ingress}}checked{{/if}} 
                                    name="Ingress" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                       
                    {{/if}}
                    
                             
                    <fieldset  style="margin-top: 10px;">
                        <legend style="margin-bottom: 0px;">DriverOptions</legend>
                    </fieldset>
                    {{if updated}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                                </div>
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>&nbsp;</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                            </div>
                            {{if Options}}
                            {{props Options}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                    
                                </div>                                
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>=</span>
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                            {{/if}}
                        </div>
                    </div>
                    {{else}}
                    <div class="cubeui-row">                            
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>键</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addNodeOpts(this, 'driver-opt')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                
                            {{if Options}}
                            {{props Options}}                        
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}"
                                           name='driver-opt-name' data-options="required:false,prompt:'Name，Like what：group '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='driver-opt-value' data-options="required:false,prompt:'Corresponding value，Like what：db '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            {{/props}}
                            {{/if}}
                        
                        </div>
                    </div>
                    {{/if}}
                                    
                    <fieldset  style="margin-top: 20px;">
                        <legend style="margin-bottom: 0px;">LabelOptions</legend>
                    </fieldset>
                                
                    {{if updated}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                                </div>
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>&nbsp;</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                            </div>
                            {{if Labels}}
                            {{props Labels}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                    
                                </div>                                
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>=</span>
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                            {{/if}}
                        </div>
                    </div>
                    {{else}}
                    <div class="cubeui-row">                            
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>键</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addNodeOpts(this, 'Labels')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                
                            {{if Labels}}
                            {{props Labels}}                        
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}"
                                           name='Labels-name' data-options="required:false,prompt:'Name，Like what：group '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='Labels-value' data-options="required:false,prompt:'Corresponding value，Like what：db '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            {{/props}}
                            {{/if}}
                        
                        </div>
                    </div>
                    {{/if}}                    
                </div>
                </form>  
            </div>
            
            
            <div title="IPAMSettings"
                 data-options="id:'eastTab1',iconCls:'fa fa-usb'">
                <div style="margin: 0px;">
                </div>
                <form id='createNetworkForm2'>
                <div class="cubeui-fluid">
                
                    
                    {{if updated}}
                    
                    <fieldset>
                        <legend>IPAMSettings</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ID:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>ID}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" id="ConfigName" name="Name" readonly
                                       value='{{>Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>               
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Driver:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>IPAM.Driver}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>  
                    {{/if}}
                    
                    
                    <fieldset  style="margin-top: 10px;">
                        <legend style="margin-bottom: 0px;">IPAMParametersOptions</legend>
                    </fieldset>
                    
                    {{if updated}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Label</span>
                                </div>
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>&nbsp;</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                            </div>
                            {{if IPAM.Options}}
                            {{props IPAM.Options}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>key}}</span>
                                    
                                </div>                                
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>=</span>
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                            {{/if}}
                        </div>
                    </div>
                    {{else}}
                    <div class="cubeui-row">                            
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>键</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addNodeOpts(this, 'ipam-opt')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                
                            {{if IPAM.Options}}
                            {{props IPAM.Options}}                        
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}"
                                           name='ipam-opt-name' data-options="required:false,prompt:'Name，Like what：group '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='ipam-opt-value' data-options="required:false,prompt:'Corresponding value，Like what：db '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            {{/props}}
                            {{/if}}
                        
                        </div>
                    </div>
                    {{/if}}
                    
                     
                    <fieldset  style="margin-top: 20px;">
                        <legend style="margin-bottom: 0px;">NetworkSettings</legend>
                    </fieldset>
                                
                    {{if updated}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Subnet</span>
                                </div>
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>&nbsp;</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Gateway</span>
                                </div>
                            </div>
                            {{if IPAM.Config}}
                            {{for IPAM.Config}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>Subnet}}</span>
                                    
                                </div>                                
                                <div class="cubeui-col-sm1">
                                    <span style='line-height: 20px;padding-right:0px;'>&nbsp;</span>
                                </div>
                                <div class="cubeui-col-sm5">
                                    <span style='line-height: 20px;padding-right:0px;'>{{>Gateway}}</span>
                                </div>
                            </div>
                            {{/for}}
                            {{/if}}
                        </div>
                    </div>
                    {{else}}
                    <div class="cubeui-row">                            
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Subnet</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Gateway</span>
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addNetwork(this, 'network')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                
                            {{if IPAM.Config}}
                            {{for IPAM.Config}}                        
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>Subnet}}"
                                           name='network-name' data-options="required:false,prompt:'Subnet，Like what：172.17.0.0/16 '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>Gateway}}"
                                           name='network-value' data-options="required:false,prompt:'Gateway，Like what：172.17.0.1  '">
                                </div>
                                <div class="cubeui-col-sm2" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            {{/for}}
                            {{/if}}
                        
                        </div>
                    </div>
                    {{/if}}    
                </div>                
                </form>  
                
            </div>
            
            {{if updated}}
            <div title="活动Containers"
                 data-options="id:'eastTab1',iconCls:'fa fa-superpowers'">
                <div style="margin: 0px;">
                </div>
                
                <div id="relatedContainersDg-toolbar" class="cubeui-toolbar"
                     data-options="grid:{
                           type:'datagrid',
                           id:'relatedContainersDg'
                       }">
        
                    <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                            onClick:function(){
                                refreshConnectedContainers();
                            },
                            extend: '#relatedContainersDg-toolbar',
                            btnCls: 'cubeui-btn-orange',
                            iconCls: 'fa fa-refresh'
                        }">Refresh</a>
        
                    <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                            onClick:function(){
                                connectContainerDlg('{{>ID}}');
                            },
                            extend: '#relatedContainersDg-toolbar',
                            btnCls: 'cubeui-btn-blue',
                            iconCls: 'fa fa-link'
                        }">ConnectionContainers</a>
                </div>
                <!-- End of Table Toolbar -->
                
                <table id="relatedContainersDg"></table>
                
            </div>
            {{/if}}
            
        </div>
       
`

function onActivated(opts, title, idx){
    console.log('Image onActivated')
    reloadDg();
    //refreshCharts();
}
