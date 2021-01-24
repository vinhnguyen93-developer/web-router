//declare global variables
var recordProducer = 5;
var producer_current = 0;
var resallProducer;

$(".btn-add-producer").click(function() {
    var nameProducer = $(".txt-name-producer").val();
    var phoneProducer = $(".txt-phone").val();
    var addressProducer = $(".txt-address").val();
    var yearProducer = $(".txt-year").val();

    if(nameProducer == "") {
        alertInfo("Tên nhà sản xuất không được để trống !");
    } else if(phoneProducer.length != 10 || isNumber(phoneProducer) == false) {
        alertInfo("Số điện thoại không hợp lệ !");
    } else if(checkDate(yearProducer) == false) {
        alertInfo("Năm thành lập không hợp lệ !");
    } else {
        var data = {
            event: "insert",
            nameProducer: nameProducer,
            phoneProducer: phoneProducer,
            addressProducer: addressProducer,
            yearProducer: yearProducer
        };

        queryDataPost("../php/nsx.php", data, function(res) {
            if(res.insert == 1) {
                alertSuccess("Thêm thành công !");

                buildListProducer(producer_current, recordProducer);

                $(".txt-name-producer").val("");
                $(".txt-phone").val("");
                $(".txt-address").val("");
                $(".txt-year").val("");
            } else {
                alertError("Thêm thất bại !");
            }
        });
    }
});

$(".btn-update-producer").click(function() {
    var idProducer = $(".txt-id-producer").val();
    var nameProducer = $(".txt-name-producer").val();
    var phoneProducer = $(".txt-phone").val();
    var addressProducer = $(".txt-address").val();
    var yearProducer = $(".txt-year").val();

    bootbox.confirm("Bạn có chắc muốn cập nhật nhà sản xuất " + idProducer + " này không?", function(result) {
        if (result == true) {
            if(nameProducer == "") {
                alertInfo("Tên nhà sản xuất không được để trống !");
            } else if(phoneProducer.length != 10 || isNumber(phoneProducer) == false) {
                alertInfo("Số điện thoại không hợp lệ !");
            } else if(checkDate(yearProducer) == false) {
                alertInfo("Năm thành lập không hợp lệ !");
            } else {
                var data = {
                    event: "update",
                    idProducer: idProducer,
                    nameProducer: nameProducer,
                    phoneProducer: phoneProducer,
                    addressProducer: addressProducer,
                    yearProducer: yearProducer
                };
        
                queryDataPost("../php/nsx.php", data, function(res) {
                    if(res.update == 1) {
                        alertSuccess("Cập nhật thành công !");

                        buildListProducer(producer_current, recordProducer);
        
                        $(".txt-id-producer").val("");
                        $(".txt-name-producer").val("");
                        $(".txt-phone").val("");
                        $(".txt-address").val("");
                        $(".txt-year").val("");
                    } else {
                        alertError("Cập nhật thất bại !");
                    }
                });
            }
        }
    });
});

$(".btn-reset-producer").click(function() {
    $(".txt-name-producer").val("");
    $(".txt-phone").val("");
    $(".txt-address").val("");
    $(".txt-year").val("");
});

buildListProducer(producer_current, recordProducer);

//hàm hiển thị dữ liệu lên table
function buildListProducer(page, record) {
   
    var data = {
		event: "getListProducer",
		page: page,
        record: record
    }
    
    $(".list-producer").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/nsx.php", data, function(res) {
        $(".list-producer").html("");

        buildHTMLProducerData(res);
    });
}

function buildHTMLProducerData(res) {
   if(res.total == 0) {
    $(".list-producer").html("Chưa có nội dung !");	
   } else {  
    var data = res.items;

    resallProducer = data;

    var stt = 1;
    var currentPage = parseInt(res.page);
    var html = '';
   
    stt = printSTT(recordProducer, currentPage);
    
    for(item in data) {
        var list = data[item];
      
        html = html +
            '<tr data-id="' + list.idProducer + '" data-name="' + list.nameProducer + '" data-index="' + item + '">' +			
            '<td>' + stt + '</td>' +
            '<td>' + list.nameProducer + '</td>' +
            '<td>' + list.phoneProducer + '</td>' +
            '<td>' + list.addressProducer + '</td>' +
            '<td>' + list.yearProducer + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-change-producer">Thay đổi</button> ' +
            '<button class="btn btn-danger btn-delete-producer">Xóa</button></td>' +
            '</td>'+
            '</tr>';

        stt++;
        
        $(".list-producer").html(html)
    }

    buildSlidePage($(".page-number"), 5, res.page, res.totalPage);
   }
}

$(".page-number").on('click', 'button', function() {
    producer_current = $(this).val();

    buildListProducer(producer_current, recordProducer);
});

$(".list-producer").on("click", ".btn-change-producer", function() {
    var index = $(this).parents("tr").attr("data-index");

    $(".txt-id-producer").val(resallProducer[index].idProducer);
    $(".txt-name-producer").val(resallProducer[index].nameProducer);
    $(".txt-phone").val(resallProducer[index].phoneProducer);
    $(".txt-address").val(resallProducer[index].addressProducer);
    $(".txt-year").val(resallProducer[index].yearProducer);
});

$(".list-producer").on("click", ".btn-delete-producer", function() {
    var idProducer = $(this).parents("tr").attr("data-id");
    var nameProducer = $(this).parents("tr").attr("data-name");

    bootbox.confirm(
        "Bạn có chắc muốn xoá nhà sản xuất có tên là " + nameProducer + " này không?", function(result) {
          if (result == true) {
            var data = {
                event: "delete",
                idProducer: idProducer
            }

            queryDataPost("../php/nsx.php", data, function(res) {
                if(res.delete) {
                    alertSuccess("Đã xóa thành công !");

                    buildListProducer(producer_current, recordProducer);
                } else {
                    alertError("something wrong!");
                }
            });
          }
        }
    );
});

buildUserDropdown();