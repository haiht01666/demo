$(document).ready(function() {
	$('#li-account').addClass('active');
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
	// aoColumnDefs: [
	// {
	// bSortable: false,
	// aTargets: [ 1 ]
	// }
	// ]
	});
	// remove row
	$('#remove-data').on('click', function() {
		table.row('.selected').remove().draw(false);
	});
	// select multi row
	$('#tbl-staff tbody').on('click', 'tr', function() {
		$(this).toggleClass('selected');
	});
	// edit row
	$('#edit-data').on('click', function() {
		$('#edit-role').modal('show');
		$('#btn-edit-role').on('click', function() {
			if ($('form input[type=radio]:checked').val() === '0') {
				$('tr.selected td:nth-child(4)').html("Admin");
			} else {
				$('tr.selected td:nth-child(4)').html("Member");
			}
			$('#edit-role').modal('hide');
		})
	});

});