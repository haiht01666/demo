/*** VIEW LOAD SUCCESS ***/

var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;

function viewBackFromOther() {
}




function viewDidLoadSuccess() {
    showLoadingMask();
    $('input[name="time"]').change(function () {
        requestJsonRequest();
    });
    requestJsonRequest();
}

function requestJsonRequest() {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/getSummaryInfo",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            limit: itemsPerPage,
            offset: (pageIndex - 1) * itemsPerPage,
            time: $('input[name="time"]:checked').val()
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.result) {
                setDataInfo(response.resultData);
                parserVolumeHistory(response.resultData.totalRecord,response.resultData.volumeInfoList);
                hideLoadingMask();
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
    document.getElementById("dispName").innerHTML = dataInfo.userInfo.dispName;
    document.getElementById("accountId").innerHTML = dataInfo.userInfo.userCode;
    document.getElementById("status").value = dataInfo.userInfo.activeStatus.status;
    document.getElementById("active").value = dataInfo.userInfo.activeStatus.dateNum;
    document.getElementById("backOffice").value = dataInfo.userInfo.backOfficeNum;
    document.getElementById("rank").value = dataInfo.userInfo.leverValue;
    document.getElementById("groupMonthVolumeTitle").innerHTML = dataInfo.monthTime;

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


function parserVolumeHistory(totalRecord, listHistoryVolume) {
    if ((listHistoryVolume == undefined) || (listHistoryVolume.length < 1)) {
        var tmpNode = document.getElementById('volumeHistory');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (listHistoryVolume.length > 0) {
        //total page
        totalPage = calTotalPage(totalRecord);
        genPagging(totalPage, pageIndex);
        //gen xml
        var tmpXmlDoc = genXMLHistoryDoc(listHistoryVolume);
        //gen xsl
        xslAccHisTable = getCachePageXsl("indexxsl/index-volume-history-table");
        var tmpXslDoc = xslAccHisTable;
        //gen html from xml and xsl
        genHTMLStringWithXMLScrollto(tmpXmlDoc, tmpXslDoc, function (oStr) {
            var tmpNode = document.getElementById('volumeHistory');
            tmpNode.innerHTML = oStr;
        }, null, null, document.getElementById('parse_transaction'));
    }

}

//EVENT SELECTED PAGE
function pageIndicatorSelected(selectedIdx) {
    pageIndex = selectedIdx;
    requestJsonRequest();

}

//GEN PAGGING
function genPagging(totalPage, pageIndex) {
    var nodepage = document.getElementById('volumeHistory.pagination');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(totalRecord) {
    if (totalRecord > 0) {
        return Math.ceil(totalRecord / itemsPerPage);
    }
    return 0;
}


function genXMLHistoryDoc(listHistoryVolume) {
    var docXml = createXMLDoc();
    var tmpXmlRootNode;

    var tmpXmlRootNode = createXMLNode('resptable', '', docXml);
    var tmpXmlNodeTitle = createXMLNode('tabletitle', '', docXml, tmpXmlRootNode);
    var time;
    if ($('input[name="time"]:checked').val() == 'weekly') {
        time = CONST_STR.get('LIST_VOLUME_WEEK_TABLE')
    } else if ($('input[name="time"]:checked').val() == 'monthly') {
        time = CONST_STR.get('LIST_VOLUME_MONTH_TABLE')
    } else if ($('input[name="time"]:checked').val() == 'yearly') {
        time = CONST_STR.get('LIST_VOLUME_YEAR_TABLE')
    }


    var tmpChildNode = createXMLNode('coltitle1', time, docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('LIST_VOLUME_PERSONAL_TABLE'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('LIST_VOLUME_GROUP_TABLE'), docXml, tmpXmlNodeTitle);

    for (var i = 0; i < listHistoryVolume.length; i++) {
        var tmpHisObj = listHistoryVolume[i];
        var tmpXmlNodeInfo = createXMLNode('tabletdetail', '', docXml, tmpXmlRootNode);

        tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_ORDER_ID'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent1', tmpHisObj.time, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_NPP__DIRECT_NAME'), docXml, tmpXmlNodeInfo);
        var personalVolume = formatNumberToCurrency(tmpHisObj.personalVolume);
        if (personalVolume == '0' || personalVolume == 0 || !personalVolume) personalVolume = '0';
        tmpChildNode = createXMLNode('colcontent2', personalVolume, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_NPP_COUNTRY'), docXml, tmpXmlNodeInfo);
        var groupVolume = formatNumberToCurrency(tmpHisObj.groupVolume);
        if (groupVolume == '0' || groupVolume == 0 || !groupVolume) groupVolume = '0';
        tmpChildNode = createXMLNode('colcontent3', groupVolume, docXml, tmpXmlNodeInfo);
    }
    return docXml;
}

