
var buyStyle = false;

$(document).on("click", ".addbag_box button", function() {
	var is_trues=check_chose($(this));
	if (!is_trues) {
		var offtop = $(".head_nav").height();
		$(".goods_poas").prevAll("div").each(function() {
			offtop += $(this).outerHeight();
		});
		$(".main").animate({
			scrollTop: offtop
		}, 500);
		if ($(".add_flase").css("display") == "none") {
			$(".add_flase").fadeIn(200).delay(2000).fadeOut(500);
		}
	} else {
		$.newchic_product.addbag($(this));
		if ($(this).hasClass("addbag_btn")) {
			setTimeout(function() {
				poa_btn_fly();
			}, 1000);
		}
	}
})
.on("click",".goods_poa_item .goods_item_attr>ul li:not('.none,.size_chart')",function(){
	$.newchic_product.select_goods_poa($(this));		
})


function check_chose(obj){	
	var is_true=true;
	var color_ul=obj.parents(".goods_wrap").find("ul.color");
	var color_active=color_ul.children(".active");	
	var sizd_ul=obj.parents(".goods_wrap").find("ul.size");
	var size_active=sizd_ul.children(".active");
	var dialogs=$(".add_flase b");
	if(color_ul.length>0&&sizd_ul.length>0){		
		if(!color_active.length>0&&!size_active.length>0){
			dialogs.text("please choose color and size.")
			return false;
		}else if(!color_active.length>0&&size_active.length>0){
			dialogs.text("please choose color.")
			return false;
		}else if(color_active.length>0&&!size_active.length>0){			
			dialogs.text("please choose size.")
			return false;
		}
	}else if(color_ul.length>0&&!sizd_ul.length>0){
		if(!color_active.length>0){
			dialogs.text("please choose color.")
			return false;
		}
	}else if(!color_ul.length>0&&sizd_ul.length>0){
		if(!size_active.length>0){
			dialogs.text("please choose size.")
			return false;
		}
	}
	return is_true;
}


//buy it now and add to bag 方式的判断
function selectStyle(flg){
	buyStyle = false;
	if(flg == 1){
		buyStyle = true;
	}
}



$(document).on("click", ".fixed_bottoms button", function() {	
	var i_true=check_chose($(".addbag_box button"));
	if(!i_true){
		//$(this).parents(".fixed_bottoms").fadeOut(100, function() {
			$.newchic_product.select_poa($(this));
		//});
	}else{
		$.newchic_product.addbag($(this));
		if($(this).hasClass("addbag_btn")){			
			setTimeout(function() {
				myFly();
			}, 1000);
		}else if($(this).hasClass("buy_btn")){
			window.location.href = '/index.php?com=shopcart';
		}
		
	}

});

