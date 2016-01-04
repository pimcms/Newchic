var rec_page = 2;
var no_index_data = false;
var _type = 2;
//$("#filter").val(2);

//初始化所有分享列表
function initShareList(page,_total){
    $("#total").remove();
    $(".nodata").remove();
    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',
        data: 'com=shots&t=display&isAjax=1&page='+page,
        success:function(res){

            $('.image_show_list').find(".loading").remove();
            $(".image_show_list").append(res.res);
            $(".nodata").remove();
        },
    });
    return false;
}
//初始化我的分享列表
function initMyShareList(page,_total){
    //$("#total").remove();
    $(".nodata").remove();
    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',
        data: 'com=shots&t=display&isAjax=3&page='+page,
        success:function(res){
            if(res==''){
                return false;
            }

            $('.myposts_list ').find(".loading").remove();
            $(".myposts_list #u1").append(res.first);
            $(".myposts_list #u2").append(res.second);
            $(".myposts_list #u3").append(res.third);
            $(".nodata").remove();
        },
    });
    return false;
}

//选项卡切换
$(".image_item h4.title i").on("click",function(){
    if($(this).hasClass("active")) return;
    rec_page = 2;
    $("#total").remove();   
    $(".nodata").remove();

    var _this = $(this);
    
    $(this).addClass("active").siblings().removeClass("active").parent().next().children().eq($(this).index()).show().siblings().hide();

    var filter = _this.attr("data-id");
    _type = _this.attr("data-id");

    //切换标示
    $("#filter").val(filter);
    $(".image_show_item li").html('');
    $("body").append('<div class="buffer_loading">'+loading_html+'</div>'); 

    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',
        data: 'com=shots&t=display&page='+'&isAjax='+filter,
        success: function(res) {
            // var res = $.parseJSON(res); 
            $(".flg").remove();
            $(".flg_ul").remove();
            $("#total").remove();
            $(".buffer_loading").remove();
            if(filter==1){
                $(".image_show_list").append(res.res);
            }else if(filter==2){
                if(!res.status){
                    msgbox('Please login first!','');
                    window.location.href='/login.html';
                    return false;
                }
                $(".myposts_list").append(res.res);
            }      
            
        }
    }); 

});

//滑动加载
    $(".main").scroll(function(){

        if($(".image_show_list .flg").length>0 && (($("#filter").val()==0)||($("#filter").val()==1))){
            if($(".image_show_list .loading").length>0)
            {
                return false;                       
            }
            var _total=$("#total").val();
        
            var srollHeight = $(this).scrollTop();   
            var docHeight = $(".main_box").height();  
            if(rec_page>_total){return ;}
            if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
            {               
                $(".image_show_list").append('<div class="loading">'+loading_html+'</div>');   
                $(".main").animate({ scrollTop:200000},10);
                initShareList(rec_page,_total);
                rec_page++;
            }
        }
        else if($(".myposts_list .flg_ul").length>0 && ($("#filter").val()==2)){
                if($(".myposts_list .flg_ul .loading").length>0)
                {
                    return false;                       
                }
                var _total=$("#total").val();

                var srollHeight = $(this).scrollTop();   
                var docHeight = $(".main_box").height();  
                if(rec_page>_total){return ;}
                if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
                {               
                    $(".myposts_list ").append('<div class="loading">'+loading_html+'</div>');   
                    $(".main").animate({ scrollTop:200000},10);
                    initMyShareList(rec_page,_total);
                    rec_page++;
                }
        }

    });


/*if($(".myposts_list .flg_ul").length>0 && ($("#filter").val()==2))
{   
    //alert($("#filter").val());
    $(window).scroll(function(){

        if($(".myposts_list .flg_ul .loading").length>0)
        {
            return false;                       
        }
        var _total=$("#total").val();//alert(_total);

        var srollHeight = $(this).scrollTop();   
        var docHeight = $(document).height();  
        if(rec_page>_total){return ;}
        if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
        {               
            $(".myposts_list .flg_ul ").append('<div class="loading">'+loading_html+'</div>');   
            $("html,body").animate({ scrollTop:200000},10);
            initMyShareList(rec_page,_total);
            rec_page++;
        }
    });
}*/


function submitAddimage(){   
    window.location.href='/index.php?com=review&t=image_upload';
}


//点赞
function diggMedia(obj,media_id){
	var _obj = $(obj);
	var likenum = parseInt(_obj.text());
	if(_obj.hasClass("active")) return;
	$.ajax({
		url:'/index.php?com=review&t=diggImage&image_id='+media_id,
		type : 'get',
		data :'',
		dataType: 'json',
		success:function(result){
			if(result.status==true){
				likenum = likenum+1;
				_obj.html('<i></i>'+likenum);
				_obj.addClass("active");
			}else{
				ZSAlert(result.message,'','OK');
			}
		}   
	});
}

//判断用户是否购买过该产品
function isPurchase(pid){
	$.ajax({
		url:'/index.php?com=review&t=AjaxIsPurchase&products_id='+pid,
		type : 'get',
		data :'',
		dataType: 'json',
		success:function(res){
			if(res.status==true){
				window.location.href = res.url;
			}else{
				ZSAlert(res,'',JS_OK);
			}
		}   
	});
}



