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
var infoNode1 = document.getElementById('info1');
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

    if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 0) {
        document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="250px" height="250px" src="' + atob(gUserInfo.userAvatar) + '" />';
    }
    else {
        document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="250px" height="250px" src="./static/frontend/assets/images/acc-info-img.png"/>';
    }

   document.getElementById('cus-profile-fullname').innerHTML = gUserInfo.dispName;
   document.getElementById('cus-profile-birthday').innerHTML = gUserInfo.birthday;
   document.getElementById('cus-profile-userid').innerHTML = gUserInfo.identifier;
   document.getElementById('cus-profile-address').innerHTML = gUserInfo.address;
   document.getElementById('cus-profile-mobile').innerHTML = gUserInfo.phone;
   document.getElementById('cus-profile-email').innerHTML = gUserInfo.email;
   document.getElementById('cus-profile-cif').innerHTML = gUserInfo.userCode;
	
	//take picture
	document.getElementById("btnFile").value = '';
	document.getElementById("avatar-btn-upload").style.display = 'none';
	document.getElementById("avatar-btn-rotate").style.display = 'none';
	
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
				maxWidth: 250,
				canvas: true
			};
		if (!file) {
			logInfo("Not exist file");
			return;
		}
		loadImage.parseMetaData(file, function (data) {
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
	var tmpResult = document.getElementById('cus-profile-img-avatar');
	var tmpCanvas = tmpResult.getElementsByTagName('canvas')[0];
	var base64string = '';
	if(tmpCanvas) {
		base64string = tmpCanvas.toDataURL('image/jpeg');
	}
	var userAvatar = window.btoa(base64string);
    $.ajax({
        type: "POST",
        url:"/api/saveAvatar",
        data: JSON.stringify({
            userCode : gUserInfo.userCode,
            userAvatar: userAvatar
        }),
        contentType: "application/json; charset=utf-8",
        success:function(response){
            if(response.result){
                gUserInfo.userAvatar = userAvatar;
                $('#menu-profile-avatar img').attr('src',atob(gUserInfo.userAvatar));
                showAlertText(CONST_STR.get('SAVE_AVATAR_SUCCESS_MESSAGE'));
                document.addEventListener('closeAlertView', handleAlertChangeAvatar, false);
                logInfo('change avatar success!');
            } else {
                showAlertText(CONST_STR.get('SAVE_AVATAR_INFO_FAIL_MESSAGE'));
                logInfo('change avatar fail!');
            }
        },
        error: function () {
            showAlertText(CONST_STR.get('SAVE_AVATAR_INFO_FAIL_MESSAGE'));
            logInfo('change avatar fail!');
        }
    });
}

function handleAlertChangeAvatar() {
    document.removeEventListener('closeAlertView', handleAlertChangeAvatar, false);
    navController.initWithRootView('utilitiesxsl/personal-info-view-scr', true, 'xsl');
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
				maxWidth: 250,
				maxHeight: 250,
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
		
		var tmpMaxWidth = 250;
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
