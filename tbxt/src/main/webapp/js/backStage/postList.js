layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
    
    var vm = new Vue({
    	el:'#postList',
    	data:{
    		AllpostList:'',
    		postList:'',
    		postTitle:'',
    		postContent:'',
    		post_belongBar:'',
    		keyword:'',
    		fyData:{
    			'preNum':0,
    			'pageSize':5	
    		},
    		skipNum:'',
    		Zcount:'',
    		curr:1,
    	},
    	methods:{
    		searchByKW : function(){
    			var data = {
    				'postTitle' : this.keyword,
    				'preNum':0,
        			'pageSize':this.Zcount,
    			}
    			var url = '/tbxt/selectAllPostInBackFYandKW';
     			this.$http.post(url,data,{emulateJSON:true}).then(function(res) {
     				// 处理成功的结果
     				if(res.body.postList != null){
     					this.postList = res.body.postList;
     				}else{
     					layer.msg('暂无数据！',{icon: 7},{
         	                offset:['40%'],
         	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
         	          });
     				}
     			}, function(err) {
     				// 处理失败的结果
//     				console.log(err)
     				layer.msg('数据异常！',{icon: 5},{
     	                offset:['40%'],
     	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
     	          });
     			})
    			
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
    						var url3 = '/tbxt/selectAllPostInBackFY';
    						var dd = this.fyData
    						this.$http.post(url3,dd,{emulateJSON:true}).then(function(res) {
    							this.postList = res.body.postList;
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
    						var url3 = '/tbxt/selectAllPostInBackFY';
    						var dd = this.fyData
    						this.$http.post(url3,dd,{emulateJSON:true}).then(function(res) {
    							this.postList = res.body.postList;
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
    		prevCli : function(){
    			if(this.fyData.preNum > 0){
    				this.curr--;
    				this.fyData.preNum = this.fyData.preNum-5;
//    				console.log("上一页"+this.fyData.preNum);
    				var url = '/tbxt/selectAllPostInBackFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
        				this.postList = res.body.postList;
        				var Postcount = this.postList.length
        				// 处理成功的结果
        			}, function(err) {
        				// 处理失败的结果
        				layer.msg('数据异常！',{icon: 5},{
        	                offset:['40%'],
        	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
        	          });
        			})
    			}else{
    				layer.msg('已经是第一页了！',{icon: 7},{
    	                offset:['40%'],
    	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    	          });
    			}
    			
    		},
    		nextCli : function(){
    			var ui = this.AllpostList.length;
    			if(this.fyData.preNum < ui-5){
    				this.curr++;
    				this.fyData.preNum = this.fyData.preNum+5;
//    				console.log("下一页"+this.fyData.preNum);
    				var url = '/tbxt/selectAllPostInBackFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
        				this.postList = res.body.postList;
        				var Postcount = this.postList.length
        				// 处理成功的结果
        			}, function(err) {
        				// 处理失败的结果
        				layer.msg('数据异常！',{icon: 5},{
        	                offset:['40%'],
        	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
        	          });
        			})
    			}else{
    				layer.msg('已经是最后一页咯！',{icon: 7},{
    	                offset:['40%'],
    	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    	          });
    			}
    		},
    		skipCli : function(){
    			var uiMax = Math.ceil(this.AllpostList.length/5);	//除法入位取整
//    			console.log(uiMax)
    			var cur = this.skipNum;
    			var regPassword=/^[0-9]$/;   /*定义验证表达式*/
    			if(regPassword.test(cur)){
    				if(cur>0 && cur<=uiMax){
    					this.fyData.preNum = (cur-1)*5;
    					this.curr = cur;
    					var url = '/tbxt/selectAllPostInBackFY';
            			var dd = this.fyData
            			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
            				this.postList = res.body.postList;
            				var Postcount = this.postList.length
            				// 处理成功的结果
            			}, function(err) {
            				// 处理失败的结果
            				layer.msg('数据异常！',{icon: 5},{
            	                offset:['40%'],
            	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            	          });
            			})
            			
        			}else{
        				layer.msg('暂无该页！',{icon: 5},{
        	                offset:['40%'],
        	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
        	          });
        			}
    			}else{
    				layer.msg('请输入正确页码！',{icon: 5},{
    	                offset:['40%'],
    	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    	          });
    			}
    			
    		},
    		
    	},
    	mounted(){
    		this.$nextTick(function () {
    			var url = '/tbxt/selectAllPostInBackFY';
    			var dd = this.fyData
    			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
    				this.postList = res.body.postList;
    				
    				var url2 = '/tbxt/selectAllPostInBack';
        			this.$http.post(url2).then(function(res) {
        				this.AllpostList = res.body.postList
        				this.Zcount = this.AllpostList.length;
//        				console.log("总长度为="+this.AllpostList.length);
        				// 处理成功的结果
        			}, function(err) {})
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

