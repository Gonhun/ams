var urlPath = $("#urlPath").val();
$(document).ready(function () {
    loadGrid()
})

$("#btnSave").click(function () {
    Save();
})

$("#btnCancel").click(function () {
    Cancel();
})

function loadGrid() {
    $.ajax({
        url: urlPath + 'itsm/api/tipeaset/get',
        cache: false,
        method: "POST",
        //data: JSON.stringify({ parameter: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            table1 = $('#tblTipe').DataTable({
                "data": res.responseJSON.Value,
                "destroy": true,
                "scrollX": true,
                "pageLength": 10,
                //"autoWidth": true,
                "columns": [
                    {
                        'data': 'type_code',
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
                        className: 'dt-body-center dt-head-center'
                    },
                    {
                        'data': 'type_name',
                        className: 'dt-body-center dt-head-center',
                    },
                    
                ],
            })
        }
    })
}

$('#tblTipe tbody').on('click', '#btnEdit', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    document.getElementById("addType").classList.remove("collapsed-card");
    $("#txtId").val(data.type_code);
    $("#txtId").attr("disabled", true);

    $("#txtType").val(data.type_name);
})

$('#tblTipe tbody').on('click', '#btnDelete', function () {
    var data = table1.row($(this).parents('tr')).data();
    console.log(data);
    var S_DATA = {
        type_code: data.type_code,
        type_name: data.type_name
    }

    $.ajax({
        url: urlPath + 'itsm/api/tipeaset/delete',
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
        type_code: $("#txtId").val(),
        type_name: $("#txtType").val()
    }

    $.ajax({
        url: urlPath + 'itsm/api/tipeaset/insert',
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

function Cancel() {
    $("#txtId").val("")
    $("#txtId").attr("disabled", false);
    $("#txtType").val("")
}
