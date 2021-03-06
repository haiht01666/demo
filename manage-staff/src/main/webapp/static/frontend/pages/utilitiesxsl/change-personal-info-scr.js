/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var flag_check = false;

function viewBackFromOther() {
    logInfo('Back from other view');
    flag_check = true;
    setDefaultInfo();
}


function viewDidLoadSuccess() {
    document.getElementById("confirmBtn").disabled = false;
    setDefaultInfo();

    setInputOnlyNumberInfo('mobile');
    setInputOnlyASCIIinfo('email');
    //setInputOnlyASCII('address');
    //setInputOnlyASCII('bankName');
    //setInputOnlyASCII('bankDivice');
    setInputOnlyASCII('bankAccount');
    setInputOnlyASCII('bankAccountName');
}

function setDefaultInfo() {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/getSummaryPersonalInfo",
        data: JSON.stringify({userCode: gUserInfo.userCode}),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            hideLoadingMask();
            if (response.result) {
                document.getElementById("name").innerHTML = response.resultData.dispName;
                document.getElementById("birthday").innerHTML = response.resultData.birthday ? moment(response.resultData.birthday, "YYYY-MM-DD").format('DD/MM/YYYY') : '';
                document.getElementById("userid").innerHTML = response.resultData.identifier;
                document.getElementById("mobile").value = response.resultData.phone;
                document.getElementById("address").value = response.resultData.address;
                document.getElementById("email").value = response.resultData.email;
                document.getElementById("bankName").value = response.resultData.bankName;
                document.getElementById("bankDivice").value = response.resultData.bankBranch;
                document.getElementById("bankAccount").value = response.resultData.bankAccount;
                document.getElementById("bankAccountName").value = response.resultData.bankUser;
                document.getElementById("city").value = response.resultData.city;
            } else {
                showAlertText(CONST_STR.get('GET_INFO_FAIL'));
            }
        },
        error: function () {
            hideLoadingMask();
            showAlertText(CONST_STR.get('GET_INFO_FAIL'));
        }
    });
}

function cancel() {
    setDefaultInfo();
    logInfo("cancel");
}
function confirmChange() {
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var bankName = document.getElementById("bankName").value;
    var bankDivice = document.getElementById("bankDivice").value;
    var bankAccount = document.getElementById("bankAccount").value;
    var bankAccountName = document.getElementById("bankAccountName").value;
    var city = document.getElementById("city").value;
    var fileUpload01 = document.getElementById("id.fileUpload01");

    var RE = /^[\d\.\-\s]+$/;
    if (mobile != gUserInfo.phone && !RE.test(mobile)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_MOBILE_ERROR_MSG'));
        return;
    }

    var email = document.getElementById("email").value;

    var MAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != gUserInfo.email && !MAIL.test(email)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_EMAIL_ERROR_MSG'));
        return;
    }

    var newCusInfoObj = new UserInfoObj();
    newCusInfoObj.userCode = gUserInfo.userCode;
    newCusInfoObj.email = email;
    newCusInfoObj.address = address;
    newCusInfoObj.phone = mobile;
    newCusInfoObj.bankName = bankName;
    newCusInfoObj.bankAccount = bankAccount;
    newCusInfoObj.bankBranch = bankDivice;
    newCusInfoObj.bankUser = bankAccountName;
    newCusInfoObj.city = city;
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/updatePersonalInfo",
        data: JSON.stringify(newCusInfoObj),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            hideLoadingMask();
            if (response.result) {
                gUserInfo.phone = newCusInfoObj.phone;
                gUserInfo.address = newCusInfoObj.address;
                gUserInfo.email = newCusInfoObj.email;
                gUserInfo.bankName = newCusInfoObj.bankName;
                gUserInfo.bankBranch = newCusInfoObj.bankBranch;
                gUserInfo.bankAccount = newCusInfoObj.bankAccount;
                gUserInfo.bankUser = newCusInfoObj.bankUser;
                gUserInfo.city = newCusInfoObj.city;
                showAlertText(CONST_STR.get('MENU_CHANGE_INFO_SUCCESS_MESSAGE'));
                document.addEventListener('closeAlertView', handleAlertChangeInfo, false);
            } else {
                showAlertText(CONST_STR.get('MENU_CHANGE_INFO_FAIL_MESSAGE'));
            }
        },
        error: function () {
            hideLoadingMask();
            showAlertText(CONST_STR.get('MENU_CHANGE_INFO_FAIL_MESSAGE'));
        }
    });
}

function handleAlertChangeInfo() {
    document.removeEventListener('closeAlertView', handleAlertChangeInfo, false);
    navController.initWithRootView('utilitiesxsl/change-personal-info-scr', true, 'xsl');
}


function checkChange(tbx, limit) {
    // //limit text length on field
    // if (tbx.value.length > Number(limit)) {
    //     tbx.value = tbx.value.substring(0, Number(limit));
    // }
    //
    // //disable confirm button
    // document.getElementById("confirmBtn").disabled = true;
    //
    // if (document.getElementById("address").value != gUserInfo.address) {
    //     logInfo("edit address");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("mobile").value != gUserInfo.phone) {
    //     logInfo("edit mobile");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("email").value != gUserInfo.email) {
    //     logInfo("edit email");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("bankName").value != gUserInfo.bankName) {
    //     logInfo("edit bankName");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("bankDivice").value != gUserInfo.bankBranch) {
    //     logInfo("edit bankDivice");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("bankAccount").value != gUserInfo.bankAccount) {
    //     logInfo("edit bankAccount");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("bankAccountName").value != gUserInfo.bankUser) {
    //     logInfo("edit bankAccountName");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
    //
    // if (document.getElementById("city").value != gUserInfo.city) {
    //     logInfo("edit city");
    //     //enable confirm button
    //     document.getElementById("confirmBtn").disabled = "";
    //     return;
    // }
}
