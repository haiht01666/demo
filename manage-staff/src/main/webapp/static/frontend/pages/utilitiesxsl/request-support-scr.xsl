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
            <td colspan="2"><h5 align="left" class="screen-title"   style="padding-left: 15px; padding-right: 15px;"><span>MENU_PERSONAL_INFO_SUPPORT</span></h5>
              <div class='line-separate' style="padding-left: 15px; padding-right: 15px;"></div></td>
          </tr>
          <tr>
            <td colspan="2"><h5  style="padding:5px 15px 15px 15px;" id='acc-changepass-note' align="left" class=""><span>REQUEST_SUPPORT_CONTENT</span></h5></td>
          </tr>
          <tr>
            <td><table width="92%" align="center">
              <tr>
                <td colspan="2" align="left" valign="middle">
                        <span style="width:30%;font-size:14px">REQUEST_SUPPORT_TYPE</span>
                </td>
              </tr>
              <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group">
                      <input type="text" class="form-control form-control-lefttext"  id="requestsupport.title" value="" autocomplete="off"  maxlength="50"/>
                    </div>
                  </td>
                </tr>
                <tr>
                    <td colspan="2" align="left" valign="middle">
                        <span style="width:30%;font-size:14px">REQUEST_SUPPORT_INFO</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group">
                            <textarea rows="10" cols="50" class="form-control form-control-lefttext"  id="requestsupport.content"  autocomplete="off"  maxlength="200" style="height:120px;resize:none;margin-left: 0px;width: 100%;"></textarea>
                            <span class="input-group-addon input-group-symbol"></span>
                        </div>
                    </td>
                </tr>
                <tr class="trow-space"></tr>
                <tr>
                  <td  align="right" width='50%'><input type="button" class="btnshadow btn-second" id="requestsupport.submit"
									onclick="requestSuport()" value="REQUEST_SUPPORT_SUBMIT" /></td>
                </tr>
              </table></td>
          </tr>
        </table>
      </div>
      <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
        <div class="dialog-backgroundtrans" onClick="closeDialog(this)">
        </div>
        <div id="divListGroup" class="list-group dialog-list">

        </div>
      </div>
        <div id="temp" style="height:80px"></div>
    </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
