<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Login page</title>
<link href="<c:url value='/static/css/bootstrap.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/login.css' />" rel="stylesheet"></link>
<link href="<c:url value='/static/css/font-awesome.min.css' />" rel="stylesheet"></link>
</head>

<body>

	<div class="wrapper">
		<c:url var="loginUrl" value="/login" />
		<form class="login" action="${loginUrl}" method="post">
			<p class="title">Đăng nhập</p>
			<c:if test="${param.error != null}">
				<div class="alert alert-danger">
					<p>Sai tên đăng nhặp hoặc mật khẩu .</p>
				</div>
			</c:if>
			<input type="text" placeholder="Username" autofocus name="ssoId" /> <i
				class="fa fa-user"></i> <input type="password"
				placeholder="Password" name="password" /> <i class="fa fa-key"></i>
			<!-- <button>
				<i class="spinner"></i> <span class="state">Log in</span>
			</button> -->
			<input type="hidden" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
			<div class="form-actions">
				<input type="submit" class="btn btn-block btn-primary btn-default"
					value="Đăng nhập">
			</div>
		</form>
	</div>
</body>
</html>