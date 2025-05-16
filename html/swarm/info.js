function rendSwarmPage(){
    $.docker.request.info(local_node, function (data) {
        let d = {};

        d.info = $.extend({}, data);
        d.info.swarm = {};
        if(data.Swarm && !$.extends.isEmpty(data.Swarm.NodeID)){
            d.info.swarm.status = 'On';
            d.info.swarm.custerid = d.info.Swarm.Cluster?(d.info.Swarm.Cluster.ID+'[管理Nodes]'):'[工作Nodes]';
            d.info.swarm.nodeid = d.info.Swarm.NodeID;
            d.info.swarm.address = d.info.Swarm.NodeAddr;
        }else{
            d.info.swarm.status = 'Off';
        }

        if(d.info.RegistryConfig.Mirrors){
            d.info.Mirrors = d.info.RegistryConfig.Mirrors.join(" ")
        }

        if(d.info.MemTotal && d.info.MemTotal/1000000000>1){
            d.info.MemTotal = (d.info.MemTotal/1000000000.0).toFixed(2) + ' G'
        }else if(d.info.MemTotal){
            d.info.MemTotal = (d.info.MemTotal/1000000.0).toFixed(2) + ' M'
        }

        $.docker.request.version(local_node, function (vdata) {
            d.version = $.extend({}, vdata);

            $.docker.request.info(local_node, function (data) {

                APP.renderBody("#tmpl1", d);

                refreshSwarmData();

                let d1 = {};
                d1.info = $.extend({}, data);
                fillSwarmData(d1)

                $('#refreshBtn').switchbutton({
                    checked: true,
                    onText:'',offText:'',
                    onChange: function(checked){
                        console.log(checked);
                        if(checked){
                            let r = startSwarmInterval();
                            if(r){
                                $.app.show('自动Refresh已经开启')
                            }
                        }else{
                            stopSwamInterval();
                            $.app.show('自动Refresh已经Close')
                        }
                    }
                })

                startSwarmInterval()

            }, true);

        });
    })

    refreshSwarmInfo();
}

let swarm_handle = null

function stopSwamInterval(){
    if (swarm_handle){
        $.easyui.thread.stopLoop(swarm_handle)
    }
    swarm_handle = null
}

function startSwarmInterval(){
    if (swarm_handle){
        $.easyui.thread.stopLoop(swarm_handle)
    }

    swarm_handle = $.easyui.thread.loop(function (){
        refreshSwarmData();
    }, 5000)

    return swarm_handle
}

function fillSwarmData(data){


    if(data.info.Swarm && !$.extends.isEmpty(data.info.Swarm.Cluster)){
        $('#activeCount').text(data.info.Swarm.Nodes);
        $('#managerCount').text(data.info.Swarm.Managers);


        $('#imageCount').text(data.info.Images);
        $('#startCount').text(data.info.ContainersRunning);
        $('#containerCount').text(data.info.Containers);

    }else{

        if(data.info.Swarm && !$.extends.isEmpty(data.info.Swarm.NodeID)){
            $('#activeCount').text('N/A');
            $('#managerCount').text('非管理Nodes');
        }else{
            $('#activeCount').text('N/A');
            $('#managerCount').text('非SwarmEnvironment');
        }

        $('#imageCount').text('N/A');
        $('#startCount').text('N/A');
        $('#containerCount').text('N/A');
        $('#TaskCount').text('N/A');
        $('#TaskTotal').text('N/A');
    }


    let isChanged = false;
    window.parent.$('.title-summary').hide()

    if(data.info.Images != window.parent.$('.title-image').text()
        || data.info.ContainersRunning != window.parent.$('.title-container').text()
        || data.info.Containers != window.parent.$('.title-container2').text()){
        isChanged = true
    }

    window.parent.$('.title-image').text(data.info.Images)
    window.parent.$('.title-container').text(data.info.ContainersRunning)
    window.parent.$('.title-container2').text(data.info.Containers)


    if(isChanged){
        window.parent.$('.title-summary').show()
    }

}

