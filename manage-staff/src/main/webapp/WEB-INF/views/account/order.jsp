<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
	<div id="msg-error"></div>
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Add
				</button>
				<button type="button" class="btn btn-default btn-sm" id="edit-data"
					disabled="disabled">
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
							<td><fmt:formatNumber value="${order.price }" type="number"
									maxFractionDigits="3" /></td>
							<td>${order.quantity }</td>
							<td>${order.typeValue }</td>
							<td><fmt:formatNumber value="${order.total }" type="number"
									maxFractionDigits="3" /></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
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
					<div id="msg-error-modal"></div>
					<div class="row">
						<div class="col-xs-12">
							<form>
								<div class="form-group">
									<input type="number" id="txt-member-id" class="form-control"
										placeholder="nhập mã thành viên" maxlength="6" min="100000" max="999999">
										<input type="hidden" id="txt-parent-id" value=""/>
								</div>

								<div class="form-group">
									<input type="text" id="txt-member-name" class="form-control"
										placeholder="tên thành viên" readonly>
								</div>

								<div class="form-group">
									<input type="text" id="txt-order-name" class="form-control"
										placeholder="nhập tên sản phẩm">
								</div>

								<div class="form-group">
									<label id="lbl-price"></label>
									<input type="text" id="txt-order-price" class="form-control"
										placeholder="nhập giá sản phẩm">
								</div>
								<div class="form-group">
									<input type="number" id="txt-order-quantity"
										class="form-control" placeholder="nhập số lượng" min="1">
								</div>
								<div class="form-group">
									<select id="order-type" class="form-control">
										<option value="0" disabled selected="selected">Chọn loại order</option>
										<option value="1">Mua sản phẩm</option>
										<option value="2">Mua năng động</option>
										<option value="3">Đăng ký gói</option>
									</select>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="btn-add-order"
						disabled="disabled">Add</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>
</body>
</html>