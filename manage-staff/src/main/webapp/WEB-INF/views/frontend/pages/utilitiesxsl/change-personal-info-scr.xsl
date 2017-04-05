<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<div id='mainViewContent' class='main-layout-subview'>
					<div>
						<div class='panelContent'>
							<table width="100%" align="center">
								<tr>
									<td colspan="2"><h5 class="screen-title"><span>UTILITIES_CHNG_PER_INFO_SCREEN_TITLE</span></h5>
										<div class="line-separate"/></td>
								</tr>
								<tr>
									<td colspan="2"><h5 class="Header"><span>UTILITIES_CHNG_PER_INFO_TITLE</span></h5></td>
								</tr>
								<tr>
									<td width="35%"><h5><b><span class="input-group">UTILITIES_CHNG_PER_INFO_NAME_TITLE</span></b></h5></td>
									<td width="65%"><h5><span id="name"></span></h5></td>
								</tr>
								<tr>
									<td width="35%"><h5><b><span class="input-group">UTILITIES_CHNG_PER_INFO_BIRTHDAY_TITLE</span></b></h5></td>
									<td width="65%"><h5><span id="birthday"></span></h5></td>
								</tr>
								<tr>
									<td width="35%"><h5><b><span class="input-group">UTILITIES_CHNG_PER_INFO_ID_PASSPORT_TITLE</span></b></h5></td>
									<td width="65%"><h5><span id="userid"></span></h5></td>
								</tr>
								<tr>
									<td colspan="2" align="center" valign="middle" class="td-text">
										<div class="input-group" style="height:38px">
											<div class="input-group-addon" style="width:35%;"><h5 class="input-file-account-title"><b><span>ATTACK_TITLE_BGN</span></b></h5></div>

											<input type="file" onchange="fnChange(this)" class="form-control form-control-rightbutton input-file"
												   value="COM_TXT_INPUT_PLACEHOLDER" id="id.fileUpload01" accept="image/png;image/jpg"/>
											<input id="btnFile" type="button" class="form-control form-control-rightbutton" onclick="document.getElementById('id.fileUpload01').click()"/>
											<span id="take-picture-icon" class="input-group-addon input-group-symbol btn-take-picture mobilemode" onclick="document.getElementById('id.fileUpload01').click()"></span>
										</div>
										<!--<canvas id="canvasImg" width="640" height="480" style="display:none"></canvas>-->
									</td>
								</tr>
								<tr id = "id.checkFile" style="display:none">
									<td>
										<div align="right">
											<label type ="text" id="id.lbCheckFile"  class="cssLineColor"></label>
										</div>
									</td>
								</tr>
							</table>
							<table id="tb-prevPicture" width="100%" align="center" class="table-intro" style="display:none">
								<tr>
									<td colspan="2" style="border: none;">
										<div id="prevPic" class="prevPicture" align="center">
											<!--<h2>Keep crop area square</h2>-->
											<div id="cropperContainer2" class="cropperContainer" onclick="rotateImageIntroCus(90);" style="float:none"></div>
											<div class="previews">
												<!--<div id="previewSmall1" class="previewSmall" style="display:none"></div>-->
												<div id="previewBig1" class="previewBig desktopmode" style="display:none"></div>
											</div>
											<div id="info1" class="infoPicture desktopmode"></div>
										</div>
									</td>
								</tr>
							</table>
							<table id="tb-prevPicture" width="100%" align="center" class="table-intro" style="display:none">
								<tr>
									<td colspan="2" style="border: none;">
										<div id="prevPic" class="prevPicture" align="center">
											<!--<h2>Keep crop area square</h2>-->
											<div id="cropperContainer2" class="cropperContainer" onclick="rotateImageIntroCus(90);"></div>
											<div class="previews">
												<!--<div id="previewSmall1" class="previewSmall" style="display:none"></div>-->
												<div id="previewBig1" class="previewBig desktopmode" style="display:none"></div>
											</div>
											<div id="info1" class="infoPicture desktopmode"></div>
										</div>
									</td>
								</tr>
							</table>
							<table width="100%" align="center">
								<tr>
									<td colspan="2"><h5 class="Header"><span>UTILITIES_CHNG_PER_INFO_CONTACT_TITLE</span></h5></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">UTILITIES_CHNG_PER_INFO_MOBILE_TITLE</span>
										<input id="mobile" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">UTILITIES_CHNG_PER_INFO_EMAIL_TITLE</span>
										<input id="email" type="email" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr rowspan="3">
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%; vertical-align: top;padding-top:10px">UTILITIES_CHNG_PER_INFO_CURR_ADDR_TITLE</span>
										<input id="address" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/><div style="height:1px"></div>
									</div></td>
								</tr>
								<tr>
									<td colspan="2"><h5 class="Header"><span>MENU_CHANGE_INFO_BANK</span></h5></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_NAME</span>
										<input id="bankName" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_DIVICE</span>
										<input id="bankDivice" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_ACCOUNT</span>
										<input id="bankAccount" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_USERNAME</span>
										<input id="bankAccountName" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onkeyup="javascript:checkChange(this, 105);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr class="trow-space"></tr>


								<!--<td width='35%' align="center"><a style="text-decoration:underline; cursor:pointer" onclick="cancel();"> <span>UTILITIES_CHNG_PER_INFO_CANCEL_BTN</span></a></td>
                                <td width='65%' align="center"><input id="confirmBtn" type="button" class="btnshadow btn-second"
                                  onclick="confirmChange()" value="UTILITIES_CHNG_PER_INFO_CONFIRM_BTN" /></td>-->

								<!--<a style="text-decoration:underline; cursor:pointer" onclick="cancel();"> <span>UTILITIES_CHNG_PER_INFO_CANCEL_BTN</span></a>-->
								<table width="100%" align="center">
									<tr>
										<td align="right" width="50%"> <input id="confirmBtn" type="button" class="btnshadow btn-primary" onclick="confirmChange()" value="UTILITIES_CHNG_PER_INFO_CONFIRM_BTN" /> </td>
										<!-- <td align="left" width="50%"> <input id="btnCancel" type="button" class="btnshadow btn-second" onclick="cancel()" value="UTILITIES_CHNG_PER_INFO_CANCEL_BTN" /> </td>-->
									</tr>
								</table>


							</table>
						</div>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
