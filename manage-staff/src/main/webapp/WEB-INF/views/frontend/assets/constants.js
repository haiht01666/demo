/**
 * Created by HuyNT2.
 * User: 
 * Date: 12/17/13
 * Time: 5:35 PM
 */
/*** CONSTANTS GLOBAL ***/

var CONSTANTS = (function() {
     var pConstants = {
		 'CMD_TYPE_GIFT_XCHNG_HIS'                      : '9',
		 'CMD_TYPE_UTILITIES'                           : '5',
		 'CMD_TYPE_GET_NATIONALITY'                     : '53',
		 'CMD_TYPE_DELETE_INTRO_CUS'                    : '68',
		 'CMD_TYPE_UPDATE_INTRO_CUS'                    : '67',
		 'CMD_TYPE_LIST_INTRO_CUS'                      : '66',
		 'CMD_TYPE_CONNECT_EWALLET'				        : '208',
		 'CMD_TYPE_GET_DISCONNECT_EWALLET'				: '209',

		 
		 'CMD_TYPE_LOYALTY'						        : '7',
		 'CMD_TYPE_TRANS_LIST'							: '10',
		 'CMD_TYPE_STARTUP'								: '13',
		 'CMD_TYPE_LOGIN'								: '100',
		 'CMD_TYPE_LOCAL_TRANSFER'						: '17',
		 'CMD_TYPE_INTER_TRANSFER'						: '18',
		 'CMD_TYPE_FPTS_TRANSFER'						: '20',
		 'CMD_TYPE_LOCAL_TRANSFER_CUSTOMER'				: '70',
		 'CMD_TYPE_TRANSFER_CARD'						: '150',
		 'CMD_TYPE_TICKET_REQUEST'						: '1',
		 'CMD_TYPE_MATRIX_REQUEST'						: '103',
		 'CMD_AUTHEN_LIMIT'   							: '16',
		 'CMD_TYPE_QUICK_SEARCH'						: '15',
		 'CMD_TYPE_OTP_REQUEST'							: '101',
		 'CMD_TYPE_CHNG_CUS_INFO'   					: '105',
		 'CMD_TYPE_CHNG_CUS_INFO_CONFIRM'   			: '106',
		 'CMD_TYPE_CHNG_CUS_AVATAR'   					: '107',
		 'CMD_TYPE_TOPUP'								: '19',
		 'CMD_TYPE_ADSL'								: '24',
		 'CMD_TYPE_HOMEPHONE'							: '24',
		 'CMD_TYPE_POSTPAID'							: '23',
		 'CMD_TYPE_EVN_PAY'								: '30',
		 'CMD_TYPE_EVN_PAY_BILL'						: '31',
		 'CMD_LOOKUP_EVN_CODE'							: '33',
		 'CMD_SEARCH_EVN_CODE'							: '32',
		 'CMD_TYPE_ESAVING_DRAWAL_HISTORY'				: '116',
		 
		 // card advance
		 'CMD_TYPE_QUERY_CARD_ADVANCE'                  : '96',
		 'CMD_TYPE_QUERY_CARD_RETURN'                   : '97',
		 'CMD_TYPE_QUERY_CARD_INFO'                     : '77',
		 

		 'CMD_TYPE_QUERY_ACCOUNT'						: '113',
		 'CMD_TYPE_QUERY_ACCOUNT_NO_INFO'				: '114',
		 'CMD_TYPE_QUERY_ACCOUNT_DETAIL'				: '104',
		 'CMD_TYPE_LOOKUP_BANK'							: '117',
		 'CMD_TYPE_LOOKUP_CITY'							: '118',
		 'CMD_TYPE_LOOKUP_BRANCH'						: '119',
		 'CMD_TYPE_LOOKUP_CITY_BRANCH'					: '120',
		 'CMD_TYPE_PAYMENT'         					: '231',
		 'CMD_TYPE_QUERY_HISTORY_INFO'					: '232',
		 'CMD_TYPE_QUERY_INTEREST_RATE'					: '253',
		 'CMD_TYPE_QUERY_EXCHANGE_RATE'					: '254',	
		 'CMD_TYPE_LOOKUP_ATM'							: '255',
		 'CMD_TYPE_LOOKUP_PAYEE'						: '234',
		 'CMD_TYPE_LOOKUP_CITY_HAS_BRANCH'				: '160',
		 'CMD_TYPE_LOOKUP_DISTRICT_HAS_BRANCH'			: '161',
		 'CMD_TYPE_LOOKUP_CITY_ATM_OT'					: '162',
		 'CMD_TYPE_LOOKUP_DISTRICT_ATM_OT'				: '163',		 
		 
		 'CMD_TYPE_LOOKUP_CREDIT_CARD_NO'               : '301',
		 'CMD_TYPE_CREDIT_CARD_REPAYMENT'               : '300',	
		 	 
		 'CMD_TYPE_REG_eSAVING'							: '110',
         'CMD_TYPE_REG_eSAVING_FORTUNE'					: '193',
		 'CMD_TYPE_VIEW_eSAVING'						: '111',
		 'CMD_TYPE_WITHDRAW_eSAVING'					: '112',
		 'CMD_TYPE_VIEW_NORMAL_SAVING'					: '109',
		 'CMD_TYPE_ESAVING_CHECKOVERDRAFT_ACC'			: '115',
		 
		 'CMD_LOOKUP_VISA_CARD'							: '46',
		 'CMD_LOCK_VISA_CARD'							: '47',
		 'CMD_LOCKUP_VISA_HISTORY'						: '48',
		 'CMD_UNLOCK_VISA_CARD'							: '56',
		 'CMD_LOOKUP_VISA_CARD_NEW'					    : '78',
		 

		 
		 
		 'CMD_TYPE_CHANGE_AUTHEN_TYPE'					: '14',
		 
		 'CMD_LOOKUP_TPB_BANKINFO'						: '251',
		 'CMD_LOOKUP_ATM_TPB'							: '252',
		 'CMD_TYPE_LOOKUP_ATM' 							: '255',
		 'CMD_TYPE_LOOKUP_TRANSACTION_LOCATE' 			: '256',
		 'CMD_TYPE_CHANGEPASS'							: '49',
		 
		 // eGold
		 'CMD_TYPE_GOLD_TERM_AUTHENTICATE' 				: '51',
		 'CMD_TYPE_GOLD_AUTHENTICATE' 					: '34',
		 'CMD_TYPE_GOLD_BUY_VERIFY' 					: '36',
		 'CMD_TYPE_GOLD_SELL_VERIFY' 					: '37',
		 'CMD_TYPE_GOLD_LOOKUP_HISTORY' 				: '39',
		 'CMD_TYPE_GOLD_VIEW_STORE' 					: '43',
		 'CMD_TYPE_GOLD_WITHDRAW_VERIFY' 				: '42',
		 'CMD_TYPE_GOLD_WITHDRAW_HAS_TERM_VERIFY' 		: '45',
		 'CMD_TYPE_GOLD_CHECK_RATE' 					: '35',
		 'CMD_TYPE_GOLD_WITHDRAW_GET_QUANTITY_AT_BANK' 	: '41',
		 'CMD_TYPE_GOLD_TERM' 							: '50',
		 'CMD_TYPE_GOLD_TRANS' 							: '39',
		 'CMD_TYPE_GOLD_TRANS_HIS_RATE' 				: '55',
		 
		 'CMD_TYPE_VIEW_LOAN'							: '130',//FOR LOAN FUCNTION
		 'CMD_TYPE_REPAYMENT_LOAN'						: '131',//FOR REPAYMENT FUCNTION
		 'CMD_TYPE_SB_OVERDRAFT'						: '132',//FOR STAND BY OVERDRAFT
		 'CMD_TYPE_CONFIRM_OVERDRAFT'					: '133',//FOR STAND BY OVERDRAFT
		 'CMD_TYPE_ADJUST_SB_OVERDRAFT'					: '134',//FOR ADJUST STAND BY OVERDRAFT
		 'CMD_TYPE_CONFIRMADJUST_SB_OVERDRAFT'			: '135',//FOR ADJUST STAND BY OVERDRAFT
		 'CMD_TYPE_ACTIVATE_SB_OVERDRAFT'				: '136',//FOR ACTIVATE STAND BY OVERDRAFT
		 'CMD_TYPE_ACTIVATE_AUTHEN_OVERDRAFT'			: '137',//FOR ACTIVATE STAND BY OVERDRAFT
		 'CMD_TYPE_VIEW_INFO_SB_OVERDRAFT' 			    : '138',//FOR VIEW STANDBY OD
		 'CMD_TYPE_LOAN_CATEGORY' 					    : '139',//FOR VIEW LOAN CATEGORY
		 'CMD_TYPE_LOAN_ADVISORY'					    : '140',//FOR LOAN ADVISORY
		 'CMD_LOAN_SEND_QUESTION'						: '141',//FOR SEND QUESTION
		 'CMD_TRANSFER_TEMPLATE_TEMPLATE'				: '142',//FOR GET ALL TEMPLATE IN TRANSFER
		 'CMD_TRANSFER_TEMPLATE_UPDATE'					: '143',//FOR UPDATE, DELETE TEMPLATE IN TRANSFER
		 'CMD_TYPE_GET_CAPCHA'							: '002',//FOR GET CAPCHA
		 'CMD_TYPE_GET_BOOK_BENEFICIARY'				: '234',
		 'CMD_TYPE_UPDATE_BOOK_BENEFICIARY'				: '76',//THUANTM
		 'CMD_VIEW_TRANSFER_COMMAND'					: '144',//FOR VIEW TRANSFER COMMAND
		 'CMD_VIEW_TRANSFER_COMMAND_DETAIL'				: '145',//FOR VIEW TRANSFER COMMAND DETAIL
		 'CMD_TYPE_SCHEDULE_BANK_MNG'					: '28',
		 'CMD_TYPE_SCHEDULE_BANK_CANCEL'				: '29',
		 'CMD_TYPE_GET_PROMOTION'						: '222',
		 'CMD_TYPE_RENAME_ACC_NO'						: '223',
		 
         'RESPONSE_SESSTION_TIMEOUT'					: '206',
         'RESPONSE_SESSION_INVALID'						: '207',
		 
		 'AES_UTIL_SALT'								: '3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55',
		 'AES_UTIL_IV'									: 'F27D5C9927726BCEFE7510B1BDD3D137',
		 'AES_UTIL_KEYSIZE'								: '128',
		 'AES_UTIL_ITERATION_COUNT'						: '10000',
 		 /*** eSaving Input Change infomation ***/
		 'CMD_TYPE_ESAVING_CHANGEINFO_VIEW'				: '108',
		 'CMD_TYPE_ESAVING_CHANGEINFO_VERIFY'			: '128',
		 /*** Transfer ***/
		 'CMD_TRANSFER_PERIODIC'						: '11',
		 'CMD_TRANSFER_PERIODIC_MNG_TRANS'				: '74',
		 'CMD_TRANSFER_PERIODIC_CANC_TRANS'				: '75',
		 'CMD_VIEW_FUNDS_TRANSFER'                      : '6',
		 'CMD_PRD_INTER_NOR_TRANS_ACC'					: '81',
		 'CMD_PRD_INTER_FAST_TRANS_ACC'					: '82',
		 'CMD_PRD_INTER_FAST_TRANS_CARD'				: '83',
		 
		 /*** chuyen tien nhanh ***/
		 'CMD_FAST_TRANS_SML_BANKCODE'					: '59',
		 'CMD_FAST_TRANS_ACC_VERIFY'					: '12',
		 'CMD_INFO_CUSTOMER'   							: '54',
		 'SC_CHECK_CUSTOMER'   							: '15',
		 
		 /*** introduce customer ***/
		 'CMD_LOAD_FILE_CUSTOMER'   					: '69',
		 'CMD_LOAD_IMAGE_CUSTOMER'						: '71',
		 'CMD_UPDATE_BATCH_CUSTOMER'					: '72',
		 
		 /*Car service */
		 'CMD_MANAGER_CARD'   							: '4',		 
		 'CMD_CHANGE_LIMIT'   							: '214',	
		 'CMD_CARD_LOCK'   								: '204',		
		 'CMD_CARD_REPAYMENT_INFO'						: '215',
		 'CMD_UPDATE_REPAYMENT_INFO'					: '216',

		 'CMD_CARD_LIST_PRO'							: '302',
		 'CMD_CARD_LIST_POPULAR_ANSWER'					: '303',
		 'CMD_CARD_SEND_QUESTION'						: '304',
		 
		 'CMD_CHANGE_REPAYMENT_LIMIT'					: '217',
		 'CMD_CHANGE_REPAYMENT_REPAYMENT_REQUEST'		: '218',
		 'TRANS_SUCCESS'								: '0',
		 'TRANS_RELIABLE'								: '1013',
		 'CMD_TRANS_MOTH_HIS_VISA'                      : '305',
		 
		 /*** payment visa **/
		 'CMD_OL_SHOP_LIST_BILL'						: '220',
		 'CMD_OL_SHOP_CONFIRM_BILL'						: '221',
		 /*** homepage **/
		 'CMD_GET_PROPERTY_INFO'				        : '63',
		 'CMD_GET_DEBT_INFO'    				        : '3',
		 'CMD_GET_CUS_PROP_DETAIL_INFO'    				: '240',
		 
		 'CMD_SEND_FEEDBACK'    				        : '180',
		 'CMD_TYPE_LOGOUT'								: '124',
		 
		 /*** TuanNM Update - JUMBO***/
		 'CMD_CHECK_EXIST_JUMBO_ACC'					: '260',
 		 'CMD_CREATE_JUMBO_ACC'							: '261',
 		 'CMD_GET_JUMBO_ACC_INFO'						: '262',
		 'CMD_CHECK_EXIST_AUTO_SAVING'					: '263',
 		 'CMD_CREATE_AUTO_SAVING'						: '264',
 		 'CMD_CHANGE_AUTO_SAVING'						: '265',

		 
		 /*TUANNM5 Update - Bo Sung ket noi the voi so TK*/
		 'CMD_CARD_CONNECT_ACC_INFO'					: '79',
		 'CMD_CARD_CONNECT_ACC_REGISTER'				: '80',

		 //NGOCDT3 bo sung cho dang ky the ao
		 'CMD_REGISTER_EMONEY_CARD'				        : '60',
		 //NGOCDT3 bo sung cho thanh toan phi mo the eCounter
		  'CMD_PAYMENT_ECOUNTER'				        : '266',
		  'CMD_PAYMENT_ECOUNTER_BILL'                   :'267',
		 'CMD_SCHEDULE_BANK_GET_TIME'					: '26',
		 /*Huy giao dich*/
		 'CMD_TRANSACTION_CANCEL'						: '88',


		 /*get menu*/
		 'CMD_GET_CUSTOMIZE_MENU'						: '86',
		 /*KH non-ebank gui cau hoi tu van dang ky vay von*/
		 'CMD_LOAN_SEND_QUESTION_NON_EBANK'				: '91',
		 /*KH non-ebank gui cau hoi tu van dang ky phat hanh the*/
		 'CMD_CARD_SEND_QUESTION_NON_EBANK'				: '92',
		 //Dang ky gui tiet kiem gui gop
		 'CMD_GET_INFO_FUTURE_SAVING'					: '270',
		 'CMD_REGISTER_FUTURE_SAVING'					: '271',
		 //nop tien gui gop
		 'CMD_FLX_TRANS'								: '272',
		 //tat toan gui tiet kiem truc tuyen
		 'CMD_CLOSE_FUTURE_SAVING'						: '273',
		//doi thong tin tiet kiem truc tuyen
		'CMD_CHANGEINFO_FUTURE_SAVING'						: '274',
		//lay lich su nap tien
		'CMD_HISTORY_FUTURE_SAVING'						: '275',
		//thanh toan tu dong
		 'CMD_REGISTER_AUTO_BILLING'					: '268',
		 'CMD_HISTORY_AUTO_BILLING'						: '148',
		 'CMD_QUERY_HISTORY_BILLING'					: '149',
		 'CMD_CANCEL_REG_BILLING'						: '151',
		 'CMD_QUERY_HISTORY_DETAIL'						: '154',

		//cai dat mat khau sao ke the 
		 'CMD_SET_PASS_STATEMENT'						: '152',
		 'CMD_REMOVE_PASS_STATEMENT'					: '153',
		
		//TUANNM5: TOUCH ID WS
		 'CMD_TOUCHID_REGISTER'							: '159',
		 'CMD_TOUCHID_LOGIN'							: '158',
		 'CMD_TOUCHID_UNREGISTER'						: '164',
		 'CMD_TOUCHID_VERIFY_PASSWORD'					: '165',
		 'CMD_PINCODE_REGISTER'							: '166',
		 'CMD_PINCODE_CHANGE'							: '167',
		 'CMD_FINGERPRINT_PINCODE_CHECK_STATUS'			: '168',	 		 		 
		//tat toan tiet kiem tu dong
		'CMD_AUTO_SAVING_CLOSE'						: '155',
		//Ngung su dung easylink
		'CMD_EASY_LINK_CLOSE'						: '156',
		//dang ky tiet kiem tai loc
		'CMD_SAVING_NO_CLOSE'						: '157',
		//lay thong tin gui mail cho nguoi thu huong
		'CMD_GET_INFO_SEND_MAIL'					: '170',
		'CMD_SEND_MAIL_SHARE'						: '175',
		//username hoa ebank
		'CMD_CHANGE_USERNAME'						: '176',
		//SangNt1 -- GenTokenId PushNotification to Database
		'CMD_TYPE_POST_DEVICE_TOKEN'				: '306',
         //SangNt1 --  Get list notification
        'CMD_TYPE_GET_LIST_NOTIFICATION'			: '308',
         //SangNt1 --  Read notification
        'CMD_TYPE_READ_NOTIFICATION'               :'309',
		'CMD_TRANSFER_LIST_EDIT'               :'177',
		 'CMD_TYPE_CHANGEUSERNAME'						: '310',//cai dat username
		 'CMD_GET_LINK_SAVING_INFO'						: '178',//get link in pdf
		 // DatMD Get so tiet kiem info from QR code
		 'CMD_GET_QRCODE_INFO'						: '169',
		 //ngocdt3 bo sung lay tinh thanh trong loyalty
		 'CMD_GET_LIST_PROVINCE'						: '179',
		 
		 //TUANNM5 PHUCTD REACTIVE
		 'CMD_GET_REACTIVE_CUST_INFO'               : '173',
         'CMD_REACTIVE_CUST'                        : '171',
		 
		 //TUANNM5 CHECK FINGERPRINT AUTH
		 'CMD_GET_FINGERPRINT_AUTH_INFO'			: '174',
		 'CMD_TYPE_TICKET_REQUEST_FINGERPRINT'		: '191',
		 //ngocdt3 bo sung cho dieu huong chuyen tin
		 'CMD_TYPE_TRANS_FAST_COMBO'						: '192',
		 'CMD_TYPE_QUERY_LIST_BANK_DETAIL'						: '186',
		 'CMD_TYPE_CHANGE_AUTHEN_TYPE_MKS'          : '318',
		 'CMD_TYPE_VIEW_INFO_OVERDRAFT' 			: '197',//FOR VIEW INFO OVERDRAFT
     };

     return {
        get: function(name) { 
			return pConstants[name]; 
		}
    };
})();

