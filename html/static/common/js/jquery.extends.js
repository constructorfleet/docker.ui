console.log("jquery.extends.js")

jquery = $;

function debug(info) {

	if (window.APP_DEBUG || window.APP_DEBUG.toUpperCase() == 'TRUE') {
		if (window.console) {
			window.console.log(info);
		}
	}
}

String.prototype.split2 = function(delimit){

	let result = this;
	let arrs = result.split(delimit||" ");

	let rtn = [];

	$.each(arrs, function (idx, v) {
		if(!$.extends.isEmpty(v)){
			rtn.push(v);
		}
	});

	return rtn;
}

String.prototype.jsEncode = function() {
	let result = this;

	result = result.replace('\\', '\\\\');
	result = result.replace('\'', '\\\'');
	result = result.replace('\"', '\\\"')

	return result;
}

String.prototype.htmlEncode = function() {
	let result = this;

	result = result.replace('\'', '&apos;');
	result = result.replace('\"', '&quot;')

	return result;
}

String.prototype.Capital = function() {
	let result = $.extends.isEmpty(this, "").trim();

	if($.extends.isEmpty(result))
		return result;

	return result.substring(0,1).toUpperCase() + result.substring(1);
}

String.prototype.htmlEncodeBracket = function() {
	let result = this;

	result = result.replace('<', '&lt;');
	result = result.replace('>', '&gt;');


	return result;
}


String.prototype.format2 = function(args) {
	let result = this;

	result = result.replace(/\{(.+?)\}/g, function(word, key){
		if(args&&args[key])
			return args[key];
		else
			return '';
	});

	return result;
}

String.prototype.UpperCaseFirst = function(){
	let result = this;

	if(result.length<=1)
		return result.toUpperCase();

	return result.substring(0,1).toUpperCase() + result.substring(1);
}

String.prototype.LowerCaseFirst = function(){
	let result = this;

	if(result.length<=1)
		return result.toLowerCase();

	return result.substring(0,1).toLowerCase() + result.substring(1);
}

function byte2UInt8Array(bytes){
	let bStr = bytes;
	let n = bStr.length;
	let u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bStr[n];
	}

	return u8arr;
}

String.prototype.UInt8Array = function(){
	let bStr = this.bytes2();
	let n = bStr.length;
	let u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bStr[n];
	}

	return u8arr;
}

String.prototype.base642UInt8Array = function(){
	let data = this;
	let bStr = atob(data);
	let n = bStr.length;
	let u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bStr.charCodeAt(n);
	}

	return u8arr;
}

String.prototype.replaceAll  = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}

