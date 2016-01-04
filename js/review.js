var rec_page = 2;
var no_index_data = false;

(function($){
	$.newchic_review = {
		write_review: function(o){
			var pid = o.attr("data-id");
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=review&t=AjaxCanwrite&products_id='+pid,
				data:'',
				success:function(res){
					if(res.status == true){
						window.location.href = res.msg;
					}
					if(res.status == false){
						var _backurl = res.backUrl;
						if(res.type == 2) ZSConfirm(res.msg,'',res.button,'Cancel',function(res){
							if(res){
								window.location.href = _backurl;
							}
							
						});
						if(res.type == 3) ZSAlert(res.msg,'','ok','');
					}
					
				}
			});
		},
		
		submitWriterivew: function(o){
			var _title = $.trim($('#review_title').val());
			var _content = $.trim($('#review_content').val());
			
			var validate = true;

			if((!_title || _title.split(/\s+/).length < 5 || _title.split(/\s+/).length > 50) || (_title == $.trim($("#review_title").attr("dvalue")))){
				msgbox($('#review_title').attr("err_tip"));
				$('#review_title').focus();
				validate = false;
				return;
			}
			
			if(!_content || _content.split(/\s+/).length < 10 || _content.split(/\s+/).length > 500){
				msgbox($('#review_content').attr("err_tip"));
				$('#review_content').focus();
				validate = false;
				return;
			}
			
			if(!validate){
				return;
			}
			var products_id = $("#products_id").val();
			var price = $("#price").val();
			var quantity = $("#quantity").val();
			var appearance = $("#appearance").val();
			var rate = $("#rate").val();
			
			var data='products_id='+products_id+'&title='+_title+'&comment='+_content+'&rate='+rate+'&price='+price+'&quantity='+quantity+'&appearance='+appearance;
			
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=review&t=submitReview',
				data:data,
				success:function(res){
					if(res.status == 1){
						ZSConfirm(res.msg,'',_view,JS_CONTINUE,function(result){
							if(result){
								history.go(-1);
							}else{
								$("#star").find("i").removeClass("active");
								$("#star").find("li").attr("score",5);
								$("#stlast").css("width","100%");
								$('#review_title').val($("#review_title").attr("dvalue"));
								$(".inputchang").css('color','#bebebe');
								$('#review_content').val('');
								$('.note_tips').show();
								$("#price,#quantity,#appearance,#rate").val(5);
							}
						});
					}else{
						ZSAlert(res.msg,'',JS_OK);
					}
					
				}
			});
		},
		
		reviewList: function(o){
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=product&t=reviewsList&isAjax=1&products_id='+products_id+'&page='+rec_page,
				data:'',
				success:function(res){
					if(!res || res==''){
						no_index_data = true;
						return false;
					}
					$(".reviews_list").find(".loading").remove();
					$(".reviews_list").append(res);
				}
			});
		}
	}
})(jQuery);


$(document)
.on("click", "#write_review", function(){
	$.newchic_review.write_review($(this));
})
.on("click", "#saveReview", function(){
	$.newchic_review.submitWriterivew($(this));
});


$("#star li:not('.total') i").on("click",function(){
		$(this).parent().find("i:gt("+($(this).index()-1)+")").addClass("active");	
		$(this).parent().find("i:lt("+$(this).index()+")").removeClass("active");
		$(this).parent().attr("score",$(this).index());
		var op = $(this).parent().attr('option');
		$('input[name="'+op+'"]').val($(this).index());
		var total=parseInt($("#star li:eq(0)").attr("score"))+parseInt($("#star li:eq(1)").attr("score"))+parseInt($("#star li:eq(2)").attr("score"));
		$("#star li.total i i").css("width",(total*20/3)+"%");
		$('input[name="rate"]').val(parseInt(total / 3));
});



//产品评论滑动加载
if($(".reviews_list li").length>0)
{		
	$(".main").scroll(function(){
		if($(".reviews_list .loading").length>0)
		{
			return false;						
		}
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(rec_page>_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{
			
			$(".reviews_list").append('<div class="loading">'+loading_html+'</div>');	
			$("html,body").animate({ scrollTop:200000},10);
			
			$.newchic_review.reviewList();
			rec_page++;	
		}
	});
}
