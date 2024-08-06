var urlPath = $("#urlPath").val();
$(document).ready(function () {
    loadGrid()
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
        url: urlPath + 'api/merkaset/get',
        cache: false,
        method: "POST",
        //data: JSON.stringify({ parameter: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblMerk').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                //"autoWidth": true,
                "columns": [
                    {
                        'data': 'merk_code',
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
                        'data': 'merk_code',
                        className: 'dt-body-center dt-head-center'
                    },
                    {
                        'data': 'merk_name',
                        className: 'dt-body-center dt-head-center',
                    },

                ],
            })
        }
    })
}

$('#tblMerk tbody').on('click', '#btnEdit', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    $("#flagSave").val("UPDATE");
    document.getElementById("addMerk").classList.remove("collapsed-card");
    $("#txtId").val(data.merk_code);
    $("#txtId").attr("disabled", true);

    $("#txtMerk").val(data.merk_name);
})

$('#tblMerk tbody').on('click', '#btnDelete', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    var S_DATA = {
        merk_code: data.merk_code,
        merk_name: data.merk_name
    }

    $.ajax({
        url: urlPath + 'api/merkaset/delete',
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

function Save() {
    var S_DATA = {
        merk_code: $("#txtId").val(),
        merk_name: $("#txtMerk").val()
    }

    if ($("#flagSave").val() == "INSERT") {
        $.ajax({
            url: urlPath + 'api/merkaset/insert',
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
            url: urlPath + 'api/merkaset/update',
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
    $("#txtId").val("")
    $("#txtId").attr("disabled", false);
    $("#txtMerk").val("")
    $("#flagSave").val("INSERT");
}
