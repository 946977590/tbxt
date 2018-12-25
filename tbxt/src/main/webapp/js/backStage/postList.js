//全选
/*function checkAll(){
	console.log("po0");
	var checkbos=document.getElementsByName("chk");
	for(i=0;i<checkbos.length;i++){
		var checkbo=checkbos[i];
		if($("#allChoose").prop("checked")){
			checkbo.checked="checked";
		}else{
			checkbo.checked=null;
		}
	}
}*/
layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
    
    var vm = new Vue({
    	el:'#postList',
    	data:{
    		postList:'',
    		postTitle:'',
    		postContent:'',
    		post_belongBar:''
    	},
    	methods:{
    		checkAll : function(){
    			var chks = document.getElementsByName('chk');
    			console.log(chks.length);
    			console.log(0+chks[0].checked)
    			for(var i=0;i<chks.length;i++){
    				if(chks[i].checked == true){
    					chks[i].checked == false
    				}else{
    					chks[i].checked == true
    				}
    			}
    		},
    		queryInfo : function(postId){
    			var data={
    					'postId':postId
    				}
    				var url = '/tbxt/GetpostByPostId';
    				this.$http.post(url,data, {
    					emulateJSON : true
    				}).then(function(res) {
    					// 处理成功的结果
//    					console.log(res.body);
    					this.postTitle = res.body.DTOBarAndPic.post.postTitle;
    					this.postContent = res.body.DTOBarAndPic.post.postContent;
    					this.post_belongBar = res.body.DTOBarAndPic.post_bar.barName;
//    					console.log(this.postTitle+this.postContent);
    					layui.use([ 'layer' ], function() {
    						var layer = layui.layer, $ = layui.$;
    						layer.open({
    							type : 1,// 类型
    							area : [ '600px', '400px' ],// 定义宽和高
    							title : '帖子详情',// 题目
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
    		
    		banned : function(postId){
    			var data={
    					'postId':postId
    				}
//    			console.log(postId)
    				var url = '/tbxt/BannedPost';
    				this.$http.post(url,data, {
    					emulateJSON : true
    				}).then(function(res) {
    					// 处理成功的结果
    					if(res.bodyText == 'banned'){
    						layer.msg('封禁成功！',{icon: 1},{
    			                offset:['40%'],
    			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    			          });
    						var url2 = '/tbxt/selectAllPostInBack';
    						this.$http.post(url2).then(function(res) {
    							this.postList = res.body.postList;
//    							console.log(res.body)
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
    		Rebanned : function(postId){
    			var data={
    					'postId':postId
    				}
//    			console.log(postId)
    				var url = '/tbxt/ReBannedPost';
    				this.$http.post(url,data, {
    					emulateJSON : true
    				}).then(function(res) {
    					// 处理成功的结果
    					if(res.bodyText == 'Rebanned'){
    						layer.msg('成功解封！',{icon: 1},{
    			                offset:['40%'],
    			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    			          });
    						var url2 = '/tbxt/selectAllPostInBack';
    						this.$http.post(url2).then(function(res) {
    							this.postList = res.body.postList;
//    							console.log(res.body)
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
    		}
    	},
    	mounted(){
    		this.$nextTick(function () {
    			var url = '/tbxt/selectAllPostInBack';
    			this.$http.post(url).then(function(res) {
    				this.postList = res.body.postList;
//    				console.log(res.body)
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
});