String.prototype.format = function(args) {
    let result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (let key in args) {
                if (args[key] != undefined) {
                    let reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }else{
					let reg = new RegExp("({!" + key + "})", "g");
                    result = result.replace(reg, "");
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//Here在索引Greater than9时会有Problem，Thank you何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

String.prototype.inArray = function(list){
	let result = this;
	let rtn = -1;
	$.each(list, function (idx, v) {
		if(result == v){
			rtn = idx;
			return false;
		}
	});

	return rtn;
}

String.prototype.inPrefixArray = function(list){
	let rtn = -1;
	let result = this;
	$.each(list, function (idx, v) {
		if(result.indexOf(v)>=0){
			rtn = idx;
			return false;
		}
	});

	return rtn;
}

String.prototype.inArrayWithPrefix = function(list){
	let rtn = -1;
	let result = this;
	$.each(list, function (idx, v) {
		if(v.indexOf(result)>=0){
			rtn = idx;
			return false;
		}
	});

	return rtn;
}

String.prototype.bytes2 = function(){
	let str = this;
	let bytes = new Array();
	let len,c;
	len = str.length;
	for(let i = 0; i < len; i++){
		c = str.charCodeAt(i);
		if(c >= 0x010000 && c <= 0x10FFFF){
			bytes.push(((c >> 18) & 0x07) | 0xF0);
			bytes.push(((c >> 12) & 0x3F) | 0x80);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		}else if(c >= 0x000800 && c <= 0x00FFFF){
			bytes.push(((c >> 12) & 0x0F) | 0xE0);
			bytes.push(((c >> 6) & 0x3F) | 0x80);
			bytes.push((c & 0x3F) | 0x80);
		}else if(c >= 0x000080 && c <= 0x0007FF){
			bytes.push(((c >> 6) & 0x1F) | 0xC0);
			bytes.push((c & 0x3F) | 0x80);
		}else{
			bytes.push(c & 0xFF);
		}
	}
	return bytes;
}

/**
 *@description:将stringToUTF-8Formatsigned charBytesArray
 *
 */
String.prototype.bytes = function(){
	let str = this;
	let bytes = new Array();
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		let s = parseInt(c).toString(2);
		if(c >= parseInt("000080",16) && c <= parseInt("0007FF",16)){
			let af = "";
			for(let j = 0; j < (11 - s.length); j++){
				af += "0";
			}
			af += s;
			let n1 = parseInt("110" + af.substring(0,5),2);
			let n2 = parseInt("110" + af.substring(5),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			bytes.push(n1);
			bytes.push(n2);
		}else if(c >= parseInt("000800",16) && c <= parseInt("00FFFF",16)){
			let af = "";
			for(let j = 0; j < (16 - s.length); j++){
				af += "0";
			}
			af += s;
			let n1 = parseInt("1110" + af.substring(0,4),2);
			let n2 = parseInt("10" + af.substring(4,10),2);
			let n3 = parseInt("10" + af.substring(10),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			if(n3 > 127) n3 -= 256;
			bytes.push(n1);
			bytes.push(n2);
			bytes.push(n3);
		}else if(c >= parseInt("010000",16) && c <= parseInt("10FFFF",16)){
			let af = "";
			for(let j = 0; j < (21 - s.length); j++){
				af += "0";
			}
			af += s;
			let n1 = parseInt("11110" + af.substring(0,3),2);
			let n2 = parseInt("10" + af.substring(3,9),2);
			let n3 = parseInt("10" + af.substring(9,15),2);
			let n4 = parseInt("10" + af.substring(15),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			if(n3 > 127) n3 -= 256;
			if(n4 > 127) n4 -= 256;
			bytes.push(n1);
			bytes.push(n2);
			bytes.push(n3);
			bytes.push(n4);
		}else{
			bytes.push(c & 0xff);
		}
	}
	return bytes;
}

$.fn.serializeJson = function () {
    var serializeObj = {};
    $(this.serializeArray()).each(function () {
        serializeObj[this.name] = this.value;
    });
    return serializeObj;
};

$.inArray3 = function( elem, array, field ) {
	var len;

	if ( array ) {
		len = array.length;
		for ( var i=0 ; i < len; i++ ) {
			// Skip accessing in sparse arrays 这么Decision主要是考虑ArraySubscript不连续SituationAttention学习这种Modalities i in arry 的DecisionModalities
			if ( i in array && array[ i ][field] == elem ) {
				return i;
			}
		}
	}

	return -1;
};

$.inArray4 = function( elem, array, comparorfn ) {
	var len;

	if ( array && comparorfn) {
		len = array.length;
		for ( var i=0 ; i < len; i++ ) {
			// Skip accessing in sparse arrays 这么Decision主要是考虑ArraySubscript不连续SituationAttention学习这种Modalities i in arry 的DecisionModalities
			if ( i in array && comparorfn(array[ i ], elem) == true ) {
				return i;
			}
		}
	}

	return -1;
}

$.inArray2 = function( elem, array, i ) {
	var len;

	if ( array ) {

		len = array.length;
		/*
			Attention该条语句是给iGranted，If you look at it, it\'s confusing
			首先DecisioniValue，i ? （i < 0 ? Math.max( 0, len + i ) : i ）: 0 If i 未Definitions Or..i为0 则 把0Granted toi
			Ifi Definitions了And..不为0 Implementation i < 0 ? Math.max( 0, len + i ) : i
			Ifi As Negative，AddAnd..其AddArrayLength，且其值I can\'tless than0
		*/
		i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

		for ( ; i < len; i++ ) {
			// Skip accessing in sparse arrays 这么Decision主要是考虑ArraySubscript不连续SituationAttention学习这种Modalities i in arry 的DecisionModalities
			if ( i in array && array[ i ] == elem ) {
				return i;
			}
		}
	}

	return -1;
};

$.fn.isNull = function(){
	return this.length<1;
}

$.getValue = function(obj, field, dv){
    if($.extends.isEmpty(obj))
        return dv;

    if($.extends.isEmpty(field))
            return dv;

    var fields = field.split(".");

    for(var idx = 0 ; idx < fields.length; idx ++){
        var fieldName = fields[idx];

        if($.extends.isEmpty(fieldName))
                return dv;

        obj = obj[fieldName];

        if($.extends.isEmpty(obj))
               return dv;
    }

    if($.extends.isEmpty(obj))
            return dv;

    return obj;
}

$.fn.getoptions = function(){
	var f = $['trim'](this['attr']('data-options'));
	var e = null;
	f && (f['substring'](0, 1) != '{' && (f = '{' + f + '}'),
            e = new Function('return ' + f)());

	return e||{};
}

$.extends = {};

function copyToClipboard(textToCopy, okFn, errFn) {
	// navigator clipboard Yeshttps等安全Context
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard 向剪贴板写Text
		return navigator.clipboard.writeText(textToCopy).then(okFn, errFn);
	} else {
		// Createtext area
		let textArea = document.createElement("textarea");
		textArea.value = textToCopy;
		// 使text areaNo, I\'m notviewport，同时Settings不可见
		textArea.style.position = "absolute";
		textArea.style.opacity = 0;
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		return new Promise((res, rej) => {
			// ImplementationCopyCommand并移除Text框
			document.execCommand('copy') ? res() : rej();
			textArea.remove();
		}).then(okFn, errFn);
	}
}

$.extends.copyToClipBoard = function(txt, okFn, errFn){
	//navigator.clipboard.writeText(txt).then(okFn, errFn)
	okFn = okFn||function(){};
	errFn = errFn||function(){};
	copyToClipboard(txt, okFn, errFn)
}

$.extends.toExcelHtml = function(title, options){
	var data = ['<table border="1" rull="all" style="border-collapse:collapse">'];
	var trStyle = 'height:32px';
    var tdStyle0 = 'padding:0 4px;white-space:nowrap;min-width:0px!important;';

    var columncount = options.columncount;
    var rows = options.data;

    $.each(rows, function(idx, row){

    	data.push('<tr style="'+trStyle+'">');

    	for(var i = 0; i < columncount; i ++){
    		var col = row['C_'+i];
    		if(col){

    		    var rowspantxt = "";
    			var colspantxt = "";

    			if(col.rowspan){
        			rowspantxt = " rowspan="+col.rowspan + " ";
        		}

        		if(col.colspan){
        			colspantxt = " colspan="+col.colspan + " ";
        		}

        		var tdStyle = tdStyle0 ;

        		if($.extends.number(col.width, 0) > 0)
        			tdStyle += ';width:'+col.width+'px;';
        		else
        			tdStyle += ';width:auto;';

        		if($.extends.isEmpty(col.valign)){
        			tdStyle += 'vertical-align:middle;';
        		}else{
        			tdStyle += 'vertical-align:'+col.valign+';';
        		}

        		if($.extends.isEmpty(col.align)){
        			tdStyle += 'text-align:center;';
        		}else{
        			tdStyle += 'text-align:'+col.align+';';
        		}

        		data.push('<td style="'+tdStyle+'"' + rowspantxt + colspantxt + '>'+col.value+'</td>');

    		}
    	}

    	data.push('</tr>');

    });

    data.push('</table>');

    if(title){
    	//data.splice(1, 0, '<tr><th colspan="' + newFieldsArray.length + '" style="'+tdStyle0+'"></th></tr>' + '<tr style="height:48px;"><th colspan="' + newFieldsArray.length + '" style="'+tdStyle0+'">'+htmltitle+'</th></tr>' + '<tr><th colspan="' + newFieldsArray.length + '" style="'+tdStyle0+'"></th></tr>');
    	data.splice(1, 0, '<tr><th colspan="' + columncount + '" style="'+tdStyle0+'"></th></tr>' + '<tr style="height:48px;"><th colspan="' + columncount + '" style="'+tdStyle0+'">'+title+'</th></tr>');
    }

    return data.join('\r\n');

}

$.extends.printExcel = function(title, options){
	var title = title;

    var newWindow = window.open('', '', 'width=800, height=500');
    var document = newWindow.document.open();
    var content =
        '<!doctype html>' +
        '<html>' +
        '<head>' +
        '<meta charset="utf-8">' +
        '<title>'+title+'</title>' +
        '</head>' +
        '<body>' + $.extends.toExcelHtml(title, options) + '</body>' +
        '</html>';

    document.write(content);
    document.close();
    newWindow.print();
    newWindow.close();
}

$.extends.sleep = function (delay) {
	  var start = (new Date()).getTime();
	  while ((new Date()).getTime() - start < delay) {
	    continue;
	  }
}

$.extends.getRandomNum = function(a, b) {
    if(arguments.length==1)
        return parseInt(Math.random() * a + 1);
    else if(arguments.length>1)
        return parseInt(Math.random() * (b - a + 1) + a);
    else
        return $.extends.getRandomNum(1e5, 999999);
}

$.extends.isEvent = function(evt){
	if(!evt)
		return false;

	if(typeof(evt) == 'object')
	{
		if(evt.target && evt.clientX && evt.clientY)
			return true;
	}

	return false;
}

$.extends.findEvent = function(){

	var c = arguments.callee;
	while(true){
		if(c.caller){
			if($.extends.isEvent(c.caller.arguments[0]))
			{
				return c.caller.arguments[0];
			}else{
				c = c.caller;
			}
		}else{
			c = null;
			break;
		}
	}
}

$.extends.getCallerTarget = function(){
	var e = $.extends.findEvent();

	if(e){
		return e.target;
	}

	return null;
}

$.extends.stopPropagation = function(){
	var e = $.extends.findEvent();

	if(e){
		e.stopPropagation();
		e.preventDefault();
	}
}

$.extends.cloneArray = function(array, size, field){
	var rtn = [];

	array = array || [];

	var s = array.length;

	size = (size > s)?size:s;

	for(var idx = 0 ; idx < size; idx ++){
		if(idx < s){
			if(field){
				rtn.push(array[idx][field]);
			}else{
				rtn.push(array[idx]);
			}
		}
		else{
			if(field){
				rtn.push(undefined);
			}else{
				rtn.push({});
			}
		}
	}

	return rtn;
}

$.extends.arrayToTree = function (data, id, pid) {

        if (!data || !data.length) return [];
        var targetData = [];                    //StorageData的Containers(Back)
        var records = {};
        var itemLength = data.length;           //DataGather的个数
        for (var i = 0; i < itemLength; i++) {
            var o = data[i];
            records[o[id]] = o;
        }
        for (var i = 0; i < itemLength; i++) {
            var currentData = data[i];
            var parentData = records[currentData[pid]];
            if (!parentData) {
                targetData.push(currentData);
                continue;
            }
            parentData.children = parentData.children || [];
            parentData.children.push(currentData);
        }
        return targetData;
    }

$.extends.htmlencode = function(str){
	if(!str)
		return '';

    var s = "";
    if(str.length == 0) return "";
    str = str+'';
    s = str.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    s = s.replace(/ /g,"&nbsp;");
    s = s.replace(/\'/g,"&#39;");
    s = s.replace(/\"/g,"&quot;");
    return s;

	//return $('<div/>').text(html).html();
}

$.extends.htmldecode = function(str){
	if(!str)
		return '';
    var s = "";
    if(str.length == 0) return "";
    str = str+'';
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s;
	//return $('<div/>').html(html).text();
}

$.extends.number = function(obj, defaultv){
	if(defaultv==null)
		defaultv = 0;

	if($.extends.isEmpty(obj))
		return Number(defaultv);

	obj = Number(obj);

	if(isNaN(obj))
		return Number(defaultv);

	return obj;
}

$.extends.maths = {
	abs : function (n){
		return Math.abs(n);
	},
	round:function(number,fractiondigits){

		if(fractiondigits==0)
		{

		}else{
			fractiondigits = fractiondigits||0;

			if(fractiondigits<0)
				fractiondigits = 0;
		}

		if(isNaN(number)){
			return Number.NaN;
		}
	    with(Math){
	        var a = round(number*pow(10,fractiondigits))/pow(10,fractiondigits);

	        return $.extends.maths.toFixed(a, fractiondigits);
	    }
	},
	toFixed:function(number, fractiondigits)
	{
		if(fractiondigits==0)
		{

		}else{
			fractiondigits = fractiondigits||2;

			if(fractiondigits<0)
				fractiondigits = 2;
		}

		if($.extends.isEmpty(number))
			return '';

		var numbera = (number+'').split('.');

		if(fractiondigits==0)
			return numbera[0];

		if(numbera.length==1)
			numbera.push('');

		var decimal = numbera[1];//Access小数Part

		var a = fractiondigits - decimal.length;

		if(a>=0){
			for(var j=0;j<a;j++){
				decimal += '0';
			}
		}else{
			decimal = decimal.substr(0, fractiondigits);
		}

		return numbera[0] + '.' + decimal;
		/*with(Math){
			return (parseInt(number*pow(10,fractiondigits) + 0.5)/pow(10,fractiondigits));
		}*/
	}
};

$.extends.batchclone =function(objlist, field){
	if(objlist){

		var c = Array.prototype.slice.call(arguments).slice(1);

		var rtn = [];

		$.each(objlist, function(i, obj){
			rtn.push($.extends.clone.apply(this, [obj].concat(c)));
		});

		return rtn;

	}

	return [];
}


$.extends.clone =function(obj, field){
	if(arguments.length==1)
		return $.extend(1, {}, obj);
	else if(arguments.length>1){
		var rtn = {};

		for(var i = 1; i < arguments.length; i ++){
			var fieldname = arguments[i];
			rtn[fieldname] = obj[fieldname];
		}

		return rtn;
	}

	return null
}

$.extends.isString = function(obj){
	return Object.prototype.toString.call(obj)=='[object String]';
}

$.extends.isEmpty = function(obj, defaultv){
	if(arguments.length > 1){
		try{
			if(obj == null || $.trim(obj)=='' )
				return defaultv;

			if(obj instanceof jQuery && obj.isNull()){
				return defaultv;
			}

			if($.isPlainObject(obj) && $.isEmptyObject(obj)){
				return defaultv;
			}

			return obj;
		}catch (e) {
			return defaultv;
		}
	}else
	{
		if($.isArray(obj)){
			return obj.length == 0;
		}

		if(obj instanceof jQuery){
			return obj.isNull();
		}

		if($.isPlainObject(obj) && $.isEmptyObject(obj)){
			return true;
		}

		if(obj == null || $.trim(obj)=='' )
			return true;

		return false;

	}
}

$.extends.jquery = function(jqueryobj){
	if(jqueryobj instanceof jQuery){
		return jqueryobj;
	}

	if($.extends.isEmpty(jqueryobj)){
		throw '$.extends.jquery I can\'t包装空Object';
	}

	return $(jqueryobj);
}


$.extends.applyIf = function (o, c) {
	if(!o)
	{
		o = {};
	}

    if(o) {
        for(var p in c) {
            if(o[p]===undefined) {
                o[p] = c[p];
            }
        }
    }
    return o;
};

$.extends.apply=function (o, c) {
	if(!o)
	{
		o = {};
	}

    if(o) {
        for(var p in c) {
        	o[p] = c[p];
        }
    }
    return o;
};

$.extends.sum = function(rows, sumfield){
	var total = 0;

	$.each(rows, function(index, row){
		total += $.extends.str2number(row[sumfield], 0);
	});

	return total;
}

$.extends.str2number = function(str, defaultv) {
	var rtn = Number(str);

	if (isNaN(rtn)) {
		if (defaultv!=null)
			return defaultv;
		else
			return rtn;
	} else
		return rtn;
}

//Accesscookie值
$.extends.getcookie = function(name) {
	var cookie = document.cookie;
	var array = cookie.split("; ");
	var n = array.length;
	for ( var i = 0; i < n; i++) {
		var arr = array[i].split("=");
		if (arr[0] == name) {
			return arr[1];
		}
	}
	return "";
}

//Deletecookie
$.extends.deletecookie = function(name) {
	var date = new Date();
	date.setTime(date.getTime() - 1000);
	document.cookie = name + "=''; expires=" + date.toGMTString();
}

//DecisionWhether or notExistenceSpace
$.extends.checkspace = function(string) {
	return string.match(/\s+/);
};

//DecisionIs it汉字
$.extends.ischinese = function(string) {
	return string.match(/[\u4E00-\u9FA5]/g);
};

//DecisionIs itCell phone
$.extends.ismobileno = function(string) {
	return string.match(/^1[34578][0-9]{9}$/);
}

//去除空白Character
$.extends.stripspace = function(string) {
	return string.replace(/\s*/g, "");
};

/*全局Functions************************************************************************************************************/
//jsonOperation
$.extends.json = {
	param2json : function(url){

		if(!$.extends.isEmpty(url)){
			url = url.replace(/\+/g," ");
		}

		if ("object" == typeof url) {
			return url;
		}

		var obj = {};
		var keyvalue = [];
		var key = "",
			value = "";
		if (url.indexOf("?")>=0){
			url = url.substring(url.indexOf("?") + 1, url.length)
		}
		var paraString = url.split("&");
		for (let i =0 ; i<paraString.length; i++) {
			keyvalue = paraString[i].split("=");
			key = keyvalue[0];
			value = decodeURIComponent(keyvalue[1]);
			if(obj.hasOwnProperty(key)){

				let old_obj = obj[key];
				let list = null;

				if(Array.isArray(old_obj)){
					list = old_obj
					list.push(value);
				}else{
					list = [];
					list.push(old_obj);
					list.push(value);
				}

				obj[key] = list;
			}else{
				obj[key] = value;
			}
		}
		return obj;
	},
	"tojsstring":function(object){
		var placeholder = '$$##_DEBUG_##$$';
		var includefn = false;
		var str = JSON.stringify(object, function(key, val) {
			  if (typeof val === 'function') {
				  	includefn = true;
				  	var fnval = val+'';
/*
				  	fnval = fnval.replace(/\r/g,"");
				  	fnval = fnval.replace(/\n/g,"");
				  	fnval = fnval.replace(/\t/g,"");
				  	fnval = fnval.replace(/\"/g,"\\\"");
				  	fnval = fnval.replace(/\'/g,"\\\'");
					*/
				    var fnstr = placeholder + fnval + placeholder;


				    return fnstr;
				  }
				  return val;
				});

		if(includefn){
			str = str.replace("\""+placeholder, "");
			str = str.replace(placeholder+"\"", "");

			str = str.replace(/\\n/g,"\n");
			str = str.replace(/\\r/g,"\r");
			str = str.replace(/\\t/g,"\t");
		}

		return str;
	},
	"tostring" : function(object) {

		return JSON.stringify(object);
		/*
		var string = "{";
		for ( var x in object) {
			string += '"' + x + '":' + object[x];
		}
		string += "}";
		return string;
		*/
	},
	"count" : function(object) {
		var n = 0;
		for ( var x in object) {
			++n;
		}
		return n;
	},
	"toobject" :function(str){
		if($.extends.isString(str))
			return eval("(" + str + ")");
		return str;
	},
	"toobject2" :function(str){  // Solveeval的contextProblem
		if($.extends.isString(str)){
			var Fn = Function;  //一个VariablesPointFunction，Prevention有些前端编译ToolsWrong
			return new Fn('return (' + str +')')();
		}
		return str;
	},
	"evil":function(str){
		if($.extends.isString(str))
			return "(" + str + ")";
		return str;
	}
};

//Settingscookie
$.extends.setcookie = function(name, value, life) {
	var cookie = name + "=" + escape(value);
	if (life > 0) {
		var date = new Date();
		date.setTime(date.getTime() + life * 1000);
		cookie += "; expires=" + date.toGMTString();
	}
	document.cookie = cookie;
};

$.extends.collect = function(source, fn) {
	let rtn = [];
	$.each(source, function(idx, v){
		rtn.push(fn(v))
	});
	return rtn;
}

$.extends.values = function(source, field) {
	let rtn = [];
	$.each(source, function(idx, v){
		rtn.push(v[field])
	});
	return rtn;
}

$.extends.map = function(source, fn) {
	let rtn = {};
	$.each(source, function(idx, v){
		rtn[fn(v,idx)] = v
	});
	return rtn;
}
/*
let date = new Date()
dateFormat("YYYY-mm-dd HH:MM", date)
>>> 2019-06-06 19:45`
*/

Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"Y+": this.getFullYear().toString(),        // 年
		"M+": this.getMonth() + 1, //Month
		"d+": this.getDate(), //日
		"H+": this.getHours(), //Hours
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarterly
		"S": this.getMilliseconds() //milliseconds
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

$.extends.dateFormat = function(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(),        // 年
		"m+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"H+": date.getHours().toString(),           // 时
		"M+": date.getMinutes().toString(),         // 分
		"S+": date.getSeconds().toString()          // 秒
		// 有OtherFormat化Character需求YeahGo onAdd，必须Conversion成Character串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

$.extends.isMobile = {
	Android : function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry : function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows : function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any : function() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this
				.Windows());
	}
};

//身份证号码的AuthenticationRule
$.extends.isIdCardNo=function (num) {
	//if (isNaN(num)) {alert("输入的NopeNumbers！"); return false;}
	var len = num.length, re;
	if (len == 15)
		re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
	else if (len == 18)
		re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
	else {
		//alert("Wrong number of digits entered。");
		return false;
	}
	var a = num.match(re);
	if (a != null) {
		if (len == 15) {
			var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
			var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4]
					&& D.getDate() == a[5];
		} else {
			var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
			var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4]
					&& D.getDate() == a[5];
		}
		if (!B) {
			//alert("ID number entered "+ a[0] +" 里出生Date不对。");
			return false;
		}
	}
	if (!re.test(num)) {
		//alert("身份证最后一位只能是Numbers和Letter。");
		return false;
	}
	return true;
};



$.extends.initExtentValidateRule=function() {
	// Decision整数valueWhether or notequals0
	jQuery.validator.addMethod("isIntEqZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value == 0;
	}, "The integer must be0");

	// Decision整数valueWhether or notGreater than0
	jQuery.validator.addMethod("isIntGtZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value > 0;
	}, "整数必须Greater than0");

	// Decision整数valueWhether or notGreater than或equals0
	jQuery.validator.addMethod("isIntGteZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value >= 0;
	}, "整数必须Greater than或equals0");

	// Decision整数valueWhether or notNot equal to0
	jQuery.validator.addMethod("isIntNEqZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value != 0;
	}, "整数必须Not equal to0");

	// Decision整数valueWhether or notless than0
	jQuery.validator.addMethod("isIntLtZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value < 0;
	}, "整数必须less than0");

	// Decision整数valueWhether or notless than或equals0
	jQuery.validator.addMethod("isIntLteZero", function(value, element) {
		value = parseInt(value);
		return this.optional(element) || value <= 0;
	}, "整数必须less than或equals0");

	// Decision浮点数valueWhether or notequals0
	jQuery.validator.addMethod("isFloatEqZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value == 0;
	}, "Float number must be0");

	// Decision浮点数valueWhether or notGreater than0
	jQuery.validator.addMethod("isFloatGtZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value > 0;
	}, "浮点数必须Greater than0");

	// Decision浮点数valueWhether or notGreater than或equals0
	jQuery.validator.addMethod("isFloatGteZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value >= 0;
	}, "浮点数必须Greater than或equals0");

	// Decision浮点数valueWhether or notNot equal to0
	jQuery.validator.addMethod("isFloatNEqZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value != 0;
	}, "浮点数必须Not equal to0");

	// Decision浮点数valueWhether or notless than0
	jQuery.validator.addMethod("isFloatLtZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value < 0;
	}, "浮点数必须less than0");

	// Decision浮点数valueWhether or notless than或equals0
	jQuery.validator.addMethod("isFloatLteZero", function(value, element) {
		value = parseFloat(value);
		return this.optional(element) || value <= 0;
	}, "浮点数必须less than或equals0");

	// Decision浮点型
	jQuery.validator.addMethod("isFloat", function(value, element) {
		return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
	}, "只能OrganisationNumbers、小数点等Character");

	// Matchinteger
	jQuery.validator.addMethod("isInteger", function(value, element) {
		return this.optional(element)
				|| (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
	}, "Matchinteger");

	// Decision数值Type，Including整数和浮点数
	jQuery.validator.addMethod("isNumber", function(value, element) {
		return this.optional(element) || /^[-\+]?\d+$/.test(value)
				|| /^[-\+]?\d+(\.\d+)?$/.test(value);
	}, "Match数值Type，Including整数和浮点数");

	// Only enter[0-9]Numbers
	jQuery.validator.addMethod("isDigits", function(value, element) {
		return this.optional(element) || /^\d+$/.test(value);
	}, "Only enter0-9Numbers");

	// Decision中文Character
	jQuery.validator.addMethod("isChinese", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
	}, "只能Organisation中文Character。");

	// DecisionEnglishCharacter
	jQuery.validator.addMethod("isEnglish", function(value, element) {
		return this.optional(element) || /^[A-Za-z]+$/.test(value);
	}, "只能OrganisationEnglishCharacter。");

	// Cell phone号码Authentication
	jQuery.validator
			.addMethod(
					"isMobile",
					function(value, element) {
						var length = value.length;
						return this.optional(element)
								|| (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
										.test(value));
					}, "请正确填写您的Cell phone号码。");

	// 电话号码Authentication
	jQuery.validator.addMethod("isPhone", function(value, element) {
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return this.optional(element) || (tel.test(value));
	}, "Please fill in your number correctly。");

	// Call me(Cell phone/Any phone calls)Authentication
	jQuery.validator.addMethod("isTel", function(value, element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return this.optional(element) || tel.test(value)
				|| (length == 11 && mobile.test(value));
	}, "请正确填写您的联系Modalities");

	// Matchqq
	jQuery.validator.addMethod("isQq", function(value, element) {
		return this.optional(element) || /^[1-9]\d{4,12}$/;
	}, "MatchQQ");

	// 邮政EncodedAuthentication
	jQuery.validator.addMethod("isZipCode", function(value, element) {
		var zip = /^[0-9]{6}$/;
		return this.optional(element) || (zip.test(value));
	}, "请正确填写您的邮政Encoded。");

	// MatchPassword，以LetterStart，Length在6-12Between，只能OrganisationCharacter、Numbers和Underline。
	jQuery.validator.addMethod("isPwd", function(value, element) {
		return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
	}, "以LetterStart，Length在6-12Between，只能OrganisationCharacter、Numbers和Underline。");

	// 身份证号码Authentication
	jQuery.validator.addMethod("isIdCardNo", function(value, element) {
		//var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
		return this.optional(element) || $.extends.isIdCardNo(value);
	}, "Please enter the correct ID number码。");

	// IPAddressAuthentication
	jQuery.validator
			.addMethod(
					"ip",
					function(value, element) {
						return this.optional(element)
								|| /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
										.test(value);
					}, "Please fill it out correctlyIPAddress。");

	// CharacterAuthentication，只能Organisation中文、English、Numbers、Underline等Character。
	jQuery.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element)
				|| /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
	}, "只能Organisation中文、English、Numbers、Underline等Character");

	// CharacterAuthentication，只能Organisation中文、English、Numbers、Underline等Character。
	jQuery.validator.addMethod("stringCheck2", function(value, element) {
		return this.optional(element)
				|| /^[a-zA-Z0-9\u4e00-\u9fa5-_ \'\",]+$/.test(value);
	}, "只能Organisation中文、English、Numbers、Underline等Character");

	// Matchenglish
	jQuery.validator.addMethod("isEnglish", function(value, element) {
		return this.optional(element) || /^[A-Za-z]+$/.test(value);
	}, "Matchenglish");

	// Match汉字
	jQuery.validator.addMethod("isChinese", function(value, element) {
		return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
	}, "Match汉字");

	// Match中文(Including汉字和Character)
	jQuery.validator.addMethod("isChineseChar", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
	}, "Match中文(Including汉字和Character) ");

	// DecisionIs it合法Character(a-zA-Z0-9-_)
	jQuery.validator.addMethod("isRightfulString", function(value, element) {
		return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
	}, "DecisionIs it合法Character(a-zA-Z0-9-_)");

	// DecisionWhether or notOrganisation中English特殊Character，除English"-_"Character外
	jQuery.validator
			.addMethod(
					"isContainsSpecialChar",
					function(value, element) {
						var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
						return this.optional(element) || !reg.test(value);
					}, "含有中English特殊Character");

	jQuery.validator.addMethod("begin", function(value, element, param) {
		var begin = new RegExp("^" + param);
		return this.optional(element) || (begin.test(value));
	}, $.validator.format("I have to {0} Start!"));

	/* $.fn.validate2=function(opt)
	 {
	 	$(this).;
	 }*/
}

