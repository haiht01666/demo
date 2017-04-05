$(document).ready(
		function() {
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
			// select row
			$('#tbl-staff_wrapper tbody').on('click', 'tr', function() {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
				} else {
					table.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
				}
			});
			// edit row
			$('#edit-data').on('click', function() {
				alert($('#tbl-staff_wrapper tr.selected').data('id'));
			});
			// add row
			$('#addRow').on(
					'click',
					function() {
						$.confirm({
							title : 'Confirm!',
							buttons : {
								Ok : function() {
									$('#msg-error').empty();
									$.ajax({
										type: "GET",
										url:"manage/addMember",
										contentType: "application/json; charset=utf-8",
										success:function(response){
											if(response.result){
												table.row.add(
														[ response.resultData, '', '', '',
																'Inactive' ]).draw(false);
												$('#msg-error').append($('<div>',{class:'alert alert-success'}).text(response.message));
											} else {
												$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text(response.message));
											}
										},
										error:function(response){
											$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text("Failed to add member!"));
										}
									});
								},
								Cancel : function() {
								}
							}
						});
					});
		});