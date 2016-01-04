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
						msgbox(res.message);
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
			$('html').addClass('sift_move');
			$(".container").addClass('containerR');
			bodyScroll();
			getwindowHeight();
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
	var pids = selWishPids();
	if(pids.length>0){
		$.newchic_wish.move_wish($(this));		
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
				$('html').removeClass('sift_move');
				$(".container").removeClass('containerR');
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
			createNewWishList();
			//ZSHtml(res);
		}
	});
}


function createNewWishList(){
	modal_bg();
	$(".module").css("zIndex","99999");
	var htm='<div class="popup_msg_content html">'+
				'<div class = "popup_msg_message" >'+
					'<div class = "createwishbox" >'+
						'<div class = "createitem" >'+
							'<h2> Create a Wishlist </h2>'+
							'<input type="hidden" name="group_id" id="group_id" value="0">'+
							'<input type="text" name="group_name" class="keyword" msg="Same name." oldname="" value="">'+
						'</div >'+
						'<div class = "btn" >'+
							'<span class = "wishlistCreate " > <i> Create </i></span >'+
							'<span onclick = "popup_remove();" > <i> Cancel </i></span >'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	$('.modal_container').append(htm);
	$(".popup_msg_content").css({"backgroundColor":"#fff"});
	
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