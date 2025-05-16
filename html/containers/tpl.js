
let html_template = `
        <div data-toggle="cubeui-tabs" id='eastTabs'>
            <div title="ContainersInformation"
                 data-options="id:'eastTab0',iconCls:'fa fa-headphones'">                 
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>ContainersInformation</legend>
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
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>ID}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Path:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Path" readonly
                                       value='{{>Path}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Entrypoint:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Entrypoint" readonly
                                       value='{{>Config.EntrypointStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Args:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>ArgStr}}'
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
                            <label class="cubeui-form-label">Image:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>ImageName}} / {{>ImageID}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Restart Count:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{:RestartCount}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Port:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Port}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">IP:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>IPStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">MAC:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>MACStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Platform:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>Platform}}'
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
                                       value='{{>Driver}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">SizeRootFs:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{:SizeRootFs}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">SizeRw:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{:SizeRw}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">StartAt:</label>
                            <div class="cubeui-input-block">
                                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{if Running==1}}{{>StartAt}}{{else}}未Start{{/if}}'
                                       data-options="
                                            "
                                >
                                
                            </div>
                        </div>
                    </div>
                   
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">LastFinish:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>FinishAt}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ResolvConf:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>ResolvConfPath}}'
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
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>HostnamePath}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Hosts:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>HostsPath}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Log:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>LogPath}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                </div>          
                 
            </div>
            <div title="宿主ConfigureInformation"
                 data-options="id:'eastTab1',iconCls:'fa fa-superpowers'">
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>宿主Configure</legend>
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
                
                                <input type="text" data-toggle="cubeui-textbox" name="Driver" readonly
                                       value='{{>ID}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
						<!--
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Restart:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>HostConfig.RestartPolicy.Name}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
						-->
						<div class="cubeui-col-sm7">
                            <label class="cubeui-form-label" 
                            title="ContainersExit时要Apply的行为。Default情况下不会重新Start。每次重新Start前都会Increase一个不断Increase的延迟（是Before延迟的两倍，从100msStart），以PreventionServices器被淹没。">Restrategize:</label>
                            <div class="cubeui-input-block">
                
                                <input readonly type="text" id='view_RestartPolicy' data-toggle="cubeui-combobox" name="RestartPolicy"
                                       value1='{{>HostConfig.RestartPolicy.Name}}'
                                       data-options="
                                       onClear:function(){
                                                $('#MaximumRetryCount').numberspinner('disable')
                                       },
                                       onSelect:function(record){
                                            if(record && record.KEY == 'on-failure'){
                                                $('#MaximumRetryCount').numberspinner('enable')
                                            }else{
                                                $('#MaximumRetryCount').numberspinner('disable')
                                            }
                                       },                                                                              
                                       prompt:'ContainersExit时要Apply的行为。Default as不重新Start',
                                       required:false,
                                       valueField:'KEY',
                                       textField:'TEXT',
                                       data:[{'KEY':'no','TEXT':'不重新Start'},{'KEY':'always','TEXT':'始终重新Start'},
                                       {'KEY':'unless-stopped','TEXT':'除非User手动StopContainers，Otherwise..始终重新Start'},
                                       {'KEY':'on-failure','TEXT':'仅当ContainersExitCodeNot零时重新Start; 同时SettingsMaximum number of retries'}]
                                            "
                                >
                            </div>
                        </div>                        
                        <div class="cubeui-col-sm4">
                            <label class="cubeui-form-label">Maximum number of retries:</label>
                            <div class="cubeui-input-block">
                                <input readonly type="text" id='MaximumRetryCount' data-toggle="cubeui-numberspinner" name="MaximumRetryCount"
                                       value='{{:HostConfig.RestartPolicy.MaximumRetryCount}}'
                                       data-options="     
                                       disabled:true,                                   
                                       prompt:'仅当ContainersExitCodeNot零时重新Start。Maximum number of retries',                                                                   
                                       min:0,
                                       max:10000000,                                       
                                       required:false"
                                >
                            </div>
                        </div>                        
                        <div class="cubeui-col-sm1">						
							<a  href="javascript:void(0)" id='update_restart_policy_btn' data-toggle='cubeui-menubutton' data-options="{
								onClick:function(){
										updateRestartPolicy(this, '{{:ID}}');
								},
								btnCls: 'cubeui-btn-blue',
								iconCls: 'fa fa-pencil-square-o'
							}">Modify</a>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Privileged:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>HostConfig.Privileged}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Maximum Retry:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:HostConfig.RestartPolicy.MaximumRetryCount}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">ShmSize:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:HostConfig.ShmSizeStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">AutoRemove:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:HostConfig.AutoRemove}}'
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
                                            ">
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
                    <!--
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
					-->
                    <!--
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
                    -->
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
                            {{if Mounts}}
                            {{for Mounts}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:Source}}{{if RW}}(RW){{/if}}</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>{{:Destination}}</span>
                                </div>
                            </div>
                            {{/for}}
                            {{/if}}
                        </div>
                    </div>
                    
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">PortBindings</legend>
                    </fieldset>
                    
                    {{if HostConfig.PublishAllPorts}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm10 cubeui-col-sm-offset1">
                            <div class="cubeui-row">
                                <span style='line-height: 20px;padding-right:0px;'>为Containers的AllExposurePort分配临时HostPort</span>
                            </div>
                        </div>
                    </div>
                    {{else}}
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Port</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>PublishPort</span>
                                </div>
                            </div>
                            {{props HostConfig.BindingPortMap}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:key}}</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>{{:prop}}</span>
                                </div>
                            </div>
                            {{/props}}
                        </div>
                    </div>
                    {{/if}}
                
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
            
            
            <div title="ConfigureInformation" 
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
                        <div class="cubeui-col-sm6">
                            <label class="cubeui-form-label">Runtime:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{:HostConfig.Runtime}}'
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
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Cmd:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.CmdStr}}'
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">Entrypoint:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name" readonly
                                       value='{{>Config.EntrypointStr}}'
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
					
                    <!--
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
                    -->
					
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
                            {{if Mounts}}
                            {{for Mounts}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:Source}}{{if RW}}(RW){{/if}}</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>{{:Destination}}</span>
                                </div>
                            </div>
                            {{/for}}
                            {{/if}}
                        </div>
                    </div>
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">Port</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Port</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>PublishPort</span>
                                </div>
                            </div>
                            {{props PortMap}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:key}}</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>{{:prop}}</span>
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
                    
                    
                    <fieldset>
                        <legend style="margin-bottom: 0px;">StartCommand</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div class="cubeui-row"  style="margin-top: 0px;">
                                <div class="cubeui-col-sm10 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>{{:CmdLine}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>                
            </div>
            
            
            
            <div title="Json" 
             data-options="id:'eastTab_4',iconCls:'fa fa-text-width',fit:true, border:false">                   
                <div style="margin: 10px;">
                </div>
                
                <div class="cubeui-fluid">
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <div id="json" style="word-break:break-all!important;"></div>
                        </div>
                    </div>
                                       
                </div>
            </div>    
            
            
            <!--<div title="Console" 
             data-options="id:'eastTab_5',iconCls:'fa fa-text-width',fit:true, border:false">                   
                <div class="cubeui-col-sm12 container-termina-body">
                            <div id="container-terminal" sytle="width:99%;"></div>
                        </div>
            </div>   -->
                        
        </div>
        
`

