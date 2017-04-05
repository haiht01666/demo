/**
 * Created by HuyNT2.
 * User:
 * Date: 12/17/13
 * Time: 5:35 PM
 */
setInputOnlyASCII('login.txt.password', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
var statusAccMode = false;
initLoginScr();
function initLoginScr() {
    // set to local storage
    setUserInfoToLocal('1', 'NGUYEN DINH HAN');
    setBackGround();
    statusAccMode = getUserInfoToLocal(); //get local data
    if (getURLParam('cif')) {
        statusAccMode = false;
        document.getElementById('login.txt.username').value = getURLParam('cif');
    }
    if (!statusAccMode) {
        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.style.display = 'none';
        return;
    }
    updateViewWithUserInfo(statusAccMode);
}

function viewWillUnload() {
    //flag = false;
    logInfo('view login will unload');

}

function updateViewWithUserInfo(inStatus) {

    if (inStatus && gCustomerNanme && gCustomerNanme.length > 0) {// && (getURLParam('payment') != 'order')) {
        document.getElementById('login.txt.username').style.display = 'none';
        document.getElementById('login.txt.username').value = gCustomerNo;

        document.getElementById('login.ico.username').style.display = 'none';
        document.getElementById('login.accountname').style.display = 'inherit';

        var tmpNodeAccName = document.getElementById('login.accountname');
        tmpNodeAccName.innerHTML = gCustomerNanme;

        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.innerHTML = "<span class='icon-checkbox-unchecked' style='display:table-cell;font-size:14px'></span>" + "<h5 class='login-change-user'>" + "   " + CONST_STR.get("WELCOME_CHANGE_USER") + "</h5>";
    }
    else {
        document.getElementById('login.txt.username').style.display = 'block';
        document.getElementById('login.txt.username').value = '';
        document.getElementById('login.ico.username').style.display = 'block';

        document.getElementById('login.accountname').style.display = 'none';

        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.innerHTML = "<span class='icon-checked' style='display:table-cell;font-size:14px'></span>" + "<h5 class='login-change-user'>" + "   " + CONST_STR.get("WELCOME_CHANGE_USER_OLD") + "</h5>";

    }
}

function changeModeInputAccNo() {
    var tmpStatus = getUserInfoToLocal();
    if (!tmpStatus) {
        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.style.display = 'none';
        return;
    }
    statusAccMode = !statusAccMode;
    updateViewWithUserInfo(statusAccMode);
}

//handle input
var tmpNodeUser = document.getElementById('login.txt.username');
tmpNodeUser.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);
var tmpNodePass = document.getElementById('login.txt.password');
tmpNodePass.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);

function handleSpecialKeyPressd(e) {
    var ew = e.keyPress;
    if (ew == 13) { //Enter pressed
        requestLogin();
    }
    else {
        return;
    }
}


// document.getElementById('login.txt.username').onchange = function (e) {
//     var tmpStr = document.getElementById('login.txt.username').value;
//     if (!CONST_BROWSER_MODE && tmpStr.length == 10) {
//         window.open(encodeURI(CONST_WEB_URL_LINK + '?cif=' + tmpStr), '_system');
//         /*showAlertAppText(CONST_STR.get('OPEN_CORP_SITE_ALERT_CONTENT'), CONST_STR.get('BANNER_ALERT_MOBILE_BTN_OK'), CONST_STR.get('BANNER_ALERT_MOBILE_BTN_CANCEL'));
//          document.addEventListener('alertAppConfirmOK', openEBankSiteOK, false);
//          document.addEventListener('alertAppConfirmCancel', openEBankSiteCancel, false);	*/
//     }
// }

function requestLogin() {
    if ((!statusAccMode) && (document.getElementById("login.txt.username").value.length == 0)) {
        showAlertText(CONST_STR.get("ERR_EMPTY_ACC_INPUT"));
        return;
    }

    //passing
    sendJSONRequest();

}

function goToBankInfoMainScr() {
    navController.pushToView('bankinfo/bank-info-main-scr', true);
}

