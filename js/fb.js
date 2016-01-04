
$(document).ready(function(){
	$('.facebbok .log_facebook').click(function(){
	      FB.login(function(response){
	    	  //后台api/me 获取不了email了,要在前台这里获取
	    	  FB.api('/me', function(res) {
	    	  fbLogin(response,res.email);
	    	  });
	      },{scope: 'email'});
	});
	$('.facebbok .logout_facebook').click(function(){
	     fbLogout();	
	});

});
 function fbLogin(response,email){
	$.ajax({
		dataType: "json",
		url:'/index.php',
		type:'get',
		data:'com=account&t=fbLogin&token='+response.authResponse.accessToken+'&email='+email,
		success:function(res){
			//登陆成功或失败提示窗口
			//alert(res.data);
			if(res.bool){
				window.location.href="index.php";
			}
		} 
	});
 }
 function fbLogout(){
		FB.logout(function(response) {
         // Person is now logged out
       });
 }

  window.fbAsyncInit = function() {
  FB.init({
    //appId      : '1621278071448836', //for www.12chic.com
	//appId      : '1158848280808056', //for www.pandora.com
	//  appId      : '1420983381555750', //for www.new.com
	  appId      : '1687761184785187', //for www.newchic.com 
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    //  testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
     // document.getElementById('status').innerHTML = 'Please log ' +
      //  'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
     // document.getElementById('status').innerHTML = 'Please log ' +
     //   'into Facebook.';
    }
  }
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      //document.getElementById('status').innerHTML =
      //  'Thanks for logging in, ' + response.name + '!';
    });
  }

