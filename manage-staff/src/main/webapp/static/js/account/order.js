$(document).ready(function() {
	$('#li-order').addClass('active');
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

	// select row
	$('#tbl-staff tbody').on('click', 'tr', function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		} else {
			table.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
		}
		//disable button 
		if ($('#tbody-staff tr.selected').length === 0){
			$('#edit-data').attr('disabled',true);
			$('#remove-data').attr('disabled',true);
		}else{
			$('#edit-data').attr('disabled',false);
			$('#remove-data').attr('disabled',false);
		}
	});
	
	//edit row
	$('#edit-data').on( 'click', function () {
		//set title modal
		$('#modal-header').text('Edit order');
		$('#btn-add-order').text('Edit');
		$('#txt-member-id').val($('tr.selected td:nth-child(1)').text());
		$('#txt-member-name').val($('tr.selected td:nth-child(2)').text());
		$('#txt-order-name').val($('tr.selected td:nth-child(3)').text());
		$('#txt-order-amount').val($('tr.selected td:nth-child(5)').text());
		$('#add-order').modal('show');
		$('#btn-add-order').on('click',function(){
			//edit value
			$('tr.selected td:nth-child(1)').text($('#txt-member-id').val());
			$('tr.selected td:nth-child(2)').text($('#txt-member-name').val());
			$('tr.selected td:nth-child(3)').text($('#txt-order-name').val());
			$('tr.selected td:nth-child(5)').text($('#txt-order-amount').val());
			//close modal
			$('#add-order').modal('hide');
		});
	});
	//add row 
	 $('#addRow').on( 'click', function () {
	 //set title modal
		$('#modal-header').text('Add new order');
		$('#add-order').modal('show');
		$('#btn-add-order').on('click',function(){
			table.row.add( [
            $('#txt-member-id').val(),
            $('#txt-member-name').val(),
			$('#txt-order-name').val(),
			new Date(),
            $('#txt-order-amount').val()
        ] ).draw( false );
		$('#add-order').modal('hide');
		});
       
    } );
	//remove row
	$('#remove-data').on('click',function(){
		 $.confirm({
			title: 'Confirm!',
			buttons: {
				Ok: function(){
					table.row('.selected').remove().draw( false );
				},
				Cancel : function(){
				}
			}
		});
		 
	});

});