var cate_page = 2;
var no_index_data = false;

//滑动加载
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
			var sort = $("#attr_sort").attr("data-id");
			
			if($(".goodlist .itembox .loading").length>0)
			{
				return false;						
			}
			else
			{
				$(".goodlist .itembox").append('<div class="loading">'+loading_html+'</div>');	
				$(".main").animate({ scrollTop:200000},10);
			}
			
			clearance_productList(cat_id,cate_page,sort);
			
			cate_page++;	
		}
	});
}

$(".clearance_item li").on("click",function(){
	var sort = $(this).attr("data-sort");
	$("#attr_sort").attr("data-id",sort);
	var cat_id = $("#cate_id").val();
	
	$(this).addClass("active").append("<i />").siblings().removeClass("active").find("i").remove();
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
	$(".goodlist .itembox ul").html("");
	clearance_productList(cat_id,1,sort);
	cate_page = 2;
});

$(".filter_item li").on("click",function(){
	var cat_id = $(this).attr("data-id");
	$("#cat_id").val(cat_id);
	var sort = $("#attr_sort").attr("data-id");
	
	$(this).addClass("active").append("<i />").siblings().removeClass("active").find("i").remove();
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
	$(".goodlist .itembox ul").html("");
	clearance_productList(cat_id,1,sort);
	cate_page = 2;
});
	


//异步加载条件过滤产品
function clearance_productList(cat_id,page,sort){
	$("#cate_id").val(cat_id);
	$("#attr_sort").attr("data-id",sort);

	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=clearance&isAjax=1&cat_id='+cat_id+'&page='+page+'&sort='+sort,
		data:'',
		success:function(res){
			$(".itembox #firstUl").append(res.firstLi);
			$(".itembox #secondUl").append(res.secondLi);
			
			$("#cate_totalPage").val(res.total);
			$(".buffer_loading").remove();
			$(".loading").remove();
			modal_remove();
		}
	});
}
	
	


	
	
	
	
	