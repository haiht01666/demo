<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
    <body>
    <div id="mainViewContent" class="main-layout-subview" style="padding-top:10px;">
      <div>
        <table>
          <tr>
            <td colspan="2"><h5 id='account.changepasstitle' align="left" class="screen-title"   style="padding-left: 15px; padding-right: 15px;"><span>ACC_CHANGE_PASS_SCREEN_TITLE</span></h5>
              <div class='line-separate' style="padding-left: 15px; padding-right: 15px;"></div></td>
          </tr>
          <tr>
            <td colspan="2"><h5  style="padding:5px 15px 15px 15px;" id='acc-changepass-note' align="left" class=""><span>ACC_PASSWORD_NOTE</span></h5></td>
          </tr>
          <tr>
            <td><table width="92%" align="center">
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:30%">ACC_PASSWORD_TITLE_OLD</span>
                      <input type="password" class="form-control form-control-righttext"  id="accpass.txt.passwordold" placeholder="COM_TXT_INPUT_PLACEHOLDER" onFocus='javascript:setKeyboardFocus("accpass.txt.passwordold"); javascript:setFieldFocus("accpass.txt.passwordold")' onblur="onBlurPassword('0')" onkeypress='' autocomplete="off"  maxlength="16"/>
                      <span class="input-group-addon input-group-symbol"></span> </div></td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:30%">ACC_PASSWORD_TITLE_NEW</span>
                      <input type="password" class="form-control form-control-righttext"  id="accpass.txt.passwordnew" placeholder="COM_TXT_INPUT_PLACEHOLDER" onFocus='javascript:setKeyboardFocus("accpass.txt.passwordnew"); javascript:setFieldFocus("accpass.txt.passwordnew")' onblur="onBlurPassword('0')" onkeypress='' autocomplete="off"  maxlength="16"/>
                      <span class="input-group-addon input-group-symbol"></span> </div></td>
                </tr>
                <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text"><div class="input-group"> <span class="input-group-addon" style="width:30%">ACC_PASSWORD_TITLE_RETYPE</span>
                      <input type="password" class="form-control form-control-righttext"  id="accpass.txt.passwordretype" placeholder="COM_TXT_INPUT_PLACEHOLDER" onFocus='javascript:setKeyboardFocus("accpass.txt.passwordretype"); javascript:setFieldFocus("accpass.txt.passwordretype")' onblur="onBlurPassword('0')" onkeypress='' autocomplete="off" maxlength="16"/>
                      <span class="input-group-addon input-group-symbol"></span> </div></td>
                </tr>
                <tr class="trow-space"></tr>
                <tr>
                  <td  align="right" width='50%'><input type="button" class="btnshadow btn-second" id="accpass.btn.moreinfo"
									onclick="requestChangePassword()" value="CHANGE_PASS_SUBMIT" /></td>
                </tr>
              </table></td>
          </tr>
        </table>
      </div>
    </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
