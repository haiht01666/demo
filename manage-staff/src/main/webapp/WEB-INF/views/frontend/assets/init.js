/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */

 
 function loaded() {
	//alert(JSON.stringify(bowser, null, '    ')); //check browser
	
	//add listener PhoneGap
	if(!CONST_BROWSER_MODE) {
		loadPhoneGapJS();
		document.addEventListener("deviceready", onDeviceReady, true);
	}
	
	//Neu khong phai la mobile thi chuyen WAP--> WEB
	if(!Environment.isMobile()) {
		CONST_APP_NAME = CONST_APP_WEB_CONFIG;
		
	}else{
        if(Environment.isAndroid()){
            CONST_APP_NAME = CONST_APP_ANDROID_CONFIG;
        }else if (Environment.isIOS()){
            CONST_APP_NAME = CONST_APP_IPHONE_CONFIG;
        }
    }
	
	//set time out
	setTimerCheckLogout();
	
	//disable right click
	 if (document.layers)
	 {
		 document.captureEvents('mousedown');
		 document.onmousedown=clickNS;
	 }
	 else
	 {
		 document.onmouseup=clickNS;
		 document.oncontextmenu=clickIE;
	 }
	
	//get language config
	gUserInfo.lang = getLanguageConfig();
	initLanguageOnIB();
	
	//store raw menu
	//gMenuRawData = document.getElementById('menu-section').innerHTML;
	//changeLanguageInNodeWithClass('langNoStyle');


	// SangNt1 ---- evtEBNativeInfo

	document.addEventListener('evtEBNativeInfo', function (e) {
        if(e[0] == "REGISTER_TOKEN"){
			
            var arrayArgs = new Array();
            arrayArgs.push(e[1]);
			
			if(e[2] != 'undefined' || e[2] == null){
				arrayArgs.push(device.uuid);
				gDeviceTokenPush = device.uuid;
			}
			else{
				arrayArgs.push(e[2]);
				gDeviceTokenPush = e[2];
			}
                        
            if(gDeviceTokenPush == null)
                gDeviceTokenPush = "";

            localStorage.gDeviceTokenPush = gDeviceTokenPush;
			

            /*var divNotifi = document.getElementById("notification-id");
            divNotifi.setAttribute("onClick","window.open('./index-non-ebank.html?menu=notification&devtoken="+ gDeviceTokenPush +"','_self');");*/
            requestBacgroundMBService('CMD_TYPE_POST_DEVICE_TOKEN', arrayArgs, eventNativeInfoSuccess, eventNativeInfoFail);
        }else if(e[0]=="OPEN_NOTIFICATION"){

            openLinkInWindows(e[1]);
            var arrayArgs = new Array();
            arrayArgs.push(gDeviceTokenPush);
            arrayArgs.push(e[2]);
            arrayArgs.push("R");
            requestBacgroundMBService('CMD_TYPE_READ_NOTIFICATION', arrayArgs, eventNativeInfoSuccess, eventNativeInfoFail);
        }



	}, false);

    function eventNativeInfoSuccess(e){
        console.log("eventnativeInfoSuccess"+e);
        getCountDataNotificationUnread();

    }
    function eventNativeInfoFail(e){
        console.log("eventNativeInfoFail"+e);
    }




    //End SangNt1 ---- evtEBNativeInfo

	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, false);
	applyDynamicCommonStyleSheet();
	if (hasPageJS) applyDynamicPageStyleSheet(false);
	
	//navController.setDefaultPage('login-scr');
	navController.initWithRootView('login-scr', true);
	
	content = new slideInMenu('mainview', false);
	contentPromotion = new slideInMenu('mainview', false, true);
	//promotionSection.style.display = 'block';
	//updatePromotionView();
	
	HandleTouchEvent();	
	updateMainContentWidth();
	
	/*if(CONST_DESKTOP_MODE) {
		(function() {
			//var startingTime = new Date().getTime();
			// Load the script
			var script = document.createElement("SCRIPT");
			script.src = './assets/libs/jquery.js';
			script.type = 'text/javascript';
			document.getElementsByTagName("head")[0].appendChild(script);
			
			// Poll for jQuery to come into existance
			var checkReady = function(callback) {
				if (window.jQuery) {
					callback(jQuery);
				}
				else {
					window.setTimeout(function() { 
						checkReady(callback); 
					}, 20);
				}
			};
		
			// Start polling...
			checkReady(function($) {
				$(function() {
					//var endingTime = new Date().getTime();
					//var tookTime = endingTime - startingTime;
					//window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
				});
			});
		})();
	}*/
	
	//3D touch event
	document.addEventListener("evtTouch3D", quickActionTouch3D, true);

	
	//neu la iPad thi chuyen icon phone thanh icon chat
	if(isIPad) {
		document.getElementById('mainlayoutfooter').getElementsByClassName('callsupport')[0].innerHTML = document.getElementById('pageFooter').getElementsByClassName('callsupport')[0].innerHTML;
	}
	//load menu
	//var menuXsl = getCachePageXsl('role/menu-role');
	//genHTMLStringWithXML('', menuXsl, function(oStr){
		//var tmpMenuNode = document.getElementById('menu.slideview');
		//tmpMenuNode.innerHTML = oStr;
		//store raw menu
		gMenuRawData = document.getElementById('menu-section').innerHTML;
		//gJumboMenuElements = document.getElementById('wrapper_jumboAcc').innerHTML;
		//gAccInfoMenuElements = document.getElementById('wrapper_mAccInfo').innerHTML;
		applyDynamicCommonStyleSheet();
		changeLanguageInNodeWithClass('langNoStyle');
	//});
	
	
	
	//Load config and libs
	loadjscssfile('./assets/libs/calendar/datepicker.css', 'css');
	loadjscssfile('./assets/libs/calendar/datepicker.js', 'js');
	loadjscssfile('./assets/libs/slip.js', 'js');
	
	//HuyNT2: Check page load ready
	/*var timerCheckPageReady = window.setInterval(checkPageReady, 500);
	var timerTimeOutConnect = 0;
    function checkPageReady() {
        if (document.getElementsByTagName('body')[0] !== undefined && currentPage !== undefined && CONST_APP_NAME !== undefined && gUserInfo !== undefined && document.getElementById('current_md5_capcha') !== undefined) {
			window.clearInterval(timerCheckPageReady);
			document.getElementById('bodyPage').style.display = 'block';
			document.getElementById('loadingPage').style.display = 'none';
			document.getElementById('loadingPage').innerHTML = '';
        }
		else {
			if (timerTimeOutConnect > 60) {
				window.clearInterval(timerCheckPageReady);
				document.getElementById('loadingPage').innerHTML = "<div style='color: #F1F1F1; font-size: 125%; margin-top: 30%;'>Connection to server timed out</div>";
			}
			timerTimeOutConnect++;
		}
    }*/
    // Sangnt1 ------ getCount Notification
    getCountDataNotificationUnread();
    var getCountPush = setInterval(function(){
        getCountDataNotificationUnread();
    },1*60000);


}

