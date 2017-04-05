/**
 * Created by TuanNQ1.FSoft
 * User:
 * Date: 14/7/14
 */

/*** VIEW LOAD SUCCESS ***/

var cusInfoObj;
var newCusInfoObj;

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
var flag_check = false; //ngocdt3 bo sung check trang thai la back hya cancel
var treeNpp = new Array();

function viewBackFromOther() {
    logInfo('Back from other view');
    flag_check = true;
    setDefaultInfo(newCusInfoObj);
}

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    // For each orgchart box, provide the name, manager, and tooltip to show.
    var oldParentId = '';
    var j = 0;
    for (var i = 0; i < treeNpp.length; i++) {
        data.addRows([
            [{
                v: treeNpp[i].nppId,
                f: '<div style="background-color:rgba(36, 58, 144, 0.93);color: white">' + treeNpp[i].nppId + '</div>' + ((treeNpp[i].nppId === 'open') ? '' : '<div><img src="./assets/images/ico/' + treeNpp[i].rank + '.png"/></div>')
            }, treeNpp[i].parentId]
        ]);
    }

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml: true});
}

function viewDidLoadSuccess() {
    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    if (flag_check == false) {
        //sendJSONRequest();
    }
    sendJSONRequest();
}

function sendJSONRequest() {
    loadData('./data/treeNpp.json', drawGraphical);
    loadData('./data/account.json', requestMBServiceSuccess);
}

