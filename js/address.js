var rec_page = 2;
var no_index_data = false;

//地址信息滑动加载
if($(".account_item .account_address_list").length>0)
{		
	$(".main").scroll(function(){
		if($(".account_item .loading").length>0 || no_index_data)
		{
			return false;						
		}
		var srollHeight = $(this).scrollTop();   
		var docHeight = $(".main_box").height();  
		if(rec_page>_total){return ;}
		if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
		{				
			
			$(".account_item").append('<div class="loading">'+loading_html+'</div>');	
			$("html,body").animate({ scrollTop:200000},10);
			
			initAddressList(rec_page);
			rec_page++;	
		}
	});
}
	
//初始化地址信息列表
function initAddressList(page){
	$.ajax({
		type:'POST',
		dataType:'JSON',
		url:'/index.php?com=account&t=addressList&isAjax=1&page='+page,
		data:'',
		success:function(res){
			if(!res || res.listStr==''){
				no_index_data = true;
				return false;
			}
			$('.account_item').find(".loading").remove();
			$(".account_item").append(res.listStr);
			_total = res.total_page;
			$(".buffer_loading").remove();
		}
	});
	return false;
}
	
	
//默认地址设置
function setDefault(obj,book_id) {
	var id = parseInt(book_id);
	if (id <= 0) return false;
	var _this = $(obj);
	ZSConfirm(set_default_address_tips,'',JS_OK,JS_CANCEL,function(result){
		if(result){
			$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
			var data = "com=account&t=setDefaultAddress&address_id=" + id;
			$.ajax({
				type: "POST",
				dataType: "json",
				data: data,
				url: "/index.php",
				success: function(res) {
					$(".default").not(_this).removeClass("active");
					_this.addClass("active");
					$(".buffer_loading").remove();
				}
			});
		}
	});
	return false;
}

function removeAddress(obj,book_id){
	var _this = $(obj);
	var deleteid = new Array();
	deleteid[0] = book_id;	
	var data = "address_ids=" + deleteid;
	modal_remove_modal_msgbox();
	$("body").append('<div class="buffer_loading">'+loading_html+'</div>');
	$(".account_item").html("");
	no_index_data = true;
	$.ajax({
		type: "POST",
		url: "/index.php?com=account&t=deleteAddress",
		dataType: "json",
		data: data,
		success: function(res) {
			rec_page = 2;
			no_index_data = false;
			initAddressList(1);
		}
	});
	
	return false;
	
}
	
//移除地址
function deleteAddress(obj,book_id) {
	ZSConfirm(_tip,'', "OK", "Cancel", function(r){
		if(r){removeAddress(obj,book_id);}
	});
	return;	
}

var valiter = true;

//表单检查
function checkForm(){
	var full_name = $("input[name='full_name']");
	var address = $("input[name='address']");
	var address2 = $("input[name='address2']");
	var city = $("input[name='city']");
	var postcode = $("input[name='postcode']");
	var zone_name = $("input[name='zone_name']");
	var zone_id = $("input[name='zone_id']");
	
	if(!$.trim(full_name.val()) || $.trim(full_name.val()) == full_name.attr('dvalue')){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(full_name.attr("err_tip"));
		full_name.focus();
		valiter = false;
		return ;
	}
	
	
	if($.trim(full_name.val()) != '' && ($.trim(full_name.val()).split(" ").length-1) < 1){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(full_name.attr("err_tip2"));
		full_name.focus();
		valiter = false;
		return ;
	}

	
	if(address.val() == '' || address.val() == address.attr('dvalue')){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(address.attr("err_tip"));
		address.focus();
		valiter = false;
		return ;
	}
	
	
	if($.trim(address2.val()) == $.trim(address2.attr('dvalue'))){
		address2.val('');
	}
	
	if((zone_name.val() == '' && zone_id.val() == 0) || (zone_name.val() == '' || zone_name.val() == zone_name.attr('dvalue')) ){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(zone_name.attr("err_tip"));
		zone_name.focus();
		valiter = false;
		return ;
	}
	
	if(city.val() == '' || city.val() == city.attr('dvalue')){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(city.attr("err_tip"));
		city.focus();
		valiter = false;
		return ;
	}
	
	if(postcode.val() == '' || postcode.val() == postcode.attr('dvalue')){
		$("html,body").animate({ scrollTop:0},10);
		msgbox(postcode.attr("err_tip"));
		postcode.focus();
		valiter = false;
		return ;
	}
	
	
}
	
	
//提交表单
function saveAddress(obj){	
	checkForm();
	if(valiter == false) return;
	var _this = $(obj);
	//if(_this.hasClass("gray")){return false;}
	$("#addressForm").ajaxSubmit({  
		type: 'post',  
		dataType: 'json',
		url: "/index.php?com=account&t=addAddress" ,  
		success: function(data){
			$("html,body").animate({ scrollTop:0},10);
			
			if(data.bool==true){
				ZSConfirm(data.data,'','View','Continue',function(res){
					if(res){
						window.location.href="/index.php?com=account&t=address";
					}else{
						clearForm();
					}
				});
				
			}
		},  
		error: function(XmlHttpRequest, textStatus, errorThrown){
			msgbox(data.data);
		}  
	});
}


//清空表单
function clearForm(){
	$("input[name='full_name']").val($("input[name='full_name']").attr('dvalue'));
	$("input[name='address']").val($("input[name='address']").attr('dvalue'));
	$("input[name='address2']").val($("input[name='address2']").attr('dvalue'));
	$("input[name='city']").val($("input[name='city']").attr('dvalue'));
	$("input[name='postcode']").val($("input[name='postcode']").attr('dvalue'));
}
	
	
	
	
	