<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
    <body>

    <table width="100%" align="center">
      <tr>
        <td align="center" valign="middle" class="td-text"><div>
            <input id="id.location" type="text" class="form-control form-control-righttext" readonly="readonly" onclick="displayRadioLoc()" placeholder="COM_TXT_INPUT_PLACEHOLDER" value="PROMOTION_SELECTION_CITY" style="cursor:pointer"/>
          </div></td>
      </tr>
    </table>
    <div id="id.radioLocationBTN" style="display:none; border-bottom: 1px solid #5F314A; margin-bottom: 5px;">
      <xsl:for-each select="root/Locations/Loc">
        <div style="height:25px; vertical-align:middle">
          <input type="radio" name="locationRadio" id="{@LocationID}" value="{@LocationID}" onselect="selectLoc({@LocationID})" style="margin-right: 8px; margin-top: 6px;"/>
          <a href="javascript:void(0);" onclick="selectLoc({@LocationID})"><xsl:value-of select="@LocationName"/></a></div>
      </xsl:for-each>
    </div>
    <div id="id.catMenu">
      <xsl:for-each select="root/Categories/Item">
        <li name="nm.category">
          <div onclick="openNewsMenu('{@CatID}','{@CatName}')" style="width:240px;height:40px;">
          	<!--<img class='icon-user' src='{@CatIcon}'/>-->
            <img class='icon-user' src='{@CatIcon}'/>
            <div style="width:160px; display:inline;"><div style="margin-top:-4px"><xsl:value-of select="@CatName"></xsl:value-of></div></div>
          </div>
        </li>
      </xsl:for-each>
    </div>
    <table id="tblResult" style="display:none">
    	<xsl:for-each select="root/Locations/Loc">
        	<tr>
            	<td><xsl:value-of select="@LocationID"/></td>
                <td><xsl:value-of select="@LocationName"/></td>
            </tr>
        </xsl:for-each>
    </table>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
