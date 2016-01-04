(function($){
	$.newchic_wish = {
		addwish: function(o){
			if(o.hasClass("active")){return false;}
			var pid = o.attr('pid');
			$.ajax({
				type:'POST',
				dataType:'JSON',
				url:'/index.php?com=account&t=addWishlist&products_id='+pid,
				data:'',
				success:function(res){
					if(res.status){
						o.addClass("active");
						$.newchic_wish.group_wish();
					}else if(res.noLogin){
						msgTipsbox(2, res.message, function(re){
							if(re){
								window.location.href=homeUrl+'login.html';
							}
						},'',JS_CANCEL,JS_LOGIN);
						//msgbox(res.message);
					}else{
						o.addClass("active");
					}
				}
			});
		},

		group_wish: function(o){
			groupWishlist();
		},
		
		group_list: function(o){
			groupWishlist(1);
		},
		
		move_group: function(o){
			moveGroup(o);
		},
		
		create_wish: function(o){
			groupRename(0);
			//getwindowHeight();
		},
		
		wishlistCreate: function(o){
			if(o.parents(".createwishbox").find(".keyword").hasClass("login_animated")){return false;}
			var wishlist_status = false;
			var keyword = o.parents(".createwishbox").find(".keyword");
			var val = keyword.val();
			var msg = keyword.attr("msg");
			var val_length = val.split(/\s+/);
			
			if(!val)
			{
				keyword.addClass("login_animated login_shake");
				setTimeout(function(){
					keyword.removeClass("login_animated login_shake");
				},1500);
				return false;
			}
			else
			{
				$(".index_wishlist li").each(function(){
					var name = $(this).attr("id");
					if(val.toLowerCase() == name.toLowerCase())
					{
						keyword.addClass("login_animated login_shake").val(msg);
						wishlist_status = true;
						setTimeout(function(){
							keyword.removeClass("login_animated login_shake").val(val);
						},1500);
					}
				});
				if(!wishlist_status) 
				{
					var group = o.parents(".createwishbox").find("#group_id");
					var group_id = group.val();
					editGroup(val,group_id,o);
				}
			}
		},
		
		editwishlist: function(o){
			var edit = o.attr("dmsg");
			var msg = o.attr("msg");
			if(o.hasClass(msg))
			{
				o.removeClass(msg).text(edit);
				$(".checkwishlist").hide();
				$(".fixed_bottom_checkwish").hide();
				
				$('html').removeClass('sift_move');
				$(".container").removeClass('containerR');
			}
			else
			{
				o.addClass(msg).text(msg);
				$(".checkwishlist").show();
				$(".fixed_bottom_checkwish").show();
			}
		},
		
		checkwishlist: function(o){
			if(o.hasClass("active"))
			{
				o.removeClass("active");
			}
			else
			{
				o.addClass("active");
			}
			if($(".checkwishlist .active").length>0)
			{
				$(".fixed_bottom_checkwish .move,.fixed_bottom_checkwish .remove").removeClass("gray");
				$(".fixed_bottom_checkwish .rename,.fixed_bottom_checkwish .del").addClass("gray");
			}
			else
			{
				$(".fixed_bottom_checkwish .move,.fixed_bottom_checkwish .remove").addClass("gray");
				$(".fixed_bottom_checkwish .rename,.fixed_bottom_checkwish .del").removeClass("gray");
			}
		},

		move_wish: function(o){
			if($('.container').hasClass("containerR")){				
				$.newchic_item.bg_hide_wish();
			}else{
				$(".container").addClass("containerR");
				//$(".header_top_fixed").addClass("pull");
				if(!$(".container .mnc_model").length>0){
					$(".container").append('<div class="mnc_model" data-target="wish"></div>');
					$(".container .mnc_model").css({"zIndex":"190"});
				}				
				$(".mnc_model").fadeIn(function(){
					if(browser.versions.iPhone || browser.versions.iPad) iNoBounce.enable();
					$(".container .mnc_model").click(function(){
						$.newchic_item.bg_model_click($(this));
					})
				});
				$(".container .wish").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)","zIndex":"191"});
				//$(".container .main,.head_nav").css({"webkitTransform":"translate(-15rem,0)","transform":"translate(-15rem,0)"});
				//$(".fixed_bottom_menu").hide();
				if(!(browser.versions.iPhone || browser.versions.iPad)) $('html').addClass('sift_move');
				if($(".head_nav .righttextbtn").length>0) $(".head_nav .righttextbtn").hide();
				$(".wish .index_wishlist").css("height",$(window).height()-$(".wish h2").outerHeight());
				$(".index_goodlist_item").append('<div class="loading" />');
				$(".popup_overlay").css({"right":$(".wish").outerWidth(),"top":$(".head_nav").outerHeight()});				
			}
			/*$('html').addClass('sift_move');
			$(".container").addClass('containerR');
			bodyScroll();
			getwindowHeight();*/
			
			/*$.newchic_item.wish_icon($(this));
			if($('.container').hasClass("containerR")){
				$(".head_nav .righttextbtn").hide();
			}else{
				$(".head_nav .righttextbtn").show();
			}*/
		},
		
		delete_group: function(o){
			var group_id = o.attr('group_id');
			delete_group(group_id);
		},
		
		group_rename: function(o){
			var group_id = o.attr('group_id');
			groupRename(group_id);
		}
	}
})(jQuery);


