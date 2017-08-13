<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <div id='mainViewContent' class='main-layout-subview'>
          <div>
            <div class='panelContent' style="overflow: auto">
              <table width="100%" align="center">
                <tr>
                  <td colspan="2"><h5 class="screen-title"><span>GROUP_GRAPHICAL_TITLE</span></h5>
                    <div class="line-separate"/></td>
                </tr>
                <tr>
                  <td width="35%"><h5><b><span class="input-group">UTILITIES_CHNG_PER_INFO_NAME_TITLE</span></b></h5></td>
                  <td width="65%"><h5><span id="name"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%"><h5><b><span class="input-group">UTILITIES_CHNG_PER_INFO_MOBILE_TITLE</span></b></h5></td>
                  <td width="65%"><h5><span id="mobile"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%"><h5><b><span class="input-group">GROUP_GRAPHICAL_SPONSOR_NAME</span></b></h5></td>
                  <td width="65%"><h5><span id="sponsorName"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%"><h5><b><span class="input-group">GROUP_GRAPHICAL_RANK</span></b></h5></td>
                  <td width="65%"><h5><span id="rank"></span></h5></td>
                </tr>
                <tr>
                  <td colspan="2"><h5 class="Header"><span>GROUP_GRAPHICAL_MANAGER_GROUP</span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/New.png"/>NEW</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberNM"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/SALE_MEMBER.png"/>SM</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberSM"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/SALE_PRO.png"/>PS</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberPS"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/PRO_DISTRIBUTE.png"/>PD</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberPD"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/TL.png"/>TL</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberTL"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/MSD.png"/>MSD</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberMSD"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/DSD.png"/>DSD</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberDSD"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group lever-icon"><img src="./static/frontend/assets/images/ico/GDSD.png"/>GDSD</span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span id="numberGDSD"></span></h5></td>
                </tr>
              </table>
              <table width="100%" align="center">
                <tr>
                  <td colspan="2"><h5 class="Header"><span>GROUP_GRAPHICAL_TREE</span></h5></td>
                </tr>
                <tr>
                  <td colspan="2"><h5 class=""><span>ACTIVE_DISPLAY</span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="active-icon active-status"></span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span>ACTIVE_STATUS</span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="active-icon warning-status"></span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span>WARNING_STATUS</span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="active-icon red-status"></span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span>RED_STATUS</span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="active-icon noactive-status"></span></h5></td>
                  <td width="65%"><h5 class="lever-value"><span>NOACTIVE_STATUS</span></h5></td>
                </tr>
              </table>
              <div id="chart_div"></div>
              <div id="temp" style="height:80px"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
