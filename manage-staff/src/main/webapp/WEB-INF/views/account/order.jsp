<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage orders</title>
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/order.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Add
				</button>
				<button type="button" class="btn btn-default btn-sm" id="edit-data" disabled="disabled">
					<span class="glyphicon glyphicon-edit"></span> Edit
				</button>
				<button type="button" class="btn btn-default btn-sm"
					id="remove-data" disabled="disabled">
					<span class="glyphicon glyphicon-remove"></span> Remove
				</button>
			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Id thành viên</th>
						<th>Tên Thành viên</th>
						<th>Tên sản phẩm</th>
						<th>Ngày mua</th>
						<th>Giá</th>
						<th>Số lương</th>
						<th>Loại</th>
						<th>Tổng giá</th>
					</tr>
				</thead>
				<tbody class="tbody-staff">
				<c:forEach items="${orders }" var="order">
					<tr data-id=1>
						<td>${order.userId }</td>
						<td><a href="/manage/detail?id=${order.userId }">${order.userName }</a></td>
						<td>${order.orderName }</td>
						<td>${order.orderDate }</td>
						<td><fmt:formatNumber value="${order.price }" type="number" maxFractionDigits="3"/></td>
						<td>${order.quantity }</td>
						<td>${order.type }</td>
						<td><fmt:formatNumber value="${order.price }" type="number" maxFractionDigits="3"/></td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="add-order" role="dialog">
			<div class="modal-dialog">

				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" id="modal-header">Add new order</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12">
								<form>
									<div class="form-group">
										<input type="text" id="txt-member-id" class="form-control"
											placeholder="Enter member id">
									</div>

									<div class="form-group">
										<input type="text" id="txt-member-name" class="form-control"
											placeholder="member name" readonly>
									</div>

									<div class="form-group">
										<input type="text" id="txt-order-name" class="form-control"
											placeholder="Enter order name">
									</div>

									<div class="form-group">
										<input type="text" id="txt-order-amount" class="form-control"
											placeholder="Enter order amount">
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" id="btn-add-order">Add</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>
</body>
</html>