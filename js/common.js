$(document).on("focus",".inputchang",function(){
	if($(this).prev().hasClass("pwdtip")){
		$(this).prev().hide();
		$(this).css("color","#000000");
	}
	if($(this).val()==$(this).attr("dvalue")){
		$(this).css("color","#000000").val("");
	}
});
$(document).on("blur",".inputchang",function(){
	if($(this).prev(".pwdtip").length>0){
		if($(this).val()=='')
		{
			$(this).prev().show();
		}
		else{
			$(this).prev().hide();
		}
	}
	if($(this).val()==''){
		$(this).css("color","#cccccc").val($(this).attr("dvalue"));
	}
});

$(".quantity_box").on("input propertychange keypress","input:text",function(event){
	$.newchic_item.ZSquantityInput($(this));
});



/*jq lazyload*/
function img_lazyload(){	
	$("img.bg_lazy").lazyload({	
			placeholder : "http://img.banggood.com/newimages/grey.gif", 
			effect      : "fadeIn"
	});
}


var move = function(e) {
	e.preventDefault && e.preventDefault();
	e.returnValue = false;
	e.stopPropagation && e.stopPropagation();
	return false;
}

function activeScroll() {
	window.removeEventListener('touchmove', move);
}

function stopScroll() {
	window.addEventListener('touchmove', move);
}


$(document).on("click",".pwdtip",function(){
	$(this).hide().next().focus();
});

function msgTipsbox(i,j,k,l,m,n){
	modal_bg();
	$('.modal_container').append("<div class='modal_msgbox'><div class='modal_msgbox_msg'>"+j+"</div><div class='modal_msgbox_button'></div></div>");
	if(i==0)$('.modal_container .modal_msgbox_button').append("<span class='button_ok' onclick='modal_remove_modal_msgbox();'><i>OK</i></span>");
	if(i==1)
	{
		$('.modal_container .modal_msgbox_button').append("<span class='button_no' onclick='modal_remove_modal_msgbox();'><i>Cancel</i></span><span class='button_yes'><i>Yes</i></span>");
		$(document).off("click",".button_yes").on("click",".button_yes",function(){k(l);});
		/*$('.button_yes').click(function(){
			k();
		});*/
	}
	if(i==2)
	{
		$('.modal_container .modal_msgbox_button').append("<span class='button_no' onclick='modal_remove_modal_msgbox();'><i>"+m+"</i></span><span class='button_yes'><i>"+n+"</i></span>");
		$(document).off("click",".button_yes").on("click",".button_yes",function(l){if( i ) k(l);});
		/*$('.button_yes').click(function(){
			k();
		});*/
	}
	modal_add();
	$(".modal_msgbox").slideDown();
	
};


function modal_remove_modal_msgbox(){	
	$(".modal_msgbox").slideUp();
	setTimeout(function(){
		modal_remove();		
	},500);	
}

function msgbox(msg,obj){
	$('html').addClass('sift_move');
	var $o=$('body');
	if(obj){
		$o = obj;
	}
	$o.append("<div class='msgbox'><div class='msg_tips'><span>"+msg+"</span></div></div>");	
	setTimeout(function(){
		$(".msgbox").remove();
		$('html').removeClass('sift_move');
	},3000);
};

var loading_html = '<div class="animate-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

function tabs(tabTit,type){
	 $(document).on(type,tabTit,function(){
		$(this).addClass("active").siblings().removeClass("active").parent().next().children().eq($(this).index()).show().siblings().hide();
	});
}

function size_chart_tabs(tabTit,type){
	 $(document).on(type,tabTit,function(){
		$(this).addClass("active").siblings().removeClass("active").parent().parent().next().children().eq($(this).index()).show().siblings().hide();
	});
}
	
var zValidate = {};
zValidate.email = function(email){
	var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
	return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
};
zValidate.password = function(password){
	var myreg = /^(.*){6,}$/;
	return myreg.test(password);
};
	
function inputNotice(obj){
	if(obj.prev().hasClass("pwdtip") && obj.val()==''){
		obj.prev().addClass("login_animated login_shake");
	}
	else{
		obj.addClass("login_animated login_shake");
	}
	
	setTimeout(function(){
		obj.prev().removeClass("login_animated login_shake");
		obj.removeClass("login_animated login_shake");
	},1500);
}

$(window).scroll(function(){
	if($(window).scrollTop()>300){
		$(".detail_backtotop .totop_button").slideDown(200);
	}else{
		$(".detail_backtotop .totop_button").slideUp(200);
	}	
});

$(".totop_button").click(function(){
	$('html,body').animate({ scrollTop:0},0);
});
var no_index_data = false;
var rec_page = 2;
if($(".index_goodlist_item").length>0)
{		
	$(window).scroll(function(){
		//$(".menu").css("height",$(window).height());
		if($(".index_goodlist_item .loading").length>0){return false;}
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height(); 
		if(rec_page>5){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{
			
			var appendDiv = '<div class="loading">'+loading_html+'</div>';
			
			$(".index_goodlist_item").append(appendDiv);	
			$(".main").animate({ scrollTop:200000},10);
			
			var firstLi;
			var secondLi;
			var thirdLi;
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'index.php?com=index&t=showRecommendation&page='+rec_page,
				data:'',
				success:function(res){
					$('.index_goodlist_item').find(".loading").remove();
					$(".index_goodlist_item ul#firstUl").append(res.firstLi);
					$(".index_goodlist_item ul#secondUl").append(res.secondLi);
					$(".index_goodlist_item ul#thirdUl").append(res.thirdLi);
					img_lazyload();
					$.newchic_item.reset_img_size();
					rec_page++;
					if(res.firstLi==''){
						rec_page = 6;
					}
				}
			});
		}
	});
}

function getwindowHeight(){
	var windowHeight = $(window).height();
	var addnewwishHeight = $(".addnewwish").outerHeight();
	var addimagehHeight = $(".addimage").outerHeight();
	var createwishboxHeight = $(".createwishbox").outerHeight();
	$(".module").css("height",windowHeight);
	//$(".modal_mask,.modal_scroller").css({"top":sequenceitemHeight+headertopHeight});
	//$(".menu").css("height",windowHeight);
	//$(".wish").css("height",windowHeight);
	//$(".image_show").css("height",windowHeight);
	//$(".addnewwish").css("top",windowHeight-addnewwishHeight);
	//$(".addimage").css("top",windowHeight-addimagehHeight);
	//alert(createwishboxHeight)
	//$(".createwishbox").css("top",(windowHeight-createwishboxHeight)/2);
	if($(".selectcountry_item").length>0){
		var letterHeight = $(".letter").outerHeight();
		$(".country_list").css({"margin-top":letterHeight,"padding-top":0,"height":windowHeight-letterHeight});
	}
	
}
function getsequenceHeight(){
	var sequenceitemHeight = $(".sequence_item,.search_item_h,.clearance_item").outerHeight();
	var headertopHeight = $(".header_top").outerHeight();
	$('.module,.modal_mask,.modal_scroller').css("top",sequenceitemHeight+headertopHeight);
}
function getfilterHeight(){
	var windowHeight = $(window).height();	
	var windowHeight = $(window).height();
	var headertopHeight = $(".header_top").outerHeight();
	var fixedbottommenuHeight = $(".fixed_bottom_menu").outerHeight();
	$(".filter_item ul").css("height",windowHeight-fixedbottommenuHeight-headertopHeight-40);
	$(".filter_item").css("height",windowHeight-fixedbottommenuHeight-headertopHeight);
	$(".module").css({"top":windowHeight-fixedbottommenuHeight-headertopHeight+30,"height":windowHeight});
	$(".modal_mask,.modal_scroller").css("top",windowHeight-fixedbottommenuHeight-headertopHeight+30);
	$(".filter_item_arrow").css("top",windowHeight-fixedbottommenuHeight-headertopHeight+30);
}
function modal_remove(){	
	$('.module').remove();
	$(".container").removeClass("containerL").removeClass("containerR");	
	$(".fixed_bottom_menu").show();
	$('html').removeClass('sift_move');
	$(".sequence_item,.search_item_h,.clearance_item").hide();
	$(".filter_item").hide();
	$(".filter_item_arrow").remove();
}
	
$(window).resize(function() {
	getwindowHeight();
	if($(".filter_item_arrow").length>0)
	{
		getfilterHeight();
	}
});
function module_index_remove(){
	$(".container").removeClass("containerL");
	$(".container").removeClass("containerR");
	$('.container').removeClass('containerImage');
	//$(".fixed_bottom_menu").show();
	if($(".container .mnc_model[data-target=wish]").length>0) $.newchic_item.bg_hide_wish();
	$(".fixed_bottom_addtobag").show();
}
function modal_item_operate(){
	$(".sequence_item,.search_item_h,.clearance_item").hide();
	$(".filter_item").hide();
}
function popup_remove(){
	$(".header_top_fixed").removeClass("push pull");
	$("html").removeClass("sift_move");
	$("body").removeAttr("style");
	$(".index_goodlist_item").find(".loading").remove();
	$(".popup_overlay").remove();
	$(".popup_msg").slideUp();
	setTimeout(function(){
		$.ZSmsgBox._hide();
	},500);
	module_index_remove();
	if($(".editwishlist").length>0)
	{
		$(".fixed_bottom_menu").hide();	
	}
}
function myRight(){
	if($(".container").hasClass("containerR") || $(".container").hasClass("containerImage"))
	{			
		$(window).resize(function() {	  
			//getwindowHeight();
		//	alert($(window).height())
			$("body,.wish,.wish .index_wishlist,.popup_overlay,.module").css("height",$(window).height());
		});
	}
}

