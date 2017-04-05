/**
 * Created by HuyNT2.
 * User: 
 * Date: 01/12/15
 * Time: 11:35 AM
 */

/*** HEADER ***/
//take picture
var imgSelected;
var currentFile;
var resultUserImg;
//var canvasIg = document.getElementById("canvasImg");
var infoNode1 = document.getElementById('info1');
var icropper1;
var isSmallScrMode;
var clientCusWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var canvasImg = document.createElement("canvas");
var ctxImg = canvasImg.getContext("2d");
var scaledImage = null;
var angleRotate = 0;

/*** INIT VIEW ***/
function loadInitXML() {
	return '';
}

/*** INIT VIEW END ***/

/*** VIEW LOAD SUCCESS ***/

function viewDidLoadSuccess() {


	logInfo(' load success');
	if(gUserInfo.userAvatar && gUserInfo.userAvatar.length > 0) {
		document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="300" src="' + gUserInfo.userAvatar + '" />';
	}
	else {
		document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="300" src="./assets/images/acc-info-img.png" />';
	}
	var data = {};
	var arrayArgs = new Array();
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_CHNG_CUS_INFO"), "", "", gUserInfo.lang , gUserInfo.sessionID, arrayArgs);
	
	data = getDataFromGprsCmd(gprsCmd);





	
	// requestMBService(data, true, 0, function(e){
	// 	gprsResp = parserJSON(e);
	// 	if ((gprsResp.respCode == '0') &&
	// 		(parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_CHNG_CUS_INFO"))) &&
	// 		gprsResp.arguments != undefined) {
	// 		logInfo(gprsResp.arguments);
	//
	// 		var tmpArr = gprsResp.arguments;
	// 		if (tmpArr.length >= 15) {
	// 			/*cusInfoObj = {"name":tmpArr[0], "birthday":tmpArr[1], "idPassport":tmpArr[2], "occupation":tmpArr[3],
	// 					"workPlace":tmpArr[4], "workAddress1":tmpArr[5], "workAddress2":tmpArr[6], "workAddress3":tmpArr[7],
	// 					"workTel":tmpArr[8], "currAddress1":tmpArr[9], "currAddress2":tmpArr[10], "currAddress3":tmpArr[11],
	// 					"currAddress4":tmpArr[12], "mobile":tmpArr[13], "email":tmpArr[14]};*/
	// 			document.getElementById('cus-profile-fullname').innerHTML = tmpArr[0];
	// 			document.getElementById('cus-profile-birthday').innerHTML = tmpArr[1];
	// 			document.getElementById('cus-profile-userid').innerHTML = tmpArr[2];
	// 			document.getElementById('cus-profile-address').innerHTML = tmpArr[9] + ' ' + tmpArr[10] + ' ' + tmpArr[11] + ' ' + tmpArr[12];
	// 			document.getElementById('cus-profile-mobile').innerHTML = tmpArr[13];
	// 			document.getElementById('cus-profile-email').innerHTML = tmpArr[14];
	// 			document.getElementById('cus-profile-cif').innerHTML = gCustomerNo;
	// 		} else {
	// 			showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_SERVICE_ERROR_MSG'));
	// 		}
	//
	// 	}
	// }, function(){
	//
	// });

    loadData('./data/account.json', function (jsondata) {
        var accountInfo = JSON.parse(jsondata)[gUserInfo.accountId];
        document.getElementById('cus-profile-fullname').innerHTML = accountInfo.fullname;
        document.getElementById('cus-profile-birthday').innerHTML = accountInfo.birthday;
        document.getElementById('cus-profile-userid').innerHTML =  accountInfo.userid;
        document.getElementById('cus-profile-address').innerHTML = accountInfo.address;
        document.getElementById('cus-profile-mobile').innerHTML =  accountInfo.mobile;
        document.getElementById('cus-profile-email').innerHTML =  accountInfo.email;
        document.getElementById('cus-profile-cif').innerHTML =  gUserInfo.accountId;
    });
	
	//take picture
	document.getElementById("btnFile").value = '';//CONST_STR.get('TRANSFER_LIST_CHOICE_FILE');
	document.getElementById("avatar-btn-upload").style.display = 'none';
	document.getElementById("avatar-btn-rotate").style.display = 'none';//ngocdt3 bo sung
	
	imgSelected = document.getElementById("id.fileUpload01");
	resultUserImg = document.getElementById('cus-profile-img-avatar');
	//canvasIg = document.getElementById("canvasImg");
	infoNode1 = document.getElementById('info1');
	clientCusWidth -= 25;// padding size
	if(gModeScreenView == CONST_MODE_SCR_SMALL) {
		isSmallScrMode = true;
	}
	else {
		isSmallScrMode = false;
	}
	imgSelected.onchange = function(e) {
		
		e.preventDefault();
		var target = e.dataTransfer || e.target;
		var file = target && target.files && target.files[0];
		var options = {
				maxWidth: resultUserImg.width,
				canvas: true
			};
		if (!file) {
			logInfo("Not exist file");
			return;
		}
		//if(!file.type.match(/image.*/)){
//			logInfo("Not an image: ", file.type);
//			return;
//		}
		loadImage.parseMetaData(file, function (data) {
			/*if (data.exif) {
				options.orientation = data.exif.get('Orientation');
				//displayExifData(data.exif);
			}*/
			displayImage(file, options);
		});
		fnChange(imgSelected);
	}
	//only enable camera: ios > 5 & android > 4 & chrome moi
	if(isAndroidBrowserAbove4 || iOSversion() > 5) {
		document.getElementById('take-picture-icon').style.display = '';
	}
	else {
		document.getElementById('take-picture-icon').style.display = 'none'
	}
}

