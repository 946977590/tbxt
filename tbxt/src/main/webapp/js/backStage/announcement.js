var vm = new Vue({
	el:'#announce',
	data:{
		announceList:'',
	},
	methods:{
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/selectAllAnnounces';
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

