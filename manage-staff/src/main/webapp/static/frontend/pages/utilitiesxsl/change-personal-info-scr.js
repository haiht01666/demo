/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var cusInfoObj;
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
var flag_check = false;

function viewBackFromOther() {
    logInfo('Back from other view');
    flag_check = true;
    setDefaultInfo();
}


function viewDidLoadSuccess() {
    document.getElementById("confirmBtn").disabled = true;
    if (flag_check == false) {
        setDefaultInfo();
    }
    setDefaultInfo();

    //take picture
    document.getElementById("btnFile").value = CONST_STR.get('TRANSFER_LIST_CHOICE_FILE');

    imgSelected = document.getElementById("id.fileUpload01");
    resultUserImg = document.getElementById('cropperContainer2');
    resultUserImg.innerHTML = '';
    document.getElementById('tb-prevPicture').style.display = 'none';
    //canvasIg = document.getElementById("canvasImg");
    infoNode1 = document.getElementById('info1');
    clientCusWidth -= 25;// padding size
    if (gModeScreenView == CONST_MODE_SCR_SMALL) {
        isSmallScrMode = true;
    }
    else {
        isSmallScrMode = false;
    }
    imgSelected.onchange = function (e) {

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
        loadImage.parseMetaData(file, function (data) {
            displayImage(file, options);
        });
        fnChange(imgSelected);
    };
    //only enable camera: ios > 5 & android > 4 & chrome moi
    if (isAndroidBrowserAbove4 || iOSversion() > 5) {
        document.getElementById('take-picture-icon').style.display = '';
    }
    else {
        document.getElementById('take-picture-icon').style.display = 'none'
    }

    setInputOnlyNumberInfo('mobile');
    setInputOnlyASCIIinfo('email');
    setInputOnlyASCII('address');
    setInputOnlyASCII('bankName');
    setInputOnlyASCII('bankDivice');
    setInputOnlyASCII('bankAccount');
    setInputOnlyASCII('bankAccountName');
}

function setDefaultInfo() {
    document.getElementById("name").innerHTML = gUserInfo.dispName;
    document.getElementById("birthday").innerHTML = gUserInfo.birthday;
    document.getElementById("userid").innerHTML = gUserInfo.identifier;
    document.getElementById("mobile").value = gUserInfo.phone;
    document.getElementById("address").value = gUserInfo.address;
    document.getElementById("email").value = gUserInfo.email;
    document.getElementById("bankName").value = gUserInfo.bankName;
    document.getElementById("bankDivice").value = gUserInfo.bankAddress;
    document.getElementById("bankAccount").value = gUserInfo.bankAccount;
    document.getElementById("bankAccountName").value = gUserInfo.bankUser;
}

function cancel() {
    setDefaultInfo();
    logInfo("cancel");
}
/*function goBack(){
 navController.popView(true);
 }*/
function confirmChange() {
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var bankName = document.getElementById("bankName").value;
    var bankDivice = document.getElementById("bankDivice").value;
    var bankAccount = document.getElementById("bankAccount").value;
    var bankAccountName = document.getElementById("bankAccountName").value;
    var fileUpload01 = document.getElementById("id.fileUpload01");

    var RE = /^[\d\.\-\s]+$/;
    if (mobile != gUserInfo.phone && !RE.test(mobile)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_MOBILE_ERROR_MSG'));
        return;
    }

    var email = document.getElementById("email").value;

    var MAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != gUserInfo.email && !MAIL.test(email)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_EMAIL_ERROR_MSG'));
        return;
    }

    tmpStr = fileUpload01.value;
    var checkImage = tmpStr.split('.');
    var checkTypeImage = checkImage[checkImage.length - 1];
    if (checkTypeImage != "" && checkTypeImage.toLowerCase() != "jpg" && checkTypeImage.toLowerCase() != "png" && checkTypeImage.toLowerCase() != "gif") {
        document.getElementById("id.checkFile").style.display = '';
        showAlertText(CONST_STR.get('ERR_INPUT_FILE_VALUE'));
        return;
    }

     var newCusInfoObj = new UserInfoObj();
     newCusInfoObj.userCode = gUserInfo.userCode;
     newCusInfoObj.email = email;
     newCusInfoObj.address = address;
     newCusInfoObj.phone = mobile;
     newCusInfoObj.bankName = bankName;
     newCusInfoObj.bankAccount = bankAccount;
     newCusInfoObj.bankAddress = bankDivice;
     newCusInfoObj.bankUser = bankAccountName;


     //HuyNT2: upload image
     var tmpResult = document.getElementById('cropperContainer2');
     var tmpCanvas = tmpResult.getElementsByTagName('canvas')[0];
     var base64string = '';
     if (tmpCanvas) {
         base64string = tmpCanvas.toDataURL('image/jpeg');
     }
    newCusInfoObj.userAvatar = encodeURIComponent(base64string);

    $.ajax({
        type: "POST",
        url:"/api/updatePersonalInfo",
        data: JSON.stringify(newCusInfoObj),
        contentType: "application/json; charset=utf-8",
        success:function(response){
            if(response.result){
                debugger
                //re set info to global object
                //gUserInfo.birthday = newCusInfoObj.userCode;
                //gUserInfo.identifier;
                gUserInfo.phone = newCusInfoObj.phone;
                gUserInfo.address = newCusInfoObj.address;
                gUserInfo.email = newCusInfoObj.email;
                gUserInfo.bankName = newCusInfoObj.bankName;
                gUserInfo.bankAddress = newCusInfoObj.bankAddress;
                gUserInfo.bankAccount = newCusInfoObj.bankAccount;
                gUserInfo.bankUser = newCusInfoObj.bankUser;
                gUserInfo.userAvatar = newCusInfoObj.userAvatar;
                showAlertText(CONST_STR.get('MENU_CHANGE_INFO_SUCCESS_MESSAGE'));
            } else {
                showAlertText(CONST_STR.get('MENU_CHANGE_INFO_FAIL_MESSAGE'));
            }
        },
        error: function () {
            showAlertText(CONST_STR.get('MENU_CHANGE_INFO_FAIL_MESSAGE'));
        }
    });

    document.addEventListener('closeAlertView', handleAlertChangeInfo, false);
    logInfo("confirmChange");
}

