/*This series framework,Some用得上的小FunctionsFunctions,SomeUI必须Use到它们,Users can use it alone*/

//Get oneDIV的绝对Coordinates的FunctionsFunctions,Even if it\'s not absolute,I can get it
function getElCoordinate(dom) {
  var t = dom.offsetTop;
  var l = dom.offsetLeft;
  dom=dom.offsetParent;
  while (dom) {
    t += dom.offsetTop;
    l += dom.offsetLeft;
	dom=dom.offsetParent;
  }; return {
    top: t,
    left: l
  };
}
//Compatible with various browsers,Get Mouse Real Location
function mousePosition(ev){
	if(!ev) ev=window.event;
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
    };
}
//给DATE类Add一个Format化OutputString的Methodology
Date.prototype.format = function(format)   
{   
   var o = {   
      "M+" : this.getMonth()+1, //month  
      "d+" : this.getDate(),    //day  
      "h+" : this.getHours(),   //hour  
      "m+" : this.getMinutes(), //minute  
      "s+" : this.getSeconds(), //second  ‘
	  //quarter  
      "q+" : Math.floor((this.getMonth()+3)/3), 
      "S" : this.getMilliseconds() //millisecond  
   }   
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)if(new RegExp("("+ k +")").test(format))   
      format = format.replace(RegExp.$1,   
        RegExp.$1.length==1 ? o[k] :    
          ("00"+ o[k]).substr((""+ o[k]).length));   
    return format;   
}
//JS]Based onFormatCharacter串分析Date（MM与Auto匹配两位的09And one9）
//alert(getDateFromFormat(sDate,sFormat));
function getDateFromFormat(dateString,formatString){
	var regDate = /\d+/g;
	var regFormat = /[YyMmdHhSs]+/g;
	var dateMatches = dateString.match(regDate);
	var formatmatches = formatString.match(regFormat);
	var date = new Date();
	for(var i=0;i<dateMatches.length;i++){
		switch(formatmatches[i].substring(0,1)){
			case 'Y':
			case 'y':
				date.setFullYear(parseInt(dateMatches[i]));break;
			case 'M':
				date.setMonth(parseInt(dateMatches[i])-1);break;
			case 'd':
				date.setDate(parseInt(dateMatches[i]));break;
			case 'H':
			case 'h':
				date.setHours(parseInt(dateMatches[i]));break;
			case 'm':
				date.setMinutes(parseInt(dateMatches[i]));break;
			case 's':
				date.setSeconds(parseInt(dateMatches[i]));break;
		}
	}
	return date;
}
//Currency analysis into floating points
//alert(parseCurrency("￥1,900,000.12"));
function parseCurrency(currentString){
	var regParser = /[\d\.]+/g;
	var matches = currentString.match(regParser);
	var result = '';
	var dot = false;
	for(var i=0;i<matches.length;i++){
		var temp = matches[i];
		if(temp =='.'){
			if(dot) continue;
		}
		result += temp;
	}
	return parseFloat(result);
}

//将#XXXXXXColourFormatConvert为RGBFormat，And add transparency
function brgba(hex, opacity) {
    if( ! /#?\d+/g.test(hex) ) return hex; //If是“red”FormatColours值，Do not convert。//Correct error，Read the restPSContents
    var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
        r = parseInt(h.substring(0,2),16),
        g = parseInt(h.substring(2,4),16),
        b = parseInt(h.substring(4,6),16),
        a = opacity;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}