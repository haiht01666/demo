<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html lang="en">
<!--
  **NOTE:** This is a template for index.html. It uses ejs and htmlWebpackPlugin to generate a different index.html for each environment. htmlWebpackPlugin will dynamically add references to the scripts and styles that it bundles to this file. The generated bundles have hash-based filenames, so it's necessary to add the references dynamically.
  For more info on ejs, see http://www.embeddedjs.com/. For examples of using it with htmlWebpackPlugin, see https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
  -->
<head>
  <!--
    The htmlWebpackPlugin will parse the logic below so that trackJS is only added to the production version of index.html (since only webpack.config.prod.js provides the trackJS token)
    This is an example of how to add features to index.html for only one environment.
    To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token in /webpack.config.prod.js on line 55.
   -->


  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8"/>
  <link rel="stylesheet" type="text/css" href="../../static/web/styles/main.css" media="screen">
  <link rel="shortcut icon" href="../../static/web/images/favicon.ico"></head>
  <script type="text/javascript" src="../../static/web/libs/jquery-1.11.2.min.js"></script>
  <script type="text/javascript" src="../../static/web/libs/owl.carousel.min.js"></script>
  <link rel="stylesheet" type="text/css" href="../../static/web/styles/owl.carousel.min.css">
  <link rel="stylesheet" type="text/css" href="../../static/web/styles/owl.theme.default.min.css">
  <link href="static/web/main.css" rel="stylesheet"></head>
  <title>Công ty TNHH DFG</title>
<body>
<div id="wrapper"></div>
<script type="text/javascript" src="static/web/main.js"></script></body>
</html>
