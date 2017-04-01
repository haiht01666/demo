<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Login page</title>
<link href="<c:url value='/static/css/bootstrap.min.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/login/login.css' />"
	rel="stylesheet"></link>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script type="text/javascript"
	src="<c:url value='/static/js/common/bootstrap.min.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/common/jquery.min.js' />"></script>
</head>

<body>
	<div class="container">
		<div id="loginbox" style="margin-top: 50px;"
			class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
			<div class="panel panel-info">
				<div class="panel-heading">
					<div class="panel-title">Sign In</div>
					<div
						style="float: right; font-size: 80%; position: relative; top: -10px">
						<a href="#">Forgot password?</a>
					</div>
				</div>

				<div style="padding-top: 30px" class="panel-body">
					<c:if test="${param.error != null}">
						<div class="alert alert-danger">
							<p>Wrong id or password.</p>
						</div>
					</c:if>

					<div style="display: none" id="login-alert"
						class="alert alert-danger col-sm-12"></div>

					<c:url var="loginUrl" value="/login" />
					<form id="loginform" class="form-horizontal" role="form"
						action="${loginUrl}" method="post">

						<div style="margin-bottom: 25px" class="input-group">
							<span class="input-group-addon"><i
								class="glyphicon glyphicon-user"></i></span> <input id="login-username"
								type="text" class="form-control" name="ssoId" value=""
								placeholder="id" required="required">
						</div>

						<div style="margin-bottom: 25px" class="input-group">
							<span class="input-group-addon"><i
								class="glyphicon glyphicon-lock"></i></span> <input id="login-password"
								type="password" class="form-control" name="password"
								placeholder="password">
						</div>
						<input type="hidden" name="${_csrf.parameterName}"
							value="${_csrf.token}" />
						<div style="margin-top: 10px" class="form-group">
							<!-- Button -->

							<div class="col-sm-12 controls">
								<input type="submit" value="Login" id="btn-login"
									class="btn btn-success">
							</div>
						</div>


						<div class="form-group">
							<div class="col-md-12 control">
								<div
									style="border-top: 1px solid #888; padding-top: 15px; font-size: 85%">
									Don't have an account! <a href="#"
										onClick="$('#loginbox').hide(); $('#signupbox').show()">
										Sign Up Here </a>
								</div>
							</div>
						</div>
					</form>



				</div>
			</div>
		</div>
		<div id="signupbox" style="display: none; margin-top: 50px"
			class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
			<div class="panel panel-info">
				<div class="panel-heading">
					<div class="panel-title">Sign Up</div>
					<div
						style="float: right; font-size: 85%; position: relative; top: -10px">
						<a id="signinlink" href="#"
							onclick="$('#signupbox').hide(); $('#loginbox').show()">Sign
							In</a>
					</div>
				</div>
				<div class="panel-body">
					<form id="signupform" class="form-horizontal" role="form">

						<div id="signupalert" style="display: none"
							class="alert alert-danger">
							<p>Error:</p>
							<span></span>
						</div>



						<div class="form-group">
							<div class="col-md-12">
								<input type="text" class="form-control" name="email"
									placeholder="id">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<input type="text" class="form-control" name="firstname"
									placeholder="Name">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<input type="email" class="form-control" name="lastname"
									placeholder="Email">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<input type="text" class="form-control" name="lastname"
									placeholder="Phone">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<input type="text" class="form-control" name="lastname"
									placeholder="Bank account number">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<input type="text" class="form-control" name="lastname"
									placeholder="Bank address">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<input type="password" class="form-control" name="passwd"
									placeholder="Password">
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<input type="password" class="form-control" name="icode"
									placeholder="Repassword">
							</div>
						</div>

						<div class="form-group">
							<!-- Button -->
							<div class="col-md-12">
								<button id="btn-signup" type="button" class="btn btn-info">
									<i class="icon-hand-right"></i> Sign Up
								</button>

							</div>
						</div>


					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>