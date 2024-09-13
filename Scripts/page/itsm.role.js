var urlPath = $("#urlPath").val();
$(document).ready(function () {
    loadDdSite();
})

$("#btnSignIn").click(function () {
    SignIn();
})

$("#btnCancel").click(function () {
    window.location = urlPath + "login";
})

$("#ddSite").change(function () {
    $("#ddRole").empty();
    if ($("#ddSite").val() != "") {
        loadDdRole();
    }
})

function loadDdSite() {
    var i = 0;
    $.ajax({
        url: urlPath + 'api/user/getsite',
        cache: false,
        method: "POST",
        data: JSON.stringify({ nik: $("#txtNik").val() }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddSite").empty();

            console.log(res)

            if (res.responseJSON.StatusCode != 200) {
                alert(res.responseJSON.StatusMessage);
            }
            else {
                let rowRole = res.responseJSON.Value;
                document.getElementById("ddSite").innerHTML = document.getElementById("ddSite").innerHTML + "<option value=''>---PILIH SITE---</option>";
                while (i < rowRole.length) {
                    //console.log(document.getElementById("ddRole").innerHTML);

                    document.getElementById("ddSite").innerHTML = document.getElementById("ddSite").innerHTML + "<option value='" + rowRole[i]["site"] + "'>" + rowRole[i]["site"] + "</option>";

                    i++;

                }
            }
        }
    })
}

function loadDdRole() {
    var i = 0;

    $.ajax({
        url: urlPath + 'api/user/getrole',
        cache: false,
        method: "POST",
        data: JSON.stringify({ nik: $("#txtNik").val(), site: $("#ddSite").val() }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            $("#ddRole").empty();

            console.log(res)

            if (res.responseJSON.StatusCode != 200) {
                alert(res.responseJSON.StatusMessage);
            }
            else {
                let rowRole = res.responseJSON.Value;
                document.getElementById("ddRole").innerHTML = document.getElementById("ddRole").innerHTML + "<option value=''>---PILIH ROLE---</option>";
                while (i < rowRole.length) {
                    //console.log(document.getElementById("ddRole").innerHTML);

                    document.getElementById("ddRole").innerHTML = document.getElementById("ddRole").innerHTML + "<option value='" + rowRole[i]["role_id"] + "'>" + rowRole[i]["role_name"] + "</option>";

                    i++;

                }
            }
        }
    })
}

function SignIn() {
    const loading = document.querySelector('#modalOverlay');
    const modal = bootstrap.Modal.getInstance(loading);
    $('#modalOverlay').modal('show')

    var S_DATA = {
        username: $("#txtNik").val(),
        site: $("#ddSite").val(),
        role_id: $("#ddRole").val()
    }

    $.ajax({
        url: urlPath + 'api/user/setrole',
        cache: false,
        method: "POST",
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        complete: function (res) {
            console.log(res);
            setTimeout(function () {
                if (res.responseJSON.StatusCode == 200) {
                    alert(res.responseJSON.StatusMessage)
                    window.location = urlPath + "";
                }
                else {
                    alert(res.responseJSON.StatusMessage)
                    $('#modalOverlay').modal('hide')
                }
            }, 3000)

        }
    })
}