$.extends.base642UInt8Array = function(base64){
	let data = base64;
	let bStr = atob(data);
	let n = bStr.length;
	let u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bStr.charCodeAt(n);
	}

	return u8arr;
}

$.extends.downloadStream = function(data, name, type){
	type = type || 'octet/stream';
	name = name || 'default.dat';
	const blob = new Blob([data], {type: type});
	let objectURL = window.URL.createObjectURL(blob);
	let anchor = document.createElement('a');

	anchor.href = objectURL;
	anchor.download = name;
	anchor.click();

	URL.revokeObjectURL(objectURL);
}

$.extends.download = function(url, data, method) {
	if (url) {
		var inputs = '';

		if (data) {
			data = (typeof data == 'string') ? data : jQuery.param(data);

			$.each(data.split('&'), function() {
				var pair = this.split('=');
				inputs += '<input type="hidden" name="' + pair[0] + '" value="'
						+ pair[1] + '" />';
			});
		}

		if ($('#___download').length > 0) {
			//$('#___download').hide();
			//$('#___download').attr('src', url);
		} else {

					/*
					$('<iframe id="___download" src="' + url
							+ '" style="display:none"></iframe>').appendTo(
					'body');
			*/

			$('<iframe id="___download" style="display:none"></iframe>').appendTo(
			'body');

		}

		//$('<form target="blank" action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>').appendTo($('#___download').contents().find('body')).submit().remove();
		$('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>').appendTo($('#___download').contents().find('body')).submit().remove();

		// $('<iframe style="display:none"><form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form></iframe>').appendTo('body').submit().remove();
	}
};