var RESP = (function() {
     var pConstants = {
		 'COM_SUCCESS'   								: '0',
		 'COM_GATEFAIL'   								: '-1',
		 'COM_OVER_LIMIT'   							: '1001',
		 'COM_OVER_DATE_LIMIT'   						: '1002',
		 'COM_SESSION_TIMEOUT'   						: '1003',
		 'COM_TRUST_PAYEE'   							: '1013',
		 'COM_PASSWORD_EXPIRE'   						: '1014',
		 'COM_WRONG_INPUT_TOKEN'   						: '2002', // cho nhập lại token, các trường hợp khác thì alert hỏi nhập lại hay về home page
		 'COM_TRANS_EXT_TIMEOUT'   						: '1017', //đợi giao dịch và quay về trang chủ
		 'COM_FINGERPRINT_OVER_LIMIT'					: '1035',//ngocdt3 chinh sua thay doi ma loi 09/03/2016
		 'COM_FINGERPRINT_OVER_LIMIT_PAYMENT'			: '1042',
		 
		 //TUANNM5 update bo sung cho fingerprint/pin
		 'COM_FINGERPRINT_PIN_LIMIT'   					: '2003',
		 'COM_PIN_CHANGE_TO_6DIGIT'						: '2005'
	 };
	 
     return {
        get: function(name) { 
			return pConstants[name]; 
		}
    };
})();

