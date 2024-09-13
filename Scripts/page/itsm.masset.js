var urlPath = $("#urlPath").val();

$(document).ready(function () {
    $('#txtTgl').datepicker({
        dateFormat: 'yy-M-dd',
        changeMonth: true,
        changeYear: true,
        orientation: "bottom auto"
    });
    $("#flagSave").val("INSERT");

    $("#txtTgl").val(moment().format("YYYY-MMM-DD"))

    loadDdType();
    loadDdMerk();
    loadGrid();
    //getGraphStatus();
})

$("#ddStatus").change(function () {
    if ($("#ddStatus").val() == "1U") {
        $("#rowUsed").attr("hidden", false)
    }
    else {
        $("#rowUsed").attr("hidden", true)
    }
})

$("#btnSearchNik").click(function () {
    loadNrp();
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

function loadDdMerk() {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/merkaset/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddMerk").empty();

            console.log(res)
            let rowMerk = res.responseJSON.Value;

            document.getElementById("ddMerk").innerHTML = document.getElementById("ddMerk").innerHTML + "<option value=''>---PILIH---</option>";
            while (i < rowMerk.length) {
                //console.log(document.getElementById("ddRole").innerHTML);

                document.getElementById("ddMerk").innerHTML = document.getElementById("ddMerk").innerHTML + "<option value='" + rowMerk[i]["merk_code"] + "'>" + rowMerk[i]["merk_name"] + "</option>";

                i++;

            }
        }
    })
}

$("#btnSave").click(function () {
    Save();
})

$("#btnCancel").click(function () {
    ClearData();
})

function loadNrp() {
    if ($("#txtNikEmp").val() == "") {
        alert("nik harus diisi");
    }
    else {
        var i = 0;
        $.ajax({
            url: urlPath + 'api/aset/get/emp',
            cache: false,
            data: JSON.stringify({ nik: $("#txtNikEmp").val() }),
            method: "POST",
            contentType: "application/json; charset=utf-8",
            complete: function (res) {
                console.log(res.responseJSON);
                alert(res.responseJSON.StatusMessage)
                $("#txtNamaEmp").val(res.responseJSON.Value.name);
                $("#txtJabatan").val(res.responseJSON.Value.jabatan);
            }
        })
    }
}  

function getGraphStatus() {

    var barData = {}
    $.ajax({
        url: urlPath + "api/aset/get/graph/status",
        type: 'POST',
        dataType: "json",
        cache: false,
        data: JSON.stringify({
            site: $("#txtSite").val(),
        }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res);

            barChart = echarts.init(document.getElementById('barChart'))

            option = {
                xAxis: {
                    type: 'category',
                    data: res.responseJSON.Value.statusVal.map(obj => {
                        console.log(obj)
                        return obj.status_desc;
                    }),
                    axisLabel: {
                        width: 200, //fixed number of pixels
                        overflow: 'truncate', // or 'break' to continue in a new line
                        interval: 0,
                    },
                },
                grid: { containLabel: true },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'bar',
                        data: res.responseJSON.Value.statusVal.map(obj => {
                            return obj.total_status;
                        }),
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        },
                    }
                ],
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center'
                },
                textStyle: {
                    fontSize: 8
                }
            };
            barChart.setOption(option, true);

            //new ResizeObserver(() => barChart.resize()).observe(container);
        }
    })
}

