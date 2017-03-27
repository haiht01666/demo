<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Login page</title>
<link href="<c:url value='/static/css/common/bootstrap.min.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/login/login.css' />"
	rel="stylesheet"></link>
<script type="text/javascript"
	src="<c:url value='/static/js/common/bootstrap.min.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/common/jquery.min.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/login/login.js' />"></script>
</head>

<body>
	<div class="col-xs-12 col-md-6 col-md-offset-3">
		<div class="panel panel-login">
			<div class="panel-heading">
				<div class="row">
					<div class="col-xs-6">
						<a href="#" class="active" id="login-form-link">Login</a>
					</div>
					<div class="col-xs-6">
						<a href="#" id="register-form-link">Register</a>
					</div>
				</div>
				<hr>
				<c:if test="${param.error != null}">
					<div id="msg-error" style="margin-top: 10px;">
						<div class="alert alert-danger">
							<p>Sai tên đăng nhặp hoặc mật khẩu .</p>
						</div>
					</div>
				</c:if>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-lg-12">
						<c:url var="loginUrl" value="/login" />
						<form id="login-form" action="${loginUrl}" method="post"
							role="form" style="display: block;">
							<div class="form-group">
								<input type="text" name="ssoId" id="username" tabindex="1"
									class="form-control" placeholder="Username" value="">
							</div>
							<div class="form-group">
								<input type="password" name="password" id="password"
									tabindex="2" class="form-control" placeholder="Password">
							</div>
							<input type="hidden" name="${_csrf.parameterName}"
								value="${_csrf.token}" />
							<div class="form-group">
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<input type="submit" name="login-submit" id="login-submit"
											tabindex="4" class="form-control btn btn-login"
											value="Log In">
									</div>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-lg-12">
										<div class="text-center">
											<a href="" tabindex="5"
												class="forgot-password">Forgot Password?</a>
										</div>
									</div>
								</div>
							</div>
						</form>
						<form id="register-form"
							action="http://phpoll.com/register/process" method="post"
							role="form" style="display: none;">
							<div class="form-group">
								<input type="text" name="username" id="username" tabindex="1"
									class="form-control" placeholder="Username" value="">
							</div>
							<div class="form-group">
								<input type="email" name="email" id="email" tabindex="1"
									class="form-control" placeholder="Email Address" value="">
							</div>
							<div class="form-group">
								<input type="password" name="password" id="password"
									tabindex="2" class="form-control" placeholder="Password">
							</div>
							<div class="form-group">
								<input type="password" name="confirm-password"
									id="confirm-password" tabindex="2" class="form-control"
									placeholder="Confirm Password">
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<input type="submit" name="register-submit"
											id="register-submit" tabindex="4"
											class="form-control btn btn-register" value="Register Now">
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


</body>
</html>