// 将formToAJAXSubmit
$.extends.ajaxSubmit=function(form, fn, prefix) {

	var dataPara = getFormJson(form, prefix);
	$.ajax({
		url : form.action,
		type : form.method,
		data : dataPara,
		success : fn
	});
}

// 将formMedium值Convert为键Value pair。
$.extends.getFormJson=function(form, prefix) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function() {
		var id = this.name;
		id = "#" + prefix + id;
		if (o[this.name] != undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push($(id).attr("returnid") || this.value || '');

		} else {
			o[this.name] = $(id).attr("returnid") || this.value || '';
		}
	});

	return o;
}

$.extends.post=function(form, fn) {
	if (fn.init != undefined) {
		fn.init.call();
	}

	var prefix = "";
	if (arguments.length > 2) {
		prefix = arguments[2];
	}
	var form = "#" + form;
	$(form).submit(function() {
		$.extends.ajaxSubmit(this, fn.callback, prefix);
		return false;
	});
	return false;
}

$.extends.submitPost=function(form) {
	if (fn.init != undefined) {
		fn.init.call();
	}

	var prefix = "";
	if (arguments.length > 2) {
		prefix = arguments[2];
	}
	var form = "#" + form;
	$(form).submit();
	return false;
}

//Click
$.extends.clickajaxSubmit=function(form, fn, prefix) {
	var dataPara = $.extends.getFormJson(form, prefix);
	var action = form.attr("action");
	var method = form.attr("method");
	$.ajax({
		url : action,
		type : method,
		data : dataPara,
		success : fn
	});
}