function loadGrid() {
    $.ajax({
        url: urlPath + 'api/aset/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblAset').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                "autoWidth": false,
                "columns": [
                    {
                        'data': 'asset_num',
                        className: 'dt-body-center align-middle dt-nowrap',
                        render: function (data, type, row) {
                            //return `
                            //        <button class="btn btn-icon btn-sm btn-success" id="btnDetail">
                            //            <i class="mdi mdi-magnify"></i>
                            //        </button>&nbsp;
                            //        <button class="btn btn-icon btn-sm btn-success" id="btnEdit">
                            //            <i class="fas fa-pen-square"></i>
                            //        </button>&nbsp;`;
                            return `
                                    <button class="btn btn-icon btn-sm btn-success" id="btnEdit">
                                        <i class="fas fa-pen-square"></i>
                                    </button>&nbsp;`;
                        },
                        sortable: false,
                    },
                    {
                        'data': 'asset_photo',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            if (row.asset_photo != null) {
                                //return `<button type="button" id="btnAsset" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                //        <img src='${row.asset_photo_path}/${row.asset_photo}' class='img-thumbnail' width='100' height='100'></img>
                                //    </button>`;

                                return `<button type="button" id="btnAsset" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="mdi mdi-magnify"></i> Lihat Foto Aset
                                    </button>`;
                            }
                            else {
                                //return `<button type="button" id="btnAsset" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                //        <img src='${urlPath}/Content/img/no_photo.jpg' class='img-thumbnail' width='200' height='200'></img>
                                //    </button>`;
                                return `<button type="button" id="btnAsset" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="mdi mdi-magnify"></i> Lihat Foto Aset
                                    </button>`;
                            }
                        }
                    },
                    {
                        'data': 'asset_received',
                        render: function (data, type, row) {
                            return convertJsonDateToShortDate(row.asset_received);
                        },
                        className: 'dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_site',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_num',
                        className: 'dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_no_pr',
                        className: 'dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_no_sap',
                        className: 'dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_name',
                        className: 'dt-nowrap dt-body-left'
                    },
                    {
                        'data': 'asset_category',
                        className: 'dt-nowrap align-middle',
                        render: function (data, type, row) {
                            return row.category_name;
                        }
                    },
                    {
                        'data': 'type_code',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            return row.type_name;
                        }
                    },
                    {
                        'data': 'asset_status',
                        className: 'dt-nowrap align-middle',
                        render: function (data, type, row) {
                            return row.status_name;
                        }
                    },
                    {
                        'data': 'asset_price',
                        className: 'dt-nowrap align-middle',
                        render: $.fn.dataTable.render.number(',', '.', 2, 'Rp')
                    },
                    {
                        'data': 'asset_sn',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'asset_location',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'sn_photo',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            if (row.sn_photo != null) {
                                //return `<button type="button" id='btnSn' class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                //        <img src='${row.sn_path}/${row.sn_photo}' class='img-thumbnail' width='100' height='100'></img>
                                //    </button>`;
                                return `<button type="button" id='btnSn' class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="mdi mdi-magnify"></i> Lihat Foto Serial Number
                                    </button>`;
                            }
                            else {
                                //return `<button type="button" id="btnSn" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                //        <img src='${urlPath}/Content/img/no_photo.jpg' class='img-thumbnail' width='200' height='200'></img>
                                //    </button>`;
                                return `<button type="button" id="btnSn" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="mdi mdi-magnify"></i> Lihat Foto Serial Number
                                    </button>`;
                            }
                        }
                    },
                ],
            })
        }
    })
}

$('#tblAset tbody').on('click', '#btnSn', function () {
    var row = table1.row($(this).parents('tr')).data();
    console.log(row);
    if (row.sn_path != null) {
        document.getElementById("modalTitle").innerHTML = "Foto SN"
        $('#popPicture').replaceWith("<img src='" + row.sn_path + "/" + row.sn_photo + "' id='popPicture' width='500' height='500' class='img-fluid rounded mx-auto d-block'>");
    }
    else {
        document.getElementById("modalTitle").innerHTML = "Foto SN"
        $('#popPicture').replaceWith("<img src='" + urlPath + "/Content/img/no_photo.jpg' id='popPicture' width='500' height='500' class='img-fluid rounded mx-auto d-block'>");
    }
    //$("#popPicture").attr('src', row.sn_path + "/" + row.sn_photo);

})

$('#tblAset tbody').on('click', '#btnAsset', function () {
    var row = table1.row($(this).parents('tr')).data();
    console.log(row);
    if (row.asset_photo_path != null) {
        document.getElementById("modalTitle").innerHTML = "Foto Fisik Aset"
        $('#popPicture').replaceWith("<img src='" + row.asset_photo_path + "/" + row.asset_photo + "' id='popPicture' width='500' height='500' class='img-fluid rounded mx-auto d-block'>");
    }
    else {
        document.getElementById("modalTitle").innerHTML = "Foto Fisik Aset"
        $('#popPicture').replaceWith("<img src='" + urlPath + "/Content/img/no_photo.jpg' id='popPicture' width='500' height='500' class='img-fluid rounded mx-auto d-block'>");
    }
    //$("#popPicture").attr('src', row.sn_path + "/" + row.sn_photo);

})

$('#tblAset tbody').on('click', '#btnEdit', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    $('#addAset').CardWidget('toggle')
    $("#flagSave").val("UPDATE");

    $("#txtNoAset").val(data.asset_num);
    $("#txtNoAset").attr("disabled", true);
    $("#txtNoSap").val(data.asset_sap_num);
    $("#txtTgl").val(convertJsonDateToShortDate(data.asset_received));
    $("#txtTgl").attr("disabled", true);
    $("#txtNama").val(data.asset_name);
    $("#ddStatus").val(data.asset_status);
    $("#ddKategori").val(data.asset_category);
    $("#ddTipe").val(data.type_code);
    $("#ddSite").val(data.asset_site);
    $("#txtLokasi").val(data.asset_location);
    $("#txtModel").val(data.asset_model);
    $("#ddMerk").val(data.asset_merk);
    $("#txtSn").val(data.asset_sn);
    $("#txtHarga").val(data.asset_price);
    $("#txtSpecification").val(data.asset_spec);

    if (data.asset_status == "1U") {
        $("#rowUsed").attr("hidden", false)
        $("#txtNikEmp").val(data.used_by);
        $("#txtNamaEmp").val(data.used_name);
        $("#txtJabatan").val(data.used_level_desc);
    }

    if (data.asset_photo == null) {
        document.getElementById("asetLabel").innerHTML = "Belum ada foto";
    }
    else {
        document.getElementById("asetLabel").innerHTML = data.asset_photo;
    }

    if (data.sn_photo == null) {
        document.getElementById("snLabel").innerHTML = "Belum ada foto";
    }
    else {
        document.getElementById("snLabel").innerHTML = data.sn_photo;
    }
})