/*** CONSTANTS GLOBAL END ***/


/*** DEFINE MULTI-LANGUAGE STRING ***/
//using gUserInfo.lang, LangVN.js, LangEN.js

var CONST_STR = (function() {
     
     return {
        get: function(name) { 
			if (gUserInfo.lang == 'EN') {
				return pConstants_EN[name]; 	
			}
			else {
				return pConstants_VN[name]; 
			}
			
		}
    };
})();

/*** DEFINE MULTI-LANGUAGE STRING END ***/

/*** DEVICE STATUS ***/
var CONST_APP_VERSION = "5.0.1";
var CONST_APP_NAME = "GPRS_WAP";

var CONST_APP_WEB_CONFIG = "GPRS_WEB"; //do not change
var CONST_APP_IPHONE_CONFIG = "GPRS_IPHONE"; //do not change
var CONST_APP_ANDROID_CONFIG = "GPRS_ANDROID"; //do not change


/*** DEVICE STATUS END ***/

/*** DEFINE SERVICE CODE WILL QUERY INFO AFTER CHANGE ACCOUNT ***/

var CONST_SERVICE_CODE_QUERY_ACCOUNT = ['17', '110', '19', '18', '150'];

var CONST_DEBUG_MODE = false;  //change DEBUG MODE
var CONST_BROWSER_MODE = true;  //change APP/BROWSER MODE
var CONST_DESKTOP_MODE = true;  //using auto-update view when resize windows

