$(document).ready(
		function() {
			$('#li-banner').addClass('active');
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
				//clearModal();
				emptyMessageError();
				$('#modal-header').text('Add new banner');
				$('#add-banner').modal('show');
			});
			
			$('#btn-add-banner').on('click',function(){
				emptyMessageError();
				$.ajax({
					type: "POST",
					url:"/manage/createBanner",
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
			
			$('#btn-delete-article').on('click',function(){
				 $.confirm({
						title: 'Confirm!',
						buttons: {
							Ok: function(){
								$.ajax({
									type: "POST",
									url:"/manage/deleteBanner",
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
				        url: "/manage/uploadBanner",
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
            url: "/manage/getAllBanner",
            type: 'GET',
            contentType: "application/json",
            dataSrc: function ( json ) {
            	$.LoadingOverlay("hide");
                return json.data;
            }       
        },
        columns: [
        	 { data: "id" },
            { data: "name" },
            { data: "cdate" }
        ]
    	
    } );
	
}

function getFormData(){
	var formData = {};
	formData.id = $('tr.selected td:nth-child(1)').text(); 
	formData.name = $('#txt-banner-title').val();
	formData.imageUrl = $('#txt-upload').val();
	return formData;
}

function emptyMessageError(){
	$('#msg-error-modal').empty();
	$('#msg-error').empty();
}

function clearModal(){
	$('#txt-article-title').val('');
}
