if ($.fn.pagination) {
    $.fn.pagination.defaults.beforePageText = '第';
    $.fn.pagination.defaults.afterPageText = '共{pages}頁';
    $.fn.pagination.defaults.displayMsg = 'Show{from}到{to},共{total}Records';
}
if ($.fn.datagrid) {
    $.fn.datagrid.defaults.loadMsg = 'Processing，Please wait。。。';
}
if ($.fn.treegrid && $.fn.datagrid) {
    $.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager) {
    $.messager.defaults.ok = 'Sure';
    $.messager.defaults.cancel = 'Cancel';
}
$.map(['validatebox', 'textbox', 'passwordbox', 'filebox', 'searchbox',
    'combo', 'combobox', 'combogrid', 'combotree',
    'datebox', 'datetimebox', 'numberbox',
    'spinner', 'numberspinner', 'timespinner', 'datetimespinner'], function (plugin) {
    if ($.fn[plugin]) {
        $.fn[plugin].defaults.missingMessage = 'The entry is the required one';
    }
});
if ($.fn.validatebox) {
    $.fn.validatebox.defaults.rules.email.message = 'Please enter valid電子郵件Address';
    $.fn.validatebox.defaults.rules.url.message = 'Please enter validURLAddress';
    $.fn.validatebox.defaults.rules.length.message = 'Enter content length must be between{0}和{1}Between';
    $.fn.validatebox.defaults.rules.remote.message = '請Amendments此欄位';
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