//NOTE FOR iOS remove code at comment: DISABLE_FOR_APP_iOS

var CONST_WEB_URL_LINK = "https://ebank.tpb.vn/retail/"; //using for mobile app 
//var CONST_WEB_URL_LINK = "https://pilot.tpb.vn/retail/"; //using for mobile app 
var CONST_WEB_CORP_URL_LINK = "https://ebank.tpb.vn/ibank/entry"; //using for mobile app 
//var CONST_WEB_CORP_URL_LINK = "http://pilot.tpb.vn:9080/ibank/entry"; //using for mobile app 
var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "http://localhost:63342/retail/data" : "http://localhost:63342/retail/data";
//var CONST_WEB_URL_LINK = "http://10.1.12.150:9083/retail/"; //using for mobile app 
//var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "http://10.1.12.150:9083/EBankGateway/ebservice" : "http://10.1.12.150:9083/EBankGateway/ebservice";


//status load page fail
var CONST_LOAD_PAGE_FAIL_STATUS = [404, 403, 500, 503];

var CONST_HISTORY_CODE = ['EVN-HCM', 'LOCALTRAN', 'TOPUP', 'LOCALTRAN', 'CARDTRAN'];

var CONST_PAYEE_CODE = ['1', '2'];
/*** DEFINE SERVICE CODE WILL QUERY INFO AFTER CHANGE ACCOUNT END ***/

/*** CONFIG FUNCTION RESULT SCREEN ***/

//config for result screen
var CONFIG_RESULT_FUNC_GOHOME = {
    "loan/loan-open-standby-overdraft": {
        "btnHomeTitle": "LOAN_ACTIVE_SB_OD_TITLE_1",
        "btnHomePageName": "loan/loan-active-standby-overdraft",
		"btnHomePageType": ""
    },
	
    "loan/loan-adjust-standby-overdraft": {
        "btnHomeTitle": "LOAN_ACTIVE_SB_OD_TITLE",
        "btnHomePageName": "loan/loan-active-standby-overdraft",
		"btnHomePageType": ""
    },
	
	"esaving/esaving-open-scr": {
        "btnHomeTitle": "LOAN_OPEN_SB_OD_TITLE",
        "btnHomePageName": "loan/loan-open-standby-overdraft",
		"btnHomePageType": ""
    },
	
	"jumbo/jumbo_check_auto_saving": {
        "btnHomeTitle": "MENU_ESAVING_INFORMATION",
        "btnHomePageName": "esaving/esaving-information",
		"btnHomePageType": "xsl"
    },
	"esaving/future-esaving-open-scr": {
        "btnHomeTitle": "MENU_ESAVING_INFORMATION",
        "btnHomePageName": "esaving/esaving-information",
		"btnHomePageType": "xsl"
    }
};

var CONFIG_RESULT_FUNC_OTHERTRANS = {
    "esaving/esaving-open-scr": {
        "btnOtherTransTitle": "MENU_ESAVING_INFORMATION",
        "btnOtherTransPageName": "esaving/esaving-information",
		"btnOtherTransType": "xsl"
    }
};

/*** CONFIG FUNCTION RESULT SCREEN END ***/

/*** DEFINE PRICE FOR TOPUP PAYMENT ***/
var CONST_KEY_PRICE_TOPUP = ['30,000', '50,000', '100,000', '200,000', '500,000'];
var CONST_VAL_PRICE_TOPUP = ['30000', '50000', '100000', '200000', '500000'];

/*** DEFINE PRICE FOR TOPUP PAYMENT ***/

/*** DEFINE PROVIDER FOR ADSL PAYMENT ***/
var CONST_KEY_PROVIDER_ADSL = ['FPT Telecom', 'Viettel', 'SST'];
var CONST_VAL_PROVIDER_ADSL = ['FTEL_ADSL', 'VTLADSL', 'SSTADSBILL'];
/*** DEFINE PROVIDER FOR ADSL PAYMENT ***/
	
