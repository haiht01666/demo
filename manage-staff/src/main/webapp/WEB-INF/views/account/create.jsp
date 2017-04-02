<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Sign up page</title>
<!-- css -->
<link href="<c:url value='/static/css/bootstrap.min.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/login/login.css' />"
	rel="stylesheet"></link>
<link href="<c:url value='/static/css/common/common.css' />"
	rel="stylesheet"></link>
<!-- js -->
<script type="text/javascript"
	src="<c:url value='/static/js/common/bootstrap.min.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/common/jquery.min.js' />"></script>

</head>

<body>
	<div class="container">
		<div id="signupbox"
			class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
			<div class="panel panel-info">
				<div class="panel-heading">
					<div class="panel-title">Sign Up</div>
					<div
						style="float: right; font-size: 85%; position: relative; top: -10px">
						<a id="signinlink" href="/login">SignIn</a>
					</div>
				</div>
				<div class="panel-body">
					<c:if test="${isError}">
						<div class="alert alert-danger">${message}</div>
					</c:if>
					<c:if test="${isError == false}">
						<div class="alert alert-success">${message}</div>
					</c:if>
					<form:form method="POST" modelAttribute="userForm" id="signupform"
						class="form-horizontal" role="form" accept-charset="UTF-8"
						action="/account/create">
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="id"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="id"
									placeholder="id" required="required" maxlength="6"/>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="name"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="name"
									placeholder="Name" required="required" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="email"
										class="help-inline color-red" /></label>
								<form:input type="email" class="form-control" path="email"
									placeholder="Email" required="required" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="phone"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="phone"
									placeholder="Phone" required="required" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="bankName"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="bankName"
									placeholder="Bank name" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="bankAccount"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="bankAccount"
									placeholder="Bank account number" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="bankAdd"
										class="help-inline color-red" /></label>
								<form:input type="text" class="form-control" path="bankAdd"
									placeholder="Bank address" maxlength="50"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="password"
										class="help-inline color-red" /></label>
								<form:input type="password" class="form-control" path="password"
									placeholder="Password" required="required" maxlength="50"/>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-12">
								<label><form:errors path="rePassword"
										class="help-inline color-red" /></label>
								<form:input type="password" class="form-control"
									path="rePassword" placeholder="Repassword" required="required" maxlength="50"/>
							</div>
						</div>

						<div class="form-group">
							<!-- Button -->
							<div class="col-md-12">
								<input id="btn-signup" type="submit" class="btn btn-info"
									value="Sign Up">
							</div>
						</div>
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>