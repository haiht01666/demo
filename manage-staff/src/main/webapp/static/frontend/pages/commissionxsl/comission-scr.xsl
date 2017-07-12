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
                            <div id="commissionInfo">
                                <table align='left' id="commission-volume" class='table-account'>
                                    <tr class="trow-title">
                                        <th width="25%" align='center'>
                                            <span>COMMISSION_DIRECT</span>
                                        </th>
                                        <th width="25%" align='center'>
                                            <span>COMMISSION_GROUP</span>
                                        </th>
                                        <th width="25%" align='center'>
                                            <span>COMMISSION_TOTAL</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="mobile-mode">
                                                <span>COMMISSION_DIRECT</span>
                                            </div>
                                            <div class="content-detail" id="commissionDirectSummary"></div>
                                        </td>
                                        <td>
                                            <div class="td-date-gold" id="commissionGroupSummary"></div>
                                            <div class="mobile-mode-gold">
                                                <span>COMMISSION_GROUP</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode">
                                                <span>COMMISSION_TOTAL</span>
                                            </div>
                                            <div class="content-detail" id="commissionTotalSummary"></div>
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
                                                <input value="monthly" name="time" type="radio"
                                                       style="margin-left:10px"/>
                                                <span class="input-group-addon">COMMISSION_VIEW_MONTH_TITLE</span>
                                                <input value="yearly" name="time" type="radio"
                                                       style="margin-left:10px"/>
                                                <span class="input-group-addon">COMMISSION_VIEW_YEAR_TITLE</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" align="center" valign="middle" class="td-text">
                                            <div class="input-group" onClick="showRequestCommissionTime()">
                                                <span class="input-group-addon" style="white-space:pre-wrap; width:30%">COMMISSION_CHOOSE_TIME</span>
                                                <input type="button" class="form-control form-control-righttext"
                                                       id="commissionTimeDisp" value="SEQ_INPUT_TITLE"
                                                       autocomplete="off"/>
                                                <input type="hidden" id="commissionTime" value=""/>
                                                <span class="icon-movenext input-group-addon input-group-symbol"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <table id="commission-volume" align='left' class='weekCommission table-account'
                                       style="margin-top:10px">
                                    <tr class="trow-title">
                                        <th width="20%" align='center'>
                                            <span>COMMISSION_DIRECT</span>
                                        </th>
                                        <th width="20%" align='center'>
                                            <span>COMMISSION_GROUP</span>
                                        </th>
                                        <th width="20%" align='center'>
                                            <span>COMMISSION_TOTAL</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="mobile-mode">
                                                <span>COMMISSION_DIRECT</span>
                                            </div>
                                            <div class="content-detail directCommission">0</div>
                                        </td>
                                        <td>
                                            <div class="td-date-gold groupCommission">0</div>
                                            <div class="mobile-mode-gold">
                                                <span>COMMISSION_GROUP</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="mobile-mode">
                                                <span>COMMISSION_TOTAL</span>
                                            </div>
                                            <div class="content-detail totalCommission">0</div>
                                        </td>
                                    </tr>
                                </table>
                                <table id="commission-volume" class='monthYearCommission' style="width: 100%;display:none;margin-top: 10px;">
                                    <tr>
                                        <td colspan="5" align="center">
                                            <h5>
                                                <span style="font-size: 18px;font-weight: bold;">Cheque Payment</span>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" align="right">
                                            <h5>
                                                <span>Date: </span>
                                                <span id="currentDate"></span>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" align="left">
                                            <h5>
                                                <span>Name:</span>
                                                <span id="userName"></span>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" align="left">
                                            <h5>
                                                <span>ID:</span>
                                                <span id="userCode"></span>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" align="left">
                                            <h5 class="Header">
                                                <span>Chi tiết thanh toán hoa hồng &#38; thưởng</span>
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" align="left">
                                            <table align='left' id="monthYearCommission" class='table-account'>
                                                <tr class="trow-title">
                                                    <th width="60%" align='center'>
                                                        <span>Hoa hồng &#38; thưởng</span>
                                                    </th>
                                                    <th width="40%" align='center'>
                                                        <span>Số tiền</span>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td class="desktopmode1"><span>COMMISSION_DIRECT</span></td>
                                                    <td>
                                                        <div class="mobile-mode">
                                                            <span>COMMISSION_DIRECT</span>
                                                        </div>
                                                        <div class="content-detail directCommission"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="desktopmode1"><span>COMMISSION_GROUP</span></td>
                                                    <td>
                                                        <div class="td-date-gold groupCommission"></div>
                                                        <div class="mobile-mode-gold">
                                                            <span>COMMISSION_GROUP</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="desktopmode1"><span>COMMISSION_TOTAL</span></td>
                                                    <td>
                                                        <div class="mobile-mode">
                                                            <span>COMMISSION_TOTAL</span>
                                                        </div>
                                                        <div class="content-detail totalCommission"></div>
                                                    </td>
                                                </tr>
                                            </table>
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
