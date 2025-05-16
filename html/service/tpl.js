let service_panel_footer_html = `
        {{if updated}}
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                updateTags('{{>ID}}', true);
            },
            btnCls: 'cubeui-btn-slateblue',
            iconCls: 'fa fa-tags'
        }">Edit元Data</a>
        
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                removeLease('{{>ID}}', true);
            },
            btnCls: 'cubeui-btn-orange',
            iconCls: 'fa fa-times'
        }">Delete</a>
        {{else}}
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                    saveService();
                },
                extend: '#servicesDg-toolbar',
                btnCls: 'cubeui-btn-ivory',
                iconCls: 'fa fa-spinner'
            }">Create</a>
        {{/if}}
<!--        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
                onClick:function(){
                    promoteLease('{{>ID}}', true);
                },
                extend: '#servicesDg-toolbar',
                btnCls: 'cubeui-btn-ivory',
                iconCls: 'fa fa-hand-o-up'
            }">Raise管理Nodes</a>
        <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    demoteLease('{{>ID}}', true);
            },
            btnCls: 'cubeui-btn-blue',
            iconCls: 'fa fa-hand-o-down'
        }">Downgrade工作Nodes</a>-->
         <a  href="javascript:void(0)" data-toggle='cubeui-menubutton' data-options="{
            onClick:function(){
                    $('#layout').layout('collapse', 'east');
            },
            btnCls: 'cubeui-btn-red',
            iconCls: 'fa fa-close'
        }">Close</a>
`;