let panel_buttons_html = `

        <a  href="javascript:void(0)" id='tab_start_btn' data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    startContainer('{0}');
            },
            btnCls: 'cubeui-btn-yellowgreen',
            iconCls: 'fa fa-play-circle'
        }">Start</a>
           
        <a  href="javascript:void(0)"  id='tab_stop_btn'  data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    stopContainer('{0}');
            },
            btnCls: 'cubeui-btn-brown',
            iconCls: 'fa fa-stop-circle'
        }">Stop</a>        
        <a  href="javascript:void(0)"  id='tab_stop_btn'  data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    exportContainer('{0}');
            },
            btnCls: 'cubeui-btn-silver',
            iconCls: 'fa fa-sign-out'
        }">Export</a>   
        <a  href="javascript:void(0)"  id='tab_stop_btn'  data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    cloneContainer('{0}');
            },
            btnCls: 'cubeui-btn-pink',
            iconCls: 'fa fa-clone'
        }">Cloning</a>   
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showLogTab('{0}')
            },
            btnCls: 'cubeui-btn-blue',
            iconCls: 'fa fa-history'
        }">Log</a>       
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showChangesTab('{0}')
            },
            btnCls: 'cubeui-btn-navy',
            iconCls: 'fa fa-random'
        }">Change</a>        
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showProcess('{0}')
            },
            btnCls: 'cubeui-btn-orange',
            iconCls: 'fa fa-spinner'
        }">Process</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showUsage('{0}')
            },
            btnCls: 'cubeui-btn-yellowgreen',
            iconCls: 'fa fa-thermometer-half'
        }">Status</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showExportFile('{0}')
            },
            btnCls: 'cubeui-btn-limegreen',
            iconCls: 'fa fa-sign-out'
        }">ArchiveDocumentation</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showImportFile('{0}')
            },
            btnCls: 'cubeui-btn-dodgerblue',
            iconCls: 'fa fa-sign-in'
        }">ImportDocumentation</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    showConsolePanel('{0}')
            },
            btnCls: 'cubeui-btn-DeepSkyBlue',
            iconCls: 'fa fa-terminal'
        }">Control台</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    lsContainer('{0}')
            },
            btnCls: 'cubeui-btn-BrightGold',
            iconCls: 'fa fa-clone'
        }">DocumentationSystem</a>
         <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    $('#layout').layout('collapse', 'east');
            },
            btnCls: 'cubeui-btn-red',
            iconCls: 'fa fa-close'
        }">Close</a>
`;

let processes_tab_html = `
        <!-- Table Toolbar Start -->
        <div id="processesDg-toolbar" class="cubeui-toolbar"
             data-options="grid:{
                   type:'datagrid',
                   id:'processesDg'
               }">

            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                    onClick:function(){
                        pauseLease('{0}');
                    },
                    extend: '#processesDg-toolbar',
                    btnCls: 'cubeui-btn-orange',
                    iconCls: 'fa fa-pause-circle-o'
                }">PauseProcess</a>
                
                
            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                    onClick:function(){
                        resumeLease('{0}');
                    },
                    extend: '#processesDg-toolbar',
                    btnCls: 'cubeui-btn-blue',
                    iconCls: 'fa fa-play-circle-o'
                }">RestoreProcess</a>
            <form class="search-box">    
            
                <span style='line-height: 30px;padding-right:0px'>ShowFormat：</span>
                <input type="text" value="aux" data-toggle="cubeui-combobox"
                       data-options="
                                width:220,
                                required:true,prompt:'ResultShowFormat，Select Fill，Defaultaux',
                                valueField:'KEY',
                                onSelect:function(record){
                                    try{
                                        let param = $.extend({}, $('#processesDg').datagrid('options').queryParams);
                                        param.ARGS = record.KEY;
                                        $('#processesDg').datagrid('reload', param);
                                    }catch(e){
                                    }
                                },
                                textField:'TEXT',
                                data:[{'KEY':'aux','TEXT':'aux'},{'KEY':'-ef','TEXT':'-ef'}]
                       ">
            </form>
        </div>
        <!-- End of Table Toolbar -->
        
    <table id="processesDg"></table>
`;

let changes_tab_html = `
        <!-- Table Toolbar Start -->
        <div id="changesDg-toolbar" class="cubeui-toolbar"
             data-options="grid:{
                   type:'datagrid',
                   id:'changesDg'
               }">
                
            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                    onClick:function(){
                        $('#changesDg').datagrid('reload');
                    },
                    extend: '#changesDg-toolbar',
                    btnCls: 'cubeui-btn-orange',
                    iconCls: 'fa fa-refresh'
                }">Refresh</a>
        
            <form id="changes_queryForm" class="search-box">            
                <input type="text" id='path_key' name="path_key" data-toggle="cubeui-textbox"
                       data-options="onClear:function(){                        
                            $('#changes_searchbtn').trigger('click');
                       }, prompt:'Question条件；多条件逗No. Separate；/etc/conf,/var/run',width:420">
                <a href="javascript:void(0)" id="changes_searchbtn"
                   data-toggle="cubeui-menubutton"
                   data-options="method:'query',
                   iconCls:'fa fa-search',
                   btnCls:'cubeui-btn-blue',
                   form:{id:'changes_queryForm'},
                   grid:{type:'datagrid','id':'changesDg'}">Question</a>
            </form>
        </div>
        <!-- End of Table Toolbar -->
            
    <table id="changesDg"></table>
`;

