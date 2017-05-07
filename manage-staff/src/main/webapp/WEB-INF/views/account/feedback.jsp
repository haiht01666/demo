<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage feedbacks</title>
<link rel='shortcut icon' type='image/x-icon' href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/feedback.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div class="table-responsive">


			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Tiêu đề</th>
						<th>Ngày gửi</th>
						<th>Nội dung</th>
						<th>mã id người gửi</th>
					</tr>
				</thead>

				<tbody>
					<c:forEach var="feedback" items="${feedbacks }">
						<tr data-id=1>
							<td>${feedback.title }</td>
							<td><fmt:formatDate pattern="dd/MM/yyyy"
									value="${feedback.cdate }" /></td>
							<td>${feedback.content }</td>
							<td><a href="/manage/detail?id=${feedback.userId }">${feedback.userId }</a></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>

</body>
</html>