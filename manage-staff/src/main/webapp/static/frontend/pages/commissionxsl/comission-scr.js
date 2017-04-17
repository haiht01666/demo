/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/
function viewBackFromOther() {

}


function viewDidLoadSuccess() {
    $('input[name="time"]').on('change', function () {
        document.getElementById("commission.time").value = CONST_STR.get('SEQ_INPUT_TITLE');
    });
    //sendJSONRequest();
}

function requestJsonRequest() {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/getCommissionInfo",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            time: $('input[name="time"]:checked').val()
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
    document.getElementById("weekVolume").innerHTML = dataInfo.weekVolume;
    document.getElementById("monthVolume").innerHTML = dataInfo.monthVolume;
    document.getElementById("yearVolume").value = dataInfo.yearVolume;

    // month volume
    var monthPersonalVolume = formatNumberToCurrency(dataInfo.monthPersonalVolume);
    if (monthPersonalVolume === '0' || monthPersonalVolume === 0 || !monthPersonalVolume) monthPersonalVolume = '0';
    document.getElementById("monthPersonalVolume").value = monthPersonalVolume;

    for (var i = 0; i < 4; i++) {
        document.getElementById("week" + i + "Time").innerHTML = dataInfo.weekVolumeInfoList[i].weekTime;
        var groupVolume = formatNumberToCurrency(dataInfo.weekVolumeInfoList[i].groupVolume);
        if (groupVolume === '0' || groupVolume === 0 || !groupVolume) groupVolume = '0';
        document.getElementById("volumeWeek" + i).value = groupVolume;
    }
}

function showRequestCommissionTime() {
    var tmpWeekArray1 = [
        '06/03/2017 - 12/03/2017 (week 833)',
        '27/02/2017 - 05/03/2017 (week 832)',
        '20/02/2017 - 26/02/2017 (week 831)',
        '13/02/2017 - 19/02/2017 (week 830)',
        '06/02/2017 - 12/02/2017 (week 829)'
    ];
    var tmpWeekArray2 = ['833', '832', '831', '830', '829'];
    var tmpMonthArray1 = [
        '03/2017',
        '02/2017',
        '01/2017',
        '12/2016',
        '11/2016'
    ];
    var tmpMonthArray2 = ['03', '02', '01', '12', '11'];
    var tmpYearArray1 = [
        '2017',
        '2016',
        '2015',
        '2014',
        '2013'
    ];
    var tmpYearArray2 = ['2017', '2016', '2015', '2014', '2013'];
    var tmpArray1;
    var tmpArray2;
    var listTitle;
    var timeType = $('input[name="time"]:checked').val();
    if(timeType === 'weekly'){
        tmpArray1 = tmpWeekArray1;
        tmpArray2 = tmpWeekArray2;
        listTitle = CONST_STR.get('COMMISSION_WEEK');
    }else if(timeType === 'monthly'){
        tmpArray1 = tmpMonthArray1;
        tmpArray2 = tmpMonthArray2;
        listTitle = CONST_STR.get('COMMISSION_MONTH');
    }else if(timeType === 'yearly'){
        tmpArray1 = tmpYearArray1;
        tmpArray2 = tmpYearArray2;
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
            var tagAccNo = document.getElementById("commission.time");
            if (tagAccNo.nodeName === "INPUT") {
                tagAccNo.value = e.selectedValue1;
            }
            else {
                tagAccNo.innerHTML = e.selectedValue1;
            }
        }
    }
}

