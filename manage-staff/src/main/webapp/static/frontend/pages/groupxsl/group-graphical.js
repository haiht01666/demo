/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var cusInfoObj;
var newCusInfoObj;

var flag_check = false; //ngocdt3 bo sung check trang thai la back hya cancel
var treeNpp = new Array();

function viewBackFromOther() {
    logInfo('Back from other view');
    flag_check = true;
    setDefaultInfo(newCusInfoObj);
}

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    // For each orgchart box, provide the name, manager, and tooltip to show.
    var oldParentId = '';
    var j = 0;
    for (var i = 0; i < treeNpp.length; i++) {
        data.addRows([
            [{
                v: treeNpp[i].nppId,
                f: '<div style="background-color:rgba(36, 58, 144, 0.93);color: white">' + treeNpp[i].nppId + '</div>' + ((treeNpp[i].nppId === 'open') ? '' : '<div><img src="./static/frontend/assets/images/ico/' + treeNpp[i].rank + '.png"/></div>')
            }, treeNpp[i].parentId]
        ]);
    }

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml: true});
}

function viewDidLoadSuccess() {
    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    if (flag_check == false) {
        //sendJSONRequest();
    }
    sendJSONRequest();
}

function sendJSONRequest() {
    loadData('./static/frontend/data/treeNpp.json', drawGraphical);
    loadData('./static/frontend/data/account.json', requestMBServiceSuccess);
}

function drawGraphical(jsondata) {
    treeNpp = JSON.parse(jsondata)[gUserInfo.accountId];
    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);
}

//event listener: http request success
function requestMBServiceSuccess(jsondata) {
    var accountDetail = JSON.parse(jsondata)[gUserInfo.accountId];
    setDefaultInfo(accountDetail);
    cusInfoObj = accountDetail;
};

//event listener: http request fail
function requestMBServiceFail() {
};

function setDefaultInfo(cusInfo) {
    document.getElementById("name").innerHTML = cusInfo.fullname;
    document.getElementById("mobile").innerHTML = cusInfo.mobile;
    document.getElementById("sponsorName").innerHTML = cusInfo.sponsorName;
    document.getElementById("rank").innerHTML = cusInfo.rank === '0' ? 'Distributor' : cusInfo.rank === '1' ? 'Member' : 'Professional';
    document.getElementById("numberTL").innerHTML = cusInfo.numberTL;
    document.getElementById("numberMSD").innerHTML = cusInfo.numberMSD;
    document.getElementById("numberDSD").innerHTML = cusInfo.numberDSD;
    document.getElementById("numberGDSD").innerHTML = cusInfo.numberGDSD;
}

function cancel() {
    setDefaultInfo(cusInfoObj);
    logInfo("cancel");

}
/*function goBack(){
 navController.popView(true);
 }*/
function confirmChange() {
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var bankName = document.getElementById("bankName").value;
    var bankDivice = document.getElementById("bankDivice").value;
    var bankAccount = document.getElementById("bankAccount").value;
    var bankAccountName = document.getElementById("bankAccountName").value;
    var fileUpload01 = document.getElementById("id.fileUpload01");

    var mobile = document.getElementById("mobile").value;

    if (mobile != cusInfoObj.mobile && !RE.test(mobile)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_MOBILE_ERROR_MSG'));
        return;
    }

    var email = document.getElementById("email").value;

    var MAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != cusInfoObj.email && !MAIL.test(email)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_EMAIL_ERROR_MSG'));
        return;
    }
    // check image
    // var stringInfo = ""; var arrayArgs = new Array();
    tmpStr = fileUpload01.value;
    var checkImage = tmpStr.split('.');
    var checkTypeImage = checkImage[checkImage.length - 1];
    if (checkTypeImage != "" && checkTypeImage.toLowerCase() != "jpg" && checkTypeImage.toLowerCase() != "png" && checkTypeImage.toLowerCase() != "gif") {
        status = 1;
        document.getElementById("id.checkFile").style.display = '';
        //document.getElementById("id.lbCheckFile").innerHTML = CONST_STR.get('ERR_INPUT_VALUE');
        showAlertText(CONST_STR.get('ERR_INPUT_FILE_VALUE'));
        return;
    }
    showAlertText(CONST_STR.get('MENU_CHANGE_INFO_SUCCESS_MESSAGE'));
    document.addEventListener('closeAlertView', handleAlertChangeInfo, false);
    logInfo("confirmChange");
}