//3D touch event
function quickActionTouch3D(e) {
	//document.removeEventListener('evtTouch3D', quickActionTouch3D, false);
	
	if (e[0] == 'shortcut_1') {
		logout();
	} else if (e[0] == 'shortcut_2') {
		var pinpadDiv = document.getElementById("div-pinpad");
		if(pinpadDiv != null){
			pinpadDiv.style.display = "none";
		}
		showSlidePromotion();
	} else if (e[0] == 'shortcut_3') {
		showLoadingMask();
		displayPromotionSection(false);
		displayMenuSection(false);
		setTimeout(function(){
			window.open('./index-non-ebank.html?menu=rate&ver=app','_self');
		}, 500);
	} else if (e[0] == 'shortcut_4') {
		showLoadingMask();
		displayPromotionSection(false);
		displayMenuSection(false);
		setTimeout(function(){
			window.open('./index-non-ebank.html?menu=branch&ver=app','_self');
		}, 500);
	}
	THEBTouchID.received3DTouch('abc', function() {
	
	}, function() {
	
	});
}

function reloadTopBanner(){
	var tmpTopBanner = "";
	for (var k=0; k<bannersTPBank.topBanner.length; k++) {
		if(gUserInfo.lang == 'EN') {
			tmpTopBanner += '<a href="' + bannersTPBank.topBanner[k].bannerLinkEN + '"> <img src="' + bannersTPBank.topBanner[k].bannerImageEN + '" alt="" /> </a>';
		}
		else {
			tmpTopBanner += '<a href="' + bannersTPBank.topBanner[k].bannerLinkVN + '" target="_blank"> <img src="' + bannersTPBank.topBanner[k].bannerImageVN + '" alt="" /> </a>';
		}
	}
}

