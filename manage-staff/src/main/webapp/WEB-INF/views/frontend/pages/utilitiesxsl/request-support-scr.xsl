<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
    <body>
    <div id="mainViewContent" class="main-layout-subview" style="padding-top:10px;">
      <div>
        <table>
          <tr>
            <td colspan="2"><h5 id='requestsupport.requestSupporttitle' align="left" class="screen-title"   style="padding-left: 15px; padding-right: 15px;"><span>MENU_PERSONAL_INFO_SUPPORT</span></h5>
              <div class='line-separate' style="padding-left: 15px; padding-right: 15px;"></div></td>
          </tr>
          <tr>
            <td colspan="2"><h5  style="padding:5px 15px 15px 15px;" id='acc-changepass-note' align="left" class=""><span>REQUEST_SUPPORT_CONTENT</span></h5></td>
          </tr>
          <tr>
            <td><table width="92%" align="center">
              <tr>
                <td colspan="2" align="left" valign="middle">
                        <span style="width:30%;font-size:15px">REQUEST_SUPPORT_TYPE</span>
                </td>
              </tr>
              <tr>
                  <td colspan="2" align="center" valign="middle" class="td-text">
                    <div class="input-group" onClick="showRequestSuportType()">
                      <input type="button" class="form-control form-control-righttext"  id="requestsupport.type" value="Đơn hàng" autocomplete="off"  maxlength="16"/>
                      <span class="icon-movenext input-group-addon input-group-symbol"></span>
                    </div>
                  </td>
                </tr>
                <tr>
                    <td colspan="2" align="left" valign="middle">
                        <span style="width:30%;font-size:15px">REQUEST_SUPPORT_INFO</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" valign="middle" class="td-text">
                        <div class="input-group">
                            <textarea rows="10" cols="50" class="form-control form-control-lefttext"  id="requestsupport.content"  autocomplete="off"  maxlength="200" style="height:120px;resize:none;margin-left: 0px;width: 100%;"></textarea>
                            <span class="input-group-addon input-group-symbol"></span>
                        </div>
                    </td>
                </tr>

                <tr style="display:none;">
                  <td colspan="2"><!--<input type="button" class="btnshadow btn-second" id="accpass.btn.moreinfo"
									onclick="showVirtualKeyboard();" value="Keyboard" />-->
                                    <div align="left"><a href="javascript:void(0)" onclick="showVirtualKeyboard();"><img title="Keyboard" style="margin-right:5px;" src="css/img/keyboard.png"/></a></div>
                    </td>
                </tr>
                <tr>
                  <td colspan="2"><div id="id-virtualkb" style="display:none;">
                      <div id="login-keyboard">
                        <table style="background-color: #ccc;font-weight: bold;">
                          <tbody>
                            <tr>
                              <td><div id="login-keyboard-alpha">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td><button id="elemA0" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">u</button></td>
                                        <td><button id="elemA1" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">r</button></td>
                                        <td><button id="elemA2" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">e</button></td>
                                        <td><button id="elemA3" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">b</button></td>
                                        <td><button id="elemA4" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">y</button></td>
                                        <td><button id="elemA5" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">i</button></td>
                                        <td><button id="elemA6" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">k</button></td>
                                        <td><button id="elemA7" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">a</button></td>
                                        <td><button id="elemA8" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">f</button></td>
                                        <td><button id="elemA9" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">c</button></td>
                                        <td class="clear"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td class="halfwidth"></td>
                                        <td><button id="elemA10" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">o</button></td>
                                        <td><button id="elemA11" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">g</button></td>
                                        <td><button id="elemA12" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">s</button></td>
                                        <td><button id="elemA13" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">v</button></td>
                                        <td><button id="elemA14" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">j</button></td>
                                        <td><button id="elemA15" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">z</button></td>
                                        <td><button id="elemA16" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">h</button></td>
                                        <td><button id="elemA17" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">t</button></td>
                                        <td><button id="elemA18" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">x</button></td>
                                        <td class="halfwidth"></td>
                                        <td class="clear"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td class="clear"></td>

                                        <td><button id="elemA19" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">q</button></td>
                                        <td><button id="elemA20" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">d</button></td>
                                        <td><button id="elemA21" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">p</button></td>
                                        <td><button id="elemA22" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">w</button></td>
                                        <td><button id="elemA23" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">n</button></td>
                                        <td><button id="elemA24" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">l</button></td>
                                        <td><button id="elemA25" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">m</button></td>
                                        <td class="clear"></td>
                                        <td class="clear"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div></td>
                              <td><div id="login-keyboard-numeric">
                                  <table style="padding-top: 25px;">
                                    <tbody>
                                      <tr>

                                        <td><button id="elemN0" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">8</button></td>
                                        <td><button id="elemN1" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">9</button></td>
                                        <td><button id="elemN2" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">1</button></td>
                                      </tr>
                                      <tr>

                                        <td><button id="elemN3" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">2</button></td>
                                        <td><button id="elemN4" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">5</button></td>
                                        <td><button id="elemN5" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">6</button></td>
                                      </tr>
                                      <tr>

                                        <td><button id="elemN6" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">0</button></td>
                                        <td><button id="elemN7" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">3</button></td>
                                        <td><button id="elemN8" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">4</button></td>
                                      </tr>
                                      <tr>
                                        <td class="clear"></td>
                                        <td><button id="elemN9" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" onclick="return showValue(this);">7</button></td>
                                        <td class="clear"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div></td>
                            </tr>
                            <tr>
                              <td colspan="2"><span id="login-keyboard-controls">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td class="clear"></td>
                                      <td class="button"><button onclick="return setCase();" onmouseout="return changeBack();" onmouseup="return changeBack();" onmousedown="return changeToStar();" id="elemC0"> Upper </button></td>
                                      <td class="button"><button onclick="return DeletePwd();" id="elemC1"> Del </button></td> <!--onmouseout="return changeBack();" onmouseup="return changeBack();" onmousedown="return changeToStar();" -->
                                      <td class="button"><button onclick="return ClearPwd();" onmouseout="return changeBack();" onmouseup="return changeBack();" onmousedown="return changeToStar();" id="elemC2"> Clear All </button></td>
                                      <td class="button"><button onclick="return setRandom();" onmouseout="return changeBack();" onmouseup="return changeBack();" onmousedown="return changeToStar();" id="elemC3"> Not Mixed </button></td>
                                      <td class="clear"></td>
                                    </tr>
                                  </tbody>
                                </table>
                                </span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div></td>
                </tr>
                <tr class="trow-space"></tr>
                <tr>
                  <!--<td align="center" width='50%'><input type="button" class="btnshadow btn-primary" onClick="goBack()" id="accpass.btn.login"
									value="REVIEW_BTN_CANCEL"/>
								</td>-->
                  <td  align="right" width='50%'><input type="button" class="btnshadow btn-second" id="requestsupport.submit"
									onclick="requestSuport()" value="REQUEST_SUPPORT_SUBMIT" /></td>
                </tr>
              </table></td>
          </tr>
        </table>
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
