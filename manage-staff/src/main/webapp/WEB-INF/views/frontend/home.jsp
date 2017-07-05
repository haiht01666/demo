<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=10"/>
    <!--<meta name="viewport"
              content="initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"/>-->
    <meta name="viewport"
          content="initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, width=device-width"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta content="TPBank eBanking" name="description"/>
    <meta content="ebanking, internet banking, internet, banking, mobile banking, mobile, online, tpbank, tienphong, tien phong"
          name="keywords"/>


    <title>Home</title>
    <link rel="icon" type="image/x-icon" href="static/frontend/assets/images/favicon.ico"/>
    <link rel="SHORTCUT ICON" href="static/frontend/assets/images/favicon.ico"/>
    <!-- eBank Desktop -->
    <link rel="stylesheet" href="static/frontend/css/style.css" type="text/css" media="only screen and (min-width:801px)"/>
    <link rel="stylesheet" href="static/frontend/css/ebankstyle.css" type="text/css" media="only screen and (min-width:801px)"/>
    <!-- eBank Mobile -->
    <link rel="stylesheet" href="static/frontend/cssmb/style.css" type="text/css" media="only screen and (max-width:801px)">
    <link rel="stylesheet" href="static/frontend/cssmb/ebankstyle.css" type="text/css" media="only screen and (max-width:801px)">
    <link rel="stylesheet" href="static/frontend/assets/fonts/iconfonts.css" type="text/css"/>
    <script type="text/javascript" src="static/frontend/assets/constants.js"></script>
    <script type="text/javascript" src="static/frontend/assets/preload.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/es5-shim.js"></script>
    <script type="text/javascript" src="static/frontend/pages/newsxsl/list_news_cat_menu_scr.js"></script>
    <!--<script type="text/javascript" src="./static/frontend/assets/libs/fastclick.js"></script>
        <script type="application/javascript">
            window.addEventListener('load', function () {
                FastClick.attach(document.body);
            }, false);
        </script> -->
    <script type="text/javascript" src="static/frontend/assets/libs/slideinmenu.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/iscroll.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/virtualkeyboard.js"></script>
    <script type="text/javascript" src="static/frontend/assets/common.js"></script>
    <script type="text/javascript" src="static/frontend/assets/LangVN.js"></script>
    <script type="text/javascript" src="static/frontend/assets/LangEN.js"></script>
    <script type="text/javascript" src="static/frontend/assets/mb-service.js"></script>
    <script type="text/javascript" src="static/frontend/assets/init.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/tabs.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/html2canvas.js"></script>
    <!--<script type="text/javascript" src="./static/frontend/assets/system-data.js"></script>
    <script type="text/javascript" src="./static/frontend/assets/system-payment-config.js"></script>-->

    <!-- LOAD IMAGE -->
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image-ios.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image-orientation.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image-meta.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image-exif.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/load-image-exif-map.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/carmera/canvas-to-blob.js"></script>
    <link rel="stylesheet" href="static/frontend/assets/libs/slideshow/js-image-slider.css" type="text/css"/>
    <script type="text/javascript" src="static/frontend/assets/libs/slideshow/js-image-slider.js"></script>
    <link rel="stylesheet" href="static/frontend/assets/libs/pinpad/style_lockscreen.css" type="text/css"/>
    <script type="text/javascript" src="static/frontend/assets/libs/pinpad/jquery.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/pinpad/jquery-ui.min.js"></script>
    <script type="text/javascript" src="static/frontend/assets/libs/crypto.js"></script>

    <script type="text/javascript" src="static/frontend/assets/cache-control.js"></script>
    <script type="text/javascript" src="static/js/common/moment.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


    <style type="text/css">

        #bodyPage {
            /*display:none;*/
        }

        #loadingPage {
            display: none;
            z-index: 2000;
            top: 0px;
            left: 0px;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            transition: opacity 1s;
            -moz-transition: opacity 1s;
            -webkit-transition: opacity 1s; /* Safari */
            -ms-transition: opacity 1s;
            text-align: center;
            opacity: 1;
            background-image: -ms-radial-gradient(center, circle closest-side, #63376A 0%, #4D225A 60%);
            background-image: -moz-radial-gradient(center, circle closest-side, #63376A 0%, #4D225A 60%);
            background-image: -o-radial-gradient(center, circle closest-side, #63376A 0%, #4D225A 60%);
            background-image: -webkit-gradient(radial, center center, 0, center center, 140, color-stop(0, #63376A), color-stop(1, #4D225A));
            background-image: -webkit-radial-gradient(center, circle closest-side, #63376A 0%, #4D225A 60%);
            background-image: radial-gradient(circle closest-side at center, #63376A 0%, #4D225A 60%);
        }

        #loadingPage .circle {
            top: 46%;
            background-color: rgba(0, 0, 0, 0);
            border: 5px solid rgba(0, 183, 229, 0.9);
            /*border: 5px solid rgba(245, 131, 31, 0.9);*/
            opacity: .9;
            border-right: 5px solid rgba(0, 0, 0, 0);
            border-left: 5px solid rgba(0, 0, 0, 0);
            border-radius: 50px;
            -webkit-border-radius: 50px;
            -webkit-border-top-left-radius: 50px;
            -webkit-border-top-right-radius: 50px;
            -webkit-border-bottom-left-radius: 50px;
            -webkit-border-bottom-right-radius: 50px;
            -moz-border-radius: 50px;
            box-shadow: 0 0 35px #2187e7;
            /*box-shadow: 0 0 35px #FFAC48;*/
            width: 50px;
            height: 50px;
            margin: 0 auto;
            position: relative;
            animation: spinPulse 1s infinite ease-in-out;
            -ms-animation: spinPulse 1s infinite ease-in-out;
            -moz-animation: spinPulse 1s infinite ease-in-out;
            -webkit-animation: spinPulse 1s infinite linear;
        }

        #loadingPage .circle1 {
            top: 41%;
            background-color: rgba(0, 0, 0, 0);
            border: 5px solid rgba(0, 183, 229, 0.9);
            /*border: 5px solid rgba(245, 131, 31, 0.9);*/
            opacity: .9;
            border-left: 5px solid rgba(0, 0, 0, 0);
            border-right: 5px solid rgba(0, 0, 0, 0);
            border-radius: 50px;
            -webkit-border-radius: 50px;
            -webkit-border-top-left-radius: 50px;
            -webkit-border-top-right-radius: 50px;
            -webkit-border-bottom-left-radius: 50px;
            -webkit-border-bottom-right-radius: 50px;
            -moz-border-radius: 50px;
            box-shadow: 0 0 15px #2187e7;
            /*box-shadow: 0 0 15px #FFAC48;*/
            width: 30px;
            height: 30px;
            margin: 0 auto;
            margin-top: 7px;
            position: relative;
            animation: spinoffPulse 1s infinite linear;
            -ms-animation: spinoffPulse 1s infinite linear;
            -moz-animation: spinoffPulse 1s infinite linear;
            -webkit-animation: spinoffPulse 1s infinite linear;
        }

        @media only screen and (max-width: 800px) {
            #loadingPage {
                background-color: #471C51;
            }

            #loadingPage .circle1 {
                top: 39%;
                margin-top: 6px;
            }
        }

        @-moz-keyframes spinPulse {
            0% {
                -moz-transform: rotate(160deg);
                opacity: 0;
                box-shadow: 0 0 1px #2187e7;
            }
            50% {
                -moz-transform: rotate(145deg);
                opacity: 1;
            }
            100% {
                -moz-transform: rotate(-320deg);
                opacity: 0;
            }
        }

        @-moz-keyframes spinoffPulse {
            0% {
                -moz-transform: rotate(0deg);
            }
            100% {
                -moz-transform: rotate(360deg);
            }
        }

        @-webkit-keyframes spinPulse {
            0% {
                -webkit-transform: rotate(160deg);
                opacity: 0;
                box-shadow: 0 0 1px #2187e7;
            }
            50% {
                -webkit-transform: rotate(145deg);
                opacity: 1;
            }
            100% {
                -webkit-transform: rotate(-320deg);
                opacity: 0;
            }
        }

        @-webkit-keyframes spinoffPulse {
            0% {
                -webkit-transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @-ms-keyframes spinPulse {
            0% {
                -ms-transform: rotate(160deg);
                opacity: 0;
                box-shadow: 0 0 1px #2187e7;
            }
            50% {
                -ms-transform: rotate(145deg);
                opacity: 1;
            }
            100% {
                -ms-transform: rotate(-320deg);
                opacity: 0;
            }
        }

        @-ms-keyframes spinoffPulse {
            0% {
                -ms-transform: rotate(0deg);
            }
            100% {
                -ms-transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
<div id="div-pinpad" style="display: none; height: 1024px; background-color: #471C51 !important">
    <div class="gradient-background-layer-pinpad"></div>
    <div align="center" id="logo"><img src="static/frontend/assets/images/logo.png" height="25px"/></div>
    <div align="center" id="divider"><img src="static/frontend/assets/images/hdivider.png" style="width:100%;"/></div>
    <br/>

    <!--<img src="../static/frontend/assets/images/diamond.png" style="height: 234px; width: 300px; right: 0; position: absolute; bottom: 20%; background-repeat: no-repeat; background-position: center; background-size: cover; z-index: -1000;" />-->

    <p id="error_message" class="pass_button" align="center" style="visibility:hidden; font-size: larger;">message</p>
</div>
<div align="center" id="bodyPage">
    <div id="fullPage" align="center" style="background-image: url(static/frontend/assets/images/1.jpg)">
        <div id="pageHeader">
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td style="padding-top:0px;padding-bottom:0px;background-color: rgba(33, 231, 222, 0.17);">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="height: 105px;">
                            <tr>
                                <td width="30"></td>
                                <td width="190" valign="middle" style="padding-top:0px;padding-bottom:0px;"><a
                                        href="bhipglobal.com" target="_blank"> <img src="static/frontend/promotion/logo.png" alt=""/>
                                </a></td>
                                <td width="204"></td>
                                <td width="80"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="desktopmode">
            <div class="box_layout_lienhe" id="box_lienhe">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <div class="bg_top_lienhe"></div>
                            <div style="width: 211px; height: auto;">
                                <div class="bg_center_lienhe" style="text-align: left;">
                                    <div style="padding: 5px 13px 5px 13px; font-size: 12px;">
                                        <div style="font-weight: bold; padding-bottom: 10px;"><span
                                                id="spanLoginContact">LOGIN_CONTACT</span></div>
                                        <div><span id="spanCustomerService">LOGIN_CUSTOMER_SERVICE</span></div>
                                        <div style="color: #f37021; padding-bottom: 10px">1800 58 58 85 | 043
                                            7.683.683
                                        </div>
                                        <div style="padding-bottom: 10px;"><a class='ref-link'
                                                                              onClick="openLinkInWindows('https://tpb.vn/chi-nhanh/');"
                                                                              style="text-decoration: none;"><span
                                                id="spanLoginBranch">LOGIN_BRANCH</span></a> | <a class='ref-link'
                                                                                                  onClick="openLinkInWindows('https://tpb.vn/mang-luoi-atm/');"
                                                                                                  style="text-decoration: none;"><span
                                                id="spanLoginATM">LOGIN_ATM</span></a></div>
                                        <div style="padding-bottom: 10px;"><a class='ref-link'
                                                                              onClick="openLinkInWindows('https://tpb.vn/lien-he/');"
                                                                              style="text-decoration: none;"><span
                                                id="spanLoginEmail">LOGIN_EMAIL</span></a> | <a class='ref-link'
                                                                                                onClick="openLinkInWindows('https://webchat.tpb.vn/WebchatASP/');"
                                                                                                style="text-decoration: none;"><span
                                                id="spanLoginChat">LOGIN_CHAT</span></a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg_botton_lienhe"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="menu-section" class="menu-layout" style="display:none;">
            <div class='menu-header'>
                <!--<span id="menu-profile-name" class="menu-profile-name" onClick="navController.initWithRootView('utilitiesxsl/change-personal-info-scr', true, 'xsl');">TPBank eBank</span>-->
                <span id="menu-profile-name" class="menu-profile-name"
                      onClick="navController.initWithRootView('utilitiesxsl/personal-info-view-scr', true, 'xsl');">DFG Japan Exclusive from ThaiLand</span>
                <div id="menu-profile-avatar" class="menu-profile-container"
                     onClick="navController.initWithRootView('utilitiesxsl/personal-info-view-scr', true, 'xsl');"><span
                        class="icon-user2 menu-profile-icon"> </span>
                    <!--<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="http://10.1.20.240:4567/download/113/cus_avatar/20150211_1514205286.jpg" />-->
                </div>
                <div class="exit-button" onClick="logoutExit()">
                    <!--<div class="exit-button" onClick="logout()">-->
                    <!-- <span data-tooltip aria-haspopup="true" class="icon-exit" title="Thoát/Exit"></span>-->

                    <span class="langNoStyle" id="id.menu_logout.caption">MENU_LOGOUT</span>
                    <!--<div class="langNoStyle">MENU_LOGOUT</div>-->

                    <!--
                    <em class="icon-outcoming"></em>
                    -->
                </div>
            </div>

            <div id="wrapper-menu" style="position: absolute;width: 260px;">
                <div id="scroller-menu">
                    <ul id="menu.slideview" class="menu-layout-contents">
                        <li id="mHomePage">
                            <div onClick="gotoHomePage();" id='indexxsl/index-scr'><em
                                    class="icon-home"></em>
                                <div class="langNoStyle" style="font-weight:bold">MENU_HOME_PAGE</div>
                                <span>1</span></div>
                        </li>
                        <li id="group">
                            <div onClick="applyScrollForMe(this.parentNode);"><em class="icon-introcus"></em>
                                <div class="langNoStyle" style="font-weight:bold">GROUP_MANAGER_HEADER</div>
                                <span>2</span></div>
                            <ul class="menu-layout-contents-sub">
                                <div id="wrapper_group" class="wrapper">
                                    <div>
                                        <li>
                                            <div onClick="navController.initWithRootView('groupxsl/group-graphical', true, 'xsl');"
                                                 id='groupxsl/group-graphical'><em class="icon-arrowright"></em>
                                                <div class="langNoStyle">GROUP_MANAGER_TREE_GRAPHICAL</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick="navController.initWithRootView('groupxsl/group-list-order', true, 'xsl');"
                                                 id='groupxsl/group-list-order'><em class="icon-arrowright"></em>
                                                <div class="langNoStyle">GROUP_MANAGER_ORDER_LIST</div>
                                            </div>
                                        </li>
                                        <!--<li><div onclick="navController.initWithRootView('setting/setting-auth-type', true)"><em data-icon="&#x1008;"></em>Đổi mật khẩu</div></li>-->
                                        <li>
                                            <div onClick="navController.initWithRootView('groupxsl/group-list-npp', true, 'xsl')"
                                                 id='groupxsl/group-list-npp'><em class="icon-arrowright"></em>
                                                <div class="langNoStyle">GROUP_MANAGER_NPP_LIST</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick="navController.initWithRootView('groupxsl/group-list-npp-direct', true, 'xsl')"
                                                 id='groupxsl/group-list-npp-direct'><em class="icon-arrowright"></em>
                                                <div class="langNoStyle">GROUP_MANAGER_NPP_DIRECT_LIST</div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li id="setting">
                            <div onClick="applyScrollForMe(this.parentNode);"><em class="icon-account"></em>
                                <div class="langNoStyle" style="font-weight:bold">MENU_PERSONAL_INFO_TITLE</div>
                                <span>2</span></div>
                            <ul class="menu-layout-contents-sub">
                                <div id="wrapper_setting" class="wrapper">
                                    <div>
                                        <li>
                                            <div onClick="navController.initWithRootView('utilitiesxsl/change-personal-info-scr', true, 'xsl');"
                                                 id='utilitiesxsl/change-personal-info-scr'><em
                                                    class="icon-arrowright"></em>
                                                <div class="langNoStyle">MENU_PERSONAL_INFO_DETAIL</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div onClick="navController.initWithRootView('accountxsl/account-change-password-scr', true, 'xsl');"
                                                 id='accountxsl/account-change-password-scr'><em
                                                    class="icon-arrowright"></em>
                                                <div class="langNoStyle">MENU_PERSONAL_INFO_PASSWORD</div>
                                            </div>
                                        </li>
                                        <!--<li><div onclick="navController.initWithRootView('setting/setting-auth-type', true)"><em data-icon="&#x1008;"></em>Đổi mật khẩu</div></li>-->
                                        <li>
                                            <div onClick="navController.initWithRootView('utilitiesxsl/request-support-scr', true, 'xsl')"
                                                 id='utilitiesxsl/request-support-scr'><em
                                                    class="icon-arrowright"></em>
                                                <div class="langNoStyle">MENU_PERSONAL_INFO_SUPPORT</div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li id="managerCommission">
                            <div onClick="applyScrollForMe(this.parentNode);"><em class="icon-eSaving"></em>
                                <div class="langNoStyle" style="font-weight:bold">COMMISSION_MENU_TITLE</div>
                                <span>2</span></div>
                            <ul class="menu-layout-contents-sub">
                                <div id="wrapper_commisstion" class="wrapper">
                                    <div>
                                        <li>
                                            <div onClick="navController.initWithRootView('commissionxsl/comission-scr', true, 'xsl');"
                                                 id='commissionxsl/comission-scr'><em
                                                    class="icon-arrowright"></em>
                                                <div class="langNoStyle">COMMISSION_DETAIL_TITLE</div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </div>


            </div>

        </div>
        <div id="mainview" class="main-layout"
             style="float:none;border-left-style:none;border-right-style:none; display:block">
            <div class="gradient-background-layer-0"></div>
            <div id="headermb" class="header" style="display:none;">
                <div id="nav.btn.showslidemenu" class="icon-menulist handle" onClick="showSlideMenu();"
                     style="display:none;"></div>
                <div class="navigationlogo" style="width:50%;left:22%;" align="center" onClick="gotoHomePage();"
                     id="homepagexsl/homepage-scr"><img src="static/frontend/assets/images/bhip-logo-white.png" height="25px"/></div>
                <div class="help" id="id.home.btn" style="left:40px;  display:none;" onClick="gotoHomePage();">
                    <div class='icon-home'></div>
                </div>
                <div class="help divImgFeedback" id="btnFeedback" style="display:none"><img
                        src="static/frontend/assets/images/TPBank-feedback-logo-vie.png" height="22px" class="html5logo"
                        onclick="Html2Canvas(this);"></div>

                <div class="grid"></div>
            </div>
            <div id="headerib" class="header" style="height:30px;display:none;">
                <div style="border-bottom:color:#333;font-size:12px;text-align: left;margin-top: 8px;margin-left: 10px;font-weight: bold;color:#fff;">
                    <!--<span>MAIN_SCR_HEADER_TITLE</span>-->
                    <div class="langNoStyle" id="lblChangLanguage"><span id="titlePage">MAIN_SCR_HEADER_TITLE</span>
                    </div>
                </div>


                <!--<div class="reload-button" style="margin-right: 35px;" onClick="navController.resetBranchView();"><em class="icon-spinner"></em></div>-->
            </div>
            <div align="center">
                <div id="tabHostIndicator" style="display:none;"><span class="window8-1"></span> <span
                        class="window8-2"></span> <span class="window8-3"></span> <span class="window8-4"></span> <span
                        class="window8-5"></span> <span class="window8-6"></span> <span id="tabHostLoadingMsg"
                                                                                        style="display:block;">Loading...</span>
                </div>
                <div id="tabHostFailMsg"></div>
            </div>
            <div id='tabHost'></div>
            <div id="pageJS"></div>
            <div id="mask-slideview" class="slidemenu-blacktrans" onClick="closeAllSlideMenu();"
                 style="display:none"></div>
            <div id="mainlayoutfooter" class="footer" style="display:none;">

                <!--
                <div class="changebrowser"> <a class="acallphone" href="http://mbtest.tpb.vn/m/?ver=ib">
                  <div class='icon-timerprocess  btnshadow btn-second btn-round-15'></div>
                  </a> </div>
                  -->

                <div class="changelanguage" id="btnChangLanguage" style="display: none"><img class="languageEnglishFlag"
                                                                                             src='static/frontend/assets/images/English_flag_round_30.png'
                                                                                             onClick="changeLanguageOnIB()">
                </div>
                <div class="divcopyright">
                    <p class="pcopyrighttext" id="id_copyright_mb"></p>
                </div>
            </div>
        </div>

        <!-- desktop footer -->
        <div id="pageFooter" style="background-color: rgba(33, 231, 222, 0.17); float: left;height: 34px;width:100%;">
            <div class="changelanguage" id="btnChangLanguageIB" style="display: none"><img class="languageEnglishFlag"
                                                                                           src='static/frontend/assets/images/English_flag_round_30.png'
                                                                                           onClick="changeLanguageOnIB()">
            </div>
            <div class="divcopyright">
                <p class="pcopyrighttext" id="id_copyright"></p>
            </div>
        </div>
    </div>
</div>
<div id="mask-blacktrans" class="alert-blacktrans" align="center" onClick="" style="display:none"></div>
<div id="loadingMask" class="loading" style="display:none">
    <div class="circle"></div>
    <div class="circle1"></div>
</div>
<div id="alert-confirm-dialog" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <p id="alert-confirm-content" class="txt-alert-view"></p>
        <table style="width:100%">
            <!-- style="width:100% ;border-top:1px solid black"-->
            <tr>
                <td style="width:50%;"><!-- style="width:50%; border-right:1px solid black"-->

                    <input type="button" id="btnAlertConfirmCancel" value="ALERT_BTN_CANCEL_TITLE"
                           onclick="closeAlertConfirm(false)" class="btn-alert-close"/></td>
                <td style="width:50%"><input type="button" id="btnAlertConfirmOk" value="ALERT_BTN_OK_TITLE"
                                             onClick="closeAlertConfirm(true)"
                                             class="btn-alert-ok"/></td>
            </tr>
        </table>
    </div>
</div>
<div id="alert-app-confirm" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <p id="alert-app-content" class="txt-alert-view"></p>
        <table style="width:100%">
            <!-- style="width:100% ;border-top:1px solid black"-->
            <tr>
                <td style="width:50%;" id="td-confirm-cancel"><!-- style="width:50%; border-right:1px solid black"-->

                    <input type="button" id="btnAlertAppCancel" value="ALERT_BTN_CANCEL_TITLE"
                           onclick="closeAlertApp(false)" class="btn-alert-close"/></td>
                <td style="width:50%" id="td-confirm-ok"><input type="button" id="btnAlertAppOk"
                                                                value="ALERT_BTN_OK_TITLE" onClick="closeAlertApp(true)"
                                                                class="btn-alert-ok"/></td>
            </tr>
        </table>
    </div>
</div>
<div id="alert-confirm-dialog-schedulebank" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <p id="alert-confirm-content-schedulebank" class="txt-alert-view"></p>
        <table style="width:100%">
            <!-- style="width:100% ;border-top:1px solid black"-->
            <tr>
                <td style="width:50%;"><!-- style="width:50%; border-right:1px solid black"-->

                    <input type="button" id="btnCANCEL_SCHEDULE" onClick="closeAlertConfirmScheduleBank(false)"
                           class="btn-alert-close"/></td>
                <td style="width:50%"><input type="button" id="btnOK_SCHEDULE"
                                             onClick="closeAlertConfirmScheduleBank(true)" class="btn-alert-ok"/></td>
            </tr>
        </table>
    </div>
</div>

<div id="alert-confirm-dialog-qrcode" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <p id="alert-confirm-content-schedulebank" class="txt-alert-view"></p>
        <table style="width:100%">
            <tr>
                <td style="width:50%;">
                    <input type="button" id="btnCANCEL_SCHEDULE" onClick="closeAlertConfirmScheduleBank(false)"
                           class="btn-alert-close" value="Thử lại"/>
                </td>
                <td style="width:50%">
                    <input type="button" id="btnOK_SCHEDULE" onClick="closeAlertConfirmScheduleBank(true)"
                           class="btn-alert-ok" value="Thoát"/>
                </td>
            </tr>
        </table>
    </div>
</div>

<div id="alert-info-dialog" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <p id="alert-info-content" class="txt-alert-view"></p>
        <input type="button" value="ALERT_BTN_OK_TITLE" onClick="closealert()" class="btn-alert-close"/>
    </div>
</div>
<div id="alert-KHCN-KHDN-TERMS-dialog" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <div class="closepopup" onClick="closealertKHCN_KHDN_TERMS();"></div>
        <p id="alert-KHCN-KHDN-TERMS-content" class="txt-alert-view"></p>
        <table style="width:100%">
            <!-- style="width:100% ;border-top:1px solid black"-->
            <tr>
                <td style="width:50%;"><!-- style="width:50%; border-right:1px solid black"-->
                    <!--
                    <input type="button" value="ALERT_BTN_KHDN"  onclick="closealertKHCN_KHDN_TERMS();window.open('./download/Dieu khoan dieu kien eBank - KHDN - Vietnamese.pdf');" class="btn-alert-close" id="btnTERMS_KHDN" /></td>
                  <td style="width:50%"><input type="button" value="ALERT_BTN_KHCN" onClick="closealertKHCN_KHDN_TERMS();window.open('./download/Dieu khoan dieu kien eBank - KHCN - Vietnamese.pdf');" class="btn-alert-close" id="btnTERMS_KHCN" />
                  -->

                    <input type="button" value="ALERT_BTN_KHDN" onclick="closealertKHDN_TERMS();"
                           class="btn-alert-close" id="btnTERMS_KHDN" style="white-space:pre-wrap"/></td>
                <td style="width:50%"><input type="button" value="ALERT_BTN_KHCN" onClick="closealertKHCN_TERMS();"
                                             class="btn-alert-close" id="btnTERMS_KHCN" style="white-space:pre-wrap"/>
                </td>
            </tr>
        </table>
    </div>
</div>
<div id="alert-KHCN-KHDN-INSTRUCTION-dialog" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <div class="closepopup" onClick="closealertKHCN_KHDN_INSTRUCTION();"></div>
        <p id="alert-KHCN-KHDN-INSTRUCTION-content" class="txt-alert-view"></p>
        <table style="width:100%">
            <!-- style="width:100% ;border-top:1px solid black"-->
            <tr>
                <td style="width:50%;"><!-- style="width:50%; border-right:1px solid black"-->

                    <!--
                    <input type="button" value="ALERT_BTN_KHDN"  onclick="closealertKHCN_KHDN_INSTRUCTION();window.open('./download/HDSD Internet Banking - KHDN - Vietnamese.pdf');" class="btn-alert-close" id="btnINSTR_KHDN" /></td>
                  <td style="width:50%"><input type="button" value="ALERT_BTN_KHCN" onClick="closealertKHCN_KHDN_INSTRUCTION();window.open('./download/HDSD Internet Banking - KHCN - Vietnamese.pdf');" class="btn-alert-close"  id="btnINSTR_KHCN" />
                  -->

                    <input type="button" value="ALERT_BTN_KHDN" onclick="closealertKHDN_INSTRUCTION();"
                           class="btn-alert-close" id="btnINSTR_KHDN"/></td>
                <td style="width:50%"><input type="button" value="ALERT_BTN_KHCN"
                                             onClick="closealertKHCN_INSTRUCTION();" class="btn-alert-close"
                                             id="btnINSTR_KHCN"/></td>
            </tr>
        </table>
    </div>
</div>
<div id="alert-KHCN-KHDN-FAQ-dialog" class="alert-blacktrans" align="center" onClick="" style="display:none">
    <div class="alert-info">
        <div class="closepopup" onClick="closealertKHCN_KHDN_FAQ();"></div>
        <p id="alert-KHCN-KHDN-FAQ-content" class="txt-alert-view"></p>
        <table style="width:100%">
            <tr>
                <td style="width:50%;"><input type="button" value="ALERT_BTN_KHDN" onclick="closealertKHDN_FAQ();"
                                              class="btn-alert-close" id="btnFAQ_KHDN"/></td>
                <td style="width:50%"><input type="button" value="ALERT_BTN_KHCN" onClick="closealertKHCN_FAQ();"
                                             class="btn-alert-close" id="btnFAQ_KHCN"/></td>
            </tr>
        </table>
    </div>
</div>
<div id="loadingPage">
    <div class="circle"></div>
    <div class="circle1"></div>
</div>
<div id="hint-info-dialog" class="dialog-blacktrans" align="center"
     style="display:none;background-color: rgba(0, 0, 0, 0);">
    <div class="dialog-backgroundtrans" onClick="closeHint()"></div>
    <span id='search_dialog' class="text-hint" style="white-space:pre-wrap;">
                    </span>
</div>
<script type="text/javascript">
    document.getElementById("id_copyright").innerHTML = "&copy;&nbsp;" + new Date().getFullYear() + "&nbsp;DFG Japan Exclusive from ThaiLand";
    document.getElementById("id_copyright_mb").innerHTML = "&copy;&nbsp;" + new Date().getFullYear() + "&nbsp;DFG Japan Exclusive from ThaiLand";

</script>
</body>

<!-- Mirrored from ebank.tpb.vn/retail/ by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 25 Mar 2017 02:18:07 GMT -->
</html>