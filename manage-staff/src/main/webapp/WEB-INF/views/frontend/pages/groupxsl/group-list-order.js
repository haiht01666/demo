/**
 * Created by HuyNT2
 * User:
 * Date: 01/20/14
 */

/*** HEADER ***/

var listOrders = new Array();
var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;
var xslAccHisTable;

/*** INIT VIEW ***/
function loadInitXML() {
    return '';
}

/*** INIT VIEW END ***/

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
    logInfo('Back from other view');
}

/*** VIEW BACK FROM OTHER ***/

/*** VIEW LOAD SUCCESS ***/

function viewDidLoadSuccess() {
    logInfo('account history load success');
    document.getElementById('accountId').innerHTML = gUserInfo.accountDispName + ': ' + gUserInfo.accountId;
    sendJSONRequest();
}

/*** VIEW LOAD SUCCESS END  ***/

/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
    logInfo('account history will unload');
}
/*** SEND REQUEST ***/

function sendJSONRequest() {
    loadData('./data/listOrders.json', function (jsondata) {
        listOrders = JSON.parse(jsondata)[gUserInfo.accountId];
        parserAccHistory(listOrders);
    });
}


function parserAccHistory(listOrders) {
    if ((listOrders == undefined) || (listOrders.length < 1)) {
        var tmpNode = document.getElementById('id.historyInfo');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (listOrders.length > 0) {
        //total page
        totalPage = calTotalPage(listOrders);

        //gen page indicator
        pageIndex = 1;
        genPagging(totalPage, pageIndex);

        //get object per page
        var arrMedial = new Array();
        arrMedial = getItemsPerPage(listOrders, pageIndex);

        //gen xml
        var tmpXmlDoc = genXMLHistoryDoc(arrMedial);
        //gen xsl
        xslAccHisTable = getCachePageXsl("groupxsl/group-list-order-table");
        var tmpXslDoc = xslAccHisTable;
        //gen html from xml and xsl
        genHTMLStringWithXMLScrollto(tmpXmlDoc, tmpXslDoc, function (oStr) {
            var tmpNode = document.getElementById('id.historyInfo');
            tmpNode.innerHTML = oStr;
        }, null, null, document.getElementById('parse_transaction'));
    }

}


//EVENT SELECTED PAGE
function pageIndicatorSelected(selectedIdx, selectedPage) {
    pageIndex = selectedIdx;

    var arrMedial = new Array();
    arrMedial = getItemsPerPage(listOrders, selectedIdx);
    //gen xml
    var tmpXmlDoc = genXMLHistoryDoc(arrMedial);
    //gen xsl
    var tmpXslDoc = xslAccHisTable;

    genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function (oStr) {
        var tmpNode = document.getElementById('id.historyInfo');
        tmpNode.innerHTML = oStr;
    });

}

//GEN PAGGING
function genPagging(arr, pageIndex) {

    //var nodePager = document.getElementById('pageIndicatorNums');
    var nodepage = document.getElementById('acc.pagination');
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
    var tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_NPP_NAME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_ORDER_TIME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_TOTAL_VOLUME'), docXml, tmpXmlNodeTitle);

    for (var i = 0; i < inHisArray.length; i++) {
        var tmpHisObj = inHisArray[i];
        var tmpXmlNodeInfo = createXMLNode('tabletdetail', '', docXml, tmpXmlRootNode);

        tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_NPP_NAME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent1', tmpHisObj.nppName, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_ORDER_TIME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent2', tmpHisObj.orderDate, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_TOTAL_VOLUME'), docXml, tmpXmlNodeInfo);
        var tmpTotalVolume = formatNumberToCurrency(tmpHisObj.totalVolume);
        if (tmpTotalVolume == '0' || tmpTotalVolume == 0 || !tmpTotalVolume) tmpTotalVolume = '';
        tmpChildNode = createXMLNode('colcontent3', tmpTotalVolume, docXml, tmpXmlNodeInfo);
    }
    return docXml;
}