let usage_tab_html = `

                <!--  COL 8 -->
                <div class="layui-row">
                    <div class="layui-col">
                        <div class="card card-hoverable">
                            <div class="card-head">
                                <span class="card-head-icon"><i class="fa fa-table icon"></i></span>
                                <span>资源Usage</span>
                                <span style='float: right;position: absolute;right: 20px;height: 48px;'></span>
                            </div>
                            <div class="card-body padding-card-body" >
                            
                                <div class="layui-row layui-col-space10">
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-blue">Real time</span>
                                                    <h5>CPUNumerical</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins"><t class="online_cpus">3</t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-cyan">Real time</span>
                                                    <h5>AvailableCPU</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins "><t class="system_cpu_delta"></t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
    
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-orange">Real time</span>
                                                    <h5>AvailableMemory</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins "><t class="available_memory"></t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-green">Real time</span>
                                                    <h5>AvailableDocumentation数</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins "><t class="limit"></t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-red">Real time</span>
                                                    <h5>BLOCK IO</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins "><t class="blockio"></t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="layui-col-md2">
                                        <div class="panel layui-bg-number">
                                            <div class="panel-body">
                                                <div class="panel-title">
                                                    <span class="label pull-right layui-bg-black">Real time</span>
                                                    <h5>NET IO</h5>
                                                </div>
                                                <div class="panel-content">
                                                    <h1 class="no-margins "><t class="netio"></t>&nbsp;</h1>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                </div>
                            
                                <div class="layui-row layui-col-space10">
                                    <div class="layui-col-md12" style="padding:10px">
                                         <div class="nepadmin-pad-b20">
                                                <h2 class="nepadmin-pad-b10">
                                                  CPUUsage<span class="nepadmin-font-14 nepadmin-c-gray nepadmin-fr"><t class='cpu-usages-1'></t> / <t class='cpu-usages-value'>85%</t>（<t class='cpu-usages-value-2'>15</t><span class="layui-edge layui-edge-top cpu-usages-value-3" lay-tips="Growth" lay-offset="-15"></span>）</span>
                                                </h2>
                                                <div class="layui-progress">
                                                  <div class="layui-progress-bar layui-bg-blue cpu-usages" style="width: 85%;"></div>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="layui-col-md12" style="padding:10px">
                                          <div class="nepadmin-pad-b20">
                                                <h2 class="nepadmin-pad-b10">
                                                  Memory occupancy rate<span class="nepadmin-font-14 nepadmin-c-gray nepadmin-fr"><t class='memory-usages-1'></t> / <t class='memory-usages-value'>58%</t>（<t class='memory-usages-value-2'></t><span class="layui-edge layui-edge-bottom memory-usages-value-3" lay-tips="Down" lay-offset="-15"></span>）</span>
                                                </h2>
                                                <div class="layui-progress">
                                                  <div class="layui-progress-bar layui-bg-red  memory-usages" style="width: 58%;"></div>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="layui-col-md12" style="padding:10px">
                                          <div class="nepadmin-pad-b20">
                                                <h2 class="nepadmin-pad-b10">
                                                  DocumentationThe handleUsage<span class="nepadmin-font-14 nepadmin-c-gray nepadmin-fr"><t class='pid-usages-1'></t> / <t class='pid-usages-value'>58%</t>（<t class='pid-usages-value-2'></t><span class="layui-edge layui-edge-bottom pid-usages-value-3" lay-tips="Down" lay-offset="-15"></span>）</span>
                                                </h2>
                                                <div class="layui-progress">
                                                  <div class="layui-progress-bar layui-bg-orange  pid-usages" style="width: 58%;"></div>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="layui-row net-io-div">
                                    
                                        
                                        
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
`;

let log_tab_html = `
                <style>
                    .align-center {
                        text-align: center;
                    }
                    .margin-top-10{
                        margin-top: 10px;
                    }
                    .layui-container-fluid {
                        margin: 5px;
                    }
                    .table-label{
                        min-width: 90px!important;
                    }
                    .table-value{
                        word-break:break-all!important;
                    }
                </style>
                
                <div style="background-color: #f7f7f7;" class="cubeui-content-selectable">
                    <div class="layui-fluid">
                        <table class="layui-table" style="margin: 0px 0;">
                            <thead>
                            <tr>
                                <th colspan="6" style="text-align: center">{{:Name}} <t>{{if Running==1}}[Started]{{else}}[Stopped]{{/if}}</t> </th>
                            </tr>
                            </thead>
                            <tr>
                                <td class="table-label">LastFinishAt：</td>
                                <td >{{>FinishAt}}</td>
                                <td class="table-label"></td>
                                <td class="table-label"></td>
                            </tr>
                        </table>
                        <table class="layui-table" style="margin: 0px 0;">
                            <tr>
                                <td class="table-label" colspan="6" >
                                    <div class=" container-logs" style="min-height: 300px">
                                    </div>
                                </td>
                            </tr>
                        </table>
                
                    </div>
                </div>
`

let netio_div_html = `
                                    <div class="layui-col-md12" style="padding:10px">
                                              <div class="nepadmin-pad-b20">
                                                    <h2 class="nepadmin-pad-b10">
                                                      {0}<span class="nepadmin-font-14 nepadmin-c-gray nepadmin-fr"><t class='{1}-usages-1'></t> / <t class='{1}-usages-value'>58%</t>（<t class='{1}-usages-value-2'></t><span class="layui-edge layui-edge-bottom {1}-usages-value-3" lay-tips="Down" lay-offset="-15"></span>）</span>
                                                    </h2>
                                                    <div class="layui-progress">
                                                      <div class="layui-progress-bar layui-bg-green  {1}-usages" style="width: 58%;"></div>
                                                    </div>
                                              </div>
                                        </div>
`;


