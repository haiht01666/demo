<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage Banner</title>
<link rel='shortcut icon' type='image/x-icon'
	href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/banner.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/checkeditor/ckeditor.js' />"></script>
<script type="text/javascript"
	src="<c:url value='/static/js/checkeditor/sample.js' />"></script>

</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div id="msg-error"></div>
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Thêm mới
				</button>
				
				<button type="button" class="btn btn-default btn-sm" id="btn-delete-article"
					disabled="disabled">
					<span class="glyphicon glyphicon-edit"></span> Xóa
				</button>

			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Mã banner</th>
						<th>Tên banner</th>
						<th>Ngày tạo</th>
					</tr>
				</thead>

				<tbody id="tbody-staff">

				</tbody>
			</table>
		</div>
	</div>

<!-- Modal -->
	<div class="modal fade" id="add-banner" role="dialog">
		<div class="modal-dialog modal-lg">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="modal-header">Add new banner</h4>
				</div>
				<div class="modal-body">
					<div id="msg-error-modal"></div>
					<div class="row">
						<div class="col-xs-12">
								<div class="form-group">
									<label>Tên banner</label>
									<input type="text" id="txt-banner-title" class="form-control">
									<input type="hidden" id="txt-banner-id">
								</div>
								
								<div class="form-group">
									<label id="lbl-upload">Upload ảnh banner :</label></br>
									 <input type="file" accept="image/png,image/gif,image/jpeg" name="file" style="display: inline;" id="txt-upload-file"/>
									 <input type="button" value="Submit" id="btn-upload"/>
									 <input type="hidden" id="txt-upload"/>	 
								</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="btn-add-banner">Thêm mới</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				</div>
			</div>
			

</body>
</html>