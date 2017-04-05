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
    setInputOnlyASCII('requestsupport.type', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
    setInputOnlyASCII('requestsupport.content', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));

    if (!gIsLogin) {
        var tmpNodeAccChangePass = document.getElementById('requestsupport.requestSupporttitle');
        tmpNodeAccChangePass.innerHTML = CONST_STR.get('MENU_PERSONAL_INFO_SUPPORT');
    }
}
function showRequestSuportType() {
    var tmpArray1 = ['Đơn Hàng', 'Hoa Hồng', 'Chế độ'];
    var tmpArray2 = ['1', '2', '3'];

    document.addEventListener("evtSelectionDialog", handleSelectionRequestSuportType, false);
    showDialogList(CONST_STR.get('REQUEST_SUPPORT_TYPE_UPPERCASE'), tmpArray1, tmpArray2, false);
}

//event: selection dialog list
function handleSelectionRequestSuportType(e) {
    if (currentPage == "utilitiesxsl/request-support-scr") {
        document.removeEventListener("evtSelectionDialog", handleSelectionRequestSuportType, false);

        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
            var tagAccNo = document.getElementById("requestsupport.type");
            if (tagAccNo.nodeName == "INPUT") {
                tagAccNo.value = e.selectedValue1;
            }
            else {
                tagAccNo.innerHTML = e.selectedValue1;
            }
        }
    }
}


/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
    logInfo('change password will unload');
}

function requestSuport() {
    var type = document.getElementById('requestsupport.type').value;
    var content = document.getElementById('requestsupport.content').value;


    if (type.length <= 0) {
        showAlertText(CONST_STR.get('ERR_REQUEST_SUPPORT_TYPE'));
        return;
    }

    if (content.length <= 0) {
        showAlertText(CONST_STR.get('ERR_REQUEST_SUPPORT_INFO'));
        return;
    }


    showAlertText(CONST_STR.get('MESSAGE_REQUEST_SUPPORT_SUBMIT'));
    document.addEventListener('closeAlertView', handleAlertRequestSupport, false);
}


function handleAlertRequestSupport() {
    document.removeEventListener('closeAlertView', handleAlertRequestSupport, false);
    var tmpPageName = navController.getDefaultPage();
    var tmpPageType = navController.getDefaultPageType();
    navController.initWithRootView(tmpPageName, true, tmpPageType);
}

//show virtual keyboard
function showVirtualKeyboard() {
    var tmpNodeKeyboard = document.getElementById('id-virtualkb');
    tmpNodeKeyboard.style.display == 'none' ? tmpNodeKeyboard.style.display = '' : tmpNodeKeyboard.style.display = 'none';
}
