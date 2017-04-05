/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var volumeHistoryObj;
var xslAccHisTable;
var flag_check = false;
var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;

var volumeHistoryList = new Array();

function viewBackFromOther() {
    logInfo('Back from other view');
    flag_check = true;
    setVolumeHistory(volumeHistoryObj);
}


function viewDidLoadSuccess() {
    if (flag_check == false) {
        sendJSONRequest();
    }
    $('input[name="time"]').on('change', function () {
        document.getElementById("commission.time").value = CONST_STR.get('SEQ_INPUT_TITLE');
    });
    sendJSONRequest();
}

function sendJSONRequest() {
    loadData('./data/listVolumnesWeekly.json', function (jsondata) {
        var volumeHistory = JSON.parse(jsondata)[gUserInfo.accountId];
        setCommissionInfo(commissionInfo);
    });
}

//event listener: http request success
function requestMBServiceSuccess(jsondata) {
    var accountDetail = JSON.parse(jsondata)[gUserInfo.accountId];
    setVolumeHistory(accountDetail);
    volumeHistoryObj = accountDetail;

    volumeHistoryList = JSON.parse(jsondata)[gUserInfo.accountId];
    parserVolumeHistory(volumeHistoryList);
};


function setCommissionInfo(commissionInfo) {
    if ((commissionInfo === undefined) || (commissionInfo.length < 1)) {
        var tmpNode = document.getElementById('volumeHistory');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (volumeHistoryList.length > 0) {

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

