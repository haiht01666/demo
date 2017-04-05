<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id="mainViewContent" class="main-layout-subview">
          <div class="">
            <div class="panelContent">
              <h5 align="left" class="screen-title">
                <span>GROUP_MANAGER_ORDER_LIST</span>
              </h5>
              <div class='line-separate'></div>
            </div>
            <div style="" id="parse_transaction">
              <table width="100%" align="center" style="padding-left: 9px;padding-right: 9px;">
                <tr>
                  <td colspan="2">
                    <h5 class='Header'><span id="accountId"></span></h5>
                  </td>
                </tr>
              </table>
            </div>
            <div id="id.historyInfo" style="padding:5px;">

            </div>
            <div align='right' id="acc.pagination" style="margin-right: 15px;">

            </div>

          </div>
        </div>
        <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
          <div class="dialog-backgroundtrans" onClick="closeDialog(this)"></div>
          <div id="divListGroup" class="list-group dialog-list"></div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