(function($) {
	$.newchic_product = {
		addbag: function(o) {
			var qty = parseInt($('.module_detail_item #qty').attr('oldqty'));
			var products_id = parseInt($('#products_id').val());
			var attrs = new Array();
			//products_options 379:color 380:size 
			attrs[379] = parseInt($('.goods_item_attr .color .active').attr('value_id'));
			if(parseInt($('.goods_item_attr .size .active').attr('value_id'))){
				attrs[380] = parseInt($('.goods_item_attr .size .active').attr('value_id'));
			}
			var warehouse = 'CN';
			$.ajax({
				type: 'post',
				url: '/index.php?com=shopcart&t=addproduct',
				dataType: 'json',
				data: {
					'qty': qty,
					'warehouse': warehouse,
					'products_id': products_id,
					'attrs[379]': attrs[379],
					'attrs[380]': attrs[380]
				},
				success: function(res) {
					$('.goods_poas_bottom .bag_info .num').html(res);
					$('.fixed_bottoms .box .bag_info_box .bag_info .num').html(res);
				},
				complete: function(){
					fbq('track', 'AddToCart', {
						"content_category":fbCode.content_category,
						"content_type":"product",
						"content_ids":fbCode.content_ids,
					});
					if($(o).hasClass("buy_btn")){		
						window.location.href = '/index.php?com=shopcart';
					}
				}
			});
		},
		select_goods_poa: function(o){
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
			var optionItem = $(".goods_item_attr");
			var selectCount = 0; 
			optionItem.each(function(){
				var len = 0; 
				$(this).find('li').each(function(){
					if($(this).hasClass('active')){
						   len =1;return false; 	
						}
				});	
				if(len == 1){
					selectCount++;
				}
			});
			if(selectCount){
				var products_id = parseInt($('#products_id').val());
				var warehouse = 'CN';
				var sku = $('#sku').val();
				var value_ids = new Array();
				var data = '&sku='+sku+'&warehouse=CN&products_id='+products_id;
				//products_options 379:color 380:size 
				colorId = parseInt($('.goods_item_attr .color .active').attr('value_id'));
				sizeId = parseInt($('.goods_item_attr .size .active').attr('value_id'));
				if(colorId && !sizeId){
				   value_ids[0] = colorId;
				}
				if(!colorId && sizeId){
				   value_ids[0] = sizeId;
				}
				if(colorId && sizeId){
					value_ids[0] = colorId;
				    value_ids[1] = sizeId;
				}
				
				for(var i=0;i<value_ids.length;i++){
					data += '&value_ids[]='+value_ids[i];
				}
				$.ajax({
					type: 'get',
					url: '/index.php?com=product&t=stockMessage'+data,
					dataType: 'json',
					success: function(res) {
						if(res.clearStock==1){
							$('.MaximumStock').html(res.message);
						}
					}
				});					
			}
		},
		
		select_poa: function(o) {
			var htm = 	'<div class="goods_info">'+
							'<img src="'+pro_img+'">'+
							'<span class="title">'+pro_name+'</span>'+
							'<span class="price">'+pro_price+'</span>'+
						'</div>'
			var html = '<div class="module_detail_item">' + htm + $(".goods_poas").html() + '</div>';
			modal_bg();
			$('.modal_container').append("<div class='modal_msgbox goods_wrap'><div class='modal_msgbox_msg'>" + html + "</div><div class='modal_msgbox_button'></div></div>");
			$('.modal_container .modal_msgbox_button').append("<span class='button_yes'><i>Save</i></span><span class='button_no' onclick='modal_remove_modal_msgbox();'><i>Cancel</i></span>");
			$(".modal_msgbox_msg .goods_poas_bottom").css("display","none");
			
			
			$(document).off("click", ".button_yes").on("click", ".button_yes", function() {
				var is_select=check_chose($(this));
				if(!is_select){
					if ($(".add_flase").css("display") == "none") {
						$(".add_flase").fadeIn(200).delay(2000).fadeOut(500);
					}
				}else{
					var parent_box=$(this).parents(".modal_msgbox");
					var qty = parseInt(parent_box.find("#qty").attr('oldqty'));					
					var products_id = parseInt($('#products_id').val());
					var attrs = new Array();
					//products_options 379:color 380:size 
					attrs[379] = parseInt(parent_box.find('.goods_item_attr .color .active').attr('value_id'));
					if(parseInt($('.goods_item_attr .size .active').attr('value_id'))){
						attrs[380] = parseInt($('.goods_item_attr .size .active').attr('value_id'));
					}
					var warehouse = 'CN';
					$.ajax({
						type: 'post',
						url: '/index.php?com=shopcart&t=addproduct',
						dataType: 'json',
						data: {
							'qty': qty,
							'warehouse': warehouse,
							'products_id': products_id,
							'attrs[379]': attrs[379],
							'attrs[380]': attrs[380]
						},
						success: function(res) {
							if(buyStyle == false){
								$(".fixed_bottoms").show();
								myFly();
								setTimeout(function() {
									$('.goods_poas_bottom .bag_info .num').html(res);
									$('.fixed_bottoms .box .bag_info_box .bag_info .num').html(res);
								},2000);
							}
						},		
						complete: function() {
							modal_remove_modal_msgbox();
							popup_remove();
							if(buyStyle == true){
								window.location.href = '/index.php?com=shopcart';
							}
						}
					});
				}				

			});


			modal_add();
			$(".modal_msgbox").slideDown();
			getwindowHeight();
			var buttonHeight = $(".modal_msgbox_button .button_yes").outerHeight();
			$(".module_detail_item").css("max-height", $(window).height() - buttonHeight - 10);
		}
	};
	


})(jQuery);

