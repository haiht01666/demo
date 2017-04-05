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
                                    <td colspan="2">
                                        <h5 class="screen-title">
                                            <span>COMMISSION_DETAIL_TITLE</span>
                                        </h5>
                                        <div class="line-separate"/>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>COMMISSION_INFO_TITLE</span>
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <div id="commissionInfo" style="padding:5px;">
                                <table align='left' id="commission-volume" class='table-account'>
                                    <tr class="trow-title">
                                        <th width="25%" align='center'><span>COMMISSION_WEEK_VOLUME</span></th>
                                        <th width="25%" align='center'><span>COMMISSION_MONTH_VOLUME</span></th>
                                        <th width="25%" align='center'><span>COMMISSION_YEAR_VOLUME</span></th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_WEEK_VOLUME</span></div>
                                            <div class="content-detail">1</div>
                                        </td>
                                        <td>
                                            <div class="td-date-gold">2</div>
                                            <div class="mobile-mode-gold"><span>COMMISSION_MONTH_VOLUME</span></div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_YEAR_VOLUME</span></div>
                                            <div class="content-detail">3</div>
                                        </td>
                                    </tr>
                                </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>COMMISSION_INFO_DETAIL_TITLE</span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group" style="width:50%">
                                            <input value="weekly" checked="true" name="time" type="radio"/>
                                            <span class="input-group-addon">COMMISSION_VIEW_WEEK_TITLE</span>
                                            <input value="monthly" name="time" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">COMMISSION_VIEW_MONTH_TITLE</span>
                                            <input value="yearly" name="time" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">COMMISSION_VIEW_YEAR_TITLE</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="center" valign="middle" class="td-text">
                                        <div class="input-group" onClick="showRequestCommissionTime()">
                                            <span class="input-group-addon" style="white-space:pre-wrap; width:30%">COMMISSION_CHOOSE_TIME</span>
                                            <input type="button" class="form-control form-control-righttext"  id="commission.time" value="SEQ_INPUT_TITLE" autocomplete="off"  maxlength="16"/>
                                            <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                                <table align='left' id="commission-volume" class='table-account' style="margin-top:20px">
                                    <tr class="trow-title">
                                        <th width="20%" align='center'><span>COMMISSION_DIRECT</span></th>
                                        <th width="20%" align='center'><span>COMMISSION_GROUP</span></th>
                                        <th width="20%" align='center'><span>COMMISSION_LEADER</span></th>
                                        <th width="20%" align='center'><span>COMMISSION_PRESIDENT</span></th>
                                        <th width="20%" align='center'><span>COMMISSION_TOTAL_VOLUME</span></th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_DIRECT</span></div>
                                            <div class="content-detail">0</div>
                                        </td>
                                        <td>
                                            <div class="td-date-gold">0</div>
                                            <div class="mobile-mode-gold"><span>COMMISSION_GROUP</span></div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_LEADER</span></div>
                                            <div class="content-detail">0</div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_PRESIDENT</span></div>
                                            <div class="content-detail">0</div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode"><span>COMMISSION_TOTAL_VOLUME</span></div>
                                            <div class="content-detail">0</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="selection-dialog" class="dialog-blacktrans" align="center" style="display:none">
                        <div class="dialog-backgroundtrans" onClick="closeDialog(this)">
                        </div>
                        <div id="divListGroup" class="list-group dialog-list">

                        </div>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
