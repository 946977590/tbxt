layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
    
    var vm = new Vue({
		el:'#uList',
	data:{
		Contentlist:'',
		Numberlist:'',
		huatiOBJ:''
		
	},
	methods:{
		open_drawLine : function(){
			// 指定图表的配置项和数据
			var option = {
				title: {
					text: '话题排行榜'
				},
				tooltip: {},
				legend: {
					data:['热度']
				},
				xAxis: {
					data : []
				},
				yAxis: {},
				series: [{
					name: '热度',
					type: 'bar',
					data: []
				}]
			};
			
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('drawLine'));
			var url = '/tbxt/queryHotHuati';
			this.$http.post(url).then(function(res) {
				var Clis = new Array();
				var Nlis = new Array();
				for(var i=0;i<res.body.huatiList.length;i++){
					Clis.push(res.body.huatiList[i].huatiContent)
					Nlis.push(res.body.NumList[i]);
//					this.huatiOBJ.push({content:res.body.huatiList[i].huatiContent,number:res.body.NumList[i]});
				}
				this.Contentlist = Clis;
				this.Numberlist = Nlis;
				// 异步加载数据
//				console.log("更新数据！");
			    myChart.setOption({
			        xAxis: {
			            data: this.Contentlist
			        },
			        series: [{
			            // 根据名字对应到相应的系列
			            name: '热度',
			            data: this.Numberlist
			        }],
			        color:'#1AA094'
			    });
				// 处理成功的结果
			}, function(err) {
				// 处理失败的结果
				layer.msg('数据异常！',{icon: 5},{
	                offset:['40%'],
	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
	          });
			})
		
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		},
		//封禁与解封
		banned : function(huatiContent){
			var data={
					'huatiContent':huatiContent
				}
				var url = '/tbxt/BanHuati';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'banned'){
						layer.msg('封禁成功！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryHuatiByStage';
						this.$http.post(url2).then(function(res) {
							this.huatiOBJ = res.body.huatiList
							form.render('checkbox'); 
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
		Rebanned : function(huatiContent){
			var data={
					'huatiContent':huatiContent
				}
				var url = '/tbxt/ReBanHuati';
				this.$http.post(url,data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					if(res.bodyText == 'Rebanned'){
						layer.msg('成功解封！',{icon: 1},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
						var url2 = '/tbxt/queryHuatiByStage';
						this.$http.post(url2).then(function(res) {
							this.huatiOBJ = res.body.huatiList
							form.render('checkbox'); 
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
		//打开话题列表
		open_huatiList : function(){
			setTimeout(function(){
				location.href="/tbxt/skipto_huatiList";
			})
			
		}
	},
	created(){
	},
	mounted(){
		var url = '/tbxt/queryHuatiByStage';
		this.$http.post(url).then(function(res) {
			this.huatiOBJ = res.body.huatiList
			// 处理成功的结果
			form.render('checkbox'); 
		}, function(err) {
			// 处理失败的结果
			layer.msg('数据异常！',{icon: 5},{
                offset:['40%'],
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
          });
		})
	},
	
})
});

