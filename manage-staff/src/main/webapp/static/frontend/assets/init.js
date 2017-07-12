/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */


function loaded() {
    //alert(JSON.stringify(bowser, null, '    ')); //check browser

    //add listener PhoneGap
    if (!CONST_BROWSER_MODE) {
        loadPhoneGapJS();
        document.addEventListener("deviceready", onDeviceReady, true);
    }

    //Neu khong phai la mobile thi chuyen WAP--> WEB
    if (!Environment.isMobile()) {
        CONST_APP_NAME = CONST_APP_WEB_CONFIG;

    } else {
        if (Environment.isAndroid()) {
            CONST_APP_NAME = CONST_APP_ANDROID_CONFIG;
        } else if (Environment.isIOS()) {
            CONST_APP_NAME = CONST_APP_IPHONE_CONFIG;
        }
    }

    //set time out
    setTimerCheckLogout();

    //disable right click
    if (document.layers) {
        document.captureEvents('mousedown');
        document.onmousedown = clickNS;
    }
    else {
        document.onmouseup = clickNS;
        document.oncontextmenu = clickIE;
    }

    //get language config
    gUserInfo.lang = getLanguageConfig();
    initLanguageOnIB();

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
    applyDynamicCommonStyleSheet();
    if (hasPageJS) applyDynamicPageStyleSheet(false);

    navController.initWithRootView('login-scr', true);

    content = new slideInMenu('mainview', false);
    contentPromotion = new slideInMenu('mainview', false, true);

    HandleTouchEvent();
    updateMainContentWidth();


    //neu la iPad thi chuyen icon phone thanh icon chat
    if (isIPad) {
        document.getElementById('mainlayoutfooter').getElementsByClassName('callsupport')[0].innerHTML = document.getElementById('pageFooter').getElementsByClassName('callsupport')[0].innerHTML;
    }
    gMenuRawData = document.getElementById('menu-section').innerHTML;
    applyDynamicCommonStyleSheet();
    changeLanguageInNodeWithClass('langNoStyle');

    //Load config and libs
    loadjscssfile('./static/frontend/assets/libs/calendar/datepicker.css', 'css');
    loadjscssfile('./static/frontend/assets/libs/calendar/datepicker.js', 'js');
    loadjscssfile('./static/frontend/assets/libs/slip.js', 'js');
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

    if (timeOutResize) {
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
    if (((gClientHeight == currentClientHeight) || (gClientWidth == currentClientWidth)) && isModelMobileRotate) {
        //alert('not resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
        return;
    }
    else {
        if (timeOutToChangeSize && !isModelMobileRotate) {
            clearTimeout(timeOutToChangeSize);
            timeOutToChangeSize = null;
            if (navigator.userAgent.match(/(iPhone|iPad|iPod)\sOS\s6/.test(navigator.userAgent))) {
                return;//fix on iPad iOS6
            }
        }
        //alert('resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
        gClientHeight = currentClientHeight;
        gClientWidth = currentClientWidth;
    }

    var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
    if (tmpWP) {
        //alert('2' + e.type + ' - ' + navigator.userAgent);
        //document.activeElement.blur(); //hidden keyboard
        var tmpArrInputNote = document.getElementsByTagName('input');
        if (tmpArrInputNote && tmpArrInputNote.length > 0) {
            for (var i = 0; i < tmpArrInputNote.length; i++) {
                if (tmpArrInputNote[i])
                    tmpArrInputNote[i].blur();
            }
        }
        updateMainContentWidth(currentClientWidth, currentClientHeight);
        setTimeout(function (e) {

            applyDynamicCommonStyleSheet();
            applyDynamicPageStyleSheet(true);
            applyVerticalScrollPage(true, -80);
            //applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
            //applyDynamicPromotionWithNumOfItems(10);
            setTimeout(function () {
                if (typeof(window['viewChangedSize']) == 'function') {
                    window['viewChangedSize']();
                }
            }, 100);
        }, 100);

    }
    else {
        updateMainContentWidth(currentClientWidth, currentClientHeight);
        timeOutToChangeSize = setTimeout(function (e) { //fix on iPad iOS6
            //alert('bcm.1');
            clearTimeout(timeOutToChangeSize);
            timeOutToChangeSize = null;

            applyDynamicCommonStyleSheet();
            applyDynamicPageStyleSheet(true);
            applyVerticalScrollPage(true, -80);
            //applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
            //applyDynamicPromotionWithNumOfItems(10);
            setTimeout(function () {
                if (typeof(window['viewChangedSize']) == 'function') {
                    window['viewChangedSize']();
                }
            }, 100);
        }, 200);

    }
}
//RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';
if ('onorientationchange' in window) {
    window.addEventListener('orientationchange', function (e) {
        //alert('4' + e.type + ' - ' + navigator.userAgent);
        timeOutResize = setTimeout(function () {
            if (timeOutResize) {
                clearTimeout(timeOutResize);
                timeOutResize = null;
            }
            var currentClientHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            var currentClientWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            if ((gClientHeight && gClientHeight == currentClientHeight) || (gClientWidth && gClientWidth == currentClientWidth)) {
                return;
            }
            else {
                gClientHeight = currentClientHeight;
                gClientWidth = currentClientWidth;
            }

            var tmpWP1 = navigator.userAgent.match(/IEMobile|WPDesktop/i);
            if (tmpWP1) {
                //alert('3' + e.type + ' - ' + navigator.userAgent);
                var tmpArrInputNote = document.getElementsByTagName('input');
                if (tmpArrInputNote && tmpArrInputNote.length > 0) {
                    for (var i = 0; i < tmpArrInputNote.length; i++) {
                        if (tmpArrInputNote[i])
                            tmpArrInputNote[i].blur();
                    }
                }
                updateMainContentWidth(currentClientWidth, currentClientHeight);
                setTimeout(function (e) {
                    applyDynamicCommonStyleSheet();
                    applyDynamicPageStyleSheet(true);
                    applyVerticalScrollPage(true, -80);
                    //applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
                    //applyDynamicPromotionWithNumOfItems(10);
                    setTimeout(function () {
                        if (typeof(window['viewChangedSize']) == 'function') {
                            window['viewChangedSize']();
                        }
                    }, 100);
                }, 200);
            }
            else {
                //alert('bcm.2');
                if ((Environment.isIOS() && !Environment.isWindows()) || Environment.isAndroid()) { //except windows phone
                    if (document.activeElement)
                        document.activeElement.blur(); //hidden keyboard
                }

                var tmpArrInputNote = document.getElementsByTagName('input');
                if (tmpArrInputNote && tmpArrInputNote.length > 0) {
                    for (var i = 0; i < tmpArrInputNote.length; i++) {
                        if (tmpArrInputNote[i])
                            tmpArrInputNote[i].blur();
                    }
                }
                updateMainContentWidth(currentClientWidth, currentClientHeight);
                setTimeout(function (e) {
                    applyDynamicCommonStyleSheet();
                    applyDynamicPageStyleSheet(true);
                    applyVerticalScrollPage(true, -80);
                    //applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
                    //applyDynamicPromotionWithNumOfItems(10);
                    setTimeout(function () {
                        if (typeof(window['viewChangedSize']) == 'function') {
                            window['viewChangedSize']();
                        }
                    }, 10);

                }, 100);
            }
        }, 100);
    }, true);
}

//handle escape page
if (CONST_BROWSER_MODE) {
    window.onbeforeunload = function (e) {
        if (gIsLogin && (gModeScreenView == CONST_MODE_SCR_SMALL)) {
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
    document.onkeydown = function (e) {
        if (gIsLogin && (gModeScreenView != CONST_MODE_SCR_SMALL)) {
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
                    event.returnValue = false;
                    key = 0;
                    return false;
            }
        }
    }
}
else {
    var numPressToExit = 0;
    var numPressedTime;

    function onDeviceReady() {
        gDeviceToken = device.uuid;

        THEBTouchID.init3DTouch('abc', function () {

        }, function () {

        });
        startupAppCheckVersion();
        Alert.alert('abc', 'def', 'Huynt2', null);
        function getPhoneGapPath() {
            var path = window.location.pathname;
            var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
            phoneGapPath = (phoneGapPath.length > 5) ? phoneGapPath : "";
            phoneGapPath = (phoneGapPath.indexOf("http://") != -1) ? phoneGapPath : "";
            return phoneGapPath;
        }
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
            if (numPressedTime != undefined) {
                clearTimeout(numPressedTime);
            }
            numPressedTime = setTimeout(function () {
                numPressToExit = 0;
            }, 2000);

            if (checkTouchLocked()) return; //disable back button when show alert, loading, dialog
            if (navArrayScr && navArrayScr.length < 2) {
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