/*** VIEW LOAD SUCCESS END viewWillUnload ***/

/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
	logInfo(' will unload');
	
}

/*** VIEW WILL UNLOAD END ***/

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back from other view');
}

/*** VIEW BACK FROM OTHER ***/

/*** FUNCTION ***/

/***
	createXMLDoc(); //return XML document
	
	createXMLNode(nodeKey, nodeValue, inDocXml, nodeParent) //void
		+ nodeKey: tag name (require)
		+ nodeValue: node text or ""
		+ inDocXml: XML document (require)
		+ nodeParent: xml node or null
		
	setNodeText(inNode, inStr); //void
		+ inNode: xml node
		+ inStr: node content
***/

function requestChangeAvatar() {
	var data = {};
	var arrayArgs = new Array();
	
	var tmpResult = document.getElementById('cus-profile-img-avatar');
	var tmpCanvas = tmpResult.getElementsByTagName('canvas')[0];
	var base64string = '';
	if(tmpCanvas) {
		base64string = tmpCanvas.toDataURL('image/jpeg');
	}
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_CHNG_CUS_AVATAR"), "", "", gUserInfo.lang , gUserInfo.sessionID, arrayArgs, encodeURIComponent(base64string));
	
	data = getDataFromGprsCmd(gprsCmd);
	
	requestMBService(data, true, 0, function(e) {
		gprsResp = parserJSON(e);
		if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_CHNG_CUS_AVATAR"))) && gprsResp.arguments != undefined) {
			logInfo('change avatar success!');
			gUserInfo.userAvatar = gprsResp.arguments[0];
			document.getElementById('avatar-btn-upload').style.display = 'none';
			document.getElementById('avatar-btn-rotate').style.display = 'none';
			/*document.getElementById('menu-profile-avatar').innerHTML = '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo.userAvatar + '" />';*/
			document.getElementById('menu-profile-avatar').innerHTML = '<img class="avatar-size" style="margin-top:-1px" src="' + gUserInfo.userAvatar + '" />';
			document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
		} 
	}, function() {
		logInfo('change avatar fail!');
	});
}

/*upload file*/
function fnChange(obj) {
	resultUserImg.innerHTML = ''; //clear result loaded-file

	var objTmp = document.getElementById("btnFile");
	if(obj.value.trim().length > 0)  {
	objTmp.value = obj.value;
	} else {
		objTmp.value = '';
	}

}

/* Take picture */

function displayImage(file, options) {
	currentFile = file;
	if (!loadImage(
			file,
			replaceResults,
			{
				maxWidth: 600,
				maxHeight: 600,
				crop: true
				/*aspectRatio: 1*/
			}
		)) {
		logInfo('Not support the URL or FileReader API');
	}
}

function replaceResults(img) {
	var content;
	
	if (!(img.src || img instanceof HTMLCanvasElement)) {
		logInfo('Loading image file failed');
	} else {
		
		var tmpMaxWidth = 300;
		var tmpRatio = img.height / img.width;
		var tmpMaxSize = tmpMaxWidth;
		
		scaledImage = loadImage.scale(
			img, // img or canvas element
			{
				maxWidth: tmpMaxWidth,
				canvas: true
			}
		);
		resultUserImg.innerHTML = ''; //clear result loaded-file
		canvasImg.width = tmpMaxWidth;
		canvasImg.height = tmpMaxWidth;
		ctxImg.drawImage(scaledImage, canvasImg.width/2-scaledImage.width/2, canvasImg.height/2-scaledImage.width/2);
		resultUserImg.appendChild(canvasImg);
		document.getElementById('btnFile').value = '';
		document.getElementById('avatar-btn-upload').style.display = '';
		document.getElementById('avatar-btn-rotate').style.display = '';//ngocdt3 bo sung
	}
}


function rotateImageIntroCus(inDegree) {
	angleRotate += inDegree;
	ctxImg.clearRect(0,0,canvasImg.width,canvasImg.height);
    ctxImg.save();
	ctxImg.fillStyle = "#FFFFFF"; // blue
	logInfo("Canvas gap size: " + Math.abs(canvasImg.height - canvasImg.width) / 2);
    ctxImg.translate(canvasImg.width/2, canvasImg.height/2);
	ctxImg.rotate(angleRotate*Math.PI/180);
    //ctxImg.drawImage(scaledImage,-scaledImage.width/2,-scaledImage.width/2 + Math.abs(scaledImage.height-scaledImage.width)/2);
	ctxImg.drawImage(scaledImage,-scaledImage.width/2,-scaledImage.width/2);// + Math.abs(scaledImage.height-scaledImage.width)/2);
    ctxImg.restore();
}

/* Take picture end */
