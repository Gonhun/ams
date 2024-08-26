var urlPath = $("#urlPath").val();

$("#btnSave").click(function () {
    var S_DATA = {
        username: $("#txtNik").val(),
        password: $("#txtPass").val(),
    }

    $.ajax({
        url: urlPath + 'api/user/changepass',
        type: 'POST',
        dataType: "json",
        cache: false,
        async: false,
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#txtPass").val("");
            alert(res.responseJSON.StatusMessage);
        }
    })
})

$("#btnCancel").click(function () {
    $("#txtPass").val("");
})