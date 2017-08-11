/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var listNpp = new Array();
var detailInfo;

function viewBackFromOther() {
}

function viewDidLoadSuccess() {
    showLoadingMask();
    //send Request
    $.ajax({
        type: "POST",
        url: "/api/getNppGraphical",
        data: JSON.stringify({
            userCode: gUserInfo.userCode
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //applyDynamicPageStyleSheet1(true, 1920,1080);
            hideLoadingMask();
            if (response.result) {
                isGraphical = true;
                detailInfo = response.resultData.userInfo;
                setDetailInfo(response.resultData);
                // draw chart
                listNpp = response.resultData.listNpp;
                google.charts.load('current', {packages: ["orgchart"]});
                google.charts.setOnLoadCallback(drawChart);
                drawChart();
                applyDynamicPageStyleSheet(true);
            } else {
                showAlertText(CONST_STR.get('GET_ALL_NPP_FAIL'));
            }
        },
        error: function () {
            hideLoadingMask();
            showAlertText(CONST_STR.get('GET_ALL_NPP_FAIL'));
        }
    });
}

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows([
        [{
            v: detailInfo.userCode,
            f: '<div style="background-color:rgba(36, 58, 144, 0.93);color: white">' + detailInfo.userCode + '</div><div><img src="./static/frontend/assets/images/ico/' + detailInfo.leverValue + '.png"/></div>'
        }, '']
    ]);
    for (var i = 0; i < listNpp.length; i++) {
        var colorActive = "";
        if(listNpp[i].activeStatus.dateNum >= 15){
            colorActive = "white"
        } else if(listNpp[i].activeStatus.dateNum >= 5 && listNpp[i].activeStatus.dateNum < 15){
            colorActive = "#f5de89"
        } else{
            colorActive = "#efa7a7"
        }
        data.addRows([
            [{
                v: listNpp[i].userCode,
                f: '<div style="width: 65px;background-color:rgba(36, 58, 144, 0.93);color: white">' + listNpp[i].dispName + '</div>' +
                '<div style="background-color:rgba(36, 58, 144, 0.93);color: white; padding-top: 2px; padding-bottom: 2px;border-top: 1px solid #b9b9b9">' + listNpp[i].userCode + '</div>' +
                ((listNpp[i].userCode === 'open') ? '' : '<div style="min-height: 50px;background-color:' + colorActive +'"><img src="./static/frontend/assets/images/ico/' + listNpp[i].leverValue + '.png"/></div>')
            }, listNpp[i].parentId.toString()]
        ]);
    }

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml: true});
}

function drawGraphical(listNpp) {
    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);
}

function setDetailInfo(detailInfo) {
    document.getElementById("name").innerHTML = detailInfo.userInfo.dispName;
    document.getElementById("mobile").innerHTML = detailInfo.userInfo.phone;
    document.getElementById("sponsorName").innerHTML = detailInfo.userInfo.parentName;
    document.getElementById("rank").innerHTML = detailInfo.userInfo.leverValue;
    document.getElementById("numberNM").innerHTML = detailInfo.numberNM;
    document.getElementById("numberSM").innerHTML = detailInfo.numberSM;
    document.getElementById("numberPS").innerHTML = detailInfo.numberPS;
    document.getElementById("numberPD").innerHTML = detailInfo.numberPD;
    document.getElementById("numberTL").innerHTML = detailInfo.numberTL;
    document.getElementById("numberMSD").innerHTML = detailInfo.numberMSD;
    document.getElementById("numberDSD").innerHTML = detailInfo.numberDSD;
    document.getElementById("numberGDSD").innerHTML = detailInfo.numberGDSD;
}

