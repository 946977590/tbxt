var vm = new Vue({
	el:'#postBarList',
	data:{
		barList:''
	},
	methods:{
		
		banned : function(barId){
			var data={
					'barId':barId
				}
				var url = '/tbxt/BannedBar';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'banned'){
						layer.msg('封禁成功！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAllBarInBack';
						this.$http.post(url2).then(function(res) {
							this.barList = res.body.post_barList;
						}, function(err) {
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
		Rebanned : function(barId){
			var data={
					'barId':barId
				}
				var url = '/tbxt/ReBannedBar';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'Rebanned'){
						layer.msg('成功解封！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryAllBarInBack';
						this.$http.post(url2).then(function(res) {
							this.barList = res.body.post_barList;
						}, function(err) {
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
			var url = '/tbxt/queryAllBarInBack';
			this.$http.post(url).then(function(res) {
				// 处理成功的结果
				this.barList = res.body.post_barList;
//				console.log(JSON.stringify(this.barList));
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