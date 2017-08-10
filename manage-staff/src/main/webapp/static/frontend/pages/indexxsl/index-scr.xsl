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
                                            <b>Wellcome:    </b>
                                            <span id="dispName"></span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%">
                                        <h5>
                                            <b>ID:    </b>
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
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_STATUS_TITLE</span>
                                            <input id="status" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_RANK_TITLE</span>
                                            <input id="rank" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_ACTIVE_TITLE</span>
                                            <input id="active" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">INDEX_PAGE_BACKOFFICE_TITLE</span>
                                            <input id="backOffice" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;"><span>INDEX_PAGE_TOTAL_VOLUME_TITLE</span>
                                                (<span id="groupMonthVolumeTitle"></span>)
                                            </span>

                                            <input id="monthPersonalVolume" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="2">
                                        <h5 class="Header">
                                            <span>TOTAL_VOLUME_WEEK</span>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;"><span>LIST_VOLUME_WEEK</span>
                                                <span>&#160;</span>
                                                <span id="week0Time"></span>
                                            </span>

                                            <input id="volumeWeek0" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;"><span>LIST_VOLUME_WEEK</span>
                                                <span>&#160;</span>
                                                <span id="week1Time"></span>
                                            </span>
                                            <input id="volumeWeek1" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;"><span>LIST_VOLUME_WEEK</span>
                                                <span>&#160;</span>
                                                <span id="week2Time"></span>
                                            </span>
                                            <input id="volumeWeek2" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="left" valign="middle" class="td-text">
                                        <div class="input-group">
                                            <span class="input-group-addon" style="width:35%;">
                                                <span>LIST_VOLUME_WEEK</span>
                                                <span>&#160;</span>
                                                <span id="week3Time"></span>
                                            </span>
                                            <input id="volumeWeek3" type="text" disabled=""
                                                   class="form-control form-control-righttext" style="width:100%;"
                                                   value=""
                                                   autocomplete="off" autocorrect="off" autocapitalize="off"
                                                   spellcheck="off"/>
                                        </div>
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
                                            <input value="weekly" checked="true" name="time" type="radio"/>
                                            <span class="input-group-addon">Theo Tuần</span>
                                            <input value="monthly" name="time" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">Theo Tháng</span>
                                            <input value="yearly" name="time" type="radio" style="margin-left:10px"/>
                                            <span class="input-group-addon">Theo Năm</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div id="volumeHistory" style="padding:5px;">

                            </div>
                            <div align='right' id="volumeHistory.pagination" style="margin-right: 15px;">

                            </div>
                            <div id="temp" style="height:80px"></div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
