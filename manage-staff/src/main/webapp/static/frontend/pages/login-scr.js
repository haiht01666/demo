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
    setBackGround();
    if (!statusAccMode) {
        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.style.display = 'none';
        return;
    }
}

function viewWillUnload() {
    //flag = false;
    logInfo('view login will unload');

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

function requestLogin() {
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

    //passing
    sendJSONRequest(loginUser, loginPass);

}

function goToBankInfoMainScr() {
    navController.pushToView('bankinfo/bank-info-main-scr', true);
}

function sendJSONRequest(loginUser, loginPass) {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url:"/api/getLoginInfo",
        data: JSON.stringify({
            loginUser: loginUser,
            loginPass: loginPass
        }),
        contentType: "application/json; charset=utf-8",
        success:function(response){
            if(response.result){
                requestMBServiceSuccess(response.resultData);
            } else {
                requestMBServiceFail();
            }
        },
        error: requestMBServiceFail
    });
}

function requestMBServiceSuccess(loginInfo) {
    hideLoadingMask();
    removeBackGround();
    hideLoadingMask();
    gIsLogin = true;
    // set info data
    gUserInfo.userCode = loginInfo.userCode;
    gUserInfo.dispName = loginInfo.dispName;
    gUserInfo.email = loginInfo.email;
    gUserInfo.address = loginInfo.address;
    gUserInfo.phone = loginInfo.phone;
    //set birthday
    gUserInfo.birthday = moment(loginInfo.birthday, "YYYY-MM-DD").format('DD/MM/YYYY');
    gUserInfo.identifier = loginInfo.identifier;
    gUserInfo.bankName = loginInfo.bankName;
    gUserInfo.bankAccount = loginInfo.bankAccount;
    gUserInfo.bankBranch = loginInfo.bankBranch;
    gUserInfo.bankUser = loginInfo.bankUser;
    gUserInfo.childId = loginInfo.childId;
    gUserInfo.city = loginInfo.city;
    gUserInfo.parentName = loginInfo.parentName;

    //avatar
    gUserInfo.userAvatar = loginInfo.userAvatar;
    if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 1 && document.getElementById('menu-profile-avatar')) {
        document.getElementById('menu-profile-avatar').innerHTML = '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + atob(gUserInfo.userAvatar) + '" />';
        document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
    }
    //avatar end

    gUserInfo.flag_check = 1;
    gUserInfo.lang = getLanguageConfig();

    //config view
    setViewOnDesktopWhenLogin();

    navController.initWithRootView(CONST_STR.get('INDEX_PAGE'), true, 'xsl');
    navController.setDefaultPage(CONST_STR.get('INDEX_PAGE'), 'xsl');
};

//event listener: http request success
function requestMBServiceFail() {
    hideLoadingMask();
    animationError();
};

function animationError() {
    $("#enter_code").effect("shake", {times: 2, distance: '10', direction: 'top'}, 500);
    showAlertText(CONST_STR.get("WRONG_PASSWORD"));
}

function forgotPass(){
    showAlertText(CONST_STR.get("FORGOT_PASSWORD"));
}