function sendJSONRequest() {

    // collect the form data while iterating over the inputs
    var loginUser = document.getElementById("login.txt.username").value;
    var loginPass = document.getElementById("login.txt.password").value;

    var tmpStr = loginUser;
    if (tmpStr.length < 1) {
        showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_ACC'));
        return;
    }

    tmpStr = loginPass;
    if (tmpStr.length < 1) {
        showAlertText(CONST_STR.get('ERR_EMPTY_PASSWORD'));
        return;
    }

    if (!checkAvailableChar(tmpStr)) {
        showAlertText(CONST_STR.get('ERR_MSG_WRONG_PASSWORD_FORMAT'));
        return;
    }

    if(statusAccMode){
        loginUser = localStorage.getItem('BhipUserNumber');
    }
    loadData('./data/login.json', function (jsondata) {
        var loginInfo = JSON.parse(jsondata);
        for(var i = 0; i < loginInfo.account.length; i++){
            if(loginUser === loginInfo.account[i].accountName && loginPass === loginInfo.account[i].accountPassword){
                requestMBServiceSuccess(loginInfo.account[i]);
                return;
            }
        }
        requestMBServiceFail();
    });
}

function requestMBServiceSuccess(loginInfo) {
    removeBackGround();
    hideLoadingMask();
    gIsLogin = true;
    // set info data
    gUserInfo.accountId = loginInfo.accountId;
    gUserInfo.accountName = loginInfo.accountName;
    gUserInfo.accountDispName = loginInfo.accountDispName;
    gUserInfo.flag_check = 1;
    gUserInfo.lang = getLanguageConfig();

    // set to local storage
    setUserInfoToLocal(gUserInfo.accountName, loginInfo.accountDispName);

    //config view
    setViewOnDesktopWhenLogin();
    //navController.pushToView('accountxsl/account-change-password-scr', true, 'xsl');
    //navController.initWithRootView('utilitiesxsl/change-personal-info-scr', true, 'xsl');
    //navController.setDefaultPage('utilitiesxsl/change-personal-info-scr', 'xsl');
    navController.initWithRootView(CONST_STR.get('INDEX_PAGE'), true, 'xsl');
    navController.setDefaultPage(CONST_STR.get('INDEX_PAGE'), 'xsl');
};

//event listener: http request success
function requestMBServiceFail() {
    animationError();
};

//ngocdt3 bo sung
function showChoiceConfirmPre(e) {
    if (currentPage == "login-scr") {
        showChoiceConfirmPreClose();
        openLinkInWindows('https://ebank.tpb.vn/biz');
    }
}

function showChoiceConfirmPreClose() {
    if (currentPage == "login-scr") {
        document.removeEventListener("alertAppConfirmCancel", showChoiceConfirmPreClose, false);
        document.removeEventListener("alertAppConfirmOK", showChoiceConfirmPre, false);
    }
}

