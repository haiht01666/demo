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

<title>Manage Product</title>
<link rel='shortcut icon' type='image/x-icon'
	href='/static/frontend/assets/images/favicon.ico' />
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/product/index.js' />"></script>
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
					<span class="glyphicon glyphicon-plus"></span> Thêm sản phẩm
				</button>

				<button type="button" class="btn btn-default btn-sm" id="edit-data"
					disabled="disabled">
					<span class="glyphicon glyphicon-edit"></span> Chỉnh sửa
				</button>
				
				<button type="button" class="btn btn-default btn-sm" id="btn-delete-product"
					disabled="disabled">
					<span class="glyphicon glyphicon-edit"></span> Xóa
				</button>

			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Mã sản phẩm</th>
						<th>Tên sản phẩm</th>
						<th>Ngày tạo</th>
						<th>Giá sản phẩm</th>
					</tr>
				</thead>

				<tbody id="tbody-staff">

				</tbody>
			</table>
		</div>
	</div>

<!-- Modal -->
	<div class="modal fade" id="add-product" role="dialog">
		<div class="modal-dialog modal-lg">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="modal-header">Add new product</h4>
				</div>
				<div class="modal-body">
					<div id="msg-error-modal"></div>
					<div class="row">
						<div class="col-xs-12">
								<div class="form-group">
									<input type="text" id="txt-product-name" class="form-control"
										placeholder="tên sản phẩm">
									<input type="hidden" id="txt-product-id">
								</div>
								
								<div class="form-group">
									<label id="lbl-upload">Upload ảnh của sản phẩm:</label></br>
									 <input type="file" accept="image/png,image/gif,image/jpeg" name="file" style="display: inline;" id="txt-upload-file"/>
									 <input type="button" value="Submit" id="btn-upload"/>
									 <input type="hidden" id="txt-upload"/>	 
									  <label id="lbl-upload">Sản phẩm chủ đạo </label> 
									 <input type="checkbox" id="cb-main-product" style="width: 20px;height:20px;vertical-align: top; "/>
								</div>
								
								<div class="form-group">
									<label id="lbl-upload">Chọn loại sản phẩm:</label></br>
									<select id="product-type" class="form-control">
											<c:forEach items="${lstCategory }" var="categpry">
												<option value="${categpry.id }">${categpry.name }</option>
											</c:forEach>
									</select>
								</div>
								
								<div class="form-group">
									<label id="lbl-price"></label> <input type="number"
										id="txt-product-price" class="form-control"
										placeholder="giá sản phẩm">
								</div>

								<div class="form-group">
									<label for="editor1">Đặc điểm nổi bật:</label>
									<textarea cols="80" id="editor1" class="editor" name="editor1" rows="10"></textarea>
								</div>
								
								<div class="form-group">
									<label for="editor1">Thông tin sản phẩm:</label>
									<textarea cols="80" id="editor2" class="editor" name="editor1" rows="10"></textarea>
								</div>
								<ckeditor:replaceAll basePath="/static/js/ckeditor/" className="editor"/>

						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="btn-add-product">Thêm mới</button>
					<button type="button" class="btn btn-default" id="btn-edit-product"
						style="display: none">Cập nhập</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				</div>
			</div>
			

</body>
</html>