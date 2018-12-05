window.onload=function(){
	$(".layui-btn").click(function(){
		console.log("点击了登陆按钮");
		login_ajax();	//执行login的异步
	});
}

function login_ajax(){
	console.log("此对话显示该js正在执行login_ajax");
	var manager_acount=$("input[name='manager_acount']").val();
	var manager_password=$("input[name='manager_password']").val();
	console.log("manager_acount==="+manager_acount);
/*	var form=Document.getElementById("loginuser");*/
	var formData=new FormData();
	formData.append("adminInfo.username",manager_acount);
	formData.append("adminInfo.password",manager_password);
	
	$.ajax({
		url:"/exhibitionsystem/adminlogin/adminLogin_adminLogin",
		type:"post",
		data:formData,		//前台传给后台的数据
		//报错请加入以下三行，则ajax提交无问题
        cache: false,  
        processData: false,  
        contentType: false,
		success:function(result){
			var dd = JSON.parse(result);		//转换成json对象
			console.log("result----"+result);
			if(dd=="success"){	
				console.log("====");
				toastr.success("用户登陆成功!");
				setTimeout(function(){
					location.href="/exhibitionsystem/skip/skip_intoBackground";
				},1000);
			}else{ 
				if(dd=="error"){
				toastr.error("用户账户或密码输入错误!");
			}
		}}
		
	});
}
function logout(){

	layer.confirm('确认退出吗？',function(){
		$.ajax({
			url:"/exhibitionsystem/adminlogin/adminLogin_logout",
			type: "post",
	        //报错请加入以下三行，则ajax提交无问题
	        cache: false,  
	        processData: false,  
	        contentType: false,
	        success: function(result){
	        	if(result=="logoutSuccess"){
	        		toastr.success("成功退出用户后台管理!");
	        		setTimeout(function() {
	           		 location.href="/exhibitionsystem/skip/skip_intoLogin";
				        }, 500);
	        	}
	        }
		});
	});}

