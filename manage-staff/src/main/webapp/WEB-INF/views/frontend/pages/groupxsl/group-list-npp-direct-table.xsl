<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <table width='98%' align='center' class='table-account'>
      <xsl:for-each select="resptable/tabletitle">
        <tr class="trow-title">
          <th width="10%" align='center'><xsl:value-of select="coltitle1"/></th>
          <th width="6%"><xsl:value-of select="coltitle2"/></th>
          <th width="10%"><xsl:value-of select="coltitle3"/></th>
          <th width="10%"><xsl:value-of select="coltitle4"/></th>
          <th width="25%"><xsl:value-of select="coltitle5"/></th>
          <th width="10%"><xsl:value-of select="coltitle6"/></th>
          <th width="12%"><xsl:value-of select="coltitle7"/></th>
          <th width="7%"><xsl:value-of select="coltitle8"/></th>
          <th width="10%"><xsl:value-of select="coltitle9"/></th>
        </tr>
      </xsl:for-each>
      <xsl:for-each select="resptable/tabletdetail">
        <tr>
          <td class="tdselct td-head-color"><div class="mobile-mode"><xsl:value-of select="coltitle1"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent1"/></div></td>
          <td><div class="td-date-gold"><xsl:value-of select="colcontent2"/></div>
            <div class="mobile-mode-gold"><xsl:value-of select="coltitle2"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle3"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent3"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle4"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent4"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle5"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent5"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle6"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent6"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle7"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent7"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle8"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent8"/></div></td>
          <td><div class="mobile-mode"><xsl:value-of select="coltitle9"/></div>
            <div class="content-detail"><xsl:value-of select="colcontent9"/></div></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>
</xsl:stylesheet>