/*function closeBannerSuggestApp() {
	document.getElementById('banner-suggest-id').style.display = 'none';
}*/

function downloadAppSelectionOK() {
	downloadAppSelectionCancel();
	setAgreeDownloadApp('Y');
	if(Environment.isIOS() && !Environment.isWindows()) {
		openLinkInWindows(CONST_WEB_URL_LINK + 'app/');
	}
	else if(Environment.isAndroid()) {
		openLinkInWindows(CONST_WEB_URL_LINK + 'app/');
	}
	
}
function downloadAppSelectionCancel() {
	setAgreeDownloadApp('N');
	document.removeEventListener('alertAppConfirmOK', downloadAppSelectionOK, false);
	document.removeEventListener('alertAppConfirmCancel', downloadAppSelectionCancel, false);
}

function successMenuNewsCallback(oStr){
	var tabh = document.getElementById("promotion.slideview");
	tabh.innerHTML = oStr;
	
	if(navigator.userAgent.match(/firefox/i)){
		var cat = document.getElementsByName("nm.category");
		for(var i = 0; i < cat.length; i++){
		    cat[i].style.marginTop = "15px"
		}
	}
	//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
	//applyDynamicPromotionWithNumOfItems(10);
}

function failMenuNewsCallback(){
	
}

function requestQuickPromotionSuccess(e) {
	var tmpRespObj = parserJSON(e, false);
	if (tmpRespObj.arguments && tmpRespObj.arguments.length > 0) {
		logInfo('recevice promotion category: ' + tmpRespObj.arguments[0]);
		var docXml = stringtoXML(tmpRespObj.arguments[0]);
		var docXsl = getCachePageXsl("newsxsl/list_news_cat_menu_scr");		
		genHTMLStringWithXML(docXml, docXsl, successMenuNewsCallback, failMenuNewsCallback);
	}
}

function requestQuickPromotionFail(e) {
	
}

document.addEventListener('DOMContentLoaded', function () {
	setTimeout(loaded, 100);
	
}, false);