/*** DEFINE FPTS ACCOUNT ***/
var CONST_VAL_FPTS_ACCOUNT = ['66666666002'];
var CONST_KEY_FPTS_ACCOUNT = ['Tài khoản FPTS tại Hà Nội'];

/*** DEFINE TRANSACTION LOCAL TPBANK ***/
var CONST_KEY_LOCAL_TPBANK_VN = ['Chuyển tới tài khoản của tôi', 'Chuyển tới tài khoản TPBank khác'];
var CONST_KEY_LOCAL_TPBANK_EN = ['Transfer to my account', 'Transfer to another TPBank account'];

/*** DEFINE PERIODIC ACCOUNT TYPE ***/
var CONST_PRD_TRANS_TYPE_KEY = ['LOCAL', 'FASTACC', 'FASTCARD', 'INTERBANK'];
var CONST_PRD_TRANS_TYPE_VN = ['Chuyển tiền trong TPBank', 'Chuyển nhanh tới số tài khoản', 'Chuyển nhanh tới số thẻ', 'Chuyển tiền liên ngân hàng'];
var CONST_PRD_TRANS_TYPE_EN = ['Transfer to TPBank\'s account', 'Transfer to account number', 'Transfer to card number', 'Normal transfer to another bank\'s account'];
var CONST_VAL_PERIODIC_LOCAL = ['LOCAL', 'INTERNAL', 'FASTACC', 'FASTCARD', 'INTERBANK'];
var CONST_KEY_PERIODIC_LOCAL_VN = ['Tài khoản khác của khách hàng', 'Tài khoản TPBank khác'];
var CONST_KEY_PERIODIC_LOCAL_EN = ['My account', 'Another account in TPBank'];
var CONST_VAL_PERIODIC_FREQUENCY = ['date', 'week', 'month', 'year'];
var CONST_KEY_PERIODIC_FREQUENCY_VN = ['Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Hàng năm'];
var CONST_KEY_PERIODIC_FREQUENCY_EN = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
/*ngocdt3 chinh sua luu danh sach thu huog -> luu vao danh sach*/
var CONST_VAL_PAYEE = ['N', 'TH', 'TP'];
var CONST_KEY_PAYEE_VN = ['Không lưu','Lưu vào danh sách', 'Lưu mẫu chuyển tiền'];
var CONST_KEY_PAYEE_EN = ['Beneficiaries do not save contacts','Save the list of beneficiaries', 'Save sample transfer'];
/*ngocdt3 chinh sua luu danh sach thu huog -> luu vao danh sach*/
var CONST_VAL_PAYEE_NOT_TEMPLATE = ['N', 'TH'];
var CONST_VAL_PAYEE_NOT_TEMPLATE_VN = ['Không lưu','Lưu vào danh sách'];
var CONST_VAL_PAYEE_NOT_TEMPLATE_EN = ['Beneficiaries do not save contacts','Save the list of beneficiaries'];

var CONST_KEY_TRANS_PRE_SELCT_VN = ['Thực hiện giao dịch','Quản lý giao dịch'];
var CONST_KEY_TRANS_PRE_SELCT_EN = ['Make a schedule','Schedule management'];
var CONST_KEY_TRANS_PRE_SLECT_BGN = ['1','2'];

/*Utilities*/
var CONST_KEY_UTILITIES_CALCULATOR_VN = ['Tiền gửi tiết kiệm','Tiền vay'];
var CONST_KEY_UTILITIES_CALCULATOR_EN = ['Savings','Loan'];
var CONST_KEY_UTILITIES_CALCULATOR_BGN = ['1','2'];

var CONST_KEY_UTILITIES_CAL_SAV_TYPE_VN = ['Tiết kiệm điện tử','Tiết kiệm rút gốc linh hoạt','Tiết kiệm hưởng lãi đầu kỳ','Tiết kiệm hưởng lãi định kỳ tháng','Tiết kiệm hưởng lãi định kỳ quý','Tiết kiệm hưởng lãi cuối kỳ'];
var CONST_KEY_UTILITIES_CAL_SAV_TYPE_EN = ['E-Savings','Flexible principal withdrawal savings','Regular Savings Account with Interest paid in advance','Regular Savings Account with Interest paid monthly','Regular Savings Account with Interest paid quarterly','Regular Savings Account with Interest paid at maturity'];
var CONST_KEY_UTILITIES_CAL_SAV_TYPE_BGN = ['1','2','3','4','5','6'];

var CONST_KEY_UTILITIES_CAL_SAV_CURRENCY_EN = ['VND','USD','EUR','SGD','AUD','GBP','CAD','JPY'];
var CONST_KEY_UTILITIES_CAL_SAV_CURRENCY_BGN = ['VND','USD','EUR','SGD','AUD','GBP','CAD','JPY'];

var CONST_KEY_UTILITIES_CAL_TERM_VN = ['1 tuần','2 tuần','3 tuần','1 tháng','2 tháng','3 tháng','6 tháng','9 tháng','12 tháng','18 tháng','24 tháng','36 tháng'];
var CONST_KEY_UTILITIES_CAL_TERM_EN = ['1 week','2 weeks','3 weeks','1 month','2 months','3 months','6 months','9 months','12 months','18 months','24 months','36 months'];
var CONST_KEY_UTILITIES_CAL_TERM_BGN = ['01W','02W','03W','01M','02M','03M','06M','09M','12M','18M','24M','36M'];

var CONST_KEY_UTILITIES_CAL_LOAN_VN = ['Hàng tháng','Hàng quý','6 Tháng'];
var CONST_KEY_UTILITIES_CAL_LOAN_EN = ['Monthly','Quarterly','6 Month(s)'];
var CONST_KEY_UTILITIES_CAL_LOAN_BGN = ['1','2','3'];

/* ngocdt3 commet bo lua chon Đã nhận 1 phần quà, đổi value từ all y n -> x, a, i*/
var CONST_KEY_GIFT_XCHNG_HIS_STATUS_VN = ['Tất cả', 'Đã nhận quà', 'Chưa nhận quà'];
var CONST_KEY_GIFT_XCHNG_HIS_STATUS_EN = ['All', 'Full received', 'Not received yet'];
var CONST_KEY_GIFT_XCHNG_HIS_STATUS_VAL = ['X', 'A', 'I'];

/*** DEFINE PERIODIC ACCOUNT TYPE ***/
var CONST_MNG_VAL_PERIODIC_LOCAL = ['ALL','LOCAL', 'INTERNAL'];
var CONST_MNG_KEY_PERIODIC_LOCAL_VN = ['Tất cả','Tài khoản khác của khách hàng', 'Tài khoản TPBank khác'];

