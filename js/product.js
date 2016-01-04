

$(document).on("click", "button.add_bag_btn", function() {
	if($(this).hasClass("gray")){return false;}
	var is_trues=check_chose($(this));
	if (is_trues) {
		$.newchic_product.addbag();
	}
		
})



function check_chose(obj){	
	var is_true=true;
	
	if(parseInt($("#color li.active").attr("value_id")) <= 0 && parseInt($("#size_url li.active").attr("value_id")) > 0){
		msgbox("please choose color.");
		return false;
	}else if(parseInt($("#color li.active").attr("value_id")) > 0 && parseInt($("#size_url li.active").attr("value_id")) <= 0){
		msgbox("please choose size.")
		return false;
	}else if(parseInt($("#color li.active").attr("value_id")) <= 0 && parseInt($("#size_url li.active").attr("value_id")) <= 0){
		msgbox("please choose color and size.")
		return false;
	}
	
	return is_true;
}


(function($) {
	$.newchic_product = {
		addbag: function(o) {
			var qty = parseInt($('#quanity li.active').attr('value_id'));
			var products_id = parseInt($('#products_id').val());
			var attrs = new Array();
			//products_options 379:color 380:size 
			if(parseInt($('#color li.active').attr('value_id'))){
				attrs[379] = parseInt($('#color li.active').attr('value_id'))
			}
			
			if(parseInt($('#size_ul li.active').attr('value_id'))){
				attrs[380] = parseInt($('#size_ul li.active').attr('value_id'))
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
					$('.shopcart .num').html(res);
					msgbox("Success");
				},
				complete: function(){
					fbq('track', 'AddToCart', {
						"content_category":fbCode.content_category,
						"content_type":"product",
						"content_ids":fbCode.content_ids,
					});
				}
			});
		},
		select_goods_poa: function(o){
			var optionItem = $(".select_poa");
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
				colorId = parseInt($('.select_poa .color .active').attr('value_id'));
				sizeId = parseInt($('.select_poa .size .active').attr('value_id'));
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
						if(res.hideBuy == 1){
							$("button.add_bag_btn").addClass("gray");
						}else{
							$("button.add_bag_btn").removeClass("gray");
						}
						$(".StockMessage").html(res.message);
					}
				});					
			}
		},
		
		//切换语言
		changeLang: function(o){
			var code = $(o).attr('code');
			$.cookie("_bgLang", code, { expires: 7, path: '/' });
			return true;
		}
				
	};
	


})(jQuery);




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




/*$(document).ready(function(){
	$(document).on('click','.sec_pri .se_box .se_in',function(){
		if(!$(this).parent().hasClass("se_mode")){
			$(this).parent().addClass("se_mode")
			$(this).siblings("div.det_drop_down").slideDown(200);
			//$(this).parents("dd").siblings("dd").find(".det_drop_down").fadeOut(200);
		}else{
			$(this).siblings("div.det_drop_down").fadeOut(200);
			$(this).parent().removeClass("se_mode")
		}								
		e.stopPropagation();
	});
	
	
	//产品属性li触发
	$(".det_sizes .se_box .det_drop_down li").on("click",function(o){
		$(this).addClass("active").siblings("li").removeClass("active");
		if(typeof($(this).attr('attr_type')) && $(this).attr('attr_type') == 'pro_attr'){
			$.newchic_product.select_goods_poa($(this));
		}
		$(this).parents(".det_drop_down").siblings(".se_in").children("small").text($(this).text());
		$(this).parents(".det_drop_down").slideUp(200,function(){
			$(this).parents(".se_box").removeClass("se_mode");
		})
		o.stopPropagation();										
	});

	
	$(document).on('click',".det_sizes .se_box .se_in",function(e){
		if(!$(this).parent().hasClass("se_mode")){
			$(this).parent().addClass("se_mode")
			$(this).siblings("div.det_drop_down").slideDown(200,function(){
				$(this).find("li").click(function(o){
					if($(this).parent().hasClass("color")) $.newchic_item.switch_to_img($(this));	
					$(this).addClass("active").siblings("li").removeClass("active");
					$(this).parents(".det_drop_down").siblings(".se_in").children("small").text($(this).text());
					$(this).parents(".det_drop_down").slideUp(200,function(){
						$(this).parents(".se_box").removeClass("se_mode");
					})
					o.stopPropagation();
				})
			}).bind(this);
			$(this).parents("dd").siblings("dd").find(".det_drop_down").fadeOut(200);
		}else{
			$(this).siblings("div.det_drop_down").fadeOut(200);
			$(this).parent().removeClass("se_mode")
		}								
		e.stopPropagation();
	});
	
	$(document).click(function(){
		if($(".det_sizes .se_box").hasClass("se_mode")){
			$(".det_sizes .se_box .det_drop_down").fadeOut(200);
			$(".det_sizes .se_box").removeClass("se_mode");
		}
	})
	
	
	$(document).on('click',".det_se_grou ul li .se_g_box",function(e){
		if(!$(this).parent().hasClass("drop_mode")){
			$(this).parent().addClass("drop_mode");
			$(this).siblings("ul.drop_d").slideDown(200,function(){
				$(this).find("li").click(function(){	    						
					$(this).parent().siblings(".se_g_box").children("strong").text($(this).text())
					$(this).parent().fadeOut(200);
					$(this).parents("li").removeClass("drop_mode");
				})
			}).bind(this);
		}else{
			$(this).siblings("ul.drop_d").slideUp(200,function(){
				$(this).parents("li").removeClass("drop_mode");
			}).bind(this);
		}	    				
	});
});
*/


	$(document)
	.on('click','.sec_pri .se_box',function(e){	    				
		e.stopPropagation();
	})
	.on('click','.det_sizes .se_box',function(e){	    				
		e.stopPropagation();
	})	
	.on('click','.sec_pri .se_box .se_in',function(e){
		select_click($(this))	    				
	})
	.on('click',".det_sizes .se_box .se_in",function(e){
		select_click($(this))					
	})					
	.on('click','.det_sizes .se_box .det_drop_down ul li',function(){
		select_li_click($(this));
	})
	.on('click','.sec_pri .se_box .det_drop_down ul li',function(){
		select_li_click($(this));
	})
	.on('click','.det_se_grou ul li ul.drop_d li',function(e){
		se_grou_li_click($(this));
	})
	.on('click',".det_se_grou ul li .se_g_box",function(e){
		se_grou_click($(this));
	});

	
	function select_click(obj){
		if(!obj.parent().hasClass("se_mode")){	    					
			if($(".se_box.se_mode").length>0){	    						
				$(".se_box.se_mode").children(".det_drop_down").fadeOut(100,function(){
					$(".se_box.se_mode").removeClass("se_mode");
				});
			}
			obj.siblings("div.det_drop_down").slideDown(200,function(){
				obj.parent().addClass("se_mode");
			});
		}else{
			obj.siblings("div.det_drop_down").fadeOut(200,function(){
				obj.parent().removeClass("se_mode");
			});							
		}						
	}		
	
	
	function select_li_click(obj){						
		if(obj.parent().hasClass("color")){
			if(typeof(obj.attr('attr_type')) && obj.attr('attr_type') == 'pro_attr'){
				$.newchic_product.select_goods_poa(obj);
			}
			$.newchic_item.switch_to_img(obj);
		} 
		obj.addClass("active").siblings("li").removeClass("active");
		obj.parents(".det_drop_down").siblings(".se_in").children("small").text(obj.text());
		obj.parents(".det_drop_down").slideUp(200,function(){
			obj.parents(".se_box").removeClass("se_mode");
		})						
	}
	
	
	function se_grou_li_click(obj){
		obj.parent().siblings(".se_g_box").children("strong").text(obj.text())
		obj.parent().fadeOut(200);
		obj.parents("li").removeClass("drop_mode");
	}

	function se_grou_click(obj){
		if(!obj.parent().hasClass("drop_mode")){
			obj.parent().addClass("drop_mode");
			obj.siblings("ul.drop_d").slideDown(200);
		}else{
			obj.siblings("ul.drop_d").slideUp(200,function(){
				$(this).parents("li").removeClass("drop_mode");
			}).bind(this);
		}	
	}

	
	$(document).click(function(){	    				
		if($(".se_box").hasClass("se_mode")){
			$(".se_box .det_drop_down").fadeOut(200,function(){
				$(".se_box").removeClass("se_mode");
			});			
		}
	})



