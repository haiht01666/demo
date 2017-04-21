$(document).ready(function() {
	var curr = new Date; // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6

	var firstday = new Date(curr.setDate(first));
	var lastday = new Date(curr.setDate(last));
	
	$('#li-revenue').addClass('active');
	// initial table
	initTable(moment().format('YYYY-MM-DD'), $('#radio-week').val(),'',firstday,lastday);
	$('input[type=radio][name=optradio]').change(function() {
		initTable(moment().format('YYYY-MM-DD'), $(this).val(),'',firstday,lastday);
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
function initTable(filterDate, type, num,firstday,lastday) {
	$.LoadingOverlay("show");
	var formData = {};
	var select;
	var dateFrom;
	var dateTo;
	if (type === $('#radio-month').val()) {
		formData.cdate = moment(filterDate).format('YYYY-MM-DD');
		select = document.createElement("INPUT");
		select.setAttribute("type", "month");
		select.setAttribute("id", 'month-filter');
		select.setAttribute("value", moment(filterDate).format('YYYY-MM'));
		select.setAttribute("style", "margin-right:10px");
	}

	if (type === $('#radio-week').val()) {
		formData.dateFrom =  moment(firstday).format('YYYY-MM-DD')
		formData.dateTo =  moment(lastday).format('YYYY-MM-DD')
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
		var select = $('<select>', {
			id : 'quarter-filter',
			style : 'margin-right:10px;height:28px;width:200px'
		});
		addQuarter(select, num);
		$('#tbl-staff_length').prepend(select);
	}

	/*if (type === $('#radio-year').val()) {
		formData.num = num;
		var select = $('<select>', {
			id : 'year-filter',
			style : 'margin-right:10px;height:28px;width:200px'
		});
		addYear(select, num);
	}*/
	
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
			}
		},
		columns : [ {
			data : "receiverId"
		}, {
			data : "byerId"
		}, {
			data : "orderName"
		}, {
			data : "cdate"
		} ],
		dom : 'lBfrtip',
		buttons : [ 'excelHtml5' ]
	});
	$.LoadingOverlay("hide");
	
	if (type === $('#radio-week').val()) {
		$('#tbl-staff_length').prepend(dateTo);
		$('#tbl-staff_length').prepend($('<label>').text('Đến'));
		$('#tbl-staff_length').prepend(dateFrom);
	}else{
		$('#tbl-staff_length').prepend(select);
	}
	
	// event change date filter
	$('#month-filter').on('change', function() {
		initTable($('#month-filter').val() + '-01', type, '');
	})

	// event change date filter
	$('#quarter-filter').on('change', function() {
		initTable('',type, $('#quarter-filter').val());
	})
/*	// event change date filter
	$('#year-filter').on('change', function() {
		initTable('',type, $('#year-filter').val());
	})*/
	
	// event change date filter
	$('#week-to').on('change', function() {
		initTable('',type, '',$('#week-from').val(),$('#week-to').val());
	})
}
/**
 * Add year option to select
 * 
 * @param select
 *            select
 */
//function addYear(select, num) {
//	for (i = 2017; i <= 2050; i++) {
//		if (i == num)
//			select.append($('<option>', {
//				value : i,
//				selected : 'selected'
//			}).text(i));
//		else
//			select.append($('<option>', {
//				value : i
//			}).text(i));
//	}
//}
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

