var urlPath = $("#urlPath").val()
var sessionId = $("#sessionId").val()
var sessionSite = $("#site").val();
var canvas;
var blank = document.getElementById("blank-pad");
var signaturePad;
var blankPad;

$(document).ready(function () {
    if (sessionId == "KHO" || sessionId == "KSI") {
        canvas = document.getElementById("deptSignaturePad")
    }
    else if (sessionId == "SIH" || sessionId == "SIS") {
        canvas = document.getElementById("itSignaturePad")
    }
    else if (sessionId == "SHR") {
        canvas = document.getElementById("hrSignaturePad")
    }
    else if (sessionId == "SCC") {
        canvas = document.getElementById("ccSignaturePad")
    }
    else if (sessionId == "PMS") {
        canvas = document.getElementById("pmSignaturePad")
    }
    else if (sessionId == "CC") {
        canvas = document.getElementById("costSignaturePad")
    }
    else if (sessionId == "ITD") {
        canvas = document.getElementById("itDevSignaturePad")
    }
    else if (sessionId == "ITO") {
        canvas = document.getElementById("itOpsSignaturePad")
    }
    else if (sessionId == "THT") {
        canvas = document.getElementById("thinktankSignaturePad")
    }
    else if (sessionId == "DIR") {
        canvas = document.getElementById("directorSignaturePad")
    }

    signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(250,250,250)'
    });

    blankPad = new SignaturePad(blank, {
        backgroundColor: 'rgb(250,250,250)'
    });


    loadGrid();
    $("#ddAset").select2({ allowClear: true, placeholder: 'select..', theme: 'bootstrap-5' });
    $("#txtNoAset").attr("hidden", true)
    $("#ddAset").next(".select2-container").hide();
    $("#txtAsetSpec").attr("disabled", true);

    $("#btnClearPad").attr("hidden", true)
    $("#deptSign").attr("hidden", true)
    $("#itSign").attr("hidden", true)
    $("#hrSign").attr("hidden", true)
    $("#ccSign").attr("hidden", true)
    $("#pmSign").attr("hidden", true)
    $("#costSign").attr("hidden", true)
    $("#itdSign").attr("hidden", true)
    $("#itoSign").attr("hidden", true)
    $("#ttSign").attr("hidden", true)
    $("#dirSign").attr("hidden", true)

});

$("#btnClearPad").click(function () {
    signaturePad.clear();
})

$("#ddRecommendation").change(function () {
    console.log($("#ddRecommendation").val())
    if ($("#ddRecommendation").val() == 1) {
        $("#txtNoAset").attr("hidden", false)
        $("#ddAset").next(".select2-container").hide();
        $("#txtAsetSpec").attr("disabled", false);
    }
    else if ($("#ddRecommendation").val() == 0) {
        $("#txtNoAset").attr("hidden", true)
        $("#ddAset").next(".select2-container").show();
        $("#txtAsetSpec").attr("disabled", true);
    }
    else {
        $("#txtNoAset").attr("hidden", true)
        $("#ddAset").next(".select2-container").hide();
        $("#txtAsetSpec").attr("disabled", true);
    }
})

$("#ddDeptValidasi").change(function () {
    if ($("#ddDeptValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#deptSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#deptSign").attr("hidden", true)
    }
})

$("#ddItValidasi").change(function () {
    console.log($("#ddItValidasi").val())
    if ($("#ddItValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#itSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#itSign").attr("hidden", true)
    }
})

$("#ddHrValidasi").change(function () {
    if ($("#ddHrValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#hrSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#hrSign").attr("hidden", true)
    }
})

$("#ddCcValidasi").change(function () {
    if ($("#ddCcValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#ccSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#ccSign").attr("hidden", true)
    }
})

$("#ddPmValidasi").change(function () {
    if ($("#ddPmValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#pmSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#pmSign").attr("hidden", true)
    }
})

$("#ddCostValidasi").change(function () {
    if ($("#ddCostValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#costSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#costSign").attr("hidden", true)
    }
})

