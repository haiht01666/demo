$(document).ready(function() {
	$('#li-revenue-month').addClass('active');
	// initial table
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
		// disable sort
		aoColumnDefs : [ {
			bSortable : false,
			aTargets : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]
		} ],
		dom : 'lBfrtip',
		buttons : [ {
			extend : 'excelHtml5',
			title : 'Doanh thu theo tháng (' + moment().format('YYYY') + ')'
		} ]
	});

});