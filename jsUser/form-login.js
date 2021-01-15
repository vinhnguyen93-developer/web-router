$(".btn-login").click(function() {
    var email = $(".text-email").val();
    var password = $(".text-password").val();

    if(email == "") {
        alertError("Tên đăng nhập không được để trống.");
    } else if(password == "") {
        alertError("Password không được để trống.");
    } else {
        var data = {
            event: "login",
            email: email,
            password: password
        }

        queryDataPost("../php/login.php", data, function(res) {

            if(res.event == 1) {
                if($(".remember").is(":checked")) {
                    localStorage.setItem("nameUser", res.items.nameUser);
                    localStorage.setItem("emailUser", res.items.email);
                }
                
                location.href = "../index.html";
            } else {
                alertInfo("Email hoặc mật khẩu đăng nhập sai.");
            }
        });
    }
});