function poa_btn_fly() {
	var offset_left = $('.goods_poas').find(".addbag_btn").offset().left;
	var offset_top = $('.goods_poas').find(".addbag_btn").offset().top;
	var oWidth = $('.goods_poas').find(".addbag_btn").outerWidth();
	var offset = $('.goods_poas').find(".num").offset();
	var srollHeight = $(window).scrollTop();
	var flyimage = $(".carouse_swipe .carouse_swipe_box li").eq(0).find("img").attr("src");
	var flyer = $('<img class="ncflyer" src="' + flyimage + '"/>');
	flyer.nc_fly({
		start: {
			left: offset_left+oWidth/2,
			top: offset_top-srollHeight-50
		},
		end: {
			left: offset.left,
			top: offset.top - srollHeight,
			width: 22,
			height: 22
		}
	});
	setTimeout(function() {
		$(".ncflyer").remove();
	}, 1000)
}


function myFly() {	
	//var ol = $(".detail_swipe").offset().left;
	var oHeight = $(window).outerHeight();
	var oWidth = $(window).outerWidth();
	var offset = $('.fixed_bottoms').find(".num").offset();	
	var srollHeight = $(window).scrollTop();
	var flyimage = $(".carouse_swipe .carouse_swipe_box li").eq(0).find("img").attr("src");
	var flyer = $('<img class="ncflyer" src="' + flyimage + '"/>');
	flyer.nc_fly({
		start: {
			left: oWidth/2,
			top: oHeight/2
		},
		end: {
			left: offset.left,
			top: offset.top - srollHeight,
			width: 22,
			height: 22
		}
	});
	setTimeout(function() {
		$(".ncflyer").remove();
	}, 3000)
}


! function(a) {
	a.nc_fly = function(b, c) {
		var d = {
				version: "1.0.0",
				autoPlay: !0,
				vertex_Rtop: 20,
				speed: 1.2,
				start: {},
				end: {},
				onEnd: a.noop
			},
			e = this,
			f = a(b);
		e.init = function(a) {
			this.setOptions(a), !!this.settings.autoPlay && this.play()
		}, e.setOptions = function(b) {
			this.settings = a.extend(!0, {}, d, b);
			var c = this.settings,
				e = c.start,
				g = c.end;
			f.css({
				marginTop: "0px",
				marginLeft: "0px",
				position: "fixed"
			}).appendTo("body"), null != g.width && null != g.height && a.extend(!0, e, {
				width: f.width(),
				height: f.height()
			});
			var h = Math.min(e.top, g.top) - Math.abs(e.left - g.left) / 3;
			h < c.vertex_Rtop && (h = Math.min(c.vertex_Rtop, Math.min(e.top, g.top)));
			var i = Math.sqrt(Math.pow(e.top - g.top, 2) + Math.pow(e.left - g.left, 2)),
				j = Math.ceil(Math.min(Math.max(Math.log(i) / .05 - 75, 30), 100) / c.speed),
				k = e.top == h ? 0 : -Math.sqrt((g.top - h) / (e.top - h)),
				l = (k * e.left - g.left) / (k - 1),
				m = g.left == l ? 0 : (g.top - h) / Math.pow(g.left - l, 2);
			a.extend(!0, c, {
				count: -1,
				steps: j,
				vertex_left: l,
				vertex_top: h,
				curvature: m
			})
		}, e.play = function() {
			this.move()
		}, e.move = function() {
			var b = this.settings,
				c = b.start,
				d = b.count,
				e = b.steps,
				g = b.end,
				h = c.left + (g.left - c.left) * d / e,
				i = 0 == b.curvature ? c.top + (g.top - c.top) * d / e : b.curvature * Math.pow(h - b.vertex_left, 2) + b.vertex_top;
			if (null != g.width && null != g.height) {
				var j = e / 2,
					k = g.width - (g.width - c.width) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2),
					l = g.height - (g.height - c.height) * Math.cos(j > d ? 0 : (d - j) / (e - j) * Math.PI / 2);
				f.css({
					width: k + "px",
					height: l + "px",
					"font-size": Math.min(k, l) + "px"
				})
			}
			f.css({
				left: h + "px",
				top: i + "px"
			}), b.count++;
			var m = window.requestAnimationFrame(a.proxy(this.move, this));
			d == e && (window.cancelAnimationFrame(m), b.onEnd.apply(this))
		}, e.destory = function() {
			f.remove()
		}, e.init(c)
	}, a.fn.nc_fly = function(b) {
		return this.each(function() {
			void 0 == a(this).data("nc_fly") && a(this).data("nc_fly", new a.nc_fly(this, b))
		})
	}
}(jQuery);