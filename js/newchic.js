(function(){
	$.nc_item = {
		modal_show:function(obj){			
			if(!$(".container").hasClass("modal_active")){				
				$('html').addClass('sift_move');
				$(".container").addClass("modal_active");
				$(".container").append('<div class="mnc_model"></div>');				
				$(".mnc_model").fadeIn(function(){
					if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
					$(".container .mnc_model").click(function(){ $.nc_item.modal_out(obj); });
				});				
				if(obj.mode==="center"){
					$(".container ."+obj.target).fadeIn(200);
				}else{					
					if(obj.mode==="left" || obj.mode==="right"){
						var wid_val=obj.mode==="right"?$(".container ."+obj.target).width()*(-1):$(".container ."+obj.target).width();						
						$(".container .main,.head_nav").css({"webkitTransform":"translate("+wid_val+"px,0)","transform":"translate("+wid_val+"px,0)"});						
					}
					$(".container ."+obj.target).css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
				}
			}else{
				this.modal_out(obj);
			}			
		},
		modal_out:function(obj){			
			if(obj.mode==="center"){
				$(".container ."+obj.target).fadeOut(200);
			}else{
				var wid_val=0;
				var hei_val=0;
				if(obj.mode==="left" || obj.mode==="right"){					
					$(".container .main,.head_nav").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
					wid_val=obj.mode==="left"?$(".container ."+obj.target).width()*(-1):$(".container ."+obj.target).width();					
				}else{
					hei_val=obj.mode==="top"?$(".container ."+obj.target).width()*(-1):$(".container ."+obj.target).height();
				}
				console.log(wid_val);
				$(".container ."+obj.target).css({"webkitTransform":"translate("+wid_val+"px,"+hei_val+"px)","transform":"translate("+wid_val+"px,"+hei_val+"px)"});				
			}			
			$(".mnc_model").fadeOut(function(){
				$(this).remove();
				if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.disable();
				$('html').removeClass('sift_move');
				$(".container").removeClass("modal_active");
				
			}).bind(this);	
		}
	}
})(jQuery);



$(document)
.on("click",".menu_bar a",function(){
	$.nc_item.modal_show({ target:"menu",mode:"left" });
})
.on("click",".wish_icon a",function(){
	$.nc_item.modal_show({ target:"wish",mode:"right" });
})
.on("click",".head_nav .i_cart",function(){
	$.nc_item.modal_show({ target:"mod_top",mode:"top" });
})
.on("click",".head_nav .i_search",function(){
	$.nc_item.modal_show({ target:"mod_bot",mode:"bottom" });
})
/*
if(!$(".container .side_box").hasClass("model_mode")) {
	if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.disable();
	$('html').removeClass('sift_move');
	$(".container").removeClass("modal_active");
};*/
