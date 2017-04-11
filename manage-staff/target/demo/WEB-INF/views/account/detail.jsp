<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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

		<div class="col-md-5 col-xs-12 lo-detail">
			<section class="col-xs-12">
				<fieldset>
					<legend>Personal details</legend>
					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Tên</label>
						<div class="col-md-9 col-xs-8">
							<span>${userDetail.dispName }</span>
						</div>
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
						<span class="col-xs-offset-3 col-xs-9"><hr></span>
					</div>

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


		<div class="col-md-4 col-xs-12 lo-detail">
			<section class="col-xs-12">
				<fieldset>
					<legend>Order details</legend>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Quarter1</label>
						<div class="col-md-9 col-xs-8">
							<span>1.000.000</span>
						</div>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Quarter2</label>
						<div class="col-md-9 col-xs-8">
							<span>2.000.000</span>
						</div>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Quarter3</label>
						<div class="col-md-9 col-xs-8">
							<span>3.000.000</span>
						</div>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Quarter4</label>
						<div class="col-md-9 col-xs-8">
							<span>4.000.000</span>
						</div>
					</div>

					<div class="col-xs-12">
						<span class="col-xs-offset-3 col-xs-9"><hr></span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-3 col-xs-4">Total</label>
						<div class="col-md-9 col-xs-8">
							<span>10.000.000</span>
						</div>
					</div>

				</fieldset>
			</section>
		</div>

		<div class="col-md-3 col-xs-12 lo-detail">
			<section class="col-xs-12">
				<fieldset>
					<legend>Revenue details</legend>
					<div class="col-xs-12">
						<label class="col-md-4 col-xs-4">Personal</label> <span
							class="col-md-8 col-xs-8">10.000.000</span>
					</div>

					<div class="col-xs-12">
						<label class="col-md-4 col-xs-4">Group</label> <span
							class="col-md-8 col-xs-8">5.000.000</span>
					</div>

					<div class="col-xs-12">
						<span class="col-xs-offset-3 col-xs-9"><hr></span>
					</div>
					<div class="col-xs-12">
						<label class="col-md-4 col-xs-4">Total</label> <span
							class="col-md-8 col-xs-8">15.000.000</span>
					</div>
				</fieldset>
			</section>
		</div>
	</div>
</body>
</html>