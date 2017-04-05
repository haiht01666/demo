<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <table width='98%' align='center' class='table-account'>
      <xsl:for-each select="resptable/tabletitle">
        <tr class="trow-title">
          <th width="45%" align='center'><xsl:value-of select="coltitle1"/></th>
          <th width="30%"><xsl:value-of select="coltitle2"/></th>
          <th width="20%"><xsl:value-of select="coltitle3"/></th>
        </tr>
      </xsl:for-each>
      <xsl:for-each select="resptable/tabletdetail">
        <tr>
          <td class="tdselct td-head-color"><div class="mobile-mode"><xsl:value-of select="coltitle1"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent1"/></div></td>
          <td>
            <div class="td-date-gold"><xsl:value-of select="colcontent2"/></div>
            <div class="mobile-mode-gold"><xsl:value-of select="coltitle2"/></div>
          </td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle3"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent3"/></div></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>
</xsl:stylesheet>