function handleAlertChangeInfo() {
    document.removeEventListener('closeAlertView', handleAlertChangeInfo, false);
    navController.initWithRootView('utilitiesxsl/change-personal-info-scr', true, 'xsl');
}


function checkChange(tbx, limit) {

    //limit text length on field
    if (tbx.value.length > Number(limit)) {
        tbx.value = tbx.value.substring(0, Number(limit));
    }

    //disable confirm button
    document.getElementById("confirmBtn").disabled = true;

    if (document.getElementById("address").value != gUserInfo.address) {
        logInfo("edit address");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("mobile").value != gUserInfo.phone) {
        logInfo("edit mobile");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("email").value != gUserInfo.email) {
        logInfo("edit email");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankName").value != gUserInfo.bankName) {
        logInfo("edit bankName");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankDivice").value != gUserInfo.bankAddress) {
        logInfo("edit bankDivice");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccount").value != gUserInfo.bankAccount) {
        logInfo("edit bankAccount");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccountName").value != gUserInfo.bankUser) {
        logInfo("edit bankAccountName");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }
}

/*upload file*/
function fnChange(obj) {
    resultUserImg.innerHTML = ''; //clear result loaded-file

    var objTmp = document.getElementById("btnFile");
    if (obj.value.trim().length > 0) {
        objTmp.value = obj.value;
    } else {
        objTmp.value = '';
    }

}

/* Take picture */

function displayImage(file, options) {
    document.getElementById('tb-prevPicture').style.display = '';
    //alert('em day');
    currentFile = file;
    if (!loadImage(
            file,
            replaceResults,
            {
                maxWidth: 200,
                maxHeight: 200,
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
        /*var scaledImage = loadImage.scale(
         img, // img or canvas element
         {
         maxWidth: isSmallScrMode? clientCusWidth: 640,
         canvas: true
         }
         );*/
        var maxWidthImage = 200;
        clientCusWidth = (clientCusWidth < maxWidthImage) ? clientCusWidth : maxWidthImage; //limit image size
        var tmpMaxWidth = isSmallScrMode ? clientCusWidth : maxWidthImage;
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

        //Canvas
        //var canvasImg = document.createElement("canvas");
        canvasImg.width = tmpMaxWidth;
        canvasImg.height = tmpMaxWidth;
        //var ctxImg = canvasImg.getContext("2d");
        ctxImg.drawImage(scaledImage, canvasImg.width / 2 - scaledImage.width / 2, canvasImg.height / 2 - scaledImage.width / 2);
        //ctxImg.drawImage(scaledImage, canvasImg.width, canvasImg.height);
        resultUserImg.appendChild(canvasImg);
        //}
    }
}

function setUpCropImage(inBlob) {
    //iCropper
    if (icropper1) icropper1.destroy(); //clear memory
    document.getElementById('previewBig1').innerHTML = ''; //clear preview
    resultUserImg.innerHTML = ''; //clear result loaded-file
    icropper1 = new ICropper(
        'cropperContainer2' //set workspace to crop
        , {
            ratio: 0.75
            , image: inBlob
            , onChange: function (info) {	//onChange must be set when constructing.
                //infoNode1.innerHTML = 'Left: ' + info.l + 'px, Top: '+ info.t + 'px, Width: ' + info.w + 'px, Height: ' + info.h+'px';
                infoNode1.innerHTML = 'Width: ' + info.w + 'px, Height: ' + info.h + 'px';
            }
            , preview: [
                'previewBig1' //set preview node
            ]
        });
}

function rotateImageIntroCus(inDegree) {
    angleRotate += inDegree;
    ctxImg.clearRect(0, 0, canvasImg.width, canvasImg.height);
    ctxImg.save();
    ctxImg.fillStyle = "#FFFFFF"; // blue
    logInfo("Canvas gap size: " + Math.abs(canvasImg.height - canvasImg.width) / 2);
    ctxImg.translate(canvasImg.width / 2, canvasImg.height / 2);
    ctxImg.rotate(angleRotate * Math.PI / 180);
    //ctxImg.drawImage(scaledImage,-scaledImage.width/2,-scaledImage.width/2 + Math.abs(scaledImage.height-scaledImage.width)/2);
    ctxImg.drawImage(scaledImage, -scaledImage.width / 2, -scaledImage.width / 2);// + Math.abs(scaledImage.height-scaledImage.width)/2);
    ctxImg.restore();
}

/* Take picture end */
