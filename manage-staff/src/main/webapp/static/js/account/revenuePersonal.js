$(document).ready(function() {
	$('#li-revenue-personal').addClass('active');
	// initial table
	initTable(moment().format('YYYY-MM-DD'));
	
});

function initTable(filterDate){
	var formData = {};
	formData.cdate = moment(filterDate).format('YYYY-MM-DD');
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
            url: "/manage/revenuePersonalAPI",
            type: 'POST',
            contentType: "application/json",
            data: function ( d ) {
                return JSON.stringify(formData);
            }
        },
        columns: [
            { data: "userName" },
            { data: "orderName" },
            { data: "cdateString" },
            { data: "orderPrice" },
            { data: "revenuePecent" },
            { data: "revenueValue" }
        ],
        dom: 'lBfrtip',
        buttons: [
            'excelHtml5'
        ]
    } );
	
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