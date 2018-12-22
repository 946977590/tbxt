var vm = new Vue({
	el:'#barCreat',
	data:{
		picList:'',
	},
	methods:{
		judgeDel : function(pictureId){
			layer.confirm('确认删除该图片？', {
				  btn: ['确定', '取消'] //可以无限个按钮
				,yes: function(index, layero){
				    //按钮【按钮一】的回调
					var data = {
							'pictureId':pictureId	
						}
						var url = '/tbxt/delPic';
						vm.$http.post(url,data,{emulateJSON:true}).then(function(res) {
//							console.log(res.bodyText)
							if(res.bodyText == 'success'){
								layer.msg('删除成功！',{icon: 1},{
					                offset:['40%'],
					                time: 1000 //2秒关闭（如果不配置，默认是3秒）
					          });
								var url2 = '/tbxt/queryAllPic';
								vm.$http.post(url2).then(function(res) {
									this.picList = res.body
//									console.log(res.body)
									// 处理成功的结果
								}, function(err) {
									// 处理失败的结果
									layer.msg('数据异常！',{icon: 5},{
						                offset:['40%'],
						                time: 1000 //2秒关闭（如果不配置，默认是3秒）
						          });
								})
							}else{
								layer.msg('数据异常！',{icon: 5},{
					                offset:['40%'],
					                time: 1000 //2秒关闭（如果不配置，默认是3秒）
					          });
							}
							// 处理成功的结果
						}, function(err) {
							// 处理失败的结果
							layer.msg('数据异常！',{icon: 5},{
				                offset:['40%'],
				                time: 1000 //2秒关闭（如果不配置，默认是3秒）
				          });
						})
					
				  }
				  ,btn2: function(index, layero){
				    //按钮【按钮三】的回调
					  layer.close(index)
				  }
				});
		},
		
		
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/queryAllPic';
			this.$http.post(url).then(function(res) {
				this.picList = res.body
//				console.log(res.body)
				// 处理成功的结果
			}, function(err) {
				// 处理失败的结果
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
layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
});