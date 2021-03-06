var REVENUES = [];
$(document).ready(
		function() {
			var curr = new Date; // get current date
			var first = curr.getDate() - curr.getDay() -1; // First day is the day
														// of the month - the
														// day of the week
			var last = first + 7; // last day is the first day + 6

			var firstday = new Date(curr.setDate(first));
			var lastday = new Date(curr.setDate(last));

			$('#li-revenue').addClass('active');
			// initial table
			initTable(moment().format('YYYY-MM-DD'), $('#radio-week').val(),
					'', firstday, lastday);
			$('input[type=radio][name=optradio]').change(
					function() {
						initTable(moment().format('YYYY-MM-DD'), $(this).val(),
								1, firstday, lastday);
					});

		});
/**
 * 
 * @param filterDate
 *            date to filter
 * @param type
 *            0 : month , 1: quarter : 2 : year
 * @param num :
 *            year or quarter
 * @returns
 */
function initTable(filterDate, type, num, firstday, lastday) {
	REVENUES = [];
	$.LoadingOverlay("show");
	var formData = {};
	var select;
	var dateFrom;
	var dateTo;
	var nameFile;
	if (type === $('#radio-month').val()) {
		formData.cdate = moment(filterDate).format('YYYY-MM-DD');
		nameFile = '(' +  moment(filterDate).format('MM-YYYY')+')';
		select = document.createElement("INPUT");
		select.setAttribute("type", "month");
		select.setAttribute("id", 'month-filter');
		select.setAttribute("value", moment(filterDate).format('YYYY-MM'));
		select.setAttribute("style", "margin-right:10px");
	}

	if (type === $('#radio-week').val()) {
		
		formData.dateFrom = moment(firstday).format('YYYY-MM-DD')
		formData.dateTo = moment(lastday).format('YYYY-MM-DD')
		nameFile = '('+moment(firstday).format('DD-MM-YYYY')+' đến ' + moment(lastday).format('DD-MM-YYYY') + ')';
		dateFrom = document.createElement("INPUT");
		dateFrom.setAttribute("type", "date");
		dateFrom.setAttribute("id", 'week-from');
		dateFrom.setAttribute("class", 'form-control');
		dateFrom.setAttribute("value", formData.dateFrom);
		dateFrom.setAttribute("style", "margin-right:10px");
		dateTo = document.createElement("INPUT");
		dateTo.setAttribute("type", "date");
		dateTo.setAttribute("id", 'week-to');
		dateTo.setAttribute("class", 'form-control');
		dateTo.setAttribute("value", formData.dateTo);
		dateTo.setAttribute("style", "margin-left:10px;margin-right:20px");
	}

	if (type === $('#radio-quarter').val()) {
		formData.num = num;
		nameFile = '(Quý ' + num + ')';
		var select = $('<select>', {
			id : 'quarter-filter',
			style : 'margin-right:10px;height:28px;width:200px'
		});
		addQuarter(select, num);
		$('#tbl-staff_length').prepend(select);
	}

	/*
	 * if (type === $('#radio-year').val()) { formData.num = num; var select =
	 * $('<select>', { id : 'year-filter', style :
	 * 'margin-right:10px;height:28px;width:200px' }); addYear(select, num); }
	 */

	formData.type = type;
	$('#tbl-staff').DataTable({
		responsive : false,
		paging : true,
		destroy : true,
		ordering : true,
		info : false,
		searching : true,
		pagingType : "full_numbers",
		scrollX : true,
		language : {
			// "lengthMenu": "Display _MENU_ records per page",
			zeroRecords : "No records available",
			info : "Showing page _PAGE_ of _PAGES_",
			infoEmpty : "No records available",
			infoFiltered : "(filtered from _MAX_ total records)"
		},
		ajax : {
			url : "/manage/revenueGroup",
			type : 'POST',
			contentType : "application/json",
			data : function(d) {
				return JSON.stringify(formData);
			},
			dataSrc: function ( json ) {
            	$.LoadingOverlay("hide");
            	REVENUES = json.data;
                return json.data;
            }    
		},
		columns : [ {
			data : "receiverId"
		}, {
			data : "userName"
		}, {
			data : "userLever"
		}, {
			data : "revenueDirect"
		}, {
			data : "totalOrderValue"
		}, {
			data : "revenuePecent"
		}, {
			data : "revenueValue"
		} ],
		dom : 'lBfrtip',
		buttons : [{
			extend : 'excelHtml5',
			title : 'Hoa hồng doanh thu ' + nameFile
		},
		{
            text: 'Trả hoa hồng',
            action: function ( e, dt, node, config ) {
            	if(REVENUES.length == 0){
            		alert('Không có thông tin hoa hồng!');
            	}else{
	            	 $.confirm({
	         			title: 'Bạn chắc chắn muốn thanh toán hoa hồng?',
	         			buttons: {
	         				Ok: function(){
	         					$.ajax({
	         						type: "POST",
	         						url:"/manage/saveRevenues",
	         						data: JSON.stringify({lstRevenue:REVENUES}),
	         						contentType: "application/json; charset=utf-8",
	         						beforeSend: function(){
	         							$.LoadingOverlay("show");
	         			               },
	         						success:function(response){
	         							$.LoadingOverlay("hide");
	         							alert(response.message);
	         							if(response.result){
	         								REVENUES = [];
	         							}
	         						},
	         						error:function(response){
	         							$.LoadingOverlay("hide");
	         							alert("Hiện tại server đang bận!xin vui lòng thử lại sau.");
	         						}
	         					});
	         				},
	         				Cancel : function(){
	         				}
	         			}
	         		});
            	}
            }
        }]
	});
		
	if (type === $('#radio-week').val()) {
		$('#tbl-staff_length').prepend(dateTo);
		$('#tbl-staff_length').prepend($('<label>').text('Đến'));
		$('#tbl-staff_length').prepend(dateFrom);
	} else {
		$('#tbl-staff_length').prepend(select);
	}

	// event change date filter
	$('#month-filter').on('change', function() {
		initTable($('#month-filter').val() + '-01', type, '');
	})

	// event change date filter
	$('#quarter-filter').on('change', function() {
		initTable('', type, $('#quarter-filter').val());
	})
	/*
	 * // event change date filter $('#year-filter').on('change', function() {
	 * initTable('',type, $('#year-filter').val()); })
	 */

	// event change date filter
	$('#week-to').on('change', function() {
		initTable('', type, '', $('#week-from').val(), $('#week-to').val());
	})
}
/**
 * Add year option to select
 * 
 * @param select
 *            select
 */
// function addYear(select, num) {
// for (i = 2017; i <= 2050; i++) {
// if (i == num)
// select.append($('<option>', {
// value : i,
// selected : 'selected'
// }).text(i));
// else
// select.append($('<option>', {
// value : i
// }).text(i));
// }
// }
function addQuarter(select, num) {
	for (i = 1; i <= 4; i++) {
		if (i == num)
			select.append($('<option>', {
				value : i,
				selected : 'selected'
			}).text('Quý ' + i + '/' + new Date().getFullYear()));
		else
			select.append($('<option>', {
				value : i
			}).text('Quý ' + i + '/' + new Date().getFullYear()));
	}
}
