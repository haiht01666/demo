/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

var tmpWeekArrayDisp = new Array();
var tmpWeekArrayVal = new Array();
var tmpMonthArrayDisp = new Array();
var tmpMonthArrayVal = new Array();
var tmpYearArrayDisp = new Array();
var tmpYearArrayVal = new Array();

/*** VIEW LOAD SUCCESS ***/
function viewBackFromOther() {

}


function viewDidLoadSuccess() {
    $('input[name="time"]').on('change', function () {
        document.getElementById("commissionTimeDisp").value = CONST_STR.get('SEQ_INPUT_TITLE');
        document.getElementById("commissionTime").value = "";
        $('#commission-volume.weekCommission').css('display', 'table');
        $('#commission-volume.monthYearCommission').css('display', 'none');
        if($('input[name="time"]:checked').val() !== 'weekly'){
            $('#commission-volume.weekCommission').css('display', 'none');
            $('#commission-volume.monthYearCommission').css('display', 'table');
        }


    });
    sendJsonRequest();
}

function sendJsonRequest() {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/getCommissionInfo",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            time: $('input[name="time"]:checked').val(),
            timeDetail: document.getElementById("commissionTime").value
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            hideLoadingMask();
            if (response.result) {
                setDataInfo(response.resultData);
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

function setDataInfo(dataInfo) {
    // set info
    $('#currentDate').html(moment(new Date()).format('DD/MM/YYYY'));
    $('#userName').html(gUserInfo.dispName);
    $('#userCode').html(gUserInfo.userCode);

    // week volume
    var weekPersonalVolume = formatNumberToCurrency(dataInfo.weekPersonalVolume);
    if (weekPersonalVolume === '0' || weekPersonalVolume === 0 || !weekPersonalVolume) weekPersonalVolume = '0';
    document.getElementById("weekVolume").innerHTML = weekPersonalVolume;
    // month volume
    var monthPersonalVolume = formatNumberToCurrency(dataInfo.monthPersonalVolume);
    if (monthPersonalVolume === '0' || monthPersonalVolume === 0 || !monthPersonalVolume) monthPersonalVolume = '0';
    document.getElementById("monthVolume").innerHTML = monthPersonalVolume;
    // year volume
    var yearPersonalVolume = formatNumberToCurrency(dataInfo.yearPersonalVolume);
    if (yearPersonalVolume === '0' || yearPersonalVolume === 0 || !yearPersonalVolume) yearPersonalVolume = '0';
    document.getElementById("yearVolume").innerHTML = yearPersonalVolume;

    tmpWeekArrayDisp = dataInfo.weekTimeDispList;
    tmpWeekArrayVal = dataInfo.weekTimeValList;
    tmpMonthArrayDisp = dataInfo.monthTimeDispList;
    tmpMonthArrayVal = dataInfo.monthTimeValList;
    tmpYearArrayDisp = dataInfo.yearTimeDispList;
    tmpYearArrayVal = dataInfo.yearTimeValList;

    // direct Commission
    var directCommission = formatNumberToCurrency(dataInfo.directCommission);
    if (directCommission === '0' || directCommission === 0 || !directCommission) directCommission = '0';
    $(".directCommission").html(directCommission);

    // groupCommission
    var groupCommission = formatNumberToCurrency(dataInfo.groupCommission);
    if (groupCommission === '0' || groupCommission === 0 || !groupCommission) groupCommission = '0';
    $(".groupCommission").html(groupCommission);

    // leaderQuarterCommission
    var leaderQuarterCommission = formatNumberToCurrency(dataInfo.leaderQuarterCommission);
    if (leaderQuarterCommission === '0' || leaderQuarterCommission === 0 || !leaderQuarterCommission) leaderQuarterCommission = '0';
    $(".leaderQuarterCommission").html(leaderQuarterCommission);

    // leaderClubCommission
    var leaderClubCommission = formatNumberToCurrency(dataInfo.leaderClubCommission);
    if (leaderClubCommission === '0' || leaderClubCommission === 0 || !leaderClubCommission) leaderClubCommission = '0';
    $(".leaderClubCommission").html(leaderClubCommission);

    // totalCommission
    var totalCommission = formatNumberToCurrency(dataInfo.totalCommission);
    if (totalCommission === '0' || totalCommission === 0 || !totalCommission) totalCommission = '0';
    $(".totalCommission").html(totalCommission);

}

function showRequestCommissionTime() {
    var tmpArray1;
    var tmpArray2;
    var listTitle;
    var timeType = $('input[name="time"]:checked').val();
    if (timeType === 'weekly') {
        tmpArray1 = tmpWeekArrayDisp;
        tmpArray2 = tmpWeekArrayVal;
        listTitle = CONST_STR.get('COMMISSION_WEEK');
    } else if (timeType === 'monthly') {
        tmpArray1 = tmpMonthArrayDisp;
        tmpArray2 = tmpMonthArrayVal;
        listTitle = CONST_STR.get('COMMISSION_MONTH');
    } else if (timeType === 'yearly') {
        tmpArray1 = tmpYearArrayDisp;
        tmpArray2 = tmpYearArrayVal;
        listTitle = CONST_STR.get('COMMISSION_YEAR');
    }
    document.addEventListener("evtSelectionDialog", handleSelectionCommissionTime, false);
    showDialogList(listTitle, tmpArray1, tmpArray2, false);
}

//event: selection dialog list
function handleSelectionCommissionTime(e) {
    if (currentPage === "commissionxsl/comission-scr") {
        document.removeEventListener("evtSelectionDialog", handleSelectionCommissionTime, false);
        if ((e.selectedValue1 !== undefined) && (e.selectedValue1 !== null)) {
            var commissionTime = document.getElementById("commissionTime");
            var commissionTimeDisp = document.getElementById("commissionTimeDisp");
            if (commissionTime.nodeName === "INPUT") {
                commissionTimeDisp.value = e.selectedValue1;
                commissionTime.value = e.selectedValue2;
            }
            else {
                commissionTime.innerHTML = e.selectedValue1;
            }
            sendJsonRequest();
        }
    }
}