function refreshSwarmData(){
    $.docker.request.info(local_node, function (data) {
        let d = {};
        d.info = $.extend({}, data);
        fillSwarmData(d)

    }, true);

    refreshUsages();
    refreshConfigCount();
    refreshServiceCount();

    refreshSwarmInfo();
}

function refreshSwarmInfo(){
    $.docker.request.volume.listAll(local_node, function (data) {
        let total = 0;
        let count = 0;

        if(data.Volumes){
            $.each(data.Volumes, function (idx, v) {
                total ++;
                if(v.Driver == 'local'){
                    count ++;
                }
            })
        }

        $('#volumeCount').text(count);
        $('#volumeTotal').text(total);
        //window.parent.$('.title-volume').text(total);
        window.parent.$('.title-volume').text(total);
    }, true);
}

function leaveSwarm(){
    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>ExitSwarmCluster选项</legend>
                    </fieldset>

                    <div style="margin-top:5px">    
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm3">
                                    <label class="cubeui-form-label" title="If selected；Forced Leaveswarm，Even if it\'s the last manager，否则它将破坏Cluster。">Forced Leave:</label>
                                    <div class="cubeui-input-block">
                                        <input data-toggle="cubeui-switchbutton"
                                            name="force" value="1" data-options="onText:'',offText:'',width:60">
                                    </div>
                                </div>
                            </div> 
                            
                            
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('ExitSwarmCluster', '确认ExitSwarmCluster的选项？', import_html,
        function(param, closeFn) {
            console.log(param)

            $.docker.request.swarm.leave(function (json, xhr, state) {
                $.app.info("SwarmClusterExit成功", function () {
                    closeFn();
                    window.location.reload()
                })
            }, node, param.force==1);

        }, null, 480, 750)
}

function copyToken(obj){
    let t = $(obj);

    let token = t.parent().find('t').text();

    $.extends.copyToClipBoard(token, function () {
        $.app.show('Copy到剪贴板成功')
    },function () {
        $.app.show('Failed to copy to clipboard')
    })
}

function openTokenDlg(){
    let node = local_node;
    $.docker.request.swarm.inspect(function (response) {

        $.docker.request.info(node, function (res) {

            if($.extends.isEmpty(res.Swarm.RemoteManagers)){
                $.app.show("非管理Nodes，无法查看token");
                return false;
            }

            let advertises = [];
            $.each(res.Swarm.RemoteManagers, function (idx, v) {
                advertises.push(v.Addr)
            })

            advertises = advertises.join(",");

            let import_html = `
                    <div style="margin: 0px;">
                    </div>
                    <div class="cubeui-fluid showtoken">
                        <fieldset>
                            <legend>SwarmClustertoken</legend>
                        </fieldset>
    
                        <div style="margin-top:5px">
                                <div class="cubeui-row" style="margin-top: 5px">
                                    <div class="cubeui-col-sm12" style="margin-top: 5px">
                                        <label class="cubeui-form-label" title="AddSWARMCluster的管理Nodesadvertise-addr">
                                        Advertise:
                                        </label>
                                        
                                        <div class="cubeui-input-block">
                                        <span><t class="textspan">{2}</t>
                                           <button type='button' style='float: right;' class="layui-btn-blue layui-btn layui-btn-xs" onclick="copyToken(this);">Copy</button>
                                        </span>
                                        </div>
                                    </div>  
                                    
                                    <div class="cubeui-col-sm12" style="margin-top: 5px">
                                        <label class="cubeui-form-label" title="作为工作Nodes可以UsetokenAddSWARMCluster">
                                        工作Nodestoken:
                                        </label>
                                        
                                        <div class="cubeui-input-block">
                                        <span><t>{0}</t>
                                           <button type='button' style='float: right;' class="layui-btn-blue layui-btn layui-btn-xs" onclick="copyToken(this);">Copy</button>
                                        </span>
                                        </div>
                                    </div>  
                                    
                                    
                                    <div class="cubeui-col-sm12" style="margin-top: 15px">
                                        <label class="cubeui-form-label" title="作为管理Nodes可以UsetokenAddSWARMCluster">
                                        管理Nodestoken:</label>
                                        <div class="cubeui-input-block">
                                        <span><t>{1}</t>
                                        <button type='button' style='float: right;' class="layui-btn-orange layui-btn layui-btn-xs" onclick="copyToken(this);">Copy</button>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                
                        </div>
                    </div>
            `.format(response.JoinTokens.Worker, response.JoinTokens.Manager, advertises);

            $.docker.utils.optionConfirm('SwarmClustertoken', null, import_html, function(param, closeFn) {
                closeFn();
            }, null, null, 800);
        })

    }, node)
}

