/**
 * Created by HuyNT2
 * User:
 * Date: 01/20/14
 */

/*** HEADER ***/

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
    document.getElementById('accountId').innerHTML = gUserInfo.dispName + ': ' + gUserInfo.userCode;
    sendJSONRequest();
}

/*** VIEW LOAD SUCCESS END  ***/

/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
    logInfo('account history will unload');
}
/*** SEND REQUEST ***/

function sendJSONRequest() {
    showLoadingMask();
    var offset = (pageIndex - 1) * itemsPerPage;
    var orderby = 'user_id';
    $.ajax({
        type: "POST",
        url: "/api/getPersonalOrder",
        data: JSON.stringify({
            userCode: gUserInfo.userCode,
            childId : gUserInfo.childId,
            limit: itemsPerPage,
            offset: offset,
            orderby: orderby
        }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            hideLoadingMask();
            if (response.result) {
                parserOrderData(response.numberRecord ,response.resultData);
            } else {
                showAlertText(CONST_STR.get('GET_ORDER_FAIL'));
            }
        },
        error: function () {
            hideLoadingMask();
            showAlertText(CONST_STR.get('GET_ORDER_FAIL'));
        }
    });
}


function parserOrderData(totalRecord, listAllOrder) {
    if ((listAllOrder == undefined) || (listAllOrder.length < 1)) {
        var tmpNode = document.getElementById('id.listOrder');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (listAllOrder.length > 0) {
        //total page
        totalPage = calTotalPage(totalRecord);
        genPagging(totalPage, pageIndex);
        //gen xml
        var tmpXmlDoc = genXMLHistoryDoc(listAllOrder);
        //gen xsl
        xslAccHisTable = getCachePageXsl("personal/personal-list-order-table");
        var tmpXslDoc = xslAccHisTable;
        //gen html from xml and xsl
        genHTMLStringWithXMLScrollto(tmpXmlDoc, tmpXslDoc, function (oStr) {
            var tmpNode = document.getElementById('id.listOrder');
            tmpNode.innerHTML = oStr;
        }, null, null, document.getElementById('parse_transaction'));
    }

}

//EVENT SELECTED PAGE
function pageIndicatorSelected(selectedIdx) {
    pageIndex = selectedIdx;
    sendJSONRequest();
}

//GEN PAGGING
function genPagging(totalPage, pageIndex) {
    var nodepage = document.getElementById('order.pagination');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(totalRecord) {
    if (totalRecord > 0) {
        return Math.ceil(totalRecord / itemsPerPage);
    }
    return 0;
}


function genXMLHistoryDoc(listAllOrder) {
    var docXml = createXMLDoc();
    var tmpXmlRootNode;

    var tmpXmlRootNode = createXMLNode('resptable', '', docXml);
    var tmpXmlNodeTitle = createXMLNode('tabletitle', '', docXml, tmpXmlRootNode);
    var tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_ORDER_ID'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_NPP__DIRECT_NAME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_NPP_COUNTRY'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('GROUP_MANAGER_ORDER_NAME_PRODUCT'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('GROUP_MANAGER_ORDER_TIME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('GROUP_MANAGER_ORDER_PRICE_PRODUCT'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('GROUP_MANAGER_ORDER_QUALITY_PRODUCT'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('GROUP_MANAGER_ORDER_TYPE_PRODUCT'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle9', CONST_STR.get('GROUP_MANAGER_TOTAL_VOLUME'), docXml, tmpXmlNodeTitle);

    for (var i = 0; i < listAllOrder.length; i++) {
        var tmpHisObj = listAllOrder[i];
        var tmpXmlNodeInfo = createXMLNode('tabletdetail', '', docXml, tmpXmlRootNode);

        tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_ORDER_ID'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent1', tmpHisObj.userId, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_NPP__DIRECT_NAME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent2', tmpHisObj.userName, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_NPP_COUNTRY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent3', tmpHisObj.agentLevel, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('GROUP_MANAGER_ORDER_NAME_PRODUCT'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent4', tmpHisObj.orderName, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('GROUP_MANAGER_ORDER_TIME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent5', moment(tmpHisObj.orderDate, "YYYY-MM-DD").format('DD/MM/YYYY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('GROUP_MANAGER_ORDER_PRICE_PRODUCT'), docXml, tmpXmlNodeInfo);
        var tmpPrice = formatNumberToCurrency(tmpHisObj.price);
        if (tmpPrice == '0' || tmpPrice == 0 || !tmpPrice) tmpPrice = '0';
        tmpChildNode = createXMLNode('colcontent6', tmpPrice, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('GROUP_MANAGER_ORDER_QUALITY_PRODUCT'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent7', tmpHisObj.quantity, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('GROUP_MANAGER_ORDER_TYPE_PRODUCT'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent8', tmpHisObj.typeValue, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle9', CONST_STR.get('GROUP_MANAGER_TOTAL_VOLUME'), docXml, tmpXmlNodeInfo);
        var tmpTotal = formatNumberToCurrency(tmpHisObj.total);
        if (tmpTotal == '0' || tmpTotal == 0 || !tmpTotal) tmpTotal = '0';
        tmpChildNode = createXMLNode('colcontent9', tmpTotal, docXml, tmpXmlNodeInfo);
    }
    return docXml;
}

