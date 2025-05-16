
ERROR_CODE = {
		'-10086':'Services器Page({0})Request丢失',
		'-10000':'ElementsObjectdoes not exist',
		'-95555':'未授权RelevantOperation权限',
		'-99999':'未知Services器Error',
        '-18000':'Services器Page({0})RequestFailed，Failed原因{1}'
		}


message.core = $.extend(message.core, {
	
	navigator_warning:'您的BrowserVersion过低，请Use360Secure Browser的极速Mode或IE9.0AboveVersion的Browser',
	notsupport_fullscreen:'该Browser不SupportFullscreen',
	not_closed:'Current页Not permittedClose！',
	not_home_closed:'OverviewNot permittedClose！',
	oper_too_fast:'Operation过快，Please try again later！',
	info_title:'Hint',
	kind_warning:'温馨Hint',
	
	label:{
		confirm:'Sure',
		close:'Close',
		home:'Back主页',
		refresh:'Refresh',
		fullscreen:'Fullscreen',
		
		
		add:'Add',
		remove:'Delete',
		rollback:'Undo',
		accept:'Accept',
		reset:'Reset',
		search:'Question',
		more:'More',
		
		filter_query:'FilterQuestion',
	},
	
	info:{
		error_info_temp:'{0}，ErrorCode{1}，请联系System管理员',
		loading_text: 'PageAccess中',
		loading_on:'努力Loading.......',
		timeout_msg:'Login已经超时，请重新ConductLogin',
		confirm_title:'ConfirmHint',
		confirm_text:'ConfirmHintInformation',
		alert_title:'Hint',
		alert_text:'HintInformation',
		error_title:'Error',
		warn_title:'Warning',
		info_title:'Information',
		show_title:'OperationHint',
		show_error_title:'Operation异常Hint',
		show_text:'OperationHintInformation',
		getting_data:'AccessData中......',
		in_processing:'Operation中....',
		
		data_invalid:'输入Data不符合FormatRequest，请Confirm后再次输入',
		data_invalid2:'Data填写不规范，Check填写Format',
		data_invalid_4grid:'Data填写未完成Or..输入不规范，请Confirm后再EditOther项目Data',
		not_changed_4grid:'NothingCellsConduct过Edit，无DataUndo',
		not_changed:'DataTableNothingCellsConduct了Edit',
		
		reject_confirm:'有{0}条DataConduct了Edit，您SureUndo？',
		save_confirm:'有{0}条Data已经Conduct了Edit，您SureSave？',
		remove_confirm:'您Confirm想要Delete这{0}条Records吗？',
		remove_without_selection:'未CheckYesDelete的Data行！',
		
		
		filter_invalid:'FilterQuestion条件输入不符合Request',
		
		leaving_confirm:'未Submit的Data，离开System后将可能I can\'tConductSave',
		exit_confirm:'ConfirmExit吗?',
		
		
	},
	
	
	login:{
		error: 'Login account numberAuthentication中.....',
		logouting:'正在Exit中...',
		comfirm_logout:'Sure要Exit吗?',
		personal:'个人Information',
		change_ok:'个人InformationModifySuccess',
		changepwd:'ModifyPassword',
		changepwd_ok:'个人PasswordModifySuccess',
		login_title:'LoginSystem',
		login_btn:'Login',
		login_success:'LoginSystemSuccess',
	}
	
	
});