$.extends.clickPost=function(form, fn) {
	if (fn.init != undefined) {
		fn.init.call();
	}
	if (fn.validatedata != undefined) {
		if (!fn.validatedata.call()) {
			return false;
		}
	}
	if (fn.loading != undefined) {
		fn.loading.call();
	}
	var prefix = "";
	if (arguments.length > 2) {
		prefix = arguments[2];
	}
	form = "#" + form;
	var obj = $(form);
	$.extends.clickajaxSubmit(obj, fn.callback, prefix);
}

$.extends.ajaxPost=function(url, datastr, fn) {
	$.ajax({
		url : url,
		type : 'POST',
		data : datastr,
		success : fn
	});
}

$.extends.ajaxGet=function(url, datastr, fn) {
	$.ajax({
		url : url,
		type : 'GET',
		data : datastr,
		success : fn
	});
}

$.extends.disableGroupField=function(obj, disabled) {
	var jqueryobj = $(obj);

	var notstr = '';
	notstr = ':not(.disable-ignored)';
	if (disabled) {
		jqueryobj.find('input[icheck]' + notstr + '').iCheck('disable');
		jqueryobj.find(
				'input' + notstr + ',button' + notstr + ',select' + notstr
						+ ',textarea' + notstr + '').attr("disabled",
				"disabled");
	} else {
		jqueryobj.find('input[icheck]' + notstr + '').iCheck('enable');
		jqueryobj.find(
				'input' + notstr + ',button' + notstr + ',select' + notstr
						+ ',textarea' + notstr + '').removeAttr("disabled");
	}
}

