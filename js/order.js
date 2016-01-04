var order_page = 2;
var no_index_data = false;

//订单信息滑动加载
if($("#orderList .orders_list").length>0)
{		
	$(".main").scroll(function(){			
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(order_page>order_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{				
			var _url = $("#orderurl").attr("data-src");
			if($(".account_item .loading").length>0)
			{
				return false;						
			}
			else
			{
				$(".account_item").append('<div class="loading">'+loading_html+'</div>');	
				$("html,body").animate({ scrollTop:200000},10);
			}
			initOrderList(_url,order_page);
			order_page++;	
		}
	});
}


	
//初始化订单信息列表
function initOrderList(_url,page){
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:_url+'&page='+page,
		data:'',
		success:function(res){
			$(".account_orders .orders_nav ul").hide();
			$("#orderList").append(res.template);
			order_total = res.totalPage;
			$(".buffer_loading").remove();
			$(".loading").remove();
		}
	});
}



$(".orders_nav ul li").on("click",function(){
	var _this = $(this);
	var _title = _this.text();
	var _url = _this.attr("data-src");
	$("#orderurl").attr("data-src",_url);
	$("#title").text(_title);
	
	_this.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
	_this.parent().hide();
	
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');	
	$("#orderList").html('');
	
	initOrderList(_url,1);
	order_page = 2;
});
	
	

	
	
	
	
	