var CONST_BANK_SCHEDULE_MNG_VN = ['Rút tiền mặt tại quầy', 'Hẹn gặp tư vấn viên'];
var CONST_BANK_SCHEDULE_MNG_EN = ['Cash withdrawal at TPBank branch', 'Make an appointment with TPBank officers'];

var CONST_MNG_KEY_PERIODIC_LOCAL_EN = ['All','My account', 'Another account in TPB'];
var CONST_MNG_VAL_PERIODIC_FREQUENCY = ['ALL','date', 'week', 'month', 'year'];
var CONST_MNG_KEY_PERIODIC_FREQUENCY_VN = ['Tất cả','Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Hàng năm'];
var CONST_MNG_KEY_PERIODIC_FREQUENCY_EN = ['All','Daily', 'Weekly', 'Monthly', 'Yearly'];
var CONST_MNG_VAL_PAYEE = ['ALL','TC', 'TH'];
var CONST_MNG_KEY_PAYEE_VN = ['Tất cả','Danh sách tin cậy', 'Danh sách cơ bản'];
var CONST_MNG_KEY_PAYEE_EN = ['All','My trustful book', 'My normal book'];
var CONST_MNG_VAL_STT = ['ALL','A', 'C'];
var CONST_MNG_KEY_STT_EN = ['All','Effective', 'Expired/ Deleted'];
var CONST_MNG_KEY_STT_VN = ['Tất cả','Hiệu lực', 'Hết hiệu lực/ Đã hủy'];
var CONST_MNG_VAL_ACC_DEB = ['ALL'];
var CONST_MNG_KEY_ACC_DEB_EN = ['All'];
var CONST_MNG_KEY_ACC_DEB_VN = ['Tất cả'];

/*** DEFINE PROVIDER FOR HOMEPHONE PAYMENT ***/
var CONST_KEY_PROVIDER_HOMEPHONE = ['Viettel', 'SST'];
var CONST_VAL_PROVIDER_HOMEPHONE = ['VTLHP', 'SSTHPBILL'];

/*** DEFINE PROVIDER FOR HOMEPHONE PAYMENT ***/

/*** DEFINE PROVIDER FOR POSTPAID PAYMENT ***/
var CONST_KEY_PROVIDER_HOMEPHONE = ['Viettel', 'Mobiphone'];
var CONST_VAL_PROVIDER_HOMEPHONE = ['VTLHP', 'SSTHPBILL'];

/*** DEFINE PROVIDER FOR POSTPAID PAYMENT ***/

/*** DEFINE ESAVING ***/

var CONST_KEY_PERIOD_ESAVING_EN = ['1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months', '6 months', '9 months', '12 months', '18 months', '24 months', '36 months'];
var CONST_KEY_PERIOD_ESAVING_VN = ['1 tuần', '2 tuần', '3 tuần', '1 tháng', '2 tháng', '3 tháng', '6 tháng', '9 tháng', '12 tháng', '18 tháng', '24 tháng', '36 tháng'];
var CONST_KEY_PERIOD_ID_ESAVING = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

var CONST_KEY_MATURITY_ESAVING_EN = ['Renew principal and interest on maturity date for same tenor', 'Renew principal on maturity date for the same tenor, receive interest by crediting my account No.', 'Do not renew, receive principal and interest by crediting my account No.'];
var CONST_KEY_MATURITY_ESAVING_VN = ['Tái tục cả gốc và lãi sang kỳ hạn mới tương đương kỳ hạn gửi ban đầu', 'Tái tục cả gốc và lãi sang kỳ hạn mới tương đương kỳ hạn gửi ban đầu, lãi chuyển vào tài khoản', 'Không tái tục, chuyển cả gốc và lãi vào tài khoản'];
var CONST_KEY_MATURITY_ID_ESAVING = ['1', '2', '3'];

var CONST_KEY_ESAVING_CHOOSE_RATE_NAME = ['Tiết kiệm hưởng lãi cuối kỳ', 'Tiết kiệm điện tử', 'Tiết kiệm hưởng lãi định kỳ'];
//var CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN = ['Savings earn interest at end of year', 'Electronic Savings', 'Regular savings earn interest'];
var CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN = ['Regular Savings Account with Interest paid at maturity', 'E-savings', 'Regular Savings Account with Interest paid periodically'];
var CONST_KEY__ESAVING_CHOOSE_RATE_ID = ['EAE', 'ESV', 'EPE'];

var CONST_DEFAULT_CURRENCY = 'VND';

/*** DEFINE ESAVING ***/
var CONST_KEY_CHANGE_INFO_ESAVING_EN = ['Change renewed directive'];
var CONST_KEY_CHANGE_INFO_ESAVING_VN = ['Đổi chỉ thị tái tục'];

/*** DEFINE TRANS ***/

var CONST_KEY_TRANS_FEE_TYPE_VN = ['Người gửi chịu phí', 'Người nhận chịu phí'];
var CONST_KEY_TRANS_FEE_TYPE_EN = ['Sender pay charge', 'Recipient pay charge'];

/*** DEFINE TRANS END ***/


/*** DEFINE FAST TRANS ***/
var CONST_KEY_FAST_TRANS_OPT_VN = ['Chuyển tiền nhanh qua số thẻ', 'Chuyển tiền nhanh qua số tài khoản'];
var CONST_KEY_FAST_TRANS_OPT_EN = ['Transfer to card number', 'Transfer to account number'];
var CONST_VAL_FAST_TRANS_OPT = ['1','2']
/*** DEFINE FAST TRANS END ***/
/*** VIEW FUNDSTRANSFER ***/