function drawGraphical(jsondata) {
    treeNpp = JSON.parse(jsondata)[gUserInfo.accountId];
    google.charts.load('current', {packages: ["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);
}

//event listener: http request success
function requestMBServiceSuccess(jsondata) {
    var accountDetail = JSON.parse(jsondata)[gUserInfo.accountId];
    setDefaultInfo(accountDetail);
    cusInfoObj = accountDetail;
};

//event listener: http request fail
function requestMBServiceFail() {
};

function setDefaultInfo(cusInfo) {
    document.getElementById("name").innerHTML = cusInfo.fullname;
    document.getElementById("mobile").innerHTML = cusInfo.mobile;
    document.getElementById("sponsorName").innerHTML = cusInfo.sponsorName;
    document.getElementById("rank").innerHTML = cusInfo.rank === '0' ? 'Distributor' : cusInfo.rank === '1' ? 'Member' : 'Professional';
    document.getElementById("numberTL").innerHTML = cusInfo.numberTL;
    document.getElementById("numberMSD").innerHTML = cusInfo.numberMSD;
    document.getElementById("numberDSD").innerHTML = cusInfo.numberDSD;
    document.getElementById("numberGDSD").innerHTML = cusInfo.numberGDSD;
}

function cancel() {
    setDefaultInfo(cusInfoObj);
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

    var mobile = document.getElementById("mobile").value;

    if (mobile != cusInfoObj.mobile && !RE.test(mobile)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_MOBILE_ERROR_MSG'));
        return;
    }

    var email = document.getElementById("email").value;

    var MAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != cusInfoObj.email && !MAIL.test(email)) {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_EMAIL_ERROR_MSG'));
        return;
    }
    // check image
    // var stringInfo = ""; var arrayArgs = new Array();
    tmpStr = fileUpload01.value;
    var checkImage = tmpStr.split('.');
    var checkTypeImage = checkImage[checkImage.length - 1];
    if (checkTypeImage != "" && checkTypeImage.toLowerCase() != "jpg" && checkTypeImage.toLowerCase() != "png" && checkTypeImage.toLowerCase() != "gif") {
        status = 1;
        document.getElementById("id.checkFile").style.display = '';
        //document.getElementById("id.lbCheckFile").innerHTML = CONST_STR.get('ERR_INPUT_VALUE');
        showAlertText(CONST_STR.get('ERR_INPUT_FILE_VALUE'));
        return;
    }

    // // collect the form data while iterating over the inputs
    // var data = {};
    // var arrayArgs = new Array();
    //
    // //fill data
    // arrayArgs.push(occupation);
    // arrayArgs.push(workPlace);
    // arrayArgs.push(workAddress1);
    // arrayArgs.push(workAddress2);
    // arrayArgs.push(workAddress3);
    // arrayArgs.push(workTel);
    // arrayArgs.push(address);
    // arrayArgs.push(currAddress2);
    // arrayArgs.push(currAddress3);
    // arrayArgs.push(currAddress4);
    // arrayArgs.push(mobile);
    // arrayArgs.push(email);
    //
    // newCusInfoObj = cusInfoObj;
    // newCusInfoObj.occupation = occupation;
    // newCusInfoObj.workPlace = workPlace;
    // newCusInfoObj.workAddress1 = workAddress1;
    // newCusInfoObj.workAddress2 = workAddress2;
    // newCusInfoObj.workAddress3 = workAddress3;
    // newCusInfoObj.workTel = workTel;
    // newCusInfoObj.address = address;
    // newCusInfoObj.currAddress2 = currAddress2;
    // newCusInfoObj.currAddress3 = currAddress3;
    // newCusInfoObj.currAddress4 = currAddress4;
    // newCusInfoObj.mobile = mobile;
    // newCusInfoObj.email = email;
    //
    // //HuyNT2: upload image
    // var tmpResult = document.getElementById('cropperContainer2');
    // var tmpCanvas = tmpResult.getElementsByTagName('canvas')[0];
    // var base64string = '';
    // if (tmpCanvas) {
    //     base64string = tmpCanvas.toDataURL('image/jpeg');
    // }
    // var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_CHNG_CUS_INFO_CONFIRM"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs, encodeURIComponent(base64string));
    //
    // data = getDataFromGprsCmd(gprsCmd);
    //
    // //requestMBService(data, true, 0, confirmChangeSuccess, confirmChangeFail);
    //
    showAlertText(CONST_STR.get('MENU_CHANGE_INFO_SUCCESS_MESSAGE'));
    document.addEventListener('closeAlertView', handleAlertChangeInfo, false);
    logInfo("confirmChange");
}

function handleAlertChangeInfo() {
    document.removeEventListener('closeAlertView', handleAlertChangeInfo, false);
    //navController.initWithRootView('accountxsl/account-scr', true, 'xsl');
    var tmpPageName = navController.getDefaultPage();
    var tmpPageType = navController.getDefaultPageType();
    navController.initWithRootView(tmpPageName, true, tmpPageType);
}


//event listener: http request success
function confirmChangeSuccess(e) {

};

//event listener: http request fail
function confirmChangeFail() {
    /*if ((e.type == "evtHttpFail") && (currentPage == "utilitiesxsl/change-personal-info-scr")) {
     document.removeEventListener("evtHttpFail", requestMBServiceFail, false);
     //alert("Http request fail!");
     }*/
};

function checkChange(tbx, limit) {
    debugger;

    //limit text length on field
    if (tbx.value.length > Number(limit)) {
        tbx.value = tbx.value.substring(0, Number(limit));
    }

    //disable confirm button
    document.getElementById("confirmBtn").disabled = true;

    if (document.getElementById("address").value != cusInfoObj.address) {
        logInfo("edit address");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("mobile").value != cusInfoObj.mobile) {
        logInfo("edit mobile");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("email").value != cusInfoObj.email) {
        logInfo("edit email");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankName").value != cusInfoObj.bankName) {
        logInfo("edit bankName");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankDivice").value != cusInfoObj.bankDivice) {
        logInfo("edit bankDivice");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccount").value != cusInfoObj.bankAccount) {
        logInfo("edit bankAccount");
        //enable confirm button
        document.getElementById("confirmBtn").disabled = "";
        return;
    }

    if (document.getElementById("bankAccountName").value != cusInfoObj.bankAccountName) {
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

        /*if(img.height < img.width) {
         resultUserImg.setAttribute('width', tmpMaxWidth);
         resultUserImg.setAttribute('height', tmpMaxWidth);
         }
         else {
         resultUserImg.setAttribute('width', tmpMaxWidth);//tmpRatio * tmpMaxWidth);
         resultUserImg.setAttribute('height', tmpMaxWidth); //tmpRatio * tmpMaxWidth);
         tmpMaxSize = tmpMaxWidth;//tmpRatio * tmpMaxWidth;
         }*/
        //resultUserImg.setAttribute('width', tmpMaxWidth);
        //resultUserImg.setAttribute('height', tmpRatio * tmpMaxWidth);
        //resultUserImg.setAttribute('width', tmpMaxWidth);
        //resultUserImg.setAttribute('height', tmpRatio * tmpMaxWidth);
        //resultUserImg.innerHTML = ''; //clear result loaded-file
        //resultUserImg.appendChild(scaledImage); //show loaded-file

        //dataURL = scaledImage.toDataURL();
        //if(!isSmallScrMode) {
        //setUpCropImage(dataURL);
        //}
        //else {
        resultUserImg.innerHTML = ''; //clear result loaded-file
        //resultUserImg.appendChild(scaledImage);

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
    /*if (img.getContext) { //check image ready
     var ctx = img.getContext();
     if(ctx) {
     ctx.clearRect(0, 0, img.width, img.height);
     ctx.drawImage(dataURL, 0, 0, img.width, img.height);
     logInfo('show image replaced');
     }
     }*/
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