var timeOutResize;
var gClientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var gClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var timeOutToChangeSize; //fix on iPad iOS6
var isModelMobileRotate = navigator.userAgent.match(/Android|BB10|iPhone|iPod|iPad|WPDesktop|IEMobile/i);
window.onresize = function (e) {
	
	if(timeOutResize) {
		clearTimeout(timeOutResize);
		timeOutResize = null;
	}
	var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
	var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
	//alert('Size' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
	if(((gClientHeight == currentClientHeight) || (gClientWidth == currentClientWidth)) && isModelMobileRotate) {
		//alert('not resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
		return;
	}
	else {
		if(timeOutToChangeSize && !isModelMobileRotate) {
			clearTimeout(timeOutToChangeSize);
			timeOutToChangeSize = null;
			if(navigator.userAgent.match(/(iPhone|iPad|iPod)\sOS\s6/.test(navigator.userAgent))) {
				return;//fix on iPad iOS6
			}
		}
		//alert('resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
		gClientHeight = currentClientHeight;
		gClientWidth = currentClientWidth;
	}
	
	var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
	if(tmpWP) {
		//alert('2' + e.type + ' - ' + navigator.userAgent);
		//document.activeElement.blur(); //hidden keyboard
		var tmpArrInputNote = document.getElementsByTagName('input');
		if(tmpArrInputNote && tmpArrInputNote.length > 0) {
			for (var i = 0; i < tmpArrInputNote.length; i++) {
				if(tmpArrInputNote[i])
					tmpArrInputNote[i].blur();
			}
		}
		updateMainContentWidth(currentClientWidth, currentClientHeight);	
		setTimeout(function(e) {
			
			applyDynamicCommonStyleSheet();
			applyDynamicPageStyleSheet(true);
			applyVerticalScrollPage(true, -80);
			//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
			//applyDynamicPromotionWithNumOfItems(10);
			setTimeout(function(){
				if(typeof(window['viewChangedSize']) == 'function') {
					window['viewChangedSize']();
				}
			}, 100);
		}, 100);
		
	}
	else {
		updateMainContentWidth(currentClientWidth, currentClientHeight);	
		timeOutToChangeSize = setTimeout(function(e){ //fix on iPad iOS6
			//alert('bcm.1');
			clearTimeout(timeOutToChangeSize);
			timeOutToChangeSize = null;
			
			applyDynamicCommonStyleSheet();
			applyDynamicPageStyleSheet(true);
			applyVerticalScrollPage(true, -80);
			//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
			//applyDynamicPromotionWithNumOfItems(10);
			setTimeout(function(){
				if(typeof(window['viewChangedSize']) == 'function') {
					window['viewChangedSize']();
				}
			}, 100);
		}, 200);
		
	}
}
//RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';
if('onorientationchange' in window) {
	window.addEventListener('orientationchange', function(e) {
		//alert('4' + e.type + ' - ' + navigator.userAgent);
		timeOutResize = setTimeout(function(){
			if(timeOutResize) {
				clearTimeout(timeOutResize);
				timeOutResize = null;
			}
			var currentClientHeight = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
			var currentClientWidth = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
			
			if((gClientHeight && gClientHeight == currentClientHeight) || (gClientWidth && gClientWidth == currentClientWidth)) {
				return;
			}
			else {
				gClientHeight = currentClientHeight;
				gClientWidth = currentClientWidth;
			}
			
			var tmpWP1 = navigator.userAgent.match(/IEMobile|WPDesktop/i);
			if(tmpWP1) {
				//alert('3' + e.type + ' - ' + navigator.userAgent);
				var tmpArrInputNote = document.getElementsByTagName('input');
				if(tmpArrInputNote && tmpArrInputNote.length > 0) {
					for (var i = 0; i < tmpArrInputNote.length; i++) {
						if(tmpArrInputNote[i])
							tmpArrInputNote[i].blur();
					}
				}
				updateMainContentWidth(currentClientWidth, currentClientHeight);	
				setTimeout(function(e){				
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					applyVerticalScrollPage(true, -80);
					//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
					//applyDynamicPromotionWithNumOfItems(10);
					setTimeout(function(){
						if(typeof(window['viewChangedSize']) == 'function') {
							window['viewChangedSize']();
						}
					}, 100);
				}, 200);
			}
			else {
				//alert('bcm.2');
				if((Environment.isIOS() && !Environment.isWindows()) || Environment.isAndroid()) { //except windows phone
					if(document.activeElement)
						document.activeElement.blur(); //hidden keyboard
				}
				
				var tmpArrInputNote = document.getElementsByTagName('input');
				if(tmpArrInputNote && tmpArrInputNote.length > 0) {
					for (var i = 0; i < tmpArrInputNote.length; i++) {
						if(tmpArrInputNote[i])
							tmpArrInputNote[i].blur();
					}
				}
				updateMainContentWidth(currentClientWidth, currentClientHeight);	
				setTimeout(function(e){
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					applyVerticalScrollPage(true, -80);
					//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
					//applyDynamicPromotionWithNumOfItems(10);
					setTimeout(function(){
						if(typeof(window['viewChangedSize']) == 'function') {
							window['viewChangedSize']();
						}
					}, 10);
				
				}, 100);
			}
		}, 100);
	}, true);
}

