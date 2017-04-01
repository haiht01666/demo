
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>System Busy</title>
<%@ include file="../common/library.jsp"%>
</head>
<body>
	<%@ include file="../common/header.jsp"%>
	<div class="container">
		<h3 style="color: red;">System Busy</h3>
		<br>
		<p>The system is busy please try again later!</p>
		<br> <a href="<c:url value="/home"/>">Back to home page</a>
	</div>
</body>
</html>