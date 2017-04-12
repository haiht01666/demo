/**
 * Created by HuyNT2.
 * User:
 * Date: 29/03/14
 * Time: 8:35 AM
 */

/*** HEADER ***/
var focusedField = '';
var tmpNodePassOld;
var tmpNodePassNew;
var tmpNodePassRetype;

/*** INIT VIEW ***/
function loadInitXML() {
    return '';
}

/*** INIT VIEW END ***/

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
    logInfo('Back from other view');
}

/*** VIEW BACK FROM OTHER ***/

/*** VIEW LOAD SUCCESS ***/

function viewDidLoadSuccess() {
    showLoadingMask();
    setTimeout(hideLoadingMask, 200);
    if (gUserInfo.flag_check == "") {
        showAlertAppText(CONST_STR.get('LOGIN_REQUEST_CONDITION'), CONST_STR.get('LOGIN_REQUEST_CONDITION_OK'), CONST_STR.get('LOGIN_REQUEST_CONDITION_REJECT'));
        document.addEventListener('alertAppConfirmOK', showChoiceConfirmPre, false);
        document.addEventListener('alertAppConfirmCancel', showChoiceConfirmPreClose, false);
    }
    setInputOnlyASCII('accpass.txt.passwordold', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
    setInputOnlyASCII('accpass.txt.passwordnew', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
    setInputOnlyASCII('accpass.txt.passwordretype', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));

    if (!gIsLogin) {
        var tmpNodeAccChangePass = document.getElementById('account.changepasstitle');
        tmpNodeAccChangePass.innerHTML = CONST_STR.get('ACC_CHANGE_PASS_SCR_TITLE');
    }

    tmpNodePassOld = document.getElementById('accpass.txt.passwordold');
    tmpNodePassOld.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressOld, false);
    function handleSpecialKeyPressOld(e) {
        var ew = e.keyPress;
        if (ew == 13) { //Enter pressed
            requestChangePassword();
        }
        else {
            return;
        }
    }

    tmpNodePassNew = document.getElementById('accpass.txt.passwordnew');
    tmpNodePassNew.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressNew, false);
    function handleSpecialKeyPressNew(e) {
        var ew = e.keyPress;
        if (ew == 13) { //Enter pressed
            requestChangePassword();
        }
        else {
            return;
        }
    }

    tmpNodePassRetype = document.getElementById('accpass.txt.passwordretype');
    tmpNodePassRetype.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressRetype, false);
    function handleSpecialKeyPressRetype(e) {
        var ew = e.keyPress;
        if (ew == 13) { //Enter pressed
            requestChangePassword();
        }
        else {
            return;
        }
    }
}

/*** VIEW LOAD SUCCESS END viewWillUnload ***/
function showChoiceConfirmPre(e) {
    if (currentPage == "accountxsl/account-change-password-scr") {
        showChoiceConfirmPreClose();
    }
}

function showChoiceConfirmPreClose() {
    if (currentPage == "accountxsl/account-change-password-scr") {
        document.removeEventListener("alertAppConfirmCancel", showChoiceConfirmPreClose, false);
        document.removeEventListener("alertAppConfirmOK", showChoiceConfirmPre, false);
    }
}
/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
    logInfo('change password will unload');
}

function requestChangePassword() {
    var passOld = document.getElementById('accpass.txt.passwordold').value;
    var passNew = document.getElementById('accpass.txt.passwordnew').value;
    var passRetype = document.getElementById('accpass.txt.passwordretype').value;

    if (passOld.length <= 0) {
        showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_OLD_PASS'));
        return;
    }

    if (passNew.length <= 0) {
        showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_OLD_PASS'));
        return;
    }
    if (passNew.length < 7 || passNew.length > 16) {
        showAlertText(CONST_STR.get('ERR_INPUT_WRONG_NUMBER_DIGIT'));
        return;
    }

    if (passRetype != tmpNodePassNew.value) {
        showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_RETYPE_FAIL_PASS'));
        return;
    }
    $.ajax({
        type: "POST",
        url: "/api/changePassword",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            passOld: passOld,
            passNew: passNew
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.result) {
                if (response.resultData === 1) {
                    showAlertText(CONST_STR.get('CHANGE_PASS_SUCCESS'));
                    document.addEventListener('closeAlertView', handleAlertChangePassword, false);
                } else {
                    showAlertText(CONST_STR.get('ERR_INPUT_WRONG_OLD_PASS'));
                }
            } else {
                showAlertText(CONST_STR.get('CHANGE_PASS_FAIL'));
            }
        },
        error: function () {
            showAlertText(CONST_STR.get('CHANGE_PASS_FAIL'));
        }
    });
}

function handleAlertChangePassword() {
    document.removeEventListener('closeAlertView', handleAlertChangePassword, false);
    var tmpPageName = navController.getDefaultPage();
    var tmpPageType = navController.getDefaultPageType();
    navController.initWithRootView(tmpPageName, true, tmpPageType);
}

function setFieldFocus(p_field_name) {
    focusedField = p_field_name;
}

function onBlurPassword(pAuthen) {
    if (pAuthen == '0') {
        focusedField = "";
    }
}

function onBlurNewPassword(pAuthen) {
    if (pAuthen == '0') {
        focusedField = "";
    }
}

function onBlurNewPasswordConfirm(pAuthen) {
    if (pAuthen == '0') {
        focusedField = "";
    }
}
