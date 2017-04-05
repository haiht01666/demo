/**
 * Created by HuyNT2.
 * User: 
 * Date: 29/03/14
 * Time: 8:35 AM
 */

/*** HEADER ***/
var gprsResp = new GprsRespObj("","","","");
var focusedField = '';
var tmpNodePassOld;
var tmpNodePassNew;
var tmpNodePassRetype;

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
	if(gUserInfo.flag_check==""){
		showAlertAppText(CONST_STR.get('LOGIN_REQUEST_CONDITION'), CONST_STR.get('LOGIN_REQUEST_CONDITION_OK'), CONST_STR.get('LOGIN_REQUEST_CONDITION_REJECT'));
    document.addEventListener('alertAppConfirmOK', showChoiceConfirmPre, false);
    document.addEventListener('alertAppConfirmCancel', showChoiceConfirmPreClose, false);
	}
	setInputOnlyASCII('accpass.txt.passwordold', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
	setInputOnlyASCII('accpass.txt.passwordnew', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
	setInputOnlyASCII('accpass.txt.passwordretype', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
	
	if(!gIsLogin) {
		var tmpNodeAccChangePass = document.getElementById('account.changepasstitle');
		tmpNodeAccChangePass.innerHTML = CONST_STR.get('ACC_CHANGE_PASS_SCR_TITLE');
	}
	
	tmpNodePassOld = document.getElementById('accpass.txt.passwordold');
	tmpNodePassOld.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressOld, false);
	function handleSpecialKeyPressOld(e)
	{
		//tmpNodePassOld.removeEventListener('evtSpecialKeyPressed', handleSpecialKeyPressOld, false);
		var ew = e.keyPress;
		if (ew == 13) { //Enter pressed
			requestChangePassword();
		}
		else {
			return;
		}
	}
	
	tmpNodePassNew = document.getElementById('accpass.txt.passwordnew');
	tmpNodePassNew.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressNew, false);
	function handleSpecialKeyPressNew(e)
	{
		//tmpNodePassNew.removeEventListener('evtSpecialKeyPressed', handleSpecialKeyPressNew, false);
		var ew = e.keyPress;
		if (ew == 13) { //Enter pressed
			requestChangePassword();
		}
		else {
			return;
		}
	}
	
	tmpNodePassRetype = document.getElementById('accpass.txt.passwordretype');
	tmpNodePassRetype.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressRetype, false);
	function handleSpecialKeyPressRetype(e)
	{
		//tmpNodePassRetype.removeEventListener('evtSpecialKeyPressed', handleSpecialKeyPressRetype, false);
		var ew = e.keyPress;
		if (ew == 13) { //Enter pressed
			requestChangePassword();
		}
		else {
			return;
		}
	}
}

/*** VIEW LOAD SUCCESS END viewWillUnload ***/
function showChoiceConfirmPre(e) {
	if (currentPage == "accountxsl/account-change-password-scr") {
		showChoiceConfirmPreClose();
		if (gUserInfo.lang == 'EN')
	{
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHCN - English.pdf');
	}
	else
	{
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHCN - Vietnamese.pdf');
	}
	}
}

function showChoiceConfirmPreClose() {
	if (currentPage == "accountxsl/account-change-password-scr") {
		document.removeEventListener("alertAppConfirmCancel", showChoiceConfirmPreClose, false);
		document.removeEventListener("alertAppConfirmOK", showChoiceConfirmPre, false);
	}
}
/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
	logInfo('change password will unload');
}

/*** VIEW WILL UNLOAD END ***/

function goBack() {
	//navController.popView(true);
	//gIsLogin = true;
	//loadPage('account-scr',true);
	//navController.initWithRootView('account/account-scr', true);
	//var tmpPageName = navController.getDefaultPage();
		//var tmpPageType = navController.getDefaultPageType();
		//navController.initWithRootView(tmpPageName, true, tmpPageType);
	//show slide menu button
	//var btnSlideMenu = document.getElementById("nav.btn.showslidemenu");
	//btnSlideMenu.style.display = "block";
}

