(function($){
var myflow = $.myflow;

$.extend(true,myflow.config.rect,{
	attr : {
	r : 8,
	fill : '#F6F7FF',
	stroke : '#03689A',
	"stroke-width" : 2
}
});

$.extend(true,myflow.config.props.props,{
	name : {name:'name', label:'Name', value:'New流程', editor:function(){return new myflow.editors.inputEditor();}},
	key : {name:'key', label:'Identification', value:'', editor:function(){return new myflow.editors.inputEditor();}},
	desc : {name:'desc', label:'Description', value:'', editor:function(){return new myflow.editors.inputEditor();}}
});


$.extend(true,myflow.config.tools.states,{
	start : {
				showType: 'image',
				type : 'start',
				name : {text:'<<start>>'},
				text : {text:'Start'},
				img : {src : 'img/48/start_event_empty.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text',label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Start'},
					temp1: {name:'temp1', label : 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			end : {showType: 'image',type : 'end',
				name : {text:'<<end>>'},
				text : {text:'End'},
				img : {src : 'img/48/end_event_terminate.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text',label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'End'},
					temp1: {name:'temp1', label : 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			'end-cancel' : {showType: 'image',type : 'end-cancel',
				name : {text:'<<end-cancel>>'},
				text : {text:'Cancel'},
				img : {src : 'img/48/end_event_cancel.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text',label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Cancel'},
					temp1: {name:'temp1', label : 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			'end-error' : {showType: 'image',type : 'end-error',
				name : {text:'<<end-error>>'},
				text : {text:'Error'},
				img : {src : 'img/48/end_event_error.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text',label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Error'},
					temp1: {name:'temp1', label : 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			state : {showType: 'text',type : 'state',
				name : {text:'<<state>>'},
				text : {text:'Status'},
				img : {src : 'img/48/task_empty.png',width : 48, height:48},
				props : {
					text: {name:'text',label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Status'},
					temp1: {name:'temp1', label : 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor([{name:'aaa',value:1},{name:'bbb',value:2}]);}}
				}},
			fork : {showType: 'image',type : 'fork',
				name : {text:'<<fork>>'},
				text : {text:'Branch'},
				img : {src : 'img/48/gateway_parallel.png',width :48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text', label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Branch'},
					temp1: {name:'temp1', label: 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor('select.json');}}
				}},
			join : {showType: 'image',type : 'join',
				name : {text:'<<join>>'},
				text : {text:'Merge'},
				img : {src : 'img/48/gateway_parallel.png',width :48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					text: {name:'text', label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Merge'},
					temp1: {name:'temp1', label: 'Text', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					temp2: {name:'temp2', label : 'Selection', value:'', editor: function(){return new myflow.editors.selectEditor('select.json');}}
				}},
			task : {showType: 'text',type : 'task',
				name : {text:'<<task>>'},
				text : {text:'Tasks'},
				img : {src : 'img/48/task_empty.png',width :48, height:48},
				props : {
					text: {name:'text', label: 'Show', value:'', editor: function(){return new myflow.editors.textEditor();}, value:'Tasks'},
					assignee: {name:'assignee', label: 'User', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					form: {name:'form', label : 'Form', value:'', editor: function(){return new myflow.editors.inputEditor();}},
					desc: {name:'desc', label : 'Description', value:'', editor: function(){return new myflow.editors.inputEditor();}}
				}}
});
})(jQuery);