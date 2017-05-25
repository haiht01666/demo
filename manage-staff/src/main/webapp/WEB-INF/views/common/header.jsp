<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#myNavbar">
				<span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a href="/manage/home"><img class="navbar-brand" src="<c:url value='/static/images/logo1.png' />" alt="Logo" style="padding: 0"></img></a>
		</div>
		<div class="collapse navbar-collapse" id="myNavbar">
			<ul class="nav navbar-nav" id="nav">
				<li id="li-home"><a href="/manage/home">Trang chủ</a></li>
				<li id="li-order"><a href="/manage/orders">Đơn hàng</a></li>
				<li id="li-feedback"><a href="/manage/feedbacks">Phản hồi</a></li>
				<li class="dropdown"><a href="javascript:void(0)" class="dropbtn">Hoa hồng</a>
					<div class="dropdown-content ">
						<a href="/manage/revenuePersonal">Hoa hồng trực tiếp</a>
						<a href="/manage/revenueGroup">Hoa hồng nhóm</a>
						<a href="/manage/revenue">Hoa hồng doanh thu</a>
					</div>
				</li>

				<li id="li-revenue-month"><a href="/manage/revenueMonth">Doanh thu theo tháng</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">

				<li class="dropdown"><a href="javascript:void(0)" class="dropbtn"><span
						class="glyphicon glyphicon-user"></span> ${user.dispName }</a>

					<div class="dropdown-content">
						<a href="/admin/logout">Đăng xuất</a> 
					</div></li>
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