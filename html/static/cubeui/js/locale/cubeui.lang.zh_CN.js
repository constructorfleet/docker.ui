if ($.fn.pagination) {
    $.fn.pagination.defaults.beforePageText = '第';
    $.fn.pagination.defaults.afterPageText = '共{pages}页';
    $.fn.pagination.defaults.displayMsg = 'Show{from}到{to},共{total}Records';
}
if ($.fn.datagrid) {
    $.fn.datagrid.defaults.loadMsg = 'Loading，Please wait...';
}
if ($.fn.treegrid && $.fn.datagrid) {
    $.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager) {
    $.messager.defaults.ok = 'Sure';
    $.messager.defaults.cancel = 'Cancel';
}
$.map(['iValidatebox', 'iTextbox', 'iPasswordbox', 'iFilebox', 'iSearchbox',
    'iCombo', 'iCombobox', 'iCombogrid', 'iCombotree', 'iCombotreegrid',
    'iDatebox', 'iDatetimebox', 'iTagbox', 'iNumberbox',
    'iSpinner', 'iNumberspinner', 'iTimespinner', 'iDatetimespinner'], function (plugin) {
    var _plugin = plugin.toLowerCase().substr(1);
    if ($.fn[_plugin]) {
        $.fn[_plugin].defaults.missingMessage = 'Required';
    }
    if ($.fn[plugin]) {
        $.fn[plugin].defaults.missingMessage = 'Required';
    }
});
$.map(['iValidatebox', 'iTextbox', 'iPasswordbox', 'iFilebox', 'iSearchbox',
    'iCombo', 'iCombobox', 'iCombogrid', 'iCombotree', 'iCombotreegrid',
    'iDatebox', 'iDatetimebox', 'iTagbox', 'iNumberbox',
    'iSpinner', 'iNumberspinner', 'iTimespinner', 'iDatetimespinner', 'iLinkbutton', 'iSwitchbutton'], function (plugin) {
    var _plugin = plugin.toLowerCase().substr(1);
    if ($.fn[_plugin]) {
        $.fn[_plugin].defaults.height = 30;
    }
    if ($.fn[plugin]) {
        $.fn[plugin].defaults.height = 30;
    }
});
if ($.fn.validatebox) {
    $.fn.validatebox.defaults.rules.email.message = 'Please enter validE-mailAddress';
    $.fn.validatebox.defaults.rules.url.message = 'Please enter validURLAddress';
    $.fn.validatebox.defaults.rules.length.message = '输入ContentsLength必须介于{0}和{1}Between';
    $.fn.validatebox.defaults.rules.remote.message = '请Amendments该字段';
}
if ($.fn.calendar) {
    $.fn.calendar.defaults.weeks = ['日', '一', '二', '三', '四', '五', '六'];
    $.fn.calendar.defaults.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', '十January', '十February'];
}
if ($.fn.datebox) {
    $.fn.datebox.defaults.currentText = 'Today';
    $.fn.datebox.defaults.closeText = 'Close';
    $.fn.datebox.defaults.okText = 'Sure';
    $.fn.datebox.defaults.formatter = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    };
    $.fn.datebox.defaults.parser = function (s) {
        if (!s) return new Date();
        var ss = s.split('-');
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    };
}
if ($.fn.datetimebox && $.fn.datebox) {
    $.extend($.fn.datetimebox.defaults, {
        currentText: $.fn.datebox.defaults.currentText,
        closeText: $.fn.datebox.defaults.closeText,
        okText: $.fn.datebox.defaults.okText
    });
}
if ($.fn.datetimespinner) {
    $.fn.datetimespinner.defaults.selections = [[0, 4], [5, 7], [8, 10], [11, 13], [14, 16], [17, 19]]
}

