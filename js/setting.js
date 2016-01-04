function saveChangepassword(obj){
	if($(".account_changepassword").find(".login_animated").length>0){return false;}
    var new_password = $.trim($('#new_password').val());
    var confirm_password = $.trim($('#confirm_password').val());
	var validate = true;
	
	$(".account_changepassword").find('.validate').each(function(){
		if(!validateInput(this)){
			validate = false;
		}
	});
	if(!validate){
		msgbox($("#new_password").attr('msg'));
		return false;
	}
	if(confirm_password != new_password){
        msgbox($("#confirm_password").attr('msg'));
        return false;
    }
	
	$('html').addClass('sift_move');
	$("body").append('<div class="login_module"><div class="modal_container"><span>modifying...</span></div></div>');

	$.ajax({
        type: 'post',  
        data: $("#resetPasswordForm").serialize(),
        dataType: 'json',
        url: "index.php?com=account&t=wapUpdatepassword" ,  
        success: function(data){ 
			if(data.status){
					setTimeout(function(){
						$(".login_module").find("span").text(data.msg);
						$(".inputchang").val('');
						$(".pwdtip").show();
					},4000);					
					setTimeout(function(){
						$(".login_module").remove();
						$('html').removeClass('sift_move');
					},8000);
			}else{
					setTimeout(function(){
						$(".login_module").find("span").text(data.msg);
						$(".inputchang").val('');
						$(".pwdtip").show();
					},4000);					
					setTimeout(function(){
						$(".login_module").remove();
						$('html').removeClass('sift_move');
					},8000);
			}		
        },  
        error: function(XmlHttpRequest, textStatus, errorThrown){  
    		setTimeout(function(){
				$(".login_module").find("span").text('error occurs');		
			},4000);				
			setTimeout(function(){
				$(".login_module").remove();
				$('html').removeClass('sift_move');
			},8000);
        }  
    }); 

	return false;
}

// $(".account_editprofile .upload_input").change(function(){
// 	var val = $(this).next().val();
// 	$(this).next().attr("src",val);
// });

$("#imageFiles").on("change",function(){
	
		$('html').addClass('sift_move');
		$("body").append('<div class="login_module"><div class="modal_container"><span>modifying...</span></div></div>');
		
		var file = $('#imageFiles').val();
		var type=file.substring(file.lastIndexOf(".")+1,file.length).toLowerCase();
		if(type!="jpg"&&type!="gif"&&type!="png"){

			setTimeout(function(){
				$(".login_module").find("span").text($("#imageFiles").attr('msg1'));		
			},2000);			
			setTimeout(function(){
				$(".login_module").remove();
				$('html').removeClass('sift_move');
			},3000);
			return false;
		}
		
		$.ajaxFileUpload({
		url:'/index.php?com=account',
		secureuri:false,
		fileElementId:'imageFiles',
		dataType: 'json',
		data:{t:'uploadAvatarsImage'},
		success: function (res, status)
		{
			if(res.errors != '')
			{
				setTimeout(function(){
					$(".login_module").find("span").text(res.errors);		
				},2000);				
				setTimeout(function(){
					$(".login_module").remove();
					$('html').removeClass('sift_move');
				},3000);
			}
			else
			{					
				setTimeout(function(){
					$(".login_module").find("span").text('Upload success!');		
				},2000);
				
				setTimeout(function(){
					$(".login_module").remove();
					$('html').removeClass('sift_move');
				},3000);
				$("#imageFiles").next().attr("src",res.image);
				window.location.href='/index.php?com=account&t=personalInformation';			
			}
		},
		error: function (data, status, e)
		{
				setTimeout(function(){
					$(".login_module").find("span").text($("#imageFiles").attr('msg2'));		
				},2000);				
				setTimeout(function(){
					$(".login_module").remove();
					$('html').removeClass('sift_move');
				},3000);
		}
	});
	return false;
	
});

function saveEditprofile(obj){
	var validate = true;
	//if($(".account_editprofile").find(".login_animated").length>0){return false;}
	//抖动改为提示
	/*	$(".account_editprofile").find('.validate').each(function(){
			if(!validateInput(this)){
				validate = false;
			}
		});
		if(!validate){
			return false;
		}*/
	var nickMsg=$("#nickname").attr('msg');
	var tel=$("#telephone").val();
	var fax=$("#fax").val();
	var fname=$.trim($("#firstname").val());
	var lname=$.trim($("#lastname").val());
	var name=$.trim($("#nickname").val());

	$('html').addClass('sift_move');
	$("body").append('<div class="login_module"><div class="modal_container"><span>modifying...</span></div></div>');

	var reg =  /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/g;

	if(fname.length<2||fname==$('#firstname').attr('dvalue')){
	   /* setTimeout(function(){
			$(".login_module").find("span").text($("#firstname").attr('msg'));			
		},2000);*/		
		/*setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},6000); */
		msgbox($("#firstname").attr('msg'));
		$("#firstname").focus();
		validate = false;
		return false;
	}
	if(lname.length<2||lname==$('#lastname').attr('dvalue')){
	   /* setTimeout(function(){
			$(".login_module").find("span").text($("#lastname").attr('msg'));			
		},2000);		
		setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},6000); */
		msgbox($("#lastname").attr('msg'));
		$("#lastname").focus();
		validate = false;
		return false;
	}
	if(name.length<5||name.length<5||name==$('#nickname').attr('dvalue')){
	    /*setTimeout(function(){
			$(".login_module").find("span").text($("#nickname").attr('err'));			
		},2000);		
		setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},6000);*/ 
		msgbox($("#nickname").attr('err'));
		$("#nickname").focus();
		validate = false;
		return false;
	}	

	if(tel.length>25||(tel&&!tel.match(reg))){
	    /*setTimeout(function(){
			$(".login_module").find("span").text($("#telephone").attr('msg'));			
		},2000);
		
		setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},6000); */
		msgbox($("#telephone").attr('msg'));
		$("#telephone").focus();
		validate = false;
		return false;
	}
	if(fax.length>25||(fax&&!fax.match(reg))){
	   /* setTimeout(function(){
			$(".login_module").find("span").text($("#fax").attr('msg'));			
		},2000);
		
		setTimeout(function(){
			$(".login_module").remove();
			$('html').removeClass('sift_move');
		},6000); */
		msgbox($("#fax").attr('msg'));
		$("#fax").focus();
		validate = false;
		return false;
	}
	
	if(validate == false) return;

	$.ajax({
        type: 'post',  
        data: $("#personalForm").serialize(),
        dataType: 'json',
        url: "index.php?com=account&t=updateProfile" ,  
        success: function(msg,status){
			if(msg){
					setTimeout(function(){
						$(".login_module").find("span").text(msg);
					},2000);					
					setTimeout(function(){
						$(".login_module").remove();
						$('html').removeClass('sift_move');
					},6000);
				//msgbox(msg);
			}
        },  
        error: function(XmlHttpRequest, textStatus, errorThrown){  
		    		setTimeout(function(){
						$(".login_module").find("span").text(nickMsg);			
					},2000);
					
					setTimeout(function(){
						$(".login_module").remove();
						$('html').removeClass('sift_move');
					},6000); 
        	//msgbox(nickMsg);
        }  
    }); 
	
	// setTimeout(function(){
	// 	$(".login_module").find("span").text("修改完毕.");		
	// },2000);
	
	// setTimeout(function(){
	// 	$(".login_module").remove();
	// 	$('html').removeClass('sift_move');
	// },3000);
	return false;
}