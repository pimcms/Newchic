var cate_page = 2;
var no_index_data = false;

//地址信息滑动加载
if($(".itembox #firstUl li").length>0)
{		
	$(".main").scroll(function(){	
		var _total = $("#cate_totalPage").val();
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(cate_page>_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{		
			
			var cat_id = $("#cate_id").val();
			var searchtag = $("#cate_searchtag").val();
			var sort = $("#attr_sort").attr("data-id");
			var searchKey = $("#cate_searchKey").val();
			
			if($(".goodlist .itembox .loading").length>0)
			{
				return false;						
			}
			else
			{
				$(".goodlist .itembox").append('<div class="loading">'+loading_html+'</div>');	
				$(".main").animate({ scrollTop:200000},10);
			}
			
			category_productList(cat_id,searchtag,cate_page,sort,searchKey,0);
			
			cate_page++;	
		}
	});
}
	
	


	
	
	
	
	