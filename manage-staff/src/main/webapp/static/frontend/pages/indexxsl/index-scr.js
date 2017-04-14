/*** VIEW LOAD SUCCESS ***/

var volumeHistoryObj;
var xslAccHisTable;
var flag_check = false;
var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;

var volumeHistoryList = new Array();

function viewBackFromOther() {
    //logInfo('Back from other view');
    //flag_check = true;
    //setVolumeHistory(volumeHistoryObj);
}


function viewDidLoadSuccess() {
    showLoadingMask();
    $.ajax({
        type: "POST",
        url: "/api/getSummaryInfo",
        data: JSON.stringify({
            userCode: gUserInfo.userCode
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            hideLoadingMask();
            if (response.result) {

                setDataInfo(response.resultData);

                //setDetailInfo(response.resultData);
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
    document.getElementById("dispName").value = dataInfo.userInfo.dispName;
    document.getElementById("accountId").value = dataInfo.userInfo.userCode;
    document.getElementById("status").value = dataInfo.userInfo.enable === '0' ? 'Active' : 'InActive';
    document.getElementById("rank").value = dataInfo.userInfo.leverValue;
    document.getElementById("groupMonthVolumeTitle").innerHTML = dataInfo.monthTime;
    document.getElementById("week0Time").innerHTML = dataInfo.week0Time;
    document.getElementById("week1Time").innerHTML = dataInfo.week1Time;
    document.getElementById("week2Time").innerHTML = dataInfo.week2Time;
    document.getElementById("week3Time").innerHTML = dataInfo.week3Time;
    var monthPersonalVolume = formatNumberToCurrency(dataInfo.monthPersonalVolume);
    if (monthPersonalVolume === '0' || monthPersonalVolume === 0 || !monthPersonalVolume) monthPersonalVolume = '0';
    document.getElementById("monthPersonalVolume").value = monthPersonalVolume;
    var volumeWeek0 = formatNumberToCurrency(dataInfo.groupVolumeWeek0);
    if (volumeWeek0 === '0' || volumeWeek0 === 0 || !volumeWeek0) volumeWeek0 = '0';
    document.getElementById("volumeWeek0").value = volumeWeek0;
    var volumeWeek1 = formatNumberToCurrency(dataInfo.groupVolumeWeek1);
    if (volumeWeek1 === '0' || volumeWeek1 === 0 || !volumeWeek1) volumeWeek1 = '0';
    document.getElementById("volumeWeek1").value = volumeWeek1;
    var volumeWeek2 = formatNumberToCurrency(dataInfo.groupVolumeWeek2);
    if (volumeWeek2 === '0' || volumeWeek2 === 0 || !volumeWeek2) volumeWeek2 = '0';
    document.getElementById("volumeWeek2").value = volumeWeek2;
    var volumeWeek3 = formatNumberToCurrency(dataInfo.groupVolumeWeek3);
    if (volumeWeek3 === '0' || volumeWeek3 === 0 || !volumeWeek3) volumeWeek3 = '0';
    document.getElementById("volumeWeek3").value = volumeWeek3;
}


function parserVolumeHistory(volumeHistoryList) {
    if ((volumeHistoryList === undefined) || (volumeHistoryList.length < 1)) {
        var tmpNode = document.getElementById('volumeHistory');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (volumeHistoryList.length > 0) {
        //total page
        totalPage = calTotalPage(volumeHistoryList);

        //gen page indicator
        pageIndex = 1;
        genPagging(totalPage, pageIndex);

        //get object per page
        var arrMedial = getItemsPerPage(volumeHistoryList, pageIndex);

        //gen xml
        var tmpXmlDoc = genXMLHistoryDoc(arrMedial);
        //gen xsl
        xslAccHisTable = getCachePageXsl("indexxsl/index-volume-history-table");
        var tmpXslDoc = xslAccHisTable;
        //gen html from xml and xsl
        genHTMLStringWithXMLScrollto(tmpXmlDoc, tmpXslDoc, function (oStr) {
            var tmpNode = document.getElementById('volumeHistory');
            tmpNode.innerHTML = oStr;
        }, null, null, null);
    }

}


//EVENT SELECTED PAGE
function pageIndicatorSelected(selectedIdx, selectedPage) {
    pageIndex = selectedIdx;
    var arrMedial = getItemsPerPage(volumeHistoryList, selectedIdx);
    //gen xml
    var tmpXmlDoc = genXMLHistoryDoc(arrMedial);
    //gen xsl
    var tmpXslDoc = xslAccHisTable;

    genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function (oStr) {
        var tmpNode = document.getElementById('volumeHistory');
        tmpNode.innerHTML = oStr;
    });
}

//GEN PAGGING
function genPagging(arr, pageIndex) {

    //var nodePager = document.getElementById('pageIndicatorNums');
    var nodepage = document.getElementById('volumeHistory.pagination');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(arrObj) {
    if (arrObj != null && arrObj.length > 0) {
        return Math.ceil(arrObj.length / itemsPerPage);
    }
    return 0;
}

//get items per page
function getItemsPerPage(arrObj, pageIndex) {
    var arrTmp = new Array();
    var from = 0;
    var to = 0;
    for (var i = 0; i < arrObj.length; i++) {
        from = (pageIndex - 1) * itemsPerPage;
        to = from + itemsPerPage;
        if (i >= from && i < to) {
            arrTmp.push(arrObj[i]);
        }
    }
    return arrTmp;
}


function genXMLHistoryDoc(inHisArray) {
    var docXml = createXMLDoc();
    var tmpXmlRootNode;

    var tmpXmlRootNode = createXMLNode('resptable', '', docXml);
    var tmpXmlNodeTitle = createXMLNode('tabletitle', '', docXml, tmpXmlRootNode);
    var tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('LIST_VOLUME_HISTORY_TIME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('LIST_VOLUME_HISTORY_PERSONAL_VOLUME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_CARRYOVER'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_CARRYOVER'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_VOLUME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_VOLUME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_TOTAL'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_TOTAL'), docXml, tmpXmlNodeTitle);

    for (var i = 0; i < inHisArray.length; i++) {
        var tmpHisObj = inHisArray[i];
        var tmpXmlNodeInfo = createXMLNode('tabletdetail', '', docXml, tmpXmlRootNode);

        tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('LIST_VOLUME_HISTORY_TIME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent1', tmpHisObj.time, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('LIST_VOLUME_HISTORY_PERSONAL_VOLUME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent2', formatNumberToCurrency(tmpHisObj.personalVolume), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_CARRYOVER'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent3', formatNumberToCurrency(tmpHisObj.leftCarryover), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_CARRYOVER'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent4', formatNumberToCurrency(tmpHisObj.rightCarryover), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_VOLUME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent5', formatNumberToCurrency(tmpHisObj.leftVolume), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_VOLUME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent6', formatNumberToCurrency(tmpHisObj.rightVolume), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('LIST_VOLUME_HISTORY_LEFT_TOTAL'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent7', formatNumberToCurrency(tmpHisObj.leftTotal), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('LIST_VOLUME_HISTORY_RIGHT_TOTAL'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent8', formatNumberToCurrency(tmpHisObj.rightTotal), docXml, tmpXmlNodeInfo);
    }
    return docXml;
}
//-------------------------------------------------------------------------------------------------------------------------
// week volume
//-------------------------------------------------------------------------------------------------------------------------

function parserWeekVolume(weekVolume) {


}

