var locationId = '';
var catNameTmp = '';
var catIdTmp = '';
var docXml;
var arrLocation = null;
var flgSelectLoc = false;
var arrNews;
var numberRecords = 10;
var pageIndex = 1;

var isFirefox = navigator.userAgent.match(/firefox/i);

function viewDidLoadSuccess(){
	debugger;
	loadLocation();	
    if(isFirefox){
		var cat = document.getElementsByName("nm.category");
		for(var i = 0; i < cat.length; i++){
		    cat[i].style.marginTop = "15px"
		}
	}
}

function loadLocation() {
	arrLocation = new Array();
	var table = document.getElementById("tblResult");
	if(table != null || table != undefined){
		for(var i = 0; i < table.rows.length; i++) {
			arrLocation.push({
				id : table.rows[i].cells[0].innerHTML,
				name : table.rows[i].cells[1].innerHTML
				});
			}
	}
	return arrLocation;
}

function displayRadioLoc(){	
	document.getElementById("id.radioLocationBTN").style.display = '';
	if(!flgSelectLoc){
		document.getElementById("HN").checked = true;
		locationId = document.getElementById("HN").id;
	}
	
	for (var i = 0; i < arrLocation.length; i++){
		if(locationId == arrLocation[i].id){
			document.getElementById("id.location").value = arrLocation[i].name;
		}
	}
	flgSelectLoc = true;
}

function selectLoc(obj){
	document.getElementById("id.radioLocationBTN").style.display = 'none';
	
	document.getElementById(obj.defaultValue).checked = true;
	locationId = obj.defaultValue;
	if (catNameTmp == ''){		
		for (var i = 0; i < arrLocation.length; i++){
			if(locationId == arrLocation[i].id){
				document.getElementById("id.location").value = arrLocation[i].name;
				document.getElementById("id.radioLocationBTN").style.display = 'none';
			}
		}
	}
	else {
		getNewsWebServices();
	}
}

function openNewsMenu(catId, catName){
 	catIdTmp = catId;
	catNameTmp = catName;
	if(!flgSelectLoc){
		document.getElementById("HN").checked = true;
		locationId = document.getElementById("HN").id;
	}
	
	getNewsWebServices();
}

function getNewsWebServices(){
	if(!arrLocation || arrLocation.length == 0) {
		loadLocation();
	}
	for (var i = 0; i < arrLocation.length; i++){
		if(locationId == arrLocation[i].id){
			document.getElementById("id.location").value = arrLocation[i].name + ' > ' + catNameTmp;
		}
	}
	
	document.getElementById("id.radioLocationBTN").style.display = 'none';
	
	var dataPromotion = {};
	var arrayArgs = new Array();
	//arrayArgs.push("PROMOTION");
	arrayArgs.push("NEW#" + catIdTmp + "#" + locationId);
	//requestBacgroundMBService("CMD_TYPE_GET_PROMOTION", arrayArgs, requestDetailPromotionSuccess, requestDetailPromotionFail);
	var gprsCmdPromotion = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_GET_PROMOTION"), "", "", "VN", "", arrayArgs);
	dataPromotion = getDataFromGprsCmd(gprsCmdPromotion);
	
	requestMBService(dataPromotion, true, 0, requestDetailPromotionSuccess, requestDetailPromotionFail);
	
}

function requestDetailPromotionSuccess(e) {
	closeMenuPromotion(); //close all slide menu
	
	var tmpRespObj = parserJSON(e);
	if(tmpRespObj.arguments && tmpRespObj.arguments.length > 0) {
		logInfo('recevice promotion detail: ' + tmpRespObj.arguments[0]);
		var docXml = stringtoXML(tmpRespObj.arguments[0]);
		setNewsStoreXml(docXml);
		navController.resetCacheBranch();
		//navController.pushToView('newsxsl/list_news_detail_scr', true, "xsl");
		navController.initWithRootView('newsxsl/list_news_detail_scr', true, "xsl");
	}
}

function requestDetailPromotionFail(e) {
	
}