function requestChangePassword() {
	
	// collect the form data while iterating over the inputs
	var data = {};
	var arrayArgs = new Array();


    var passOld = document.getElementById('accpass.txt.passwordold').value;
    var passNew = document.getElementById('accpass.txt.passwordnew').value;
    var passRetype = document.getElementById('accpass.txt.passwordretype').value;

	if (passOld.length <= 0) {
		showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_OLD_PASS'));
		return;
	}
	if (passNew.length <= 0) {
		showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_NEW_PASS'));
		return;
	}
	if (passRetype != tmpNodePassNew.value) {
		showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_RETYPE_FAIL_PASS'));
		return;
	}
    requestMBServiceSuccess();
}

//event listener: http request success
//document.addEventListener("evtHttpSuccess", function(e){
function requestMBServiceSuccess(e) {
    showAlertText(CONST_STR.get('ERR_MSG_CHANGE_PASS'));
    document.addEventListener('closeAlertView', handleAlertChangePassword, false);
};


//event listener: http request success
//document.addEventListener("evtHttpFail", function(e){
function requestMBServiceFail() {
	/*if ((e.type == "evtHttpFail") && (currentPage == "accountxsl/account-change-password-scr")) {
		document.removeEventListener("evtHttpFail", requestMBServiceFail, false);
		
	}*/
};

function handleAlertChangePassword() {
	document.removeEventListener('closeAlertView', handleAlertChangePassword, false);
	var tmpPageName = navController.getDefaultPage();
	var tmpPageType = navController.getDefaultPageType();
	navController.initWithRootView(tmpPageName, true, tmpPageType);
}

function parserChangePasswordInfo () {
	
}

//set change password

function setChaggePasswordConfirm() {

	// collect the form data while iterating over the inputs
	var data = {};
	var arrayArgs = new Array();

	var tmpRespObj;
	tmpRespObj = getRespObjStore();

	arrayArgs.push(tmpRespObj.responseType); //confirm type
	arrayArgs.push(tmpRespObj.arguments[0]); //transaction ID
	arrayArgs.push("123456"); //Token key --> demo
	arrayArgs.push("1"); //1: accept, 0: decline
	arrayArgs.push(gUserInfo.valicationType); //user: authen type

	setRespObjStore(tmpRespObj);

	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_TICKET_REQUEST"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	data["cmdType"] = gprsCmd.cmdType;
	data["time"] = gprsCmd.timeCur;
	data["app"] = gprsCmd.appName;
	data["version"] = gprsCmd.version;
	data["language"] = gprsCmd.language;
	data["session"] = gprsCmd.sessionID;
	data["args"] = gprsCmd.arguments;

	//gGprsCmd = gprsCmd; //save to global variable-- confirm
	setGprsCmdStore(gprsCmd);

	navController.pushToView("com-authentication-scr", true);
	//loadPage("com-authentication-scr", true);

}

//show virtual keyboard
function showVirtualKeyboard() {
	var tmpNodeKeyboard = document.getElementById('id-virtualkb');
	tmpNodeKeyboard.style.display == 'none'? tmpNodeKeyboard.style.display = '': tmpNodeKeyboard.style.display = 'none';
}

function setFieldFocus(p_field_name){
	focusedField = p_field_name;
}

function onBlurPassword(pAuthen)
{
	if(pAuthen == '0') {
		focusedField = "";
	}
	/*var oldPwd = document.frmUser.txtoldpwd;
	if (isBlank(oldPwd.value))
	{				
		if(oldPwd.value == '' && pAuthen == '0')
		{
  		    //removeErrorMsg('error-txtoldpwd') ;		
		}else
		{			
			//setErrorMsg('error-txtoldpwd', '%%K_REQUIREDERROR%%');
		}
		
	}
	else {
		//validateCurrentPasswrod(oldPwd.value);
	}*/
}

