var vm = new Vue({
	el:'#postBarList',
	data:{
		barList:''
	},
	methods:{
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

