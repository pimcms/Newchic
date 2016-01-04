var cate_page = 2;
var no_index_data = false;
		
//地址信息滑动加载
if($(".itembox #firstUl li").length>0)
{		
	$(window).scroll(function(){	
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(cate_page>_totalPage){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{		
			
			if($(".goodlist .itembox .loading").length>0)
			{
				return false;						
			}
			else
			{
				$(".goodlist .itembox").append('<div class="loading">'+loading_html+'</div>');
				$(".main").animate({ scrollTop:200000},10);
			}
			
			$.ajax({
				type:'GET',
				dataType:'JSON',
				url:'/index.php?com=search&keywords='+_keywords+'&cat_id='+_cat_id+'&filters='+_filters+'&style='+_style+'&sort='+_sort+'&pagesize='+_pagesize+'&pfrom='+_pfrom+'&pto='+_pto+'&page='+cate_page+'&isAjax=1',
				data:'',
				success:function(res){
					$(".itembox #firstUl").append(res.firstLi);
					$(".itembox #secondUl").append(res.secondLi);
					img_lazyload();
					$(".loading").remove();
					modal_remove();
				}
			});
			
			cate_page++;	
		}
	});
}
	
	


	
	
	
	
	