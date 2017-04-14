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
                                            <span id="dispName"></span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%">
                                        <h5>
                                            <b>ID:</b>
                                            <span id="accountId"></span>
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
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 10px;">
                                            <span style="width:35%;padding-left: 7px;">INDEX_PAGE_STATUS_TITLE</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="status" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 10px;">
                                            <span style="width:35%;padding-left: 7px;">INDEX_PAGE_RANK_TITLE</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="rank" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 10px;">
                                            <span style="width:35%;padding-left: 7px;">INDEX_PAGE_TOTAL_VOLUME_TITLE</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="totalVolume" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 7px;">
                                            <span style="width:35%;padding-left: 7px;">TOTAL_VOLUME_WEEK</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 7px;padding-left: 15px;">
                                            <span>&#9830;</span>
                                            <span style="width:35%;padding-left: 7px;">LIST_VOLUME_WEEK1</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="volumeWeek1" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 7px;padding-left: 15px;">
                                            <span>&#9830;</span>
                                            <span style="width:35%;padding-left: 7px;">LIST_VOLUME_WEEK2</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="volumeWeek2" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 7px;padding-left: 15px;">
                                            <span>&#9830;</span>
                                            <span style="width:35%;padding-left: 7px;">LIST_VOLUME_WEEK3</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="volumeWeek3" style="white-space:pre-wrap;"></span>
                                    </td>
                                </tr>
                                <tr class="nohover">
                                    <td style="border:none; width:150px; display:table-cell; font-weight:normal;">
                                        <div class="input-group" style="margin-bottom: 7px;padding-left: 15px;">
                                            <span>&#9830;</span>
                                            <span style="width:35%;padding-left: 7px;">LIST_VOLUME_WEEK4</span>
                                        </div>
                                    </td>
                                    <td style="border:none; width:60%; display:table-cell;">
                                        <span id="volumeWeek4" style="white-space:pre-wrap;"></span>
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
