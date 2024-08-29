var urlPath = $("#urlPath").val()
var sessionId = $("#sessionId").val()
var sessSite = $("#site").val()

$(document).ready(function () {
    loadGrid()
})

$("#ddSite").change(function () {
    loadGrid();
})

function loadGrid() {
    $.ajax({
        url: urlPath + 'api/ba/serahterima/get',
        data: JSON.stringify({ site: sessSite != "JKT" ? sessSite : $("#ddSite").val() }),
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblHandout').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                "autoWidth": false,
                "fixedColumns": {
                    start: 3
                },
                "columns": [
                    {
                        'data': 'handout_number',
                        className: 'dt-body-center align-middle dt-nowrap',
                        render: function (data, type, row) {

                            return `<button class="btn btn-icon btn-sm btn-success" id="btnDownload" data-bs-toggle="modal" data-bs-target="#modalPdf">
                                        <i class="mdi mdi-printer"></i>
                                    </button>&nbsp;`;
                        },
                        sortable: false,
                    },
                    {
                        'data': 'handout_number',
                        className: 'dt-body-center align-middle dt-nowrap',
                    },
                    {
                        'data': 'req_number',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'req_date',
                        className: 'dt-head-center dt-nowrap',
                        render: function (data, type, row) {
                            return convertJsonDateToShortDate(row.req_date);
                        }
                    },
                    {
                        'data': 'handout_site',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'req_dept',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'user_accept_by',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'user_accept_name',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'type_name',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                    {
                        'data': 'asset_recommendation_desc',
                        className: 'dt-head-left dt-body-left dt-nowrap'
                    },
                ],
            })
        }
    })
}

$('#tblHandout tbody').on('click', '#btnDownload', function () {
    var data = table1.row($(this).parents('tr')).data();
    var dataDetail = data.req_detail;
    data.req_date = convertJsonDateToShortDate(data.req_date);
    data.handout_date = convertJsonDateToShortDate(data.handout_date);
    console.log(data);
    var iframe = document.getElementById("iForm");
    //iframe.src = $('#urlPath').val() + "/Report/Ams_ViewerRptReqForm.aspx";

    $.ajax({
        url: urlPath + 'api/ba/serahterima/generate/form',
        //url: urlPath + 'api/request/generate/reqform',
        cache: false,
        data: JSON.stringify({ model: data, detail: dataDetail }),
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res);
            alert(res.responseJSON.StatusMessage);
            var path = res.responseJSON.Value;//name of the file
            $("#iForm").attr("src", path.replace('~', ''));
        }
    })
})

function convertJsonDateToShortDate(data) {
    // This function converts a json date to a short date
    // e.g. /Date(1538377200000)/ to 10/1/2018
    const dateValue = new Date(parseInt(data.substr(6)));
    return moment(dateValue).format("YYYY-MMM-DD");
}

function convertJsonTimeTo24(hours, minutes) {
    let dtTime = hours + ":" + minutes;
    return moment(dtTime, "hh:mm").format("HH:mm");
}