/*var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if(is_firefox) {
	replacejscssfile('./assets/mb-service.js', './other/mb-service.js', 'js');
	replacejscssfile('./assets/common.js', './other/common.js', 'js');
}*/

//handle escape page
if(CONST_BROWSER_MODE) {
	window.onbeforeunload = function (e) {
		if(gIsLogin && (gModeScreenView == CONST_MODE_SCR_SMALL)){
			var e = e || window.event;
			var msg = CONST_STR.get('ALERT_WARNING_BACK_ACTION');

			// For IE and Firefox
			if (e) {
				e.returnValue = msg;
			}
			// For Safari / chrome
			return msg;
		}
	 };
	document.onkeydown = function(e) {
		if(gIsLogin && (gModeScreenView != CONST_MODE_SCR_SMALL)){
			var key;
			if (window.event) {
				key = event.keyCode
			}
			else {
				var unicode = e.keyCode ? e.keyCode : e.charCode
				key = unicode
			}
			switch (key) {//event.keyCode
				case 116: //F5 button
					if (event.ctrlKey) return true; //enable Crlt+F5 for testing
					event.returnValue = false;
					key = 0; //event.keyCode = 0;
					return false;
				case 82: //R button
					if (event.ctrlKey) {
						event.returnValue = false;
						key = 0; //event.keyCode = 0;
						return false;
					}
					else return true;
				case 91: // ctrl + R Button
					event.returnValue= false;
					key=0;
					return false;
			}
		}
	}
}
else {
	//using cordovar lib
	//app.initialize();
    var numPressToExit = 0;
    var numPressedTime;
	
	//var gDeviceStatus;
    //document.addEventListener("deviceready", onDeviceReady, true);
    function onDeviceReady() {
        //alert('Device ready!');
		//alert('Loaded Phonegap: ' + device.name + ' UUID: ' + device.uuid);
		/*alert('Device Name: '     + device.name     + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />');*/
		gDeviceToken = device.uuid;
		
		THEBTouchID.init3DTouch('abc', function() {
		
		}, function() {
		
		});
		startupAppCheckVersion();
		Alert.alert('abc', 'def', 'Huynt2', null);
		function getPhoneGapPath() {
			var path = window.location.pathname;
			var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
			phoneGapPath = (phoneGapPath.length > 5)? phoneGapPath: "";
			phoneGapPath = (phoneGapPath.indexOf("http://") != -1)? phoneGapPath: "";
			return phoneGapPath;
		};
		gDeviceWWWFolder = getPhoneGapPath();
		//alert("path: " + gDeviceWWWFolder);
		
        document.addEventListener("backbutton", onBackKeyDown, true);
        document.addEventListener("menubutton", menuKeyDown, true);
    }
	
    function onBackKeyDown() {
		//close alert
		closealert();
		closeAlertConfirm(false);
		closeAlertConfirmScheduleBank(false);
		closealertKHCN_KHDN_TERMS();
		closealertKHCN_KHDN_INSTRUCTION();
		closealertKHCN_KHDN_FAQ();
		//closeDialog(document.getElementById('dialog-backgroundtrans'));
		//document.getElementById('mask-blacktrans').click();
		
        if (numPressToExit > 1) {
			numPressToExit = 0;
			clearTimeout(numPressedTime);
            showAlertConfirmText(CONST_STR.get('ALERT_CONFIRM_EXIT_APP'));
            document.addEventListener("alertConfirmOK", function (e) {
                document.removeEventListener("alertConfirmOK");
                if (navigator.app && navigator.app.exitApp) {
                    navigator.app.exitApp();
                } else if (navigator.device && navigator.device.exitApp) {
                    navigator.device.exitApp();
                }
            }, true);
        }
        else {
            numPressToExit++;
			if(numPressedTime != undefined) {
				clearTimeout(numPressedTime);
			}
            numPressedTime = setTimeout(function () {
                numPressToExit = 0;
            }, 2000);
			
			if(checkTouchLocked()) return; //disable back button when show alert, loading, dialog
			if(navArrayScr && navArrayScr.length < 2) {
				showSlideMenu();
			}
			else {
            	navController.popView(true);
			}
        }
        return false;
    }
    
    function menuKeyDown() {
        if (gIsLogin) {
            setTimeout(function () {
                //content.toggle();
				showSlideMenu();
            }, 200);
        }
    }
	
	
	
}