var one_click = false;
(function($){
	$.newchic_item = {
		menu_bar: function(o){
			if($(".nonetwork").length>0){return false;}
			if($('.container').hasClass("containerL")){				
				$.newchic_item.bg_hide_menu();
			}else{
				$(".container").addClass("containerL");
				$(".header_top_fixed").addClass("push");
				if(!$(".container .mnc_model").length>0){
					$(".container").append('<div class="mnc_model" data-target="menu"></div>');
				}				
				$(".mnc_model").fadeIn(function(){
					if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
					$(".container .mnc_model").click(function(){
						$.newchic_item.bg_model_click($(this));
					})
				});
				$(".container .menu").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
				$(".container .main,.head_nav").css({"webkitTransform":"translate(25rem,0)","transform":"translate(25rem,0)"});	
				if(!(browser.versions.iPhone || browser.versions.iPad)) $('html').addClass('sift_move');				
				$(".fixed_bottom_menu").hide();
				$(".index_goodlist_item").append('<div class="loading" />');
				//$(".popup_overlay").css({"left":$(".menu").outerWidth(),"top":$(".head_nav").outerHeight()});
			}
		},
		
		wish_icon: function(o){
			
			if(!one_click){
				$.newchic_wish.group_wish();
			}
			if($(".nonetwork").length>0){return false;}
			if($('.container').hasClass("containerR")){				
				$.newchic_item.bg_hide_wish();
			}else{
				$(".container").addClass("containerR");
				$(".header_top_fixed").addClass("pull");
				if(!$(".container .mnc_model").length>0){
					$(".container").append('<div class="mnc_model" data-target="wish"></div>');
				}				
				$(".mnc_model").fadeIn(function(){
					if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
					$(".container .mnc_model").click(function(){
						$.newchic_item.bg_model_click($(this));
					})
				});
				$(".container .wish").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
				$(".container .main,.head_nav").css({"webkitTransform":"translate(-15rem,0)","transform":"translate(-15rem,0)"});
				$(".fixed_bottom_menu").hide();
				if(!(browser.versions.iPhone || browser.versions.iPad)) $('html').addClass('sift_move');
				$(".wish .index_wishlist").css("height",$(window).height()-$(".wish h2").outerHeight());
				$(".index_goodlist_item").append('<div class="loading" />');
				$(".popup_overlay").css({"right":$(".wish").outerWidth(),"top":$(".head_nav").outerHeight()});
				//myRight();
			}
			one_click = true;
		},
		

		image_show: function(o){
			$(".fixed_bottom_addtobag").hide();
			$(".module .modal_mask,.module .modal_scroller").css("right",$(".image_show").width());
			$(".container .image_show").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});		
			if(!$(".container .mnc_model").length>0){
				$(".container").append('<div class="mnc_model" data-target="image_show"></div>');
			}				
			$(".mnc_model").css({"zIndex":190}).fadeIn(function(){
				if(!(browser.versions.iPhone || browser.versions.iPad)) $('html').addClass('sift_move');
				if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
				$(".container .mnc_model").click(function(){
					$.newchic_item.bg_model_click($(this));
				})
			});			
			myRight();
		},
		
		bg_model_click:function(o){
			switch (o.attr("data-target")){
				case 'menu':
				$.newchic_item.bg_hide_menu();
					break;
				case 'wish':
				$.newchic_item.bg_hide_wish();
					break;
				case 'image_show':
				$.newchic_item.bg_hide_image();
					break;
				default:	
				alert("this is a test");
					break;
			}
			
		},
		bg_hide_menu:function(){
			$(".container .menu").css({"webkitTransform":"translate(-25rem,0)","transform":"translate(-25rem,0)"});	
			$(".container .main,.head_nav").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
			$(".container").removeClass("containerL");
			$(".header_top_fixed").removeClass("push");			
			$(".index_goodlist_item").find(".loading").remove();				
			$.newchic_item.model_fade_out();
		},
		bg_hide_wish:function(){			
			$(".container .wish").css({"webkitTransform":"translate(15rem,0)","transform":"translate(15rem,0)"});
			$(".container .main,.head_nav").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
			$(".container").removeClass("containerR");		
			$(".header_top_fixed").removeClass("pull");						
			$(".index_goodlist_item").find(".loading").remove();			
			$.newchic_item.model_fade_out();
		},
		bg_hide_image:function(){
			$(".container .image_show").css({"webkitTransform":"translate(25rem,0)","transform":"translate(25rem,0)"});	
			$(".fixed_bottom_addtobag").fadeIn();	
			$.newchic_item.model_fade_out();
		},
		model_fade_out:function(){
			$(".mnc_model").fadeOut(function(){
				$(this).remove();
				if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.disable();
				if(!(browser.versions.iPhone || browser.versions.iPad)) $('html').removeClass('sift_move');
				if($(".fixed_bottom_menu").length>0){
					$(".fixed_bottom_menu").fadeIn(100);
				}						
			}).bind(this);
					
		},
		
		
		
		/*close_module: function(o){
			if(o.find(".createwishbox").length>0 || o.find(".module_share_item").length>0){return false;}
			modal_remove();
		},*/
		
		sequence: function(o){
			$('html').removeClass('sift_move');
			$(".main").removeAttr("style");
			$(".module").remove();
			$(".filter_item_arrow").remove();
			$(".filter_item").hide();
			if(o.parent().next().is(":hidden"))
			{
				o.parent().next().show();				
				modal_bg();
				modal_add();
				//$(".main").append('<div class="module" />');
				getwindowHeight();
				getsequenceHeight();
			//	$(".module,.modal_mask,.modal_container").css("top")
				$(".fixed_bottom_menu").hide();
				$('html').addClass('sift_move');
			}
			else
			{
				o.parent().next().hide();
				$(".module").remove();
				$(".fixed_bottom_menu").show();
				$('html').removeClass('sift_move');
				$('body').removeClass("noscroll");
			}
		},
		
		sequence_click: function(o){
			if(o.hasClass('active')) return;
			no_category_data = true;
			var sort = o.attr("data-sort");
			$("#attr_sort").attr("data-id",sort);
			
			o.addClass("active").append("<i />").siblings().removeClass("active").find("i").remove();
			$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
			$(".module").remove();
			o.parents(".sequence_item").hide();
			$(".goodlist .itembox ul").html("");
			category_productList(1, 0);
			cate_page = 2;
			setTimeout(function(){
				no_category_data = false;
			},1000);
		},
		
		filter: function(o){
			$("html,body").animate({ scrollTop:0});
			$(".main").css("overflow","hidden");
			modal_bg();
			modal_add();
			$(".filter_item").show();
			var filterHeight = $(".filter_item").outerHeight();
			//$("body").append('<div class="filter_item_arrow"><span class="arrow_a"><i></i></span></div>');
			//$("body").append('<div class="module" />');
			getwindowHeight();
			getfilterHeight();
		},
		
		tool_share: function(o){
			$(".fixed_bottom_addtobag").hide();
			var products_url = $("#products_url").val();
			//app_id=1724895177738454(mnewchic.banggood.com) 
			var share_facebook = "https://www.facebook.com/sharer/sharer.php?app_id=1724895177738454&sdk=joey&u="+products_url+'&display=popup&ref=plugin&src=share_button';
			//app_id=490999237736692(m.newchic.com) apply fb account: woophoneryan@yandex.com 
			//var share_facebook = "https://www.facebook.com/sharer/sharer.php?app_id=490999237736692&sdk=joey&u="+products_url+'&display=popup&ref=plugin&src=share_button'; 
			var share_Pinterest = "https://www.pinterest.com/pin/create/bookmarklet/?media=&url="+products_url; 
			var share_Twitter = "http://twitter.com/home?status=STATUS"; 
			var share_Polyvore = "http://www.polyvore.com/cgi/clipper.form?ref="+products_url; 
			var share_html = ''+
				'<div class="module_detail_item">'+
					'<h4 class="title">Share this item:</h4>'+
					'<ul class="share">'+
						'<a href="'+share_facebook+'" target="_blank"><li><i class="f"></i><span>Facebook</span></li></a>'+						
						'<a href="'+share_Pinterest+'"><li><i class="pi"></i><span>Pinterest</span></li></a>'+
						'<a href="'+share_Twitter+'"><li><i class="tw"></i><span>Twitter</span></li></a>'+
						'<a href="'+share_Polyvore+'"><li><i class="po"></i><span>Polyvore</span></li></a>'+					
					'</ul>'+
					'<div class="sharecancel"><span onclick="popup_remove();">Cancel</span></div>'+
				'</div>'
			ZSHtml(share_html);
			getwindowHeight();
		},

		
		//select_goods_poa: function(o){
		//	o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
		//},
		
		quantity_next: function(o){
			if(o.hasClass("gray")){return false;}
			var input = o.siblings(":text");
			var num = parseInt(input.val());
			var oldqty = parseInt(input.attr('oldqty'));
			var maximum = parseInt(input.attr('maximum'));
			if(!(/(^[0-9]\d*$)/.test(num)) || !num  || num == 0){
				num = 1;
			}
			num += 1;
			if(num > 1)
			{
				if(input.attr("clearstock") == 1 && num > maximum){
					num = maximum;
					o.addClass("gray");
				}
				o.parent().find(".prev").removeClass('gray');
			}
			input.val(num);
			setTimeout(
				function(){
						var qty = parseInt(input.val());					
						if(qty != oldqty){
							input.attr('oldqty', qty);
						}
				},500);
		},
		
		quantity_prev: function(o){
			if(o.hasClass("gray")){return false;}
			var input = o.siblings(":text");
			var num = parseInt(input.val());
			if(!(/(^[0-9]\d*$)/.test(num)) || !num  || num == 0){
				num = 1;
			}
			if(num == 1)
			{
				o.addClass('gray');
			}
			num -= 1;
			if(num == 0)num=1;
			input.val(num);
			o.parent().find(".next").removeClass('gray');
			setTimeout(
				function(){
						var qty = parseInt(input.val());
						var oldqty = parseInt(input.attr('oldqty'));					
						if(qty != oldqty){
							input.attr('oldqty', qty);
						}
				},500);
		},
		
		//输入数量,失去焦点执行
		ZSquantityInput: function(o,callback){
			var $o = $(o);
			var num = $o.val();
			var maximum = parseInt($o.attr("maximum"));
			var oldQty = parseInt($o.attr('oldQty'));
			var clearStock = parseInt($o.attr("clearStock"));
			if(!(/(^[0-9]\d*$)/.test(num)) || !num  || num == 0){
				num = 1;
				$o.val(num);
			}
			//$o.siblings("s").removeClass("active");
			if(clearStock >0 && num > maximum){//清货产品最大购买数量
				$o.val(maximum);
				num = maximum;
				//$o.siblings("s").addClass("active");
				//setTimeout(function(){$o.siblings("s").removeClass("active");}, 2000);
			}
			('undefined' == typeof(quantityTime)) || clearTimeout(quantityTime);
			if(num != oldQty){
				setTimeout(function(){
					$o.attr('oldQty', num);
					callback && callback(o,num);
				}, 
				1000);
			}
		},
		
		addimage_note: function(o){
			o.parent().find(".note_tips").hide();
			o.parent().find("textarea").focus();
		},
		
		writereviews_note: function(o){
			o.parent().find(".note_tips").hide();
			o.parent().find("textarea").focus();
		},
		
		categories_filter_select: function(o){
			o.addClass("arrow_b").removeClass("arrow_a");
			o.parents("li").find(".categories_filter_box").slideDown();
		},
		
		categories_filter_select_close: function(o){
			o.parents("li").find(".categories_filter_box").slideUp();
			o.addClass("arrow_a").removeClass("arrow_b");
		},
		
		categories_filter_list: function(o){
			var text = o.text();
			var style_id = o.attr("data-id");
			if(o.parents("li").find(".selected").length>0){
				o.parents("li").find("s").hide();
				o.parents("li").find(".selected").text(text);
				o.parents("li").find(".selected").attr("data-id", style_id);
			}
			else
			{
				o.parents(".categories_filter_box").before('<b class="selected" data-id="'+style_id+'">'+text+'</b>');
			}
			o.addClass("active").parent().siblings().find("a").removeClass("active");
			o.parents("li").find("s").hide();
		},
		
		categories_filter_reset: function(o){
			o.parent().siblings().find("s").show();
			o.parent().siblings().find(".selected").remove();
			$(".categories_filter_box").find("a").removeClass("active");
		},
		
		categories_select:function(o){
			if(o.hasClass("active")) return;
			no_category_data = true;
			var cate_id = o.find("a").attr("data-cat-id");
			$("#cate_id").val(cate_id);
			$("#attr_sort").attr("data-id", 1);
			$("#attr_sort li").removeClass("active");
			$("#attr_sort").find("li").eq(0).addClass("active").append("<i />").siblings().removeClass("active").find("i").remove();
			$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
			o.addClass("active");
			o.siblings().removeClass("active");
			$(".goodlist .itembox ul").html("");
			category_productList(1, 1);
			cate_page = 2;
			setTimeout(function(){
				no_category_data = false;
			},1000);
		},
		
		filter_submit:function(o){
			$(".categories_filter .arrow_b").addClass("arrow_a");
			$(".categories_filter .arrow_a").removeClass("arrow_b");
			$(".categories_filter_box").hide();
			$("#attr_sort").attr("data-id", 1);
			$("#attr_sort li").removeClass("active");
			$("#attr_sort").find("li").eq(0).addClass("active").append("<i />").siblings().removeClass("active").find("i").remove();;
			var searchtag = '';
			var arrayObj = [];
			$(".categories_filter li b.selected").each(function(){
				arrayObj.push($(this).attr("data-id"));
			});
			if(arrayObj.length > 0){
				$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
				searchtag = arrayObj.join("-");
				$("#cate_searchtag").val(searchtag);
				$(".filter_item").hide();
				$(".goodlist .itembox ul").html("");
				category_productList(1, 0);
				cate_page = 2;
			}	
			
		},
		
		currency_select: function(o){
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
		},
		
		language_select: function(o){
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
		},
		
		_switch: function(o){
			if(o.hasClass('switch_off')){
				o.removeClass('switch_off');
				o.addClass('switch_on');
				$(".newaddress_item #code").val(1);
			}else{
				o.removeClass('switch_on');
				o.addClass('switch_off');
				$(".newaddress_item #code").val(0);
			}
		},
		
		all_search: function(o){
			//popup_remove();
			//modal_remove();
			$.newchic_item.bg_hide_menu();
			var html = $(".search_item").prop("outerHTML");
			modal_bg();
			$('.modal_container').append(html);
			$('.modal_container .search_item').show();
			getwindowHeight();
			modal_add();
		},
		
		search_keyword_close: function(o){
			var val = o.siblings('.keyword').attr("dvalue");
			o.siblings('.keyword').val(val).removeAttr("style");
			o.hide();
		},
		
		search_complete: function(o){
			autoLoad();
		},
		
		sel_keyword: function(o){
			var keyword = o.attr('keywords');
			$('.search_item .search .inputchang').val(keyword);
			$('.search_form').submit();
		},
		
		search_keyword_blur: function(o){
			var val = o.val();
			if(val)
			{
				o.siblings('.close').show();
				
			}
		},
		
		clearhistory: function(o){
			clearHistory();
			o.parent().empty();
		},
		
		purchased_select: function(o){
			o.addClass("active").parent().siblings().find(".select").removeClass("active");
		},
		
		select_country: function(o){
			var val = o.text();
			o.addClass("active").siblings().removeClass("active");
			o.parent().next().find("li").hide().each(function(){
				if($(this).text().toLowerCase().indexOf(val.toLowerCase())==0)
				{
					$(this).show();
				}
			});
		},
		
		
		
		clear_containerImage: function(o){
			$('html').removeClass('sift_move');
			$('body').removeAttr('style');
			$('.container').removeClass('containerImage');
			$(".fixed_bottom_addtobag").show();
		},
		
		validateLogin:function(o){
			$.ajax({
				type: 'get',
				url:  homeUrl+'index.php',
				dataType: 'json',
				data: 'com=ajax&t=validateLogin',
				success:function(res){
					$('.menu .profile').html(res.html);
					var logoutNote = $('.menu_nav #logout').length;
					if(res.isLogin && logoutNote){
						$('.menu_nav #logout').show();
					}
				}
			});	
		},
		
		loadHeadCart:function(){
			var time = new Date().getTime();
			$.ajax({
				type: 'get',
				url:  homeUrl+'index.php',
				data: 'com=ajax&t=loadHeadCarts&qt='+time,
				success:function(res){
					if(res == '') res = 0;
					$('.fixed_bottom_menu .num').text(res);
					$('.detail_backtotop .shopcart .num').text(res);
					$('.i_cart .num').text(res);
				}
			});	
		},
		
		loadHistory:function(o){
			$.ajax({
				type: 'get',
				url:  homeUrl+'index.php',
				dataType: 'json',
				data: 'com=ajax&t=gethistory',
				success:function(res){
					if(res){$('#history').html(res);}
					return;
				}
			});	
		},
		
		orders_nav_select: function(o){
			o.find("ul").show();
			$(document).click(function(event){
				if(!$(event.target).parents(".account_orders").find(".orders_nav").length > 0)
				{
					$(".account_orders .orders_nav ul").hide();
				}
				else
				{
					//$(".account_orders .orders_nav ul").show();
				}
			});
		},
		
		history: function(o){
			history.back(-1);
		},
		
		historyGo: function(){
			window.history.go(-1).history.go(0);
		},
		
		
		newaddress_country: function (o){
			
			$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
			$.ajax({
				type: 'get',
				url:  '/index.php',
				data: 'com=account&t=initCountryList',
				success:function(res){
					modal_bg();
					$('.modal_container').append(res);
					$(".buffer_loading").remove();
					getwindowHeight();
					modal_add();
				}
			});		
		},
		
		country_list_check: function(o){
			var country_id = o.attr("data-id");
			$.ajax({
				type: 'get',
				url:  '/index.php',
				data: 'com=account&t=initCountryList&country_id='+country_id,
				success:function(res){
					$(".newaddress_list .country u").text(o.text());
					$(".newaddress_item #country_id").val(country_id);
					$(".newaddress_list .country img").attr("src",o.find("img").eq(0).attr("src"));	
					$(".newaddress_list li .zone_list").empty();
					modal_remove();
					$(".newaddress_list li .zone_list").append(res);
					$(".newaddress_list li.province .inputchang").val($(".newaddress_list li.province .inputchang").attr("dvalue")).css("color","#cccccc");
					$(".newaddress_item #zone_id").val(0);
					
				}
			});	
			
			
		},
		
		province_list_check: function(o){
			var html = o.next().html();
			modal_bg();
			$('.modal_container').append('<ul class="zone_list">'+html+'</ul>');
			getwindowHeight();
			modal_add();
		},
		
		zone_list: function(o){
			var text = o.text();
			var zone_id = o.attr("data-id");
			$(".newaddress_item #zone_id").val(zone_id);
			$(".newaddress_list .province input").val(text).css("color","#000000");
			modal_remove();
		},
		
		more_question_check: function(o){
			if(o.hasClass("arrow_a")){
				o.removeClass("arrow_a");
				o.addClass("arrow_b");
				o.parent().prev().show();
			}
			else{
				o.addClass("arrow_a");
				o.removeClass("arrow_b");
				o.parent().prev().hide();
			}
		},
		switch_size:function(o){
			var sizeText = o.attr('size_name');
			$('.sizeText').each(function(){
				var tmpText = $(this).attr('val_name').toLowerCase();
				if(tmpText==sizeText.toLowerCase()){
					var sizeType = $("#table_size_type").attr("data");
					var conversion = $('#size_'+sizeType+'_'+tmpText.toUpperCase()).html();
					$(this).find('.conversion').html(conversion);
				}else{
					//var sizeArray = $.sizeToSize();
					//if(sizeArray[tmpText]==sizeText.toLowerCase()){
						//$(this).show();
					//}
				}
			});
			
			var data_name=o.attr("size_name");
			var data_node=o.parents(".goods_item_attr").find(".size_detail_box").children("p[val_name="+data_name+"]");
			if(data_node.attr("data-id") == data_name){
				var outheight=data_node.outerHeight();	
				o.parents(".goods_item_attr").find(".size_detail_box").height(outheight);
				data_node.siblings("p").slideUp();
				data_node.slideDown();
			}else{
				$(".size_detail_box p").slideUp();
			}
			
		},
		close_size_box:function(o){
			o.parent().slideUp(300,function(){
				o.parents(".goods_item_attr").find(".size_detail_box").height("0");
			})
		},
		replace_img:function(){
			var htms='<div class="det_modal">'+						
						'<div class="carouse_swipe det_modal_in">'+
							'<div class="carouse_swipe_box det_img_box">'+
								'<ul class="clearfix"></ul>'+
							'</div>'+
							'<ul class="carouse_btn">'+
					            '<li class="prev"><i>prev</i></li>'+            
					            '<li class="next"><i>next</i></li>'+
					        '</ul>'+
							'<ul class="carouse_tab"></ul>'+
						'</div>'+
					'</div>';
			var det_html='';
			$(".detail_swipe .carouse_swipe_box ul li").each(function(){
				var data_src=$(this).children("img").attr("data-src");				
				var img_arc=data_src==undefined?$(this).children("img").attr("src"):data_src;
				var det_htm='<li><img title="" alt="" src="'+img_arc+'" /></li>';
				det_html+=det_htm;
			});
			$(".image_show").after(htms);
			$(".det_img_box ul").html(det_html);
			//var ui_height=$(window).height()/2+$(".det_img_box ul li").outerHeight()/2-20;	
			//$(".det_modal_in .carouse_tab").css("top",ui_height+"px");
		},
		show_img_modal:function(o){	
			var indexs=parseInt(o.parent("li").attr("data-index"));	
			$.newchic_item.replace_img();
			$(".det_modal_in").Swipe({auto:0,resizeAuto:true,continuous:true,disableScroll:false,startSlide:indexs,callback: function(pos){}});
			/*if(!o.parents(".detail_swipe").hasClass("is_add_modal")){				
				o.parents(".detail_swipe").addClass("is_add_modal");
				$.newchic_item.replace_img();
				$(".det_modal_in").Swipe({auto:0,resizeAuto:true,continuous:true,disableScroll:false,startSlide:indexs,callback: function(pos){}});
			}*/
			
			$(".det_modal").fadeIn(200,function(){
				$('html').addClass('sift_move');
				stopScroll();
				$('.det_modal').click(function(){
					/*if(!$(".det_modal .close").hasClass("close_display")){						
						$(".det_modal .close").fadeIn().addClass("close_display");
					}else{						
						$(".det_modal .close").fadeOut().removeClass("close_display");
					}*/
					
					//$(".det_modal .close").click(function(){
						$(this).fadeOut(200,function(){				
							$(".det_modal").remove();
							activeScroll()
							$('html').removeClass('sift_move');	
						});
					//})					
				});					
			});	
		},
		switch_to_img:function(o){
			var val_id=o.attr("value_id");
			var indexs=$(".carouse_swipe_box ul li img[value_id="+val_id+"]").parent().index();
			if(indexs < 0){
				indexs=0;
			}
			$(".carouse_swipe").Swipe({auto:0,resizeAuto:true,continuous:true,disableScroll:false,startSlide:indexs,callback: function(pos){}});
		},
		check_input_position:function(o){
			var d_height=$(document.body).height()
			var w_height=$(window).height();
			var s_height=$(window).scrollTop();
			var o_top=o.offset().top;	
			var o_height=o.outerHeight();
			if(o_top+o_height-s_height<w_height/2) return;	
			console.log(o_top);
			if(d_height-(o_top+o_height)<w_height/2){
				$('html,body').animate({scrollTop:o_top+o_height-w_height/2+20},200);
			} 
		},
		size_tran_click:function(o){	
			if(!o.hasClass("size_tran_display")){
				o.children(".arrow_d").css({"webkitTransform":"rotate(-90deg)","transform":"rotate(-90deg)"});
				o.addClass("size_tran_display");
				o.siblings("ul").slideDown(200);
			}else{
				o.children(".arrow_d").css({"webkitTransform":"rotate(90deg)","transform":"rotate(90deg)"});
				o.removeClass("size_tran_display")
				o.siblings("ul").slideUp(500)
			}
			
		},
		size_tran_list_click:function(o){
			
			var type = o.attr('sizeType');
			var sizes = new Array();
			$('.size_'+type).each(function(){
				sizes[$(this).attr('size')] = $(this).attr('data');
			});
			
			
			$('.size_ul li').each(function(){
				var sizeText = $(this).attr('size_name');
				if(typeof(sizes[sizeText])!="undefined"){
					$(this).html(sizes[sizeText]);
				}
			});
			
			$(".size_ul li").each(function(){
				if($(this).hasClass("active")){
					var sizeText = $(this).attr('size_name');
					$('.sizeText').each(function(){
						var tmpText = $(this).attr('val_name').toLowerCase();
						if(tmpText==sizeText.toLowerCase()){
							var sizeType = o.text();
							var conversion = $('#size_'+sizeType+'_'+tmpText.toUpperCase()).html();
							$(this).find('.conversion').html(conversion);
						}else{
							//var sizeArray = $.sizeToSize();
							//if(sizeArray[tmpText]==sizeText.toLowerCase()){
								//$(this).show();
							//}
						}
					});
				}
			});
			
			
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
			o.parent().siblings("span").find("strong").text(o.text());
			$("#table_size_type").attr("data", o.text());
			$(".arrow_d").css({"webkitTransform":"rotate(90deg)","transform":"rotate(90deg)"});
			$(".size_tran .title").removeClass("size_tran_display");
			o.parent("ul").slideUp(200);
			
			var tableType = $('#table_type').val();
			if(tableType){
				var date = new Date();
				date.setTime(date.getTime() + (24 * 3600 * 1000));
				$.cookie(tableType, type , {path: '/', expires:date});
			} 
			
		},
		reset_img_size:function(){
			$(".goodlist .itembox ul li span.img").height($(".goodlist .itembox ul li").width()*4/3);
		}
		
	}
})(jQuery);

