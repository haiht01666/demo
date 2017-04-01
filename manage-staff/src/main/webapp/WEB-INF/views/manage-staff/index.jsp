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
	src="<c:url value='/static/js/manage-staff/manage-staff.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div id="msg-error">
			<div class="alert alert-danger">abc</div>
		</div>
		<div class="table-responsive">

			<div class="btn-action">
				<button type="button" class="btn btn-default btn-sm" id="addRow">
					<span class="glyphicon glyphicon-plus"></span> Add
				</button>
			</div>
			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Sign up date</th>
						<th>Enable</th>
						<th>Status</th>
					</tr>
				</thead>

				<tbody>
					<tr data-id=1>
						<td>000001</td>
						<td><a href="details.html">Tiger Nixon</a></td>
						<td>2011/04/25</td>
						<td><span class="glyphicon glyphicon-ok"
							style="color: #41be47"></span></td>
						<td>Active</td>

					</tr>
					<tr>
						<td>000002</td>
						<td><a href="details.html">Garrett Winters</a></td>
						<td>2011/07/25</td>
						<td><span class="glyphicon glyphicon-ok"
							style="color: #41be47"></span></td>
						<td>Inactive</td>
					</tr>
					<tr>
						<td>000003</td>
						<td><a href="details.html">Ashton Cox</a></td>
						<td>2009/01/12</td>
						<td></td>
						<td>Active</td>
					</tr>
					<tr>
						<td>000004</td>
						<td><a href="details.html">Cedric Kelly</a></td>
						<td>2012/03/29</td>
						<td></td>
						<td>Active</td>
					</tr>
					<tr>
						<td>000005</td>
						<td><a href="details.html">Airi Satou</a></td>
						<td>2008/11/28</td>
						<td><span class="glyphicon glyphicon-ok"
							style="color: #41be47"></span></td>
						<td>Active</td>
					</tr>

				</tbody>
			</table>
		</div>
	</div>
	
	<script type="text/javascript">
	</script>
</body>
</html>