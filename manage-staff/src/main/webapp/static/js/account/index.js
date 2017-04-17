$(document).ready(
		function() {
			$('#li-home').addClass('active');
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

			// select multi row
			$('#tbl-staff tbody').on('click', 'tr', function() {
				$(this).toggleClass('selected');
				// disable button edit role
				if ($('#tbody-staff tr.selected').length === 0){
					$('#edit-data').attr('disabled',true);
					$('#reset-password').attr('disabled',true);
				}else{
					$('#edit-data').attr('disabled',false);
					$('#reset-password').attr('disabled',false);
				}
				
			});
			// edit row
			$('#edit-data').on('click', function() {
				$('#edit-role').modal('show');
			});

			$('#btn-edit-role').on('click', function() {
				if ($('#tbody-staff tr.selected').length > 0){
					$('#msg-error').empty();
					var role =  $('form input[type=radio]:checked').val() === '0' ? 'ADMIN' : 'STAFF';
					var formData = {};
					var lstId = [];
					formData.role = role;
					// push user id
					$('#tbody-staff tr.selected').each(function(){
						lstId.push($(this).data('id'));
					});
					formData.lstUserId = lstId;
					$.ajax({
						type: "POST",
						url:"/manage/editRole",
						data: JSON.stringify(formData),
						contentType: "application/json; charset=utf-8",
						beforeSend: function(){
							$.LoadingOverlay("show");
		                   },
						success:function(response){
							if(response.result){
								$('tr.selected td:nth-child(5)').html(role);
								$('#msg-error').append($('<div>',{class:'alert alert-success'}).text(response.message));
							} else {
								$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text(response.message));
							}
							$.LoadingOverlay("hide");
						},
						error:function(response){
							$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra khi thay đổi quyền!"));
							$.LoadingOverlay("hide");
						}
					});

					$('#edit-role').modal('hide');
				}
			});
			
			// add row
			$('#addRow').on('click',function() {
				$('#create-member-modal').modal('show');
			});
			$('#btn-create-member').on('click',function(){
				emptyMessageError();
				var formData = {};
				formData.parentId =  $('#txt-parent-id').val();
				formData.lever =  $('#lever-type').val();
				$.ajax({
					type: "POST",
					url:"/manage/addMember",
					data: JSON.stringify(formData),
					contentType: "application/json; charset=utf-8",
					success:function(response){
						if(response.result){
							//reload page
							 location.reload();
						} else {
							$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message));
						}
					},
					error:function(response){
						$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra!"));
					}
				});
				
			})
			
			$('#reset-password').on('click',function(){
				 $.confirm({
						title: 'Confirm!',
						buttons: {
							Ok: function(){
								emptyMessageError();
								var formData = {};
								var lstId = [];
								// push user id
								$('#tbody-staff tr.selected').each(function(){
									lstId.push($(this).data('id'));
								});
								formData.lstUserId = lstId;
								$.ajax({
									type: "POST",
									url:"/manage/resetPassword",
									data: JSON.stringify(formData),
									contentType: "application/json; charset=utf-8",
									success:function(response){
										if(response.result){
											$('#msg-error').append($('<div>',{class:'alert alert-success'}).text(response.message));
										} else {
											$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text(response.message));
										}
									},
									error:function(response){
										$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra!"));
									}
								});
							},
							Cancel : function(){
							}
						}
					});
			});
			
		});

function emptyMessageError(){
	$('#msg-error-modal').empty();
	$('#msg-error').empty();
}