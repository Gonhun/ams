var urlPath = $("#urlPath").val();
var sessionRole = $("#sessionId").val();
$(document).ready(function () {
    $("#txtPrev").attr("disabled", true)
    $("#ddKondisi").attr("disabled", true)
    $('#txtTgl').val(new Date().toLocaleDateString('en-CA'),)
    loadDdType();

    loadGrid();

    if (sessionRole == "SHO" || sessionRole == "SSS") {
        $("#txtNik").attr("disabled", true);
        loadNrp();
    }
    else {
        $("#txtNik").attr("disabled", false);
    }
});

$("#btnSearch").click(function () {
    loadNrp();
})

$("#btnSave").click(function () {
    Save();
})

$("#btnCancel").click(function () {
    Cancel();
})

$("#ddOwning").change(function () {
    if ($("#ddOwning").val() == "1") {
        //$("#txtPrev").attr("disabled", false)
        //$("#ddKondisi").attr("disabled", false)
        //$("#txtPrev").val("");
        //$("#ddKondisi").val("");
        $("#rowPrev").attr("hidden", false)
    }
    else {
        //$("#txtPrev").attr("disabled", true)
        //$("#ddKondisi").attr("disabled", true)
        //$("#txtPrev").val("");
        //$("#ddKondisi").val("");
        $("#rowPrev").attr("hidden", true)

    }
})
function loadGrid() {
    $.ajax({
        url: urlPath + 'api/request/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblRequest').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                "autoWidth": false,
                "columns": [
                    {
                        'data': 'req_number',
                        className: 'dt-body-center align-middle dt-nowrap',
                        render: function (data, type, row) {
                            return `
                                    <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                                        <i class="mdi mdi-magnify"></i>
                                    </button>&nbsp;`;
                            //if (sessionRole == "KHO" || sessionRole == "KST") {
                            //    return `
                            //        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                            //            <i class="mdi mdi-magnify"></i>
                            //        </button>&nbsp;`;
                            //}
                            //else {
                            //    return `
                            //        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                            //            <i class="mdi mdi-magnify"></i>
                            //        </button>&nbsp;`;
                            //}
                        },
                        sortable: false,
                    },
                    {
                        'data': 'req_number',
                        className: 'dt-head-center dt-nowrap',
                    },
                    {
                        'data': 'req_nik',
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
                            if (row.it_is_process == true && row.hr_is_process == true && row.cc_is_process == true) {
                                return `<span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.hr_flag}</span> 
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.cc_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                        <span class="badge badge-primary">${row.approval_flag}</span>`
                            }
                            else if (row.it_is_process != null || row.hr_is_process != null || row.cc_is_process != null) {
                                if (row.cc_is_process == true) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.hr_flag}</span> 
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.cc_flag}</span>`;
                                }
                                else if (row.cc_is_process == false) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.hr_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-danger">${row.cc_flag}</span>`;
                                }

                                if (row.hr_is_process == true) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.hr_flag}</span> 
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-warning">${row.cc_flag}</span>`;
                                }
                                else if (row.hr_is_process == false) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-danger">${row.hr_flag}</span> `;
                                }

                                if (row.it_is_process == true) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-success">${row.it_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-warning">${row.hr_flag}</span>`;
                                }
                                else if (row.it_is_process == false) {
                                    return `<span class="badge badge-info">${row.approval_flag}</span>
                                            <i class="mdi mdi-arrow-right-bold"></i>
                                            <span class="badge badge-danger">${row.it_flag}</span>`;
                                }

                            }
                            else {
                                return `<span class="badge badge-danger">${row.approval_flag}</span>`
                            }
                        
                        },
                    },
                ],
            })
        }
    })
}

$('#tblRequest tbody').on('click', '#btnDetail', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    window.location = urlPath + "pengajuan/detail?reqId=" + data.req_id ;
})

function loadDdType() {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/tipeaset/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddTipe").empty();

            console.log(res)
            let rowType = res.responseJSON.Value;

            document.getElementById("ddTipe").innerHTML = document.getElementById("ddTipe").innerHTML + "<option value=''>---PILIH---</option>";
            while (i < rowType.length) {
                //console.log(document.getElementById("ddRole").innerHTML);

                document.getElementById("ddTipe").innerHTML = document.getElementById("ddTipe").innerHTML + "<option value='" + rowType[i]["type_code"] + "'>" + rowType[i]["type_name"] + "</option>";

                i++;

            }
        }
    })
}

function loadNrp() {
    if ($("#txtNik").val() == "") {
        alert("nik harus diisi");
    }
    else {
        var i = 0;
        $.ajax({
            url: urlPath + 'api/request/get/emp',
            cache: false,
            data: JSON.stringify({ nik: $("#txtNik").val() }),
            method: "POST",
            contentType: "application/json; charset=utf-8",
            complete: function (res) {
                console.log(res.responseJSON);
                alert(res.responseJSON.StatusMessage)
                $("#txtNama").val(res.responseJSON.Value.name);
                $("#txtJabatan").val(res.responseJSON.Value.jabatan);

                $("#ddTipe").attr("disabled", false);
                $("#txtReqSpec").attr("disabled", false);
                $("#txtRemark").attr("disabled", false);
                $('uploadJd').attr("disabled", false);
                $('uploadSo').attr("disabled", false);
                document.getElementById('uploadJd').disabled = false;
                document.getElementById('uploadSo').disabled = false;
                document.getElementById('uploadBudget').disabled = false;

                loadAssetCheck();
            }
        })
    }
}  

function loadAssetCheck() {
    $.ajax({
        url: urlPath + 'api/aset/get/byuser',
        cache: false,
        data: JSON.stringify({ nik: $("#txtNik").val() }),
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res.responseJSON);
            alert(res.responseJSON.StatusMessage)
            if (res.responseJSON.Value == null) {
                $("#ddOwning").val(0)
                $("#rowPrev").attr("hidden", true)
            }
            else {
                $("#ddOwning").val(1)
                $("#rowPrev").attr("hidden", false)
                $("#txtPrev").val(res.responseJSON.Value.asset_num)
                $("#txtPrevSpec").val(res.responseJSON.Value.asset_spec)
            }
        }
    })
}

function Save() {
    var formData = new FormData();
    var jdUpload = document.getElementById('uploadJd');
    var soUpload = document.getElementById('uploadSo');
    var budgetUpload = document.getElementById('uploadBudget');
    //Iterating through each files selected in fileInput
    if (jdUpload != null) {
        for (i = 0; i < jdUpload.files.length; i++) {
            //Appending each file to FormData object
            formData.append(jdUpload.files[i].name, jdUpload.files[i]);
        }
    }

    if (soUpload != null) {
        for (i = 0; i < soUpload.files.length; i++) {
            //Appending each file to FormData object
            formData.append(soUpload.files[i].name, soUpload.files[i]);
        }
    }

    if (budgetUpload != null) {
        for (i = 0; i < budgetUpload.files.length; i++) {
            //Appending each file to FormData object
            formData.append(budgetUpload.files[i].name, budgetUpload.files[i]);
        }
    }

    formData.append("req_id", $("#txtId").val());
    formData.append("req_number", $("#txtReqNo").val());
    formData.append("req_date", $("#txtTgl").val());
    formData.append("req_site", $("#txtSite").val());
    formData.append("req_dept", $("#txtDept").val());
    formData.append("req_nik", $("#txtNik").val());
    formData.append("type_code", $("#ddTipe").val());
    formData.append("req_spec", $("#txtReqSpec").val());
    formData.append("req_owning", $("#ddOwning").val());
    formData.append("req_remark", $("#txtRemark").val());
    formData.append("prev_asset", $("#txtPrev").val());
    formData.append("prev_asset_condition", $("#ddKondisi").val());
    formData.append("asset_recommendation", $("#ddRecommendation").val());

    $.ajax({
        url: urlPath + 'api/request/insert',
        cache: false,
        method: "POST",
        data: formData,
        //contentType: "application/json; charset=utf-8",
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
        complete: function (res) {
            console.log(res)
            alert(res.responseJSON.StatusMessage);
            loadGrid();
        }
    })
}

function Cancel() {
    $("#txtId").val("");
    $("#txtReqNo").val("");
    $("#ddTipe").val("");
    $("#txtReqSpec").val("");
    $("#ddOwning").val("");
    $("#txtRemark").val("");
    $("#txtPrev").val("");
    $("#txtPrevSpec").val("");
    $("#ddKondisi").val("");

    $("#txtNik").attr("disabled", true);
    loadNrp();

    $("#txtId").attr("disabled", true);
    if (sessionRole != "SHO" || sessionRole != "SSS") {
        $("#txtNik").attr("disabled", false);
    }
    else {
        $("#txtNik").attr("disabled", true);
    }
    $("#txtReqNo").attr("disabled", true);
    $("#ddTipe").attr("disabled", true);
    $("#txtReqSpec").attr("disabled", true);
    $("#ddOwning").attr("disabled", true);
    $("#txtRemark").attr("disabled", true);
    $("#txtPrev").attr("disabled", true);
    $("#ddKondisi").attr("disabled", true);
    //document.getElementById("addRequest").classList.add("collapsed-card");
    $('#uploadJd').empty();
    $('#uploadSo').empty();
    $('#uploadBudget').empty();

    $("#rowPrev").attr("hidden", true);

    document.getElementById('uploadJd').disabled = true;
    document.getElementById('uploadSo').disabled = true;
    document.getElementById('uploadBudget').disabled = true;

    document.getElementById("labelJd").innerHTML = "file wajib .pdf";
    document.getElementById("labelSo").innerHTML = "file wajib .pdf";
    document.getElementById("labelBu").innerHTML = "file wajib .pdf";
}

