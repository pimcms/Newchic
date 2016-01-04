var point_page = 2;
var no_index_data = false;

//地址信息滑动加载
if($(".points_history_list li").length>0)
{		
	$(".main").scroll(function(){
		if($(".points_history_list .loading").length>0)
		{
			return false;						
		}
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(point_page>point_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{				
			
			$(".points_history_list").append('<div class="loading">'+loading_html+'</div>');	
			$("html,body").animate({ scrollTop:200000},10);
			
			initPointList(point_type,point_page);
			point_page++;	
		}
	});
}


function getPointList(obj,type,page){
	if($(obj).hasClass("active")) return;
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');	
	$(".points_history_list").html('');
	initPointList(type,page);
	point_page = 2;
}

	
//初始化地址信息列表
function initPointList(type,page){
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=account&t=point&isAjax=1&type='+type+'&page='+page,
		data:'',
		success:function(res){
			$(".points_history_list").append(res.pointTpl);
			point_total = res.total_page;
			$(".buffer_loading").remove();
			$(".loading").remove();
		}
	});
	return false;
}

//邮箱确认
function confirmEmial(obj){
	if($(obj).hasClass('gray')) return;
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=account&t=sendConfirmEmail',
		data:'',
		success:function(res){
			msgbox(res);
			$(obj).addClass("gray");
		}
	});
}

//栏目切换
$(".points_nav span").on("click",function(){
	if($(this).hasClass("active")) return;
	$(this).addClass("active").siblings().removeClass("active");
	$(".account_item").html('');
	var _url = $(this).attr("data-src");
	if($("#yuan").hasClass("active")) no_index_data = false;
	if($("#exchange").hasClass("active")) no_index_data = true;
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:_url,
		data:'',
		success:function(res){
			$(".account_item").html(res);
			$(".buffer_loading").remove();
			point_page = 2;
		}
	});
});

//兑换coupons
function exchangeCoupon(exchange_points)
{
	
	var retFuc = function(res){
		if(res){
			modal_remove_modal_msgbox();
			$("#pointsForm"+exchange_points).ajaxSubmit({  
				type: 'post',  
				dataType: 'json',
				url: "/index.php?com=account&t=doExchangeCoupon" ,  
				success: function(data){
					
					if(data.points){
						window.location.href='/index.php?com=account&t=my_coupons';
						
					}else{
						data = $("#confirm_tip").val();
						msgbox(data);
					}
					
				},  
				error: function(XmlHttpRequest, textStatus, errorThrown){
					msgbox(data.points);
				}  
			});
		}
	};
	var eachange_note= $('#exchange_note').val().replace("10000", exchange_points);

	ZSConfirm(eachange_note,'',JS_OK,JS_CANCEL,function(res){
		if(res){
			retFuc(1);
		}
	});
	return;
}
	
	

	
	
	
	
	