$(document)
.on("click",".addnewwish a",function(){
	$.newchic_wish.create_wish($(this));		
})
.on("click",".goodlist .addwish",function(){
	$.newchic_wish.addwish($(this));		
})
.on("click",".goods_detail .save",function(){
	$.newchic_wish.addwish($(this));		
})
.on("click",".wishlistCreate",function(){
	$.newchic_wish.wishlistCreate($(this));		
})
.on("click",".checkwishlist i",function(){
	$.newchic_wish.checkwishlist($(this));		
})
.on("click",".editwishlist",function(){
	$.newchic_wish.editwishlist($(this));		
})
.on("click",".fixed_bottom_checkwish span .move",function(){
	//$.newchic_item.wish_icon($(this));
	var pids = selWishPids();
	if(pids.length>0){
		$.newchic_wish.move_wish($(this));
		/*$('html').removeClass('sift_move');
		$(".container .wish").css({"webkitTransform":"translate(0,0)","transform":"translate(0,0)"});
		$(".wish .index_wishlist").css("height",$(window).height()-$(".wish h2").outerHeight());
		$(".index_goodlist_item").append('<div class="loading" />');
		$(".popup_overlay").css({"right":$(".wish").outerWidth(),"top":$(".head_nav").outerHeight()});*/
	}
})
.on("click", ".fixed_bottom_checkwish span .remove", function(){
	var pids = selWishPids();
	if(pids.length>0){
		removeWish(pids);
	}
})
.on("click", ".fixed_bottom_checkwish span .del", function(){
	$.newchic_wish.delete_group($(this));
})
.on("click", ".fixed_bottom_checkwish span .rename", function(){
	$.newchic_wish.group_rename($(this));
})
.on("click", ".index_wishlist .change_group", function(){
	$.newchic_wish.move_group($(this));
});


function groupWishlist(type){
	$.ajax({
		type:'POST',
		dataType:'json',
		url:'/index.php?com=account&t=groupWishlist&type='+type,
		data:'',
		success:function(res){
			$('.wish').html(res);			
		}
	});
}

function moveGroup(o){
	var pids = selWishPids();
	var group_id = o.attr('group_id');
	group_id = parseInt(group_id);
	if(pids.length>0 && group_id>0){
		$.ajax({
			type:'POST',
			dataType:'json',
			timeout : 10000,
			url:'/index.php?com=account&t=moveGroup&group_id='+group_id+'&products='+pids,
			data:'',
			beforeSend: function(){
				bufferLoad();
			},
			success:function(res){
				if(res.code=='00'){
					$('.checkwishlist').each(function(){
						$o = $(this);
						if($o.find('i').hasClass('active')){
							$o.closest('li').remove();
						}
					});
					groupWishlist(1);
				}
				$(".checkwishlist").hide();
				$(".fixed_bottom_checkwish").hide();
				/*$('html').removeClass('sift_move');
				$(".container").removeClass('containerR');*/
				$.newchic_item.bg_hide_wish();
				$(".editwishlist").removeClass("Done").text("Edit");
				if($(".checkwishlist .active").length>0)
				{
					$(".fixed_bottom_checkwish .move,.fixed_bottom_checkwish .remove").removeClass("gray");
					$(".fixed_bottom_checkwish .rename,.fixed_bottom_checkwish .del").addClass("gray");
				}
				else
				{
					$(".fixed_bottom_checkwish .move,.fixed_bottom_checkwish .remove").addClass("gray");
					$(".fixed_bottom_checkwish .rename,.fixed_bottom_checkwish .del").removeClass("gray");
				}
			},
			complete: function(){
				moveBuffer();
			}
		});
	}
}

function groupRename(group_id){
	$.ajax({
		type:'POST',
		url:'/index.php?com=account&t=groupRename',
		data:'group_id='+group_id,
		success:function(res){
			ZSHtml(res);			
			$(".popup_msg").css({"left":"0","right":"0","top":"0","bottom":"auto","margin":"auto","height":"auto"});
		}
	});
}

function editGroup(group_name,group_id,o){
	$.ajax({
		type:'POST',
		dataType:'json',
		url:'/index.php?com=account&t=editGroup&group_name='+group_name+'&group_id='+group_id,
		data:'',
		success:function(res){
			var msg = res.message;
			msgbox(msg);
			if(res.code=='00'){
				group_id = parseInt(group_id);
				if(group_id>0){$('.index_header_top h2').html(group_name);}
				$(".wish").html(res.wishlist);
			}
			popup_remove();
		}
	});
}

function selWishPids(){
	var pids = new Array();
	var $o;
	$('.checkwishlist').each(function(){
		$o = $(this);
		if($o.find('i').hasClass('active')){
			pids.push($o.attr('wishPid'));
		}
	});
	return pids;
}

function removeWish(pids){
	$.ajax({
		type:'POST',
		dataType:'json',
		url:'/index.php?com=account&t=removeWish&products_id='+pids,
		data:'',
		success:function(res){
			$('.checkwishlist').each(function(){
				$o = $(this);
				if($o.find('i').hasClass('active')){
					$o.closest('li').remove();
				}
			});
		}
	});
}

function delete_group(group_id){
	$.ajax({
		type:'POST',
		dataType:'json',
		url:'/index.php?com=account&t=removeGroup&group_id='+group_id,
		data:'',
		success:function(res){
			if(res.code=='00'){
				window.location.href=res.url;
			}
		}
	});
}