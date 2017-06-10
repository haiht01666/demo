<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
   <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/manage/home"><img class="navbar-brand" src="<c:url value='/static/images/logo1.png' />" alt="Logo" style="padding: 0"></img></a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
    	<li id="li-home"><a href="/manage/home">Trang chủ</a></li>
    	<li id="li-order"><a href="/manage/orders">Đơn hàng</a></li>
		<li id="li-feedback"><a href="/manage/feedbacks">Phản hồi</a></li>
      <li class="dropdown">
    	<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hoa hồng <span class="caret"></span></a>
        <ul class="dropdown-menu">			
          <li> <a href="/manage/revenuePersonal">Hoa hồng trực tiếp</a></li>
          <li><a href="/manage/revenueGroup">Hoa hồng nhóm</a></li>
          <li><a href="/manage/revenue">Hoa hồng doanh thu</a></li>
        </ul>
      </li>
      <li id="li-revenue-month"><a href="/manage/revenueMonth">Doanh thu theo tháng</a></li>
      <li id="li-product"><a href="/product">Sản phẩm</a></li>
      <li id="li-article"><a href="/article">Tin tức</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="javascript:void(0)"><span class="glyphicon glyphicon-user"></span> ${user.dispName }</a></li>
						
      <li><a href="/admin/logout"><span class="glyphicon glyphicon-log-in"></span> Đăng xuất</a></li>
    </ul>
  </div>
  </div>
</nav>

<!-- <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">Logo</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav> -->