//Define a regional chart：
function GooFlow(bgDiv,property){
	if (navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 6.0")>0)
		GooFlow.prototype.useSVG="";
	else	GooFlow.prototype.useSVG="1";
//Initialize区域图的对象
	this.$id=bgDiv.attr("id");
	this.$bgDiv=bgDiv;//Fatherly FramedDIV
	this.$bgDiv.addClass("GooFlow");
	if(GooFlow.prototype.color.font){
		this.$bgDiv.css("color",GooFlow.prototype.color.font);
	}
	if(GooFlow.prototype.color.main){
		this.$bgDiv.append('<style>.GooFlow_tool_btndown{background:'+GooFlow.prototype.color.main+'}</style>');
	}
	var width=(property.width||800);
	var height=(property.height||500);
	this.$bgDiv.css({width:width+"px",height:height+"px"});
	this.$tool=null;//Left Toolbar Object
	this.$head=null;//顶部Label及工具栏按钮
	this.$title="newFlow_1";//Flowchart的名称
	this.$nodeRemark={};//Note text for each node or button,JSONFormat,keyClass name,valueCustomised text description for users
	this.$nowType="cursor";//当前要绘制的对象Type
	this.$lineData={};
	this.$lineCount=0;
	this.$nodeData={};
	this.$nodeCount=0;
	this.$areaData={};
	this.$areaCount=0;
	this.$lineDom={};
	this.$nodeDom={};
	this.$areaDom={};
	this.$max=property.initNum||1;//Calculate DefaultIDStart of valueSEQUENCE
	this.$focus="";//当前被选定的Node/Convert LinesID,If没选中Or..工作区被清空,And..""
	this.$cursor="default";//The style of the mouse cursor in the working area
	this.$editable=false;//Is the workspace editable
	this.$deletedItem={};//在Flowchart的编辑Operation中被Delete掉的ElementsIDGather,ElementsID为KEY,ElementsType(node,line.area)为VALUE
	this.$workExtendStep=200;//在Auto/Manually expand editable area，An extension后宽/How much pixels do you add up
	var headHeight=0;
	var tmp="";

	if(property.haveHead){
		tmp="<div class='GooFlow_head' "+(GooFlow.prototype.color.main? "style='border-bottom-color:"+GooFlow.prototype.color.main+"'" : "")
		+">";
		if(property.headLabel){
      tmp+="<label title='"+(property.initLabelText||"newFlow_1")+"' "
        +(GooFlow.prototype.color.main? "style='background:"+GooFlow.prototype.color.main+"'" : "")+">"+(property.initLabelText||"newFlow_1")+"</label>";
		}
		for(var x=0;x<property.headBtns.length;++x){
			tmp+="<a href='javascript:void(0)' class='GooFlow_head_btn'><i class='ico_"+property.headBtns[x]+"'></i></a>"
		}
		tmp+="</div>";
		this.$head=$(tmp);
		this.$bgDiv.append(this.$head);
		headHeight=28;
		//以下是当工具栏按钮被点击时触发的Events自定义(Fake),Format为function(),Because it worksTHISOperation对象本身,不用Participation；Users can define their own weights:
		this.onBtnNewClick=null;//NewFlowchart按钮被点中
		this.onBtnOpenClick=null;//打开Flowchart按钮定义
		this.onBtnSaveClick=null;//保存Flowchart按钮定义
		this.onFreshClick=null;//重载Flowchart按钮定义
        this.onPrintClick=null;//打印Flowchart按钮定义
		if(property.headBtns)
		this.$head.on("click",{inthis:this},function(e){
			if(!e)e=window.event;
			var tar=e.target;
			if(tar.tagName=="DIV"||tar.tagName=="SPAN")	return;
			else if(tar.tagName=="A")	tar=tar.childNodes[0];
			var This=e.data.inthis;
			//定义顶部Operation栏按钮的Events
			switch($(tar).attr("class")){
				case "ico_new":		if(This.onBtnNewClick!=null)	This.onBtnNewClick();break;
				case "ico_open":	if(This.onBtnOpenClick!=null)	This.onBtnOpenClick();break;
				case "ico_save":	if(This.onBtnSaveClick!=null)	This.onBtnSaveClick();break;
				case "ico_undo":	This.undo();break;
				case "ico_redo":	This.redo();break;
				case "ico_reload":  if(This.onFreshClick!=null)	This.onFreshClick();break;
                case "ico_print":   if(This.onPrintClick!=null)	This.onPrintClick();break;
			}
		});
	}
	var toolWidth=0;
	if(property.haveTool){
		this.$bgDiv.append("<div class='GooFlow_tool'"+(property.haveHead? "":" style='margin-top:4px'")+"><div style='height:"+(height-headHeight-(property.haveHead? 5:8))+"px' class='GooFlow_tool_div'></div></div>");
		this.$tool=this.$bgDiv.find(".GooFlow_tool div");
		//Uncoded：Add绘图工具按钮
		this.$tool.append("<div style='margin-bottom:5px'><span/><span/><span/><span/></div>"
	  +"<a href='javascript:void(0)' type='cursor' class='GooFlow_tool_btndown' id='"+this.$id+"_btn_cursor'><i class='ico_cursor'/></a>"
     +"<a href='javascript:void(0)' type='direct' class='GooFlow_tool_btn' id='"+this.$id+"_btn_direct'><i class='ico_direct'/></a>"
    );
		if(property.toolBtns&&property.toolBtns.length>0){
			tmp="<span/>";
			for(var i=0;i<property.toolBtns.length;++i){
				tmp+="<a href='javascript:void(0)' type='"+property.toolBtns[i]+"' id='"+this.$id+"_btn_"+property.toolBtns[i].split(" ")[0]+"' class='GooFlow_tool_btn'><i class='ico_"+property.toolBtns[i]+"'/></a>";//Add自定义按钮
			}
			this.$tool.append(tmp);
		}
		//Add区域划分框工具开关按钮
		if(property.haveGroup)
			this.$tool.append("<span/><a href='javascript:void(0)' type='group' class='GooFlow_tool_btn' id='"+this.$id+"_btn_group'><i class='ico_group'/></a>");
		toolWidth=31;
		this.$nowType="cursor";
		//Tie各个按钮的点击Events
		this.$tool.on("click",{inthis:this},function(e){
			if(!e)e=window.event;
			var tar;
			switch(e.target.tagName){
				case "SPAN":return false;
				case "DIV":return false;
				case "I":	tar=e.target.parentNode;break;
				case "A":	tar=e.target;
			};
			var type=$(tar).attr("type");
			e.data.inthis.switchToolBtn(type);
			return false;
		});
		this.$editable=true;//Edit only with toolbars
	}

	width=width-toolWidth-9;
	height=height-headHeight-(property.haveHead? 5:8);
	this.$bgDiv.append("<div class='GooFlow_work' style='width:"+(width)+"px;height:"+(height)+"px;"+(property.haveHead? "":"margin-top:3px")+"'></div>");
	this.$workArea=$("<div class='GooFlow_work_inner' style='width:"+width+"px;height:"+height+"px'></div>")
		.attr({"unselectable":"on","onselectstart":'return false',"onselect":'document.selection.empty()'});
	this.$bgDiv.children(".GooFlow_work").append(this.$workArea);

	this.$draw=null;//画矢量线条的Containers
	this.initDraw("draw_"+this.$id,width,height);
	this.$group=null;
	if(property.haveGroup)
		this.initGroup(width,height);
	this.initExpendFunc();

	if(this.$editable){
	  //Tie工作区Events
	  this.$workArea.on("click",{inthis:this},function(e){
		if(!e)e=window.event;
		var This=e.data.inthis;
		if(!This.$editable)return;
		var type=This.$nowType;
		if(type=="cursor"){
			var t=$(e.target);
			var n=t.prop("tagName");
			//alert(n);
			if(n=="svg"||(n=="DIV"&&t.prop("class").indexOf("GooFlow_work")>-1)||n=="LABEL"){
        if(This.$lineOper.data("tid")){
          This.focusItem(This.$lineOper.data("tid"),false);
          //This.$mpFrom.removeData("p");
        }
        else{This.blurItem();}
			}
			return;
		}
		else if(type=="direct"||type=="group")return;
		var X,Y;
		var ev=mousePosition(e),t=getElCoordinate(this);
		X=ev.x-t.left+this.parentNode.scrollLeft;
		Y=ev.y-t.top+this.parentNode.scrollTop;
		This.addNode(new Date().getTime(),{name:"node_"+This.$max,left:X,top:Y,type:This.$nowType});
		This.$max++;
	  });
	  //划线或改线时用的Tie
	  this.$workArea.mousemove({inthis:this},function(e){
			if(e.data.inthis.$nowType!="direct"&&!e.data.inthis.$mpTo.data("p"))	return;
			var lineStart=$(this).data("lineStart");
			var lineEnd=$(this).data("lineEnd");
			if(!lineStart&&!lineEnd)return;

			var ev=mousePosition(e),t=getElCoordinate(this);
			var X,Y;
			X=ev.x-t.left+this.parentNode.scrollLeft;
			Y=ev.y-t.top+this.parentNode.scrollTop;
			var line=document.getElementById("GooFlow_tmp_line");
			if(lineStart){
					if(GooFlow.prototype.useSVG!=""){
					line.childNodes[0].setAttribute("d","M "+lineStart.x+" "+lineStart.y+" L "+X+" "+Y);
					line.childNodes[1].setAttribute("d","M "+lineStart.x+" "+lineStart.y+" L "+X+" "+Y);
					if(line.childNodes[1].getAttribute("marker-end")=="url(\"#arrow2\")")
						line.childNodes[1].setAttribute("marker-end","url(#arrow3)");
					else	line.childNodes[1].setAttribute("marker-end","url(#arrow2)");
				}
				else	line.points.value=lineStart.x+","+lineStart.y+" "+X+","+Y;
			}else if(lineEnd){
				if(GooFlow.prototype.useSVG!=""){
					line.childNodes[0].setAttribute("d","M "+X+" "+Y+" L "+lineEnd.x+" "+lineEnd.y);
					line.childNodes[1].setAttribute("d","M "+X+" "+Y+" L "+lineEnd.x+" "+lineEnd.y);
					if(line.childNodes[1].getAttribute("marker-end")=="url(\"#arrow2\")")
						line.childNodes[1].setAttribute("marker-end","url(#arrow3)");
					else	line.childNodes[1].setAttribute("marker-end","url(#arrow2)");
				}
				else	line.points.value=X+","+Y+" "+lineEnd.x+","+lineEnd.y;
			}
	  });
	  this.$workArea.mouseup({inthis:this},function(e){
	  	var This=e.data.inthis;
			if(This.$nowType!="direct"&&!This.$mpTo.data("p"))	return;
			var tmp=document.getElementById("GooFlow_tmp_line");
			if(tmp){
				$(this).css("cursor","auto").removeData("lineStart").removeData("lineEnd");
        This.$mpTo.hide().removeData("p");
        This.$mpFrom.hide().removeData("p");
        This.$draw.removeChild(tmp);
        This.focusItem(This.$focus,false);
			}else{
        This.$lineOper.removeData("tid");
			}
	  });
	  //为了Node而增加的一些集体delegateTie
	  this.initWorkForNode();
	  //Move node orRESIZEThe mask used to display
	  this.$ghost=$("<div class='rs_ghost'></div>").attr({"unselectable":"on","onselectstart":'return false',"onselect":'document.selection.empty()'});
	  this.$bgDiv.append(this.$ghost);
	  this.$textArea=$("<textarea></textarea>");
	  this.$bgDiv.append(this.$textArea);
	  this.$lineMove=$('<div class="GooFlow_linemove" style="display:none"></div>');//Operation折线时的移动框
	  this.$workArea.append(this.$lineMove);
	  this.$lineMove.on("mousedown",{inthis:this},function(e){
		  if(e.button==2)return false;
		  var lm=$(this);
		  lm.css({"background-color":"#333"});
		  var This=e.data.inthis;
		  var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);
		  var X,Y;
		  X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
		  Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
		  var p=This.$lineMove.position();
		  var vX=X-p.left,vY=Y-p.top;
		  var isMove=false;
		  document.onmousemove=function(e){
			if(!e)e=window.event;
			var ev=mousePosition(e);
			var ps=This.$lineMove.position();
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
		 	Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			if(This.$lineMove.data("type")=="lr"){
			  X=X-vX;
			  if(X<0)	X=0;
			  else if(X>This.$workArea.width())
				X=This.$workArea.width();
			  This.$lineMove.css({left:X+"px"});
			}
			else if(This.$lineMove.data("type")=="tb"){
			  Y=Y-vY;
			  if(Y<0)	Y=0;
			  else if(Y>This.$workArea.height())
				Y=This.$workArea.height();
			  This.$lineMove.css({top:Y+"px"});
		    }
			isMove=true;
		  }
		  document.onmouseup=function(e){
			if(isMove){
				var p=This.$lineMove.position();
				if(This.$lineMove.data("type")=="lr")
					This.setLineM(This.$lineMove.data("tid"),p.left+3);
				else if(This.$lineMove.data("type")=="tb")
					This.setLineM(This.$lineMove.data("tid"),p.top+3);
			}
			This.$lineMove.css({"background-color":"transparent"});
			if(This.$focus==This.$lineMove.data("tid")){
				This.focusItem(This.$lineMove.data("tid"));
			}
			document.onmousemove=null;
			document.onmouseup=null;
		  }
	  });

	  //选定一条Convert Lines后出现的浮动Operation栏，有改变线的样式和Delete线等按钮。
	  this.$lineOper=$("<div class='GooFlow_line_oper' style='display:none'><i class='b_l1'></i><i class='b_l2'></i><i class='b_l3'></i><i class='b_x'></i></div>");//选定线时显示的Operation框
	  this.$workArea.parent().append(this.$lineOper);
	  this.$lineOper.on("click",{inthis:this},function(e){
	 	if(!e)e=window.event;
		if(e.target.tagName!="I")	return;
		var This=e.data.inthis;
		var id=$(this).data("tid");
		switch($(e.target).attr("class")){
			case "b_x":
			This.delLine(id);
			this.style.display="none";break;
			case "b_l1":
			This.setLineType(id,"lr");break;
			case "b_l2":
			This.setLineType(id,"tb");break;
			case "b_l3":
			This.setLineType(id,"sl");break;
		}
	  });
	  //Add two ends of the mobile line to a new node to move function，This is for movingDOM
		this.$mpFrom=$("<div class='GooFlow_line_mp' style='display:none'></div>");
		this.$mpTo=$("<div class='GooFlow_line_mp' style='display:none'></div>");
		this.$workArea.append(this.$mpFrom).append(this.$mpTo);
		this.initLinePointsChg();

	  //下面Tie当Node/线/Group Blocks的一些OperationEvents,这些Events可直接PassthisVisitor per se
	  //当Operation某个单元（Node/线/Group Blocks）被Add时，Method of triggering，BackFALSE可阻止AddEvents的发生
	  //Formatfunction(id，type,json)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line","area"Three values,json即addNode,addLine或addAreaSecond transfer of methodsjson.
	  this.onItemAdd=null;
	  //当Operation某个单元（Node/线/Group Blocks）被Delete时，Method of triggering，BackFALSE可阻止DeleteEvents的发生
	  //Formatfunction(id，type)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line","area"Three values
	  this.onItemDel=null;
	  //当Operation某个单元（Node/Group Blocks）When moved，Method of triggering，BackFALSE可阻止移动Events的发生
	  //Formatfunction(id，type,left,top)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","area"Two values，线lineMove not supported,leftIt\'s a new left-range coordinate，top是新的顶边距Coordinates
	  this.onItemMove=null;
	  //当Operation某个单元（Node/线/Group Blocks）When renamed，Method of triggering，BackFALSE可阻止重命名Events的发生
	  //Formatfunction(id,name,type)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line","area"Three values,nameNew name
	  this.onItemRename=null;
	  //当Operation某个单元（Node/线）被由Uncheck变成选中时，Method of triggering，BackFALSE可阻止选中Events的发生
	  //Formatfunction(id,type)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line"Two values,"area"Organisation
	  this.onItemFocus=null;
	  //当Operation某个单元（Node/线）被由选中变成Uncheck时，Method of triggering，BackFALSE可阻止UncheckEvents的发生
	  //Formatfunction(id，type)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line"Two values,"area"不支持被Uncheck
	  this.onItemBlur=null;
	  //当Operation某个单元（Node/Group Blocks）When defined as size or shape，Method of triggering，BackFALSEPrevents resizeing/造型Events的发生
	  //Formatfunction(id，type,width,height)：idIt\'s the only sign of the unitID,typeIt\'s the type of unit,有"node","line","area"Three values;widthNew width,heightIt\'s a new height
	  this.onItemResize=null;
	  //When moving a middle of a line，Method of triggering，BackFALSEPrevents resizeing/造型Events的发生
	  //Formatfunction(id，M)：idIt\'s the only sign of the unitID,MIt\'s the new middle sectionX(或Y)的Coordinates
	  this.onLineMove=null;
	  //当变换某条Connection线的Type，Method of triggering，BackFALSEPrevents resizeing/造型Events的发生
	  //Formatfunction(id，type)：idIt\'s the only sign of the unitID,type是Connection线的新Type,"sl":Line,"lr":Middler to move around,"tb":Midrix to move up/ down
	  this.onLineSetType=null;
	  //当变换某条Connection线的端点变更Connection的Node时，Method of triggering，BackFALSEPrevents resizeing/造型Events的发生
	  //Formatfunction(id，newStart,newEnd)：idIt\'s the only sign of the cellID,newStart,newEndIt\'s the starting pointIDAnd to the nodeID
	  this.onLinePointMove=null;
	  //When recoloring a node/Convert Lines时Method of triggering，BackFALSEPrevents resizeing/造型Events的发生
	  //Formatfunction(id，type，mark)：idIt\'s the only sign of the unitID,type是单元Type（"node"Node,"line"Convert Lines），markAs Boolean,Means to markTRUEOr cancel the labelFALSE
	  this.onItemMark=null;

	  if(property.useOperStack&&this.$editable){//If要Use堆栈记录Operation并提供“Undo/Redo”的Functions,Valid only in editing status
		this.$undoStack=[];
		this.$redoStack=[];
		this.$isUndo=0;
		///////////////以下是构造UndoOperation/RedoOperation的方法
		//To save browser memory space,undo/redo中的Operation缓存栈,At most40步Operation;Over40Step,将Auto删掉最旧的一个缓存
		this.pushOper=function(funcName,paras){
			var len=this.$undoStack.length;
			if(this.$isUndo==1){
				this.$redoStack.push([funcName,paras]);
				this.$isUndo=false;
				if(this.$redoStack.length>40)	this.$redoStack.shift();
			}else{
				this.$undoStack.push([funcName,paras]);
				if(this.$undoStack.length>40)	this.$undoStack.shift();
				if(this.$isUndo==0){
					this.$redoStack.splice(0,this.$redoStack.length);
				}
				this.$isUndo=0;
			}
		};
		//将外部的方法Add到GooFlowobject事务Operation堆栈中,After thatundo/redoOperation中可以进行控制，一般用于对Flowchart以外的附加信息进行编辑的事务Undo/Redo Control；
		//ParticipationfuncFor the object to execute the method,jsonParaIt\'s the only word-oriented external methodJSONParticipation,由JSON对象带入All要传的信息；
		//Hint:In order for external methods to be able to..UNDO/REDO,Need to develop these external methods,Add对该方法执行后效果回退的另一个执行方法的pushExternalOper
		this.pushExternalOper=function(func,jsonPara){
			this.pushOper("externalFunc",[func,jsonPara]);
		};
		//Undo上一步Operation
		this.undo=function(){
			if(this.$undoStack.length==0)	return;
			this.blurItem();
			var tmp=this.$undoStack.pop();
			this.$isUndo=1;
			if(tmp[0]=="externalFunc"){
				tmp[1][0](tmp[1][1]);
			}
			else{
			//Number of participants,Maximum support6个.
			switch(tmp[1].length){
				case 0:this[tmp[0]]();break;
				case 1:this[tmp[0]](tmp[1][0]);break;
				case 2:this[tmp[0]](tmp[1][0],tmp[1][1]);break;
				case 3:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2]);break;
				case 4:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3]);break;
				case 5:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4]);break;
				case 6:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4],tmp[1][5]);break;
			}
			}
		};
		//Redo最近一次被Undo的Operation
		this.redo=function(){
			if(this.$redoStack.length==0)	return;
			this.blurItem();
			var tmp=this.$redoStack.pop();
			this.$isUndo=2;
			if(tmp[0]=="externalFunc"){
				tmp[1][0](tmp[1][1]);
			}
			else{
			//Number of participants,Maximum support6个.
			switch(tmp[1].length){
				case 0:this[tmp[0]]();break;
				case 1:this[tmp[0]](tmp[1][0]);break;
				case 2:this[tmp[0]](tmp[1][0],tmp[1][1]);break;
				case 3:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2]);break;
				case 4:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3]);break;
				case 5:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4]);break;
				case 6:this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4],tmp[1][5]);break;
			}
			}
		};
	  }
	  $(document).keydown({inthis:this},function(e){
		//Tie键盘Operation
		var This=e.data.inthis;
		if(This.$focus=="")return;
  		switch(e.keyCode){
			case 46://Delete
			This.delNode(This.$focus,true);
			This.delLine(This.$focus);
			break;
		}
	  });
	}
}

