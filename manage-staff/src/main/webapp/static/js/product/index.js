$(document).ready(
		function() {
			$('#li-product').addClass('active');
			initTable();
			// select multi row
			$('#tbl-staff tbody').on('click', 'tr', function() {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					// disable button
					$('#edit-data').attr('disabled',true);
					$('#btn-delete-product').attr('disabled',true);
				} else {
					$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
					// enable button
					$('#edit-data').attr('disabled',false);
					$('#btn-delete-product').attr('disabled',false);
				}
				
			});

			// add product
			$('#addRow').on('click',function() {
				clearModal();
				emptyMessageError();
				$('#modal-header').text('Add new product');
				$('#add-product').modal('show');
			});
			$('#edit-data').on( 'click', function () {
				emptyMessageError();
				clearModal();
				$('#btn-edit-product').show();
				$('#btn-add-product').hide();
				// set title modal
				$('#modal-header').text('Edit product');
				$.ajax({
					type: "POST",
					url:"/product/getProduct",
					data: JSON.stringify({'id':$('tr.selected td:nth-child(1)').text().substring(3)}),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							$('#txt-product-id').val($('tr.selected td:nth-child(1)').text().substring(3));
							$('#txt-product-name').val(response.resultData.name);
							$('#txt-product-price').val(response.resultData.price);
							CKEDITOR.instances.editor1.setData(response.resultData.characteristic);
							CKEDITOR.instances.editor2.setData(response.resultData.detail);
							$('#product-type').val(response.resultData.categoryId)
							$('#txt-upload').val(response.resultData.imageUrl);
							if(response.resultData.mainProduct){
								$('#cb-main-product').prop('checked',true);
							}
							$('#add-product').modal('show');
						} else{
							alert('Error!');
						}
						$.LoadingOverlay("hide");
					},
					error:function(response){
						$.LoadingOverlay("hide");
						alert('Error!');
					}
				});
				
				
			});
			
			// display format currency
			$('#txt-product-price').keyup(function(){
				$('#lbl-price').text(Number($('#txt-product-price').val()).toLocaleString("en"));
						
			});
			
			var file = [];
			
			$('#txt-upload-file').on('change',function(event){
				 files=event.target.files;
			});
			
			$('#btn-upload').on('click',function(){
				var formData = new FormData();
				formData.append("file", files[0]);
				 $.ajax({
				        type: "POST",
				        url: "/product/uploadImage",
				        data:formData,
				        enctype: 'multipart/form-data',
				        contentType: false,
				        processData: false,
				        success: function(data) {
				        	$('#lbl-upload').text(data.msg);
				        	$('#txt-upload').val(data.pathFile);
				        },
				        error:function(data) {
				        	$('#lbl-upload').text(data.msg);
				        }
				    });
			});
			
			$('#btn-add-product').on('click',function(){
				emptyMessageError();
				$.ajax({
					type: "POST",
					url:"/product/create",
					data: JSON.stringify(getFormData()),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							// reload page
							 location.reload();
							$('#add-product').modal('hide');
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
			
			$('#btn-edit-product').on('click',function(){
				emptyMessageError();
				$.ajax({
					type: "POST",
					url:"/product/update",
					data: JSON.stringify(getFormData()),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							// reload page
							 location.reload();
							$('#add-product').modal('hide');
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
			
			$('#btn-delete-product').on('click',function(){
				 $.confirm({
						title: 'Confirm!',
						buttons: {
							Ok: function(){
								$.ajax({
									type: "POST",
									url:"/product/delete",
									data: JSON.stringify({'id':$('tr.selected td:nth-child(1)').text().substring(3)}),
									contentType: "application/json; charset=utf-8",
									success:function(response){
										if(response.resultData != 0)
											location.reload();
										else{
											alert('Xóa thất bại!');
										}
									},
									error:function(response){
										alert('Xóa thất bại!');
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

function initTable(){
	$.LoadingOverlay("show");
	$('#tbl-staff').DataTable( {
		responsive : false,
		paging : true,
		destroy: true,
		ordering : true,
		info : false,
		searching : true,
		pagingType : "full_numbers",
		scrollX : true,
		language : {
			zeroRecords : "No records available",
			info : "Showing page _PAGE_ of _PAGES_",
			infoEmpty : "No records available",
			infoFiltered : "(filtered from _MAX_ total records)"
		},
        ajax: {
            url: "/product/getAllProduct",
            type: 'GET',
            contentType: "application/json"
        },
        columns: [
            { data: "code" },
            { data: "name" },
            { data: "cdate" },
            { data: "price" }
        ]

    } );
	$.LoadingOverlay("hide");
}

function getFormData(){
	var formData = {};
	formData.name = $('#txt-product-name').val();
	formData.id = $('#txt-product-id').val();
	formData.imageUrl = $('#txt-upload').val();
	formData.categoryId =  $('#product-type').val();
	formData.characteristic =  CKEDITOR.instances.editor1.getData();
	formData.price =  $('#txt-product-price').val();
	formData.detail =  CKEDITOR.instances.editor2.getData();
	formData.mainProduct = $('#cb-main-product').is(':checked');
	return formData;
}

function emptyMessageError(){
	$('#msg-error-modal').empty();
	$('#msg-error').empty();
}

function clearModal(){
	$('#btn-edit-product').hide();
	$('#btn-add-product').show();
	$('#lbl-price').val('');
	$('#cb-main-product').prop('checked',false);
	$('#txt-product-name').val('');
	$('#txt-upload').val('');
	$('#txt-product-price').val('');
	CKEDITOR.instances.editor1.setData('');
	CKEDITOR.instances.editor2.setData('');
}
