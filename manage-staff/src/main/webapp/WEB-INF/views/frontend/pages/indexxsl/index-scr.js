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
    sendJSONRequest();
}

function sendJSONRequest() {
    loadData('./data/account.json', function (jsondata) {
        var accountDetail = JSON.parse(jsondata)[gUserInfo.accountId];
        setVolumeHistory(accountDetail);
    });
    loadData('./data/listVolumnesWeekly.json', function (jsondata) {
        volumeHistoryList = JSON.parse(jsondata)[gUserInfo.accountId];
        parserVolumeHistory(volumeHistoryList);
    });
}
function setVolumeHistory(accountDetail) {
    document.getElementById("dispName").value = accountDetail.fullname;
    document.getElementById("accountId").value = accountDetail.userid;
    document.getElementById("status").value = accountDetail.status === '0' ? 'Active' : 'InActive';
    document.getElementById("rank").value = accountDetail.rank === '0' ? 'Distributor' : accountDetail.rank === '1' ? 'Member' : 'Professional';
    document.getElementById("standard").value = accountDetail.standard;
    var tmpTotalVolume = formatNumberToCurrency(accountDetail.totalVolume);
    if (tmpTotalVolume === '0' || tmpTotalVolume === 0 || !tmpTotalVolume) tmpTotalVolume = '';
    document.getElementById("totalVolume").value = tmpTotalVolume;
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

