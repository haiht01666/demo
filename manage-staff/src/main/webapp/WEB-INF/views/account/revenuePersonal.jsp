<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Revenue Personal</title>
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/revenuePersonal.js' />"></script>
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
						<th>Mã người hưởng</th>
						<th>Tên sản phẩm</th>
						<th>Ngày mua</th>
						<th>Giá trị đơn hàng</th>
						<th>Tỷ lệ chiết khấu</th>
						<th>Giá trị chiết khấu</th>
					</tr>
				</thead>

				<tbody>
					
				</tbody>
			</table>
		</div>
	</div>

</body>
</html>