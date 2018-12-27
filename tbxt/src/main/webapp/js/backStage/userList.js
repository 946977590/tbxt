var vm = new Vue({
    	el:'#uList',
    	data:{
    		userList:'',
    		AlluserList:'',
    		userInfo:{
    			userId: "",
    			userEmail: "",
    			userNickname: "",
    			userGender: "",
    			userLevel: "",
    			userCreattime: "",
    		},
    		fyData:{
    			'preNum':0,
    			'pageSize':5	
    		},
    		skipNum:'',
    		Zcount:'',
    		curr:1,
    	keyword:'',
    	},
    	methods:{
    		queryInfo : function(userId){
    			var data={
    				'userId':userId
    			}
    			var url = '/tbxt/queryUserById';
    			this.$http.post(url,data, {
    				emulateJSON : true
    			}).then(function(res) {
    				// 处理成功的结果
    				this.userInfo = res.body;
    				this.userInfo.userId = res.body.userId,
    				this.userInfo.userEmail = res.body.userEmail,
    				this.userInfo.userNickname =res.body.userNickname,
    				this.userInfo.userGender = res.body.userGender,
    				this.userInfo.userLevel = res.body.userLevel,
    				this.userInfo.userCreattime = res.body.userCreattime,
//    				console.log("===="+JSON.stringify(this.userInfo));
    				layui.use([ 'layer' ], function() {
    					var layer = layui.layer, $ = layui.$;
    					layer.open({
    						type : 1,// 类型
    						area : [ '500px', '400px' ],// 定义宽和高
    						title : '会员信息',// 题目
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
    		banned : function(userId){
    			var data={
    					'userId':userId
    				}
    				var url = '/tbxt/BannedUser';
    				this.$http.post(url,data, {
    					emulateJSON : true
    				}).then(function(res) {
    					// 处理成功的结果
    					if(res.bodyText == 'banned'){
    						layer.msg('封禁成功！',{icon: 1},{
    			                offset:['40%'],
    			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    			          });
    						var dd = this.fyData
    		    			var url2 = '/tbxt/queryAllUserFY';
    		     			this.$http.post(url2,dd,{emulateJSON:true}).then(function(res) {
    		     				// 处理成功的结果
    		     				this.userList = res.body.userList;
    		     			}, function(err) {
    		     				// 处理失败的结果
//    		     				console.log(err)
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
    		Rebanned : function(userId){
    			var data={
    					'userId':userId
    				}
    				var url = '/tbxt/ReBannedUser';
    				this.$http.post(url,data, {
    					emulateJSON : true
    				}).then(function(res) {
    					// 处理成功的结果
    					if(res.bodyText == 'Rebanned'){
    						layer.msg('成功解封！',{icon: 1},{
    			                offset:['40%'],
    			                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    			          });
    						var dd = this.fyData
    		    			var url2 = '/tbxt/queryAllUserFY';
    		     			this.$http.post(url2,dd,{emulateJSON:true}).then(function(res) {
    		     				// 处理成功的结果
    		     				this.userList = res.body.userList;
    		     			}, function(err) {
    		     				// 处理失败的结果
//    		     				console.log(err)
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
    		searchByKW : function(){
    			var data = {
    				'userNickname' : this.keyword	
    			}
    			var url = '/tbxt/queryUserByKW';
     			this.$http.post(url,data,{emulateJSON:true}).then(function(res) {
     				// 处理成功的结果
     				if(res.body.userList != null){
     					this.userList = res.body.userList;
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
    		prevCli : function(){
    			if(this.fyData.preNum > 0){
    				this.curr--;
    				this.fyData.preNum = this.fyData.preNum-5;
//    				console.log("上一页"+this.fyData.preNum);
    				var url = '/tbxt/queryAllUserFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
        				this.userList = res.body.userList;
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
    			var ui = this.AlluserList.length;
    			if(this.fyData.preNum < ui-5){
    				this.curr++;
    				this.fyData.preNum = this.fyData.preNum+5;
//    				console.log("下一页"+this.fyData.preNum);
    				var url = '/tbxt/queryAllUserFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
        				this.userList = res.body.userList;
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
    			var uiMax = Math.ceil(this.AlluserList.length/5);	//除法入位取整
//    			console.log(uiMax)
    			var cur = this.skipNum;
    			var regPassword=/^[0-9]$/;   /*定义验证表达式*/
    			if(regPassword.test(cur)){
    				if(cur>0 && cur<=uiMax){
    					this.fyData.preNum = (cur-1)*5;
    					this.curr = cur;
    					var url = '/tbxt/queryAllUserFY';
            			var dd = this.fyData
            			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
            				this.userList = res.body.userList;
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
    			var dd = this.fyData
    			var url = '/tbxt/queryAllUserFY';
     			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
     				// 处理成功的结果
     				this.userList = res.body.userList;
     				
     				var url2 = '/tbxt/queryAllUser';
        			this.$http.post(url2).then(function(res) {
        				this.AlluserList = res.body.userList;
        				this.Zcount = this.AlluserList.length
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
    				
     			}, function(err) {
     				// 处理失败的结果
//     				console.log(err)
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
