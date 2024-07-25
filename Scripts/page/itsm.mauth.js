var urlPath = $("#urlPath").val()

$(document).ready(function () {
    loadGrid();
    $("#flagSave").val("INSERT")
})

$("#btnSearch").click(function () {
    loadNrp();
})

$("#btnSave").click(function () {
    Save();
    loadGrid();
})

function loadGrid() {
    var collapsedGroups = {};

    $.ajax({
        url: urlPath + '/itsm/api/user/get',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblAuth').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                //"autoWidth": true,
                "columns": [
                    {
                        'data': 'id',
                        className: 'align-middle dt-nowrap',
                        render: function (data, type, row) {
                            if (row.is_active == true) {
                                return `
                                    <button class="btn btn-icon btn-danger" id="btnDisable">
                                        <i class="mdi mdi-cancel"></i>
                                    </button>&nbsp;`;
                            }
                            else {
                                return `
                                    <button class="btn btn-icon btn-success" id="btnEnable">
                                        <i class="mdi mdi-check"></i>
                                    </button>&nbsp;`;
                            }
                        },
                        sortable: false,
                    },
                    {
                        'data': 'nik',
                        className: 'dt-nowrap align-middle'
                    },
                    {
                        'data': 'nama',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'kode_jb',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            return row.jabatan;
                        }
                    },
                    {
                        'data': 'acc_dept',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'acc_site',
                        className: 'dt-head-center dt-nowrap align-middle'
                    },
                    {
                        'data': 'acc_code',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            return row.acc_name;
                        }
                    },
                    {
                        'data': 'is_active',
                        className: 'dt-head-center dt-nowrap align-middle',
                        render: function (data, type, row) {
                            if (row.is_active == true) {
                                return "AKTIF";
                            }
                            else {
                                return "NON AKTIF";
                            }
                        }
                    },
                ],
                order: [[4, 'asc']],
                rowGroup: {
                    dataSrc: 'acc_dept',
                    startRender: function (rows, group) {
                        var collapsed = !!collapsedGroups[group];

                        rows.nodes().each(function (r) {
                            r.style.display = 'none';
                            if (collapsed) {
                                r.style.display = '';
                            }
                        });

                        // Add category name to the <tr>. NOTE: Hardcoded colspan
                        return $('<tr/>')
                            .append('<td colspan="8">' + group + ' (' + rows.count() + ')</td>')
                            .attr('data-name', group)
                            .toggleClass('collapsed', collapsed);
                    }
                }
            })
            $('#tblAuth tbody').on('click', 'tr.dtrg-start', function () {
                var name = $(this).data('name');
                collapsedGroups[name] = !collapsedGroups[name];
                table1.draw(false);
            });

        }
    })
}

$('#tblAuth tbody').on('click', '#btnEnable', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);

    var S_DATA = data;
    S_DATA.is_active = true;

    $.ajax({
        url: urlPath + 'itsm/api/user/update',
        type: 'POST',
        dataType: "json",
        cache: false,
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (e) {
            loadGrid();
            alert(e.responseJSON.StatusMessage);
        }
    })
})

$('#tblAuth tbody').on('click', '#btnDisable', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);

    var S_DATA = data;
    S_DATA.is_active = false;

    $.ajax({
        url: urlPath + 'itsm/api/user/update',
        type: 'POST',
        dataType: "json",
        cache: false,
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (e) {
            loadGrid();
            alert(e.responseJSON.StatusMessage);
        }
    })
})

function loadNrp() {
    if ($("#txtNik").val() == "") {
        alert("nik harus diisi");
    }
    else {
        var i = 0;
        $.ajax({
            url: urlPath + '/itsm/api/user/get/emp',
            cache: false,
            data: JSON.stringify({ nik: $("#txtNik").val() }),
            method: "POST",
            contentType: "application/json; charset=utf-8",
            complete: function (res) {
                console.log(res.responseJSON);
                alert(res.responseJSON.StatusMessage)
                $("#txtNama").val(res.responseJSON.Value.name);
                $("#txtKodeJb").val(res.responseJSON.Value.kode_jb);
                $("#txtJab").val(res.responseJSON.Value.jabatan);
                $("#txtDept").val(res.responseJSON.Value.kode_dp);
                $("#txtSite").val(res.responseJSON.Value.kode_st);
            }
        })
    }
}  

function Save() {
    var S_DATA = {
        id: $("#txtId").val(),
        nik: $("#txtNik").val(),
        acc_code: $("#ddAkses").val(),
        acc_dept: $("#txtDept").val(),
        acc_site: $("#txtSite").val(),
        app_code: $("#txtAppCode").val(),
    }


    if ($("#flagSave").val() == "INSERT") {
        $.ajax({
            url: urlPath + 'itsm/api/user/insert',
            type: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify({ model: S_DATA }),
            contentType: "application/json; charset=utf-8",
            complete: function (e) {
                Cancel();
                loadGrid();
                alert(e.responseJSON.StatusMessage);
            }
        })
    }
    else if ($("#flagSave").val() == "UPDATE") {
        $.ajax({
            url: urlPath + 'itsm/api/user/update',
            type: 'POST',
            dataType: "json",
            cache: false,
            data: JSON.stringify({ model: S_DATA }),
            contentType: "application/json; charset=utf-8",
            complete: function (e) {
                Cancel();
                alert(e.responseJSON.StatusMessage);
            }
        })
    }
}

function Cancel() {
    $("#txtId").val("")
    $("#txtNik").val("")
    $("#ddAkses").val("")
    $("#txtDept").val("")
    $("#txtNama").val("")
    $("#txtKodeJb").val("")
    $("#txtJabatan").val("")
    $("#txtSite").val("")
}