;(function($) {
$.setCurrency = {
	doSelCurrency: function(currency){
		$.setCurrency.autoChangePrice($(".price_currency"), currency, true);
		$(".price_like").each(function(){
			$.setCurrency.autoChangePrice($(this), currency, true);									 
		});
		$(".old_price").each(function(){
			$.setCurrency.autoChangePrice($(this), currency, true);									 
		});
		$(".price").each(function(){
			$.setCurrency.autoChangePrice($(this), currency, true);									 
		});
		
		//设置Cookies币种
		$.setCurrency.setCookieCurrency(currency);
	},
	
	autoChangePrice: function(node, currency, format, attr) { 
		if(!node){return false;}
		var oriPrice = parseFloat(node.attr('oriprice'));
		if(!oriPrice > 0){
			return false;	
		}
		var formatPrice = $.setCurrency.getPriceByCurrency(oriPrice, currency, format);
		
		if(attr){
			node.attr(attr, formatPrice);	
		}else{
			node.text(formatPrice);
			
		}
	},
	
	getPriceByCurrency: function(price, currency, format){
		var rate = eval('CurrencyCfg.' + currency + '[0]');
		var place = eval('CurrencyCfg.' + currency + '[3]');
		var result = parseFloat(price) * parseFloat(rate);
		if(currency != 'USD'){
			result = result * parseFloat(CurrencyLoss);
		}
		result = parseFloat(result.toFixed(place));
		if(format){
			result = $.setCurrency.numberFormat(result, place);
			var sign = eval('CurrencyCfg.' + currency + '[1]');
			(currency == 'RUB') && (sign = ' '+sign) || (sign = sign + ' ');
			var isPrefix = eval('CurrencyCfg.' + currency + '[2]');
			result = isPrefix ? sign+result : result+sign;
		}
		result += "";
		var r = result.split(".")[1];
		if(!r && place > 0){
			result += '.';
			r = result.split(".")[1];
		}
		if(typeof(r) != 'undefined' && r.length < place){
			for(var k = r.length; k < place; k++){
				result += '0';	
			}
		}
		return result;
	},
		
	initCurrency: function(){
		var g_currency = $.GET("currency", window.location.href);
		if($.inArray(g_currency, CurrencyList) >= 0){
			$.setCurrency.doSelCurrency(g_currency);	 
		}else{
			var c_currency = $.setCurrency.getCookieCurrency();
			c_currency = $.inArray(c_currency, CurrencyList) < 0 ? 'USD' : c_currency;
			$.setCurrency.doSelCurrency(c_currency);
		}
	},
	
	setCookieCurrency: function(currency){
		$.cookie("currency", currency, { expires: 7, path: '/' });	
	},
	getCookieCurrency: function(){
		return $.cookie("currency");	
	},
	
	numberFormat: function(s, n) {  
		n = n >= 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		t = "";  
		for (i = 0; i < l.length; i++) {  
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
		}
		var res = t.split("").reverse().join("");
		if(r){
			res += "." + r;
		}
		return res;  
	},
	
	getPriceByCurrencyNew: function(price, currency){
		var rate = eval('CurrencyCfg.' + currency + '[0]');
		var place = eval('CurrencyCfg.' + currency + '[3]');
		var result = parseFloat(price) * parseFloat(rate);
		if(currency != 'USD'){
			result = result * parseFloat(CurrencyLoss);
		}
	
		return result;
	}
}
})(jQuery);

