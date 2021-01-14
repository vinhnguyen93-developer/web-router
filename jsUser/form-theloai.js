var recordCategory = 5;
var category_current = 0;
var resallCategory;

$(".btn-add-category").click(function() {
    var nameCategory = $(".txt-name-category").val();

    if(nameCategory == "") {
        alertInfo("Tên thể loại không được để trống !");
    }  else {
        var data = {
            event: "insert",
            nameCategory: nameCategory
        };

        queryDataPost("../php/theloai.php", data, function(res) {
            if(res.insert == 1) {
                alertSuccess("Thêm thành công !");

                $(".txt-name-category").val("");

                buildListCategory(category_current, recordCategory);
            } else {
                alertError("Mã thể loại đã tồn tại !");
            }
        });
    }
});

$(".btn-update-category").click(function() {
    var idCategory = $(".txt-id-category").val();
    var nameCategory = $(".txt-name-category").val();

    bootbox.confirm("Bạn có chắc muốn cập nhật thể loại " + nameCategory + " này không?", function(result) {
        if (result == true) {
            if(nameCategory == "") {
                alertInfo("Tên thể loại không được để trống !");
            } else {
                var data = {
                    event: "update",
                    idCategory: idCategory,
                    nameCategory: nameCategory
                };
        
                queryDataPost("../php/theloai.php", data, function(res) {
                    if(res.update == 1) {
                        alertSuccess("Cập nhật thành công !");

                        buildListCategory(category_current, recordCategory);
        
                        $(".txt-id-category").val("");
                        $(".txt-name-category").val("");
                    } else {
                        alertError("Cập nhật thất bại !");
                    }
                });
            }
        }
    });
});

$(".btn-reset-category").click(function() {
    $(".txt-id-category").val("");
    $(".txt-name-category").val("");
});

buildListCategory(category_current, recordCategory);

//hàm hiển thị dữ liệu lên table
function buildListCategory(page, record) {
   
    var data = {
		event: "getListCategory",
		page: page,
        record: record
    }
    
    $(".list-category").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/theloai.php", data, function(res) {
        $(".list-category").html("");

        buildHTMLCategoryData(res);
    });
}

function buildHTMLCategoryData(res) {
   if(res.total == 0) {
    $(".list-category").html("Chưa có nội dung !");	
   }else {  
    var data = res.items;

    resallCategory = data;

    var stt = 1;
    var currentPage = parseInt(res.page);
    var html = '';
   
    stt = printSTT(recordCategory, currentPage);
    
    for(item in data) {
        var list = data[item];
      
        html = html +
            '<tr data-id="' + list.idCategory + '" data-name="' + list.nameCategory + '" data-index="' + item + '">' +			
            '<td>' + stt + '</td>' +
            '<td>' + list.nameCategory + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-change">Thay đổi</button> ' +
            '<button class="btn btn-danger btn-delete-category">Xóa</button></td>' +
            '</td>'+
            '</tr>';

        stt++;
        
        $(".list-category").html(html)
    }

    buildSlidePage($(".page-number"), 5, res.page, res.totalPage);
   }
}

$(".page-number").on('click', 'button', function() {
    category_current = $(this).val();
    buildListCategory(category_current, recordCategory); 
});

$(".list-category").on("click", ".btn-change", function() {
    var index = $(this).parents("tr").attr("data-index");

    $(".txt-id-category").val(resallCategory[index].idCategory);
    $(".txt-name-category").val(resallCategory[index].nameCategory);
});

$(".list-category").on("click", ".btn-delete-category", function() {
    var idCategory = $(this).parents("tr").attr("data-id");
    var nameCategory = $(this).parents("tr").attr("data-name");

    bootbox.confirm(
        "Bạn có chắc muốn xoá thể loại có tên là " + nameCategory + " này không?", function(result) {
          if (result == true) {
            var data = {
                event: "delete",
                idCategory: idCategory
            }

            queryDataPost("../php/theloai.php", data, function(res) {
                if(res.delete) {
                    alertSuccess("Đã xóa thành công !");

                    buildListCategory(category_current, recordCategory);
                } else {
                    alertError("something wrong!");
                }
            });
          }
        }
    );
});