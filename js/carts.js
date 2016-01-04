;(function($) {
	$.NCCart = {
		//delete cart item
		moveCart:function(o){
			var cart_id = o.attr('cart_id');
			var cart_ids = new Array();
			if(!$.isArray(cart_id)){
				cart_ids.push(cart_id);  
			}
			$.ajax({
				type:'get',
				dataType:'html',
				url:'index.php?com=shopcart&t=removeItem',
				data:{'cart_ids':cart_ids},
				success:function(res){
					window.location=window.location.href;
				},
				complete:function(){
					msgbox('loading..');
				}
			});
		},
		
		shipmentList: function(o){
			var id = o.parents(".warehouse_list").attr("id");
			var msg = '<span class="ship_cancel" onclick="popup_remove();">'+JS_CANCEL+'</span>'
			var html = '<div class="shipping_methed">'+o.next().html()+msg+'</div>';
			ZSHtml(html,'',JS_YES,JS_CANCEL,function(res){if(res){$o.changeShipment();}});
			getwindowHeight();
		},
		
		changeShipment: function(o){
			o.addClass("active").append('<s />').siblings().removeClass("active").find("s").remove();
			
			var shipcode = o.attr('code');
			var warehouse = o.attr('warehouse');
			var data = 'shipcode='+shipcode+'&warehouse='+warehouse;
			$.ajax({
				type:'get',
				dataType:'JSON',
				url:'index.php?com=shopcart&t=changeShipment',
				data:data,
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					window.location=window.location.href;
				},
			});
		},
		
		showDiscount:function(o){			
			if(!o.siblings(".shop_discount_body").hasClass("dis_show")){
				o.siblings(".shop_discount_body").slideDown(200).addClass("dis_show");					
			}else{
				o.siblings(".shop_discount_body").slideUp(200).removeClass("dis_show");
			}
			
		},
		
		selectDiscount:function(o){			
			if(!o.hasClass("shop_discount_item_selected")){
				o.addClass("shop_discount_item_selected");
				o.siblings(".shop_discount_item").removeClass("shop_discount_item_selected");
				
				//var data_title=o.attr("data_title");
				$(".shop_discount_title h4 span.result_title").text(o.attr("data_title"));
				var data_val=o.find(".data_val").get(0).tagName=="SPAN"?o.find(".data_val").text():o.find(".data_val").val();
				//alert(data_val);
				$(".shop_discount_title h4 span.th_color").text(data_val);
			}
			
		},
		
		selectCoupon:function(){
			var htm='<div class="det_coupon_modal">'+
						'<div class="modal_copon_body">'+
							'<h4>Select a coupon</h4>'+
							'<div class="coupon_box">'+
								'<small>US$10 off orders of US$20.0 or mo</small>'+
								'<small class="coupon_code">Code:<strong>#4a2352</strong></small>'+
								'<small>Expires on: Nov 30-0001</small>'+
								'<span>$10.00Bonus</span>'+
							'</div>	'+	
							'<div class="coupon_box">'+
								'<small>US$10 off orders of US$20.0 or mo</small>'+
								'<small class="coupon_code">Code:<strong>#4a2352</strong></small>'+
								'<small>Expires on: Nov 30-0001</small>'+
								'<span>$10.00Bonus</span>'+
							'</div>	'+	
							'<div class="coupon_box">'+
								'<small>US$10 off orders of US$20.0 or mo</small>'+
								'<small class="coupon_code">Code:<strong>#4a2352</strong></small>'+
								'<small>Expires on: Nov 30-0001</small>'+
								'<span>$10.00Bonus</span>'+
							'</div>	'+	
							'<div class="coupon_box">'+
								'<small>US$10 off orders of US$20.0 or mo</small>'+
								'<small class="coupon_code">Code:<strong>#4a2352</strong></small>'+
								'<small>Expires on: Nov 30-0001</small>'+
								'<span>$10.00Bonus</span>'+
							'</div>	'+	
						'</div>'+
					'</div>';
			$(document.body).append(htm);			
			$(".modal_copon_body").animate({"bottom":"0"},200);
			$(".det_coupon_modal").click(function(){
				$(".modal_copon_body").animate({"bottom":"-100%"},200,function(){
					$(".det_coupon_modal").fadeOut(100).remove();
				});
			})
			$(".modal_copon_body .coupon_box").click(function(e){
				var coupon_code=$(this).find("small.coupon_code strong").text()
				$(".shop_discount .shop_discount_item .shop_discount_item_top input").val(coupon_code);
				$(".shop_discount_title h4 span.th_color").text(coupon_code);
				$(".modal_copon_body").animate({"bottom":"-100%"},200,function(){
					$(".det_coupon_modal").fadeOut(100).remove();
				});
				e.stopPropagation();
			})
		},
		
		disppendModal:function(o){			
			$(".modal_copon_body").animate({"bottom":"-100%"},200,function(){
				$(".det_coupon_modal").fadeOut(100);
			});
		},
		
		
		editProduct: function(o){
			var editHeight = $(window).height();
			var warehouse = o.attr('warehouse');
			var cart_id = o.attr('cart_id');
			var qty = o.attr('qty');
			var data = 'com=shopcart&t=editAttr';
			data += '&warehouse='+warehouse;
			data += '&cart_id='+cart_id;
			data += '&qty='+qty;
			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				dataType:'html',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(html){
					ZSHtml(html);
					getwindowHeight();
					$(".editproductbox").css("max-height",editHeight-80);
				}   
			});
		},
		
		cartCoupon: function(o){
			$.ajax({
				url:homeUrl+'index.php?com=shopcart&t=cartCoupon',
				type : 'post',
				data : '',
				dataType:'html',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(html){
					ZSHtml(html);
					$(".popup_msg_message .bag_coupon_item").css("max-height",$(window).height()-35);
				}   
			});
		},
		
		selCoupon: function(o){
			var $c = o.siblings('.code');
			var coupon = $c.attr('coupon');
			var title = o.siblings('.title').text();
			$.NCCart.appCoupon(coupon);
		},
		
		enterCoupon: function(o){
			var $c = o.siblings('.inputchang');
			var dvalue = $c.attr('dvalue');
			var coupon = $c.val();
			if(dvalue==coupon){return false;}
			$.NCCart.appCoupon(coupon);
		},
		
		cleanCoupon:function(o){
			$.ajax({
				url:homeUrl+'index.php?com=shopcart&t=useCoupon',
				type : 'post',
				data : 'clearCode=1',
				dataType:'json',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					window.location=window.location.href;
				},
				complete:function(){
					popup_remove();
				}
			});
		},
		
		appCoupon:function(code){
			$.ajax({
				url:homeUrl+'index.php?com=shopcart&t=useCoupon',
				type : 'post',
				data : 'coupon_code='+code,
				dataType:'json',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					if(res.status==false){
						ZSAlert(res.message,'',JS_OK);
						setTimeout(function(){
							popup_remove();
						},2500);
					}else{
						$(".bag_coupon_tag").html(res.message);
						window.location=window.location.href;
						popup_remove();
					}
				},
			});
		},
		
		paypalCheckout: function(o){
			var needTel =  $('.fixed_bag_pay #needPhone');
			if(needTel.val()>0){
				var tel = $('.bag_phone_list .inputchang');
				var phone = tel.val();
				phone = $.trim(phone)
				if(phone=='' || phone==tel.attr('dvalue')){
					ZSAlert(JS_ENTER_PHONE,'',JS_OK,'','');
					return false;
				}
				$('.fixed_bag_pay #phone').val(phone);
			}
			$.NCCart.FBcheckout();
			$('#submitCheckout').submit();
		},
		
		addressList:function(o){
			$.ajax({
				url:homeUrl+'index.php?com=shopcart&t=addressList',
				type : 'post',
				data : '',
				dataType:'html',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(result){
					ZSConfirm(result,'',JS_SAVE,JS_CANCEL,function(res){if(res){$.NCCart.saveSelAddress();}});
				}
			});
		},
		
		saveSelAddress:function(){
			var $o = $('.bag_address_list ul .active');
			var length = $o.length;
			if(length==0){
				setTimeout(function(){
					ZSAlert(JS_SEL,'',JS_OK);
				},1000);
				return false;
			}
			var key_id = $o.attr('key');
			$.ajax({
				url:homeUrl+'index.php?com=shopcart&t=selectAddress',
				type : 'post',
				data : 'selCartAddress='+key_id+'&userIsSelect=true',
				dataType:'html',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(result){
					window.location=window.location.href;
				}
			});
		},
		
		selAddress:function(o){
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
		},
		
		addressForm:function(o){
			var url=homeUrl+'index.php?com=shopcart&t=addressForm';
			window.location=url;
		},
		
		selPoa:function(o){
			if(o.hasClass('none')){
				return false;
			}
			o.addClass("active").append('<i />').siblings().removeClass("active").find("i").remove();
			$.NCCart.checkStock();
		},
		
		checkStock:function(){
			var attrLen = $('.goods_item_attr').length;
			var hasActive = 0;
			var data = 't=checkAttrStock&isCart=1';
			if(attrLen>0){
				$('.goods_item_attr ul li').filter('.active').each(function(){
					var oid = $(this).attr('option_id');
					var vid = $(this).attr('value_id');
					data += '&option_ids[]='+oid+'&value_ids[]='+vid;
					hasActive++;
				});
				if(attrLen != hasActive){
					return false;	
				}
			}
			
			var products_id = $('.addbag_item .products_id').val();
			var sku = $('.addbag_item .sku').val();
			var warehouse = $('.addbag_item .warehouse').val();
			data += '&products_id='+products_id+'&sku='+sku+'&warehouse='+warehouse;
			$.ajax({
				url:homeUrl+'index.php?com=product',
				type : 'post',
				data :data,
				dataType:'json',
				success:function(res){
					$.each(res, function(key,value){
						$('.goods_item_attr ul li').each(function(){
							var vid = $(this).attr('value_id');
							$(this).removeClass('none').find("s").remove();
							if(vid==value){
								$(this).attr('class','none').append('<s />');
							}
						});
					});
				}
			});
		},
		
		chQty:function(o){
			var num = 1;
			if(o.hasClass('prev')){
				num = -1;
			}
			var parent = o.parent();
			var qtyNote = parent.find('#qty');
			var qty = qtyNote.val();
			if(qty<=1 && num==-1){
				return false;
			}
			qty = parseInt(qty);
			num = parseInt(num);
			//qty = qty+num;
			qtyNote.val(qty);
			qtyNote.prev().removeClass('gray');
			if(qty<=1){
				qtyNote.prev().addClass('gray');
			}
		},
		
		inQty:function(o){
			var qty= o.val();
			var num = qty;
			if(isNaN(qty)){
				num = 1;
				o.val(num);
			}
			o.prev().removeClass('gray');
			if(num<=1){
				o.prev().addClass('gray');
			}
		},
		
		saveProduct:function(o){
			var products_id = $('.addbag_item .products_id').val();
			var cart_id = $('.addbag_item .cart_id').val();
			var warehouse = $('.addbag_item .warehouse').val();
			var qty = parseInt($('.goods_item_quantity #qty').val());
			var data = 'com=shopcart&t=submitEditAttr';
			data += '&warehouse='+warehouse;
			data += '&products_id='+products_id;
			data += '&cart_id='+cart_id;
			data += '&quantity='+qty;
			
			var attrLen = $('.goods_item_attr').length;
			var hasActive = 0;
			if(attrLen>0){
				$('.goods_item_attr ul li').filter('.active').each(function(){
					var oid = $(this).attr('option_id');
					var vid = $(this).attr('value_id');
					data += '&id['+oid+']='+vid;
					hasActive++;
				});
				if(attrLen != hasActive){
					return false;	
				}
			}

			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				dataType:'html',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					window.location=window.location.href;
				}
			});
		},
		
		saveForLater:function(o){
			var cart_id = o.attr('cart_id');
			if(!cart_id){ return false;}
			var cart_ids = new Array();
			cart_ids.push(cart_id);
			$.ajax({
				url:homeUrl+'index.php',
				type : 'post',
				data : {'com':'shopcart','t':'saveForLater','cart_ids':cart_ids},
				dataType:'json',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					if(res.status==false){
						if(res.url){
							window.location=res.url;
							setTimeout(function(){
								popup_remove();
							},1000);
						}else{
							ZSAlert(res.message);
						}
					}else{
						window.location=window.location.href;
						setTimeout(function(){
							popup_remove();
						},1000);
					}
				}
			});
		},
		
		moveToCart:function(o){
			var cart_id = o.attr('cart_id');
			var data = 'com=shopcart&t=moveToCart&cart_ids[]='+cart_id;
			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				beforeSend:function(){
					ZSLoad('','');
				},
				success:function(){
					window.location.href=window.location.href;
				}   
			});
		},
		
		toggleLater:function(o){
			var $o = o.find('.opt');
			if($o.hasClass('arrow_a')){
				$('.later_list').slideUp(500);
				$o.removeClass('arrow_a').addClass('arrow_b');
			}else{
				$('.later_list').slideDown(500);
				$o.removeClass('arrow_b').addClass('arrow_a');
			}
		},
		
		removeLaterCart:function(o){
			var cart_id = o.attr('cart_id');
			var data = 'com=shopcart&t=removeTempProduct&cart_ids[]='+cart_id;
			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				beforeSend:function(){
					ZSLoad('','');
				},
				success:function(){
					window.location.href=window.location.href;
				}   
			});
		},
		
		usePoints:function(o){
			var $o = o.parent().find('.inputchang');
			var points = $o.val();
			var maxPoints = $o.attr('points');
			points = parseInt(points);
			if(isNaN(points) || points<0 || points>maxPoints){
				return ;
			}
			var data = 'com=shopcart&t=usePoints&points='+points+'&clearPoints=0';
			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				dataType: 'JSON',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(res){
					if(res.status==false){
						ZSAlert(res.message,'',JS_OK);
						setTimeout(function(){
							popup_remove();
						},2500);
					}else{
						window.location.href=window.location.href;
					}
				}   
			});
		},
		
		cleanPoints:function(o){
			var data = 'com=shopcart&t=usePoints&points=0&clearPoints=1';
			$.ajax({
				url:homeUrl+'index.php',
				type : 'get',
				data :data,
				dataType: 'JSON',
				beforeSend:function(){
					ZSLoad('');
				},
				success:function(){
					window.location.href=window.location.href;
				}   
			});
		},
		
		FBcheckout:function(){
			var products_id = fbCode.content_ids;
			var currency = fbCode.currency;
			var value = fbCode.value;
			fbq('track', 'Purchase', {
				"content_type":"product",
				"content_ids":products_id,
				"value":value,
				"currency":currency,
			});
		},
		
	}
})(jQuery);

