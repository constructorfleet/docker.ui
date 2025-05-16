
ERROR_CODE = {
		'-10086':'Server Page({0})Request for loss',
		'-10000':'Elements對象does not exist',
		'-95555':'未授權相關的Operation權限',
		'-99999':'未知服務器Error',
        '-18000':'Services器Page({0})RequestFailed，Failed原因{1}'
		}


message.core = $.extend(message.core, {
	
	navigator_warning:'您的瀏覽器Version過低，請Use360安全瀏覽器的極速Mode或IE9.0AboveVersion的瀏覽器',
	notsupport_fullscreen:'該瀏覽器不SupportFullscreen',
	not_closed:'當前頁不允許Close！',
	not_home_closed:'首頁不允許Close！',
	oper_too_fast:'Operation過快，Please try again later！',
	info_title:'Hint',
	kind_warning:'溫馨Hint',
	
	label:{
		confirm:'Sure',
		close:'Close',
		home:'Back主頁',
		refresh:'Refresh',
		fullscreen:'Fullscreen',
		
		
		add:'Add',
		remove:'Delete',
		rollback:'Undo',
		accept:'Accept',
		reset:'Reset',
		search:'Query',
		more:'More',
		
		filter_query:'過濾Query',
	},
	
	info:{
		error_info_temp:'{0}，Error代碼{1}，Please contact the system manager',
		loading_text: 'Page Fetching',
		loading_on:'Working hard to load.......',
		timeout_msg:'We\'re late，Please re-inscribe',
		confirm_title:'確認Hint',
		confirm_text:'確認HintInformation',
		alert_title:'Hint',
		alert_text:'HintInformation',
		error_title:'Error',
		warn_title:'Warning',
		info_title:'Information',
		show_title:'OperationHint',
		show_error_title:'Operation異常Hint',
		show_text:'OperationHintInformation',
		getting_data:'Obtaining data......',
		in_processing:'Operation中....',
		
		data_invalid:'輸入數據不符合FormatRequest，Please confirm and enter again',
		data_invalid2:'Data filling is irregular，請檢查填寫Format',
		data_invalid_4grid:'數據填寫未完成Or..輸入不規範，請確認後再EditOther項目數據',
		not_changed_4grid:'沒有單元格進行過Edit，No data withdrawn',
		not_changed:'數據Table沒有單元格進行了Edit',
		
		reject_confirm:'有{0}條數據進行了Edit，您SureUndo？',
		save_confirm:'有{0}條數據已經進行了Edit，您SureSave？',
		remove_confirm:'您確認想要Delete這{0}條Records嗎？',
		remove_without_selection:'未勾選YesDelete的數據行！',
		
		
		filter_invalid:'過濾Query條件輸入不符合Request',
		
		leaving_confirm:'未Submit的數據，離開系統後將可能I can\'t進行Save',
		exit_confirm:'確認Exit嗎?',
		
		
	},
	
	
	login:{
		error: 'Organisation.....',
		logouting:'正在Exit中...',
		comfirm_logout:'Sure要Exit嗎?',
		personal:'個人Information',
		change_ok:'個人InformationModifySuccess',
		changepwd:'Modify密碼',
		changepwd_ok:'個人密碼ModifySuccess',
		login_title:'Login System',
		login_btn:'Login',
		login_success:'Login SystemSuccess',
	}
	
	
});
