buildProfileUser();

//hàm hiển thị dữ liệu lên table
function buildProfileUser() {
    var email = localStorage.getItem("emailUser");
   
    var dataSend = {
        event: "getUserLocal",
        email: email
    }
    
    $(".show-profile").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/user.php", dataSend, function(res) {
        $(".show-profile").html("");

        buildHTMLProfileData(res);
    });
}

function buildHTMLProfileData(res) {
    var data = res.items;
    var html = '';
    
    for(item in data) {
        var list = data[item];
    
        html = html +
        '<div class="panel-body profile-information" data-email="' + list.email + '" data-name="' + list.nameUser + '" data-phone="' + list.phone + '">' +
            '<div class="col-md-3">' +
                '<div class="profile-pic text-center">' +
                    '<img src="https://picsum.photos/300/300" alt=""/>' +
                '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
                '<div class="profile-desk">' +
                    '<h1>' + list.nameUser + '</h1>' +
                    '<span class="text-muted" style="padding-top: 7px;">Email: <b>' + list.email + '</b></span><br/>' +
                    '<button class="btn btn-primary mt-5 btn-update">Thay đổi</button>' +
                '</div>' +
            '</div>' +
            '<div class="col-md-3">' +
                '<div class="profile-statistics">' +
                    '<h4>Số điện thoại: ' + list.phone + '</h4>' +
                    '<h4>Giới tính: ' + list.gender + '</h4>' +
                    '<ul style="padding-top: 15px;">' +
                        '<li>' +
                            '<a href="#">' +
                                '<i class="fa fa-facebook"></i>' +
                            '</a>' +
                        '</li>' +
                        '<li class="active">' +
                            '<a href="#">' +
                                '<i class="fa fa-twitter"></i>' +
                            '</a>' +
                        '</li>' +
                        '<li>' +
                            '<a href="#">' +
                                '<i class="fa fa-google-plus"></i>' +
                            '</a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>' +
        '</div>';
            
        $(".show-profile").html(html);
    }
};

$(".show-profile").on("click", ".btn-update", function() {
    
    var email = $(this).parents(".panel-body").attr("data-email");
    var nameUser = $(this).parents(".panel-body").attr("data-name");
    var phone = $(this).parents(".panel-body").attr("data-phone");

    $(".txt-email").val(email);
    $(".txt-name").val(nameUser);
    $(".txt-phone").val(phone);

    $(".show-modal-update").modal("show");
});

$(".btn-update-user").click(function() {

    var email = $(".txt-email").val();
    var nameUser = $(".txt-name").val();
    var phone = $(".txt-phone").val();
    var password = $(".txt-password").val();

    if(nameUser == "") {
        alertInfo("Tên không được để trống !");
    } else if(phone.length != 10 || isNumber(phone) == false) {
        alertInfo("Số điện thoại không hợp lệ !");
    } else if(password == "") {
        alertInfo("Mật khẩu không được để trống !");
    } else {
        var data = {
            event: "update",
            email: email,
            name: nameUser,
            phone: phone,
            password: password
        };

        queryDataPost("../php/user.php", data, function(res) {
            if(res.update == 1) {
                alertSuccess("Cập nhật thành công !");

                location.reload();

                $(".txt-name").val("");
                $(".txt-phone").val("");
                $(".txt-password").val("");
            } else {
                alertError("Cập nhật thất bại !");
            }
        });
    }
});

checkUser();