$(document)
.on("click",".menu_bar a",function(){
	$.newchic_item.menu_bar($(this));		
})
.on("click",".wish_icon a",function(){
	$.newchic_item.wish_icon($(this));		
})
.on("click",".header_top .sequence",function(){
	$.newchic_item.sequence($(this));		
})
.on("click",".sequence_item li",function(){
	$.newchic_item.sequence_click($(this));		
})
.on("click",".fixed_bottom_menu .filter",function(){
	$.newchic_item.filter($(this));		
})
/*.on("click",".container .mnc_model",function(){
	alert("0000")
	$.newchic_item.bg_model_click($(this));		
})*/
.on("click",".goods_top_tool .share",function(){
	$.newchic_item.tool_share($(this));		
})

.on("click",".goods_poa_item .next",function(){
	$.newchic_item.quantity_next($(this));		
})
.on("click",".goods_poa_item .prev",function(){
	$.newchic_item.quantity_prev($(this));		
})

.on("click",".addimage_item .note_tips",function(){
	$.newchic_item.addimage_note($(this));		
})
.on("click",".write_reviews_item .note_tips",function(){
	$.newchic_item.writereviews_note($(this));		
})
.on("focus",".addimage_item textarea",function(){if($(this).val()==''){$(this).next().hide();}})
.on("blur",".addimage_item textarea",function(){if($(this).val()==''){$(this).next().show();}})
.on("focus",".write_reviews_item textarea",function(){if($(this).val()==''){$(this).next().hide();}})
.on("blur",".write_reviews_item textarea",function(){if($(this).val()==''){$(this).next().show();}})
.on("click",".categories_filter .arrow_a",function(){
	$.newchic_item.categories_filter_select($(this));		
})
.on("click",".categories_filter .arrow_b",function(){
	$.newchic_item.categories_filter_select_close($(this));		
})
.on("click",".categories_filter_box a",function(){
	$.newchic_item.categories_filter_list($(this));		
})
.on("click",".categories_filter .reset",function(){
	$.newchic_item.categories_filter_reset($(this));		
})
.on("click",".categories_list_nav li",function(){
	$.newchic_item.categories_select($(this));		
})
.on("click","#filter_submit",function(){
	$.newchic_item.filter_submit($(this));		
})
.on("click",".currency_item li",function(){
	$.newchic_item.currency_select($(this));		
})
.on("click",".language_item li",function(){
	$.newchic_item.language_select($(this));		
})
.on("click",".switch",function(){
	$.newchic_item._switch($(this));		
})
.on("click",".fixed_bottom_menu .index_serach,.menu .menu_nav li.search,.detail_serach",function(){
	$.newchic_item.all_search($(this));		
})
.on("click",".search_item .search .close",function(){
	$.newchic_item.search_keyword_close($(this));		
})
.on("keyup focus",".search_item .search .inputchang",function(){
	$.newchic_item.search_complete($(this));		
})
.on("click",".search_item .search_list ul li",function(){
	$.newchic_item.sel_keyword($(this));		
})
.on("input propertychange",".search_item .search .keyword",function(){
	$.newchic_item.search_keyword_blur($(this));		
})
.on("click",".search_item .search_list .clearhistory",function(){
	$.newchic_item.clearhistory($(this));		
})
.on("click",".purchased_item .select",function(){
	$.newchic_item.purchased_select($(this));		
})
.on("click",".selectcountry_item .letter span",function(){
	$.newchic_item.select_country($(this));		
})
.on("click",".reviews span.i_photo",function(){
	$.newchic_item.image_show($(this));		
})
.on("click",".containerImage .main",function(){
	$.newchic_item.clear_containerImage($(this));		
})
.on("click",".newaddress_list li.country",function(){
	$.newchic_item.newaddress_country($(this));		
})
.on("click",".head_nav .prev,.head_nav .icon_head_back",function(){
	$.newchic_item.historyGo($(this));		
})
.on("click",".selectcountry_item .country_list li",function(){
	$.newchic_item.country_list_check($(this));		
})
.on("click",".newaddress_list .province .arrow_d",function(){
	$.newchic_item.province_list_check($(this));		
})
.on("click",".zone_list li",function(){
	$.newchic_item.zone_list($(this));		
})
.on("click",".account_orders .orders_nav",function(){
	$.newchic_item.orders_nav_select($(this));
})

