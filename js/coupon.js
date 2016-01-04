var rec_page = 2;
var no_index_data = false;

//初始化优惠劵列表
function initCouponList(page,filter,_total){
    // $("#total").remove();
    $(".nodata").remove();
    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',//
        data: 'com=account&t=ajaxGetCouponlist&isAjax=1&page='+page+'&filter='+filter,
        success:function(res){
            if(res==''){
                return false;
            }
            $('.coupon_item_list').find(".loading").remove();
            $(".coupon_item_list").append(res.listStr);
            $(".nodata").remove();
        },
    });
    return false;
}

//选项卡切换
$(".account_tabs_title li").on("click",function(){
    if($(this).hasClass("active")) return;
    $(".coupon_item_list").removeClass('gray');
    // $("#total").remove();
    $(".nodata").remove();
    var _this = $(this);
    _this.addClass("active");
    _this.siblings().removeClass("active");
    var filter = _this.attr("data-id");
    if(filter==1||filter==3){
        $(".coupon_item_list").addClass('gray');
    }
/*    else{
        rec_page = 2;
    }*/
    $(".coupon_item_list").html('');
    $("body").append('<div class="buffer_loading">'+loading_html+'</div>'); 
    rec_page = 2;//
    $("#filter").val(filter);

    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',//
        data: 'com=account&t=ajaxGetCouponlist&filter='+filter+'&isAjax=1',
        success: function(res) {
            $(".flg").remove();
            $(".buffer_loading").remove();      
            $(".coupon_item_list").append(res.listStr);
            $("#total").val(res.total);           
        }
    }); 
});

//滑动加载     
$(".main").scroll(function(){
    if($(".coupon_item_list .flg").length>0 ){
            if($(".coupon_item_list .loading").length>0)
            {
                return false;                       
            }
            var _total=$("#total").val();      
            var srollHeight = $(this).scrollTop();   
            var docHeight = $(".main_box").height();  
            if(rec_page>_total){return ;}
            if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
            {               
                $(".coupon_item_list").append('<div class="loading">'+loading_html+'</div>');   
                $(".main").animate({ scrollTop:200000},10);
                var filter=$("#filter").val();//
                initCouponList(rec_page,filter,_total);
                rec_page++;
            }
    }

});
