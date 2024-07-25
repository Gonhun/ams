var urlPath = $("#urlPath").val();

$(document).ready(function () {
    loadDdType();
    loadDdDept();
    loadGrid();

    $("#flagSave").val("INSERT");
})

$("#btnSave").click(function () {
    Save();
})

$("#btnCancel").click(function () {
    Cancel();
})

function loadGrid() {
    $.ajax({
        url: urlPath + 'itsm/api/standard/get',
        cache: false,
        method: "POST",
        //data: JSON.stringify({ parameter: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblStandard').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                //"autoWidth": true,
                "columns": [
                    {
                        'data': 'id',
                        className: 'dt-nowrap align-center',
                        render: function (data, type, row) {
                            return `
                                    <button class="btn btn-icon btn-success" id="btnEdit">
                                        <i class="fas fa-pen-square"></i>
                                    </button>&nbsp;
                                    <button class="btn btn-icon btn-primary" id="btnDelete">
                                    <i class="fas fa-trash"></i>
                                    </button>&nbsp;`;
                        },
                        sortable: false,
                    },
                    {
                        'data': 'type_code',
                        className: 'dt-body-left dt-head-left',
                        render: function (data, type, row) {
                            return row.type_name;
                        }
                    },
                    {
                        'data': 'standard_dept',
                        className: 'dt-body-left dt-head-left',
                    },
                    {
                        'data': 'standard_lvl',
                        className: 'dt-body-left dt-head-left',
                    },
                    {
                        'data': 'lvl_name',
                        className: 'dt-body-left dt-head-left',
                    },
                    {
                        'data': 'standard_spec',
                        className: 'dt-body-left dt-head-left dt-wrap',
                    },
                    {
                        'data': 'standard_app',
                        className: 'dt-body-left dt-head-left dt-wrap',
                    }
                ],
            })
        }
    })
}

$('#tblStandard tbody').on('click', '#btnEdit', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    document.getElementById("addStandard").classList.remove("collapsed-card");
    $("#flagSave").val("UPDATE");

    $("#txtId").val(data.id);
    $("#txtId").attr("disabled", true);

    $("#ddTipe").val(data.type_code);
    $("#ddTipe").attr("disabled", true);

    $("#ddDept").val(data.standard_dept);
    $("#ddDept").attr("disabled", true);

    $("#txtLevel").val(data.standard_lvl);
    $("#txtLevel").attr("disabled", true);

    $("#txtNama").val(data.lvl_name);
    $("#txtNama").attr("disabled", true);

    $("#txtSpec").val(data.standard_spec);
    $("#txtApp").val(data.standard_app);

})

$('#tblStandard tbody').on('click', '#btnDelete', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    var S_DATA = {
        id:data.id
    }

    $.ajax({
        url: urlPath + 'itsm/api/standard/delete',
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
})

function loadDdDept() {
    var i = 0;
    $.ajax({
        url: urlPath + '/itsm/api/standard/get/dept',
        cache: false,
        method: "POST",
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddDept").empty();

            console.log(res)
            let rowDept = res.responseJSON.Value;

            document.getElementById("ddDept").innerHTML = document.getElementById("ddDept").innerHTML + "<option value=''>---PILIH---</option>";
            while (i < rowDept.length) {
                //console.log(document.getElementById("ddRole").innerHTML);

                document.getElementById("ddDept").innerHTML = document.getElementById("ddDept").innerHTML + "<option value='" + rowDept[i]["dept_code"] + "'>" + rowDept[i]["dept_name"] + "</option>";

                i++;

            }
        }
    })
}

function loadDdType() {
    var i = 0;
    $.ajax({
        url: urlPath + '/itsm/api/tipeaset/get',
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

function Save() {
    var S_DATA = {
        id: $("#txtId").val(),
        type_code: $("#ddTipe").val(),
        standard_dept: $("#ddDept").val(),
        standard_lvl: $("#txtLevel").val(),
        lvl_name: $("#txtNama").val(),
        standard_spec: $("#txtSpec").val(),
        standard_app: $("#txtApp").val(),
    }


    if ($("#flagSave").val() == "INSERT") {
        $.ajax({
            url: urlPath + 'itsm/api/standard/insert',
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
            url: urlPath + 'itsm/api/standard/update',
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
}

function Cancel() {
    $("#flagSave").val("INSERT");
    $("#ddTipe").val("");
    $("#ddTipe").attr("disabled", false);
    $("#ddDept").val("");
    $("#ddDept").attr("disabled", false);
    $("#txtLevel").val("");
    $("#txtLevel").attr("disabled", false);
    $("#txtNama").val("");
    $("#txtNama").attr("disabled", false);
    $("#txtSpec").val("");
    $("#txtApp").val("");
}