let create_container_html = `
<div data-toggle="cubeui-tabs" id='eastTabs'>
            <div title="ContainersInformation"
                 data-options="id:'eastTab0',iconCls:'fa fa-headphones'">                 
                <div style="margin: 0px;">
                </div>
                <form id='createContainerForm'>
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>ContainersInformation</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" 
                            title="将AssignedName分配给Containers。必须Match/？[a-zA-Z0-9][a-zA-Z0-9_-]+">NAME:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Name"
                                        {{if Flag!='2'}}
                                       value='{{>Name}}'
                                       {{/if}}
                                       data-options="
                                       prompt:'将AssignedName分配给Containers',
                                       required:false,
                                       ">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" 
                            title="Create Container时要Use的图像的Name（或References），或Create Container时Use的图像的Name（或References）。">IMAGE:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" data-toggle="cubeui-textbox" name="Image"
                                       value='{{>Image}}'
                                       data-options="                                       
                                       prompt:'Create Container时要Use的Mirror的Name（或References）',
                                       required:true,
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="RunCommand的Working Directory">Working Directory:</label>
                            <div class="cubeui-input-block">                
                                <input type="text" data-toggle="cubeui-textbox" name="WorkingDir"
                                       value='{{:Config.WorkingDir}}'
                                       data-options="                                       
                                       prompt:'RunCommand的Working Directory',
                                       required:false,
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm7">
                            <label class="cubeui-form-label" 
                            title="ContainersExit时要Apply的行为。Default情况下不会重新Start。每次重新Start前都会Increase一个不断Increase的延迟（是Before延迟的两倍，从100msStart），以PreventionServices器被淹没。">Restrategize:</label>
                            <div class="cubeui-input-block">
                
                                <input type="text" id='create_RestartPolicy' data-toggle="cubeui-combobox" name="RestartPolicy"
                                       value=''
                                       data-options="
                                       onClear:function(){
                                                $('#MaximumRetryCount').numberspinner('disable')
                                       },
                                       onSelect:function(record){
                                            if(record && record.KEY == 'on-failure'){
                                                $('#MaximumRetryCount').numberspinner('enable')
                                            }else{
                                                $('#MaximumRetryCount').numberspinner('disable')
                                            }
                                       },                                                                              
                                       prompt:'ContainersExit时要Apply的行为。Default as不重新Start',
                                       required:false,
                                       valueField:'KEY',
                                       textField:'TEXT',
                                       data:[{'KEY':'no','TEXT':'不重新Start'},{'KEY':'always','TEXT':'始终重新Start'},
                                       {'KEY':'unless-stopped','TEXT':'除非User手动StopContainers，Otherwise..始终重新Start'},
                                       {'KEY':'on-failure','TEXT':'仅当ContainersExitCodeNot零时重新Start; 同时SettingsMaximum number of retries'}]
                                            "
                                >
                            </div>
                        </div>                        
                        <div class="cubeui-col-sm5">
                            <label class="cubeui-form-label">Maximum number of retries:</label>
                            <div class="cubeui-input-block">
                                <input type="text" id='MaximumRetryCount' data-toggle="cubeui-numberspinner" name="MaximumRetryCount"
                                       value='{{:HostConfig.RestartPolicy.MaximumRetryCount}}'
                                       data-options="     
                                       disabled:true,                                   
                                       prompt:'仅当ContainersExitCodeNot零时重新Start。Maximum number of retries',                                                                   
                                       min:0,
                                       max:10000000,                                       
                                       required:false"
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="ForContainers的Host名，As effectiveRFC 1123Host名。">Host名:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Hostname"
                                       value='{{>Hostname}}'
                                       data-options="
                                       prompt:'ForContainers的Host名，As effectiveRFC 1123Host名。',
                                       
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="ForContainers的域名。">Containers域名:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Domainname"
                                       value='{{>Domainname}}'
                                       data-options="
                                       prompt:'ForContainers的域名。',
                                       
                                            "
                                >
                            </div>
                        </div>
                    </div>
                
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="在Containers内RunCommand的User。">User:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="User"
                                       value='{{>User}}'
                                       data-options="
                                       prompt:'在Containers内RunCommand的User。',
                                       
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="For此Containers的NetworkMode。Support的StandardValue as：: bridge, host, none, and container:：<name | id>。任何Other值都被视为此Containers应Connection到的自DefinitionsNetwork的Name。">NetworkMode:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="HostConfig.NetworkMode"
                                       value='{{>HostConfig.NetworkMode}}'
                                       data-options="
                                       prompt:'For此Containers的NetworkMode。bridge, host, none, and container:：<name | id>, Other值都被视为此Containers应Connection到的自DefinitionsNetwork',
                                       
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="DisableContainers的Network">DisableContainersNetwork:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                    name="NetworkDisabled" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="当Containers的ProcessExit时AutoDeleteContainers。IfSettings了RestartPolicy，则此Operation无效。">AutoDelete:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if HostConfig.AutoRemove}}checked{{/if}} 
                                    name="AutoRemove" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm3">
                            <label class="cubeui-form-label" title="授予Containers对Host的完全Visits权限">Grant full authority:</label>
                            <div class="cubeui-input-block">
                                <input data-toggle="cubeui-switchbutton" 
                                {{if HostConfig.Privileged}}checked{{/if}} 
                                    name="Privileged" value="1" data-options="onText:'',offText:'',width:60">
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label" title="ContainersRunCommand">ContainersRunCommand:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Cmd"
                                       value='{{>Config.CmdStr}}'
                                       data-options="
                                       prompt:'ContainersRunCommand',
                                       
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label"  title="If由空Character串组成，则Entry pointReset为SystemDefault value（即docker在Dockerfile中NothingEntry point指令时Use的Entry point）。">ContainersEntry point:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Entrypoint"
                                       value='{{>Config.EntrypointStr}}'
                                       data-options="
                                       prompt:'If由空Character串组成，则Entry pointReset为SystemDefault value（即docker在Dockerfile中NothingEntry point指令时Use的Entry point）',
                                            "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <fieldset  style="margin-top: 20px!important;margin-bottom1: 10px;" title="AssignForBased on此规范Create的Tasks的LogDriver程序。Ifdoes not exist，则将Useswarm的DefaultDriver程序，If not specified，则最终Back到EngineDefaultDriver程序。">
                        <legend style="margin-bottom: 0px;">LogDriver</legend>
                    </fieldset>
        
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm6" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="Create的Tasks的LogDriver程序">Log Driver:</label>
                            <div class="cubeui-input-block">
                                <input type="text" name="HostConfig.LogConfig.Type" 
                                value="{{>HostConfig.LogConfig.Type}}" data-toggle="cubeui-combobox"
                                       data-options="
                                        required:false,
                                        prompt:'Create的Tasks的LogDriver程序，Default asswarm的DefaultDriver程序',
                                        valueField:'KEY',
                                        textField:'TEXT',
                                        data:$.docker.utils.getLocalLog()
                               ">
                            </div>
                        </div>
                    </div>
        
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Configure项</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Configure值</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                            <span style='line-height: 20px;padding-right:0px;'>
                                                <span onClick="$.docker.utils.ui.addLogOpts(this, 'cnt-log-driver')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                            </span>
                                </div>
                                
                                {{if HostConfig.LogConfig.Config}}
                                {{props HostConfig.LogConfig.Config}}
                                <div class="cubeui-row">
                                    <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                        <input type="text" data-toggle="cubeui-textbox" value="{1}"
                                               name='cnt-log-driver-name' data-options="required:false,prompt:'LogDriverConfigure项，Like what：max-log-count '">
                                    </div>
                                    <div class="cubeui-col-sm5">
                                        <input type="text" data-toggle="cubeui-textbox" value="{2}"
                                               name='cnt-log-driver-value' data-options="required:false,prompt:'LogDriverConfigure值，Like what：10 '">
                                    </div>
                                    <div class="cubeui-col-sm1" style="text-align: center">
                                        <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                    </div>
                                </div>   
                                {{/props}}
                                {{/if}}
                            </div>
                        </div>
                    </div>
                    
                    <fieldset  style="margin-top: 20px!important;margin-bottom1: 10px;" title="Health testing strategy(ForInspectionContainersWhether or not健康的测试)">
                        <legend style="margin-bottom: 10px;">Health testing strategy(ForInspectionContainersWhether or not健康的测试)</legend>
                    </fieldset>
        
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="要Implemented测试。Possible value为:空值从映像或父映像Successionhealthcheck; NONEDisablehealthcheck;
                                    CMD args直接ImplementationParameters;CMD-SHELL commandUseSystem的DefaultSHELLRunCommand">Test:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="Healthcheck.Test"
                                       value='{{>Healthcheck.Test}}'
                                       data-options="
                                               prompt:'要Implemented测试。Possible value为:Empty从映像或父映像Successionhealthcheck; NONEDisablehealthcheck;CMD args直接ImplementationParameters;CMD-SHELL commandUseSystem的DefaultSHELLRunCommand；UseSpaceSeparate'
                                                    "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="InspectionBetween的等待Time（nanoseconds）。It should read0Or at least1000000（1milliseconds）。
                                    0OrganisationSuccession。">Interval(ns):</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-numberspinner" name="Healthcheck.Interval"
                                       value='{{>Healthcheck.Interval}}'
                                       data-options="
                                       prompt:'InspectionBetween的等待Time（nanoseconds）。It should read0Or at least1000000（1milliseconds）。0OrganisationSuccession。',
                                       min:0
                                                    "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="在Inspection认为为已挂时的等待Time。
                                    It should read0Or at least1000000（1milliseconds）。0OrganisationSuccession。">Timeout(ns):</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-numberspinner" name="Healthcheck.Timeout"
                                       value='{{>Healthcheck.Timeout}}'
                                       data-options="
                                       prompt:'在Inspection认为为已挂时的等待Time。It should read0Or at least1000000（1milliseconds）。0OrganisationSuccession。',
                                       min:0
                                                    "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="认为Containers不健康所需的连续故障数。
                                    0OrganisationSuccession。">Retries:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-numberspinner" name="Healthcheck.HealthCheck."
                                       value='{{>Healthcheck.Retries}}'
                                       data-options="
                                       prompt:'认为Containers不健康所需的连续故障数。0OrganisationSuccession。',
                                       min:0
                                                    "
                                >
                            </div>
                        </div>
                        <div class="cubeui-col-sm6" style="margin-top: 2px">
                            <label class="cubeui-form-label" title="ContainersInitialize后StartRun健康Inspection的StartTime（nanoseconds）。
                                    It should read0Or at least1000000（1milliseconds）。0OrganisationSuccession。">StartPeriod(ns):</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-numberspinner" name="Healthcheck.StartPeriod"
                                       value='{{>Healthcheck.StartPeriod}}'
                                       data-options="
                                       prompt:'ContainersInitialize后StartRun健康Inspection的StartTime（nanoseconds）',
                                       min:0
                                                    "
                                >
                            </div>
                        </div>
                    </div>
                    
                    <div style="padding-top: 10px;" class="cubeui-row" title="ContainersPort到HostPort的Map，UseContainers的Port号和Agreements作为密钥，Format为<port>/<protocol>，For example:80/udp。If为MultipleAgreementsMap了Containers的Port，则会向Map表中Add单独的条目。">
                        <fieldset >
                            <legend style="margin-bottom: 0px;">
                            ContainersPortRelease到Host
                                        <span style='line-height: 20px;padding-right:0px'><b>&nbsp;&nbsp;&nbsp;&nbsp;分配临时HostPort</b></span>
                                     <input data-toggle="cubeui-checkbox"
                                     
                                {{if HostConfig.PublishAllPorts}}checked{{/if}} 
                                      
                                     name="PublishAllPorts" value="1" label="" data-options="
                                         onChange:function(checked){
                                            if(checked){
                                                $('#publish-ports-div input').disable();
                                                $('#publish-ports-div .fa-plus').disable();
                                                $('#publish-ports-div .fa-plus').hide();
                                            }else{
                                                $('#publish-ports-div input').enable();
                                                $('#publish-ports-div .fa-plus').enable();
                                                $('#publish-ports-div .fa-plus').show();
                                            }
                                         }
                                     ">
                            </legend>
                        </fieldset>
                    
                        <div class="cubeui-col-sm12 add-opt-div"  id="publish-ports-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>ContainersPort</span>
                                    
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Host</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addContainerPorts(this, 'PortBindings')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                            
                            
                        {{if HostConfig.BindingPortMap}}
                        {{props HostConfig.BindingPortMap}}
                            
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{:key}}"
                                           name='PortBindings-name' data-options="required:false,prompt:'UsePort号和Agreements，For example:80/tcp, 80/udp'">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{:prop}}"
                                           name='PortBindings-value' data-options="required:false,prompt:'HostMapPort, Format[ip:]port, For example:192.168.56.101:9999, 9999'">
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>   
                            
                        {{/props}}
                        {{/if}}
                        
                        </div>                      
                    </div>
                    
                    <div class="cubeui-row" title="Containers的卷TieList">
                        <fieldset>
                            <legend style="margin-bottom: 0px;">Containers的卷TieList</legend>
                        </fieldset>
                                        
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>HostPathOr..Data卷</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>ContainersObjectivePath</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addMounts(this, 'volume')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                            
                        {{if Mounts}}
                        {{for Mounts}}
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm4 cubeui-col-sm-offset2" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>Source}}" 
                                           name='volume-name' data-options="required:false,prompt:'Tie的HostPathOr..Data卷, HostPathMust be绝对Path'">
                                </div>
                                <div class="cubeui-col-sm3">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>Destination}}" 
                                           name='volume-value' data-options="required:false,prompt:'TieContainersObjectivePath, ObjectivePathMust be绝对Path'">
                                </div>
                                
                                <div class="cubeui-col-sm2">
                                        <span style='line-height: 30px;padding-left:5px' title='
                                         Disable将Data从ContainersPathAutoCopy到卷,仅适For卷
                                         ' ><b >nc</b></span>
                                        <input {{if Propagation=='rprivate'}}value="0"{{else}}value="1"{{/if}} type="hidden" name="nocopy" class="nocopy">       
                                         <input {{if Propagation=='rprivate'}}{{else}}checked{{/if}} data-toggle="cubeui-checkbox" name="volume-nocopy-opt" value="1" label="" data-options="
                                             onChange:function(checked){
                                                let obj = $(this).parent().find('input.nocopy')                                    
                                                if(checked){                                    
                                                    obj.val(1)
                                                }else{
                                                    obj.val(0)
                                                }
                                                console.log(obj)
                                             }
                                         ">
                                         <span style='line-height: 30px;padding-left:5px' title='
                                         只读或读写Modalities装入卷。IfCheck为rw，卷将以读写Modalities装入
                                         ' ><b >RW</b></span>
                                        <input {{if RW}}value="1"{{else}}value="0"{{/if}} type="hidden" name="rw"  class="rw" >       
                                         <input {{if RW}}checked{{/if}} data-toggle="cubeui-checkbox"                                     
                                          name="volume-rw-opt" value="1" label="" data-options="
                                             onChange:function(checked){
                                                let obj = $(this).parent().find('input.rw')                                    
                                                if(checked){                                    
                                                    obj.val(1)
                                                }else{
                                                    obj.val(0)
                                                }
                                                console.log(obj)
                                             }
                                         ">                             
                                         <span style='line-height: 30px;padding-left:5px' title='
                                         ApplySELinux以Allow或RejectMultipleContainers对同一卷Conduct读写, CheckOrganisation为共享Modalities，Otherwise..私有Modalities
                                         ' ><b >S</b></span>
                                        <input  {{if Mode=='z'}}value="1"{{else}}value="0"{{/if}} type="hidden" name="z"  class="z">       
                                         <input {{if Mode=='z'}}checked{{/if}} data-toggle="cubeui-checkbox" name="volume-z-opt" value="1" label="" data-options="
                                             onChange:function(checked){
                                                let obj = $(this).parent().find('input.z')                                    
                                                if(checked){                                    
                                                    obj.val(1)
                                                }else{
                                                    obj.val(0)
                                                }
                                                console.log(obj)
                                             }
                                         ">
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>       
                        {{/for}}
                        {{/if}}
                        </div>
                        
                    </div>
                    
                    <div class="cubeui-row" title="User definition的键/值元Data">
                        <fieldset>
                            <legend style="margin-bottom: 0px;">User definition的键/值元Data</legend>
                        </fieldset>
                                        
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>键</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>值</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addContainerOpts(this, 'Labels')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                                
                            {{if HostConfig.Labels}}
                            {{props HostConfig.Labels}}                        
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}"
                                           name='Labels-name' data-options="required:false,prompt:'Name，Like what：group '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='Labels-value' data-options="required:false,prompt:'Corresponding value，Like what：db '">
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            {{/props}}
                            {{/if}}
                        
                        </div>
                        
                        
                    </div>
                    
                    <div class="cubeui-row" title="YesContainers内Settings的EnvironmentVariablesList，Format为[“VAR=value”，…]。Not=的Variables将从Environment中Delete，Not具有空值">
                        <fieldset>
                            <legend style="margin-bottom: 0px;">Containers内的EnvironmentVariables</legend>
                        </fieldset>
                                        
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>Variables名</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Variables值</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addEnvs(this, 'Env')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                            
                            {{if Config.Env}}
                            {{props Config.Env}}   
                                          
                            <div class="cubeui-row">
                            
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}"
                                           name='Env-name' data-options="required:false,prompt:'Variables名，Like what：profile '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='Env-value' data-options="required:false,prompt:'Variables值，Like what：production '">
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>    
                            
                            {{/props}}
                            {{/if}}
                        
                        </div>
                        
                        
                    </div>
                    
                    <div class="cubeui-row" title="ContainersLinkList">
                        <fieldset>
                            <legend style="margin-bottom: 0px;">ContainersLink</legend>
                        </fieldset>
                                        
                        <div class="cubeui-col-sm12 add-opt-div">
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <span style='line-height: 20px;padding-right:0px;'>ObjectiveContainers名</span>
                                </div>
                                <div class="cubeui-col-sm5" >
                                    <span style='line-height: 20px;padding-right:0px;'>Link alias</span>
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 20px;padding-right:0px;'>
                                        <span onClick="$.docker.utils.ui.addContainerLinks(this, 'Links')"  class="ops-fa-icon fa fa-plus" style="font-size:14px!important;">&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                            
                            {{if HostConfig.Links}}
                            {{props HostConfig.Links}}
                            
                            <div class="cubeui-row">
                                <div class="cubeui-col-sm5 cubeui-col-sm-offset1" style="padding-right: 5px">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>key}}" 
                                           name='Links-name' data-options="required:false,prompt:'ObjectiveContainers名，Like what：mysql-001 '">
                                </div>
                                <div class="cubeui-col-sm5">
                                    <input type="text" data-toggle="cubeui-textbox" value="{{>prop}}"
                                           name='Links-value' data-options="required:false,prompt:'Link alias，Like what：mysqldb '">
                                </div>
                                <div class="cubeui-col-sm1" style="text-align: center">
                                    <span style='line-height: 30px;padding-right:0px;'><span onClick="$.docker.utils.ui.removeOpt(this)"  class="ops-fa-icon fa fa-close" style="font-size:14px!important;">&nbsp;</span></span>
                                </div>
                            </div>      
                            
                            {{/props}}
                            {{/if}}
                            
                        </div>
                    </div>
                    
                </div>          
                </form> 
            </div>
            
            <div title="AdvancedSettings"
                 data-options="id:'eastTab1',iconCls:'fa fa-cogs'">
                <div style="margin: 0px;">
                </div>
                
                <div class="cubeui-fluid">
                    <fieldset>
                        <legend>宿主Configure</legend>
                    </fieldset>
                    
                    <div class="cubeui-row">
                        <div class="cubeui-col-sm12">
                            <label class="cubeui-form-label">AttachStdin:</label>
                            <div class="cubeui-input-block">
                                <input type="text" data-toggle="cubeui-textbox" name="AttachStdin" readonly
                                       value=''
                                       data-options="
                                            "
                                >
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>                 
</div>
`;