function openJoinSwarmDlg(){

    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>SwarmClusterAdd选项</legend>
                    </fieldset>

                    <div style="margin-top:5px">
                            <div class="cubeui-row" style="margin-top: 5px">
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="通告给其他Nodes的外部可访问Address。这It could be192.168.1.1:4567Format的Address/Port组合，也It could be后跟Port号的Interface，如eth0:4567。如果省略Port号，则Use侦听Address中的Port号。If not specifiedAdvertiseAddr，It will be detected automatically, if possible">
                                    Send Address:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="AdvertiseAddr" data-options="
                                            prompt:'Advertised addressSend Address（Format：<ip |Interface>[：Port]）; 如果省略Port号，则Use侦听Address中的Port号',                                            
                                            required:true,
                                            " >  
                                    </div>
                                </div>  
                                
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="Intercepting addresses used to manage inter-manufacturer communications，and identified for useVXLANTunnel End（VTEP）的网络Interface。这It could be192.168.1.1:4567Format的Address/Port组合，也It could be后跟Port号的Interface，如eth0:4567。如果省略Port号，则Use默认swarm侦听Port">
                                    Communications interception address:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="ListenAddr"
                                               value='0.0.0.0:2377'
                                               data-options="
                                                        required:true,prompt:'Intercepting addresses used to manage inter-manufacturer communications。如果省略Port号，则Use默认swarm侦听Port; It could be192.168.1.1:4567Format。也It could beeth0:4567'
                                                        "
                                        >
                                    </div>
                                </div>
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px;">
                                    <label class="cubeui-form-label" title="用于数据路径通信的Addressor interface（Format：<ip | interface>），For example:192.168.1.1or interface，
                                    如eth0。If not specifiedDataPathAddr，则Use与AdvertiseAddr相同的Address。DataPathAddr指定全局作用域网络驱动程序将向其他Nodes发布的Address，以便访问在此Nodes上运行的容器。Use此参数可以将容器数据流量与Cluster的管理流量分离。">
                                    Data address:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="DataPathAddr" data-options="
                                            prompt:'用于数据路径通信的Addressor interface（Format：<ip | interface>）; If not specifiedDataPathAddr，则Use与AdvertiseAddr相同的Address',                                            
                                            required:false,
                                            " >  
                                    </div>
                                </div>  
                                
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px;">
                                    <label class="cubeui-form-label" title="Participatedswarm的managerNodes的Address。">
                                    managerAddress:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="RemoteAddrs" data-options="
                                            prompt:'Participatedswarm的managerNodes的Address。MultiplemanagerUse,No. Separate',                                            
                                            required:true,
                                            " >  
                                    </div>
                                </div>  
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px;">
                                    <label class="cubeui-form-label" title="Add此群的秘密token。">
                                    秘密token:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="JoinToken" data-options="
                                            prompt:'Add此群的秘密token。',     
                                            multiline:true,                                       
                                            required:true,
                                            height:60,
                                            " >  
                                    </div>
                                </div>  
                                
                            </div>
                            
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('AddSwarmCluster', '确认AddSwarmCluster的选项？', import_html,
        function(param, closeFn) {
            console.log(param)

            if ($.extends.isEmpty(param.AdvertiseAddr)) {
                $.app.show("_Other OrganiserAdvertised addressSend Address")
                return false;
            }

            if ($.extends.isEmpty(param.JoinToken)) {
                $.app.show("_Other OrganiserAdd此群的秘密token")
                return false;
            }

            if ($.extends.isEmpty(param.RemoteAddrs)) {
                $.app.show("_Other OrganiserAdd此swarm的managerNodes的Address")
                return false;
            }

            let values = param.RemoteAddrs.split2(" ")

            if($.extends.isEmpty(values)) {
                $.app.show("_Other OrganiserAdd此swarm的managerNodes的Address")
                return false;
            }

            let data = {
                Spec:{

                }
            };

            data.RemoteAddrs = values;

            data.AdvertiseAddr = param.AdvertiseAddr;

            if(!$.extends.isEmpty(param.ListenAddr)){
                data.ListenAddr = param.ListenAddr;
            }

            if(!$.extends.isEmpty(param.DataPathAddr)){
                data.DataPathAddr = param.DataPathAddr;
            }

            data.JoinToken = param.JoinToken;


            $.docker.request.swarm.join(function (json, xhr, state) {
                $.app.info("AddSwarmCluster成功", function () {
                    closeFn();
                    window.location.reload()
                })
            }, node, data);

        }, null, 480, 750)
}

