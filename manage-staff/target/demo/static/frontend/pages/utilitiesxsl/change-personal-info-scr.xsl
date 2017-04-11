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
							</table>
							<table width="100%" align="center">
								<tr>
									<td colspan="2"><h5 class="Header"><span>UTILITIES_CHNG_PER_INFO_CONTACT_TITLE</span></h5></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">UTILITIES_CHNG_PER_INFO_MOBILE_TITLE</span>
										<input id="mobile" type="tel" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">UTILITIES_CHNG_PER_INFO_EMAIL_TITLE</span>
										<input id="email" type="email" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr rowspan="3">
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%; vertical-align: top;padding-top:10px">UTILITIES_CHNG_PER_INFO_CURR_ADDR_TITLE</span>
										<input id="address" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/><div style="height:1px"></div>
									</div></td>
								</tr>
								<tr>
									<td colspan="2"><h5 class="Header"><span>MENU_CHANGE_INFO_BANK</span></h5></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_NAME</span>
										<input id="bankName" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_DIVICE</span>
										<input id="bankDivice" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_ACCOUNT</span>
										<input id="bankAccount" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
									</div></td>
								</tr>
								<tr>
									<td colspan="2" align="left" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:35%;">MENU_CHANGE_INFO_BANK_USERNAME</span>
										<input id="bankAccountName" type="text" class="form-control form-control-righttext" placeholder="COM_TXT_INPUT_PLACEHOLDER" onchange="checkChange(this, 50);" style="width:100%;"/>
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