$("#ddItDevValidasi").change(function () {
    if ($("#ddItDevValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#itdSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#itdSign").attr("hidden", true)
    }
})

$("#ddItOpsValidasi").change(function () {
    if ($("#ddItOpsValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#itoSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#itoSign").attr("hidden", true)
    }
})

$("#ddThinktankValidasi").change(function () {
    if ($("#ddThinktankValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#ttSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#ttSign").attr("hidden", true)
    }
})

$("#ddDirectorValidasi").change(function () {
    if ($("#ddDrectorValidasi").val() == "true") {
        $("#btnClearPad").attr("hidden", false)
        $("#dirSign").attr("hidden", false)
    }
    else {
        $("#btnClearPad").attr("hidden", true)
        $("#dirSign").attr("hidden", true)
    }
})


function loadDdAsset() {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/aset/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ flag: "1" }),
        complete: function (res) {
            $("#ddAset").empty();

            console.log(res)
            let rowAsset = res.responseJSON.Value;

            document.getElementById("ddAset").innerHTML = document.getElementById("ddAset").innerHTML + "<option value=''>---PILIH---</option>";
            while (i < rowAsset.length) {
                //console.log(document.getElementById("ddRole").innerHTML);

                document.getElementById("ddAset").innerHTML = document.getElementById("ddAset").innerHTML + "<option value='" + rowAsset[i]["asset_num"] + "'>" + rowAsset[i]["asset_num"] + "-" + rowAsset[i]["asset_name"] + "</option>";

                i++;

            }
        }
    })
}

function loadDdStandard() {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/standard/get',
        cache: false,
        method: "POST",
        data: JSON.stringify({ dept: $("#txtDept").val() }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddStandard").empty();

            console.log(res)
            let rowStandard = res.responseJSON.Value;

            document.getElementById("ddStandard").innerHTML = document.getElementById("ddStandard").innerHTML + "<option value=''>---PILIH---</option>";
            while (i < rowStandard.length) {
                //console.log(document.getElementById("ddRole").innerHTML);

                document.getElementById("ddStandard").innerHTML = document.getElementById("ddStandard").innerHTML + "<option value='" + rowStandard[i]["id"] + "'>" + rowStandard[i]["lvl_name"] + "</option>";

                i++;

            }
        }
    })
}

$("#ddStandard").change(function () {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/standard/get',
        cache: false,
        method: "POST",
        data: JSON.stringify({ id: $("#ddStandard").val() }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            if (res.responseJSON.StatusCode == 200) {
                $("#txtStandardSpec").val(res.responseJSON.Value[i].standard_spec);
            }
            else {
                alert(res.responseJSON.StatusMessage);
            }
        }
    })
})

$("#ddAset").change(function () {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/aset/get',
        cache: false,
        method: "POST",
        data: JSON.stringify({ id: $("#ddAset").val() }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            if (res.responseJSON.StatusCode == 200) {
                $("#txtAsetSpec").val(res.responseJSON.Value[i].asset_spec);
                $("#txtAsetSpec").attr("disabled", true);
            }
            else {
                alert(res.responseJSON.StatusMessage);
                $("#txtAsetSpec").attr("disabled", false);

            }
        }
    })
})

$("#btnProcess").click(function () {
    Update();
})