//Sangnt1 request lấy số lượng notification chưa đọc

function getCountDataNotificationUnread(){
    if(gDeviceTokenPush == null || gDeviceTokenPush ==""  ){
        if(localStorage.gDeviceTokenPush == null || localStorage.gDeviceTokenPush==""||localStorage.gDeviceTokenPush.length==0 )
			{	
				if(typeof device !== 'undefined'){
					if(device == null || device.uuid == null || device.uuid == "" ||  device.uuid.length == 0)
						return;
					else
						gDeviceTokenPush = device.uuid;
				}else{
					return;
				}
			}
        else
            gDeviceTokenPush = localStorage.gDeviceTokenPush;
    }

    var arrayArgs = new Array();
    if(gDeviceTokenPush == null || gDeviceTokenPush == "" || gDeviceTokenPush.length == 0){
        return;
    }

    arrayArgs.push(gDeviceTokenPush);
    requestBacgroundMBService('CMD_TYPE_GET_LIST_NOTIFICATION', arrayArgs, requestMBServiceCountNotificationSuccess, requestMBServiceCountNotificationFail);


}
function requestMBServiceCountNotificationSuccess(e){

    countUnreadNotification = 0;
    if(e != ""){
        var arrContent = JSON.parse(e).arguments;
        var length = arrContent.length;
        var content;
        for(i=0;i<length;i++){

            content = arrContent[i].split("#");
            if(content[6].trim() == 0){
                countUnreadNotification += 1;
            }

        }
    }


    bindCountUnreadNotification(countUnreadNotification);


}
function requestMBServiceCountNotificationFail(e){

    bindCountUnreadNotification(0);

}
function bindCountUnreadNotification(count){
    var divNotifi = document.getElementById("notifi-number-top");
    var divNotifiWeb = document.getElementById("notifi-number-web");
    if(count == 0|| count == null){
        divNotifi.style.visibility = "hidden";
        divNotifiWeb.style.visibility = "hidden";
        //var divNoti = document.getElementById("notifi-number");
        //if(divNoti!=null)
        //    divNoti.style.visibility = "hidden";
    }else{
        //var liNotifi = document.getElementById("notification/list_notification_src");
        //if(liNotifi != null){

         //   if(liNotifi.getElementsByClassName("icon-number-notifi")[0]==null){
         //       var element = document.createElement("div");
         //       element.setAttribute("id","notifi-number");
         //       element.setAttribute("class","icon-number-notifi");
         //       liNotifi.appendChild(element);
         //   }
        //}
		
        divNotifi.style.visibility = "visible";
        divNotifi.innerHTML = count;
        divNotifiWeb.style.visibility = "visible";
        divNotifiWeb.innerHTML = count;
       // var divNoti = document.getElementById("notifi-number");
       //if(divNoti != null){
       //    divNoti.style.visibility = "visible";
       //     divNoti.innerHTML = count;
       // }

    }

}

//end Sangnt1 request lấy số lượng notification chưa đọc

/*SANGNT1 Set onclick for action notification*/
function onClickActionNotification(){

    if(gIsLogin==true){
        navController.initWithRootView('notification/list_notification_scr', true, 'xsl');
        /*window.open('./index.html?menu=notification','_self');*/

    }else{

        window.open('./index-non-ebank.html?menu=notification','_self');
    }
}

/*End onclick action notification*/