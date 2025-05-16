$(function() {
	var flowdata=window.localStorage.getItem("data");
	$('#myflow').myflow(
		{
			editable:true,
			basePath : "",
			allowStateMutiLine:true,
			restore : eval("(" + flowdata + ")"),
			tools : {
				save : function(data) {
					console.log("Save",eval("("+data+")"));
					//console.log(data);
					window.localStorage.setItem("data",data)
				},
				publish:function(data){
					console.log("Release",eval("("+data+")"));
				},
				addPath:function(id,data){
					console.log("AddPath",id,eval("("+data+")"));
				},
				addRect:function(id,data){
					//console.log("AddStatus",id,eval("("+data+")"));
				},
				clickPath:function(id){
					//console.log("Click Line",id)
				},
				clickRect:function(id,data){
					//console.log("点击Status",id,eval("("+data+")"));
				},
				deletePath:function(id){
					//console.log("Delete线",id);
				},
				deleteRect:function(id,data){
					//console.log("DeleteStatus",id,eval("("+data+")"));
				},
				revoke:function(id){

				}
			}
		});

	});