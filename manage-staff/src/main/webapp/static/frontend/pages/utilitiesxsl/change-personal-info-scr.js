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
    document.getElementById("confirmBtn").disabled = true;
    if (flag_check == false) {
        setDefaultInfo();
    }
    setDefaultInfo();
    showLoadingMask();
    setTimeout(hideLoadingMask, 200);

    setInputOnlyNumberInfo('mobile');
    setInputOnlyASCIIinfo('email');
    //setInputOnlyASCII('address');
    //setInputOnlyASCII('bankName');
    //setInputOnlyASCII('bankDivice');
    setInputOnlyASCII('bankAccount');
    setInputOnlyASCII('bankAccountName');
}

function setDefaultInfo() {
    document.getElementById("name").innerHTML = gUserInfo.dispName;
    document.getElementById("birthday").innerHTML = gUserInfo.birthday;
    document.getElementById("userid").innerHTML = gUserInfo.identifier;
    document.getElementById("mobile").value = gUserInfo.phone;
    document.getElementById("address").value = gUserInfo.address;
    document.getElementById("email").value = gUserInfo.email;
    document.getElementById("bankName").value = gUserInfo.bankName;
    document.getElementById("bankDivice").value = gUserInfo.bankBranch;
    document.getElementById("bankAccount").value = gUserInfo.bankAccount;
    document.getElementById("bankAccountName").value = gUserInfo.bankUser;
    document.getElementById("city").value = gUserInfo.city;
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
                //re set info to global object
                //gUserInfo.birthday = newCusInfoObj.userCode;
                //gUserInfo.identifier;
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
    //limit text length on field
    if (tbx.value.length > Number(limit)) {
        tbx.value = tbx.value.substring(0, Number(limit));
    }

    //disable confirm button
    document.getElementById("confirmBtn").disabled = true;

    if (document.getElementById("address").value != gUserInfo.address) {
        logInfo("edit address");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("mobile").value != gUserInfo.phone) {
        logInfo("edit mobile");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("email").value != gUserInfo.email) {
        logInfo("edit email");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankName").value != gUserInfo.bankName) {
        logInfo("edit bankName");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankDivice").value != gUserInfo.bankBranch) {
        logInfo("edit bankDivice");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccount").value != gUserInfo.bankAccount) {
        logInfo("edit bankAccount");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccountName").value != gUserInfo.bankUser) {
        logInfo("edit bankAccountName");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("city").value != gUserInfo.city) {
        logInfo("edit city");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }
}
