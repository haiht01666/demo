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
			// disable button
			$('#edit-data').attr('disabled',true);
		} else {
			table.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
			// enable button
			$('#edit-data').attr('disabled',false);
		}
	});
	
	// edit row
	$('#edit-data').on( 'click', function () {
		// set title modal
		$('#modal-header').text('Edit order');
		$('#btn-add-order').text('Edit');
		$('#txt-member-id').val($('tr.selected td:nth-child(1)').text());
		$('#txt-member-name').val($('tr.selected td:nth-child(2)').text());
		$('#txt-order-name').val($('tr.selected td:nth-child(3)').text());
		$('#txt-order-price').val($('tr.selected td:nth-child(5)').text());
		$('#txt-order-quantity').val($('tr.selected td:nth-child(6)').text());
		$('#order-type').val($('tr.selected td:nth-child(7)').data('id'));
		$('#add-order').modal('show');
		$('#btn-add-order').on('click',function(){
			emptyMessageError();
			$.ajax({
				type: "POST",
				url:"/manage/updateOrder",
				data: JSON.stringify(getFormData()),
				contentType: "application/json; charset=utf-8",
				beforeSend: function(){
					$.LoadingOverlay("show");
	               },
	            afterSend: function(){
	            	   $('#add-order').modal('hide');
		        },
				success:function(response){
					if(response.result){
						$('#msg-error').append($('<div>',{class:'alert alert-success'}).text(response.message));
					} else {
						$('#msg-error').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Xin hãy nhập đúng định dạng giá tiền!'));
					}
					$.LoadingOverlay("hide");
				}
			});
			// edit value
			$('tr.selected td:nth-child(1)').text($('#txt-member-id').val());
			$('tr.selected td:nth-child(2)').text($('#txt-member-name').val());
			$('tr.selected td:nth-child(3)').text($('#txt-order-name').val());
			$('tr.selected td:nth-child(5)').text($('#txt-order-price').val());

		});
	});
	// add row
	 $('#addRow').on( 'click', function () {
		 innitModal();
	 // set title modal
		$('#modal-header').text('Thêm mới order');
		$('#add-order').modal('show');
    } );
	$('#txt-member-id').on('change',function(){
		emptyMessageError();
		$.ajax({
			type: "GET",
			url:"/manage/checkUser",
			data: "id="+$('#txt-member-id').val(),
			beforeSend: function(){
				$.LoadingOverlay("show");
               },
			success:function(response){
				if(response.result){
					// enable button add
					$('#btn-add-order').attr('disabled',false);
					$('#txt-member-name').val(response.resultData.dispName);
					$('#txt-parent-id').val(response.resultData.parentId);
				} else {
					$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Mã id không tồn tại hoặc đã được đăng ký!'));
				}
				$.LoadingOverlay("hide");
			},
			error:function(response){
				$.LoadingOverlay("hide");
				$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra!"));
			}
		});
	}) ;
	$('#btn-add-order').on('click',function(){
		emptyMessageError();
		$.ajax({
			type: "POST",
			url:"/manage/createOrder",
			data: JSON.stringify(getFormData()),
			contentType: "application/json; charset=utf-8",
			beforeSend: function(){
				$.LoadingOverlay("show");
               },
			success:function(response){
				if(response.result){
					// reload page
					 location.reload();
					$('#add-order').modal('hide');
				} else {
					$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Xin hãy nhập đúng định dạng giá tiền!'));
				}
				$.LoadingOverlay("hide");
			},
			error:function(response){
				$.LoadingOverlay("hide");
				$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra!"));
			}
		});
	
	});
	// remove row
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
	// display format currency
	$('#txt-order-price').keyup(function(){
		$('#lbl-price').text(Number($('#txt-order-price').val()).toLocaleString("en"));
				
	});
});



function innitModal(){
	 $('#msg-error-modal').empty();
	 $('#btn-add-order').attr('disabled',true);
	 $('#txt-member-id').val('')
	 $('#txt-member-name').val('')
	 $('#txt-order-name').val('')
	 $('#txt-order-price').val('')
	 $('#txt-order-quantity').val('')
	 $('#lbl-price').text('');
}

function getFormData(){
	var formData = {};
	formData.id = $('tr.selected').data('id');
	formData.userId =  $('#txt-member-id').val();
	formData.userName =  $('#txt-member-name').val();
	formData.orderName =  $('#txt-order-name').val();
	formData.price =  $('#txt-order-price').val();
	formData.quantity =  $('#txt-order-quantity').val();
	formData.type =  $('#txt-order-quantity').val();
	formData.parentId = $('#txt-parent-id').val();
	return formData;
}