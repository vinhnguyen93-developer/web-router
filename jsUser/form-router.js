//declare global variables
var recordRouter = 5;
var router_current = 0;
var resallRouter;

//declare variable for category
var dataSendCategory = {
    event: "getListCategory",
    page: 0,
    record: 20
}

//declare variable for producer
var dataSendProducer = {
    event: "getListProducer",
    page: 0,
    record: 20
}

$(".btn-add-router").click(function() {
    var nameRouter = $(".txt-name-router").val();
    var yearRouter = $(".txt-namsx").val();
    var addressRouter = $(".txt-noisx").val();
    var maLoaiRouter = $(".select-category").val();
    var maNsxRouter = $(".select-producer").val();
    var infoRouter = $(".txt-info-router").val();

    var userPost = localStorage.getItem("emailUser");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    if(nameRouter == "") {
        alertInfo("Tên router không được để trống !");
    } else if(checkDate(yearRouter) == false) {
        alertInfo("Năm sản xuất router không hợp lệ !");
    } else if(addressRouter == "") {
        alertInfo("Nơi sản xuất không được để trống !");
    } else {
        var data = {
            event: "insert",
            nameRouter: nameRouter,
            yearRouter: yearRouter,
            addressRouter: addressRouter,
            maLoaiRouter: maLoaiRouter,
            maNsxRouter: maNsxRouter,
            infoRouter: infoRouter,
            dayPost: today,
            userPost: userPost
        };

        queryDataPost("../php/router.php", data, function(res) {
            if(res.insert == 1) {
                alertSuccess("Thêm thành công !");

                buildListRouter(router_current, recordRouter);

                $(".txt-name-router").val("");
                $(".txt-namsx").val("");
                $(".txt-noisx").val("");
                $(".txt-info-router").val("");
            } else {
                alertError("Something wrong !");
            }
        });
    }
});

$(".btn-update-router").click(function() {
    var idRouter = $(".txt-ma-router").val();
    var nameRouter = $(".txt-name-router").val();
    var yearRouter = $(".txt-namsx").val();
    var addressRouter = $(".txt-noisx").val();
    var maLoaiRouter = $(".select-category").val();
    var maNsxRouter = $(".select-producer").val();
    var infoRouter = $(".txt-info-router").val();

    bootbox.confirm("Bạn có chắc muốn cập nhật router " + idRouter + " này không?", function(result) {
        if (result == true) {
            if(nameRouter == "") {
                alertInfo("Tên router không được để trống !");
            } else if(checkDate(yearRouter) == false) {
                alertInfo("Năm sản xuất router không hợp lệ !");
            } else if(addressRouter == "") {
                alertInfo("Nơi sản xuất không được để trống !");
            } else {
                var data = {
                    event: "update",
                    idRouter: idRouter,
                    nameRouter: nameRouter,
                    yearRouter: yearRouter,
                    addressRouter: addressRouter,
                    maLoaiRouter: maLoaiRouter,
                    maNsxRouter: maNsxRouter,
                    infoRouter: infoRouter
                };
        
                queryDataPost("../php/router.php", data, function(res) {
                    if(res.update == 1) {
                        alertSuccess("Cập nhật thành công !");
                        
                        buildListRouter(router_current, recordRouter);

                        $(".txt-name-router").val("");
                        $(".txt-namsx").val("");
                        $(".txt-noisx").val("");
                        $(".txt-info-router").val("");
                    } else {
                        alertError("Cập nhật thất bại !");
                    }
                });
            }
        }
    });
});

$(".btn-reset-router").click(function() {
    $(".txt-name-router").val("");
    $(".txt-namsx").val("");
    $(".txt-noisx").val("");
    $(".txt-info-router").val("");
});

buildListRouter(router_current, recordRouter);

//hàm hiển thị dữ liệu lên table
function buildListRouter(page, record) {
   
    var dataSend = {
		event: "getListRouter",
		page: page,
        record: record
    }
    
    $(".list-router").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/router.php", dataSend, function(res) {
        $(".list-router").html("");

        buildHTMLRouterData(res);
    });
}