$.extends.enablefield=function(obj, enabled) {
	var jqueryobj = $(obj);

	if (enabled) {
		if (jqueryobj.is('icheck'))
			jqueryobj.iCheck('enable');

		jqueryobj.removeAttr("disabled");
	} else {
		if (jqueryobj.is('icheck'))
			jqueryobj.iCheck('disable');

		jqueryobj.attr("disabled", "disabled");
	}
}

$.fn.enablefield = function(enabled) {
	enablefield(this, enabled);
};

$.fn.disableGroupField = function(disabled) {
	disableGroupField(this, disabled);
};

$.fn.blur2hide = function(findstr){

	this.each(function(){
		srcobj = findstr?findstr:this;

		$(document).click(function(e){
			obj = $(srcobj);
			src = e.srcElement;
			var length = obj.find(src).length;

			if(length<=0)
			{
				obj.hide();
			}

		});
	});
};

$.fn.disable = function() {
	this.attr("disabled", "disabled");
};
$.fn.enable = function() {
	this.attr("disabled", false);
};

$.fn.outerHTML = function() {
	$(this).prop("outerHTML");
};

$.extends.currencyFormat = function (num){
	return new Intl.NumberFormat('zh-CN', {style: 'currency', currency: 'CNY' , maximumFractionDigits: 2 }).format(num)
}

