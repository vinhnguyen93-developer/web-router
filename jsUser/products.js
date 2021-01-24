var recordRouter = 4;
var router_current = 0;
var resallRouter;

buildListRouter(router_current, recordRouter);

//hàm hiển thị dữ liệu lên table
function buildListRouter(page, record) {
   
    var dataSend = {
		event: "getListRouter",
		page: page,
        record: record
    }
    
    $(".show-router").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPost("../php/products.php", dataSend, function(res) {
        $(".show-router").html("");

        buildHTMLRouterData(res);
    });
}

function buildHTMLRouterData(res) {
   if(res.total == 0) {
    $(".show-router").html("Chưa có nội dung !");	
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
            '<div class="col-lg-3">' +
                '<aside class="profile-nav alt">' +
                    '<section class="panel">' +
                        '<div class="user-heading alt gray-bg">' +
                            '<h1>' + list.nameRouter + '</h1>' +
                            '<p>' + list.dayPost + '</p>' +
                        '</div>' +

                        '<ul class="nav nav-pills nav-stacked">' +
                            '<li><a href="javascript:;"><i class="fa fa-calendar-o"></i>Năm sản xuất: ' + list.yearRouter + '</a></li>' +
                            '<li><a href="javascript:;"><i class="fa fa-globe"></i>Nơi sản xuất: ' + list.addressRouter + '</a></li>' +
                            '<li><a href="javascript:;"><i class="fa fa-briefcase"></i>Cty sản xuất: ' + list.nameProducer + '</a></li>' +
                            '<li><a href="javascript:;"><i class="fa fa-envelope-o"></i>Loại router: ' + list.nameCategory + '</a></li>' +
                            '<li class="active-card"><button class="btn btn-primary">Xem chi tiết</button></li>' +
                        '</ul>' +
                    '</section>' +
                '</aside>' +
            '</div>';

        stt++;
        
        $(".show-router").html(html)
    }

    buildSlidePage($(".page-number"), 5, res.page, res.totalPage);
   }
};

$(".page-number").on('click', 'button', function() {
    router_current = $(this).val();

    buildListRouter(router_current, recordRouter);
});

checkUser();