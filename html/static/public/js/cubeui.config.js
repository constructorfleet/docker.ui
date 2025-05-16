/**
 * ConfigureDocumentationAnnotations
 * @type {string}
 * cubeUI.language: 消息Hint框的中文Hint，可Based on情况Adjustment
 *
 */
/* 静态Presentation中AccesscontextPath，动态Presentation非必须 Start */

if(!$.locale){

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
			alphaDash:"输入Contents只能是Numbers、Letter、Underline或Line",
			alphaNum:"输入Contents只能是Numbers和Letter",
			nonumber:"输入Contents只能是Numbers",
		}
	}

}

var contextPath = "/cubeui";
var remoteHost = "http://localhost:8080";
if (navigator.onLine) {
}
var firstPathName = window.location.pathname.split("/")[1];

/* 静态Presentation中AccesscontextPath，动态Presentation非必须 End */

var myConfig = {
	li1:"",
    config: {
        pkName: 'uuid', //Data表主键名，For批量SubmitData时Access主键值
        singleQuotesParam: true, //Whether or not对批量SubmitTableSelectRecords的Parameters值Use单引号，Default asfalse，true:'123','456'，false:123,456
        datagrid: {
            page: 'page', //Submit到后台的Show第几页的Data
            size: 'rows', //Submit到后台的每页Show多少条Records
            total: 'total', //后台Back的总Records数Parameters名
            rows: 'rows' //后台Back的Data行ObjectParameters名
        },
        postJson: false, //SubmitFormData时以json或x-www-form-urlencodedFormatSubmit，true为json，false为urlencoded
        appendRefererParam: false, //AutoAppend来源页Address上的Parameters值到弹出Window的href或Table的url上，Default asfalse不Append
        statusCode: {
            success: 200, //ImplementationSuccessBackStatus码
            failure: 300 //ImplementationFailedBackStatus码
        }
    },
    language: {
        message: {
            title: {
                operationTips: $.locale.title.alert_title,
                confirmTips: $.locale.title.confirm_title
            },
            msg: {
                success: $.locale.message.processing_ok,
                failed: $.locale.message.processing_fail,
                error: $.locale.message.error,
                checkSelfGrid: $.locale.message.checkSelfGrid,
                selectSelfGrid: $.locale.message.selectSelfGrid,
                selectParentGrid: $.locale.message.selectParentGrid,//"请先Select主表中要Operation的一条Data",
                permissionDenied: $.locale.message.permissionDenied,//"Sorry，你NothingOperation权限",
                confirmDelete: $.locale.message.confirmDelete,//"你Sure要Delete所选的Data吗？",
                confirmMsg: $.locale.message.confirmMsg,//"Sure要Implementation该Operation吗？"
                unSelect: $.locale.message.unselected,
                singleSelect: $.locale.message.singleSelect,
                noData: $.locale.message.noData,
            }
        },
        edatagrid: {
            destroyMsg: {
                norecord: {
                    title: $.locale.title.alert_title,
                    msg: $.locale.message.noselected
                },
                confirm: {
                    title: $.locale.title.confirm_title,
                    msg: $.locale.message.confirmDelete
                }
            }
        }
    },
}
