layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
var vm = new Vue({
	el:'#announce',
	data:{
		announceList:'',
		ggTitle:'',
		ggContent:'',
		ggId:'',
	},
	methods:{
		updateGG : function(announceId){
		var data = {
				'announceId':announceId,
				'announceTitle':this.ggTitle,
				'announceContent':this.ggContent,	
			}
			var url = '/tbxt/announcesUpdate';
			this.$http.post(url,data, {
				emulateJSON : true
			}).then(function(res) {
				if(res.bodyText == 'success'){
					layer.msg('更新公告成功！',{icon: 1},{
		                offset:['40%'],
		                time: 1000 //2秒关闭（如果不配置，默认是3秒）
		          });
					layer.close(layer.index-1);
					var url2 = '/tbxt/queryAnnounceBack';
					this.$http.post(url2).then(function(res) {
						// 处理成功的结果
						this.announceList = res.body.announceList;
					}, function(err) {
						// 处理失败的结果
						console.log(err)
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
		//查看公告
		open_gg : function(announceId){
			var data = {
				'announceId':announceId
			}
			var url = '/tbxt/GetAnnouncesBy';
			this.$http.post(url,data, {
				emulateJSON : true
			}).then(function(res) {
//				console.log(JSON.stringify(res.body));
				this.ggTitle = res.body.announceTitle;
				this.ggContent = res.body.announceContent;
				this.ggId = res.body.announceId;
				layui.use([ 'layer' ], function() {
					var layer = layui.layer, $ = layui.$;
					layer.open({
						type : 1,// 类型
						area : [ '900px', '450px' ],// 定义宽和高
						title : '公告详情',// 题目
						shadeClose : false,// 点击遮罩层关闭
						content : $('#gonggaoEdit')
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
		banned : function(announceId){
			var data={
					'announceId':announceId
				}
//			console.log(postId)
				var url = '/tbxt/BannedAnnounce';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'banned'){
						layer.msg('封禁成功！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAnnounceBack';
						this.$http.post(url2).then(function(res) {
							this.announceList = res.body.announceList;
//							console.log(res.body)
							// 处理成功的结果
						}, function(err) {
							// 处理失败的结果
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
		Rebanned : function(announceId){
			var data={
					'announceId':announceId
				}
//			console.log(postId)
				var url = '/tbxt/ReBannedAnnounce';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'Rebanned'){
						layer.msg('成功解封！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAnnounceBack';
						this.$http.post(url2).then(function(res) {
							this.announceList = res.body.announceList;
//							console.log(res.body)
							// 处理成功的结果
						}, function(err) {
							// 处理失败的结果
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
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/queryAnnounceBack';
			this.$http.post(url).then(function(res) {
				// 处理成功的结果
				this.announceList = res.body.announceList;
//				console.log(JSON.stringify(this.announceList));
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

});