function onBlurNewPassword(pAuthen)
{
	if(pAuthen == '0') {
		focusedField = "";
	}
	/*var l_pminlength	= '<xsl:value-of select="faml/pwdinfo/@minlength"/>';
	var l_pmaxlength	= '<xsl:value-of select="faml/pwdinfo/@maxlength"/>';
	var newPwd = document.frmUser.txtnewpwd, oldPwd = document.frmUser.txtoldpwd;
	if (isBlank(newPwd.value))
	{				
		if(newPwd.value == '' &amp;&amp; pAuthen == '0')
		{
			removeErrorMsg('error-txtnewpwd') ;
		}else
		{
			setErrorMsg('error-txtnewpwd', "%%K_REQUIREDERROR%%");
		}
	}
	else {
		if(newPwd.value.length &lt; l_pminlength || newPwd.value.length &gt; l_pmaxlength|| !(/^[a-zA-Z0-9]+$/.test(newPwd.value)) || newPwd.value == '<xsl:value-of select="faml/request/fldLoginCustId"/>' || newPwd.value == oldPwd.value) {
			
			setErrorMsg('error-txtnewpwd', '%%K_INVALIDPWDERROR%%');
			
		}
		
		else {
			checkPwdLevel(newPwd.value);
		}
	}*/
}

function onBlurNewPasswordConfirm(pAuthen)
{
	if(pAuthen == '0') {
		focusedField = "";
	}
	/*var newPwd = document.frmUser.txtnewpwd, newPwConf = document.frmUser.txtnewpwdagain;
	
	if (isBlank(newPwConf.value))
	{
		if(newPwConf.value == '' &amp;&amp; pAuthen == '0')
		{
			removeErrorMsg('error-txtnewpwdagain') ;
		}else
		{		
			setErrorMsg('error-txtnewpwdagain', "%%K_REQUIREDERROR%%");
		}	
	}
	else {
		if (!isBlank(newPwd.value) &amp;&amp; newPwd.value != newPwConf.value)
		{
			setErrorMsg('error-txtnewpwdagain', "%%K_NEWPWDSNOMATCHERROR%%");
		}
		else {
			removeErrorMsg('error-txtnewpwdagain');
		}
	}*/
}
/*
diepnv hien dang mat khau:thap,trung binh,cao
*/
function checklevelPass(password)
{
 var desc = new Array();
 desc[1] = CONST_STR.get('ACC_PASSWORD_LEVEL1');
 desc[2] = CONST_STR.get('ACC_PASSWORD_LEVEL2');
 desc[3] = CONST_STR.get('ACC_PASSWORD_LEVEL3');
 
 
 var score   = 0;

 //if password bigger than 6 give 1 point
 if (password.length > 7) score++;

 //if password has both lower and uppercase characters give 1 point 
 if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;

 //if password has at least one number give 1 point
 if (password.match(/\d+/)) score++;

 //if password has at least one special caracther give 1 point
 if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) score++;

 //if password bigger than 12 give another 1 point
 if (password.length > 12) score++;

	showAlertText(desc[score]);
	return;

}
function checkPwdLevel(value)
{
	var hasNumber = false, hasLower = false, hasUpper = false, level = 0;

	for(var i=0; i < value.length; i++)
	{
		if(value.charCodeAt(i) > 47 && value.charCodeAt(i) < 58)
			hasNumber = true;
		if (value.charCodeAt(i) > 64 && value.charCodeAt(i) < 91)
			hasUpper = true;
		if (value.charCodeAt(i) > 96)
			hasLower = true;
	}
	
	if (hasNumber) level++;
	if (hasLower) level++;
	if (hasUpper) level++;
	
	/*if (level > 2)
		setErrorMsg('error-txtnewpwd', '%%K_AT3%%');
	else if (level == 2)
		setErrorMsg('error-txtnewpwd', '%%K_AT2%%');
	else
		setErrorMsg('error-txtnewpwd', '%%K_AT1%%');*/
}


function DeletePwd()
{
	if(focusedField != "" && focusedField != undefined){
		var strNumField = new String(document.getElementById(focusedField).value);
		document.getElementById(focusedField).value = strNumField.substring(0,strNumField.length-1);
		//focusedField = "";
		doRandomize();
	}
	return false;	
}

function ClearPwd()

{
	if(focusedField != "" && focusedField != undefined){
		document.getElementById(focusedField).value = "";
		doRandomize();
	}
	return false;	

}