.on("click",".messages_queation_item_list .more_question .arrow_a, .messages_queation_item_list .more_question .arrow_b",function(){
	$.newchic_item.more_question_check($(this));		
})
.on('click','.goods_poa_item .size_ul li',function(){
	$.newchic_item.switch_size($(this));
})
.on('click','.close_border',function(){
	$.newchic_item.close_size_box($(this));	
})
.on('click','.detail_swipe .carouse_swipe_box ul li img',function(){		
	$.newchic_item.show_img_modal($(this));	
})
.on('click','.det_sizes .color option',function(){	
	$.newchic_item.switch_to_img($(this));	
})

.on('focus','.contactform .input_rea input',function(){
	$.newchic_item.check_input_position($(this));	
})
.on('click','.goods_poa_item .goods_item_attr .size_tran .title',function(){	
	$.newchic_item.size_tran_click($(this));	
})
.on('click','.goods_poa_item .goods_item_attr .size_tran ul li',function(){	
	$.newchic_item.size_tran_list_click($(this));	
})
;

var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE鍐呮牳
            presto: u.indexOf('Presto') > -1, //opera鍐呮牳
            webKit: u.indexOf('AppleWebKit') > -1, //鑻规灉銆佽胺姝屽唴鏍�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//鐏嫄鍐呮牳
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //鏄惁涓虹Щ鍔ㄧ粓绔�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴栬€卽c娴忚鍣�
            iPhone: u.indexOf('iPhone') > -1 , //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
            iPad: u.indexOf('iPad') > -1, //鏄惁iPad
            webApp: u.indexOf('Safari') == -1, //鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴            
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


/*if(browser.versions.iPhone || browser.versions.iPad){
	if($(".container .menu").length>0 || $(".container .wish").length>0 || $(".container .image_show").length>0){		
		var iNoBounce_htm='<script src="/templates/wap/js/inobounce.min.js" type="text/javascript" charset="utf-8"></script>';		
		$("body").append(iNoBounce_htm);
		$(document).ready(function(){	
			iNoBounce.disable();
		})
	}	
}
*/

$(".newaddress_list .inputchang").each(function(){
	if($(this).val()!=$(this).attr("dvalue"))
	{
		$(this).css("color","#000000");
	}
});


function submitLoginPannel(form){
	var o = $(form);
	if(o.find(".login_animated").length>0){return false;}
	var validate = true;
	
	if(o.hasClass("sendemail"))
	{
		o.parents().next().find('.validate').each(function(){
			if(!validateInput(this)){
				validate = false;
			}
		});
		if(!validate){
			return false;
		}
		
		
		$('html').addClass('sift_move');
		$("body").append('<div class="login_module"><div class="modal_container"><span>Email Sending ...</span></div></div>');
		$.ajax({	
			url:homeUrl+'index.php',
			type : 'get',
			timeout : 10000,
			dataType:'json',
			data :'com=account&t=dofindpwd&email='+$.trim($("#for_email").val()),
			success:function(data){ 
				setTimeout(function(){
					$(".login_module").find("span").text(data.msg);
				},1000);
				
			}
		});	
	
		
		setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},3000);
		
		return false;
	}
	$(form).find('.validate').each(function(){
		if(!validateInput(this)){
			validate = false;
		}
	});
	if(!validate){
		return false;
	}
	$('html').addClass('sift_move');
	$("body").append('<div class="login_module"><div class="modal_container"><span>Operations...</span></div></div>');
	
	
	var options = {
            url: '/index.php?com=account',
            type: 'post',
            dataType: 'json',
            data: $(".loginPannel").serialize(),
            success: function (res) {
            	if(res.status == true){
					if($('#backUrl').val()){
						window.location.href = $('#backUrl').val();
					}else{
            			window.location.href = res.message;
					}
            	}else{       		       		
        			$(".login_module").find("span").text(res.message);           		
            		setTimeout(function(){
            			$(".login_module").remove();
            			$('html').removeClass('sift_move');
            			$('.loginPannel .password').focus();
            		},3000);
            	}
            	
            }
        };
        $.ajax(options);
	return false;
}
function validateInput(input){
	var validate = true;
	var val = $(input).val();
	var dvalue = $(input).attr('dvalue');
	var type = $(input).attr('type');
	var rule = $(input).attr('rule');
	if(val==dvalue || val.length == 0){
		validate = false;
		inputNotice($(input));
	}
	else{
		if(rule == 'email'){
			if(!zValidate.email(val)){
				validate = false;
				inputNotice($(input));
			}
		}else if(rule == 'password'){
			if(!zValidate.password(val) || val.length<6){
				validate = false;
				inputNotice($(input));				
			}
		}
		else if(rule == 'username'){
			if(!zValidate.password(val) || val.length<3){
				validate = false;
				inputNotice($(input));
			}
		}
	}
	return validate;
}

function searchCheck(){
	var $o = $('.modal_container .search_form .keyword,.cate_view .search_box .form_input');
	var	keyword = $o.val();
	var dvalue = $o.attr('dvalue');
	if(keyword==dvalue){return false;}
	keyword = $.trim(keyword);
	var RexStr = /\<|\>/g;
	keyword = keyword.replace(RexStr, function(MatchStr) { 
		switch (MatchStr) {  
		case "<":  
			return "";break;  
		case ">":
			return "";break; 
		default:  
			break;  
		};
	});
	$o.val(keyword);
	if(keyword==''){
		return false;
	}
	return true;
}

var keyword_Input;
function autoLoad(){
	clearTimeout(keyword_Input);
	keyword_Input = setTimeout(function(){
		var $o = $('.modal_container .search_form .keyword');
		var keywords = $o.val();
		$.ajax({	
			url:homeUrl+'index.php',
			type : 'get',
			timeout : 10000,
			dataType:'html',
			data :'com=ajax&t=searchComplemented&keywords='+keywords,
			success:function(html){      
				$('.modal_container .search_item .search_list').html(html);
			}
		});	
	},300);
}

function clearHistory(){
	$.ajax({	
		url:homeUrl+'index.php',
		type : 'get',
		dataType:'html',
		data :'com=ajax&t=delAllSearchHistory',
		success:function(html){
		}
	});	
}

/*$(document).on("click",".sendemail",function(){
	
});*/

$(".heartbtn").click(function(){
		if($('.opacity').length < 1){
			$(".container").addClass("containerR");
			$(".main").append('<div class="opacity" />');
			$('html').addClass('sift_move');
		$(".fixed_bottom_menu").hide();
		}else{
			$(".container").removeClass("containerR");
			$(".opacity").remove();
			$(".fixed_bottom_menu").show();
			$('html').removeClass('sift_move');
		}
	});	

//寮傛鍔犺浇鏉′欢杩囨护浜у搧
function category_productList(page, filter){
	var cat_id = $("#cate_id").val();
	var searchtag = $("#cate_searchtag").val();
	var sort = $("#attr_sort").attr("data-id");
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=category&isAjax=1&cat_id='+cat_id+'&searchtag='+searchtag+'&page='+page+'&sort='+sort+'&filter='+filter,
		data:'',
		success:function(res){
			$(".itembox #firstUl").append(res.firstLi);
			$(".itembox #secondUl").append(res.secondLi);
			
			if(res.filterTpl){
				$(".filter_item.categories_filter").html("");
				$(".filter_item.categories_filter").html(res.filterTpl);
				
			}
			img_lazyload();
			$("#cate_totalPage").val(res.total);
			$(".buffer_loading").remove();
			$(".loading").remove();
			modal_remove();
		}
	});
}