let create_panel_buttons_html = `

        {{if Flag==1}}
        <a  href="javascript:void(0)" id='tab_start_btn' data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    {{if From=='image'}}
                    createContainerAtImage();
                    {{else}}
                    createContainer();
                    {{/if}}
            },
            btnCls: 'cubeui-btn-orange',
            iconCls: 'fa fa-headphones'
        }">Create</a>
        <a  href="javascript:void(0)" id='tab_start_btn' data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
            
                    {{if From=='image'}}
                    createAndStartContainerAtImage();
                    {{else}}
                    createAndStartContainer();
                    {{/if}}
                    
            },
            btnCls: 'cubeui-btn-yellowgreen',
            iconCls: 'fa fa-play-circle'
        }">Create&Start</a>
        {{/if}}
        {{if Flag==2}}
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    runContainer();
            },
            btnCls: 'cubeui-btn-olive',
            iconCls: 'fa fa-play-circle-o'
        }">Run</a>
        {{/if}}
        
        {{if Flag==3}}
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    createContainer();
            },
            btnCls: 'cubeui-btn-pink',
            iconCls: 'fa fa-random'
        }">Implementation</a>
        {{/if}}
        <a  href="javascript:void(0)" id='tab_start_btn' data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){                    
                $('#eastTabs').tabs('enableTab', 1);
                $('#eastTabs').tabs('select', 1);
            },
            btnCls: 'cubeui-btn-blue',
            iconCls: 'fa fa-cogs'
        }">AdvancedSettings</a>                  
         <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    $('#layout').layout('collapse', 'east');
            },
            btnCls: 'cubeui-btn-red',
            iconCls: 'fa fa-close'
        }">Close</a>
`;



