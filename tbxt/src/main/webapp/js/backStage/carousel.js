var vm = new Vue({
	el:'#carousel',
	data:{
		picList:'',
		nList:[{'n':'1'},{'n':'2'},{'n':'3'},{'n':'4'},{'n':'5'}],
		pictureIdList:['lunbo1','lunbo2','lunbo3','lunbo4','lunbo5']
	},
	methods:{
		Add_carousel : function(){
			var file1 = document.getElementById("file1");
			var file2 = document.getElementById("file2");
			var file3 = document.getElementById("file3");
			var file4 = document.getElementById("file4");
			var file5 = document.getElementById("file5");
			var formData=new FormData();
			formData.append('files', file1.files[0]);
			formData.append('files', file2.files[0]);
			formData.append('files', file3.files[0]);
			formData.append('files', file4.files[0]);
			formData.append('files', file5.files[0]);
			formData.append('pictureIdList', this.pictureIdList);
			
			var url = '/tbxt/slideManage';
			this.$http.post(url,formData, {
				emulateJSON : true
			}).then(function(res) {
				if(res.bodyText == 'updateSuccess'){
					layer.msg('更新轮播成功！',{icon: 1},{
		                offset:['40%'],
		                time: 1000 //2秒关闭（如果不配置，默认是3秒）
		          });
					var url = '/tbxt/querySlidePic';
					this.$http.post(url).then(function(res) {
						this.picList = res.body
						console.log(JSON.stringify(this.nList))
						// 处理成功的结果
					}, function(err) {
						// 处理失败的结果
						layer.msg('数据异常！',{icon: 5},{
			                offset:['40%'],
			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
			          });
					})
				}else{
					layer.msg('暂无图片上传！',{icon: 7},{
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
	},
	mounted(){
		this.$nextTick(function () {
			var url = '/tbxt/querySlidePic';
			this.$http.post(url).then(function(res) {
				this.picList = res.body
//				console.log(JSON.stringify(this.nList))
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

layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
});
$('#tes1').click(function(){
	 $('#file1').click();
});$('#tes2').click(function(){
	 $('#file2').click();
});$('#tes3').click(function(){
	 $('#file3').click();
});$('#tes4').click(function(){
	 $('#file4').click();
});$('#tes5').click(function(){
	 $('#file5').click();
});

$('#file1').on('change', function (e) {
	var file1 = document.getElementById("file1")
	if(file1.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file1.files[0]);
		reader.onload=function (e) {
		document.getElementById('lunbo1').src=this.result;}
	}
})
$('#file2').on('change', function (e) {
	var file2 = document.getElementById("file2")
	if(file2.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file2.files[0]);
		reader.onload=function (e) {
		document.getElementById('lunbo2').src=this.result;}
	}
})
$('#file3').on('change', function (e) {
	var file3 = document.getElementById("file3")
	if(file3.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file3.files[0]);
		reader.onload=function (e) {
		document.getElementById('lunbo3').src=this.result;}
	}
})
$('#file4').on('change', function (e) {
	var file4 = document.getElementById("file4")
	if(file4.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file4.files[0]);
		reader.onload=function (e) {
		document.getElementById('lunbo4').src=this.result;}
	}
})
$('#file5').on('change', function (e) {
	var file5 = document.getElementById("file5")
	if(file5.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file5.files[0]);
		reader.onload=function (e) {
		document.getElementById('lunbo5').src=this.result;}
	}
})