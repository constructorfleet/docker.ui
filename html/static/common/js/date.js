function debug(info){
	
	if(window.APP_DEBUG || window.APP_DEBUG.toUpperCase()=='TRUE'){
		if(window.console){
			window.console.log(info);
		}	
	}
}

// Format化DateTime
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,// Month
		"d+" : this.getDate(),// 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,// Hours
		"H+" : this.getHours(),// Hours
		"m+" : this.getMinutes(),// 分
		"s+" : this.getSeconds(),// 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3),// quarterly
		"S" : this.getMilliseconds()
	// milliseconds
	};
	var week = {
		"0" : "\u65e5",
		"1" : "\u4e00",
		"2" : "\u4e8c",
		"3" : "\u4e09",
		"4" : "\u56db",
		"5" : "\u4e94",
		"6" : "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
