var rec_page = 2;
var no_index_data = false;

(function($){
	$.newchic_question = {
		questionList: function(o){
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=question&t=viewMoreQuestion&isAjax=1&products_id='+_pid+'&page='+rec_page,
				data:'',
				success:function(res){
					if(!res || res==''){
						no_index_data = true;
						return false;
					}
					$(".question_item_list").find(".loading").remove();
					$(".question_item_list ul").append(res);
				}
			});
		},
		
		see_replay: function(o){
			o.siblings(".reply").slideDown();
			o.parent().siblings().find(".reply").slideUp();
		},
		
		select_title: function(o){
			var height = o.siblings("ul").outerHeight(); 
			var textareaHeight = o.parent().siblings("textarea").outerHeight(); 
			o.siblings("ul").show();
			o.parent().css("height",height-textareaHeight);
		},
		
		select_topic: function(o){
			var text = o.text();
			o.parent().siblings(".title").text(text);
			$("#topic").val(text);
			o.parent().hide();
			o.parents(".question_topic").removeAttr("style");
		},
		
		submitquestion: function(o){
			var _question = $.trim($('#question').val());
			var validate = true;

			if(_question == '' || _question.split(/\s+/).length < 3||_question.split(/\s+/).length>200){
				msgbox($('#question').attr("err_tip"));
				$('#question').focus();
				validate = false;
				return;
			}
			
			if(!validate){
				return;
			}
			var products_id = $("#products_id").val();
			var name = $("#name").val();
			var topic = $("#topic").val();
			
			var data = 'products_id='+products_id;
			data += '&name='+name+'&topic='+topic+'&question='+_question;
			
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=question&t=submitQuestion',
				data:data,
				success:function(res){
					if(res.status == 2){
						ZSConfirm(res.message,'',res.btn,JS_CANCEL,function(result){
							if(result){
								if(res.url){
									window.location.href = res.url;
								}
							}
						});
						return;
					}
					if(res.status == 1){
						ZSAlert(res.message,'',res.btn,'',function(result){
							if(result) $("#question").val("");
						});
						return;
					}
					if(res.status == 0){
						ZSAlert(res.message,'',res.btn);
						return;
					}
				}
			});
		}
	}
})(jQuery);


$(document)
.on("click",".question_topic .title",function(){
	$.newchic_question.select_title($(this));
})
.on("click",".question_topic li",function(){
	$.newchic_question.select_topic($(this));
})
.on("click",".question_item_list .user",function(){
	$.newchic_question.see_replay($(this));
})
.on("click","#submitWritequestion",function(){
	$.newchic_question.submitquestion($(this));
});


//滑动加载
if($(".question_item_list li").length>0)
{		
	$(".main").scroll(function(){
		if($(".question_item_list .loading").length>0)
		{
			return false;						
		}
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(rec_page>_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{
			
			$(".question_item_list").append('<div class="loading">'+loading_html+'</div>');	
			$("html,body").animate({ scrollTop:200000},10);
			
			$.newchic_question.questionList();
			rec_page++;	
		}
	});
}
