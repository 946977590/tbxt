layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
    
    var vm = new Vue({
    	el:'#postBarList',
    	data:{
    		AllbarList:'',
    		barList:'',
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
    		banned : function(barId){
    			var data={
    					'barId':barId
    				}
//    			console.log("获取的barid"+barId);
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
    		},
    		searchByKW : function(){
    			var data = {
    				'barName' : this.keyword,
    				'preNum':0,
        			'pageSize':this.Zcount
    			}
    			var url = '/tbxt/queryAllBarByKW';
     			this.$http.post(url,data,{emulateJSON:true}).then(function(res) {
     				// 处理成功的结果
     				if(res.body.post_barList != null){
     					this.barList = res.body.post_barList;
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
    				var url = '/tbxt/queryAllBarInBackFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
//        				console.log(JSON.stringify(res.body))
        				this.barList = res.body.post_barList;
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
    			var ui = this.AllbarList.length;
    			if(this.fyData.preNum < ui-5){
    				this.curr++;
    				this.fyData.preNum = this.fyData.preNum+5;
//    				console.log("下一页"+this.fyData.preNum);
    				var url = '/tbxt/queryAllBarInBackFY';
        			var dd = this.fyData
        			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
        				this.barList = res.body.post_barList;
//        				console.log(JSON.stringify(this.barList))
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
    			var uiMax = Math.ceil(this.AllbarList.length/5);	//除法入位取整
//    			console.log(uiMax)
    			var cur = this.skipNum;
    			var regPassword=/^[0-9]$/;   /*定义验证表达式*/
    			if(regPassword.test(cur)){
    				if(cur>0 && cur<=uiMax){
    					this.fyData.preNum = (cur-1)*5;
    					this.curr = cur;
    					var url = '/tbxt/queryAllBarInBackFY';
            			var dd = this.fyData
            			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
            				this.barList = res.body.post_barList;
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
    			var url = '/tbxt/queryAllBarInBackFY';
    			var dd = this.fyData
    			this.$http.post(url,dd,{emulateJSON:true}).then(function(res) {
    				// 处理成功的结果
//    				console.log(JSON.stringify(res.body));
    				this.barList = res.body.post_barList;
    				
    				var url2 = '/tbxt/queryAllBarInBack';
        			this.$http.post(url2).then(function(res) {
        				this.AllbarList = res.body.post_barList
        				this.Zcount = this.AllbarList.length;
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
//    				console.log(err)
    				layer.msg('数据异常！',{icon: 5},{
    	                offset:['40%'],
    	                time: 1000 //2秒关闭（如果不配置，默认是3秒）
    	          });
    			})
    		 })
    	},
    })

});