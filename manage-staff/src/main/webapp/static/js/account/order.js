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
		emptyMessageError();
		 innitModal();
		$('#lbl-price').empty();
		$('#btn-edit-order').show();
		$('#btn-add-order').hide();
		// set title modal
		$('#modal-header').text('Edit order');
		$('#btn-add-order').text('Edit');
		$('#txt-member-id').val($('tr.selected td:nth-child(1)').text());
		$('#txt-order-name').val($('tr.selected td:nth-child(2)').text());
		$('#txt-order-date').val($('tr.selected td:nth-child(3)').text());
		$('#txt-order-price').val(parseFloat($('tr.selected td:nth-child(4)').data('price')));
		$('#txt-order-quantity').val($('tr.selected td:nth-child(5)').text());
		$('#order-type').val($('tr.selected td:nth-child(6)').data('id'));
		$('#add-order').modal('show');
		$('#txt-member-id').trigger('change');
		$('#btn-edit-order').on('click',function(){
			
			$.ajax({
				type: "POST",
				url:"/manage/updateOrder",
				data: JSON.stringify(getFormData()),
				contentType: "application/json; charset=utf-8",
				beforeSend: function(){
					$.LoadingOverlay("show");
	               },
				success:function(response){
					if(response.result){
					 $('#add-order').modal('hide');
					 location.reload();
					}else{
						$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Hãy nhập đúng định dạng ngày order hoặc giá tiền!'));
					}
					$.LoadingOverlay("hide");
				}
			});

		});
	});
	// add row
	 $('#addRow').on( 'click', function () {
		 innitModal();
	 // set title modal
		$('#modal-header').text('Thêm mới order');
		$('#add-order').modal('show');
		$('#btn-add-order').show();
		$('#btn-edit-order').hide();
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
					$('#txt-curent-lever').val(response.resultData.leverValue);
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
					$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Xin hãy nhập đúng định dạng ngày order hoặc giá tiền!'));
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
		$('#lbl-price').text(Number($('#txt-order-price').val()).toLocaleString("en") + ' BV');
				
	});
	
	$('#order-type').on('change',function(){
		// pro-active
		if($('#order-type').val() === '2'){
			$('#select-lever').css('display','none');
			$('#txt-order-quantity').val('1');
			$('#txt-order-quantity').attr('disabled',true);
			$('#txt-order-price').val('50');
			$('#lbl-price').text(Number($('#txt-order-price').val()).toLocaleString("en") + ' BV');
			$('#txt-order-price').attr('disabled',true);
			$('#txt-order-name').val('Đăng ký năng động');
			$('#txt-order-name').attr('disabled',true);
			$('#txt-order-date').attr('disabled',true);
		}
		else if($('#order-type').val() === '3'){
			//register lever
			$('#select-lever').css('display','');
			$('#txt-order-quantity').val('1');
			$('#txt-order-quantity').attr('disabled',true);
			$('#txt-order-price').val('217');
			$('#lbl-price').text(Number($('#txt-order-price').val()).toLocaleString("en") + ' BV');
			$('#txt-order-price').attr('disabled',true);
			$('#txt-order-name').val('Nâng cấp gói');
			$('#txt-order-name').attr('disabled',true);
			$('#txt-order-date').attr('disabled',true);
			$('#select-lever').on('change',function(){
				if($('#select-lever').val() === '1')
					$('#txt-order-price').val('217');
				if($('#select-lever').val() === '2')
					$('#txt-order-price').val('652');
				if($('#select-lever').val() === '3')
					$('#txt-order-price').val('1300');
				$('#lbl-price').text(Number($('#txt-order-price').val()).toLocaleString("en") + ' BV');
			});
		}
		else{
			$('#select-lever').css('display','none');
			$('#txt-order-quantity').attr('disabled',false);
			//$('#txt-order-price').val('');
			//$('#lbl-price').text('');
			$('#txt-order-price').attr('disabled',false);
			//$('#txt-order-name').val('');
			$('#txt-order-name').attr('disabled',false);
			$('#txt-order-date').attr('disabled',false);
		}
	});
	
	
});



function innitModal(){
	 $('#msg-error-modal').empty();
	 $('#btn-add-order').attr('disabled',true);
	 $('#txt-member-id').val('');
	 $('#txt-order-name').val('');
	 $('#txt-order-price').val('');
	 $('#txt-order-quantity').val('');
	 $('#lbl-price').text('');
	 $('#txt-order-quantity').attr('disabled',false);
	 $('#txt-order-price').val('');
	 $('#lbl-price').text('');
	 $('#txt-order-price').attr('disabled',false);
	 $('#txt-order-name').val('');
	 $('#txt-order-name').attr('disabled',false);
	 $('#txt-order-date').attr('disabled',false);	
	 $('#select-lever').css('display','none');
	 $('#order-type').prop('selectedIndex',0);
	 $('#txt-curent-lever').val('');
}

function getFormData(){
	var formData = {};
	formData.orderDate = $('#txt-order-date').val();
	formData.id = $('tr.selected').data('id');
	formData.userId =  $('#txt-member-id').val();
	formData.orderName =  $('#txt-order-name').val();
	formData.price =  $('#txt-order-price').val();
	formData.quantity =  $('#txt-order-quantity').val();
	formData.type =  $('#order-type').val();
	formData.userLever = $('#select-lever').val();
	return formData;
}

function emptyMessageError(){
	$('#msg-error-modal').empty();
	$('#msg-error').empty();
}