//提交表单
function submitAddress(obj){	
	valiter = true;
	checkForm();
	if(valiter == false){return;}
	var _this = $(obj);
	if(_this.hasClass("gray")){return false;}
	$("#addressForm").ajaxSubmit({  
		type: 'post',  
		dataType: 'json',
		url: homeUrl+"index.php?com=shopcart&t=saveAddress" ,  
		success: function(data){
			$("html,body").animate({ scrollTop:0},10);
			if(data.data){
				ZSAlert(data.data,'',JS_OK);
			}
			
			if(data.bool==true){
				_this.addClass("gray");
				setTimeout(function(){
					window.location.href=homeUrl+"index.php?com=shopcart";
				},1000);
			}
		},  
		error: function(XmlHttpRequest, textStatus, errorThrown){
			ZSAlert(data.data,'',JS_OK);
		}  
	});
}

$(document)
.on("click",".warehouse_list .goods_list_item .poa .remove",function(){
	var $o = $(this);
	ZSConfirm(JS_REPRO,'',JS_YES,JS_CANCEL,function(res){if(res){$.NCCart.moveCart($o);}});
	getwindowHeight();
})
.on("click",".shipping_total .shipping_box strong",function(){
	var $o = $(this);
	$.NCCart.shipmentList($o);		
})
.on("click",".shipping_methed u",function(){
	var $o = $(this);
	$.NCCart.changeShipment($o);		
})
.on("click",".bag_item h4.title .coupon_btn",function(){
	$.NCCart.cartCoupon($(this));		
})
.on("click",".bag_coupon_item .coupon_code .use_coupon",function(){
	$.NCCart.enterCoupon($(this));		
})
.on("click",".coupon_select .use",function(){
	$.NCCart.selCoupon($(this));		
})
.on("click",".bag_item .bag_coupon_tag .clean_coupon",function(){
	$.NCCart.cleanCoupon($(this));		
})
.on("click",".bag_item .bag_address_tag",function(){
	$.NCCart.addressList($(this));		
})
.on("click",".bag_address_list ul li",function(){
	$.NCCart.selAddress($(this));		
})
.on("click",".fixed_bag_pay .paypal",function(){
	$.NCCart.paypalCheckout($(this));		
})
.on("click",".warehouse_list .goods_list_item .poa .poa_list",function(){
	$.NCCart.editProduct($(this));		
})
.on("click",".goods_poa_item ul li",function(){
	$.NCCart.selPoa($(this));		
})
.on("click",".goods_item_quantity .quantity_box span",function(){
	$.NCCart.chQty($(this));		
})
.on("keyup",".goods_item_quantity .quantity_box input",function(){
	$.NCCart.inQty($(this));		
})
.on("click",".bag_item .add_address",function(){
	$.NCCart.addressForm($(this));		
})
.on("click",".addbag_item .continue i",function(){
	$.NCCart.saveProduct($(this));
})
.on("click",".warehouse_list .goods_list_item .saveforLater",function(){
	$.NCCart.saveForLater($(this));
})
.on("click",".laterbox .goods_list_item .addLaterToCart",function(){
	$.NCCart.moveToCart($(this));
})
.on("click",".laterbox h4 span",function(){
	$.NCCart.toggleLater($(this));
})
.on("click",".laterbox .goods_list_item .remove",function(){
	$.NCCart.removeLaterCart($(this));
})
.on("click",".bag_coupon_item .use_points",function(){
	$.NCCart.usePoints($(this));
})
.on("click",".bag_item .bag_coupon_tag .clean_points",function(){
	$.NCCart.cleanPoints($(this));		
})
.on("click",".shop_discount_item_bot",function(){
	var $o = $(this);
	$.NCCart.selectCoupon($o);
});


$(".shop_discount_body .shop_discount_item").click(function(){
	var $o = $(this);
	$.NCCart.selectDiscount($o);
});