$(document).ready(function() {
	$('#li-home').addClass('active');
	// initial table
	$.LoadingOverlay("show");
	var table = $('#tbl-staff').DataTable({
		responsive : false,
		"paging" : true,
		"ordering" : true,
		"info" : false,
		"searching" : true,
		"pagingType" : "full_numbers",
		"scrollX" : true,
		"language" : {
			// "lengthMenu": "Display _MENU_ records per page",
			"zeroRecords" : "No records available",
			"info" : "Showing page _PAGE_ of _PAGES_",
			"infoEmpty" : "No records available",
			"infoFiltered" : "(filtered from _MAX_ total records)"
		},
		ajax : {
			url : "/manage/getAllUser",
			type : 'GET',
			contentType : "application/json",
			dataSrc: function ( json ) {
            	$.LoadingOverlay("hide");
                return json.data;
            }    
		},
		columns : [ {
			data : "id"
		}, {
			data : "dispName"
		}, {
			data : "leverValue"
		}, {
			data : "phone"
		}, {
			data : "email"
		}, {
			data : "bankAccount"
		}, {
			data : "bankBranch"
		}, {
			data : "bankName"
		} ],
		dom : 'lBfrtip',
		buttons : [ {
			extend : 'excelHtml5',
			title : 'Thông tin người dùng'
		} ]
	});

});