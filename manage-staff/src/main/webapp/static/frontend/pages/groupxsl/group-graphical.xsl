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
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group">GROUP_GRAPHICAL_TL</span></h5></td>
                  <td width="65%"><h5><span id="numberTL"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group">GROUP_GRAPHICAL_MSD</span></h5></td>
                  <td width="65%"><h5><span id="numberMSD"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group">GROUP_GRAPHICAL_DSD</span></h5></td>
                  <td width="65%"><h5><span id="numberDSD"></span></h5></td>
                </tr>
                <tr>
                  <td width="35%" style="padding-left:15px"><h5><span class="input-group">GROUP_GRAPHICAL_GDSD</span></h5></td>
                  <td width="65%"><h5><span id="numberGDSD"></span></h5></td>
                </tr>
              </table>
              <table width="100%" align="center">
                <tr>
                  <td colspan="2"><h5 class="Header"><span>GROUP_GRAPHICAL_TREE</span></h5></td>
                </tr>
              </table>
              <div id="chart_div"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