function parserLoginInfo() {

    var indx = 0;
    var numAccount = 0;
    var tmpIndx = 0;
    var tmpStr = "";
    var tmpArr = [];

    gUserInfo.sessionID = gprsResp.arguments[indx++];
    gUserInfo.accountName = gprsResp.arguments[indx++];

    //set user name
    document.getElementById('menu-profile-name').innerHTML = gUserInfo.accountName;

    gUserInfo.valicationType = gprsResp.arguments[indx++];
    if (gprsResp.arguments[indx++] == "GOLD_TERM_COMFIRMED") {
        gUserInfo.goldTermConfirmed = true;
    }
    else {
        gUserInfo.goldTermConfirmed = false;
    }
    gUserInfo.mobileNumber = gprsResp.arguments[indx++];
    gUserInfo.email = gprsResp.arguments[indx++];
    gUserInfo.userRole = gprsResp.arguments[indx++];
    numAccount = parseInt(gprsResp.arguments[indx++]);
    gUserInfo.flag_check = gprsResp.arguments[indx++];
    gUserInfo.username = gprsResp.arguments[indx++];
    //gCustomerNo =gprsResp.arguments[indx++];
    var currentCustomerNo = gprsResp.arguments[indx++];

    // DUYLK GET IDENTIFIER  + DAMNV set cmnd cho client
    var identifier = gprsResp.arguments[indx++];

    gUserInfo.identifier = identifier;
    try {
        var tokenKey = localStorage.getItem('TouchIDTokenKey');

        if (tokenKey.length > 0 && tokenKey != '-1') {
            if (gCustomerNo != currentCustomerNo) {
                gTokenKey = '-1';
                gUsingFingerprint = '0';
                gPincode = '-1';
            }
        }
    } catch (err) {
        gTokenKey = '-1';
        gUsingFingerprint = '0';
        gPincode = '-1';
    }

    gCustomerNo = currentCustomerNo;
    setUserInfoToLocal(currentCustomerNo, gUserInfo.accountName);

    //numAccount = parseInt(gprsResp.arguments[indx++]);
    var tmpArrayNotJumbo = new Array();
    var tmpArrayJumbo = new Array();
    var tmpJumboStatus = false;
    for (var i = indx; i < numAccount + indx; i++) {
        var tmpAccObj = new AccountObj();
        var rawAccInfo = gprsResp.arguments[i];
        if (!rawAccInfo || rawAccInfo.length < 2) {
            continue;
        }
        var arrayAccInfo = rawAccInfo.split("#");
        tmpAccObj.accountNumber = arrayAccInfo[0];
        tmpAccObj.description = arrayAccInfo[1];
        tmpAccObj.balance = arrayAccInfo[2];
        tmpAccObj.balanceAvailable = arrayAccInfo[3];
        tmpAccObj.currency = arrayAccInfo[4];
        tmpAccObj.descByUser = arrayAccInfo[5];
        tmpAccObj.overdraftLimit = arrayAccInfo[6];
        tmpAccObj.accClass = arrayAccInfo[7];
        tmpAccObj.udfFieldVal = arrayAccInfo[8];

        //ngocdt3 bo sung check nodebit
        tmpAccObj.nodebit = arrayAccInfo[10];
        //SangNT1 bo sung check chan ghi co
        tmpAccObj.nodecr = arrayAccInfo[11];
        if (tmpAccObj.udfFieldVal == "6") {
            tmpArrayJumbo.push(tmpAccObj);
            tmpJumboStatus = true;
            //gJumboAcc=tmpAccObj.accountNumber;
        }
        else {
            //ngocdt3 comment cho hien thi tai khoan
            <!--if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass == 'T6A001' || tmpAccObj.accClass == 'D7A000') || (tmpAccObj.currency != 'VND')) {-->
            if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass == 'D7A000') || (tmpAccObj.currency != 'VND')) {
                tmpArrayNotJumbo.push(tmpAccObj);
            }
            else {
                tmpArrayJumbo.push(tmpAccObj);
            }
        }
        //gUserInfo.accountList.push(tmpAccObj);
        //ngocdt3 comment cho hien thi tai khoan tiet kiem tu dong
        <!--if(tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'T6A001' && tmpAccObj.accClass != 'D7A000')-->
        {
            if (tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'D7A000') {
                gUserInfo.accountList.push(tmpAccObj);
                gUserInfo.accountListLocalTrans.push(tmpAccObj);
            }
            else {
                gUserInfo.accountListOther.push(tmpAccObj);
                //bo sung tai khoan D7A000 vao tai khoan nhan tien
                if (tmpAccObj.accClass == 'D7A000') {
                    gUserInfo.accountListLocalTrans.push(tmpAccObj);
                }
            }
        }
        if (tmpJumboStatus) {
            gUserInfo.accountList = tmpArrayJumbo;
            gUserInfo.accountListOther = tmpArrayNotJumbo;
        }
        indx = numAccount + indx;
        //avatar
        gUserInfo.userAvatar = gprsResp.arguments[indx];
        if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 1 && document.getElementById('menu-profile-avatar')) {
            document.getElementById('menu-profile-avatar').innerHTML = '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo.userAvatar + '" />';
            document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
        }
        //avatar end
        indx++;
        if (gprsResp.arguments[indx] && gprsResp.arguments[indx] == 'MENU') {
            indx++;
            for (var i = indx; i < gprsResp.arguments.length; i++) {
                if (gprsResp.arguments.length > 1) {
                    if (gprsResp.arguments[indx] == 'MENU_END') {
                        indx++;
                        break;
                    }
                    else {
                        var tmpMenuArr = gprsResp.arguments[i].split('#');
                        var tmpMenuObj = new MenuObj();
                        tmpMenuObj.keyLang = tmpMenuArr[0];
                        tmpMenuObj.menuID = tmpMenuArr[1];
                        tmpMenuObj.parentMenuID = tmpMenuArr[2];
                        tmpMenuObj.iconCode = tmpMenuArr[3];
                        tmpMenuObj.path = tmpMenuArr[4];
                        tmpMenuObj.onClick = tmpMenuArr[5];
                        tmpMenuObj.imgHighlight = tmpMenuArr[6];
                        tmpMenuObj.requireStatus = tmpMenuArr[7];
                        tmpMenuObj.priority = tmpMenuArr[8];

                        try {
                            var deviceID = device.uuid;
                            gMenuList.push(tmpMenuObj);
                        } catch (err) {
                            if (tmpMenuArr[1] != 'liFingerprintPIN') {
                                gMenuList.push(tmpMenuObj);
                            }
                        }


                        indx++;
                    }
                }
            }
        }

        logInfo('Menu list length: ' + gMenuList.length);
        var tmpMenuOrder = new Array();
        var tmpSubMenuOrder = new Array();
        var menuType = '';
        if (gprsResp.arguments[indx]) {
            for (var i = indx; i < gprsResp.arguments.length; i++) {
                if (gprsResp.arguments[i] == 'MENU_USER_END') {
                    indx++;
                    break;
                }
                else {
                    var customizeMenuString = gprsResp.arguments[i];

                    if (customizeMenuString.indexOf('-CUSTOM-MENU-') > -1) {
                        var tempArray = customizeMenuString.split('-CUSTOM-MENU-');

                        //	has custom submenu config
                        // get menu config
                        if (tempArray.length > 0) {
                            tmpMenuOrder = (tempArray[0]).split('#');
                        }
                        //tmpMenuOrder = (customizeMenuString.substring(0, customizeMenuString.indexOf('-CUSTOM-MENU-'))).split('#');

                        // get submenu config
                        if (tempArray.length > 1) {
                            tmpSubMenuOrder = (tempArray[1]).split('#');
                        }
                        //tmpSubMenuOrder = (customizeMenuString.substring(customizeMenuString.indexOf('-CUSTOM-MENU-')+13, customizeMenuString.length)).split('#');

                        // get menu type
                        if (tempArray.length > 2) {
                            menuType = tempArray[2];
                        }

                        indx++;
                    } else {
                        //	has not custom submenu config (old user < ebv7)
                        tmpMenuOrder = gprsResp.arguments[i].split('#');
                        indx++;
                    }

                }
            }
        }
        //reorder menu
        if (tmpMenuOrder && tmpMenuOrder.length > 1) {
            gMenuUserOrder = tmpMenuOrder;
            for (var i = 0; i < gMenuList.length; i++) {
                var tmpMenuObj = gMenuList[i];
                if (tmpMenuObj.requireStatus == 'Y' && tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID.length == 0) {
                    var tmpStatus = false;
                    for (var j = 0; j < tmpMenuOrder.length; j++) {
                        if (tmpMenuObj.menuID == tmpMenuOrder[j]) {
                            tmpStatus = true;
                            break;
                        }
                    }
                    if (!tmpStatus) {
                        gMenuUserOrder.push(tmpMenuObj.menuID);
                    }
                }
            }
        }
        else {
            for (var i = 0; i < gMenuList.length; i++) {
                var tmpMenuObj = gMenuList[i];
                if (tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID.length == 0) {
                    gMenuUserOrder.push(tmpMenuObj.menuID);
                }
            }
        }

        //reorder submenu
        if (tmpSubMenuOrder && tmpSubMenuOrder.length > 1) {
            gSubMenuUserOrder = tmpSubMenuOrder;
            for (var i = 0; i < gMenuList.length; i++) {
                var tmpMenuObj = gMenuList[i];
                if (tmpMenuObj.parentMenuID.length > 0) {
                    //if(tmpMenuObj.menuID.length == 0 && tmpMenuObj.parentMenuID.length > 0) {
                    var tmpStatus = false;
                    for (var j = 0; j < tmpSubMenuOrder.length; j++) {
                        var subMenuIDKeyLang = tmpMenuObj.parentMenuID + '_' + tmpMenuObj.keyLang;
                        if (subMenuIDKeyLang == tmpSubMenuOrder[j]) {
                            tmpStatus = true;
                            break;
                        }
                    }
                    if (tmpStatus) {
                        gSubMenuUserOrder.push(subMenuIDKeyLang);
                        gMenuList[i].hiddenStatus = 'N';
                    } else {
                        gMenuList[i].hiddenStatus = 'Y';
                    }
                }

            }
        }
        else {
            for (var i = 0; i < gMenuList.length; i++) {
                var tmpMenuObj = gMenuList[i];
                //if(tmpMenuObj.menuID.length == 0 && tmpMenuObj.parentMenuID.length > 0) {
                if (tmpMenuObj.parentMenuID.length > 0) {
                    gSubMenuUserOrder.push(tmpMenuObj.parentMenuID + '_' + tmpMenuObj.keyLang);
                    gMenuList[i].hiddenStatus = 'N';
                } else {
                    //gMenuList[i].hiddenStatus = 'Y';
                }
            }
        }

        genMenuSection();

        if (menuType == 'simple') {
            quickChangeMenuStyleSimple(false);
        } else if (menuType == 'default') {
            quickChangeMenuStyleDefault(false);
        } else if (menuType == 'custom') {
            document.getElementById('quick_default_menu_btn').style.display = 'none';
            document.getElementById('quick_simple_menu_btn').style.display = 'none';
            document.getElementById('quick_custom_menu_btn').style.display = '';
        }
        //request menu
        /*var arrayArgs = new Array();
         requestBacgroundMBService("CMD_GET_CUSTOMIZE_MENU", arrayArgs, function(e) {
         //success

         }, function(e){
         //fail

         });*/

        return true;

        var indxPayment = numAccount + 6;
        var numGroupPaymentService = parseInt(gprsResp.arguments[indxPayment + 1]);
        for (var i = 0; i < numGroupPaymentService; i++) {
            tmpStr = gprsResp.arguments[indxPayment + 2 + i];

            if (tmpStr != undefined) {
                tmpArr = tmpStr.split("#");

                if (tmpArr.length == 7) {
                    var paymentGrp = {
                        groupId: tmpArr[0],
                        srvGroup: tmpArr[1],
                        name: tmpArr[2],
                        description: tmpArr[3],
                        nameEn: tmpArr[4],
                        descriptionEn: tmpArr[5],
                        icon: tmpArr[6]
                    };
                    gUserInfo.paymentGroupList.push(paymentGrp);
                }
            }
        }

        var numPaymentService = parseInt(gprsResp.arguments[indxPayment + numGroupPaymentService + 2]);
        for (var i = 0; i < numPaymentService; i++) {
            tmpStr = gprsResp.arguments[numGroupPaymentService + indxPayment + 3 + i];

            if (tmpStr != undefined) {
                tmpArr = tmpStr.split("#");

                if (tmpArr.length == 7) {
                    var paymentService = {
                        srvId: tmpArr[0],
                        srvGroup: tmpArr[1],
                        srvName: tmpArr[2],
                        srvDesc: tmpArr[3],
                        srvNameEn: tmpArr[4],
                        srvDescEn: tmpArr[5],
                        icon: tmpArr[6]
                    };
                    gUserInfo.paymentServiceList.push(paymentService);
                }
            }
        }

        var numProvider = parseInt(gprsResp.arguments[numPaymentService + numGroupPaymentService + indxPayment + 3]);
        for (var i = 0; i < numProvider; i++) {
            tmpStr = gprsResp.arguments[numGroupPaymentService + numPaymentService + indxPayment + 4 + i];

            if (tmpStr != undefined) {
                tmpArr = tmpStr.split("#");

                if (tmpArr.length == 6) {
                    var paymentProvider = {
                        srvId: tmpArr[0],
                        srvGroup: tmpArr[1],
                        prName: tmpArr[2],
                        srvCode: tmpArr[3],
                        prDesc: tmpArr[4],
                        prId: tmpArr[5]
                    };
                    gUserInfo.paymentProviderList.push(paymentProvider);
                }
            }
        }

        var numFieldForm = parseInt(gprsResp.arguments[numProvider + numPaymentService + numGroupPaymentService + indxPayment + 4]);
        for (var i = 0; i < numFieldForm; i++) {
            tmpStr = gprsResp.arguments[numProvider + numPaymentService + numGroupPaymentService + indxPayment + 5 + i];

            if (tmpStr != undefined) {
                tmpArr = tmpStr.split("#");

                if (tmpArr.length == 14) {
                    var paymentReqField = {
                        srvCode: tmpArr[0],
                        msgType: tmpArr[1],
                        msgFieldId: tmpArr[2],
                        fieldDesc: tmpArr[3],
                        fieldType: tmpArr[4],
                        fieldLength: tmpArr[5],
                        inputType: tmpArr[6],
                        madatory: tmpArr[7],
                        sortIndex: tmpArr[8],
                        id: tmpArr[9],
                        isAmount: tmpArr[10],
                        fieldDescEn: tmpArr[11],
                        dfltVal: tmpArr[12],
                        id1: tmpArr[13]
                    };
                    gUserInfo.paymentRequestFieldList.push(paymentReqField);
                }
            }
        }

        var numFieldFormCbo = parseInt(gprsResp.arguments[numFieldForm + numProvider + numPaymentService + numGroupPaymentService + indxPayment + 5]);
        for (var i = 0; i < numFieldFormCbo; i++) {
            gUserInfo.paymentRequestFieldCboList.push(gprsResp.arguments[numFieldForm + numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
            tmpStr = gprsResp.arguments[numFieldForm + numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6 + i];

            if (tmpStr != undefined) {
                tmpArr = tmpStr.split("#");

                if (tmpArr.length == 4) {
                    var paymentReqFieldCbo = {
                        id: tmpArr[0],
                        mapId: tmpArr[1],
                        fieldVal: tmpArr[2],
                        fieldDesc: tmpArr[3]
                    };
                    gUserInfo.paymentRequestFieldCboList.push(paymentReqFieldCbo);
                }
            }
        }

        var numFieldFormHistory = parseInt(gprsResp.arguments[numFieldFormCbo + numFieldForm + numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6]);
        for (var i = 0; i < numFieldFormHistory; i++) {
            gUserInfo.paymentFieldHistoryList.push(gprsResp.arguments[numFieldFormCbo + numFieldForm + numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
        }

        return true;
    }
}

//Handle change password with response code 210

function handleAlertChangePasswordPressedOK(evt) {
    if (currentPage == "login-scr") {
        navController.pushToView('accountxsl/account-change-password-scr', true, 'xsl');
    }
}

function handleAlertChangePasswordPressedCancel(evt) {
    if (currentPage == "login-scr") {
        gIsLogin = true;
        var tmpPageName = navController.getDefaultPage();
        var tmpPageType = navController.getDefaultPageType();
        navController.initWithRootView(tmpPageName, true, tmpPageType);
        //show slide menu button
        var btnSlideMenu = document.getElementById("nav.btn.showslidemenu");
        btnSlideMenu.style.display = "block";
    }
}

function goTerms() {
    showAlertKHCN_KHDN_TERMS(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goInstruction() {
    showAlertKHCN_KHDN_INSTRUCTION(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goFAQ() {
    showAlertKHCN_KHDN_FAQ(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goForgotPassword() {
    if (gUserInfo.lang == 'EN') {
        navController.initWithRootView('forgot-pw-scr-eng', true, 'html');
    }
    else {
        navController.initWithRootView('forgot-pw-scr-vie', true, 'html');
    }
}

function goSignup() {
    openLinkInWindows('https://applynow.tpb.vn/');
}


function animationError() {
    $("#enter_code").effect("shake", {times: 2, distance: '10', direction: 'top'}, 500);
    showAlertText(CONST_STR.get("WRONG_PASSWORD"));
}


function RGBA(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    this.getCSS = function () {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }
}

var bgCircle = new RGBA(255, 255, 255, 0.1);

function setBgOpacityFadeInCircle(elem) {

    var opac = 0;
    elem.setAttribute("fill", bgCircle.getCSS());
    var fadein = setInterval(function () {
        opac += 0.1;
        if (opac >= 1 && fadein != null) {

            clearInterval(fadein);
        }
        bgCircle.alpha = opac;

        elem.setAttribute("fill", bgCircle.getCSS());
    }, 30);

}

function setBgOpacityFadeOutCircle(elem) {
    var opac = 1;

    var fadeOut = setInterval(function () {
        opac -= 0.1;
        if (opac <= 0.0 && fadeOut != null) {
            clearInterval(fadeOut);
        }
        bgCircle.alpha = opac;
        elem.setAttribute("fill", bgCircle.getCSS());

    }, 30);
}