function createContainer(fn){
    let node = local_node;

    if($('#createContainerForm').form('validate')) {
        let info = $.extends.json.param2json($('#createContainerForm').serialize());
        console.log(info)

        info['volume-binds'] = [];

        if (info['volume-value']&&!Array.isArray(info['volume-value'])) {
            info['volume-value'] = [info['volume-value']];
            info['volume-name'] = [info['volume-name']];
            info['rw'] = [info['rw']];
            info['z'] = [info['z']];
            info['nocopy'] = [info['nocopy']];
        }

        if(info['volume-value']){
            $.each(info['volume-value'], function (idx, v) {
                let opt = [];
                if(info['rw'][idx]=='0'){
                    opt.push('ro')
                }
                if(info['z'][idx]=='0'){
                    opt.push('Z')
                }else{
                    opt.push('z')
                }
                if(info['nocopy'][idx]=='1'){
                    opt.push('nocopy')
                }

                if(opt.length>0){
                    info['volume-binds'].push(info['volume-name']+':'+ v +':'+opt.join(","));
                }else{
                    info['volume-binds'].push(info['volume-name']+':'+ v);
                }
            })
        }


        info['PortBindings'] = {};

        if (info['PortBindings-value'] && !Array.isArray(info['PortBindings-value'])) {
            info['PortBindings-value'] = [info['PortBindings-value']];
            info['PortBindings-name'] = [info['PortBindings-name']];
        }

        if(info['PortBindings-value']){
            $.each(info['PortBindings-value'], function (idx, v) {
                let values = v.split(":")
                let host = {};
                host.HostPort=values.pop()

                if(values.length>1){
                    host.HostIp = values.join(":")
                }

                let port = info['PortBindings-name'][idx];

                if(port.indexOf("/")<=0){
                    port = port + "/tcp";
                }

                info['PortBindings'][port] = [host];
            });
        }

        let data = $.docker.utils.data.newContainer();

        data.HostConfig.Binds = info['volume-binds'];
        data.HostConfig.PortBindings = info['PortBindings'];
        data.Image = info['Image'];

        info['Links'] = [];
        if (info['Links-value'] && !Array.isArray(info['Links-value'])) {
            info['Links-value'] = [info['Links-value']];
            info['Links-name'] = [info['Links-name']];
        }

        if(info['Links-value']){
            $.each(info['Links-value'], function (idx, v) {
                info['Links'].push(info['Links-name'][idx]+':'+v);
            });
        }
        data.HostConfig.Links = info['Links'];

        let labels = $.docker.utils.buildOptsData(info['Labels-name'],info['Labels-value']);
        data.Labels = labels;

        if(info.Privileged == '1'){
            data.HostConfig.Privileged = true
        }

        if(info.AutoRemove == '1'){
            data.HostConfig.AutoRemove = true
        }

        if(!$.extends.isEmpty(info.Hostname)){
            data.Hostname = info.Hostname;
        }

        if(!$.extends.isEmpty(info.Domainname)){
            data.Domainname = info.Domainname;
        }

        if(!$.extends.isEmpty(info.User)){
            data.User = info.User;
        }


        info['Env'] = [];
        if (info['Env-value'] && !Array.isArray(info['Env-value'])) {
            info['Env-value'] = [info['Env-value']];
            info['Env-name'] = [info['Env-name']];
        }

        if(info['Env-value']){
            $.each(info['Env-value'], function (idx, v) {
                info['Env'].push(info['Env-name'][idx]+'='+v);
            });
        }
        data.Env = info['Env'];

        if(!$.extends.isEmpty(info['Entrypoint'])){
            data.Entrypoint = info['Entrypoint'].split2(" ");
        }

        if(!$.extends.isEmpty(info['Cmd'])){
            data.Cmd = info['Cmd'].split2(" ");
        }

        if(!$.extends.isEmpty(info['NetworkDisabled'])){
            data.NetworkDisabled = true;
        }

        if(!$.extends.isEmpty(info['WorkingDir'])){
            data.WorkingDir = info['WorkingDir'];
        }

        if(!$.extends.isEmpty(info['Healthcheck.Test'])){
            data.Healthcheck = {};
            data.Healthcheck.Test = $.extends.isEmpty(info['Healthcheck.Test'], '').split2(" ");
            data.Healthcheck.Interval = $.extends.isEmpty(info['Healthcheck.Interval'], '0')*1;
            data.Healthcheck.Timeout = $.extends.isEmpty(info['Healthcheck.Timeout'], '0')*1;
            data.Healthcheck.Retries = $.extends.isEmpty(info['Healthcheck.Retries'], '0')*1;
            data.Healthcheck.StartPeriod = $.extends.isEmpty(info['Healthcheck.StartPeriod'], '0')*1;
        }

        if(!$.extends.isEmpty(info['HostConfig.LogConfig.Type'])){
            data.HostConfig.LogConfig = {};
            data.HostConfig.LogConfig.Type = $.extends.isEmpty(info['HostConfig.LogConfig.Type'], '');
            data.HostConfig.LogConfig.Config = $.docker.utils.buildOptsData($.docker.utils.convert2ListParamValue(info['cnt-log-driver-name']), $.docker.utils.convert2ListParamValue(info['cnt-log-driver-value']))
        }

        if(!$.extends.isEmpty(info['RestartPolicy'])){
            data.HostConfig.RestartPolicy.Name = info['RestartPolicy'].trim();
            if(data.HostConfig.RestartPolicy.Name == 'on-failure'){
                data.HostConfig.RestartPolicy.MaximumRetryCount = (info['MaximumRetryCount']||3)*1;
            }
        }

        if(!$.extends.isEmpty(info['HostConfig.NetworkMode'])){
            data.HostConfig.NetworkMode = info['HostConfig.NetworkMode'].trim();
        }

        console.log(data)

        if($.extends.isEmpty(info.Name)){
            //info.Name = info.Image.split(":")[0]+"-"+Math.uuid();
            info.Name = Math.uuid()+"";
        }

        $.docker.request.container.create(function (response) {
            if(fn){
                fn.call(info, response, data)
            }else{
                $.app.show('Create Container{0}Success'.format(info.Name));
                reloadDg();
                //$('#layout').layout('collapse', 'east');
            }
        }, node, info.Name.indexOf('/')==0?info.Name:('/'+info.Name), data);
    }

}

