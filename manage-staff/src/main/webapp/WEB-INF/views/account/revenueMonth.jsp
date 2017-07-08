<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Revenue Month</title>
<link rel='shortcut icon' type='image/x-icon' href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/revenueMonth.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div class="table-responsive">
	<!-- 	Month and year: <input type="month" id="myMonth" value="1997-11"> -->
			<!-- <div class="btn-action col-xs-12">
				<div class="col-md-3 col-xs-12 row ">
					<input type="month" class="form-control" id="date-filter"  value="2014-12">
				</div>
			</div> -->

			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Mã nhân viên</th>
						<th>Tên nhân viên</th>
						<th>T1</th>
						<th>T2</th>
						<th>T3</th>
						<th>T4</th>
						<th>T5</th>
						<th>T6</th>
						<th>T7</th>
						<th>T8</th>
						<th>T9</th>
						<th>T10</th>
						<th>T11</th>
						<th>T12</th>
					</tr>
				</thead>

				<tbody>
					<c:forEach var="revenue" items="${revenues }">
						<tr>
							<td>${revenue.receiverId }</td>
							<td>${revenue.userName }</td>
							<td><fmt:formatNumber
									value="${revenue.jan }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.feb }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.mar }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.apr }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.may }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.jun }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.jul }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.aug }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.sep }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.oct }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.nov }" type="number" maxFractionDigits="3" /></td>
							<td><fmt:formatNumber
									value="${revenue.dec }" type="number" maxFractionDigits="3" /></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>

</body>
</html>