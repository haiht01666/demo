<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Revenues</title>
<link rel='shortcut icon' type='image/x-icon' href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/revenue.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div class="table-responsive">
				<label class="radio-inline"> <input type="radio"
					name="optradio" value="0" checked="checked" id="radio-week">Theo tuần</label>
				<label class="radio-inline"> <input type="radio"
					name="optradio" value="1" id="radio-month">Theo tháng
				</label> <label class="radio-inline"> <input type="radio"
					name="optradio" value="2" id="radio-quarter">Theo quý
				</label> <!-- <label class="radio-inline" > <input type="radio"
					name="optradio" value="3" id="radio-year">Theo năm
				</label> -->

			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered tbl-revenue-week"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Mã id</th>
						<th>Tên thành viên</th>
						<th id="th-lever">Cấp bậc</th>
						<th>Hoa hồng trực tiếp(BV)</th>
						<th id="th-total">Tổng BV</th>
						<th id="th-percen">Tỉ lệ hoa hồng</th>
						<th id="th-value">Hoa hồng nhóm(BV)</th>
					</tr>
				</thead>

				<tbody>
					
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>