GooFlow.prototype={
	useSVG:"",
	getSvgMarker:function(id,color){
		var m=document.createElementNS("http://www.w3.org/2000/svg","marker");
		m.setAttribute("id",id);
		m.setAttribute("viewBox","0 0 6 6");
		m.setAttribute("refX",5);
		m.setAttribute("refY",3);
		m.setAttribute("markerUnits","strokeWidth");
		m.setAttribute("markerWidth",6);
		m.setAttribute("markerHeight",6);
		m.setAttribute("orient","auto");
		var path=document.createElementNS("http://www.w3.org/2000/svg","path");
		path.setAttribute("d","M 0 0 L 6 3 L 0 6 z");
		path.setAttribute("fill",color);
		path.setAttribute("stroke-width",0);
		m.appendChild(path);
		return m;
	},
	initDraw:function(id,width,height){
		var elem;
		if(GooFlow.prototype.useSVG!=""){
			this.$draw=document.createElementNS("http://www.w3.org/2000/svg","svg");//可创建带有指定命名空间的ElementsNodes
			this.$workArea.prepend(this.$draw);
			var defs=document.createElementNS("http://www.w3.org/2000/svg","defs");
			this.$draw.appendChild(defs);
			defs.appendChild(GooFlow.prototype.getSvgMarker("arrow1",GooFlow.prototype.color.line||"#3892D3"));
			defs.appendChild(GooFlow.prototype.getSvgMarker("arrow2",GooFlow.prototype.color.mark||"#ff8800"));
			defs.appendChild(GooFlow.prototype.getSvgMarker("arrow3",GooFlow.prototype.color.mark||"#ff8800"));
		}
		else{
			this.$draw = document.createElement("v:group");
			this.$draw.coordsize = width+","+height;
			this.$workArea.prepend("<div class='GooFlow_work_vml' style='position:relative;width:"+width+"px;height:"+height+"px'></div>");
			this.$workArea.children("div")[0].insertBefore(this.$draw,null);
		}
		this.$draw.id = id;
		this.$draw.style.width = width + "px";
		this.$draw.style.height = +height + "px";
		//TieConnect的点击选中以及双击编辑Events
		var tmpClk=null;
		if(GooFlow.prototype.useSVG!="")  tmpClk="g";
		else  tmpClk="PolyLine";
		if(!this.$editable)	return;
		
		$(this.$draw).delegate(tmpClk,"click",{inthis:this},function(e){
			e.data.inthis.focusItem(this.id,true);
		});
		$(this.$draw).delegate(tmpClk,"dblclick",{inthis:this},function(e){
			var oldTxt,x,y,from,to;
			var This=e.data.inthis;
			if(GooFlow.prototype.useSVG!=""){
				oldTxt=this.childNodes[2].textContent;
				from=this.getAttribute("from").split(",");
				to=this.getAttribute("to").split(",");
			}else{
				oldTxt=this.childNodes[1].innerHTML;
				var n=this.getAttribute("fromTo").split(",");
				from=[n[0],n[1]];
				to=[n[2],n[3]];
			}
			if(This.$lineData[this.id].type=="lr"){
				from[0]=This.$lineData[this.id].M;
				to[0]=from[0];
			}
			else if(This.$lineData[this.id].type=="tb"){
				from[1]=This.$lineData[this.id].M;
				to[1]=from[1];
			}
			x=(parseInt(from[0],10)+parseInt(to[0],10))/2-64;
			y=(parseInt(from[1],10)+parseInt(to[1],10))/2-18;
			var t=getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:130,height:26,
				left:t.left+x-This.$workArea[0].parentNode.scrollLeft,
				top:t.top+y-This.$workArea[0].parentNode.scrollTop}).data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				if(e.button==2)return false;
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"line");
				This.$textArea.val("").removeData("id").hide();
			});
		});
	},
	initGroup:function(width,height){
		this.$group=$("<div class='GooFlow_work_group' style='width:"+width+"px;height:"+height+"px'></div>");//存放背景区域的Containers
		this.$workArea.prepend(this.$group);
		if(!this.$editable)	return;

	  //区域划分框Operation区的EventsTie
	  this.$group.on("mousedown",{inthis:this},function(e){//TieRESIZEFunctions以及移动Functions
		if(e.button==2)return false;
		var This=e.data.inthis;
		if(This.$nowType!="group")	return;
		if(!e)e=window.event;
		var cursor=$(e.target).css("cursor");
		var id=e.target.parentNode;
		switch(cursor){
			case "nw-resize":id=id.parentNode;break;
			case "w-resize":id=id.parentNode;break;
			case "n-resize":id=id.parentNode;break;
			case "move":break;
			default:return;
		}
		id=id.id;

		var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);

		var X,Y;
		X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
		Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
		if(cursor!="move"){
			This.$ghost.css({display:"block",
				width:This.$areaData[id].width+"px", height:This.$areaData[id].height+"px",
				top:This.$areaData[id].top+t.top-This.$workArea[0].parentNode.scrollTop+"px",
				left:This.$areaData[id].left+t.left-This.$workArea[0].parentNode.scrollLeft+"px",cursor:cursor});
			var vX=(This.$areaData[id].left+This.$areaData[id].width)-X;
			var vY=(This.$areaData[id].top+This.$areaData[id].height)-Y;
		}
		else{
			var vX=X-This.$areaData[id].left;
			var vY=Y-This.$areaData[id].top;
		}
		var isMove=false;
		This.$ghost.css("cursor",cursor);
		document.onmousemove=function(e){
			if(!e)e=window.event;
			var ev=mousePosition(e);
			if(cursor!="move"){
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft-This.$areaData[id].left+vX;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop-This.$areaData[id].top+vY;
			if(X<200)	X=200;
			if(Y<100)	Y=100;
			switch(cursor){
				case "nw-resize":This.$ghost.css({width:X+"px",height:Y+"px"});break;
				case "w-resize":This.$ghost.css({width:X+"px"});break;
				case "n-resize":This.$ghost.css({height:Y+"px"});break;
			}
			}
			else{
				if(This.$ghost.css("display")=="none"){
					This.$ghost.css({display:"block",
						width:This.$areaData[id].width+"px", height:This.$areaData[id].height+"px",
						top:This.$areaData[id].top+t.top-This.$workArea[0].parentNode.scrollTop+"px",
						left:This.$areaData[id].left+t.left-This.$workArea[0].parentNode.scrollLeft+"px",cursor:cursor});
				}
				X=ev.x-vX;Y=ev.y-vY;
				if(X<t.left-This.$workArea[0].parentNode.scrollLeft)
					X=t.left-This.$workArea[0].parentNode.scrollLeft;
				else if(X+This.$workArea[0].parentNode.scrollLeft+This.$areaData[id].width>t.left+This.$workArea.width())
					X=t.left+This.$workArea.width()-This.$workArea[0].parentNode.scrollLeft-This.$areaData[id].width;
				if(Y<t.top-This.$workArea[0].parentNode.scrollTop)
					Y=t.top-This.$workArea[0].parentNode.scrollTop;
				else if(Y+This.$workArea[0].parentNode.scrollTop+This.$areaData[id].height>t.top+This.$workArea.height())
					Y=t.top+This.$workArea.height()-This.$workArea[0].parentNode.scrollTop-This.$areaData[id].height;
				This.$ghost.css({left:X+"px",top:Y+"px"});
			}
			isMove=true;
		}
		document.onmouseup=function(e){
			This.$ghost.empty().hide();
			document.onmousemove=null;
			document.onmouseup=null;
			if(!isMove)return;
			if(cursor!="move")
				This.resizeArea(id,This.$ghost.outerWidth(),This.$ghost.outerHeight());
			else
				This.moveArea(id,X+This.$workArea[0].parentNode.scrollLeft-t.left,Y+This.$workArea[0].parentNode.scrollTop-t.top);
			return false;
	  	}
	  });
	  //TieModify文字说明Functions
	  this.$group.on("dblclick",{inthis:this},function(e){
		var This=e.data.inthis;
		if(This.$nowType!="group")	return;
		if(!e)e=window.event;
		if(e.target.tagName!="LABEL")	return false;
		var oldTxt=e.target.innerHTML;
		var p=e.target.parentNode;
		var x=parseInt(p.style.left,10)+18,y=parseInt(p.style.top,10)+1;
		var t=getElCoordinate(This.$workArea[0]);
		This.$textArea.val(oldTxt).css({display:"block",width:120,height:26,
			left:t.left+x-This.$workArea[0].parentNode.scrollLeft,
			top:t.top+y-This.$workArea[0].parentNode.scrollTop}).data("id",p.id).focus();
		This.$workArea.parent().one("mouseup",function(e){
			if(e.button==2)return false;
			if(This.$textArea.css("display")=="block"){
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"area");
				This.$textArea.val("").removeData("id").hide();
			}
			return false;
		});
		return false;
	  });
	  //Tie点击Events
	  this.$group.mouseup({inthis:this},function(e){
		var This=e.data.inthis;
		if(This.$textArea.css("display")=="block"){
			This.setName(This.$textArea.data("id"),This.$textArea.val(),"area");
			This.$textArea.val("").removeData("id").hide();
			return false;
		};
		
		if(This.$nowType!="group")	return;
		if(!e)e=window.event;
		switch($(e.target).attr("class")){
			case "rs_close":	This.delArea(e.target.parentNode.parentNode.id);return false;//Delete该分组区域
			case "bg":	return;
		}
		switch(e.target.tagName){
			case "LABEL":	return false;
			case "I"://Bind Colour Transforming
			var id=e.target.parentNode.id;
			switch(This.$areaData[id].color){
				case "red":	This.setAreaColor(id,"yellow");break;
				case "yellow":	This.setAreaColor(id,"blue");break;
				case "blue":	This.setAreaColor(id,"green");break;
				case "green":	This.setAreaColor(id,"red");break;
			}
			return false;
		}
		if(e.data.inthis.$ghost.css("display")=="none"){
      var X,Y;
      var ev=mousePosition(e),t=getElCoordinate(this);
      X=ev.x-t.left+this.parentNode.parentNode.scrollLeft;
      Y=ev.y-t.top+this.parentNode.parentNode.scrollTop;
      var color=["red","yellow","blue","green"];
      e.data.inthis.addArea(new Date().getTime(),
		{name:"area_"+e.data.inthis.$max,left:X,top:Y,color:color[e.data.inthis.$max%4],width:200,height:100}
	  );
      e.data.inthis.$max++;
      return false;
		}
	  });
	},
	//Add手动扩展编辑区Functions，An extension200px
	initExpendFunc:function(){
	    this.$workArea.append('<div class="Gooflow_extend_right"></div><div class="Gooflow_extend_bottom"></div>');
	    this.$workArea.children(".Gooflow_extend_right").on("click",{inthis:this},function(e){
			var This=e.data.inthis;
			var w = This.$workArea.width()+This.$workExtendStep;
			var h = This.$workArea.height();
			This.$workArea.css({width:w+"px"});
			if(GooFlow.prototype.useSVG==""){
				This.$draw.coordsize = w+","+h;
			}
			This.$draw.style.width = w + "px";
			if(This.$group!=null){
				This.$group.css({width:w+"px"});
			}
			var parentDiv = This.$workArea.parent()[0];
			parentDiv.scrollLeft = parentDiv.scrollWidth;
			return false;
	    });
	    this.$workArea.children(".Gooflow_extend_bottom").on("click",{inthis:this},function(e){
			var This=e.data.inthis
			var w = This.$workArea.width();
			var h = This.$workArea.height()+This.$workExtendStep;
			This.$workArea.css({height:h+"px"});
			if(GooFlow.prototype.useSVG==""){
				This.$draw.coordsize = w+","+h;
			}
			This.$draw.style.height = h + "px";
			if(This.$group!=null){
				This.$group.css({height:h+"px"});
			}
			var parentDiv = This.$workArea.parent()[0];
			parentDiv.scrollTop = parentDiv.scrollHeight;
			return false;
	    });
	},
	//Initialize用来改变Connect的Connection端点的两个小方块的OperationEvents
	initLinePointsChg:function(){
		this.$mpFrom.on("mousedown",{inthis:this},function(e){
			var This=e.data.inthis;
			This.switchToolBtn("cursor");
			var ps=This.$mpFrom.data("p").split(",");
			var pe=This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineEnd",{"x":pe[0],"y":pe[1],"id":This.$lineData[This.$lineOper.data("tid")].to}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[ps[0],ps[1]],[pe[0],pe[1]],true,true);
			This.$draw.appendChild(line);
			return false;
	  });
		this.$mpTo.on("mousedown",{inthis:this},function(e){
			var This=e.data.inthis;
			This.switchToolBtn("cursor");
			var ps=This.$mpFrom.data("p").split(",");
			var pe=This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineStart",{"x":ps[0],"y":ps[1],"id":This.$lineData[This.$lineOper.data("tid")].from}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[ps[0],ps[1]],[pe[0],pe[1]],true,true);
			This.$draw.appendChild(line);
			return false;
	  });
	},
	//每一种TypeNode及其按钮的说明文字
	setNodeRemarks:function(remark){
    if(this.$tool==null)  return;
		this.$tool.children("a").each(function(){
			this.title=remark[$(this).attr("id").split("btn_")[1]];
		});
		this.$nodeRemark=remark;
	},

	//切换Left工具栏按钮,ParticipationTYPE表示切换成哪种Type的按钮
	switchToolBtn:function(type){
		this.$tool.children("#"+this.$id+"_btn_"+this.$nowType.split(" ")[0]).attr("class","GooFlow_tool_btn");
		if(this.$nowType=="group"){
			this.$workArea.prepend(this.$group);
			for(var key in this.$areaDom)	this.$areaDom[key].addClass("lock").children("div:eq(1)").css("display","none");
		}
		this.$nowType=type;
		this.$tool.children("#"+this.$id+"_btn_"+type.split(" ")[0]).attr("class","GooFlow_tool_btndown");
		if(this.$nowType=="group"){
			this.blurItem();
			this.$workArea.append(this.$group);
			for(var key in this.$areaDom)	this.$areaDom[key].removeClass("lock").children("div:eq(1)").css("display","");
		}else if(this.$nowType=="direct"){
      this.blurItem();
		}
		if(this.$textArea.css("display")=="none")	this.$textArea.removeData("id").val("").hide();
	},
	//增加一个流程Node,♪ To be heard ♪JSON,有id,name,top,left,width,height,type(NodeType)Equal Properties
	addNode:function(id,json){
		if(this.onItemAdd!=null&&!this.onItemAdd(id,"node",json))return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delNode",[id]);
		}
		var mark=json.marked? " item_mark":"";
		if(json.type.indexOf(" round")<0){
			if(!json.width||json.width<104)json.width=104;
			if(!json.height||json.height<26)json.height=26;
			if(!json.top||json.top<0)json.top=0;
			if(!json.left||json.left<0)json.left=0;

			this.$nodeDom[id]=$("<div class='GooFlow_item"+mark+"' id='"+id+"' style='top:"+json.top+"px;left:"+json.left+"px'><table cellspacing='1' style='width:"+(json.width-2)+"px;height:"+(json.height-2)+"px;'><tr><td class='ico'><i class='ico_"+json.type+"'></i></td><td>"+json.name+"</td></tr></table><div style='display:none'><div class='rs_bottom'></div><div class='rs_right'></div><div class='rs_rb'></div><div class='rs_close'></div></div></div>");
		}
		else{
			json.width=26;json.height=26;
			this.$nodeDom[id]=$("<div class='GooFlow_item item_round"+mark+"' id='"+id+"' style='top:"+json.top+"px;left:"+json.left+"px'><table cellspacing='0'><tr><td class='ico'><i class='ico_"+json.type+"'></i></td></tr></table><div  style='display:none'><div class='rs_close'></div></div><div class='span'>"+json.name+"</div></div>");
		}
		if(GooFlow.prototype.color.node){
      if(json.type.indexOf(" mix")>-1){
        this.$nodeDom[id].css({"background-color":GooFlow.prototype.color.mix,"border-color":GooFlow.prototype.color.mix});
		if(GooFlow.prototype.color.mixFont){
			this.$nodeDom[id].find("td:eq(1)").css("color",GooFlow.prototype.color.mixFont);
			this.$nodeDom[id].find(".span").css("color",GooFlow.prototype.color.mixFont);
		}
      }else{
        this.$nodeDom[id].css({"background-color":GooFlow.prototype.color.node,"border-color":GooFlow.prototype.color.node});
      }
      if(mark&&GooFlow.prototype.color.mark){
        this.$nodeDom[id].css({"border-color":GooFlow.prototype.color.mark});
      }
    }
		if(json.type.indexOf(" mix")>-1){
       this.$nodeDom[id].addClass("item_mix");
		}
		
		var ua=navigator.userAgent.toLowerCase();
		if(ua.indexOf('msie')!=-1 && ua.indexOf('8.0')!=-1)
			this.$nodeDom[id].css("filter","progid:DXImageTransform.Microsoft.Shadow(color=#94AAC2,direction=135,strength=2)");
		this.$workArea.append(this.$nodeDom[id]);
		this.$nodeData[id]=json;
		++this.$nodeCount;
		if(this.$editable){
			this.$nodeData[id].alt=true;
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退DeleteOperation时,去掉该Elements的Delete记录
		}
	},

	initWorkForNode:function(){
		//Tie点击Events
		this.$workArea.delegate(".GooFlow_item","click",{inthis:this},function(e){
			e.data.inthis.focusItem(this.id,true);
			$(this).removeClass("item_mark");
		});
		//Tie用鼠标移动Events
		this.$workArea.delegate(".ico","mousedown",{inthis:this},function(e){
			if(!e)e=window.event;
			if(e.button==2)return false;
			var This=e.data.inthis;
			if(This.$nowType=="direct")	return;
			var Dom=$(this).parents(".GooFlow_item");
			var id=Dom.attr("id");
			This.focusItem(id,true);

			var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);
			
			Dom.children("table").clone().prependTo(This.$ghost);
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var vX=X-This.$nodeData[id].left,vY=Y-This.$nodeData[id].top;
			var isMove=false;
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=mousePosition(e);
				if(X==ev.x-vX&&Y==ev.y-vY)	return false;
				X=ev.x-vX;Y=ev.y-vY;
				if(isMove&&This.$ghost.css("display")=="none"){
					This.$ghost.css({display:"block",
						width:This.$nodeData[id].width+"px", height:This.$nodeData[id].height+"px",
						top:This.$nodeData[id].top+t.top-This.$workArea[0].parentNode.scrollTop+"px",
						left:This.$nodeData[id].left+t.left-This.$workArea[0].parentNode.scrollLeft+"px",cursor:"move"
					});
				}

				if(X<t.left-This.$workArea[0].parentNode.scrollLeft)
					X=t.left-This.$workArea[0].parentNode.scrollLeft;
				else if(X+This.$workArea[0].parentNode.scrollLeft+This.$nodeData[id].width>t.left+This.$workArea.width())
					X=t.left+This.$workArea.width()-This.$workArea[0].parentNode.scrollLeft-This.$nodeData[id].width;
				if(Y<t.top-This.$workArea[0].parentNode.scrollTop)
					Y=t.top-This.$workArea[0].parentNode.scrollTop;
				else if(Y+This.$workArea[0].parentNode.scrollTop+This.$nodeData[id].height>t.top+This.$workArea.height())
					Y=t.top+This.$workArea.height()-This.$workArea[0].parentNode.scrollTop-This.$nodeData[id].height;
				This.$ghost.css({left:X+"px",top:Y+"px"});
				isMove=true;
			}
			document.onmouseup=function(e){
				if(isMove)This.moveNode(id,X+This.$workArea[0].parentNode.scrollLeft-t.left,Y+This.$workArea[0].parentNode.scrollTop-t.top);
				This.$ghost.empty().hide();
				document.onmousemove=null;
				document.onmouseup=null;
			}
		});
		if(!this.$editable)	return;
		//Tie鼠标覆盖/移出Events
		this.$workArea.delegate(".GooFlow_item","mouseenter",{inthis:this},function(e){
			if(e.data.inthis.$nowType!="direct"&&!document.getElementById("GooFlow_tmp_line"))	return;
			$(this).addClass("item_mark").addClass("crosshair").css("border-color",GooFlow.prototype.color.mark||"#ff8800");
		});
		this.$workArea.delegate(".GooFlow_item","mouseleave",{inthis:this},function(e){
			if(e.data.inthis.$nowType!="direct"&&!document.getElementById("GooFlow_tmp_line"))	return;
			$(this).removeClass("item_mark").removeClass("crosshair");
			if(this.id==e.data.inthis.$focus){
        $(this).css("border-color",GooFlow.prototype.color.line||"#3892D3");
			}else{
        $(this).css("border-color",GooFlow.prototype.color.node||"#A1DCEB");
			}
		});
		//TieConnect时Sure初始点
		this.$workArea.delegate(".GooFlow_item","mousedown",{inthis:this},function(e){
			if(e.button==2)return false;
			var This=e.data.inthis;
			if(This.$nowType!="direct")	return;
			var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			This.$workArea.data("lineStart",{"x":X,"y":Y,"id":this.id}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[X,Y],[X,Y],true,true);
			This.$draw.appendChild(line);
		});
		//TieConnect时SureEnd点
		this.$workArea.delegate(".GooFlow_item","mouseup",{inthis:this},function(e){
			var This=e.data.inthis;
			if(This.$nowType!="direct"&&!This.$mpTo.data("p"))	return;
			var lineStart=This.$workArea.data("lineStart");
			var lineEnd=This.$workArea.data("lineEnd");
			if(lineStart&&!This.$mpTo.data("p")){
				This.addLine(new Date().getTime(),{from:lineStart.id,to:this.id,name:""});
				This.$max++;
			}
			else{
				if(lineStart){
					This.moveLinePoints(This.$focus,lineStart.id,this.id);
				}else if(lineEnd){
					This.moveLinePoints(This.$focus,this.id,lineEnd.id);
				}
				if(!This.$nodeData[this.id].marked){
          $(this).removeClass("item_mark");
          if(this.id!=This.$focus){
            $(this).css("border-color",GooFlow.prototype.color.node);
          }
          else{
            $(this).css("border-color",GooFlow.prototype.color.line);
          }
				}
			}
		});
		//Tie双击编辑Events
		this.$workArea.delegate(".GooFlow_item > .span","dblclick",{inthis:this},function(e){
			var oldTxt=this.innerHTML;
			var This=e.data.inthis;
			var id=this.parentNode.id;
			var t=getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",height:$(this).height()+6,width:100,
				left:t.left+This.$nodeData[id].left-This.$workArea[0].parentNode.scrollLeft-26,
				top:t.top+This.$nodeData[id].top-This.$workArea[0].parentNode.scrollTop+26})
				.data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				if(e.button==2)return false;
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"node");
				This.$textArea.val("").removeData("id").hide();
			});
		});
		this.$workArea.delegate(".ico + td","dblclick",{inthis:this},function(e){
			var oldTxt=this.innerHTML;
			var This=e.data.inthis;
			var id=$(this).parents(".GooFlow_item").attr("id");
			var t=getElCoordinate(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:$(this).width()+26,height:$(this).height()+6,
				left:t.left+26+This.$nodeData[id].left-This.$workArea[0].parentNode.scrollLeft,
				top:t.top+2+This.$nodeData[id].top-This.$workArea[0].parentNode.scrollTop})
				.data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				if(e.button==2)return false;
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"node");
				This.$textArea.val("").removeData("id").hide();
			});
		});
		//TieNode的DeleteFunctions
		this.$workArea.delegate(".rs_close","click",{inthis:this},function(e){
			if(!e)e=window.event;
			e.data.inthis.delNode(e.data.inthis.$focus);
			return false;
		});
		//TieNode的RESIZEFunctions
		this.$workArea.delegate(".GooFlow_item > div > div[class!=rs_close]","mousedown",{inthis:this},function(e){
			if(!e)e=window.event;
			if(e.button==2)return false;
			var cursor=$(this).css("cursor");
			if(cursor=="pointer"){return;}
			var This=e.data.inthis;
			var id=This.$focus;
			This.switchToolBtn("cursor");
			e.cancelBubble = true;
			e.stopPropagation();

			var ev=mousePosition(e),t=getElCoordinate(This.$workArea[0]);
			This.$ghost.css({display:"block",
				width:This.$nodeData[id].width+"px", height:This.$nodeData[id].height+"px",
				top:This.$nodeData[id].top+t.top-This.$workArea[0].parentNode.scrollTop+"px",
				left:This.$nodeData[id].left+t.left-This.$workArea[0].parentNode.scrollLeft+"px",cursor:cursor
			});
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var vX=(This.$nodeData[id].left+This.$nodeData[id].width)-X;
			var vY=(This.$nodeData[id].top+This.$nodeData[id].height)-Y;
			var isMove=false;
			This.$ghost.css("cursor",cursor);
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=mousePosition(e);
				X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft-This.$nodeData[id].left+vX;
				Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop-This.$nodeData[id].top+vY;
				if(X<104)	X=104;
				if(Y<26)	Y=26;
				isMove=true;
				switch(cursor){
					case "nw-resize":This.$ghost.css({width:X+"px",height:Y+"px"});break;
					case "w-resize":This.$ghost.css({width:X+"px"});break;
					case "n-resize":This.$ghost.css({height:Y+"px"});break;
				}
			}
			document.onmouseup=function(e){
				document.onmousemove=null;
				document.onmouseup=null;
				This.$ghost.hide();
				if(!isMove)return;
				if(!e)e=window.event;
				This.resizeNode(id,This.$ghost.outerWidth(),This.$ghost.outerHeight());
	  		}
		});
	},
	//获取Node/Connect/Detailed information on cluster areas
	getItemInfo:function(id,type){
		switch(type){
			case "node":	return this.$nodeData[id]||null;
			case "line":	return this.$lineData[id]||null;
			case "area":	return this.$areaData[id]||null;
		}
	},
	//取消AllNode/Connect to selected status
	blurItem:function(){
		if(this.$focus!=""){
			var jq=$("#"+this.$focus);
			if(jq.prop("tagName")=="DIV"){
				if(this.onItemBlur!=null&&!this.onItemBlur(this.$focus,"node"))	return false;
				jq.removeClass("item_focus").children("div:eq(0)").css("display","none");
				if(this.$nodeData[this.$focus].marked){
					jq.addClass("item_mark").css("border-color",GooFlow.prototype.color.mark||'#ff8800');
				}
			}
			else{
				if(this.onItemBlur!=null&&!this.onItemBlur(this.$focus,"line"))	return false;
				if(GooFlow.prototype.useSVG!=""){
					if(!this.$lineData[this.$focus].marked){
						jq[0].childNodes[1].setAttribute("stroke",GooFlow.prototype.color.line||"#3892D3");
						jq[0].childNodes[1].setAttribute("marker-end","url(#arrow1)");
					}
				}
				else{
					if(!this.$lineData[this.$focus].marked){
                        jq[0].strokeColor=GooFlow.prototype.color.line||"#3892D3";
					}
				}
				this.$lineMove.hide().removeData("type").removeData("tid");
				if(this.$editable){
						this.$lineOper.hide().removeData("tid");
						this.$mpFrom.hide().removeData("p");
						this.$mpTo.hide().removeData("p");
				}
			}
		}
		this.$focus="";
		return true;
	},
	//选定某个Node/Convert Lines bool:TRUE决定了要触发选中Events，FALSE则不触发选中Events，More Call within Program。
	focusItem:function(id,bool){
		var jq=$("#"+id);
		if(jq.length==0)	return;
		if(!this.blurItem())	return;//Execute first"Uncheck",IfBackFLASE,则也会阻止选定Events继续进行.
		if(jq.prop("tagName")=="DIV"){
			if(bool&&this.onItemFocus!=null&&!this.onItemFocus(id,"node"))	return;
			jq.addClass("item_focus");
			if(GooFlow.prototype.color.line){
        jq.css("border-color",GooFlow.prototype.color.line);
			}
			if(this.$editable)jq.children("div:eq(0)").css("display","block");
			this.$workArea.append(jq);
		}
		else{//If是Connection线
			if(this.onItemFocus!=null&&!this.onItemFocus(id,"line"))	return;
			if(GooFlow.prototype.useSVG!=""){
				jq[0].childNodes[1].setAttribute("stroke",GooFlow.prototype.color.mark||"#ff8800");
				jq[0].childNodes[1].setAttribute("marker-end","url(#arrow2)");
			}
			else{
                jq[0].strokeColor=GooFlow.prototype.color.mark||"#ff8800";
			}
			if(!this.$editable)	return;
			var x,y,from,to,n;
			if(GooFlow.prototype.useSVG!=""){
				from=jq.attr("from").split(",");
				to=jq.attr("to").split(",");
				n=[from[0],from[1],to[0],to[1]];
			}else{
				n=jq[0].getAttribute("fromTo").split(",");
				from=[n[0],n[1]];
				to=[n[2],n[3]];
			}
			from[0]=parseInt(from[0],10);
			from[1]=parseInt(from[1],10);
			to[0]=parseInt(to[0],10);
			to[1]=parseInt(to[1],10);
			//var t=getElCoordinate(this.$workArea[0]);
			if(this.$lineData[id].type=="lr"){
				from[0]=this.$lineData[id].M;
				to[0]=from[0];
				
				this.$lineMove.css({
					width:"5px",height:(to[1]-from[1])*(to[1]>from[1]? 1:-1)+"px",
					left:from[0]-3+"px",
					top:(to[1]>from[1]? from[1]:to[1])+1+"px",
					cursor:"e-resize",display:"block"
				}).data({"type":"lr","tid":id});
			}
			else if(this.$lineData[id].type=="tb"){
				from[1]=this.$lineData[id].M;
				to[1]=from[1];
				this.$lineMove.css({
					width:(to[0]-from[0])*(to[0]>from[0]? 1:-1)+"px",height:"5px",
					left:(to[0]>from[0]? from[0]:to[0])+1+"px",
					top:from[1]-3+"px",
					cursor:"s-resize",display:"block"
				}).data({"type":"tb","tid":id});
			}
			x=(from[0]+to[0])/2-40;
			y=(from[1]+to[1])/2+4;
			this.$lineOper.css({display:"block",left:x+"px",top:y+"px"}).data("tid",id);
			if(this.$editable){
				this.$mpFrom.css({display:"block",left:n[0]-4+"px",top:n[1]-4+"px"}).data("p",n[0]+","+n[1]);
				this.$mpTo.css({display:"block",left:n[2]-4+"px",top:n[3]-4+"px"}).data("p",n[2]+","+n[3]);
			}
			this.$draw.appendChild(jq[0]);
		}
		this.$focus=id;
		this.switchToolBtn("cursor");
	},
	//移动Node到一个新的位置
	moveNode:function(id,left,top){
		if(!this.$nodeData[id])	return;
		if(this.onItemMove!=null&&!this.onItemMove(id,"node",left,top))	return;
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id].left,this.$nodeData[id].top];
			this.pushOper("moveNode",paras);
		}
		if(left<0)	left=0;
		if(top<0)	top=0;
		$("#"+id).css({left:left+"px",top:top+"px"});
		this.$nodeData[id].left=left;
		this.$nodeData[id].top=top;
		//重画Convert Lines
		this.resetLines(id,this.$nodeData[id]);
		if(this.$editable){
			this.$nodeData[id].alt=true;
		}
	},
	//SettingsNode/Connect/Text information for group areas
	setName:function(id,name,type){
		var oldName;
		if(type=="node"){//If是Node
			if(!this.$nodeData[id])	return;
			if(this.$nodeData[id].name==name)	return;
			if(this.onItemRename!=null&&!this.onItemRename(id,name,"node"))	return;
			oldName=this.$nodeData[id].name;
			this.$nodeData[id].name=name;
			if(this.$nodeData[id].type.indexOf("round")>1){
				this.$nodeDom[id].children(".span").text(name);
			}
			else{
				this.$nodeDom[id].find("td:eq(1)").text(name);

				var width=this.$nodeDom[id].width();
				var height=this.$nodeDom[id].height();
				this.$nodeDom[id].children("table").css({width:width+"px",height:height+"px"});
				this.$nodeData[id].width=width;
				this.$nodeData[id].height=height;
			}
			if(this.$editable){
				this.$nodeData[id].alt=true;
			}
			//重画Convert Lines
			this.resetLines(id,this.$nodeData[id]);
		}
		else if(type=="line"){//If是线
			if(!this.$lineData[id])	return;
			if(this.$lineData[id].name==name)	return;
			if(this.onItemRename!=null&&!this.onItemRename(id,name,"line"))	return;
			oldName=this.$lineData[id].name;
			this.$lineData[id].name=name;
			if(GooFlow.prototype.useSVG!=""){
				this.$lineDom[id].childNodes[2].textContent=name;
			}
			else{
				this.$lineDom[id].childNodes[1].innerHTML=name;
				var n=this.$lineDom[id].getAttribute("fromTo").split(",");
				var x;
				if(this.$lineData[id].type!="lr"){
					x=(n[2]-n[0])/2;
				}
				else{
					var Min=n[2]>n[0]? n[0]:n[2];
					if(Min>this.$lineData[id].M) Min=this.$lineData[id].M;
					x=this.$lineData[id].M-Min;
				}
				if(x<0) x=x*-1;
				this.$lineDom[id].childNodes[1].style.left=x-this.$lineDom[id].childNodes[1].offsetWidth/2+4+"px";
			}
			if(this.$editable){
				this.$lineData[id].alt=true;
			}
		}
		else if(type=="area"){//If是分组区域
			if(!this.$areaData[id])	return;
			if(this.$areaData[id].name==name)	return;
			if(this.onItemRename!=null&&!this.onItemRename(id,name,"area"))	return;
			oldName=this.$areaData[id].name;
			this.$areaData[id].name=name;
			this.$areaDom[id].children("label").text(name);
			if(this.$editable){
				this.$areaData[id].alt=true;
			}
		}
		if(this.$undoStack){
			var paras=[id,oldName,type];
			this.pushOper("setName",paras);
		}
	},
	//SettingsNode的尺寸,仅支持非Start/End Node
	resizeNode:function(id,width,height){
		if(!this.$nodeData[id])	return;
		if(this.onItemResize!=null&&!this.onItemResize(id,"node",width,height))	return;
		if(this.$nodeData[id].type=="start"||this.$nodeData[id].type=="end")return;
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id].width,this.$nodeData[id].height];
			this.pushOper("resizeNode",paras);
		}

		this.$nodeDom[id].children("table").css({width:width-2+"px",height:height-2+"px"});
		//width=this.$nodeDom[id].outerWidth();
		//height=this.$nodeDom[id].outerHeight();
		//this.$nodeDom[id].children("table").css({width:width-2+"px",height:height-2+"px"});
		this.$nodeData[id].width=width;
		this.$nodeData[id].height=height;
		if(this.$editable){
			this.$nodeData[id].alt=true;
		}
		//重画Convert Lines
		this.resetLines(id,this.$nodeData[id]);
	},
	//DeleteNode
	delNode:function(id,trigger){
		if(!this.$nodeData[id])	return;
		if(false!=trigger && this.onItemDel!=null&&!this.onItemDel(id,"node"))	return;
		//先Delete可能的Connect
		for(var k in this.$lineData){
			if(this.$lineData[k].from==id||this.$lineData[k].to==id){
				//this.$draw.removeChild(this.$lineDom[k]);
				//delete this.$lineData[k];
				//delete this.$lineDom[k];
				this.delLine(k,false);
			}
		}
		//再DeleteNode本身
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id]];
			this.pushOper("addNode",paras);
		}
		delete this.$nodeData[id];
		this.$nodeDom[id].remove();
		delete this.$nodeDom[id];
		--this.$nodeCount;
		if(this.$focus==id)	this.$focus="";

		if(this.$editable){
			//在回退新增Operation时,IfNodesID以this.$id+"_node_"Start,则表示为本次编辑时新Add的Nodes,这些Nodes的Delete不用Add到$deletedItem中
			if(id.indexOf(this.$id+"_node_")<0)
				this.$deletedItem[id]="node";
		}
	},
	//SettingsFlowchart的名称
	setTitle:function(text){
		this.$title=text;
		if(this.$head)	this.$head.children("label").attr("title",text).text(text);
	},
	//载入一组Data
	loadData:function(data){
		var t=this.$editable;
		this.$editable=false;
		if(data.title)	this.setTitle(data.title);
		if(data.initNum)	this.$max=data.initNum;
		for(var i in data.nodes)
			this.addNode(i,data.nodes[i]);
		for(var j in data.lines)
			this.addLine(j,data.lines[j]);
		for(var k in data.areas)
			this.addArea(k,data.areas[k]);
		this.$editable=t;
		this.$deletedItem={};
		//Self-restructuring workspace，Make it fit
		var width=this.$workArea.width();
		var height=this.$workArea.height();
		var maxW=0,maxH=0;
		for(var key in this.$nodeData){
			var item = this.$nodeData[key];
			if(maxW < item.width+item.left){
				maxW = item.width+item.left;
			}
			if(maxH < item.height+item.top){
				maxH = item.height+item.top;
			}
		}
		for(var key in this.$areaData){
			var item = this.$areaData[key];
			if(maxW < item.width+item.left){
				maxW = item.width+item.left;
			}
			if(maxH < item.height+item.top){
				maxH = item.height+item.top;
			}
		}
		for(var key in this.$lineData){
			var item = this.$lineData[key];
			if(item.M && item.type=="lt" && maxW < item.M ){
				maxW = M+4;
			}
			if(item.M && item.type=="tb" && maxH < item.M ){
				maxH = M+4;
			}
		}
		while(maxW>width){
			width+=this.$workExtendStep;
		}
		while(maxH>height){
			height+=this.$workExtendStep;
		}
		this.$workArea.css({height:height+"px",width:width+"px"});
		if(GooFlow.prototype.useSVG==""){
			this.$draw.coordsize = width+","+height;
		}
		this.$draw.style.width = width + "px";
		this.$draw.style.height = +height + "px";
		if(this.$group!=null){
			this.$group.css({height:height+"px",width:width+"px"});
		}
	},
	//用AJAXModalities，Remote读取一组Data
	//Parameterspara为JSONStructure，与JQUERY中$.ajax()方法的Participation一样
	loadDataAjax:function(para){
		var This=this;
		$.ajax({
			type:para.type,
			url:para.url,
			dataType:"json",
			data:para.data,
			success: function(msg){
				if(para.dataFilter)	para.dataFilter(msg,"json");
     			This.loadData(msg);
				if(para.success)	para.success(msg);
   			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				if(para.error)	para.error(textStatus,errorThrown);
			}
		})
	},
	//把画好的整个FlowchartExport到一个变量中(It\'s actually a direct accessGooFlowobject$nodeData,$lineData,$areaDataThese threeJSONProperties)
	exportData:function(){
		var ret={title:this.$title,nodes:this.$nodeData,lines:this.$lineData,areas:this.$areaData,initNum:this.$max};
		for(var k1 in ret.nodes){
			if(!ret.nodes[k1].marked){
				delete ret.nodes[k1]["marked"];
			}
		}
		for(var k2 in ret.lines){
			if(!ret.lines[k2].marked){
				delete ret.lines[k2]["marked"];
			}
		}
		return ret;
	},
	//只把本次编辑Flowchart中作了变更(Including additions and deletions)的ElementsExport到一个变量中,以方便用户每次编辑载入的Flowchart后只获取变更过的Data
	exportAlter:function(){
		var ret={nodes:{},lines:{},areas:{}};
		for(var k1 in this.$nodeData){
			if(this.$nodeData[k1].alt){
				ret.nodes[k1]=this.$nodeData[k1];
			}
		}
		for(var k2 in this.$lineData){
			if(this.$lineData[k2].alt){
				ret.lines[k2]=this.$lineData[k2];
			}
		}
		for(var k3 in this.$areaData){
			if(this.$areaData[k3].alt){
				ret.areas[k3]=this.$areaData[k3];
			}
		}
		ret.deletedItem=this.$deletedItem;
		return ret;
	},
	//变更Elements的ID,Usually used after quick saving,Returning backstage to the new elementIDUpdate到页面中;type为ElementsType(Nodes,Connect,Blocks)
	transNewId:function(oldId,newId,type){
		var tmp;
		switch(type){
			case "node":
			if(this.$nodeData[oldId]){
				tmp=this.$nodeData[oldId];
				delete this.$nodeData[oldId];
				this.$nodeData[newId]=tmp;
				tmp=this.$nodeDom[oldId].attr("id",newId);
				delete this.$nodeDom[oldId];
				this.$nodeDom[newId]=tmp;
			}
			break;
			case "line":
			if(this.$lineData[oldId]){
				tmp=this.$lineData[oldId];
				delete this.$lineData[oldId];
				this.$lineData[newId]=tmp;
				tmp=this.$lineDom[oldId].attr("id",newId);
				delete this.$lineDom[oldId];
				this.$lineDom[newId]=tmp;
			}
			break;
			case "area":
			if(this.$areaData[oldId]){
				tmp=this.$areaData[oldId];
				delete this.$areaData[oldId];
				this.$areaData[newId]=tmp;
				tmp=this.$areaDom[oldId].attr("id",newId);
				delete this.$areaDom[oldId];
				this.$areaDom[newId]=tmp;
			}
			break;
		}
	},
	//清空工作区及已载入的Data
	clearData:function(){
		for(var key in this.$nodeData){
			this.delNode(key);
		}
		for(var key in this.$lineData){
			this.delLine(key);
		}
		for(var key in this.$areaData){
			this.delArea(key);
		}
		this.$deletedItem={};
	},
	//Destroy yourself
	destrory:function(){
		this.$bgDiv.empty();
		this.$lineData=null;
		this.$nodeData=null;
		this.$lineDom=null;
		this.$nodeDom=null;
		this.$areaDom=null;
		this.$areaData=null;
		this.$nodeCount=0;
		this.$areaCount=0;
		this.$areaCount=0;
		this.$deletedItem={};
	},
