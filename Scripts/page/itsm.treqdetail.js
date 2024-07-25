var urlPath = $("#urlPath").val()

$(document).ready(function () {
    loadDetail()
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

function loadDetail() {
    const searchParams = new URLSearchParams(window.location.search);
    let i = 0;

    $.ajax({
        url: urlPath + '/itsm/api/request/get/byid',
        cache: false,
        method: "POST",
        data: JSON.stringify({ id: searchParams.get('reqId') }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            var _data = res.responseJSON.Value[i];

            console.log(_data);
            $("#reqSend").attr("hidden", false);

            document.getElementById("lblReqDate").innerHTML = convertJsonDateToShortDate(_data.req_date);
            //document.getElementById("lblReqTime").innerHTML = convertJsonTimeTo24(_dataRequest.req_date);
            document.getElementById("lblCreatedBy").innerHTML = _data.created_name;
            document.getElementById("lblReqNo").innerHTML = _data.req_number;

            $("#txtNik").val(_data.req_nik);
            $("#txtNama").val(_data.req_name);
            $("#txtJabatan").val(_data.req_lvl_desc);
            $("#txtReqRemark").val(_data.req_remark);
            $("#txtReqSpec").val(_data.req_spec);
            $("#txtTipe").val(_data.type_name);
            if (_data.req_owning == 1) {
                $("#txtOwning").val("Ada");
            }
            else {
                $("#txtOwning").val("Tidak Ada");
            }

            var pathSo = _data.req_detail.so_path + "/" + _data.req_detail.so_file;
            var pathJobdesc = _data.req_detail.jobdesc_path + "/" + _data.req_detail.jobdesc_file;
            var pathBudget = _data.req_detail.budget_path + "/" + _data.req_detail.bduget_file;


            if (_data.req_detail.so_file !== null) {
                $("#iSo").attr("src", pathSo.replace('~', ''));
                $("#iSo").attr("hidden", false);
                document.getElementById("badgeSo").innerHTML = "ADA";
                $("#badgeSo").attr("class", "badge badge-info");
            }
            else {
                $("#iSo").attr("hidden", true);
                document.getElementById("badgeSo").innerHTML = "TIDAK ADA";
                $("#badgeSo").attr("class", "badge badge-danger");
            }

            if (_data.req_detail.jobdesc_file !== null) {
                $("#iJobdesc").attr("src", pathJobdesc.replace('~', ''));
                $("#iJobdesc").attr("hidden", false);
                document.getElementById("badgeJobdesc").innerHTML = "ADA";
                $("#badgeJobdesc").attr("class", "badge badge-info");
            }
            else {
                $("#iJobdesc").attr("hidden", true);
                document.getElementById("badgeJobdesc").innerHTML = "TIDAK ADA";
                $("#badgeJobdesc").attr("class", "badge badge-danger");
            }

            if (_data.req_detail.budget_file !== null) {
                $("#iBudget").attr("src", pathBudget.replace('~', ''));
                $("#iBudget").attr("hidden", false);
                document.getElementById("badgeBudget").innerHTML = "ADA";
                $("#badgeBudget").attr("class", "badge badge-info");
            }
            else {
                $("#iBudget").attr("hidden", true);
                document.getElementById("badgeBudget").innerHTML = "TIDAK ADA";
                $("#badgeBudget").attr("class", "badge badge-danger");
            }
        }
    })
}
