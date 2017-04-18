<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Detail member</title>
<%@ include file="../common/library.jsp"%>


</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">

		<div class="col-md-6 col-xs-12 lo-detail">
			<section class="col-xs-12">
				<fieldset>
					<legend>Personal information</legend>
					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Tên</label>
						<div class="col-md-9 col-xs-8">
							<span>${userDetail.dispName }</span>
						</div>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Ngày sinh</label> <span
							class="col-md-9 col-xs-8"><fmt:formatDate
								pattern="dd/MM/yyyy" value="${userDetail.birthday }" /></span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Địa chỉ</label> <span
							class="col-md-9 col-xs-8">${userDetail.address }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Email</label>
						<div class="col-md-9 col-xs-8">
							<span>${userDetail.email }</span>
						</div>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Ngày tạo</label> <span
							class="col-md-9 col-xs-8">${userDetail.cdate }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Số ĐT</label> <span
							class="col-md-9 col-xs-8">${userDetail.phone }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Số CMND</label> <span
							class="col-md-9 col-xs-8">${userDetail.identifier }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Cấp bậc</label> <span
							class="col-md-9 col-xs-8">${userDetail.leverValue }</span>
					</div>
					
					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Trạng thái</label> <span
							class="col-md-9 col-xs-8">${userDetail.status }</span>
					</div>

				</fieldset>
			</section>
		</div>


		<div class="col-md-6 col-xs-12 lo-detail">
			<section class="col-xs-12">
				<fieldset>
					<legend>Bank information</legend>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Ngân hàng</label> <span
							class="col-md-9 col-xs-8">${userDetail.bankName }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Số tk</label> <span
							class="col-md-9 col-xs-8">${userDetail.bankAccount }</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Chi nhánh</label> <span
							class="col-md-9 col-xs-8">${userDetail.bankBranch }</span>
					</div>

				</fieldset>
			</section>
		</div>

	</div>
</body>
</html>