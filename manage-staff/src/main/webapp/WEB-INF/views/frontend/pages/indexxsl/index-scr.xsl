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
                                            <span>INDEX_PAGE_TITLE</span>
                                        </h5>
                                        <div class="line-separate"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%">
                                        <h5>
                                            <b>Wellcome:</b>
                                            <span id="dispName">
                                                <b>NGUYEN DINH HAN</b>
                                            </span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%">
                                        <h5>
                                            <b>ID:</b>
                                            <span id="accountId">
                                                <b>125280711</b>
                                            </span>
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>INDEX_PAGE_BONUS_TITLE</span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_STATUS_TITLE</span>
                                            <input id="status" type="text" disabled="disabled"
                                                   class="form-control form-control-righttext" style="width:100%;"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_RANK_TITLE</span>
                                            <input id="rank" type="text" disabled="disabled"
                                                   class="form-control form-control-righttext" style="width:100%;"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_STANDARD_TITLE</span>
                                            <input id="standard" type="text" disabled="disabled"
                                                   class="form-control form-control-righttext" style="width:100%;"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_TOTAL_VOLUME_TITLE</span>
                                            <input id="totalVolume" type="text" disabled="disabled"
                                                   class="form-control form-control-righttext" style="width:100%;"/>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>LIST_VOLUME_WEEK1</span> (27/03/2017-02/04/2017)
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <table align='left' id="weely-volume" class='table-account'>
                                <tr class="trow-title">
                                    <th width="25%" align='center'/>
                                    <th width="25%" align='center'><span>LIST_VOLUME_LEFT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_RIGHT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_TOTAL</span></th>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_BONUS_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_NPP_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_SPONSOR_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>LIST_VOLUME_WEEK2</span> (3/20/2017-3/26/2017)
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <table align='left' id="weely-volume" class='table-account'>
                                <tr class="trow-title">
                                    <th width="25%" align='center'/>
                                    <th width="25%" align='center'><span>LIST_VOLUME_LEFT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_RIGHT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_TOTAL</span></th>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_BONUS_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_NPP_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_SPONSOR_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>LIST_VOLUME_WEEK3</span> (13/03/2017-19/03/2017)
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <table align='left' id="weely-volume" class='table-account'>
                                <tr class="trow-title">
                                    <th width="25%" align='center'/>
                                    <th width="25%" align='center'><span>LIST_VOLUME_LEFT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_RIGHT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_TOTAL</span></th>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_BONUS_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_NPP_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_SPONSOR_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>LIST_VOLUME_WEEK4</span> (06/03/2017-12/03/2017)
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                            <table align='left' id="weely-volume" class='table-account'>
                                <tr class="trow-title">
                                    <th width="25%" align='center'/>
                                    <th width="25%" align='center'><span>LIST_VOLUME_LEFT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_RIGHT</span></th>
                                    <th width="25%" align='center'><span>LIST_VOLUME_TOTAL</span></th>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_BONUS_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_NPP_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tdselct td-head-color">
                                        <div><span>WEEK_VOLUME_SPONSOR_TITLE</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_LEFT</span></div>
                                        <div class="content-detail">1</div>
                                    </td>
                                    <td>
                                        <div class="td-date-gold">2</div>
                                        <div class="mobile-mode-gold"><span>LIST_VOLUME_RIGHT</span></div>
                                    </td>
                                    <td>
                                        <div class="mobile-mode"><span>LIST_VOLUME_TOTAL</span></div>
                                        <div class="content-detail">3</div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" align="center">
                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>INDEX_PAGE_DESTINATION_VOLUME_HISTORY</span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group" style="width:50%">
                                            <input value="weekly" checked="true" name="token" type="radio"/>
                                            <span class="input-group-addon">Theo Tuần</span>
                                            <input value="monthly" name="token" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">Theo Tháng</span>
                                            <input value="yearly" name="token" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">Theo Năm</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div id="volumeHistory" style="padding:5px;">

                            </div>
                            <div align='right' id="volumeHistory.pagination" style="margin-right: 15px;">

                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
