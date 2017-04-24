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
    var orderby = 'id';
    $.ajax({
        type: "POST",
        url: "/api/getNpp",
        data: JSON.stringify({
            directNpp: false,
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
                parserNppData(response.numberRecord ,response.resultData);
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


function parserNppData(totalRecord, listAllNpp) {
    if ((listAllNpp == undefined) || (listAllNpp.length < 1)) {
        var tmpNode = document.getElementById('id.allNpp');
        tmpNode.innerHTML = CONST_STR.get('NO_DATA');
        return;
    }
    totalPage = 0;
    if (listAllNpp.length > 0) {
        //total page
        totalPage = calTotalPage(totalRecord);
        genPagging(totalPage, pageIndex);
        //gen xml
        var tmpXmlDoc = genXMLHistoryDoc(listAllNpp);
        //gen xsl
        xslAccHisTable = getCachePageXsl("groupxsl/group-list-npp-table");
        var tmpXslDoc = xslAccHisTable;
        //gen html from xml and xsl
        genHTMLStringWithXMLScrollto(tmpXmlDoc, tmpXslDoc, function (oStr) {
            var tmpNode = document.getElementById('id.allNpp');
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

    //var nodePager = document.getElementById('pageIndicatorNums');
    var nodepage = document.getElementById('allNpp.pagination');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(totalRecord) {
    if (totalRecord > 0) {
        return Math.ceil(totalRecord / itemsPerPage);
    }
    return 0;
}


function genXMLHistoryDoc(listAllNpp) {
    var docXml = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('resptable', '', docXml);
    var tmpXmlNodeTitle = createXMLNode('tabletitle', '', docXml, tmpXmlRootNode);
    var tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_NPP_ID'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_NPP_NAME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_NPP_COUNTRY'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('GROUP_MANAGER_NPP_SPONSOR_ID'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('GROUP_MANAGER_NPP_LAST_DATE_SIGN_IN'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('GROUP_MANAGER_NPP_DT'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('GROUP_MANAGER_NPP_CITY'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('GROUP_MANAGER_NPP_STATUS'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('coltitle9', CONST_STR.get('GROUP_MANAGER_NPP_RANK'), docXml, tmpXmlNodeTitle);

    for (var i = 0; i < listAllNpp.length; i++) {
        var tmpHisObj = listAllNpp[i];
        var tmpXmlNodeInfo = createXMLNode('tabletdetail', '', docXml, tmpXmlRootNode);

        tmpChildNode = createXMLNode('coltitle1', CONST_STR.get('GROUP_MANAGER_NPP_ID'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent1', tmpHisObj.userCode, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle2', CONST_STR.get('GROUP_MANAGER_NPP_NAME'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent2', tmpHisObj.dispName, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle3', CONST_STR.get('GROUP_MANAGER_NPP_COUNTRY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent3', tmpHisObj.agentLevel, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle4', CONST_STR.get('GROUP_MANAGER_NPP_SPONSOR_ID'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent4', tmpHisObj.parentId, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle5', CONST_STR.get('GROUP_MANAGER_NPP_LAST_DATE_SIGN_IN'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent5', moment(tmpHisObj.signUpDate, "YYYY-MM-DD").format('DD/MM/YYYY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle6', CONST_STR.get('GROUP_MANAGER_NPP_DT'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent6', tmpHisObj.phone, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle7', CONST_STR.get('GROUP_MANAGER_NPP_CITY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent7', tmpHisObj.city, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle8', CONST_STR.get('GROUP_MANAGER_NPP_STATUS'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent8', tmpHisObj.status, docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('coltitle9', CONST_STR.get('GROUP_MANAGER_NPP_RANK'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('colcontent9', tmpHisObj.leverValue, docXml, tmpXmlNodeInfo);
    }
    return docXml;
}