//自Definitions汉化Information
if ($.fn.panel) {
    $.fn.dialog.defaults.loadingMessage = "";
}
if ($.fn.edatagrid) {
    $.fn.edatagrid.defaults.loadMsg = "Loading，Please wait...";
}
if ($.fn.datagrid && $.fn.datagrid.defaults && $.fn.datagrid.defaults.operators.nofilter) {
    $.fn.datagrid.defaults.operators.nofilter.text = "无";
    $.fn.datagrid.defaults.operators.contains.text = "Organisation";
    $.fn.datagrid.defaults.operators.equal.text = "=equals";
    $.fn.datagrid.defaults.operators.notequal.text = "!=Not equal to";
    $.fn.datagrid.defaults.operators.beginwith.text = "^=以*Start";
    $.fn.datagrid.defaults.operators.endwith.text = "$=以*End";
    $.fn.datagrid.defaults.operators.less.text = "<less than";
    $.fn.datagrid.defaults.operators.lessorequal.text = "<=less thanequals";
    $.fn.datagrid.defaults.operators.greater.text = ">Greater than";
    $.fn.datagrid.defaults.operators.greaterorequal.text = ">=Greater thanequals";
}

if ($.fn.combogrid) {
    $.fn.combogrid.defaults.loadMsg = "Loading，Please wait...";
}

if ($.fn.combotreegrid) {
    $.fn.combotreegrid.defaults.loadMsg = "Loading，Please wait...";
}

/* CubeUIProperties */
$.locale={
	title:{
		info_title:'温馨Hint',
		import_title:'DataImport',
		upload_title:'Documentation批量Upload',
		uploadfile_title:'DocumentationUpload',
		filename_title:'DocumentationName',
		filemd5_title:'DocumentationAuthentication',
		filesize_title:'Documentation大小',
		fileprogress_title:'Upload进度',
		filestate_title:"UploadStatus",
		alert_title:"OperationHint",
		confirm_title:"OperationConfirm",
		addoredit_title:"Add/Edit",
	},
	label:{
		start_import:'StartImport',
		close:'Close',
		file_browser:'Select File',
		start_upload:'StartUpload',
		file_remove:'移除Documentation',
		upload_waiting:"等待Upload",
		upload_ok:"UploadSuccess",
		upload_fail:"UploadFailed",
		select:"Selection",
		select_picture:"SelectionPicture",
	},
	message:{
		fast_oper:'Operation过快，Please try again later！',
		getting_data:'AccessData中.....',
		processing_data:'正在ProcessingData中...',
		condition_invalid:'Question条件输入不符合Request，请Confirm输入Try again after！',
		processing_ok:'OperationSuccess',
		processing_fail:'OperationFailed！未知Error，Try again！',
		error:"未知Error",
		noFile:"NothingUpload的Documentation!",
		noselected:"NothingSelect要Operation的Records！",
		unselected:"请先Selection要Operation的Data",
        singleSelect: "只能Selection一条要Operation的Data",
		checkSelfGrid: "请先Check要Operation的Data",
		selectSelfGrid: "请先Select要Operation的一条Data",
		selectParentGrid: "请先Select主表中要Operation的一条Data",
		permissionDenied: "Sorry，你NothingOperation权限",
		confirmDelete: "你Sure要Delete所选的Data吗？",
		confirmMsg: "Sure要Implementation该Operation吗？",
		noData: "NothingQuestion到Data",
		selectNode:"请ExpandSelection子Nodes！",
		charts_error:"AccessChartDataFailed!",
		noallow_upload:"Not permittedUploadSuchDocumentation!。<br>Operation无法Conduct,Call the administrator if you need anything",
		upload_error_info1:"Upload的单个DocumentationI can\'tGreater than", 
		upload_error_info2:"。<br>Operation无法Conduct,Call the administrator if you need anything",
		selectrecord:"请先Select一条主表Data！",
		nosame:"两次输入的Contents不Unanimously",
		nomobile:"Please enter a valid phone number",
		nophone:"Please enter a valid number",
		nolength:"输入ContentsLength必须less than{0}",
		minlength:"输入ContentsLength必须Greater than{0}",
		noidcard:"Please enter the correct ID number",
		nozipcode:"请输入正确的邮政Encoded",
		nodate:"请输入正确的Date",
		alphaDash:"输入Contents只能是数字、Letter、Underline或Line",
		alphaNum:"输入Contents只能是数字和Letter",
		nonumber:"输入Contents只能是数字",
	}
}

/**
defaultConfig.language.message.title={

}

defaultConfig.language.message.msg={

}
**/