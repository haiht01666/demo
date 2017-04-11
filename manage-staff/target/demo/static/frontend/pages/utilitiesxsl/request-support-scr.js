/**
 * Created by HuyNT2.
 * User:
 * Date: 29/03/14
 * Time: 8:35 AM
 */

/*** HEADER ***/

/*** INIT VIEW ***/
function loadInitXML() {
    return '';
}

/*** INIT VIEW END ***/

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
    logInfo('Back from other view');
}

/*** VIEW LOAD SUCCESS ***/

function viewDidLoadSuccess() {
    //setInputOnlyASCII('requestsupport.title', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
    //setInputOnlyASCII('requestsupport.content', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));

    if (!gIsLogin) {
        var tmpNodeAccChangePass = document.getElementById('requestsupport.requestSupporttitle');
        tmpNodeAccChangePass.innerHTML = CONST_STR.get('MENU_PERSONAL_INFO_SUPPORT');
    }
}


/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {

}

function requestSuport() {
    var title = document.getElementById('requestsupport.title').value;
    var content = document.getElementById('requestsupport.content').value;


    if (title.length <= 0) {
        showAlertText(CONST_STR.get('ERR_REQUEST_SUPPORT_TYPE'));
        return;
    }

    if (content.length <= 0) {
        showAlertText(CONST_STR.get('ERR_REQUEST_SUPPORT_INFO'));
        return;
    }


    $.ajax({
        type: "POST",
        url: "/api/requestSupport",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            userName: gUserInfo.dispName,
            title: title,
            content: content
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.result) {
                showAlertText(CONST_STR.get('MESSAGE_REQUEST_SUPPORT_SUBMIT'));
                document.addEventListener('closeAlertView', handleAlertRequestSupport, false);
            } else {
                showAlertText(CONST_STR.get('MESSAGE_REQUEST_SUPPORT_FAIL'));
            }
        },
        error: function () {
            showAlertText(CONST_STR.get('MESSAGE_REQUEST_SUPPORT_FAIL'));
        }
    });

}

function handleAlertRequestSupport() {
    document.removeEventListener('closeAlertView', handleAlertRequestSupport, false);
    var tmpPageName = navController.getDefaultPage();
    var tmpPageType = navController.getDefaultPageType();
    navController.initWithRootView(tmpPageName, true, tmpPageType);
}