$('#tblAset tbody').on('click', '#btnDelete', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);

    var S_DATA = data;
    S_DATA.created_at = convertJsonDateToShortDate(data.created_at);
    $.ajax({
        url: urlPath + "api/aset/delete",
        method: "POST",
        dataType: "json",
        cache: false,
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res)
            ClearData();
            alert(res.responseJSON.StatusMessage);
            loadGrid();
        }
    })
})

function Save() {
    var formData = new FormData();
    var uploadAset = document.getElementById("uploadAset");
    var uploadSn = document.getElementById("uploadSn");

    if (uploadAset != null) {
        for (i = 0; i < uploadAset.files.length; i++) {
            //Appending each file to FormData object
            formData.append(uploadAset.files[i].name, uploadAset.files[i]);
        }
    }

    if (uploadSn != null) {
        for (i = 0; i < uploadSn.files.length; i++) {
            //Appending each file to FormData object
            formData.append(uploadSn.files[i].name, uploadSn.files[i]);
        }
    }

    formData.append("asset_num", $("#txtNoAset").val());
    formData.append("asset_no_pr", $("#txtNoPr").val());
    formData.append("asset_no_sap", $("#txtNoSap").val());
    formData.append("asset_received", $("#txtTgl").val());
    formData.append("asset_name", $("#txtNama").val());
    formData.append("asset_status", $("#ddStatus").val());
    formData.append("used_by", $("#txtNikEmp").val());
    formData.append("asset_category", $("#ddKategori").val());
    formData.append("type_code", $("#ddTipe").val());
    formData.append("asset_site", $("#ddSite").val());
    formData.append("asset_location", $("#txtLokasi").val());
    formData.append("asset_model", $("#txtModel").val());
    formData.append("asset_merk", $("#ddMerk").val());
    formData.append("asset_sn", $("#txtSn").val());
    formData.append("asset_price", $("#txtHarga").val());
    formData.append("asset_spec", $("#txtSpecification").val());


    if ($("#flagSave").val() == "INSERT") {
        $.ajax({
            url: urlPath + "api/aset/insert",
            cache: false,
            method: "POST",
            data: formData,
            //contentType: "application/json; charset=utf-8",
            processData: false,
            contentType: false,
            enctype: "multipart/form-data",
            success: function (res) {
                ClearData();
                loadGrid();
                console.log(res)
                alert(res.StatusMessage);
            }
        })
    }
    else if ($("#flagSave").val() == "UPDATE") {
        $.ajax({
            url: urlPath + "api/aset/update",
            cache: false,
            method: "POST",
            data: formData,
            //contentType: "application/json; charset=utf-8",
            processData: false,
            contentType: false,
            enctype: "multipart/form-data",
            success: function (res) {
                ClearData();
                loadGrid();
                console.log(res);
                alert(res.StatusMessage);
            }
        })
    }

}

function ClearData() {
    $("#flagSave").val("INSERT");
    $('#addAset').CardWidget('toggle')

    $("#txtNoAset").attr("disabled", false);
    $('#txtTgl').val("");
    $("#txtNoAset").val("");
    $("#txtNoPp").val("");
    $("#txtNoPb").val("");
    $("#txtNamaAset").val("");
    $("#ddStatus").val("");
    $("#ddKategori").val("");
    $("#ddTipe").val("");
    $("#ddSite").val("");
    $("#txtLokasi").val("");
    $("#txtModel").val("");
    $("#ddMerk").val("");
    $("#txtSn").val("");
    $("#txtHarga").val("");
    $("#txtSpecification").val("");

    document.getElementById("asetLabel").innerHTML = "";
    document.getElementById("snLabel").innerHTML = "";
}

function convertJsonDateToShortDate(data) {
    // This function converts a json date to a short date
    // e.g. /Date(1538377200000)/ to 10/1/2018
    const dateValue = new Date(parseInt(data.substr(6)));
    return moment(dateValue).format("YYYY-MMM-DD");
}