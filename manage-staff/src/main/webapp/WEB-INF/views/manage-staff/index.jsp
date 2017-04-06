<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage staff</title>
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/manage-staff/manage-staff.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div id="msg-error">
			
		</div>
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Add
				</button>
			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Sign up date</th>
						<th>Enable</th>
						<th>Status</th>
					</tr>
				</thead>

				<tbody>
					<c:forEach items="${lstMember }" var="member">
						<tr data-id=${member.id }>
							<td>${member.id }</td>
							<td><a href="/manage/detail?id=${member.id }">${member.dispName }</a></td>
							<td>${member.signUpDate }</td>
							<td><c:if test="${member.enable }">
									<span class="glyphicon glyphicon-ok" style="color: #41be47"></span>
								</c:if></td>
							<td>${member.active }</td>

						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>

	<script type="text/javascript">
		
	</script>
</body>
</html>