/* ===========================================================
		澶氬姛鑳介€氱敤鍏煎绉诲姩绔粦鍔ㄥ垏鎹㈠姛鑳�
		
		startSlide (榛樿:0) - Swipe寮€濮嬬殑绱㈠紩
		speed (榛樿:300) - 鍓嶈繘鍜屽悗閫€鐨勯€熷害锛屽崟浣嶆绉�.
		auto (榛樿:0) 鑷姩婊戝姩ms 0涓虹姝�
		tabClick (榛樿:false) 鍒囨崲click/entermouse 
		resizeAuto (榛樿:false) 绐楀彛鎷夊姩鏃舵槸鍚﹂噸杞�
		continuous (榛樿:true) -鏄惁鍙互寰幆鎾斁锛堟敞锛氭垜璁剧疆涓篺alse濂藉儚涔熸槸寰幆鐨勶級
		disableScroll (榛樿:false) - 鍋滄瑙︽懜婊戝姩
		stopPropagation (榛樿:false) -鍋滄浜嬩欢浼犳挱
		callback - 鍥炶皟鍑芥暟锛屽彲浠ヨ幏鍙栧埌婊戝姩涓浘鐗囩殑绱㈠紩.
		transitionEnd - 鍦ㄦ渶鍚庢粦鍔ㄧ粨鏉熷悗鎵ц.
		window.mySwipe = $('').Swipe().data('Swipe');
		var banner = Swipe(
			$(".carouse_swipe")[0],{auto:4000,continuous:true,disableScroll:false,startSlide:0,callback: function(pos){console.log(pos)}
		});
		鎵╁睍 banner.next()
		$(".carouse_swipe").Swipe({auto:4000,continuous:true,disableScroll:false,startSlide:0,callback: function(pos){}});
	 * =========================================================== */
	
	;(function($) {
		$.fn.Swipe = function(params) {
		  return this.each(function() {
			$(this).data('Swipe', new Swipe($(this)[0], params));
		  });
		}
	})(jQuery)
	
	function Swipe(container, options) {
	
	  "use strict";//涓ユ牸妯″紡
	  if (!container) return;
	  
	  var noop = function() {}; 
	  var offloadFn = function(fn) { setTimeout(fn || noop, 0) };//灏嗗嚱鏁版斁鍦ㄩ槦鍒楃殑鏈€鍚庢墽琛�
	  
	  // 妫€娴嬫祻瑙堝櫒鍔熻兘
	  var browser = {
		addEventListener: !!window.addEventListener,
		touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
		transitions: (function(temp) {
		  var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
		  for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
		  return false;
		})(document.createElement('swipe'))
	  };
	
	  var element = container.children[0].children[0];
	  var element_btn = container.children[1];
	  var element_tab = container.children[2];
	  var slides, slidePos, width, length;
	  options = options || {};
	  var index = parseInt(options.startSlide, 10) || 0;
	  var speed = options.speed || 300;
	  var is_len_two=false;
	  options.continuous = options.continuous !== undefined ? options.continuous : true;
	
	  function setup() {

		slides = element.children;//婊氬姩鍏冪礌
		length = slides.length;//婊氬姩鍏冪礌涓暟
	
		// 鍏冪礌鍙湁涓€涓椂绂佺敤婊氬姩
		if (slides.length < 2) options.continuous = false;
	
		//鍙湁浜屼釜鍏冪礌鏃剁殑婊氬姩
		if (browser.transitions && options.continuous && slides.length < 3) {
			is_len_two=true;
		  	element.appendChild(slides[0].cloneNode(true));
		  	element.appendChild(element.children[1].cloneNode(true));//鍏嬮殕浜屼釜鍏冪礌鎻掑叆瀹瑰櫒鍚庨潰
		  	slides = element.children;
		}
	
		width = container.getBoundingClientRect().width || container.offsetWidth;//瀹瑰櫒瀹藉害
		element.style.width = (slides.length * width) + 'px';//瀹瑰櫒鍐呭厓绱犲搴︿箣鍜�
	
		// 鍒涘缓涓€涓暟缁勬潵淇濆瓨婊戝潡浣嶇疆
		slidePos = new Array(slides.length);
		
		// 缁欐瘡涓厓绱犲畾浣�
		var pos = slides.length;
		var slides_tab = '';
		while(pos--) {
			var slide = slides[pos];
			slide.style.width = width + 'px';//缁欐瘡涓瓙鍏冪礌鍒涘缓瀹藉害鏍峰紡
			slide.setAttribute('data-index', pos); //缁欐瘡瀛愪釜鍏冪礌涓€涓簭鍙�
			
			//濡傛灉鏀寔婊戝姩锛岀粰姣忎釜瀛愬厓绱犳坊鍔燾ss3婊戝姩鏍峰紡
			if (browser.transitions) {
				slide.style.left = (pos * -width) + 'px';
				move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
			}
			//鍒涘缓婊戝潡tab
			slides_tab=is_len_two?"<li></li><li></li>":slides_tab + "<li></li>";
		}
	
		$(element_tab).html(slides_tab).children().eq(index).addClass("active");
		imgload();
		
		// 閲嶇疆榛樿寮€濮嬫樉绀哄厓绱犱箣鍓嶅拰涔嬪悗鐨勫弬鏁�
		if (options.continuous && browser.transitions) {
			move(circle(index-1), -width, 0);
			move(circle(index+1), width, 0);
		}
		
		//濡傛灉涓嶆敮鎸佹粦鍔紝缁欏厓绱犳坊鍔犲畾浣嶆牱寮�
		if (!browser.transitions) element.style.left = (index * -width) + 'px';
		
		//鍒濆鍖栧畬鎴愬悗锛岃缃鍣ㄤ负鍙鐘舵€�
		container.style.visibility = 'visible';
		
		//濡傛灉鍙湁涓€涓厓绱犳椂锛屾妸缈婚〉鎸夐挳璁句负闅愯棌鐘舵€�
		if (slides.length < 2){
			element_btn.style.visibility = 'hidden';
			element_tab.style.visibility = 'hidden';
		}
	  }
	  
	  function prev() {
		if (options.continuous) slide(index-1);
		else if (index) slide(index-1);
	  }
	
	  function next() {
		if (options.continuous) slide(index+1);
		else if (index < slides.length - 1) slide(index+1);
	  }
	
	  function circle(index) {
		// a simple positive modulo using slides.length
		return (slides.length + (index % slides.length)) % slides.length;
	
	  }
	
	  function slide(to, slideSpeed) {
		// 濡傛灉宸茬粡婊戝姩
		if (index == to) return;
		
		if (browser.transitions) {
	
		  var direction = Math.abs(index-to) / (index-to); // 1: 鍚戝乏, -1: 鍚戝彸
	
		  // 鑾峰彇婊戝潡鐨勫疄闄呬綅缃�
		  if (options.continuous) {
			var natural_direction = direction;
			direction = -slidePos[circle(to)] / width;
	
			// if going forward but to < index, use to = slides.length + to
			// if going backward but to > index, use to = -slides.length + to
			if (direction !== natural_direction) to =  -direction * slides.length + to;
	
		  }
	
		  var diff = Math.abs(index-to) - 1;
	
		  // move all the slides between index and to in the right direction
		  while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
				
		  to = circle(to);
	
		  move(index, width * direction, slideSpeed || speed);
		  move(to, 0, slideSpeed || speed);
	
		  if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place
		}
		else
		{     
		  //涓嶆敮鎸乼ransitions鏃朵娇鐢╝nimate
		  to = circle(to);
		  animate(index * -width, to * -width, slideSpeed || speed);
		}
	
		index = to;
		offloadFn(options.callback && options.callback(index, slides[index]));
	  }
	  
		//鍥剧墖鎸夐渶鍔犺浇澶勭悊 
		function imgload(){				
			$(element).children().eq(index).find("[data-src]").each(function(){				
				var $this = $(this);
				//$this.html('<img src="'+$this.attr("data-src")+'" alt="'+$this.attr("data-name")+'"/>').removeAttr("data-src");	
				$this.attr({"src":$this.attr("data-src"),"alt":$this.attr("data-src")}).removeAttr("data-src");
			});
		}
	  
		function tabmove(){
			var res_index=is_len_two?index%2:index;
			$(element_tab).children().eq(res_index).addClass("active").siblings().removeClass("active");
			imgload();
		}
	
		function move(index, dist, speed) {
		
			translate(index, dist, speed);
			slidePos[index] = dist;
		
		}
	
		function translate(index, dist, speed) {
		
			var slide = slides[index];
			var style = slide && slide.style;
			
			if (!style) return;
			
			style.webkitTransitionDuration = 
			style.MozTransitionDuration = 
			style.msTransitionDuration = 
			style.OTransitionDuration = 
			style.transitionDuration = speed + 'ms';
			
			style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
			style.msTransform = 
			style.MozTransform = 
			style.OTransform = 'translateX(' + dist + 'px)';
		
		}
	
		function animate(from, to, speed) {
			
			// 濡傛灉涓嶆槸鍔ㄧ敾锛屽氨澶嶄綅
			if (!speed) {
			
			  element.style.left = to + 'px';
			  return;
			
			}
			
			var start = +new Date;
			
			var timer = setInterval(function() {
			  var timeElap = +new Date - start;
			  
			  if (timeElap > speed) {
			
				element.style.left = to + 'px';
			
				if (delay) begin();
			
				options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
			
				clearInterval(timer);
				return;
			
			  }
			
			element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';
			
			}, 4);
		
		}
	
		// 璁剧疆鑷姩婊氬姩
		var delay = options.auto || 0;
		var interval;
		
		function begin() {
			clear();
			interval = setTimeout(next, delay);
		}
		
		function clear() {
			clearTimeout(interval);
		}
		
		function stop() {
			delay = 0;
			clearTimeout(interval);
		}
		
		var start = {};
		var delta = {};
		var isScrolling;      
	
	  // 璁剧疆浜嬩欢鐩戝惉
	  var events = {
	
		handleEvent: function(event) {
	
		  switch (event.type) {
			case 'touchstart': this.start(event); break;
			case 'touchmove': this.move(event); break;
			case 'touchend': offloadFn(this.end(event)); break;
			case 'webkitTransitionEnd':
			case 'msTransitionEnd':
			case 'oTransitionEnd':
			case 'otransitionend':
			case 'transitionend': offloadFn(this.transitionEnd(event)); break;
			case 'resize': offloadFn(setup.call()); break;
		  }
	
		  if (options.stopPropagation) event.stopPropagation();
	
		},
		start: function(event) {
	
		  var touches = event.touches[0];
	
		  start = {
			x: touches.pageX,
			y: touches.pageY,
			time: +new Date
		  };
		  
		  isScrolling = undefined;
		  delta = {};
		  element.addEventListener('touchmove', this, false);
		  element.addEventListener('touchend', this, false);
	
		},
		move: function(event) {

		  if ( event.touches.length > 1 || event.scale && event.scale !== 1) return
		  if (options.disableScroll) event.preventDefault();
		  var touches = event.touches[0];
		  delta = {
			x: touches.pageX - start.x,
			y: touches.pageY - start.y
		  }
		  if ( typeof isScrolling == 'undefined') {
			isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
		  }
		  if (!isScrolling) {
			event.preventDefault();
	
			// 鍋滄寤舵椂鑷姩婊氬姩
			clear();
			if (options.continuous) {
	
			  translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
			  translate(index, delta.x + slidePos[index], 0);
			  translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);
	
			} else {
	
			  delta.x = 
				delta.x / 
				  ( (!index && delta.x > 0               // if first slide and sliding left
					|| index == slides.length - 1        // or if last slide and sliding right
					&& delta.x < 0                       // and if sliding at all
				  ) ?                      
				  ( Math.abs(delta.x) / width + 1 )      // determine resistance level
				  : 1 );                                 // no resistance if false
			  
			  // translate 1:1
			  translate(index-1, delta.x + slidePos[index-1], 0);
			  translate(index, delta.x + slidePos[index], 0);
			  translate(index+1, delta.x + slidePos[index+1], 0);
			}
	
		  }
	
		},
		end: function(event) {
			
		  // measure duration
		  var duration = +new Date - start.time;
	
		  // determine if slide attempt triggers next/prev slide
		  var isValidSlide = 
				Number(duration) < 250               // if slide duration is less than 250ms
				&& Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
				|| Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width
	
		  // determine if slide attempt is past start and end
		  var isPastBounds = 
				!index && delta.x > 0                            // if first slide and slide amt is greater than 0
				|| index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0
	
		  if (options.continuous) isPastBounds = false;
		  
		  // determine direction of swipe (true:right, false:left)
		  var direction = delta.x < 0;
	
		  // if not scrolling vertically
		  if (!isScrolling) {
	
			if (isValidSlide && !isPastBounds) {
	
			  if (direction) {
	
				if (options.continuous) { // we need to get the next in this direction in place
	
				  move(circle(index-1), -width, 0);
				  move(circle(index+2), width, 0);
	
				} else {
				  move(index-1, -width, 0);
				}
	
				move(index, slidePos[index]-width, speed);
				move(circle(index+1), slidePos[circle(index+1)]-width, speed);
				index = circle(index+1);  
						  
			  } else {
				if (options.continuous) { // we need to get the next in this direction in place
	
				  move(circle(index+1), width, 0);
				  move(circle(index-2), -width, 0);
	
				} else {
				  move(index+1, width, 0);
				}
	
				move(index, slidePos[index]+width, speed);
				move(circle(index-1), slidePos[circle(index-1)]+width, speed);
				index = circle(index-1);
	
			  }
	
			  options.callback && options.callback(index, slides[index]);
	
			} else {
	
			  if (options.continuous) {
	
				move(circle(index-1), -width, speed);
				move(index, 0, speed);
				move(circle(index+1), width, speed);
	
			  } else {
	
				move(index-1, -width, speed);
				move(index, 0, speed);
				move(index+1, width, speed);
			  }
	
			}
	
		  }
		  
		  element.removeEventListener('touchmove', events, false)
		  element.removeEventListener('touchend', events, false)
	
		},
		transitionEnd: function(event) {
		  if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
			if (delay) begin();
			options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
			tabmove();
		  }
		}
	  }
	
		// trigger setup
		setup();
		
		// 濡傛灉璁剧疆浜哸uto澶т簬0锛屽紑濮嬭嚜鍔ㄦ粴鍔�
		if (delay) begin();
		
		// 娣诲姞浜嬩欢鐩戝惉
		if (browser.addEventListener) {
		
			// 璁剧疆鍦ㄥ厓绱犱笂鐨勮Е鎽稿紑濮�
			if (browser.touch) {
				element.addEventListener('touchstart', events, false);
			}
			if (browser.transitions) {
				element.addEventListener('webkitTransitionEnd', events, false);
				element.addEventListener('msTransitionEnd', events, false);
				element.addEventListener('oTransitionEnd', events, false);
				element.addEventListener('otransitionend', events, false);
				element.addEventListener('transitionend', events, false);
			}
			
			// 璁剧疆灞忓箷鎷夊姩浜嬩欢
			if(options.resizeAuto) window.addEventListener('resize', events, false);
		} else {
		
			if(options.resizeAuto) window.onresize = function () { setup() }; //IE
		
		}
	  	// 璁剧疆鑷姩婊氬姩
		var tabClick = options.tabClick || false;
		var _tabClick = "mouseenter";
		tabClick && (_tabClick = "click");
		$(element_tab).on(_tabClick, "li", function(){
			clear();
			slide($(this).index());	
			if(delay) begin();
		});
		$(element_btn)
		.on("click", "li.prev", function(){
			clear();
			prev();
			if(delay) begin();
		})
		.on("click", "li.next", function(){
			clear();
			next();
			if(delay) begin();
		});
		/*$.ZSversions.mobile || $(element_btn).find("li").addClass("onhover");*/
		
		
		// 鏆撮湶API
		return {
			setup: function() {
			  setup();
			},
			slide: function(to, speed) {      
			  clear();
			  slide(to, speed);
			  if(delay) begin();
			},
			prev: function() {
				clear();
				prev();
				if(delay) begin();
			},
			next: function() {
				clear();
				next();
				if(delay) begin();
			},
			getPos: function() {
			  // 鑾峰彇褰撳墠鍏冪礌鐨勪綅缃�
			  return index;
			},
			getNumSlides: function() {
			  // 鑾峰彇鍏冪礌鎬讳釜鏁�
			  return length;
			},
			kill: function() {
			  stop();
			  // 閲嶇疆鍏冪礌鏍峰紡
			  element.style.width = 'auto';
			  element.style.left = 0;
			  
			  var pos = slides.length;
			  while(pos--) {
				var slide = slides[pos];
				slide.style.width = '100%';
				slide.style.left = 0;
				if (browser.transitions) translate(pos, 0, 0);
			  }
			
			  // 绉婚櫎缁戝畾浜嬩欢
			  if (browser.addEventListener) {
				element.removeEventListener('touchstart', events, false);
				element.removeEventListener('webkitTransitionEnd', events, false);
				element.removeEventListener('msTransitionEnd', events, false);
				element.removeEventListener('oTransitionEnd', events, false);
				element.removeEventListener('otransitionend', events, false);
				element.removeEventListener('transitionend', events, false);
				window.removeEventListener('resize', events, false);
			  }
			  else {
				window.onresize = null;
			  }
			
			}
	  }
	
	}
	