function loadGrid() {
    $.ajax({
        url: urlPath + 'api/request/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res.responseJSON.Value)
            table1 = $('#tblRequest').DataTable({
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
                        'data': 'req_number',
                        className: 'dt-body-center align-middle dt-nowrap',
                        render: function (data, type, row) {

                            if (sessionId == "KHO" || sessionId == "KST") {
                                if (row.req_detail.approval_dept == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "SIH" || sessionId == "SIS") {
                                if (row.it_is_process == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDownload" data-bs-toggle="modal" data-bs-target="#modalPdf">
                                            <i class="mdi mdi-printer"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDownload" data-bs-toggle="modal" data-bs-target="#modalPdf">
                                            <i class="mdi mdi-printer"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "SHR") {
                                if (row.hr_is_process == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "SCC") {
                                if (row.cc_is_process == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "PMS") {
                                if (row.req_detail.approval_pm == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "CC") {
                                if (row.req_detail.approval_cc == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "ITD") {
                                if (row.req_detail.approval_it_dev == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "ITO") {
                                if (row.req_detail.approval_it_ops == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "THT") {
                                if (row.req_detail.approval_thinktank == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                            else if (sessionId == "DIR") {
                                if (row.req_detail.approval_director == true) {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;`;
                                }
                                else {
                                    return `
                                        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>&nbsp;
                                        <button class="btn btn-icon btn-sm btn-success" id="btnValidate" data-bs-toggle="modal" data-bs-target="#modalValidate">
                                            <i class="mdi mdi-file-question"></i>
                                        </button>&nbsp;`;
                                }
                            }
                        },
                        sortable: false,
                    },
                    {
                        'data': 'req_number',
                        className: 'dt-head-center dt-nowrap',
                    },
                    {
                        'data': 'req_date',
                        className: 'dt-head-center dt-nowrap',
                        render: function (data, type, row) {
                            return convertJsonDateToShortDate(row.req_date);
                        }
                    },
                    {
                        'data': 'req_nik',
                        className: 'dt-head-center dt-nowrap'
                    },
                    {
                        'data': 'req_name',
                        className: 'dt-head-center dt-nowrap'
                    },
                    {
                        'data': 'req_dept',
                        className: 'dt-head-center dt-nowrap'
                    },
                    {
                        'data': 'req_site',
                        className: 'dt-head-center dt-nowrap'
                    },
                    {
                        'data': 'type_code',
                        className: 'dt-head-center dt-nowrap',
                        render: function (data, type, row) {
                            return row.type_name;
                        },
                    },
                    {
                        'data': 'req_remark',
                        className: 'dt-head-center dt-nowrap'
                    },
                    {
                        'data': 'approval_flag',
                        className: 'dt-head-center dt-nowrap',
                        render: function (data, type, row) {
                            let flag;
                            let deptFlag;
                            let pmFlag;
                            let itFlag;
                            let hrFlag;
                            let ccFlag;
                            let costFlag;
                            let devFlag;
                            let opsFlag;
                            let tankFlag;
                            let dirFlag;

                            if (row.req_detail.approval_dept == null) {
                                deptFlag = `<span class="badge badge-warning">${row.dept_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_dept == true) {
                                    deptFlag = `<span class="badge badge-success">${row.dept_flag}</span>`;
                                }
                                else {
                                    deptFlag = `<span class="badge badge-danger">${row.dept_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_pm == null) {
                                pmFlag = `<span class="badge badge-warning">${row.pm_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_pm == true) {
                                    pmFlag = `<span class="badge badge-success">${row.pm_flag}</span>`;
                                }
                                else {
                                    pmFlag = `<span class="badge badge-danger">${row.pm_flag}</span>`;
                                }
                            }

                            if (row.it_is_process == null) {
                                itFlag = `<span class="badge badge-warning">${row.it_flag}</span>`;
                            }
                            else {
                                if (row.it_is_process == true) {
                                    itFlag = `<span class="badge badge-success">${row.it_flag}</span>`;
                                }
                                else if (row.it_is_process == false) {
                                    itFlag = `<span class="badge badge-danger">${row.it_flag}</span>`;
                                }
                            }

                            if (row.hr_is_process == null) {
                                hrFlag = `<span class="badge badge-warning">${row.hr_flag}</span>`;
                            }
                            else {
                                if (row.hr_is_process == true) {
                                    hrFlag = `<span class="badge badge-success">${row.hr_flag}</span>`;
                                }
                                else if (row.hr_is_process == false) {
                                    hrFlag = `<span class="badge badge-danger">${row.hr_flag}</span> `;
                                }
                            }

                            if (row.cc_is_process == null) {
                                ccFlag = `<span class="badge badge-warning">${row.cc_flag}</span>`;
                            }
                            else {
                                if (row.cc_is_process == true) {
                                    ccFlag = `<span class="badge badge-success">${row.cc_flag}</span>`;
                                }
                                else if (row.cc_is_process == false) {
                                    ccFlag = `<span class="badge badge-danger">${row.cc_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_cc == null) {
                                costFlag = `<span class="badge badge-warning">${row.cost_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_cc == true) {
                                    costFlag = `<span class="badge badge-success">${row.cost_flag}</span>`;
                                }
                                else {
                                    costFlag = `<span class="badge badge-danger">${row.cost_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_it_dev == null) {
                                devFlag = `<span class="badge badge-warning">${row.it_dev_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_it_dev == true) {
                                    devFlag = `<span class="badge badge-success">${row.it_dev_flag}</span>`;
                                }
                                else {
                                    devFlag = `<span class="badge badge-danger">${row.it_dev_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_it_ops == null) {
                                opsFlag = `<span class="badge badge-warning">${row.it_ops_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_it_ops == true) {
                                    opsFlag = `<span class="badge badge-success">${row.it_ops_flag}</span>`;
                                }
                                else {
                                    opsFlag = `<span class="badge badge-danger">${row.it_ops_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_thinktank == null) {
                                tankFlag = `<span class="badge badge-warning">${row.thinktank_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_thinktank == true) {
                                    tankFlag = `<span class="badge badge-success">${row.thinktank_flag}</span>`;
                                }
                                else {
                                    tankFlag = `<span class="badge badge-danger">${row.thinktank_flag}</span>`;
                                }
                            }

                            if (row.req_detail.approval_director == null) {
                                dirFlag = `<span class="badge badge-warning">${row.director_flag}</span>`;
                            }
                            else {
                                if (row.req_detail.approval_director == true) {
                                    dirFlag = `<span class="badge badge-success">${row.director_flag}</span>`;
                                }
                                else {
                                    dirFlag = `<span class="badge badge-danger">${row.director_flag}</span>`;
                                }
                            }

                            if (site != "JKT") {

                                return deptFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + itFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + hrFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + ccFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + pmFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + costFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + devFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + opsFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + tankFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + dirFlag;
                            }
                            else {
                                return deptFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + itFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + hrFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + ccFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + costFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + devFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + opsFlag
                                    + '<i class="mdi mdi-arrow-right-bold"></i>' + tankFlag + '<i class="mdi mdi-arrow-right-bold"></i>' + dirFlag;
                            }

                        },
                    },
                ],
            })
        }
    })
}

$("#tblRequest tbody").on('click', '#btnDetail', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    window.location = urlPath + "pengajuan/detail?reqId=" + data.req_id;
})

$('#tblRequest tbody').on('click', '#btnValidate', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);

    $("#txtReqNo").val(data.req_number);
    $("#txtId").val(data.req_id);
    $("#txtSite").val(data.req_site);
    $("#txtDept").val(data.req_dept);
    $("#txtTipeId").val(data.type_code);
    $("#txtTipeAset").val(data.type_name);
    //$("#txtTgl").val(convertJsonDateToShortDate(data.req_date));
    $("#txtNik").val(data.req_nik);
    $("#txtNama").val(data.req_name);
    $("#txtJabatan").val(data.req_lvl_desc);
    $("#txtReqRemark").val(data.req_remark);
    $("#txtReqSpec").val(data.req_spec);

    if (sessionId == "SIH" || sessionId == "SIS") {
        loadDdStandard();
        loadDdAsset();
    }

    var pathSo = data.req_detail.so_path + "/" + data.req_detail.so_file;
    var pathJobdesc = data.req_detail.jobdesc_path + "/" + data.req_detail.jobdesc_file;
    var pathBudget = data.req_detail.budget_path + "/" + data.req_detail.bduget_file;

    if (data.req_detail.so_file !== null) {
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

    if (data.req_detail.jobdesc_file !== null) {
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

    if (data.req_detail.budget_file !== null) {
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

})

$('#tblRequest tbody').on('click', '#btnDownload', function () {
    var data = table1.row($(this).parents('tr')).data();
    var dataDetail = data.req_detail;
    data.req_date = convertJsonDateToShortDate(data.req_date);
    console.log(dataDetail);
    var iframe = document.getElementById("iForm");
    //iframe.src = $('#urlPath').val() + "/Report/Ams_ViewerRptReqForm.aspx";

    $.ajax({
        url: urlPath + 'api/request/generate/form/request',
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

$("#btnCancel").click(function () {
    var myModalEl = document.getElementById('modalValidate');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
})

function Update() {
    var S_DATA;
    var S_DETAIL;

    if ($("#ddDeptValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val()
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_dept: $("#ddDeptValidasi").val(),
            dept_remark: $("#txtDeptRemark").val(),
            dept_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddItValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
            it_is_process: $("#ddItValidasi").val(),
            it_processed_remark: $("#txtItRemark").val(),
            asset_recommendation: $("#ddRecommendation").val(),
            standard_id: $("#ddStandard").val(),
            asset_number: $("#ddRecommendation").val() == "0" ? $("#ddAset").val() : $("#txtNoAset").val(),
            asset_spec: $("#txtAsetSpec").val(),
            it_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddHrValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
            req_dept: $("#txtDept").val(),
            hr_is_process: $("#ddHrValidasi").val(),
            hr_processed_remark: $("#txtHrRemark").val(),
            mp_status: $("#ddMpStatus").val(),
            hr_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddCcValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
            cc_is_process: $("#ddCcValidasi").val(),
            cc_processed_remark: $("#txtCcRemark").val(),
            budget_status: $("#ddBudgetStatus").val(),
            budget_year_period: $("#ddYear").val(),
            budget_month_period: $("#ddMonth").val(),
            cc_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddPmValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_pm: $("#ddPmValidasi").val(),
            pm_remark: $("#txtPmRemark").val(),
            pm_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddCostValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_cc: $("#ddCostValidasi").val(),
            cc_remark: $("#txtCostRemark").val(),
            cc_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddItDevValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_it_dev: $("#ddItDevValidasi").val(),
            it_dev_remark: $("#txtItDevRemark").val(),
            it_dev_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddItOpsValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_it_ops: $("#ddItOpsValidasi").val(),
            it_ops_remark: $("#txtItOpsRemark").val(),
            it_ops_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddThintankValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_thinktank: $("#ddThinktankValidasi").val(),
            thinktank_remark: $("#txtThinktankRemark").val(),
            thinktank_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }

    if ($("#ddDirectorValidasi").val() != null) {
        S_DATA = {
            req_id: $("#txtId").val(),
            req_number: $("#txtReqNo").val(),
            req_dept: $("#txtDept").val(),
            req_site: $("#txtSite").val(),
            req_nik: $("#txtNik").val(),
        }

        S_DETAIL = {
            req_id: $("#txtId").val(),
            approval_director: $("#ddDirectorValidasi").val(),
            director_remark: $("#txtDirectorRemark").val(),
            director_sign_encode: signaturePad.toDataURL() == blankPad.toDataURL() ? null : signaturePad.toDataURL(),
        }
    }
    console.log(S_DATA)
    //console.log(S_DETAIL);

    if (S_DATA != null) {
        $.ajax({
            url: urlPath + 'api/request/update',
            cache: false,
            method: "POST",
            data: JSON.stringify({ model: S_DATA, detail: S_DETAIL }),
            contentType: "application/json; charset=utf-8",
            complete: function (res) {
                loadGrid();
                alert(res.responseJSON.StatusMessage);
            }
        })
    }
    else {

    }

    var myModalEl = document.getElementById('modalValidate');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

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