/* ===========================================================
币种切换
* =========================================================== */
var fix = 'US$';
$('.currency_ul li,#foot_currency_ul li').on("click",function(){
	var currency = $(this).attr("sel");
	fix = $(this).attr("fix");
	$.setCurrency.doSelCurrency(currency);
});


;(function($) {
$.setCurrency = {
	doSelCurrency: function(currency){
		$.setCurrency.autoChangePrice($(".price_currency"), currency, false);
		$(".price_like").each(function(){
			$.setCurrency.autoChangePrice($(this), currency, true);									 
		});
		$(".old_price").each(function(){
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
			$("#foot_currency").text(fix+' '+currency);
			$("#foot_currency_ul li").each(function(){
				if($(this).attr("sel") == currency){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
				}
			});
			$("#head_currency").text(fix+' '+currency);
			$(".currency_ul li").each(function(){
				if($(this).attr("sel") == currency){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
				}
			});
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


//Add to Wishlist
$(".det_option .add_wish_btn").on("click",function(){
	var _this = $(this);
	if(_this.hasClass("active")){return false;}
	var pid = _this.attr('pid');
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=account&t=addWishlist&products_id='+pid,
		data:'',
		success:function(res){
			if(res.status){
				$.newchic_wish.group_wish();
			}else{
				msgbox(res.message);
			}
			_this.addClass("active");
		}
	});
});


//切换国际尺码
$("#conversion ul li").on("click",function(){
	var _this = $(this);
	var type = _this.attr('sizeType');
	var sizes = new Array();
	
	$('.size_'+type).each(function(){
		sizes[$(this).attr('size')] = $(this).attr('data');
	});
	
	
	$('#size_ul li').each(function(){
		var sizeText = $(this).attr('size_name');
		if(typeof(sizes[sizeText])!="undefined"){
			if($(this).hasClass("active")){
				$("#cur_conversion").html(sizes[sizeText]);
			}
			$(this).html(sizes[sizeText]);
		}
	});
	
	var tableType = $('#table_type').val();
	if(tableType){
		var date = new Date();
		date.setTime(date.getTime() + (24 * 3600 * 1000));
		$.cookie(tableType, type , {path: '/', expires:date});
	} 
});


//邮件订阅提交
function subscribes_form_submit(obj){
	//域名
	var location_url = 'http://'+window.location.host+'/'+'index.php';		
	//获取email的内容
	var email = $(obj).siblings('input').val();
	
	if(!$.trim(email)){
		msgbox('Please enter your email !');	
	}else if(!check_email(email)){//验证邮箱是否合法
		msgbox('Please enter a valid email !');	
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


	