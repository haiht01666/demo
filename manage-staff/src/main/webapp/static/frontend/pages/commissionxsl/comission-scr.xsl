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
                                       style="margin-top:10px; display: none">
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
                                <table id="commission-volume" class='monthYearCommission' style="width: 100%;margin-top: 10px;">
                                    <!--<tr>-->
                                        <!--<td colspan="5" align="center">-->
                                            <!--<h5>-->
                                                <!--<span style="font-size: 18px;font-weight: bold;">Cheque Payment</span>-->
                                            <!--</h5>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td colspan="5" align="right">-->
                                            <!--<h5>-->
                                                <!--<span>Date: </span>-->
                                                <!--<span id="currentDate"></span>-->
                                            <!--</h5>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td colspan="5" align="left">-->
                                            <!--<h5>-->
                                                <!--<span>Name:</span>-->
                                                <!--<span id="userName"></span>-->
                                            <!--</h5>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td colspan="5" align="left">-->
                                            <!--<h5>-->
                                                <!--<span>ID:</span>-->
                                                <!--<span id="userCode"></span>-->
                                            <!--</h5>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <tr>
                                        <td colspan="5" align="left">
                                            <table cellpadding="0" cellspacing="0" border="0" width="99%">
                                                <tbody>
                                                    <tr>
                                                    <td colspan="2" width="95%" align="center">
                                                        <div class="checkLogo2">
                                                            <img id="ComChk1_checkLogoImg" src="static/frontend/promotion/logo.png" width="170px" style="border-width:0px;"/>
                                                        </div>
                                                        <div class="checkBank">
                                                            <span id="ComChk1_ckBankNameLbl">THE INTERNATIONAL BANK<br/>HOMETOWN, USA, 000000</span>
                                                        </div>
                                                    </td>
                                                    <td width="150" valign="top" align="right" class="checkInput" nowrap="" style="min-width: 150px">
                                                        <span id="ComChk1_ckPayMethodLbl" style="font-size:12pt;font-weight:bold;text-align: right; vertical-align: top;">Direct Deposit</span>
                                                        <div style="padding-top: 65px; padding-left: 12px; text-align: left;">
                                                            <span id="ComChk1_ckDateLbl" class="checkInput" style="font-size:11pt;font-weight:bold;"></span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td valign="bottom" height="35px" style="padding-top: 20px;" nowrap="">
                                                            <span id="ComChk1_payToLbl" class="checkInfo" style="font-size:9pt;font-weight:bold;">PAY TO THE<br/>ORDER OF</span>
                                                        </td>
                                                        <td width="95%" align="left" valign="bottom" nowrap="nowrap" class="checkInput">
                                                            <span id="ComChk1_ckPayToAgentLbl" class="checkInfo" style="font-size:11pt;padding-left: 20px;"></span>
                                                        </td>
                                                        <td width="5%" align="left" valign="bottom" nowrap="" class="checkInput" style="padding-left: 10px;">
                                                            <span id="ComChk1_ckAmountLbl" class="checkInfo" style="font-size:11pt;"></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" align="left" valign="bottom" nowrap="" class="checkInput" height="35px">
                                                            <span id="ComChk1_ckAmountStrLbl" class="checkInfo" style="font-size:11pt;padding-left: 10px; margin-right: -10px"></span>
                                                        </td>
                                                        <td width="100px" align="left" valign="bottom" nowrap="">
                                                            <span id="ComChk1_dollarsLbl" class="checkInfo" style="font-size:9pt;font-weight:bold;padding-left: 10px;">USD</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="70px" align="right" valign="bottom" style="padding-right: 10px; line-height: 60px;">
                                                            <span id="ComChk1_memoTitleLbl" class="checkInfo" style="font-size:9pt;font-weight:bold;">MEMO:</span>
                                                        </td>
                                                        <td colspan="2" valign="bottom" nowrap="">
                                                            <div style="float: left; margin-top: 50px; line-height: 25px;">
                                                                <span id="ComChk1_memoLbl" class="checkMemo"></span>
                                                            </div>
                                                            <div style="float: right; vertical-align: bottom; margin-top: 10px;">
                                                                <img alt="" src="static/frontend/assets/images/checkSignature.png"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="4" valign="bottom" align="center">
                                                            <img alt="" src="static/frontend/assets/images/checkAcctBar.png"/>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
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
