var vm = new Vue({
	el:'#backstage',
	data:{
		userNickname:'',
	},
	methods:{
		//注销用户
		logout : function(){
			var url = '/tbxt/logout';
			this.$http.post(url).then(function(res) {
				// 处理成功的结果
				if(res.body=='logoutSuccess'){
					layer.msg('成功退出!',{icon: 1},{
                        offset:['40%'],
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                  }); 
					setTimeout(function(){
						location.href="/tbxt/loginBack.html";
					},1000);
				}else{
					layer.msg('退出异常',{icon: 5},{
                        offset:['40%'],
                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
                  }); 
				}
			}, function(err) {
				// 处理失败的结果
				layer.msg('退出异常',{icon: 5},{
                    offset:['40%'],
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
              }); 
			})
		},
	},
	created(){
		
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/requestSession';
			this.$http.post(url).then(function(res) {
				// 处理成功的结果
				if(res.body==''){
					layer.msg('检测到账号未登录',{icon: 7},{
	                    offset:['40%'],
	                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
	              });
					setTimeout(function(){
						location.href="/tbxt/loginBack.html";
					},500);
				}else{
					this.userNickname = res.body.userNickname
				}
			}, function(err) {
				// 处理失败的结果
				console.log(err)
				layer.msg('数据异常！',{icon: 5},{
	                offset:['40%'],
	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
	          });
			})
		 })
		
	},
})

layui.use("layer",function(){
	var layer = layui.layer;  //layer初始化
})
layui.use('element', function(){
  var element = layui.element;
  
  //…
});	

