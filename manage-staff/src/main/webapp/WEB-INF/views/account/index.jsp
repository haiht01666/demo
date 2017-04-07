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
	src="<c:url value='/static/js/account/index.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div id="msg-error"></div>
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Thêm
				</button>

				<c:if test="${role == 'SPADMIN'}">
					<button type="button" class="btn btn-default btn-sm" id="edit-data"
						disabled="disabled">
						<span class="glyphicon glyphicon-edit"></span> Chỉnh sửa
					</button>
				</c:if>
			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Id</th>
						<th>Tên</th>
						<th>Ngày kích hoạt</th>
						<th>Quyền</th>
						<th>Kích hoạt</th>
						<th>Trạng thái</th>
					</tr>
				</thead>

				<tbody id="tbody-staff">
					<c:forEach items="${lstMember }" var="member">
						<tr data-id=${member.id }>
							<td>${member.id }</td>
							<td><a href="/manage/detail?id=${member.id }">${member.dispName }</a></td>
							<td>${member.signUpDate }</td>
							<td>${member.roles[0] }</td>
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

	<!-- Modal -->
	<div class="modal fade" id="edit-role" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Thiết lập quyền cho member</h4>
				</div>
				<div class="modal-body">
					<div class="container">
						<p>Hãy chọn quyền</p>
						<form>
							<label class="radio-inline"> <input type="radio"
								name="optradio" value="0">Admin
							</label> <label class="radio-inline"> <input type="radio"
								name="optradio" value="1" checked="checked">STAFF
							</label>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="btn-edit-role">Thay
						đổi</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				</div>
			</div>

		</div>
	</div>
</body>
</html>