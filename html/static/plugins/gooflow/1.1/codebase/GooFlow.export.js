/*
 * 专门负责ExportFlowchartDocumentation并让用户下载的扩展包方法，Need to rely on:
 * ../plugin/promise.min.js
 * ../plugin/html2canvas.min.js
 * ../plugin/canvg.js (♪ When must be ♪IE11及以下Version的IE浏览器上Run时)
 */
GooFlow.prototype.exportDiagram=function(fileName) {
    //0.Add临时Elements
	var width = this.$workArea.width();
	var height = this.$workArea.height();
    $("body").append('<div id="demo_export" style="position:absolute;top:0;left:0;z-index:-1;width:0px;height:0px;overflow:hidden">'
        +'<div style="color:#15428B;position:absolute;left:0;right:0;width:'+width+'px;height:'+height+'px;overflow:hidden;float:none;" class="GooFlow GooFlow_work"></div>'
        +'</div>');

    //1.先COPYNodes和Blocks的内容
    var inner = $("#demo").find(".GooFlow_work_inner");
    var divCanvas = $("#demo_export").children("div:eq(0)");
    //CopyNodes的内容
    inner.children("div").each(function(i){
        var item=$(this);
        if(item.hasClass("GooFlow_item")){
            item.clone().removeAttr("id").css("position","absolute").appendTo(divCanvas);
        }else if(item.hasClass("GooFlow_work_group")){
            item.clone().removeAttr("id").css("position","absolute")
                .attr("xmlns",'http://www.w3.org/1999/xhtml').appendTo(divCanvas);
        }
    });
    html2canvas(divCanvas[0], {
        allowTaint: false, taintTest: false,
        onrendered: function(canvas) {
            //2.In return mode，COPYConnect Content
            //Make a temporaryIMAGE
            var context = canvas.getContext('2d');//Get the canvas2d绘图Context
            context.save();
            var strSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1160" height="507">'
                +'<defs><style type="text/css">text{font-size:14px;line-height:1.42857143;'
                +'font-family:"Microsoft Yahei", "Helvetica Neue", Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, Arial, sans-serif;'
                +'}</style></defs>' + window.$("<svg>").append(window.$("#draw_demo").clone()).html() +'</svg>'; //COPYConnect Content
            var image = null;
            if(!!window.ActiveXObject || "ActiveXObject" in window){//AsIE11及以下Version浏览器时，UseCanvgThird party tool
                image = document.createElement('canvas');
                canvg(image, strSvg);
            }else{
                var image = new Image();
                image.src='data:image/svg+xml,'+ encodeURIComponent(strSvg);
            }
            var tempFunc=function(){
                context.drawImage(image, 0, 0);
                //Clear不需要的临时DOM
                $("#demo_export").empty().remove();
                try{
                    var blob = canvas.msToBlob();
                    //alert("blob2");
                    navigator.msSaveBlob(blob, "prettyImage.png");
                }
                catch(e){
                    //Generate a download link and click
                    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                    a.href = canvas.toDataURL('image/png');  //将画布内的信息Export为png图片Data
                    a.download = fileName+".png";  //Set Download Name
                    document.body.appendChild(a);
                    a.click(); //Click to trigger download
                    document.body.removeChild(a);
                }
            }

            if(image.complete|| (!!window.ActiveXObject || "ActiveXObject" in window)) { // If图片已经存在于浏览器缓存，Direct Callback Function
                //console.log("image.complete|| IE11");
                tempFunc();
                return;// Direct Return，No more handlingonloadEvents
            }
            image.onload=function(){
                //console.log("image.onload");
                tempFunc();
            };
        },
        width: width,
        height: height
    });
}