function createAndStartContainer(){
    createContainer(function(response, data) {
        let info = this;
        let node = local_node;
        reloadDg();

        if($.extends.isEmpty(response.Warnings)){

            $.app.show('Create Container{0}Success, 正在StartContainers'.format(info.Name));

            $.docker.request.container.start(function(){
                showLog(response.Id)
                $.app.show('Containers{0}StartSuccess'.format(info.Name));
                reloadDg();
                //triggerNavMenuClick('ALL', 'containers');
                //$('#layout').layout('collapse', 'east');
            }, node, response.Id);
        }else{
            $.app.show('Create Container{0}Success, Warning message appears，Please start the container manually，{0}'.format(response.Warnings.join(",").htmlEncode()))
        }

    });

}

let dir_tab_html = `
        <!-- Table Toolbar Start -->
        <div id="dirDg-toolbar" class="cubeui-toolbar"
             data-options="grid:{
                   type:'datagrid',
                   id:'dirDg'
               }">

            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                    onClick:function(){
                        upLs('{0}');
                    },
                    extend: '#dirDg-toolbar',
                    btnCls: 'cubeui-btn-blue',
                    iconCls: 'fa fa-level-up'
                }">上级Contents</a>
                             
            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                    onClick:function(){
                        currentLs('{0}');
                    },
                    extend: '#dirDg-toolbar',
                    btnCls: 'cubeui-btn-red',
                    iconCls: 'fa fa-refresh'
                }">Refresh</a>
                
            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                        exportFolder('{0}')
                },
                btnCls: 'cubeui-btn-limegreen',
                iconCls: 'fa fa-sign-out'
            }">Export</a>
            
            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                        importFolder('{0}')
                },
                btnCls: 'cubeui-btn-dodgerblue',
                iconCls: 'fa fa-sign-in'
            }">Import</a>
                
                
<!--            <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{-->
<!--                    onClick:function(){-->
<!--                        resumeLease('{0}');-->
<!--                    },-->
<!--                    extend: '#processesDg-toolbar',-->
<!--                    btnCls: 'cubeui-btn-blue',-->
<!--                    iconCls: 'fa fa-play-circle-o'-->
<!--                }">RestoreProcess</a>-->
                
            <form class="search-box-2">                
                <span style='line-height: 30px;padding-right:10px;padding-left:10px;'>CurrentPath：</span>
                <input type="text" id='search_dir' name="search_dir" value="/" data-toggle="cubeui-textbox"
                       data-options="onClear:function(){
                            console.log(111);
                            $('#search-dirbtn').trigger('click');
                       },width:320,                        
                       prompt:'CurrentPath'">
                <a href="javascript:void(0)" id="search-dirbtn"
                   data-toggle="cubeui-menubutton"
                   data-options="method:'query',
                   onClick:function(){
                        //alert('{0}');
                        let path = $.extends.isEmpty($('#search_dir').textbox('getValue'),'/');
                        ls(path, null);
                   },
                   iconCls:'fa fa-folder-open',
                   btnCls:'cubeui-btn-orange',">View</a>
            </form>
        </div>
        <!-- End of Table Toolbar -->
        
    <table id="dirDg"></table>
`;