function openInitSwarmDlg(){

    let node = local_node;

    let import_html = `
                <div style="margin: 0px;">
                </div>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>SwarmClusterInitialize选项</legend>
                    </fieldset>

                    <div style="margin-top:5px">
                            <div class="cubeui-row" style="margin-top: 5px">
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="通告给其他Nodes的外部可访问Address。这It could be192.168.1.1:4567Format的Address/Port组合，也It could be后跟Port号的Interface，如eth0:4567。如果省略Port号，则Use侦听Address中的Port号。If not specifiedAdvertiseAddr，It will be detected automatically, if possible">
                                    Send Address:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="AdvertiseAddr" data-options="
                                            prompt:'Advertised addressSend Address（Format：<ip |Interface>[：Port]）; 如果省略Port号，则Use侦听Address中的Port号',                                            
                                            required:true,
                                            " >  
                                    </div>
                                </div>  
                                
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="Intercepting addresses used to manage inter-manufacturer communications，and identified for useVXLANTunnel End（VTEP）的网络Interface。这It could be192.168.1.1:4567Format的Address/Port组合，也It could be后跟Port号的Interface，如eth0:4567。如果省略Port号，则Use默认swarm侦听Port">
                                    Communications interception address:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="ListenAddr"
                                               value='0.0.0.0:2377'
                                               data-options="
                                                        required:true,prompt:'Intercepting addresses used to manage inter-manufacturer communications。如果省略Port号，则Use默认swarm侦听Port; It could be192.168.1.1:4567Format。也It could beeth0:4567'
                                                        "
                                        >
                                    </div>
                                </div>
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px;">
                                    <label class="cubeui-form-label" title="用于数据路径通信的Addressor interface（Format：<ip | interface>），For example:192.168.1.1or interface，
                                    如eth0。If not specifiedDataPathAddr，则Use与AdvertiseAddr相同的Address。DataPathAddr指定全局作用域网络驱动程序将向其他Nodes发布的Address，以便访问在此Nodes上运行的容器。Use此参数可以将容器数据流量与Cluster的管理流量分离。">
                                    Data address:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-textbox" name="DataPathAddr" data-options="
                                            prompt:'用于数据路径通信的Addressor interface（Format：<ip | interface>）; If not specifiedDataPathAddr，则Use与AdvertiseAddr相同的Address',                                            
                                            required:false,
                                            " >  
                                    </div>
                                </div>  
                                
                                
                                <div class="cubeui-col-sm12" style="margin-top: 5px;">
                                    <label class="cubeui-form-label" title="DataPathPort指定数据通信的数据路径Port号。可接受的Port范围为1024到49151。
                                    如果未SettingsPort或Settings为0，则将Use默认Port4789。">
                                    数据路径Port:</label>
                                    <div class="cubeui-input-block">
                                        <input  data-toggle="cubeui-numberspinner" name="DataPathPort" data-options="
                                            prompt:'指定数据通信的数据路径Port号。可接受的Port范围为1024到49151。如果未SettingsPort，则将Use默认Port4789。',                                            
                                            required:false,
                                            min:1014,
                                            max:49151
                                            " >  
                                    </div>
                                </div>  
                                
                            </div>
                            
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm12" style="margin-top: 5px">
                                    <label class="cubeui-form-label" title="SWARMClusterSettings的任意键/值Label的元数据,Format为KEY1=VALUE1[ KEY2=VAVLUE2]">Label:</label>
                                    <div class="cubeui-input-block">
                                        <input type="text" data-toggle="cubeui-textbox" name="Labels"
                                               value=''
                                               data-options="
                                                        required:false,prompt:'键/值Label的元数据,Format为KEY1=VALUE1[ KEY2=VAVLUE2]。'
                                                        "
                                        >
                                    </div>
                                </div> 
                            </div> 
                            
                            
                    </div>
                </div>
        `;

    $.docker.utils.optionConfirm('Initialize想新的SwarmCluster', '确认Initialize新的SwarmCluster的选项？', import_html,
        function(param, closeFn) {
            console.log(param)

            if ($.extends.isEmpty(param.AdvertiseAddr)) {
                $.app.show("_Other OrganiserAdvertised addressSend Address")
                return false;
            }

            let data = {
                Spec:{

                }
            };
            data.AdvertiseAddr = param.AdvertiseAddr;

            if(!$.extends.isEmpty(param.ListenAddr)){
                data.ListenAddr = param.ListenAddr;
            }

            if(!$.extends.isEmpty(param.DataPathAddr)){
                data.DataPathAddr = param.DataPathAddr;
            }

            if(!$.extends.isEmpty(param.DataPathPort)){
                data.DataPathPort = param.DataPathPort;
            }

            if(!$.extends.isEmpty(param.Name)){
                data.Spec.Name = param.Name;
            }

            if(!$.extends.isEmpty(param.Labels)){
                let values = param.Labels.split2(" ")
                if(!$.extends.isEmpty(values)) {
                    data.Spec.labels = $.docker.utils.getKeyValue(values);
                }
            }

            $.docker.request.swarm.init(function (json, xhr, state) {
                $.app.info("SwarmClusterInitialize成功", function () {
                    closeFn();
                    window.location.reload()
                })
            }, node, data);

        }, null, 480, 750)
}

function refreshConfigCount(){
    $.docker.request.config.total(function(response){
        $('#configCount').text(response.total)
    }, local_node, 0, 0);
}

function refreshServiceCount(){
    $.docker.request.service.total(function(response){
        $('#ServiceCount').text(response.total);
        let DesiredTasks = 0;
        let RunningTasks = 0
        $.each(response.list, function (idx, v) {
            DesiredTasks += $.extends.isEmpty(v.ServiceStatus.DesiredTasks, 0);
            RunningTasks += $.extends.isEmpty(v.ServiceStatus.RunningTasks, 0);
        });
        $('#ReplicasCount').text(DesiredTasks);
        $('#TaskCount').text(RunningTasks);


        $.docker.request.task.listTotal(function(response){
            $('#TaskTotal').text(response.total);
        }, local_node);

    }, local_node, 0, 0);
}

function onActivated(opts, title, idx){
    console.log('onActivated')
    refreshSwarmData();
    //refreshCharts();
}