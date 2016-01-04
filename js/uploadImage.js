$('textarea').mousedown(function(){
	if(!parseInt($("#p_id").val())){
		msgbox($("#p_id").attr('msg'),'');
		return;
	}
});

$(document).on("click",".addimage_list",function(){
	if(!parseInt($("#p_id").val())){
		msgbox($("#p_id").attr('msg'),'');
		return;
	}else{
		$('#imageFiles').css('display','block');
	}
});

$(document).on("change","#imageFiles",function(){
	return ajaxFileUpload();
});
var ajaxnum = 0;
//异步上传图片
function ajaxFileUpload(tempId)
{
	ajaxnum++;
	var file = $('#imageFiles').val();
	var type=file.substring(file.lastIndexOf(".")+1,file.length).toLowerCase();
	if(type!="jpg"&&type!="gif"&&type!="png"){
		// var msg = $('#addimg').attr('msg');
		// $(".tips_error").text(msg);
		msgbox($('#imageFiles').attr('msg'),'');
		return false;
	}
	
	var products_id = $('#p_id').val();

	$.ajaxFileUpload({
		url:'/index.php?com=review',
		secureuri:false,
		fileElementId:'imageFiles',
		dataType: 'json',
		data:{t:'uploadReviewImage','products_id':products_id},
		// data:{t:'uploadReviewImage'},
		success: function (res)
		{
			if(res.status == false)
			{
				msgbox(res.message,'');
			}else{				
				var html = '<li class="file"><div class="img_show"><img class="lastli" src="'+res.image+'" style="visibility: visible;"></img><span class="img_del" img_name="'+res.fileName+'" img_path="'+res.imageName+'">×</span></div><input type="hidden" name="imageNames[]" value="'+res.imageName+'"></li>';
				$('.add').before(html);
				if($(".lastli").length == 10){
					$('.add').hide();
				} 				
			}
		}
	});
	return false;
}

//删除图片
$(document).on("click",".img_del",function(){
	var _img_name = $(this).attr("img_name");
	var _imgPath = $(this).attr("img_path");
	var _here = $(this);
	$.ajax({
        url: '/index.php',
        type: 'get',
        data: 'com=review&t=ajaxRemoveImage&imageName='+_img_name+'&imgpath='+_imgPath,
        success: function(res) {
        	$(".tips_error").empty();
        	var _this=_here.parent().parent();
        	_this.hide(300,function(){_this.remove()});
        }
    });
});

$(document).on("click",".righttextbtn",function(){
	if(!parseInt($("#p_id").val())){
		msgbox($("#p_id").attr('msg'),'');
		return;
	}

	var _content = $("#content").val();
	var _pid=$("#p_id").val();
  var _uploadFile=$('.file');

	if(!_content){
		msgbox($('#content').attr('msg'),'');
		// showMsgBox($("#content").attr("error"), 3000);
		return;
	}

	var arr = _content.split(' ');
	if(arr.length < 5){
		msgbox($('#content').attr('msg2'),'');
		return;
	}
	
	$.ajax({
          type: "post",
          url: "/index.php?com=review&t=postImageReview",	 
          data: $("#reviewForm").serialize(),
          //dataType: 'json',	
          success: function(data) {
            _uploadFile.remove();
            $("#content").val('');
            // $( "#reviewForm").resetForm();
        	  msgbox(data,'');
          },
          error: function(data) {
        	  msgbox(data,'');
          }
    })
});


$(document).on("click","#sub_btn",function(){

    var contents = $("#contents").val().trim();
    contents.replace(/\s+/, " ");
    if(contents==$("#contents").attr('dvalue') || contents == '' || contents.split(' ').length < 5){
        msgbox($('#contents').attr('msg'),'');
        return false;
    }else if(contents.length > 500){    
        msgbox($('#contents').attr('msg2'),'');
        return false;
    }  
    $.ajax({
          type: "post",
          url: "/index.php?com=review&t=submitMediaComment",    
          data: $("#reviewForm").serialize(),
          // data :data,
          dataType: 'json',   
          success: function(res) {
            if(res.logined == false){
              msgbox(res.message,'');
              window.location.href='/login.html';
            }else{
              if(res.status==true){
                msgbox(res.message,'');
                window.location.reload();
              }else{
                msgbox(res.message,'');
              }
            }            
          },
          error: function(res) {
              msgbox(res.message,'');
          }
    })
});


var rec_page = 2;
var no_index_data = false;

//初始化评论列表
function initReviewList(page,_total,id){
    // $("#total").remove();
    $(".nodata").remove();
    $.ajax({
        url: '/index.php',
        type: 'get',
        dataType:'JSON',
        data: 'com=review&t=showMoreComment&id='+id+'&isAjax=1&page='+page,
        success:function(res){
            if(res==''){
                return false;
            }
            $('.reviews_list').find(".loading").remove();
            $(".reviews_list").append(res.listStr);
            $(".nodata").remove();
            //$("#total").val(res.total); 
        },
    });
    return false;
}

//滑动加载
if($(".reviews_list li").length>0)
{       
    $(".main").scroll(function(){
        if($(".reviews_list .loading").length>0)
        {
            return false;                       
        }
        var _total=$("#total").val(); 
        var id=$("#media_id").val();      
        var srollHeight = $(this).scrollTop();   
        var docHeight = $(".main_box").height();  
        if(rec_page>_total){return ;}
        if (docHeight - srollHeight - $(this).height()<20 && !no_index_data)
        {               
            $(".reviews_list").append('<div class="loading">'+loading_html+'</div>');   
            $(".main").animate({ scrollTop:200000},10);

            initReviewList(rec_page,_total,id);
            rec_page++;
        }
    });
}

