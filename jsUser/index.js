//Xuất thông báo bằng alert khi thao tác thất bại
function alertError(mes) {
    bootbox.alert({
        size: 'small',
        title: '<span style="color: red"> Thất bại</span>',
        message: mes,
        callback: function() { /* your callback code */}
    });
}

//Xuất thông báo thành công bằng alert khi thao tác thành công
function alertSuccess(mes, callback) {
    bootbox.alert({
        size: 'small',
        title: 'Thành công',
        message: mes,
        callback: callback
    });
}

//Xuất thông báo bằng alert khi hiển thị thông tin
function alertInfo(mes) {
    bootbox.alert({
        size: 'small',
        title: 'Thông báo',
        message: mes,
        callback: function() { /* your callback code */}
    });
}

//Hàm kiểm tra một chuỗi có phải là số không
function isNumber(number) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(number);
}

//Hàm kiểm tra địa chỉ email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Hàm check ngày tháng năm
function checkDate(strDate) {
    var comp = strDate.split('/');

    var d = parseInt(comp[0], 10);
    var m = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);

    var date = new Date(y,m-1,d);

    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
        return true;
    }
    
    return false;
}

//Hàm gửi dữ liệu tới database
function queryDataPost(url, dataSend, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: dataSend,
        async: true,
        dataType: "json",
        success: callback
    });
}

//hàm lấy dữ liệu từ server
function queryDataGet(url, dataSend, callback) {
    $.ajax({
        type: "GET",
        url: url,
        data: dataSend,
        async: true,
        dataType: "json",
        success: callback
    });
}

//hàm hiển thị phân trang
function buildSlidePage(obj, codan, pageActive, totalPage) {
    var html = "";
  
    pageActive = parseInt(pageActive);
  
    for(i = 1 ; i <= codan; i++) {
        if(pageActive - i < 0) break;

        html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">' + (pageActive - i + 1) + '</button>' + html;
    }
  
    if(pageActive > codan) {
        html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">...</button>' + html;
    }
  
    html += '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' + pageActive + '">' + (pageActive + 1) + '</button>';
    
    for(i = 1 ; i <= codan; i++) {
        if(pageActive + i >= totalPage) break;

        html = html+'<button  type="button" class="btn btn-outline btn-default" value="' + (pageActive + i) + '">' + (pageActive + i + 1) + '</button>';
    }
  
    if(totalPage - pageActive > codan + 1) {
        html = html + '<button type="button" value="' + (pageActive + i) + '" class="btn btn-outline btn-default">...</button>';
    }
  
    obj.html(html);
}
  
//hàm in số thứ tự page
function printSTT(record, pageCurr) {
    if((pageCurr + 1) == 1) {
        return 1;
    }else {
        return record * (pageCurr + 1) - (record - 1);
    }
}

$(".btn-logout").click(function() {
    logout();
});

//Hàm logout
function logout() {
    localStorage.removeItem("emailUser");
    localStorage.removeItem("nameUser");
  
    location.href = "../index.html";
}

function buildUserDropdown() {
    var user = localStorage.getItem("emailUser");
    var nameUser = localStorage.getItem("nameUser");

    if(user == undefined || user == null || user == "") {
        location.href = "./login.html";
    } else if(user == "admin") {
        $(".menu-user").css({'display': 'block'});
        $(".display").css({'display': 'block'});
        $(".username").html(nameUser);
    } else {
        $(".display").css({'display': 'block'});
        $(".username").html(nameUser);
    }	
};

function checkUser() {
    var user = localStorage.getItem("emailUser");
    var nameUser = localStorage.getItem("nameUser");

    if(user == "admin") {
        $(".menu-user").css({'display': 'block'});
        $(".display").css({'display': 'block'});
        $(".username").html(nameUser);
    } else if(user == null) {
        return;
    } else {
        $(".display").css({'display': 'block'});
        $(".username").html(nameUser);
    }
}