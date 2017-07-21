$(document).ready(
		function() {
			$('#li-home').addClass('active');
			initTable();
			// select multi row
			$('#tbl-staff tbody').on('click', 'tr', function() {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					// disable button
					$('#edit-data').attr('disabled',true);
					$('#btn-delete-article').attr('disabled',true);
				} else {
					$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
					// enable button
					$('#edit-data').attr('disabled',false);
					$('#btn-delete-article').attr('disabled',false);
				}
				
			});

			// add article
			$('#addRow').on('click',function() {
				clearModal();
				emptyMessageError();
				$('#modal-header').text('Add new article');
				$('#add-article').modal('show');
			});
			$('#edit-data').on( 'click', function () {
				emptyMessageError();
				clearModal();
				// set title modal
				$('#modal-header').text('Chỉnh sửa');
				$.ajax({
					type: "POST",
					url:"/article/getHome",
					data: JSON.stringify({'id':$('tr.selected td:nth-child(1)').text()}),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							$('#txt-article-id').val($('tr.selected td:nth-child(1)').text());
							$('#txt-article-title').val(response.resultData.title);
							CKEDITOR.instances.editor1.setData(response.resultData.content);
							$('#add-article').modal('show');
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
			
			$('#btn-add-article').on('click',function(){
				emptyMessageError();
				$.ajax({
					type: "POST",
					url:"/article/create",
					data: JSON.stringify(getFormData()),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							// reload page
							 location.reload();
							$('#add-').modal('hide');
						} else {
							$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text(response.message?response.message:'Có lỗi xẩy ra!'));
						}
						$.LoadingOverlay("hide");
					},
					error:function(response){
						$.LoadingOverlay("hide");
						$('#msg-error-modal').append($('<div>',{class:'alert alert-danger'}).text("Có lỗi xẩy ra!"));
					}
				});
			
			});
			
			$('#btn-edit-article').on('click',function(){
				emptyMessageError();
				$.ajax({
					type: "POST",
					url:"/article/updateHome",
					data: JSON.stringify(getFormData()),
					contentType: "application/json; charset=utf-8",
					beforeSend: function(){
						$.LoadingOverlay("show");
		               },
					success:function(response){
						if(response.result){
							// reload page
							 location.reload();
							$('#add-article').modal('hide');
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
			
			$('#btn-delete-article').on('click',function(){
				 $.confirm({
						title: 'Confirm!',
						buttons: {
							Ok: function(){
								$.ajax({
									type: "POST",
									url:"/article/deleteHome",
									data: JSON.stringify({'id':$('tr.selected td:nth-child(1)').text()}),
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
			
			var file = [];
			
			$('#txt-upload-file').on('change',function(event){
				 files=event.target.files;
			});
			
			$('#btn-upload').on('click',function(){
				var formData = new FormData();
				formData.append("file", files[0]);
				 $.ajax({
				        type: "POST",
				        url: "/article/uploadHomeImage",
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
            url: "/article/getHomeArticle",
            type: 'GET',
            contentType: "application/json",
            dataSrc: function ( json ) {
            	$.LoadingOverlay("hide");
                return json.data;
            }       
        },
        columns: [
            { data: "id" },
            { data: "title" },
            { data: "cdate" }
        ]
    	
    } );
	
}

function getFormData(){
	var formData = {};
	formData.id = $('tr.selected td:nth-child(1)').text(); 
	formData.title = $('#txt-article-title').val();
	formData.imageUrl = $('#txt-upload').val();
	formData.content =  CKEDITOR.instances.editor1.getData();
	return formData;
}

function emptyMessageError(){
	$('#msg-error-modal').empty();
	$('#msg-error').empty();
}

function clearModal(){
	$('#txt-article-title').val('');
	CKEDITOR.instances.editor1.setData('');
}
