$(document).ready(function() {
	$('#li-revenue-group').addClass('active');
	// initial table
	initTable(moment().format('YYYY-MM-DD'));
	
});

function initTable(filterDate){
	$.LoadingOverlay("show");
	var formData = {};
	formData.cdate = moment(filterDate).format('YYYY-MM-DD');
	formData.type = 1;
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
			// "lengthMenu": "Display _MENU_ records per page",
			zeroRecords : "No records available",
			info : "Showing page _PAGE_ of _PAGES_",
			infoEmpty : "No records available",
			infoFiltered : "(filtered from _MAX_ total records)"
		},
        ajax: {
            url: "/manage/revenue",
            type: 'POST',
            contentType: "application/json",
            data: function ( d ) {
                return JSON.stringify(formData);
            }
        },
        columns: [
            { data: "receiverId" },
            { data: "byerId" },
            { data: "orderName" },
            { data: "cdate" },
            { data: "orderPrice" },
            { data: "revenuePecent" },
            { data: "revenueValue" }
        ],
        dom: 'lBfrtip',
        buttons: [{
        	extend : 'excelHtml5',
			title : 'Hoa hồng nhóm ('+ moment(filterDate).format('MM-YYYY') +')'
        }
        ]
    } );
	$.LoadingOverlay("hide");
	var x = document.createElement("INPUT");
    x.setAttribute("type", "month");
    x.setAttribute("id", 'date-filter');
    x.setAttribute("value", moment(filterDate).format('YYYY-MM'));
    x.setAttribute("style", "margin-right:5px");
    //$('#tbl-staff_length').prepend($('<label>').text('Chọn Tháng :'));
    
    $('#tbl-staff_length').prepend(x);
    //event change date filter
    $('#date-filter').on('change',function(){
		initTable($('#date-filter').val()+'-01');
	})
}