//TUANNM5 ADDED NEW TYPE TRANSFER
/*var CONST_KEY_TRANS_MODE_VN = ['Chuyển tiền liên ngân hàng', 'Chuyển tiền trong TPBank', 'Chuyển nhanh qua thẻ', 'Chuyển nhanh qua tài khoản', 'Chuyển tiền định kỳ', 'Chuyển tiền chứng khoán FPTS', 'Chuyển tiền theo danh sách'];
var CONST_KEY_TRANS_MODE_EN = ['Normal transfer to another bank\'s account', 'Transfer to TPBank\'s account', 'Realtime transfer to card', 'Realtime transfer to account', 'Schedule transfer', 'Transfer to a securities account', 'Bulk transfer'];
var CONST_VAL_TRANS_MODE = ['1','2','3','4','5','6','7']/*
//END TUANNM5 UPDATE

/*var CONST_KEY_TRANS_STATUS_VN = ['Tất cả', 'Đã thực hiện', 'Chờ xử lý', 'Giao dịch không thành công'];
var CONST_KEY_TRANS_STATUS_EN = ['All', 'Accepted', 'Pending', 'Transaction failed' ];
var CONST_VAL_TRANS_STATUS = ['1','2','3','4']*/
/*** BANK INFO MAP ***/
//ngocdt3 xem lenh chuyen tien
var CONST_KEY_TRANS_MODE_VN = ['Chuyển tiền liên ngân hàng', 'Chuyển tiền trong TPBank', 'Chuyển nhanh qua thẻ', 'Chuyển tiền định kỳ', 'Chuyển tiền chứng khoán FPTS', 'Chuyển tiền theo danh sách'];
var CONST_KEY_TRANS_MODE_EN = ['Normal transfer to another bank\'s account', 'Transfer to TPBank\'s account', 'Realtime transfer to card', 'Schedule transfer', 'Transfer to a securities account', 'Bulk transfer'];
var CONST_VAL_TRANS_MODE = ['1','2','3','5','6','7']
//ngocdt3 end
var CONST_TPB_ATM = "TPBANK";
var CONST_KEY_CITY_EN = ['Ha Noi', 'Ho Chi Minh', 'Can Tho', 'Da Nang', 'Dong Nai', 'An Giang', 'Binh Duong', 'Hai Phong'];
var CONST_KEY_CITY_VN = ['Hà Nội', 'Hồ Chí Minh', 'Cần Thơ', 'Đà Nẵng', 'Đồng Nai', 'An Giang', 'Bình Dương', 'Hải Phòng'];
var CONST_VAL_CITY =['1','2','3','4','5','6','7','8'];
var CONST_KEY_AREA_EN = ['Dong Da', 'Tan Binh', 'Ngo Quyen', 'Hai Ba Trung'];
var CONST_KEY_AREA_VN = ['Đống Đa', 'Tân Bình', 'Ngô Quyền', 'Hai Bà Trưng'];
var CONST_VAL_AREA =['1','2','3','4'];
/*** BANK INFO MAP END ***/

/*** CARD ***/
var CONST_KEY_MONTH_ID = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var CONST_KEY_YEAR_ID = ['2015','2016','2017'];
/*** CARD ***/

/*** EGOLD ***/

var CONST_TIMER_GOLD_RATE = 15;
var CONST_GROUP_PRE_TITLE = 'group';
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_NAME = ['Tất cả', 'Bán vàng', 'Mua vàng'];
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_NAME_EN = ['All', 'Sell gold', 'Buy gold'];
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_ID = ['0', '2', '4'];

var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_NAME = ['Tất cả', 'Vàng miếng SJC', 'Vàng nhẫn Doji'];
var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_NAME_EN = ['All', 'SJC', 'DOJI'];
var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_ID = ['0', '1', '2'];

var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_NAME = ['Tất cả', 'Internet Banking', 'Mobile Banking', 'Tại quầy'];
var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_NAME_EN = ['All', 'Internet Banking', 'Mobile Banking', 'Counter'];
var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_ID = ['0', '1', '2', '3'];

var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_NAME = ['Tất cả', 'Giá bán', 'Giá mua'];
var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_NAME_EN = ['All', 'Rate sell', 'Rate buy'];
var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_ID = ['0', '4', '2'];

/*** EGOLD END ***/
var CONST_VALUE_TRANS_BY_LIST = ['Chuyển tới tài khoản TPB', 'Chuyển tới số thẻ ngân hàng khác'];
var CONST_KEY_TRANS_BY_LIST = ["TK", "TH"];

/*** CREDIT CARD REPAYMENT ***/
var CONST_KEY_REPAYMENT_OPTIONS_VN = ['Thanh toán tối thiểu', 'Toàn bộ dư nợ đến thời điểm hiện tại', 'Toàn bộ dư nợ trong sao kê', 'Thanh toán tùy chọn'];
var CONST_KEY_REPAYMENT_OPTIONS_EN = ['Minimum repayment', 'Current debt total', 'On-statement debt total', 'Falcutative repayment'];

/*Dungnt11.fsoft*/
var CONST_KEY_CHANGE_INFO_GENDER_EN = [ 'Male', 'Female']
var CONST_KEY_CHANGE_INFO_GENDER_VN = [ 'Nam','Nữ'];
var CONST_KEY_CHANGE_INFO_GENDER_ID = ['1','2'];

/*ducnm2.fsoft*/
var CONST_KEY_CHANGE_INFO_DEL_CUS_EN = [ 'OK', 'Cancel'];
var CONST_KEY_CHANGE_INFO_DEL_CUS_VN = [ 'Có','Không'];
var CONST_KEY_CHANGE_INFO_DEL_CUS_ID = ['1','2'];

var CONST_KEY_CHANGE_INFO_INCOME_EN = [ 'Below 3 milion/month', 'From 3-5 milion/month', 'Above 5 milion-10 milion/month', 'Above 10 milion-20 milion/month', 'Above 20 milion/month'];
var CONST_KEY_CHANGE_INFO_INCOME_VN = [ 'Dưới 3 triệu/tháng', 'Từ 3-5 triệu/tháng', 'Từ 5-10 triệu/tháng', 'Từ 10-20 triệu/tháng', 'Trên 20 triệu/tháng'];
var CONST_KEY_CHANGE_INFO_INCOME_ID = ['1', '2', '3', '4', '5'];

var CONST_KEY_CHANGE_INFO_ENTER_EN  = ['Enter information of an introduced person','Upload the list of introduced persons'];
var CONST_KEY_CHANGE_INFO_ENTER_VN = ['Nhập thông tin người được giới thiệu','Tải danh sách người được giới thiệu'];
var CONST_KEY_CHANGE_INFO_ENTER_ID  = ['1','2'];

/***** Mẫu người thự hưởng *****/
var    CONST_PAYEE_LOCAL_TRANSFER         = 'LOCALTRAN';
var    CONST_PAYEE_INTER_TRANSFER         = 'INTERTRAN';
var    CONST_PAYEE_FPTS_TRANSFER          = 'FPTSTRAN';
var    CONST_PAYEE_PERIODIC_TRANSFER      = 'PERDTRAN';
var    CONST_PAYEE_TOPUP                  = 'TOPUP';
var    CONST_PAYEE_EVN_HCM                = 'EVN-HCM';
var    CONST_PAYEE_CARD_TRANSFER          = 'CARDTRAN';
var    CONST_PAYEE_FAST_TRANS_CARD		  = 'CARDTRANQ';
var    CONST_PAYEE_FAST_TRANS_ACCNO		  = 'ACCTRANQ';
//ngocdt3 them cho thanh toan tu dong
var    CONST_PAYEE_AUTO_BILLING			  = 'AUTOBILL';
//ngocdt3 them cho thanh toan tu dong
var    CONST_PAYEE_INTER_COMBO		  		= 'INTERFASTTRAN';


