//declare global variables
var user_current = 0;
var recordUser = 5;
var resallUser;

$(".btn-register").click(function() {
    var email = $(".txt-email").val();
    var name = $(".txt-name").val();
    var phone = $(".txt-phone").val();
    var password = $(".txt-password").val();
    var gender;

    if($(".radio-male").is(":checked")) {
        gender = $(".radio-male").val();
    } else if($(".radio-female").is(":checked")) {
        gender = $(".radio-female").val();
    }

    if(name == "") {
        alertInfo("Tên không được để trống !");
    } else if(phone.length != 10 || isNumber(phone) == false) {
        alertInfo("Số điện thoại không hợp lệ !");
    } else if(validateEmail(email) == false) {
        alertInfo("Email không hợp lệ !");
    } else if(password == "") {
        alertInfo("Mật khẩu không được để trống !");
    } else {
        var data = {
            event: "insert",
            email: email,
            name: name,
            phone: phone,
            password: password,
            gender: gender
        };

        queryDataPost("../php/user.php", data, function(res) {
            if(res.insert == 1) {
                location.href = "./login.html"
            } else {
                alertError("Email tài khoản đã tồn tại !");
            }
        });
    }
});

$(".btn-update-user").click(function() {
    var email = $(".txt-email").val();
    var name = $(".txt-name").val();
    var phone = $(".txt-phone").val();
    var password = $(".txt-password").val();

    bootbox.confirm("Bạn có chắc muốn cập nhật tài khoản " + email + " này không?", function(result) {
        if (result == true) {
            if(name == "") {
                alertInfo("Tên không được để trống !");
            } else if(phone.length != 10 || isNumber(phone) == false) {
                alertInfo("Số điện thoại không hợp lệ !");
            } else if(password == "") {
                alertInfo("Mật khẩu không được để trống !");
            } else {
                var data = {
                    event: "updateByAdmin",
                    email: email,
                    name: name,
                    phone: phone
                };
        
                queryDataPost("../php/user.php", data, function(res) {
                    console.log(res);
                    if(res.update == 1) {
                        alertSuccess("Cập nhật thành công !");
                        
                        buildListUser(user_current, recordUser);
        
                        $(".txt-email").val("");
                        $(".txt-name").val("");
                        $(".txt-phone").val("");
                        $(".txt-password").val("");
                    } else {
                        alertError("Cập nhật thất bại !");
                    }
                });
            }
        }
    });
});

$(".btn-reset-user").click(function() {
    $(".txt-email").val("");
    $(".txt-name").val("");
    $(".txt-phone").val("");
    $(".txt-password").val("");
});

buildListUser(user_current, recordUser);

//hàm hiển thị dữ liệu lên table
function buildListUser(page, record) {
   
    var data = {
		event: "getListUser",
		page: page,
        record: record
    }
    
    $(".list-user").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/user.php", data, function(res) {
        $(".list-user").html("");

        buildHTMLUserData(res);
    });
}

function buildHTMLUserData(res) {
   if(res.total == 0) {
    $(".list-user").html("Chưa có nội dung !");	
   }else {  
    var data = res.items;

    resallUser = data;

    var stt = 1;
    var currentPage = parseInt(res.page);
    var html = '';
   
    stt = printSTT(recordUser, currentPage);
    
    for(item in data) {
        var list = data[item];
      
        html = html +
            '<tr data-email="' + list.email + '" data-name="' + list.nameUser + '" data-index="' + item + '">' +			
            '<td>' + stt + '</td>' +
			'<td>' + list.email + '</td>' +
            '<td>' + list.nameUser + '</td>' +
            '<td>' + list.phone + '</td>' +
            '<td>' + list.gender + '</td>' +
			'<td>' +
            '<button class="btn btn-primary btn-change-user">Thay đổi</button> ' +
            '<button class="btn btn-danger btn-delete-user">Xóa</button></td>' +
            '</td>'+
            '</tr>';

        stt++;
        
        $(".list-user").html(html)
    }

    buildSlidePage($(".page-number"), 5, res.page, res.totalPage);
   }
}


$(".page-number").on('click', 'button', function() {
    user_current = $(this).val();
    buildListUser(user_current, recordUser);
});

$(".list-user").on("click", ".btn-change-user", function() {
    var index = $(this).parents("tr").attr("data-index");

    $(".txt-email").val(resallUser[index].email);
    $(".txt-name").val(resallUser[index].nameUser);
    $(".txt-phone").val(resallUser[index].phone);
    $(".txt-gender").val(resallUser[index].gender);
});

$(".list-user").on("click", ".btn-delete-user", function() {
    var email = $(this).parents("tr").attr("data-email");

    bootbox.confirm(
        "Bạn có chắc muốn xoá tài khoản " + email + " này không?", function(result) {
          if (result == true) {
            var data = {
                event: "delete",
                email: email
            }

            queryDataPost("../php/user.php", data, function(res) {
                if(res.delete) {
                    alertSuccess("Đã xóa thành công !");

                    buildListUser(user_current, recordUser);

                    $(".txt-email-user").val("");
                    $(".txt-name-user").val("");
                    $(".txt-phone").val("");
                    $(".txt-password").val("");
                } else {
                    alertError("something wrong!");
                }
            });
          }
        }
    );
});