var urlPath = $("#urlPath").val();

$("#btnSave").click(function () {
    login()
})

function login() {
    const loading = document.querySelector('#modalOverlay');
    const modal = bootstrap.Modal.getInstance(loading);
    $('#modalOverlay').modal('show')


    var S_DATA = {
        username: $("#txtUsername").val(),
        password: $("#txtPassword").val(),
    }

    $.ajax({
        url: urlPath + 'api/user/login',
        type: 'POST',
        dataType: "json",
        cache: false,
        async: false,
        data: JSON.stringify({ model: S_DATA }),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            setTimeout(function () {
                console.log(res)
                if (res.StatusCode == 200) {
                    alert(res.StatusMessage)
                    window.location = urlPath + "login/role";
                    $('#modalOverlay').modal('hide')
                }
                else {
                    alert(res.StatusMessage)
                    $('#modalOverlay').modal('hide')
                }
            }, 3000)
            
        }
    })
}

$("#txtPassword").keypress(function (event) {
    if (event.keyCode == 13) {
        const loading = document.querySelector('#modalOverlay');
        const modal = bootstrap.Modal.getInstance(loading);
        $('#modalOverlay').modal('show')


        var S_DATA = {
            username: $("#txtUsername").val(),
            password: $("#txtPassword").val(),
        }

        $.ajax({
            url: urlPath + 'api/user/login',
            type: 'POST',
            dataType: "json",
            cache: false,
            async: false,
            data: JSON.stringify({ model: S_DATA }),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                setTimeout(function () {
                    console.log(res)
                    if (res.StatusCode == 200) {
                        alert(res.StatusMessage)
                        window.location = urlPath + "login/role";
                        $('#modalOverlay').modal('hide')
                    }
                    else {
                        alert(res.StatusMessage)
                        $('#modalOverlay').modal('hide')
                    }
                }, 3000)

            }
        })
    } else {
        
    }
})