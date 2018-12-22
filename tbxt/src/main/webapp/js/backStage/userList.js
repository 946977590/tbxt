var vm = new Vue({
	el:'#uList',
	data:{
		userList:'',
		userInfo:{
			userId: "",
			userEmail: "",
			userNickname: "",
			userGender: "",
			userLevel: "",
			userCreattime: "",
		}
	},
	methods:{
		queryInfo : function(userId){
			var data={
				'userId':userId
			}
			var url = '/tbxt/queryUserById';
			this.$http.post(url,data, {
				emulateJSON : true
			}).then(function(res) {
				// 处理成功的结果
				this.userInfo = res.body;
				this.userInfo.userId = res.body.userId,
				this.userInfo.userEmail = res.body.userEmail,
				this.userInfo.userNickname =res.body.userNickname,
				this.userInfo.userGender = res.body.userGender,
				this.userInfo.userLevel = res.body.userLevel,
				this.userInfo.userCreattime = res.body.userCreattime,
//				console.log("===="+JSON.stringify(this.userInfo));
				layui.use([ 'layer' ], function() {
					var layer = layui.layer, $ = layui.$;
					layer.open({
						type : 1,// 类型
						area : [ '500px', '400px' ],// 定义宽和高
						title : '会员信息',// 题目
						shadeClose : false,// 点击遮罩层关闭
						content : $('#my_info_Box')
					// 打开的内容
					});
				})
			}, function(err) {
				// 处理失败的结果
				layer.msg('数据异常！',{icon: 5},{
	                offset:['40%'],
	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
	          });
			})
		},
		banned : function(userId){
			var data={
					'userId':userId
				}
				var url = '/tbxt/BannedUser';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'banned'){
						layer.msg('封禁成功！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAllUser';
						this.$http.post(url2).then(function(res) {
							// 处理成功的结果
							this.userList = res.body.userList;
						}, function(err) {
							// 处理失败的结果
//							console.log(err)
							layer.msg('数据异常！',{icon: 5},{
				                offset:['40%'],
				                time: 1000 //2秒关闭（如果不配置，默认是3秒）
				          });
						})
					}
				}, function(err) {
					// 处理失败的结果
					layer.msg('数据异常！',{icon: 5},{
		                offset:['40%'],
		                time: 1000 //2秒关闭（如果不配置，默认是3秒）
		          });
				})
		},
		Rebanned : function(userId){
			var data={
					'userId':userId
				}
				var url = '/tbxt/ReBannedUser';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'Rebanned'){
						layer.msg('成功解封！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAllUser';
						this.$http.post(url2).then(function(res) {
							// 处理成功的结果
							this.userList = res.body.userList;
						}, function(err) {
							// 处理失败的结果
//							console.log(err)
							layer.msg('数据异常！',{icon: 5},{
				                offset:['40%'],
				                time: 1000 //2秒关闭（如果不配置，默认是3秒）
				          });
						})
					}
				}, function(err) {
					// 处理失败的结果
					layer.msg('数据异常！',{icon: 5},{
		                offset:['40%'],
		                time: 1000 //2秒关闭（如果不配置，默认是3秒）
		          });
				})
		}
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/queryAllUser';
			this.$http.post(url).then(function(res) {
				// 处理成功的结果
				this.userList = res.body.userList;
			}, function(err) {
				// 处理失败的结果
//				console.log(err)
				layer.msg('数据异常！',{icon: 5},{
	                offset:['40%'],
	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
	          });
			})
		 })
	},
	
})

layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
});

