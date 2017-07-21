<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage staff</title>
<link rel='shortcut icon' type='image/x-icon' href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/userInfo.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div id="msg-error"></div>
		<div class="table-responsive">

			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Mã Id</th>
						<th>Tên Thành Viên</th>
						<th>Số ĐT</th>
						<th>Địa Chỉ Email</th>
						<th>Số Tài Khoản NH</th>
						<th>Chi Nhánh NH</th>
						<th>Tên Ngân Hàng</th>
					</tr>
				</thead>

				<tbody id="tbody-staff">
					<c:forEach items="${lstMember }" var="member">
						<tr data-id=${member.id }>
							<td><a href="/manage/detail?id=${member.id }">${member.id }</a></td>
							<td><a href="/manage/detail?id=${member.id }">${member.dispName }</a></td>
							<td>${member.phone }</td>
							<td>${member.email }</td>
							<td>${member.bankAccount }</td>
							<td>${member.bankBranch }</td>
							<td>${member.bankName}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>

</body>
</html>