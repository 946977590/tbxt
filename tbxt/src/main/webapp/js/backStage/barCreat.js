var vm = new Vue({
	el:'#barCreat',
	data:{
		barOJB:{
			barName:'',
			barLeader:'',
			barSign:'',
			barCategory:''
		}
	},
	methods:{
		AddBar:function(){
			var reg=/^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
//			console.log(reg.test(this.barOJB.barName));
			if(reg.test(this.barOJB.barName)){
				this.barOJB.barLeader = $('#barLeader').val();
				var formData = new FormData();
				var file = document.getElementById("file1");
				formData.append('file', file.files[0]);
				formData.append('barName', this.barOJB.barName);
				formData.append('barLeader', this.barOJB.barLeader);
				formData.append('barSign', this.barOJB.barSign);
				formData.append('barCategory', this.barOJB.barCategory);
				var url = 'http://localhost:8080/tbxt/postBarCreat';
				this.$http.post(url, formData).then(function(res) {
					// 处理成功的结果
//					console.log("this.barOJB.barLeader==="+this.barOJB.barLeader)
//					console.log(res)
					if(res.bodyText=='success'){
						layer.msg('创建贴吧成功',{icon: 1},{
		                    offset:['40%'],
		                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
		              });
						setTimeout(function(){
							location.href="/tbxt/skipto_postBarList";
						},1000);
						layer.close(layer.index-1); //它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
					}else if(res.bodyText=='sessionError'){
						layer.msg('未登录状态!',{icon: 7},{
	                        offset:['40%'],
	                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
	                  });
					}else{
						layer.msg('发帖出现错误!',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 //2秒关闭（如果不配置，默认是3秒）
	                  });
					}
				}, function(err) {
					// 处理失败的结果
					layer.msg('数据异常!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
	              });
					
				})
			}else{
				layer.msg('合法字符必须以中文命名!',{icon: 5},{
                    offset:['40%'],
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
              });
			}
			
		},
	},
	mounted(){
		
	},
})

$('#test7').click(function(){
	 $('#file1').click();
});
$('#file1').on('change', function (e) {
//	console.log(e);
	if(e.target.files != null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(e.target.files[0]);
		reader.onload=function (e) {
		document.getElementById('demo1').src=this.result;}
	}
})

layui.use("layer",function(){
	var layer = layui.layer;  //layer初始化
})
layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
});