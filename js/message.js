$(".account_tabs_title li").on("click",function(){
	    if($(this).hasClass("active")) return;
		$(this).addClass("active").siblings().removeClass("active").parent().next().children().eq($(this).index()).show().siblings().hide();
		_type = $(this).attr("data-type");
		$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
		$(".account_tabs_box .list").html("");
		if(_type == 1){$(".account_tabs_box .list").html('<ul class="messages_like_item_list" id="type1"></ul>');}
		if(_type == 2){$(".account_tabs_box .list").html('<ul class="messages_reply_item_list" id="type2"></ul>');}
		if(_type == 3){$(".account_tabs_box .list").html('<ul class="messages_queation_item_list" id="type3"></ul>');}
		$("html,body").animate({ scrollTop:0},10);
		initMessageList(1);
		message_page =2 ;
});
	

//用户信息列表
function initMessageList(page){	
	$.ajax({
		type: 'get',
		dataType:'JSON',
		url:  '/index.php',
		data: 'com=account&t=myMessages&isAjax=1&type='+_type+'&page='+page,
		success:function(res){
			if(res.template){
				_type = res.type;
				if(res.type == 1){$('#type1').append(res.template);}
				if(res.type == 2){$('#type2').append(res.template);}
				if(res.type == 3){$('#type3').append(res.template);}
				_totalpage = res.totalPage;
				
			}
			
			$(".buffer_loading").remove();
			$(".loading").remove();
			//getwindowHeight();
			//modal_add();
		}
	});
}

	var message_page = 2;
	
	//地址信息滑动加载
	if($(".list ul li").length>0)
	{		
		$(".main").scroll(function(){			
			var srollHeight = $(this).scrollTop();   
			var docHeight = $(".main_box").height();  
			if(message_page>_totalpage){
				var no_message_data = true;
				return ;
			}
			if (docHeight - srollHeight - $(this).height()<20 && !no_message_data)
			{				
				if($(".list ul .loading").length>0)
				{
					return false;						
				}
				else
				{
					$(".list ul").append('<div class="loading">'+loading_html+'</div>');	
					$("html,body").animate({ scrollTop:200000},10);
				}
				initMessageList(message_page);
				message_page++;	
			}
		});
	}