//Change repayment account
var CONST_KEY_CHANGE_CONFIRM_EN = ['No' ,'Yes'];
var CONST_KEY_CHANGE_CONFIRM_VN = ['Không' ,'Có'];
var CONST_KEY_CHANGE_CONFIRM_ID = ['1' , '2'];

/*** DEFINE ACCOUNT HISTORY ***/

var CONST_HIS_MONEYFLOW_TYPE_VN = ['Tất cả', 'Ghi nợ', 'Ghi có'];
var CONST_HIS_MONEYFLOW_TYPE_EN = ['All', 'Debit', 'Credit'];
var CONST_HIS_MONEYFLOW_TYPE_ID = ['ALL', 'D', 'C'];
var CONST_HIS_TRANS_TYPE_VN = ['Tất cả', 'Chuyển tiền tới ngân hàng khác', 'Chuyển tiền nội bộ TPBank', 'Giao dịch khác'];
var CONST_HIS_TRANS_TYPE_EN = ['All', 'Transfer to other\'s bank', 'Transfer to TPBank\'s account', 'Others'];
var CONST_HIS_TRANS_TYPE_ID = ['ALL', 'LIEN_NGAN_HANG', 'NOI_BO', 'OTHERS'];

var CONST_HIS_TRANS_TYPE_TEMP_VN = ['Tất cả', 'Chuyển tiền nội bộ TPBank', 'Chuyển tiền tới ngân hàng khác'];
var CONST_HIS_TRANS_TYPE_TEMP_EN = ['All', 'Internal', 'To another Vietnamese bank\'s account'];
/*** DEFINE ACCOUNT HISTORY ***/

/*** DEFINE CREDIT HISTORY ***/

var CONST_HIS_CREDIT_TRANS_TYPE_VN = ['Tất cả', 'Thanh toán trực tiếp', 'Thanh toán trực tuyến', 'Rút tiền'];
var CONST_HIS_CREDIT_TRANS_TYPE_EN = ['All', 'Direct payment', 'Online payment', 'Withdrawal'];
var CONST_HIS_CREDIT_TRANS_TYPE_ID = ['All', 'TT', 'TI', 'WT'];

/*** DEFINE CREDIT HISTORY END ***/

/*** DEFINE CARD LOCK ***/

var CONST_CARD_LOCK_TYPE_VN = ['Thẻ tín dụng quốc tế - Visa Credit', 'Thẻ ghi nợ quốc tế - Visa Debit', 'Thẻ ATM','Thẻ tín dụng quốc tế - Master Credit'];
var CONST_CARD_LOCK_TYPE_EN = ['Visa credit', 'Visa debit', 'ATM', 'Master Credit'];
var CONST_CARD_LOCK_TYPE_ID = ['C', 'D', 'A', 'M'];

/*** DEFINE CARD LOCK END ***/

/*** TUANNM5 ***/
var CONST_KEY_JUMBO_TRANS_TYPE_VN = ['Đăng ký tiết kiệm tự động', 'Đổi thông tin tiết kiệm tự động']
var CONST_KEY_JUMBO_TRANS_TYPE_EN = ['Register for Auto savings', 'Change Auto savings information']
//var CONST_KEY_JUMBO_EN = ['Beneficiaries do not save contacts','Save the list of beneficiaries', 'Save sample 
/*** END TUANNM5 ***/
/*ngocdt3 them cho tk gui gop */
var CONST_KEY_SAVING_TYPE_VN = ['Tiết kiệm điện tử', 'Tiết kiệm gửi góp']
var CONST_KEY_SAVING_TYPE_EN = ['EN_Tiết kiệm điện tử', 'EN_Tiết kiệm gửi góp']
var CONST_KEY_SAVING_TYPE_ID = ['1', '2']

var CONST_KEY_FUTURE_SAVING_TYPE_VN = ['Gửi góp định kỳ', 'Gửi góp linh hoạt']
var CONST_KEY_FUTURE_SAVING_TYPE_EN = ['EN_Gửi góp định kỳ', 'EN_Gửi góp linh hoạt']
var CONST_KEY_FUTURE_SAVING_TYPE_ID = ['P', 'A']

var CONST_VAL_ESAVING_FREQUENCY = ['T30', 'T60', 'T90'];
var CONST_KEY_ESAVING_FREQUENCY_VN = ['Hàng tháng', 'Mỗi 2 tháng', 'Mỗi 3 tháng'];
var CONST_KEY_ESAVING_FREQUENCY_EN = ['Monthly', '2 months', '3 months'];

/* ngocdt3 end*/
/*ngocdt3 them cho thanh toan tu dong */
var CONST_VAL_AUTO_BILLING_PROC = ['0', '1', '2'];
var CONST_KEY_AUTO_BILLING_PROC_VN = ['Mobifone', 'Viettel', 'Vinaphone'];
var CONST_KEY_AUTO_BILLING_PROC_EN = ['Mobifone', 'Viettel', 'Vinaphone'];

/*ngocdt3 end */
/*ngocdt3 them cho tk gui gop */
var CONST_KEY_SAVING_ONL_TYPE_VN = ['Tiết kiệm điện tử', 'Tiết kiệm Tài lộc điện tử']
var CONST_KEY_SAVING_ONL_TYPE_EN = ['E-Saving', 'Tai Loc Online']
var CONST_KEY_SAVING_ONL_TYPE_ID = ['1', '2']
/*ngocdt3 them cho quy hoach menu*/
var CONST_KEY_TRANS_INTER_VN = ['Chuyển tiền thông thường', 'Chuyển tiền nhanh'];
var CONST_KEY_TRANS_INTER_EN = ['Normal transfer', 'Real-time transfer'];
var CONST_VAL_TRANS_INTER = ['1','2']
//ngocdt3 bo sung cho auto saving
var CONST_KEY_ASV_TRANS_TYPE_VN = ['Đổi thông tin tiết kiệm tự động','Rút/Tất toán tiết kiệm tự động'];
var CONST_KEY_ASV_TRANS_TYPE_EN = ['Change Auto savings information','EN_Rút/Tất toán tiết kiệm tự động'];
var CONST_VAL_ASV_TRANS_TYPE = ['1','2']