$.extends.thousandthFormat = function(num){
	return $.extends.currencyFormat(num).split('¥')[1]
	//return new Intl.NumberFormat('zh-CN', {style: 'currency', currency: 'CNY' , maximumFractionDigits: 2 }).format(num) .split('¥')[1] //  123,456.79
}

/**
 * 舍弃Assign精度After小数，对Reservations末位Numbers舍入
 *
 * @param number
 * @parem precision 要Reservations小数位数
 * @return Result值
 */

$.extends.roundUp = function (number, precision){
	let m = Math.pow(10, precision);
	return Math.ceil(number * m) / m;

}

/**
 * 舍弃Assign精度After小数
 *
 * @param number
 * @parem precision 要Reservations小数位数
 * @return number
 */
$.extends.roundDown = function(number, precision) {
	let m = Math.pow(10, precision);
	return Math.floor(number * m) / m;

}

/**
 * Format化Numbers
 * @param num Numbers
 * @param pattern Format化Expression，如：#,###.00\.##\#:###.##,‘.’后OrganisationReservations小数位数
 * @returns {String}
 */

$.extends.formatNumber = function(num, pattern) {

	if($.extends.isEmpty(pattern)){
		pattern = "#,###.00"
	}

	let fmtArr = pattern.indexOf('.') > -1 ? pattern.split('.') : [pattern, ''], p, reg, s, l, precision;
	precision = fmtArr[1].length;
	num = num.toFixed(precision) + '';
	p = fmtArr[0].split(/[^#]/);
	s = fmtArr[0].replace(/[#.]/g, '');
	l = p[p.length - 1].length;
	if (s.length == 0)
		return num;
	reg = precision == 0 ? new RegExp("(\\d)((\\d{" + l + "})+" + s + "?)$") : new RegExp("(\\d)(\\d{" + l + "}[\\."
		+ s + "])");
	while (reg.test(num))
		num = num.replace(reg, "$1" + s + "$2");
	return num;
}

$.extends.base64JsonEncode = function(obj){
	if(obj == null)
		return null

	let rtn = {}

	$.each(obj, function(key, val) {
		if(val!=null){
			rtn[key] = Base64.encode(val)
		}
	})

	return rtn
}

$.extends.base64JsonDecode = function(obj){
	if(obj == null)
		return null

	let rtn = {}

	$.each(obj, function(key, val) {
		if(val!=null){
			rtn[key] = Base64.decode(val)
		}
	})

	return rtn
}

function copyArray(list){
	let rtn = [];

	$.each(list, function (idx,v){
		rtn.push($.extend({}, v))
	})

	return rtn;
}

function findIdx(list, id, field){
	let rtn = -1;
	field = field||'id';

	if(list==null)
		return rtn;

	$.each(list, function (idx,v){
		if(id == v[field]){
			rtn = idx;
			return false;
		}
	})

	return rtn;
}

function findObj(list, id){
	let i = findIdx(list, id)

	if(i<0)
		return null;

	return list[i];
}

function exchangeOrder(list, id1, id2){
	let idx1 = findIdx(list, id1);

	let idx2 = 0;

	if(id2){
		idx2 = findIdx(list, id2)
	}

	let one = list[idx1];
	let two = list[idx2];

	list[idx1] = two;
	list[idx2] = one;
}

function exchangeBefore(sid, list, tid) {
	let idx1 = findIdx(list, sid);
	let one = list[idx1];
	list.splice(idx1, 1)

	let idx2 = 0;
	if(tid){
		idx2 = findIdx(list, tid)
	}
	list.splice(idx2, 0, one)
}

function exchangeAfter(sid, list, tid) {
	let idx1 = findIdx(list, sid);
	let one = list[idx1];
	list.splice(idx1, 1)

	let idx2 = list.length;
	if(tid){
		idx2 = findIdx(list, tid);
	}
	list.splice(idx2+1, 0, one)
}

function exchangeTwoListAfter(sid, slist, tid, tlist) {
	let idx1 = findIdx(slist, sid);
	let one = slist[idx1];
	slist.splice(idx1, 1)

	let idx2 = tlist.length-1;
	if(tid){
		idx2 = findIdx(tlist, tid);
	}
	tlist.splice(idx2+1, 0, one)
}

function exchangeTwoListBefore(sid, slist, tid, tlist) {
	let idx1 = findIdx(slist, sid);
	let one = slist[idx1];
	slist.splice(idx1, 1)

	let idx2 = 0;
	if(tid){
		idx2 = findIdx(tlist, tid)
	}
	tlist.splice(idx2, 0, one)
}

function pageLocal(datas, param, sortable){

	datas = datas||[];

	let skip;

	if(param.rows == null){
		param.rows = 20;
	}

	if(param.page == null || param.page<=0){
		skip = 0
	}else{
		skip = (param.page - 1) * param.rows;
	}

	let result = [];

	if(sortable && param.sort!= null && !$.extends.isEmpty(param.sort)){
		param.order= param.order||'asc';
		let flag = 1;
		if(param.order != 'asc'){
			flag = -1;
		}

		result = datas.sort(function (a, b) {
			return (a>b?1:-1)*flag;
		})

	}else{
		result = datas;
	}

	let limit = skip + param.rows;
	limit = limit>result.length?result.length:limit;

	let rtn = [];
	for(let idx = skip; idx < limit ; idx ++){
		rtn.push(result[idx])
	}

	return rtn;
}

function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint8Array(buf));
}


//byteArray转Character串
function byteToString(arr) {
	if (typeof arr === 'string') {
		return arr;
	}
	var str = '',
		_arr = arr;
	for (var i = 0; i < _arr.length; i++) {
		var one = _arr[i].toString(2),
			v = one.match(/^1+?(?=0)/);
		if (v && one.length == 8) {
			var bytesLength = v[0].length;
			var store = _arr[i].toString(2).slice(7 - bytesLength);
			for (var st = 1; st < bytesLength; st++) {
				store += _arr[st + i].toString(2).slice(2);
			}
			str += String.fromCharCode(parseInt(store, 2));
			i += bytesLength - 1;
		} else {
			str += String.fromCharCode(_arr[i]);
		}
	}
	return str;
}

function ByteArray(){
	this.list=[];
	this.byteOffset=0;
	this.length=0;
}

let p=ByteArray.prototype;

p.push=function(unit8Arr){
	this.list.push(unit8Arr);
	this.length+=unit8Arr.length;
}

p.readBytes=function(len){

	if(len==null || len<=0)
		len = this.length;

	if(len>0){
		let rbuf=new Uint8Array(len);
		let rbuf_ind=0;
		while(rbuf_ind<len){
			if(this.list.length>0){
				let tmpbuf=this.list.shift();
				let tmplen=tmpbuf.length;
				let last_len=len-rbuf_ind;
				if(tmplen>=last_len){
					//Enough
					let tmpbuf2 = tmpbuf.subarray(0, last_len);
					rbuf.set(tmpbuf2,rbuf_ind);
					rbuf_ind+=tmpbuf2.length;
					if(last_len<tmplen){
						let newUint8Array = tmpbuf.subarray(last_len, tmplen);
						this.list.unshift(newUint8Array);
					}
					break;
				}else{
					rbuf.set(tmpbuf,rbuf_ind);
					rbuf_ind+=tmplen;
				}
			}else{
				rbuf=rbuf.subarray(0, rbuf_ind);
				break;
			}
		}
		this.length-=rbuf.length;
		return rbuf;
	}

	return null;
}


/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
	// check for conditions and support for blob / arraybuffer response type
	if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
	{
		return {
			// create new XMLHttpRequest
			send: function(headers, callback){
				// setup all variables
				var xhr = new XMLHttpRequest(),
					url = options.url,
					type = options.type,
					async = options.async || true,
					// blob or arraybuffer. Default is blob
					dataType = options.responseType || "blob",
					data = options.data || null,
					username = options.username || null,
					password = options.password || null;

				xhr.addEventListener('load', function(){
					var data = {};
					data[options.dataType] = xhr.response;
					// make callback and send data
					jqXHR.data = data;
					callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
				});

				xhr.open(type, url, async, username, password);

				// setup custom headers
				for (var i in headers ) {
					xhr.setRequestHeader(i, headers[i] );
				}

				xhr.responseType = dataType;
				xhr.send(data);
			},
			abort: function(){
				jqXHR.abort();
			}
		};
	}
});