function buildHTMLRouterData(res) {
   if(res.total == 0) {
    $(".list-router").html("Chưa có nội dung !");	
   }else {  
    var data = res.items;

    resallRouter = data;

    var stt = 1;
    var currentPage = parseInt(res.page);
    var html = '';
   
    stt = printSTT(recordRouter, currentPage);
    
    for(item in data) {
        var list = data[item];
      
        html = html +
            '<tr data-id="' + list.idRouter + '" data-name="' + list.nameRouter + '" data-index="' + item + '">' +			
            '<td>' + stt + '</td>' +
            '<td>' + list.nameRouter + '</td>' +
            '<td>' + list.yearRouter + '</td>' +
            '<td>' + list.addressRouter + '</td>' +
            '<td>' + list.infoRouter + '</td>' +
            '<td>' + list.nameCategory + '</td>' +
            '<td>' + list.nameProducer + '</td>' +
            '<td>' + list.emailUser + '</td>' +
            '<td>' + list.dayPost + '</td>' +
			'<td>' +
            '<button class="btn btn-primary btn-change-router">Thay đổi</button> ' +
            '<button class="btn btn-danger btn-delete-router">Xóa</button></td>' +
            '</td>'+
            '</tr>';

        stt++;
        
        $(".list-router").html(html)
    }

    buildSlidePage($(".page-number"), 5, res.page, res.totalPage);
   }
};

$(".page-number").on('click', 'button', function() {
    router_current = $(this).val();

    buildListRouter(router_current, recordRouter);
});

$(".list-router").on("click", ".btn-change-router", function() {
    var index = $(this).parents("tr").attr("data-index");

    $(".txt-ma-router").val(resallRouter[index].idRouter);
    $(".txt-name-router").val(resallRouter[index].nameRouter);
    $(".txt-namsx").val(resallRouter[index].yearRouter);
    $(".txt-noisx").val(resallRouter[index].addressRouter);
    $(".select-category").val(resallRouter[index].maLoaiRouter);
    $(".select-producer").val(resallRouter[index].maNsxRouter);
    $(".txt-info-router").val(resallRouter[index].infoRouter);
});

$(".list-router").on("click", ".btn-delete-router", function() {
    var idRouter = $(this).parents("tr").attr("data-id");
    var nameRouter = $(this).parents("tr").attr("data-name");

    bootbox.confirm(
        "Bạn có chắc muốn xoá router có tên là " + nameRouter + " này không?", function(result) {
          if (result == true) {
            var data = {
                event: "delete",
                idRouter: idRouter
            }

            queryDataPost("../php/router.php", data, function(res) {
                if(res.delete) {
                    alertSuccess("Đã xóa thành công !");

                    buildListRouter(router_current, recordRouter);

                    $(".txt-name-router").val("");
                    $(".txt-namsx").val("");
                    $(".txt-noisx").val("");
                    $(".txt-info-router").val("");
                } else {
                    alertError("something wrong!");
                }
            });
          }
        }
    );
});

//get data category
queryDataPost("../php/theloai.php", dataSendCategory, function(res) {
    $(".select-category").html("");

    buildHTMLCategoryData(res);
});


function buildHTMLCategoryData(res) {
    if(res.total == 0) {
        $(".select-category").html("Chưa có loại router !");	
    }else {  
        var data = res.items;
        var html = '';

        for(item in data) {
            var list = data[item];
        
            html = html + '<option value="' + list.idCategory + '">' + list.nameCategory + '</option>';
            
            $(".select-category").html(html)
        }
    }
};

//get data producer
queryDataPost("../php/nsx.php", dataSendProducer, function(res) {
    $(".select-producer").html("");

    buildHTMLProducerData(res);
});


function buildHTMLProducerData(res) {
    if(res.total == 0) {
        $(".select-producer").html("Chưa có nhà sản xuất !");	
    }else {  
        var data = res.items;
        var html = '';

        for(item in data) {
            var list = data[item];
        
            html = html + '<option value="' + list.idProducer + '">' + list.nameProducer + '</option>';
            
            $(".select-producer").html(html)
        }
    }
};