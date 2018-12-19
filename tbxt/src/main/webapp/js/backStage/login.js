var vm = new Vue({
	el:'#login',
	data:{
		userEmail:'',
		passWord:''
	},
	methods:{
		login:function (){
			var data={
				userEmail:this.userEmail,
				passWord:this.passWord
			};
			var url = 'http://localhost:8080/tbxt/ManaLogin';
			this.$http.post(url,data,{emulateJSON:true}).then(function(res){
//				console.log("====1====="+res.body);
				switch(res.body){
			     case 'success':
			    	 layer.msg('登陆成功!',{icon: 1},{
		                    offset:['40%'],
		                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
		              }); 
			    	 setTimeout(function(){
							location.href="/tbxt/skipto_backStage";
						},500);
			       break;
			     case 'password_error':
			    	 layer.msg('密码错误!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
		              }); 
			       break;
			     case 'user_null':
			    	 layer.msg('该用户不存在!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
		              }); 
			       break;
			     default:
			    	 layer.msg('数据异常!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
		              });
			       break;
			}
				},function(err){
				
				})
			}
	},
	mounted(){
		
	},
})

layui.use("layer",function(){
	var layer = layui.layer;  //layer初始化
})
	