$(".carouse_swipe").Swipe({auto:0,resizeAuto:true,continuous:true,disableScroll:false,startSlide:0,callback: function(pos){}});





/* ===========================================================
		瀵硅瘽妗嗘ā鎷�
		ZSAlert('This is a custom alert box', 'Alert Dialog');
		ZSConfirm('Can you confirm this?', 'Confirmation Dialog', function(r) {
			ZSAlert('Confirmed: ' + r, 'Confirmation Results');
		});
		ZSPrompt('Type something:', 'Prefilled value', 'Prompt Dialog', function(r) {
			if( r ) alert('You entered ' + r);
		});
		$.alerts.dialogClass = "dialogClass";
		ZSAlert('璁剧疆鑷畾涔夋牱寮�', 'Custom Styles', function() {
			$.alerts.dialogClass = null; // 鎭㈠鍒伴粯璁ょ疆
		});
	 * =========================================================== */
	
	;(function($) {
		var $popup_msg, $popup_msg_title, $popup_msg_content, $popup_msg_message, popup_msg_pos;
		$.ZSmsgBox = {
			verticalOffset: -75,                // 鍨傜洿浣嶇Щpx
			horizontalOffset: 0,                // 姘村钩浣嶇Щpx
			repositionOnResize: true,           // 灞忓箷缂╂斁鏄惁鎵ц閲嶅畾浣�
			overlayOpacity: .55,                // 鑳屾櫙灞傞€忔槑搴�
			overlayColor: '#000000',               // 鑳屾櫙灞傞鑹�
			dialogClass: null,                  // 鑷畾涔夋牱寮忔爣绛�
			alertTitle: 'Alert',
			confirmTitle: 'Confirm',
			promptTitle: 'Prompt',
			
			ajaxload: function(message, title) {
				if( title == null ) title = $.ZSmsgBox.alertTitle;
				$.ZSmsgBox._show(title, message, null, 'ajaxload');
			},
			
			gethtml: function(message, title, ok, cancel, callback) {
				if( title == null ) title = $.ZSmsgBox.alertTitle;
				$.ZSmsgBox._show(title, message, null, 'html', ok, cancel, function(result) {
					if( callback ) callback(result);
				});
			},
			
			blank: function(message,title) {
				if( title == null ) title = $.ZSmsgBox.alertTitle;
				$.ZSmsgBox._show(title, message, null, 'blank');
			},
			
			
			alert: function(message, title, ok, cancel, callback) {
				if( title == null ) title = $.ZSmsgBox.alertTitle;
				$.ZSmsgBox._show(title, message, null, 'alert', ok, cancel, function(result) {
					if( callback ) callback(result);
				});
			},
			
			confirm: function(message, title, ok, cancel, callback) {
				if( title == null ) title = $.ZSmsgBox.confirmTitle;
				$.ZSmsgBox._show(title, message, null, 'confirm', ok, cancel, function(result) {
					if( callback ) callback(result);
				});
			},
				
			prompt: function(message, value, title, ok, cancel, callback) {
				if( title == null ) title = $.ZSmsgBox.promptTitle;
				$.ZSmsgBox._show(title, message, value, 'prompt', ok, cancel, function(result) {
					if( callback ) callback(result);
				});
			},
			
			_show: function(title, msg, value, type, ok, cancel, callback) {
				
				$.ZSmsgBox._hide();
				$.ZSmsgBox._overlay('show');
				
				var css_name = '';
				//var title_h1 = '<h1 class="popup_msg_title"></h1>';
				var title_h1 = '';
				if(title=='none'){
					css_name = 'border';
					title_h1 = '';
				}
				
				$("body").append(
				'<div class="popup_msg '+css_name+'">' +
					title_h1 +
					'<div class="popup_msg_content">' +
					  '<div class="popup_msg_message"></div>' +
					'</div>' +
				'</div>');
				
				$popup_msg = $(".popup_msg");
				$popup_msg_title = $(".popup_msg .popup_msg_title");
				$popup_msg_content = $(".popup_msg .popup_msg_content");
				$popup_msg_message = $(".popup_msg .popup_msg_message");
				if(type=='ajaxload'){
					$popup_msg.css('background','none')
				}
				
				if( $.ZSmsgBox.dialogClass ) $popup_msg.addClass($.ZSmsgBox.dialogClass);
				
				// IE6 Fix
				var popup_msg_pos = ('undefined' == typeof(document.body.style.maxHeight)) ? 'absolute' : 'fixed'; 
				
				$popup_msg.css({
					position: popup_msg_pos,
					zIndex: 99999,
					padding: 0,
					margin: 0
				});
				
				if(title !='none'){
					$popup_msg_title.html(title);
					if(type != 'ajaxload'){
						$popup_msg_title.append('<s onclick="$.ZSmsgBox._hide();"></s>');
					}
				}
				$popup_msg_content.addClass(type);
				if(type == 'html' || type == 'ajaxload'){
					$popup_msg_message.html(msg);	
				}else{
					$popup_msg_message.html('<div class="msg">'+ msg +'</div>');
				}

				$popup_msg.css({
					//minWidth: $popup_msg_message.outerWidth(),
				//	maxWidth: $popup_msg_message.outerWidth()
				});
				
				if(type == 'ajaxload'){
					$popup_msg.html('<div class="loading"><div class="animate-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
				}
				
				$.ZSmsgBox._reposition();
				$.ZSmsgBox._maintainPosition(true);
				
				switch( type ) {
					case 'ajaxload':
						$(".popup_overlay").off("click.overlay");
					break;
					case 'html':
					break;
					case 'blank':
						$popup_msg.remove();
					break;
					case 'alert':
						if(ok!=''){
							$popup_msg_message.after('<div class="popup_msg_panel"><b><input type="button" value="' + ok + '" class="popup_btn_ok" /></b></div>');
						}
						$(".popup_btn_ok").click( function() {
							$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);
							callback(true);
						}).focus().keypress( function(e) {
							if( e.keyCode == 13 || e.keyCode == 27 ) $(".popup_btn_ok").trigger('click');
						});
					break;
					case 'confirm':
						$popup_msg_message.after('<div class="popup_msg_panel"><span><input type="button" value="' + ok + '" class="popup_btn_ok" /></span><span><input type="button" value="' + cancel + '" class="popup_btn_cancel" /></span></div>');
						$popup_msg.css({"top":($(window).height()-$(".popup_msg").outerHeight())/2,"bottom":"auto"});
						$(".popup_btn_ok").click( function() {
							$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);
							if( callback ) callback(true);
						}).focus();
						$(".popup_btn_cancel").click( function() {
							$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);
							if( callback ) callback(false);
						});
						$(".popup_btn_ok, .popup_btn_cancel").keypress( function(e) {
							if( e.keyCode == 13 ) $(".popup_btn_ok").trigger('click');
							if( e.keyCode == 27 ) $(".popup_btn_cancel").trigger('click');
						});
					break;
					case 'prompt':
						$popup_msg_message.append('<br /><input type="text" size="30" class="popup_msg_prompt" />').after('<div class="popup_msg_panel"><span><input type="button" value="' + ok + '" class="popup_btn_ok" /> </span><span><input type="button" value="' + cancel + '" class="popup_btn_cancel" /></span></div>');
						$(".popup_msg_prompt").width( $popup_msg_message.width() );
						$(".popup_btn_ok").click( function() {
							$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);
							if( callback ) callback( $(".popup_msg_prompt").val() );
						});
						$(".popup_btn_cancel").click( function() {
							$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);
							if( callback ) callback( null );
						});
						$(".popup_msg_prompt, .popup_btn_ok, .popup_btn_cancel").keypress( function(e) {
							if( e.keyCode == 13 ) $(".popup_btn_ok").trigger('click');
							if( e.keyCode == 27 ) $(".popup_btn_cancel").trigger('click');
						});
						if( value ) $(".popup_msg_prompt").val(value);
						$(".popup_msg_prompt").focus().select();
					break;
				}
			},
			
			_hide: function() {
				$popup_msg && $popup_msg.remove();
				$.ZSmsgBox._overlay('hide');
				$.ZSmsgBox._maintainPosition(false);
			},
			
			_overlay: function(status) {
				switch( status ) {
					case 'show':
						$.ZSmsgBox._overlay('hide');
						$("body").append('<div class="popup_overlay"></div>');
						$(".popup_overlay").css({
							position: 'absolute',
							zIndex: 99998,
							top: '0px',
							left: '0px',
							right: '0px',
							bottom: '0px',
							height: $(document).height(),
							background: $.ZSmsgBox.overlayColor,
							opacity: $.ZSmsgBox.overlayOpacity
						}).on('click.overlay',function(){
							//popup_remove();
							/*$(".popup_msg").slideUp();					   
							setTimeout(function(){
								$.ZSmsgBox._hide();
							},500);*/
						});
						
					break;
					case 'hide':
						$(".popup_overlay").remove();
					break;
				}
			},
			
			_reposition: function() {
				/*var top = (($(window).height() / 2) - ($popup_msg.outerHeight() / 2)) + $.ZSmsgBox.verticalOffset;
				var left = (($(window).width() / 2) - ($popup_msg.outerWidth() / 2)) + $.ZSmsgBox.horizontalOffset;
				if( top < 0 ) top = 0;
				if( left < 0 ) left = 0;
				
				// IE6 fix
				if('undefined' == typeof(document.body.style.maxHeight)) top = top + $(window).scrollTop();
				
				$popup_msg.css({
					top: top + 'px',
					left: left + 'px'
				});*/
				$(".popup_overlay").height( $(document).height() );
				setTimeout(function(){
					$popup_msg.slideDown();
				},100);
			},
			
			_maintainPosition: function(status) {
				if( $.ZSmsgBox.repositionOnResize ) {
					switch(status) {
						case true:
							$(window).bind('resize', $.ZSmsgBox._reposition);
						break;
						case false:
							$(window).unbind('resize', $.ZSmsgBox._reposition);
						break;
					}
				}
			}
		}
		
		ZSBlank = function(message,title) {
			$.ZSmsgBox.blank(message,title);
		};
		
		ZSAlert = function(message, title, ok, cancel, callback) {
			$.ZSmsgBox.alert(message, title, ok, cancel, callback);
		};
		
		ZSLoad = function(message, title) {
			$.ZSmsgBox.ajaxload(message, title);
		};
		
		ZSHtml = function(message, title, ok, cancel, callback) {
			$.ZSmsgBox.gethtml(message, title, ok, cancel, callback);
		};
		
		ZSConfirm = function(message, title, ok, cancel, callback) {
			$.ZSmsgBox.confirm(message, title, ok, cancel, callback);
		};
			
		ZSPrompt = function(message, value, title, ok, cancel, callback) {
			$.ZSmsgBox.prompt(message, value, title, ok, cancel, callback);
		};
		
	})(jQuery);
	
	
	//邮件订阅提交
	function subscribes_form_submit(obj){
		//域名
		var location_url = homeUrl+'index.php';		
		//获取email的内容
		var email = $(obj).siblings('input').val();
		
		if(!$.trim(email)){
			msgbox(JS_ENTER_EMAIL);	
		}else if(!check_email(email)){//验证邮箱是否合法
			msgbox(JS_VAILD_EMAIL);	
		}else{
			var ajaxTimeoutTest =$.ajax({
				url:location_url,
				timeout : 10000,
				type : 'get',
				dataType:'json',
				data :'com=ajax&t=subscribes&email='+email,
				success:function(obj){			
					msgbox(obj.message);						
				},
				complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
						ajaxTimeoutTest.abort();
					}
				}
			});	
		}
	}


	//js邮箱正则验证
	function check_email(email){
		var reg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
		var r = email.match(reg);
		
		if(r){
			return true;
		}else{
			return false;
		}	
	}

	$(function() {
	  	FastClick.attach(document.body);
	});
	
	//full site
	$("#full_site").on("click",function(){
		var url = $(this).attr("data-href");
		var rep = url.replace('m.','www.');
		rep = rep.replace('?pm=1','');
		rep = rep.replace('?pm=2','');
		window.location.href = rep+'?pm=1';
	});
	
	$(document).on('click','span.text_clear',function(){
		$(this).hide();
		/*$(this).siblings("input[type=text]").val("").focus();
		$(this).hide()*/
	});
	$(document).on('keyup','.login_sign .inputbox input,.search_box input.form_input',function(){
		check_input_isempty($(this));
	});
	
    function check_input_isempty (obj) {
      if(obj.val()!=''){
        obj.siblings("span.text_clear").css({"display":"block"});
      }else{
        obj.siblings("span.text_clear").css({"display":"none"});
      }
    }
    $(function(){
    	$('.login_sign .inputbox input,.search_box input.form_input').each(function(){
    		check_input_isempty($(this));
    	});
    })


