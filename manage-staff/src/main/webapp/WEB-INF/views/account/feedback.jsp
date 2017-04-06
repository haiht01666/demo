<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Manage feedbacks</title>
<%@ include file="../common/library.jsp"%>

<script type="text/javascript"
	src="<c:url value='/static/js/account/feedback.js' />"></script>
</head>

<body>
	<%@ include file="../common/header.jsp"%>
	<div class="col-xs-12">
		<div class="table-responsive">


			<table id="tbl-staff"
				class="display table table-hover table-striped table-bordered"
				cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Tite</th>
						<th>Date</th>
						<th>Content</th>
						<th>Member</th>
					</tr>
				</thead>

				<tbody>
					<tr data-id=1>
						<td>feedback 1</td>
						<td>2011/04/25</td>
						<td>Content 1</td>
						<td><a href="details.html">Tiger Nixon</a></td>
					</tr>
					<tr>
						<td>feedback 2</td>
						<td>2011/04/25</td>
						<td>Content 2</td>
						<td><a href="details.html">Member 2</a></td>
					</tr>
					<tr>
						<td>feedback 3</td>
						<td>2011/04/25</td>
						<td>Content 3</td>
						<td><a href="details.html">Member 3</a></td>
					</tr>
					<tr>
						<td>feedback 4</td>
						<td>2011/04/25</td>
						<td>Content 4</td>
						<td><a href="details.html">Member 4</a></td>
					</tr>
					<tr>
						<td>feedback 5</td>
						<td>2011/04/25</td>
						<td>Content 5</td>
						<td><a href="details.html">Member 5</a></td>
					</tr>

				</tbody>
			</table>
		</div>
</body>
</html>