///////////The following is the method of drawing lines:
	//Draw an arrow line，And back to the lineDOM
	drawLine:function(id,sp,ep,mark,dash){
		var line;
		if(GooFlow.prototype.useSVG!=""){
			line=document.createElementNS("http://www.w3.org/2000/svg","g");
			var hi=document.createElementNS("http://www.w3.org/2000/svg","path");
			var path=document.createElementNS("http://www.w3.org/2000/svg","path");

			if(id!="")	line.setAttribute("id",id);
			line.setAttribute("from",sp[0]+","+sp[1]);
			line.setAttribute("to",ep[0]+","+ep[1]);
			hi.setAttribute("visibility","hidden");
			hi.setAttribute("stroke-width",9);
			hi.setAttribute("fill","none");
			hi.setAttribute("stroke","white");
			hi.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			hi.setAttribute("pointer-events","stroke");
			path.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			path.setAttribute("stroke-width",mark? 2.4:1.4);
			path.setAttribute("stroke-linecap","round");
			path.setAttribute("fill","none");
			if(dash)	path.setAttribute("style", "stroke-dasharray:6,5");
			if(mark){
				path.setAttribute("stroke",GooFlow.prototype.color.mark||"#ff8800");
				path.setAttribute("marker-end","url(#arrow2)");
			}
			else{
				path.setAttribute("stroke",GooFlow.prototype.color.line||"#3892D3");
				path.setAttribute("marker-end","url(#arrow1)");
			}
			line.appendChild(hi);
			line.appendChild(path);
			line.style.cursor="crosshair";
			if(id!=""&&id!="GooFlow_tmp_line"){
				var text=document.createElementNS("http://www.w3.org/2000/svg","text");
				text.setAttribute("fill",GooFlow.prototype.color.lineFont||"#333");
				line.appendChild(text);
				var x=(ep[0]+sp[0])/2;
				var y=(ep[1]+sp[1])/2;
				text.setAttribute("text-anchor","middle");
				text.setAttribute("x",x);
				text.setAttribute("y",y);
				line.style.cursor="pointer";
				text.style.cursor="text";
			}
		}else{
			line=document.createElement("v:polyline");
			if(id!="")	line.id=id;
			//line.style.position="absolute";
			line.points.value=sp[0]+","+sp[1]+" "+ep[0]+","+ep[1];
			line.setAttribute("fromTo",sp[0]+","+sp[1]+","+ep[0]+","+ep[1]);
			line.strokeWeight="1.2";
			line.stroke.EndArrow="Block";
			line.style.cursor="crosshair";
			if(id!=""&&id!="GooFlow_tmp_line"){
				var text=document.createElement("div");
				//text.innerHTML=id;
				line.appendChild(text);
				var x=(ep[0]-sp[0])/2;
				var y=(ep[1]-sp[1])/2;
				if(x<0) x=x*-1;
				if(y<0) y=y*-1;
				text.style.left=x+"px";
				text.style.top=y-6+"px";
				line.style.cursor="pointer";
			}
			if(dash)	line.stroke.dashstyle="Dash";
			if(mark)	line.strokeColor=GooFlow.prototype.color.mark||"#ff8800";
			else	line.strokeColor=GooFlow.prototype.color.line||"#3892D3";
			line.fillColor=GooFlow.prototype.color.line||"#3892D3";
		}
		return line;
	},
	//画一条只有两Midpoint的折线
	drawPoly:function(id,sp,m1,m2,ep,mark){
		var poly,strPath;
		if(GooFlow.prototype.useSVG!=""){
			poly=document.createElementNS("http://www.w3.org/2000/svg","g");
			var hi=document.createElementNS("http://www.w3.org/2000/svg","path");
			var path=document.createElementNS("http://www.w3.org/2000/svg","path");
			if(id!="")	poly.setAttribute("id",id);
			poly.setAttribute("from",sp[0]+","+sp[1]);
			poly.setAttribute("to",ep[0]+","+ep[1]);
			hi.setAttribute("visibility","hidden");
			hi.setAttribute("stroke-width",9);
			hi.setAttribute("fill","none");
			hi.setAttribute("stroke","white");
			strPath="M "+sp[0]+" "+sp[1];
			if(m1[0]!=sp[0]||m1[1]!=sp[1])
				strPath+=" L "+m1[0]+" "+m1[1];
			if(m2[0]!=ep[0]||m2[1]!=ep[1])
				strPath+=" L "+m2[0]+" "+m2[1];
			strPath+=" L "+ep[0]+" "+ep[1];
			hi.setAttribute("d",strPath);
			hi.setAttribute("pointer-events","stroke");
			path.setAttribute("d",strPath);
			path.setAttribute("stroke-width",mark? 2.4:1.4);
			path.setAttribute("stroke-linecap","round");
			path.setAttribute("fill","none");
			if(mark){
				path.setAttribute("stroke",GooFlow.prototype.color.mark||"#ff8800");
				path.setAttribute("marker-end","url(#arrow2)");
			}
			else{
				path.setAttribute("stroke",GooFlow.prototype.color.line||"#3892D3");
				path.setAttribute("marker-end","url(#arrow1)");
			}
			poly.appendChild(hi);
			poly.appendChild(path);
			var text=document.createElementNS("http://www.w3.org/2000/svg","text");
			text.setAttribute("fill",GooFlow.prototype.color.lineFont||"#333");
			poly.appendChild(text);
			var x=(m2[0]+m1[0])/2;
			var y=(m2[1]+m1[1])/2;
			text.setAttribute("text-anchor","middle");
			text.setAttribute("x",x);
			text.setAttribute("y",y);
			text.style.cursor="text";
			poly.style.cursor="pointer";
		}
		else{
			poly=document.createElement("v:Polyline");
			if(id!="")	poly.id=id;
			poly.filled="false";
			strPath=sp[0]+","+sp[1];
			if(m1[0]!=sp[0]||m1[1]!=sp[1])
				strPath+=" "+m1[0]+","+m1[1];
			if(m2[0]!=ep[0]||m2[1]!=ep[1])
				strPath+=" "+m2[0]+","+m2[1];
			strPath+=" "+ep[0]+","+ep[1];
			poly.points.value=strPath;
			poly.setAttribute("fromTo",sp[0]+","+sp[1]+","+ep[0]+","+ep[1]);
			poly.strokeWeight=mark? "2.4":"1.2";
			poly.stroke.EndArrow="Block";
			var text=document.createElement("div");
			//text.innerHTML=id;
			poly.appendChild(text);
			var x=(m2[0]-m1[0])/2;
			var y=(m2[1]-m1[1])/2;
			if(x<0) x=x*-1;
			if(y<0) y=y*-1;
			text.style.left=x+"px";
			text.style.top=y-4+"px";
			poly.style.cursor="pointer";
			if(mark)	poly.strokeColor=GooFlow.prototype.color.mark||"#ff8800";
			else	poly.strokeColor=GooFlow.prototype.color.line||"#3892D3";
		}
		return poly;
	},
	//计算两个Node间要连Line的话，Connect的StartCoordinates和EndCoordinates
	calcStartEnd:function(n1,n2){
		var X_1,Y_1,X_2,Y_2;
		//XDecision：
		var x11=n1.left,x12=n1.left+n1.width,x21=n2.left,x22=n2.left+n2.width;
		//Node2在Node1Left
		if(x11>=x22){
			X_1=x11;X_2=x22;
		}
		//Node2在Node1Right
		else if(x12<=x21){
			X_1=x12;X_2=x21;
		}
		//Node2在Node1Horizontal part overlap
		else if(x11<=x21&&x12>=x21&&x12<=x22){
			X_1=(x12+x21)/2;X_2=X_1;
		}
		else if(x11>=x21&&x12<=x22){
			X_1=(x11+x12)/2;X_2=X_1;
		}
		else if(x21>=x11&&x22<=x12){
			X_1=(x21+x22)/2;X_2=X_1;
		}
		else if(x11<=x22&&x12>=x22){
			X_1=(x11+x22)/2;X_2=X_1;
		}
		
		//YDecision：
		var y11=n1.top,y12=n1.top+n1.height,y21=n2.top,y22=n2.top+n2.height;
		//Node2在Node1Top
		if(y11>=y22){
			Y_1=y11;Y_2=y22;
		}
		//Node2在Node1Down
		else if(y12<=y21){
			Y_1=y12;Y_2=y21;
		}
		//Node2在Node1Vertical Partial Merge
		else if(y11<=y21&&y12>=y21&&y12<=y22){
			Y_1=(y12+y21)/2;Y_2=Y_1;
		}
		else if(y11>=y21&&y12<=y22){
			Y_1=(y11+y12)/2;Y_2=Y_1;
		}
		else if(y21>=y11&&y22<=y12){
			Y_1=(y21+y22)/2;Y_2=Y_1;
		}
		else if(y11<=y22&&y12>=y22){
			Y_1=(y11+y22)/2;Y_2=Y_1;
		}
		return {"start":[X_1,Y_1],"end":[X_2,Y_2]};
	},
	//计算两个Node间要连折线的话，Connect的AllCoordinates
	calcPolyPoints:function(n1,n2,type,M){
		//Start/End两个Node的中心
		var SP={x:n1.left+n1.width/2,y:n1.top+n1.height/2};
		var EP={x:n2.left+n2.width/2,y:n2.top+n2.height/2};
		var sp=[],m1=[],m2=[],ep=[];
		//If是允许Middler to move around,则ParametersMis a moving middle lineXCoordinates
		//Crude calculation起始点
		sp=[SP.x,SP.y];
		ep=[EP.x,EP.y];
		if(type=="lr"){
			//Crude calculation2Midpoint
			m1=[M,SP.y];
			m2=[M,EP.y];
			//再具体分析ModifyStart点和中点1
			if(m1[0]>n1.left&&m1[0]<n1.left+n1.width){
				m1[1]=(SP.y>EP.y? n1.top:n1.top+n1.height);
				sp[0]=m1[0];sp[1]=m1[1];
			}
			else{
				sp[0]=(m1[0]<n1.left? n1.left:n1.left+n1.width)
			}
			//More specific analysis of the midpoint2和End点
			if(m2[0]>n2.left&&m2[0]<n2.left+n2.width){
				m2[1]=(SP.y>EP.y? n2.top+n2.height:n2.top);
				ep[0]=m2[0];ep[1]=m2[1];
			}
			else{
				ep[0]=(m2[0]<n2.left? n2.left:n2.left+n2.width)
			}
		}
		//If是允许Midrix to move up/ down,则ParametersMis a moving middle lineYCoordinates
		else if(type=="tb"){
			//Crude calculation2Midpoint
			m1=[SP.x,M];
			m2=[EP.x,M];
			//再具体分析ModifyStart点和中点1
			if(m1[1]>n1.top&&m1[1]<n1.top+n1.height){
				m1[0]=(SP.x>EP.x? n1.left:n1.left+n1.width);
				sp[0]=m1[0];sp[1]=m1[1];
			}
			else{
				sp[1]=(m1[1]<n1.top? n1.top:n1.top+n1.height)
			}
			//More specific analysis of the midpoint2和End点
			if(m2[1]>n2.top&&m2[1]<n2.top+n2.height){
				m2[0]=(SP.x>EP.x? n2.left+n2.width:n2.left);
				ep[0]=m2[0];ep[1]=m2[1];
			}
			else{
				ep[1]=(m2[1]<n2.top? n2.top:n2.top+n2.height);
			}
		}
		return {start:sp,m1:m1,m2:m2,end:ep};
	},
	//Initialize折线中段的X/YCoordinates,mType='rb'TimeXCoordinates,mType='tb'TimeYCoordinates
	getMValue:function(n1,n2,mType){
		if(mType=="lr"){
			return (n1.left+n1.width/2+n2.left+n2.width/2)/2;
		}
		else if(mType=="tb"){
			return (n1.top+n1.height/2+n2.top+n2.height/2)/2;
		}
	},
	//原lineDataIt\'s already set，只在绘图工作区画一条线的页面Elements
	addLineDom:function(id,lineData){
		var n1=this.$nodeData[lineData.from],n2=this.$nodeData[lineData.to];//获取Start/End Node的Data
		if(!n1||!n2)	return;
		//Start计算线端点Coordinates
		var res;
		if(lineData.type&&lineData.type!="sl")
			res=GooFlow.prototype.calcPolyPoints(n1,n2,lineData.type,lineData.M);
		else
			res=GooFlow.prototype.calcStartEnd(n1,n2);
		if(!res)	return;
		
		if(lineData.type=="sl")
			this.$lineDom[id]=GooFlow.prototype.drawLine(id,res.start,res.end,lineData.marked);
		else
			this.$lineDom[id]=GooFlow.prototype.drawPoly(id,res.start,res.m1,res.m2,res.end,lineData.marked);
		this.$draw.appendChild(this.$lineDom[id]);
		if(GooFlow.prototype.useSVG==""){
			this.$lineDom[id].childNodes[1].innerHTML=lineData.name;
			if(lineData.type!="sl"){
				var Min=(res.start[0]>res.end[0]? res.end[0]:res.start[0]);
				if(Min>res.m2[0])	Min=res.m2[0];
				if(Min>res.m1[0])	Min=res.m1[0];
				this.$lineDom[id].childNodes[1].style.left = (res.m2[0]+res.m1[0])/2-Min-this.$lineDom[id].childNodes[1].offsetWidth/2+4;
				Min=(res.start[1]>res.end[1]? res.end[1]:res.start[1]);
				if(Min>res.m2[1])	Min=res.m2[1];
				if(Min>res.m1[1])	Min=res.m1[1];
				this.$lineDom[id].childNodes[1].style.top = (res.m2[1]+res.m1[1])/2-Min-this.$lineDom[id].childNodes[1].offsetHeight/2;
			}else
				this.$lineDom[id].childNodes[1].style.left=
				((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[id].childNodes[1].offsetWidth)/2+4;
		}
		else	this.$lineDom[id].childNodes[2].textContent=lineData.name;
	},
	//Add a line
	addLine:function(id,json){
		if(this.onItemAdd!=null&&!this.onItemAdd(id,"line",json))return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delLine",[id]);
		}
		if(json.from==json.to)	return;
		var n1=this.$nodeData[json.from],n2=this.$nodeData[json.to];//获取Start/End Node的Data
		if(!n1||!n2)	return;
		//避免两个Nodes间不能有一条以上同向接Connect
		for(var k in this.$lineData){
			if((json.from==this.$lineData[k].from&&json.to==this.$lineData[k].to))
				return;
		}
		//Settings$lineData[id]
		this.$lineData[id]={};
		if(json.type){
			this.$lineData[id].type=json.type;
			this.$lineData[id].M=json.M;
		}
		else	this.$lineData[id].type="sl";//Default asLine
		this.$lineData[id].from=json.from;
		this.$lineData[id].to=json.to;
		this.$lineData[id].name=json.name;
		if(json.marked)	this.$lineData[id].marked=json.marked;
		else	this.$lineData[id].marked=false;
		//Settings$lineData[id]Over
		
		this.addLineDom(id,this.$lineData[id]);
		
		++this.$lineCount;
		if(this.$editable){
			this.$lineData[id].alt=true;
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退DeleteOperation时,去掉该Elements的Delete记录
		}
	},
	//重构All连向某个Node的线的显示，ParticipationStructure为$nodeDataA unit structure for arrays
	resetLines:function(id,node){
		for(var i in this.$lineData){
		  var other=null;//获取End/Start Node的Data
		  var res;
		  if(this.$lineData[i].from==id){//找End点
			other=this.$nodeData[this.$lineData[i].to]||null;
			if(other==null)	continue;
			if(this.$lineData[i].type=="sl")
				res=GooFlow.prototype.calcStartEnd(node,other);
			else
				res=GooFlow.prototype.calcPolyPoints(node,other,this.$lineData[i].type,this.$lineData[i].M)
			if(!res)	break;
		  }
		  else if(this.$lineData[i].to==id){//找Start点
			other=this.$nodeData[this.$lineData[i].from]||null;
			if(other==null)	continue;
			if(this.$lineData[i].type=="sl")
				res=GooFlow.prototype.calcStartEnd(other,node);
			else
				res=GooFlow.prototype.calcPolyPoints(other,node,this.$lineData[i].type,this.$lineData[i].M);
			if(!res)	break;
		  }
		  if(other==null)	continue;
		  this.$draw.removeChild(this.$lineDom[i]);
		  if(this.$lineData[i].type=="sl"){
		  	this.$lineDom[i]=GooFlow.prototype.drawLine(i,res.start,res.end,this.$lineData[i].marked);
		  }
		  else{
			this.$lineDom[i]=GooFlow.prototype.drawPoly(i,res.start,res.m1,res.m2,res.end,this.$lineData[i].marked);
		  }
		  this.$draw.appendChild(this.$lineDom[i]);
		  if(GooFlow.prototype.useSVG==""){
			this.$lineDom[i].childNodes[1].innerHTML=this.$lineData[i].name;
			if(this.$lineData[i].type!="sl"){
				var Min=(res.start[0]>res.end[0]? res.end[0]:res.start[0]);
				if(Min>res.m2[0])	Min=res.m2[0];
				if(Min>res.m1[0])	Min=res.m1[0];
				this.$lineDom[i].childNodes[1].style.left = (res.m2[0]+res.m1[0])/2-Min-this.$lineDom[i].childNodes[1].offsetWidth/2+4;
				Min=(res.start[1]>res.end[1]? res.end[1]:res.start[1]);
				if(Min>res.m2[1])	Min=res.m2[1];
				if(Min>res.m1[1])	Min=res.m1[1];
				this.$lineDom[i].childNodes[1].style.top = (res.m2[1]+res.m1[1])/2-Min-this.$lineDom[i].childNodes[1].offsetHeight/2-4;
			}else
				this.$lineDom[i].childNodes[1].style.left=
				((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[i].childNodes[1].offsetWidth)/2+4;
		  }
		  else	this.$lineDom[i].childNodes[2].textContent=this.$lineData[i].name;
		}
	},
	//重新SettingsConnect的样式 newType= "sl":Line, "lr":Middle Moveable Lines, "tb":Middler moving up and down
	setLineType:function(id,newType,M){
		if(!newType||newType==null||newType==""||newType==this.$lineData[id].type)	return false;
		if(this.onLineSetType!=null&&!this.onLineSetType(id,newType))	return;
		if(this.$undoStack){
			var paras=[id,this.$lineData[id].type,this.$lineData[id].M];
			this.pushOper("setLineType",paras);
		}
		var from=this.$lineData[id].from;
		var to=this.$lineData[id].to;
		this.$lineData[id].type=newType;
		var res;
		//If是变成折线
		if(newType!="sl"){
		  var res=GooFlow.prototype.calcPolyPoints(this.$nodeData[from],this.$nodeData[to],this.$lineData[id].type,this.$lineData[id].M);
		  if(M){
		  	this.setLineM(id,M,true);
		  }else{
		  	this.setLineM(id,this.getMValue(this.$nodeData[from],this.$nodeData[to],newType),true);
		  }
		}
		//If是变回Line
		else{
		  delete this.$lineData[id].M;
		  this.$lineMove.hide().removeData("type").removeData("tid");
		  res=GooFlow.prototype.calcStartEnd(this.$nodeData[from],this.$nodeData[to]);
		  if(!res)	return;
		  this.$draw.removeChild(this.$lineDom[id]);
		  this.$lineDom[id]=GooFlow.prototype.drawLine(id,res.start,res.end,this.$lineData[id].marked);
		  this.$draw.appendChild(this.$lineDom[id]);
		  if(GooFlow.prototype.useSVG==""){
		  	this.$lineDom[id].childNodes[1].innerHTML=this.$lineData[id].name;
			this.$lineDom[id].childNodes[1].style.left=
			((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[id].childNodes[1].offsetWidth)/2+4;
		  }
		  else
			this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
		}
		if(this.$focus==id){
			this.focusItem(id);
		}
		if(this.$editable){
			this.$lineData[id].alt=true;
		}
	},
	//Settings折线中段的XCoordinates值（When moving left or right）或YCoordinates值（When moving up or down）
	setLineM:function(id,M,noStack){
		if(!this.$lineData[id]||M<0||!this.$lineData[id].type||this.$lineData[id].type=="sl")	return false;
		if(this.onLineMove!=null&&!this.onLineMove(id,M))	return false;
		if(this.$undoStack&&!noStack){
			var paras=[id,this.$lineData[id].M];
			this.pushOper("setLineM",paras);
		}
		var from=this.$lineData[id].from;
		var to=this.$lineData[id].to;
		this.$lineData[id].M=M;
		var ps=GooFlow.prototype.calcPolyPoints(this.$nodeData[from],this.$nodeData[to],this.$lineData[id].type,this.$lineData[id].M);
		this.$draw.removeChild(this.$lineDom[id]);
		this.$lineDom[id]=GooFlow.prototype.drawPoly(id,ps.start,ps.m1,ps.m2,ps.end,this.$lineData[id].marked);
		this.$draw.appendChild(this.$lineDom[id]);
		if(GooFlow.prototype.useSVG==""){
			this.$lineDom[id].childNodes[1].innerHTML=this.$lineData[id].name;
			var Min=(ps.start[0]>ps.end[0]? ps.end[0]:ps.start[0]);
			if(Min>ps.m2[0])	Min=ps.m2[0];
			if(Min>ps.m1[0])	Min=ps.m1[0];
			this.$lineDom[id].childNodes[1].style.left = (ps.m2[0]+ps.m1[0])/2-Min-this.$lineDom[id].childNodes[1].offsetWidth/2+4;
			Min=(ps.start[1]>ps.end[1]? ps.end[1]:ps.start[1]);
			if(Min>ps.m2[1])	Min=ps.m2[1];
			if(Min>ps.m1[1])	Min=ps.m1[1];
			this.$lineDom[id].childNodes[1].style.top = (ps.m2[1]+ps.m1[1])/2-Min-this.$lineDom[id].childNodes[1].offsetHeight/2-4;
		}
		else	this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
		if(this.$editable){
			this.$lineData[id].alt=true;
		}
	},
	//DeleteConvert Lines
	delLine:function(id,trigger){
		if(!this.$lineData[id])	return;
		if(false!=trigger && this.onItemDel!=null&&!this.onItemDel(id,"node"))	return;
		if(this.$undoStack){
			var paras=[id,this.$lineData[id]];
			this.pushOper("addLine",paras);
		}
		this.$draw.removeChild(this.$lineDom[id]);
		delete this.$lineData[id];
		delete this.$lineDom[id];
		if(this.$focus==id)	this.$focus="";
		--this.$lineCount;
		if(this.$editable){
			//在回退新增Operation时,IfNodesID以this.$id+"_line_"Start,则表示为本次编辑时新Add的Nodes,这些Nodes的Delete不用Add到$deletedItem中
			if(id.indexOf(this.$id+"_line_")<0)
			this.$deletedItem[id]="line";
			this.$mpFrom.hide().removeData("p");
			this.$mpTo.hide().removeData("p");
		}
		if(this.$lineOper){ 
			this.$lineOper.hide().removeData("tid");
		}
	},
	//变更Connect两个端点所连的Node
	//Parameters：Change the connection to the peerID，新的Start NodeID、新的End NodeID；IfStart/End NodeIDIt\'s coming innullOr..""，indicates that the original endpoint remains unchanged
	moveLinePoints:function(lineId, newStart, newEnd, noStack){
		if(newStart==newEnd)	return;
		if(!lineId||!this.$lineData[lineId])	return;
		if(newStart==null||newStart=="")
			newStart=this.$lineData[lineId].from;
		if(newEnd==null||newEnd=="")
			newEnd=this.$lineData[lineId].to;

		//避免两个Nodes间不能有一条以上同向接Connect
		for(var k in this.$lineData){
			if((newStart==this.$lineData[k].from&&newEnd==this.$lineData[k].to))
				return;
		}
		if(this.onLinePointMove!=null&&!this.onLinePointMove(id,newStart,newEnd))	return;
		if(this.$undoStack&&!noStack){
			var paras=[lineId,this.$lineData[lineId].from,this.$lineData[lineId].to];
			this.pushOper("moveLinePoints",paras);
		}
		if(newStart!=null&&newStart!=""){
			this.$lineData[lineId].from=newStart;
		}
		if(newEnd!=null&&newEnd!=""){
			this.$lineData[lineId].to=newEnd;
		}
		//重建Convert Lines
		this.$draw.removeChild(this.$lineDom[lineId]);
		this.addLineDom(lineId,this.$lineData[lineId]);
		if(this.$editable){
			this.$lineData[lineId].alt=true;
		}
	},
	
	//Colour/取消标注一个Node或Convert Lines，Progress often used to show focus or process。
	//This is useless in editing mode,But it\'s very useful in pure browsing，Practical application to track progress of process。
	markItem:function(id,type,mark){
		if(type=="node"){
			if(!this.$nodeData[id])	return;
			if(this.onItemMark!=null&&!this.onItemMark(id,"node",mark))	return;
			this.$nodeData[id].marked=mark||false;
			if(mark){
				this.$nodeDom[id].addClass("item_mark").css("border-color",GooFlow.prototype.color.mark);
			}
			else{
				this.$nodeDom[id].removeClass("item_mark");
				if(id!=this.$focus) this.$nodeDom[id].css("border-color","transparent");
			}
			
		}else if(type=="line"){
			if(!this.$lineData[id])	return;
			if(this.onItemMark!=null&&!this.onItemMark(id,"line",mark))	return;
			this.$lineData[id].marked=mark||false;
			if(GooFlow.prototype.useSVG!=""){
				if(mark){
					this.$lineDom[id].childNodes[1].setAttribute("stroke",GooFlow.prototype.color.mark||"#ff8800");
					this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow2)");
                    this.$lineDom[id].childNodes[1].setAttribute("stroke-width",2.4);
				}else{
					this.$lineDom[id].childNodes[1].setAttribute("stroke",GooFlow.prototype.color.line||"#3892D3");
					this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow1)");
                    this.$lineDom[id].childNodes[1].setAttribute("stroke-width",1.4);
				}
			}else{
				if(mark){
                    this.$lineDom[id].strokeColor=GooFlow.prototype.color.mark||"#ff8800";
                    this.$lineDom[id].strokeWeight="2.4";
				}
				else{
                    this.$lineDom[id].strokeColor=GooFlow.prototype.color.line||"#3892D3";
                    this.$lineDom[id].strokeWeight="1.2";
				}
			}
		}
		if(this.$undoStatck){
			var paras=[id,type,!mark];
			this.pushOper("markItem",paras);
		}
	},
	////////////////////////以下为区域Group BlocksOperation
	moveArea:function(id,left,top){
		if(!this.$areaData[id])	return;
		if(this.onItemMove!=null&&!this.onItemMove(id,"area",left,top))	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].left,this.$areaData[id].top];
			this.pushOper("moveNode",paras);
		}
		if(left<0)	left=0;
		if(top<0)	top=0;
		$("#"+id).css({left:left+"px",top:top+"px"});
		this.$areaData[id].left=left;
		this.$areaData[id].top=top;
		if(this.$editable){
			this.$areaData[id].alt=true;
		}
	},
	//Delete区域分组
	delArea:function(id, trigger){
		if(!this.$areaData[id])	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id]];
			this.pushOper("addArea",paras);
		}
		if(false!=trigger && this.onItemDel!=null&&!this.onItemDel(id,"node"))	return;
		delete this.$areaData[id];
		this.$areaDom[id].remove();
		delete this.$areaDom[id];
		--this.$areaCount;
		if(this.$editable){
			//在回退新增Operation时,IfNodesID以this.$id+"_area_"Start,则表示为本次编辑时新Add的Nodes,这些Nodes的Delete不用Add到$deletedItem中
			if(id.indexOf(this.$id+"_area_")<0)
			this.$deletedItem[id]="area";
		}
	},
	//Settings区域分组的颜色
	setAreaColor:function(id,color){
		if(!this.$areaData[id])	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].color];
			this.pushOper("setAreaColor",paras);
		}
		if(color=="red"||color=="yellow"||color=="blue"||color=="green"){
			this.$areaDom[id].removeClass("area_"+this.$areaData[id].color).addClass("area_"+color);
			this.$areaData[id].color=color;
		}
		if(this.$editable){
			this.$areaData[id].alt=true;
		}
	},
	//Settings区域分块的尺寸
	resizeArea:function(id,width,height){
		if(!this.$areaData[id])	return;
		if(this.onItemResize!=null&&!this.onItemResize(id,"area",width,height))	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].width,this.$areaData[id].height];
			this.pushOper("resizeArea",paras);
		}

		this.$areaDom[id].children(".bg").css({width:width+"px",height:height+"px"});
		//width=this.$areaDom[id].outerWidth();
		//height=this.$areaDom[id].outerHeight();
		//this.$areaDom[id].children("bg").css({width:width+"px",height:height+"px"});
		this.$areaData[id].width=width;
		this.$areaData[id].height=height;
		if(this.$editable){
			this.$areaData[id].alt=true;
		}
	},
	addArea:function(id,json){
		if(this.onItemAdd!=null&&!this.onItemAdd(id,"area",json))return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delArea",[id]);
		}
		this.$areaDom[id]=$("<div id='"+id+"' class='GooFlow_area area_"+json.color+"' style='top:"+json.top+"px;left:"+json.left+"px'><div class='bg' style='width:"+(json.width)+"px;height:"+(json.height)+"px'></div>"
		+"<label>"+json.name+"</label><i></i><div><div class='rs_bottom'></div><div class='rs_right'></div><div class='rs_rb'></div><div class='rs_close'></div></div></div>");
		this.$areaData[id]=json;
		this.$group.append(this.$areaDom[id]);
		if(this.$nowType!="group")	this.$areaDom[id].children("div:eq(1)").css("display","none");
		++this.$areaCount;
		if(this.$editable){
			this.$areaData[id].alt=true;
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退DeleteOperation时,去掉该Elements的Delete记录
		}
	},
	//重构整个Flowchart设计器的宽高
	reinitSize:function(width,height){
		var w=(width||800);
		var h=(height||500);
		this.$bgDiv.css({height:h+"px",width:w+"px"});
		var headHeight=0,hack=8;
		if(this.$head!=null){
			headHeight=26;
			hack=5;
		}
		if(this.$tool!=null){
			this.$tool.css({height:h-headHeight-hack+"px"});
			w-=31;
		}
		w-=9;
		h=h-headHeight-(this.$head!=null? 5:8);
		this.$workArea.parent().css({height:h+"px",width:w+"px"});
		
		if(this.$workArea.width()>w){
			w=this.$workArea.width();
		}
		if(this.$workArea.height()>h){
			h=this.$workArea.height();
		}
		
		this.$workArea.css({height:h+"px",width:w+"px"});
		if(GooFlow.prototype.useSVG==""){
			this.$draw.coordsize = w+","+h;
		}
		this.$draw.style.width = w + "px";
		this.$draw.style.height = +h + "px";
		if(this.$group!=null){
			this.$group.css({height:h+"px",width:w+"px"});
		}
	}
}
GooFlow.prototype.color={};
//将此类的构造函数Add至JQUERYObject
jQuery.extend({
	createGooFlow:function(bgDiv,property){
		return new GooFlow(bgDiv,property);
	}
});