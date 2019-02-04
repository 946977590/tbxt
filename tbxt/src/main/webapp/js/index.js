//公告公告公告公告公告公告公告公告
var component809 = Vue.extend({
	template:`
	<ul class="gonggao_list">
		<li class="gonggao_list_item" v-for="item in gonggaoList" :key="item"><a href="javascript:;"
			class="gonggao_list_item_name" v-on:click="pass_announceId(item.announceId)">{{item.announceTitle}}</a></li>
	</ul>
	`,
data(){
      return {
    	gonggaoList:'',
      }
    },
    mounted(){
    	// 获取轮播
    	var url = '/tbxt/selectAllAnnounces';	 
		this.$http.post(url, {
			emulateJSON : true
		}).then(function(res) {
// console.log(JSON.stringify(res.body));
			this.gonggaoList = res.body.announceList;
		}, function(err) {
// console.log("error!");
		})	
// console.log("异步的作用==113-12132=321");
    },
created(){	
},
methods:{
	pass_announceId : function(announceId){
		var data = {
			'announceId':announceId	
		}
		var url = '/tbxt/queryGGByid';	 
		this.$http.post(url,data,{
			emulateJSON : true
		}).then(function(res) {
// console.log(JSON.stringify(res.body));
			vm.announceContent = res.body.announceContent;
			this.$options.methods.open_gonggao();
		}, function(err) {
// console.log("error!");
		})	
	},
	// 获取话题对应的category
	open_gonggao : function(){
		layui.use([ 'layer' ], function() {
			var layer = layui.layer, $ = layui.$;
			layer.open({
				type : 1,// 类型
				area : [ '500px', '450px' ],// 定义宽和高
				title : '公告',// 题目
				shadeClose : false,// 点击遮罩层关闭
				content : $('#gonggao_Box')
			// 打开的内容
			});
		})
	}
}
})
Vue.component('component809',component809)

// 轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图
var component888 = Vue.extend({
	template:`
	<div carousel-item="">
		<div v-for="item in slideList" :key="item">
			<a href="javascript:;" v-on:click="pass_postCategory(item.pictureBelong)"><img  :src=" '/tbxt/IoReadImage?pictureName='+item.pictureName " style="width: 100%; height: 100%;" /></a>
		</div>
	</div>
	`,
data(){
      return {
    	slideList:'',
      }
    },
    mounted(){
    	// 获取轮播
    	var url = '/tbxt/querySlidePic';	 
		this.$http.post(url, {
			emulateJSON : true
		}).then(function(res) {
// console.log(JSON.stringify(res.body));
			this.slideList = res.body;
		}, function(err) {
// console.log("error!");
		})	
// console.log("异步的作用==113-12132=321");
    },
created(){	
},
methods:{
	// 获取话题对应的category
	pass_postCategory : function(postCategory){
		sessionStorage.setItem('postCategory',postCategory); // 存入一个值
		setTimeout(function() {
			location.href="/tbxt/huatiExtend.html"
		}, 50);
	},
}
})
Vue.component('component888',component888)

// 热门话题推荐热门话题推荐热门话题推荐热门话题推荐热门话题推荐热门话题推荐热门话题推荐热门话题推荐热门话题推荐
var componenthuati = Vue.extend({
	template:`
	<ul class="top_list_hot_list">
						<li class="top_list_hot_list_item" v-for="item in huatiList" :key="item"><p
								class="top_list_hot_item_number">{{item.number}}</p> <a href="javascript:;"
							class="top_list_hot_list_item_name" v-on:click="pass_postCategory(item.content.huatiContent)">{{item.content.huatiContent}}</a> <span
							class="topic_num">{{item.postN}}</span></li>
					</ul>
	`,
data(){
      return {
    	 huatiList:[{
    		 content:'',
    		 number:'',
    		 postN:'',
    	 }]
      }
    },
created(){	
    	// 获取热门话题
    	var url = '/tbxt/queryHotHuati';	 
		this.$http.post(url, {
			emulateJSON : true
		}).then(function(res) {
// console.log(JSON.stringify(res.body));
			for(var i=0;i<res.body.huatiList.length;i++){
				this.huatiList.push({content:res.body.huatiList[i],number:i+1,postN:res.body.NumList[i]});
			}
			this.huatiList.shift();
		}, function(err) {})	
},
methods:{
	// 获取话题对应的category
	pass_postCategory : function(postCategory){
		sessionStorage.setItem('postCategory',postCategory); // 存入一个值
		setTimeout(function() {
			location.href="/tbxt/huatiExtend.html"
		}, 50);
	},
}
})
Vue.component('componenthuati',componenthuati)

// 头部导航栏组件头部导航栏组件头部导航栏组件头部导航栏组件头部导航栏组件头部导航栏组件
var toplable_component = Vue.extend({
	props: ['content', 'index'],
	template : '<li class="layui-nav-item"><a href="">{{content}} </a> </li>'
})

// 首页左侧bar列表 top
var commponent2 = Vue.extend({
	template:`
		<div>
			<a style="width:auto;height:19px;" href="javascript:;" v-on:click="barClick_openBar(item.barId)" v-for="item in barList" :key="item" class="zi_cate_content_name">{{item.barName}}</a>
		</div>
	`,
	data(){
	      return {
	        barList:''
	      }
	    },
  mounted(){
        	var url = '/tbxt/queryAllBar';
			this.$http.post(url, {
				emulateJSON : true
			}).then(function(res) {
				if(res.body=='error'){
					layer.msg('获取贴吧列表信息null!',{icon: 5},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
				}else{
					this.barList = res.body.post_barList
// console.log(JSON.stringify(this.barList));
				} 
			}, function(err) {
				// 处理失败的结果
// console.log(err)
				layer.msg('获取贴吧列表功能异常!',{icon: 5},{
                    offset:['40%'],
                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
              }); 
			})	
        },
        methods:{
        	// 打开bar列表详情
			barClick_openBar : function(barId){
				sessionStorage.setItem('barId',barId); // 存入一个值
				var data = {
					'barId':barId
				}
				var url2 = '/tbxt/queryBarPic';
				this.$http.post(url2,data,{
					emulateJSON : true
				}).then(function(res) {
// console.log("获取贴吧图片=="+JSON.stringify(res.body))
					if(res.body != null){
						var barPicName = res.body.barPicture;
						sessionStorage.setItem('barPicName',barPicName); // 存入一个值
						setTimeout(function() {
							location.href="/tbxt/barExtend.html"
						}, 50);
					}
				}, function(err) {
					// 处理失败的结果
					layer.msg('获取贴吧初始信息失败!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})	
				
			},
        }
})
Vue.component('commponent2',commponent2)
// 首页左侧bar列表 bottom

// 个人动态时间线
var sjx_post_component = Vue.extend({
	template:`
	<div>
	<div id="sjx_shafa">
			<i class="layui-icon layui-icon-face-surprised" style="font-size: 25px;color: rgb(153, 153, 153);">神马，亲居然还没有发过贴子~</i>
	</div>
	<ul class="layui-timeline">
	<li class="layui-timeline-item" v-for="item in list" :key="item">
	<i class="layui-icon layui-timeline-axis"></i>
	<div class="layui-timeline-content layui-text">
	<div class="layui-timeline-title" ><a href="javascript:;" style="width:400px;overflow: hidden;text-overflow: ellipsis;float:left;" v-on:click="Open_personPostInfo(item.postId)">{{item.postCreattime}} {{item.postTitle}}</a> <a href="javascript:;" v-on:click="judgeDel(item.postId)"> <span style="color:#009688 !important;">删除</span></a></div>
	</div>
	</li></ul>
	</div>`
		,
	data(){
	      return {
	        list:'',
	      }
	    },
  mounted(){
        	var url = '/tbxt/GetpostByuserId';
			this.$http.post(url, {
				emulateJSON : true
			}).then(function(res) {
// console.log("个人动态时间线res"+JSON.stringify(res.body));
				if(res.body=='Getpost_error'){
					layer.msg('获取个人动态信息失败!',{icon: 7},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				}else{
					if(res.body.DTOreaded != null){
						vm.PerSonReadCount = res.body.DTOreaded.countRead;
					}
					if(res.body.DTOgreat != null){
						vm.PerSonGreadCount = res.body.DTOgreat.CountGreat;
						vm.PerSonPostCount = res.body.DTOgreat.CountPost;
					}
					if(res.body.DTOBarAndPic.postList != null){
						this.list = res.body.DTOBarAndPic.postList
// console.log(this.list)
						$("#sjx_shafa").hide();
					}
				} 
			}, function(err) {
				// 处理失败的结果
// console.log(err)
				layer.msg('获取数据异常!',{icon: 5},{
                    offset:['40%'],
                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
              }); 
			})	
        },
        methods:{
        	judgeDel : function(postId){
        		layer.confirm('确认删除该条动态？', {
  				  btn: ['确定', '取消'] // 可以无限个按钮
  				,yes: function(index, layero){
  				    // 按钮【按钮一】的回调
  					var url2 = '/tbxt/BannedPost';
  					var data = {
  							'postId': postId
  					}
  					vm.$http.post(url2, data,{
  						emulateJSON : true
  					}).then(function(res) {
  						if(res.bodyText == 'banned'){
  							layer.msg('删除成功!',{icon: 1},{
  	  		                    offset:['40%'],
  	  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
  	  		              }); 
  							var url3 = '/tbxt/GetpostByuserId';
  							vm.$http.post(url3).then(function(res) {
							vm.PerSonReadCount = res.body.DTOreaded.countRead;
							vm.PerSonGreadCount = res.body.DTOgreat.CountGreat;
							vm.PerSonPostCount = res.body.DTOgreat.CountPost;
							this.list = res.body.DTOBarAndPic.postList
  							}, function(err) {})
  							
  						}else{
  							layer.msg('数据异常!',{icon: 7},{
  	  		                    offset:['40%'],
  	  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
  	  		              }); 
  						}
  					}, function(err) {
  						// 处理失败的结果
  						layer.msg('数据异常!',{icon: 7},{
  		                    offset:['40%'],
  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
  		              }); 
  					})
  					
  				  }
  				  ,btn2: function(index, layero){
  				    // 按钮【按钮三】的回调
  					  layer.close(index)
  				  }
  				});
        	},
        	Open_personPostInfo : function(postid){
        		// 监测该贴是否被点赞
				var url2 = '/tbxt/greatJudge';
				var data = {
						'postId': postid
				}
				this.$http.post(url2, data,{
					emulateJSON : true
				}).then(function(res) {
					 switch(res.body){
					     case 'great_0':
					       document.getElementById("great_icon_jb").style.color="#999999"; 
					       break;
					     case 'great_1':
					       document.getElementById("great_icon_jb").style.color="#009688";
					       break;
					     default:
					       break;
				   }
				}, function(err) {
					// 处理失败的结果
					layer.msg('获取个人动态信息失败!',{icon: 7},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})
				this.$options.methods.GetPostById(postid);
				layui.use([ 'layer' ], function() {
					var layer = layui.layer, $ = layui.$;
					layer.open({
						type : 1,// 类型
						area : [ '1330px', '600px' ],// 定义宽和高
						title : '帖子详情',// 题目
						shadeClose : false,// 点击遮罩层关闭
						content : $('#tiezi_Box')
					// 打开的内容
					});
				})
			},
			// 传递postid获取相关参数
			GetPostById :function(postid){
// console.log("jieshou=="+postid);
				sessionStorage.setItem('toPost',postid); // 存入一个值
				var data = {
						'postId': postid
				}
				var url = '/tbxt/GetpostByPostId';
				vm.$http.post(url,data,{
					emulateJSON : true,
				}).then(function(res) {
					vm.postList = res.body
					if(res.body.DTOreaded != null){
						vm.readed = res.body.DTOreaded.countRead
					}else{
						vm.readed = '0'
					}
					if(res.body.DTOgreat == null){
						vm.great = '0'
					}else{
						vm.great = res.body.DTOgreat.post_greatList.length
					}
					if(res.body.DTOBarAndPic.post_pictureList != null){
						vm.pictureList = res.body.DTOBarAndPic.post_pictureList
					}
					if(res.body.DTOtopic != null){
						vm.post_topicList = res.body.DTOtopic.post_topicList;
						$("#comments_shafa").hide();
					}else{
						vm.post_topicList=false;
					}
					vm.pass_postId = postid;
					if(res.body.judgePostUser == 1){
						setTimeout(function(){
						$('.delTopic').show();
					}, 10);
					}
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('获取帖子动态信息失败!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})	
        		
        		/* =================分割线=========== */
        	},
        }
})
// 首页中间部分帖子预览展示
var post_view_component = Vue.extend({
	template:`
	<div >
		<div class="right-sec_tiezi_info" v-if="list" v-for="pitem in list" :key="pitem">
			<a href="javascript:;" class="right-sec_tieba_name"
				style="font-size: 20px; float: left; margin-left: 20px;" v-on:click="openbar(pitem.post_bar.barId)" >{{pitem.post_bar.barName}}</a>
			<br />
			<br />
		<a href="javascript:;" class="right-sec_tiezi_title"
				style="font-size: 15px; float: left; margin-left: 20px; color: #009688;" v-on:click="open_tiezi(pitem.post.postId)" >{{pitem.post.postTitle}}</a> <span style="font-size: 15px; float: left; margin-left: 20px; color: #FF7F42;" v-if="pitem.post.postCategory">#{{pitem.post.postCategory}}</span> <br />
			<br />
			<div class="right-sec_tiezi_content">
				<a href="" id="title_v" >{{pitem.post.postContent}}</a>
			</div>
			<div class="right-sec_tiezi_photo_box" >
				<img class="right-sec_tiezi_photo" v-for="item in pitem.post_pictureList" :key="item" :src=" '/tbxt/IoReadImage?pictureName='+item.pictureName " />
			</div>
			
			<div class="right-sec_tiezi_author_info_box2">
				<div class="right-sec_tiezi_author_info" style="color: #C2C2C2;">
				<a class="layui-icon layui-icon-username"
					style="font-size: 14px;" >{{pitem.post.postAuthor}}</a> <a
					class="layui-icon layui-icon-tree" style="font-size: 14px;" >{{pitem.post.postCreattime}}</a>
				</div>
			</div>
		</div>
		
		<fieldset class="layui-elem-field layui-field-title"
			style="margin-top: 10px; margin-left: 20px; width:200px;">
		<legend>我是有底线的</legend>
		</fieldset> 
	</div>	
	`,
		data(){
		      return {
		    	  list:{},
		    	  piclist:{
		    		  pictureId:'',
		    		  pictureName:''
		    	  }
		      }
		    },
	  created(){
	        	var url = '/tbxt/queryTopPostView';
				this.$http.post(url, {
					emulateJSON : true
				}).then(function(res) {
// console.log(JSON.stringify(res.body.postByGreatReadedDTOList))
					if(res.body=='error'){
						layer.msg('获取数据异常!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					}else{
						this.list = res.body.postByGreatReadedDTOList;
						$(".loading_icon").hide();
					} 
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('获取数据异常!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})	
				
	        },
	        methods:{
	        	// 打开帖子
				open_tiezi : function(postid) {
					// 监测该贴是否被点赞
					var url2 = '/tbxt/greatJudge';
					var data = {
							'postId': postid
					}
					this.$http.post(url2, data,{
						emulateJSON : true
					}).then(function(res) {
						 switch(res.body){
						     case 'great_0':
						       document.getElementById("great_icon_jb").style.color="#999999"; 
						       break;
						     case 'great_1':
						       document.getElementById("great_icon_jb").style.color="#009688";
						       break;
						     default:
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
						layer.msg('获取个人动态信息失败!',{icon: 7},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					})
					this.$options.methods.GetPostById(postid);
// bus.$emit("postid",postid) //$emit这个方法会触发一个事件
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '1330px', '600px' ],// 定义宽和高
							title : '帖子详情',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#tiezi_Box')
						// 打开的内容
						});
					})
				},
				// 传递postid获取相关参数
				GetPostById :function(postid){
// console.log("jieshou=="+postid);
					sessionStorage.setItem('toPost',postid); // 存入一个值
					var data = {
							'postId': postid
					}
					var url = '/tbxt/GetpostByPostId';
					vm.$http.post(url,data,{
						emulateJSON : true,
					}).then(function(res) {
// console.log("res.body=="+JSON.stringify(res.body));
						var Judurl = '/tbxt/AddRead';
						vm.$http.post(Judurl,data,{
							emulateJSON : true,
						}).then(function(res) {
// console.log("postId==="+postid);
// console.log("执行已读==="+res.bodyText);
						}, function(err) {
						})
// console.log("传递参数过去呀")
						if(res.body.judgePostUser == '1'){
							$('#delTopic').show();
						}
						vm.postList = res.body
						if(res.body.DTOreaded != null){
							vm.readed = res.body.DTOreaded.countRead
						}else{
							vm.readed = '0'
						}
						if(res.body.DTOgreat == null){
							vm.great = '0'
						}else{
							vm.great = res.body.DTOgreat.post_greatList.length
						}
						if(res.body.DTOBarAndPic.post_pictureList != null){
							vm.pictureList = res.body.DTOBarAndPic.post_pictureList
						}
						if(res.body.DTOtopic != null){
							vm.post_topicList = res.body.DTOtopic.post_topicList;
							$("#comments_shafa").hide();
						}else{
							vm.post_topicList=false;
						}
						vm.pass_postId = postid;
						if(res.body.judgePostUser == 1){
							setTimeout(function(){
							$('.delTopic').show();
						}, 10);
						}
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('获取帖子动态信息失败!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					})	
				},
				openbar : function(barId){
					sessionStorage.setItem('barId',barId); // 存入一个值
					setTimeout(function() {
						location.href="/tbxt/barExtend.html"
					}, 50);
				}
				
				
				
	        },
	})
	
	
	/* ====================话题社区内部post详情展========================== */
	var component9469 = Vue.extend({
				template:`
					<div >
		<div class="right-sec_tiezi_info_barinfo" v-if="list" v-for="pitem in list" :key="pitem">
			<a href="javascript:;" class="right-sec_tieba_name"
				style="font-size: 20px; float: left; margin-left: 20px;" v-on:click="openbar(pitem.post_bar.barId)">{{pitem.post_bar.barName}}</a>
			<br />
			<br />
		<a href="javascript:;" class="right-sec_tiezi_title"
				style="font-size: 15px; float: left; margin-left: 20px; color: #009688;" v-on:click="open_tiezi(pitem.post.postId)" >{{pitem.post.postTitle}}</a><span style="font-size: 15px; float: left; margin-left: 20px; color: #FF7F42;" v-if="pitem.post.postCategory">#{{pitem.post.postCategory}}</span> <br />
			<br />
			<div class="right-sec_tiezi_content">
				<a href=""
					style="font-size: 13px; float: left; text-align : left; display: inline; margin-left: 20px; color: #8D8D8D" >{{pitem.post.postContent}}</a>
			</div>
			<div class="right-sec_tiezi_photo_box" >
				<img class="right-sec_tiezi_photo" v-for="item in pitem.post_pictureList" :key="item" :src=" '/tbxt/IoReadImage?pictureName='+item.pictureName " />
			</div>
			
			<div class="right-sec_tiezi_author_info_box">
				<div class="right-sec_tiezi_author_info" style="color: #C2C2C2;">
				<a class="layui-icon layui-icon-username"
					style="font-size: 14px;" >{{pitem.post.postAuthor}}</a> <a
					class="layui-icon layui-icon-tree" style="font-size: 14px;" >{{pitem.post.postCreattime}}</a>
				</div>
			</div>
		</div>
		
		<fieldset class="layui-elem-field layui-field-title"
			style="margin-top: 10px; margin-left: 20px; width:200px;">
		<legend>我是有底线的</legend>
		</fieldset>
	</div>
				`,
		data(){
		      return {
		    	  list:{},
		    	  barId:'',
		    	  postByGreatReadedDTOList:{
						post_pictureList:{
							pictureId:'',
							pictureName:''
						},
						post:{
							postId: '',
							postBarId: '',
							postUserId: '',
							postTitle: '',
							postContent: '',
							postAuthor: '',
							postCreattime: ''
						},
						post_bar:{
							barId: '',
							barName: ''
						}
					},
		      }
		    },
	  created(){
		    	var postCategory = sessionStorage.getItem('postCategory'); // =>
																			// 返回testKey对应的值
		    	var data={
		    		'postCategory' : postCategory
		    		}
// console.log('postCategory'+postCategory);
	        	var url = '/tbxt/queryHuatiByCategory';
				this.$http.post(url,data,{
					emulateJSON : true
				}).then(function(res) {
					if(res.body=='error'){
						layer.msg('获取数据异常!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					}else{
						this.list = res.body.postByGreatReadedDTOList;
// console.log(JSON.stringify(this.list));
						this.postByGreatReadedDTOList = res.body.postByGreatReadedDTOList[0];
						this.postByGreatReadedDTOList.pictureList = res.body.postByGreatReadedDTOList[0].post_pictureList;
						this.postByGreatReadedDTOList.post = res.body.postByGreatReadedDTOList[0].post;
						this.postByGreatReadedDTOList.post_bar = res.body.postByGreatReadedDTOList[0].post_bar;
						$(".loading_icon").hide();

					} 
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('获取个人动态信息失败!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})	
				
	        },
	        methods:{
	        	// 打开帖子
				open_tiezi : function(postid) {
					// 监测该贴是否被点赞
					var url2 = '/tbxt/greatJudge';
					var data = {
							'postId': postid
					}
					this.$http.post(url2, data,{
						emulateJSON : true
					}).then(function(res) {
						 switch(res.body){
						     case 'great_0':
						       document.getElementById("great_icon_jb").style.color="#999999"; 
						       break;
						     case 'great_1':
						       document.getElementById("great_icon_jb").style.color="#009688";
						       break;
						     default:
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('获取个人动态信息失败!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					})
					this.$options.methods.GetPostById(postid);
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '1330px', '600px' ],// 定义宽和高
							title : '帖子详情',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#tiezi_Box')
						// 打开的内容
						});
					})
				},
				// 传递postid获取相关参数
				GetPostById :function(postid){
					var data = {
							'postId': postid
					}
					sessionStorage.setItem('toPost',postid); // 存入一个值
					var url = '/tbxt/GetpostByPostId';
					vm.$http.post(url,data,{
						emulateJSON : true,
					}).then(function(res) {
// console.log("res.body=="+JSON.stringify(res.body));
						vm.postList = res.body
						if(res.body.judgePostUser == '1'){
							$('#delTopic').show();
						}
						if(res.body.DTOreaded != null){
							vm.readed = res.body.DTOreaded.countRead;
						}else{
							vm.readed = '0'
						}
						if(res.body.DTOgreat == null){
							vm.great = '0'
						}else{
							vm.great = res.body.DTOgreat.post_greatList.length
						}
						if(res.body.DTOBarAndPic.post_pictureList != null){
							vm.pictureList = res.body.DTOBarAndPic.post_pictureList
						}
						if(res.body.DTOtopic != null){
							vm.post_topicList = res.body.DTOtopic.post_topicList;
							$("#comments_shafa").hide();
						}else{
							vm.post_topicList=false;
						}
						vm.pass_postId = postid;
						$(".loading_icon").hide();
						if(res.body.judgePostUser == 1){
							setTimeout(function(){
							$('.delTopic').show();
						}, 10);
						}
// this.$options.methods.judgeRead(postid);
						var Judurl = '/tbxt/AddRead';
						vm.$http.post(Judurl,data,{
							emulateJSON : true,
						}).then(function(res) {
// console.log("postId==="+postid);
// console.log("执行已读==="+res.bodyText);
						}, function(err) {
						})
// console.log("传递参数过去呀")
					}, function(err) {
						// 处理失败的结果
						layer.msg('获取帖子动态信息失败!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              });
					})	
				},
				openbar : function(barId){
// console.log("00"+barPicName);
					sessionStorage.setItem('barId',barId); // 存入一个值
					setTimeout(function() {
						location.href="/tbxt/barExtend.html"
					}, 50);
				}
	        },
	        
			})
			Vue.component('component9469',component9469)
/* ============================头部======吧内post详情展示=========================== */
		var component1 = Vue.extend({
				template:`
			<div>	
				<div id="sjx_shafa">
						<i class="layui-icon layui-icon-face-surprised" style="font-size: 25px;color: rgb(153, 153, 153);">神马，这个贴吧居然无人问津！</i>
				</div>
		<div class="right-sec_tiezi_info_barinfo" v-if="list" v-for="pitem in list" :key="pitem">
			<a href="javascript:;" class="right-sec_tieba_name"
				style="font-size: 20px; float: left; margin-left: 20px;"  >{{pitem.post_bar.barName}}</a>
			<br />
			<br />
		<a href="javascript:;" class="right-sec_tiezi_title"
				style="font-size: 15px; float: left; margin-left: 20px; color: #009688;" v-on:click="open_tiezi(pitem.post.postId)" >{{pitem.post.postTitle}}</a><span style="font-size: 15px; float: left; margin-left: 20px; color: #FF7F42;" v-if="pitem.post.postCategory">#{{pitem.post.postCategory}}</span> <br />
			<br />
			<div class="right-sec_tiezi_content">
				<a href=""
					style="font-size: 13px; float: left; text-align : left; display: inline; margin-left: 20px; color: #8D8D8D" >{{pitem.post.postContent}}</a>
			</div>
			<div class="right-sec_tiezi_photo_box" >
				<img class="right-sec_tiezi_photo" v-for="item in pitem.post_pictureList" :key="item" :src=" '/tbxt/IoReadImage?pictureName='+item.pictureName " />
			</div>
			
			<div class="right-sec_tiezi_author_info_box">
				<div class="right-sec_tiezi_author_info" style="color: #C2C2C2;">
				<a class="layui-icon layui-icon-username"
					style="font-size: 14px;" >{{pitem.post.postAuthor}}</a> <a
					class="layui-icon layui-icon-tree" style="font-size: 14px;" >{{pitem.post.postCreattime}}</a>
				</div>
			</div>
		</div>
		
		<fieldset class="layui-elem-field layui-field-title"
			style="margin-top: 10px; margin-left: 20px; width:200px;">
		<legend>我是有底线的</legend>
		</fieldset>
	</div>
				`,
		data(){
		      return {
		    	  list:{},
		    	  barId:'',
		    	  postByGreatReadedDTOList:{
						post_pictureList:{
							pictureId:'',
							pictureName:''
						},
						post:{
							postId: '',
							postBarId: '',
							postUserId: '',
							postTitle: '',
							postContent: '',
							postAuthor: '',
							postCreattime: ''
						},
						post_bar:{
							barId: '',
							barName: ''
						}
					},
		      }
		    },
	  created(){
		    	var barId = sessionStorage.getItem('barId'); // =>
																// 返回testKey对应的值
// console.log("creattttt"+barId);
		    	var data={
		    		'barId' : barId
		    		}
	        	var url = '/tbxt/queryBarPostView';
				this.$http.post(url,data,{
					emulateJSON : true
				}).then(function(res) {
// console.log(res.body.postByGreatReadedDTOList.length);
					if(res.body=='error'){
						layer.msg('获取数据异常!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					}else{
						if(res.body.postByGreatReadedDTOList.length>0){
// console.log(JSON.stringify(this.list));
							this.list = res.body.postByGreatReadedDTOList;
							this.postByGreatReadedDTOList = res.body.postByGreatReadedDTOList[0];
							this.postByGreatReadedDTOList.pictureList = res.body.postByGreatReadedDTOList[0].post_pictureList;
							this.postByGreatReadedDTOList.post = res.body.postByGreatReadedDTOList[0].post;
							this.postByGreatReadedDTOList.post_bar = res.body.postByGreatReadedDTOList[0].post_bar;
							$(".loading_icon").hide();
							$("#sjx_shafa").hide();
						}
						$(".loading_icon").hide();
					} 
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('获取个人动态信息失败!',{icon: 5},{
	                    offset:['40%'],
	                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	              }); 
				})	
				
	        },
	        methods:{
	        	// 打开帖子
				open_tiezi : function(postid) {
					// 监测该贴是否被点赞
					var url2 = '/tbxt/greatJudge';
					var data = {
							'postId': postid
					}
					this.$http.post(url2, data,{
						emulateJSON : true
					}).then(function(res) {
						 switch(res.body){
						     case 'great_0':
						       document.getElementById("great_icon_jb").style.color="#999999"; 
						       break;
						     case 'great_1':
						       document.getElementById("great_icon_jb").style.color="#009688";
						       break;
						     default:
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('获取个人动态信息失败!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              }); 
					})
					this.$options.methods.GetPostById(postid);
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '1330px', '600px' ],// 定义宽和高
							title : '帖子详情',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#tiezi_Box')
						// 打开的内容
						});
					})
				},
				// 传递postid获取相关参数
				GetPostById :function(postid){
					var data = {
							'postId': postid
					}
					sessionStorage.setItem('toPost',postid); // 存入一个值
					var url = '/tbxt/GetpostByPostId';
					vm.$http.post(url,data,{
						emulateJSON : true,
					}).then(function(res) {
// console.log("res.body=="+JSON.stringify(res.body));
						vm.postList = res.body
						if(res.body.judgePostUser == '1'){
							$('#delTopic').show();
						}
						if(res.body.DTOreaded != null){
							vm.readed = res.body.DTOreaded.countRead;
						}else{
							vm.readed = '0'
						}
						if(res.body.DTOgreat == null){
							vm.great = '0'
						}else{
							vm.great = res.body.DTOgreat.post_greatList.length
						}
						if(res.body.DTOBarAndPic.post_pictureList != null){
							vm.pictureList = res.body.DTOBarAndPic.post_pictureList
						}
						if(res.body.DTOtopic != null){
							vm.post_topicList = res.body.DTOtopic.post_topicList;
							$("#comments_shafa").hide();
						}else{
							vm.post_topicList=false;
						}
						vm.pass_postId = postid;
						$(".loading_icon").hide();
						if(res.body.judgePostUser == 1){
							setTimeout(function(){
							$('.delTopic').show();
						}, 10);
						}
// this.$options.methods.judgeRead(postid);
						var Judurl = '/tbxt/AddRead';
						vm.$http.post(Judurl,data,{
							emulateJSON : true,
						}).then(function(res) {
// console.log("postId==="+postid);
// console.log("执行已读==="+res.bodyText);
						}, function(err) {
						})
// console.log("传递参数过去呀")
					}, function(err) {
						// 处理失败的结果
						layer.msg('获取帖子动态信息失败!',{icon: 5},{
		                    offset:['40%'],
		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		              });
					})	
				},
	        },
	        
			})
			Vue.component('component1',component1)
			
			var component121 = Vue.extend({
				template:`
				<div>
					<img class="barPic" alt="" :src=" '/tbxt/IoReadImage?pictureName='+barPicName">
				</div>
				`,
			data(){
			      return {
			    	  barPicName:'',
			      }
			    },
	        created(){	// 获取贴吧图片logo
			    var barId = sessionStorage.getItem('barId');
			    if(barId != null){
			    	var data = {
			    		'barId':barId	
			    	}
	        		var url = '/tbxt/queryBarPic'
	            		this.$http.post(url,data,{emulateJSON:true}).then(function(res) {
	        				// 处理成功的结果
// console.log(res.body);
	            			this.barPicName = res.body.barPicture;
	        			}, function(err) { })
	        	}else{
	        		this.barPicName = 'zuizuo21'
	        	}

	        },
			})
			Vue.component('component121',component121)
		
	/* ============================尾部======吧内post详情展示=========================== */
// 发帖页面Layer
	var creat_post_component = Vue.extend({
	template:`<div id="fatie_Box" style="display: none;">
			<div class="layui-form-item">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 20px; margin-left: 90px; width: 800px;">
					<legend style="font-size: 15px;">
						发贴请遵守 <a href="" style="font-weight: bold">贴吧相关协议</a>
					</legend>
				</fieldset>
			</div>

			<div class="fatie_left">
			
				<div id="rm_huati"  class="layui-form">
				<label class="layui-form-label">热门话题</label>
					<div class="layui-input-block">
						<select name="ht_option" id="htSelect" style="display:none;" lay-verify="">
						  <option value="" selected="selected">请选择热门话题</option>
						  <option v-for="item in huatiList" :key="item" :value="item.huatiContent">{{item.huatiContent}}</option>
						</select> 
					</div>	
				</div>
				
				<div id="zx_huati"  class="layui-form">
				<label class="layui-form-label">输入话题</label>
					<div class="layui-input-block">
						<input type="text" id="fatie_huati" v-model="creat_tie_category"
							lay-verify="title" autocomplete="off" class="layui-input">
					</div>	
				</div>
				
				<a id="huati_a" href="javascript:;" v-on:click="zxhuati_add" style="float:left;margin-left:10px;margin-top: 7px;text-decoration:underline;">#添加自己的话题</a>
				<a id="huati_b" href="javascript:;" v-on:click="rmhuati_add" style="float:left;margin-left:10px;margin-top: 7px;display:none;text-decoration:underline">#选择热门话题</a>
			
				<div class="layui-form-item">
					<label class="layui-form-label">取个标题吧</label>
					<div class="layui-input-block">
						<input type="text" id="fatie_title" v-model="creat_tie_title"
							lay-verify="title" placeholder="标题不能超过20个字" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item layui-form-text">
					<label class="layui-form-label"></label>
					<div class="layui-input-block" style="width: 660px;">
						<textarea placeholder="发贴记得遵守贴吧相关规则奥~" id="fatie_textarea"
						v-model="creat_tie_content" class="layui-textarea">
							</textarea>
					</div>
				</div>
			</div>
			

			<div class="fatie_right">
				<div class="fatie_photo_box" id="fatie_photo_box">
					<input type="file" id="file1"  style="display: none">
					<input type="file" id="file2"  style="display: none">
					<input type="file" id="file3"  style="display: none">
					<input type="file" id="file4"  style="display: none">
					<input type="file" id="file5"  style="display: none">
					<input type="file" id="file6"  style="display: none">
					<input type="file" id="file7"  style="display: none">
					<input type="file" id="file8"  style="display: none">
					<input type="file" id="file9"  style="display: none">
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx1" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx2" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx3" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx4" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx5" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx6" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx7" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx8" src="img/sc.jpg" ></div>
					<div class="fatie_photos"><img alt="点击上传图片" class="photo_xx" id="photo_xx9" src="img/sc.jpg" ></div>
				</div>
			</div>


			<div class="layui-form-item">
				<div class="fatie_btn">
					<button class="layui-btn layui-btn-lg" v-on:click="tie_creat">发布</button>
					<button class="layui-btn layui-btn-lg">取消</button>
				</div>
			</div>

		</div>`,
	data(){
	      return {
	    	creat_tie_content :'',
			creat_tie_title :'',
			creat_tie_category :'',
			huatiList:''
	      }
	    },
	   created(){
	    	var url = '/tbxt/queryHotHuatiAll'
    		this.$http.post(url).then(function(res) {
				// 处理成功的结果
				this.huatiList = res.body.huatiList
// console.log("-==="+JSON.stringify(this.huatiList));
			}, function(err) {
				// 处理失败的结果
				layer.msg('登陆失败!',{icon: 5},{
                    offset:['40%'],
                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
              });
				
			})
	    	
	    }, 
  mounted(){
        },
        methods:{
        	// 添加话题
        	zxhuati_add : function(){
        		$('#rm_huati').hide();
        		$('#zx_huati').show();
        		$('#huati_a').hide();
        		$('#huati_b').show();
        	},
        	rmhuati_add : function(){
        		$('#zx_huati').hide();
        		$('#rm_huati').show();
        		$('#huati_b').hide();
        		$('#huati_a').show();
        	},
        	// 发帖
			tie_creat: function(){
				var barId = sessionStorage.getItem('barId'); // =>
																// 返回testKey对应的值
				if(barId){
					var regT=/^.{1,20}$/;   /* 定义验证表达式 */
					this.creat_tie_title = this.creat_tie_title.trim();
					this.creat_tie_content = this.creat_tie_content.trim();
					if(regT.test(this.creat_tie_title) && this.creat_tie_content != ''){
						var file1 = document.getElementById("file1");
						var file2 = document.getElementById("file2");
						var file3 = document.getElementById("file3");
						var file4 = document.getElementById("file4");
						var file5 = document.getElementById("file5");
						var file6 = document.getElementById("file6");
						var file7 = document.getElementById("file7");
						var file8 = document.getElementById("file8");
						var file9 = document.getElementById("file9");
						var formData=new FormData();
						var creat_tie_category22= $('#htSelect option:selected') .val().trim();// 选中的值
// console.log("111==="+this.creat_tie_category);
// console.log("222==="+creat_tie_category22);
						if(creat_tie_category22 == '' && this.creat_tie_category != ''){
							formData.append('postCategory', this.creat_tie_category);
						}else if(creat_tie_category22 != '' && this.creat_tie_category == ''){
							formData.append('postCategory', creat_tie_category22);
						}else{
							formData.append('postCategory', '');
						}
						formData.append('postTitle', this.creat_tie_title);
						formData.append('postContent', this.creat_tie_content);
						formData.append('postBarId', barId);
						formData.append('files', file1.files[0]);
						formData.append('files', file2.files[0]);
						formData.append('files', file3.files[0]);
						formData.append('files', file4.files[0]);
						formData.append('files', file5.files[0]);
						formData.append('files', file6.files[0]);
						formData.append('files', file7.files[0]);
						formData.append('files', file8.files[0]);
						formData.append('files', file9.files[0]);
						var url = '/tbxt/postCreat';
						this.$http.post(url, formData, {
							emulateJSON : true
						}).then(function(res) {
							// 处理成功的结果
// console.log(res.body)
							if(res.body=='success'){
								layer.msg('发帖成功!',{icon: 1},{
				                    offset:['40%'],
				                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
				              });
								/*
								 * setTimeout(function(){
								 * location.href="/tbxt/tieba.html"; },1000);
								 */
								layer.close(layer.index-1); // 它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
							}else if(res.body=='sessionError'){
								layer.msg('未登录状态!',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
							}else{
								layer.msg('发帖出现错误!',{icon: 5},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
							}
						}, function(err) {
							// 处理失败的结果
							layer.msg('登陆失败!',{icon: 5},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  });
							
						})
						
					}else{
						layer.msg('注意发帖格式!',{icon: 7},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					}
				}
				
				
			},
        }
})
// 注册页面Layer
	var register_component = Vue.extend({
	template:`<div id="registerBox" style="display: none;">
			<fieldset class="layui-elem-field layui-field-title"
				style="margin-top: 20px; margin-left: 90px; width: 320px;">
				<legend>账号注册</legend>
			</fieldset>
			<div class="layui-form-item">
				<label class="layui-form-label">用户名</label>
				<div class="layui-input-block">
					<input type="text" v-model="registerBox_userNickname"
						name="userNickname" id="user_name" lay-verify="title"
						autocomplete="off" placeholder="昵称以2~5位中文命名" class="layui-input">
				</div>
			</div>

			<div class="layui-form-item">
				<label class="layui-form-label">邮箱</label>
				<div class="layui-input-block">
					<input type="text" v-model="registerBox_userEmail" name="userEmail"
						id="user_email" lay-verify="required" placeholder="可用于登陆和找回密码"
						autocomplete="off" class="layui-input">
				</div>
			</div>

			<div class="layui-form-item">
				<label class="layui-form-label">密码</label>
				<div class="layui-input-inline">
					<input type="password" v-model="registerBox_userPassword"
						name="userPassword" id="user_password" lay-verify="pass"
						placeholder="请设置6位数登陆密码" autocomplete="off" class="layui-input">
				</div>
				<div class="layui-form-mid layui-word-aux">请设置6位数登陆密码</div>
			</div>

			<div class="layui-form-item">
				<label class="layui-form-label">验证码</label>
				<div class="layui-input-inline">
					<input type="text" id="verifiy_code"
						lay-verify="required" v-model="registerBox_yzm" placeholder="请输入验证码" autocomplete="off"
						class="layui-input">
				</div>
				<button id="yzm_btn1" class="layui-btn layui-btn-primary " @click="sendEmail">获取验证码</button>
				<button id="yzm_btn2" class="layui-btn " style="display:none;">验证码已发送</button>
			</div>
			<div id="btn_zq">
				<button class="layui-btn layui-btn-lg" v-on:click="register_user">注册</button>
				<button class="layui-btn layui-btn-lg">取消</button>
			</div>
		</div>`,
	data(){
	      return {
	    	  registerBox_userNickname:'',
	    	  registerBox_userEmail:'',
	    	  registerBox_userPassword:'',
	    	  registerBox_yzm:'',
	    	  yzm:'',
	      }
	    },
  mounted(){
        },
        methods:{
        	sendEmail : function(){
// console.log("发送邮箱");
        		var regName=/^[\u4E00-\u9FA5]{2,4}$/;   /* 定义验证表达式 */
        		var regEmail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; /* 校验邮件地址是否合法 */
        		if(regName.test(this.registerBox_userNickname)){
            		if(regEmail.test(this.registerBox_userEmail)){
            			$('#yzm_btn1').hide();
            			$('#yzm_btn2').show();
            			var data = {
            				'userEmail':this.registerBox_userEmail,
            				'userNickname' : this.registerBox_userNickname,
            			}
            			var url = '/tbxt/sendEmail';
        				this.$http.post(url, data, {
        					emulateJSON : true
        				}).then(function(res) {
// console.log(res.bodyText);
        					this.yzm = res.bodyText;
        				}, function(err) {
        					// 处理失败的结果
        					layer.msg('数据异常!',{icon: 5},{
                                offset:['40%'],
                                time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                          }); 
        				})
            		}else{
            			layer.msg('邮箱格式错误!',{icon: 5},{
                            offset:['40%'],
                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                      }); 
            		}
        		}else{
        			layer.msg('用户名格式错误!',{icon: 5},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
        		}

        	},
        	// 注册事件
			register_user : function() {
				var regEmail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; /* 校验邮件地址是否合法 */
				var regPassword=/^[0-9]{6}$/;   /* 定义验证表达式 */
				var regName=/^[\u4E00-\u9FA5]{2,4}$/;   /* 定义验证表达式 */
				if(regEmail.test(this.registerBox_userEmail) && regPassword.test(this.registerBox_userPassword) && regName.test(this.registerBox_userNickname 
						)){
					if(this.registerBox_yzm == this.yzm){
						var data = {
								userNickname : this.registerBox_userNickname,
								userEmail : this.registerBox_userEmail,
								userPassword : this.registerBox_userPassword
							};
						var url = '/tbxt/register';
						this.$http.post(url, data, {
							emulateJSON : true
						}).then(function(res) {
							// 处理成功的结果
// console.log(res.body)
							if(res.body=='register_success'){
								layer.msg('注册成功!',{icon: 6},{
			                          offset:['40%'],
			                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                    });
								setTimeout(function(){
									location.href="/tbxt/tieba.html";
								},500);
							}else{
								layer.msg('该邮箱已注册!',{icon: 7},{
			                          offset:['40%'],
			                          anim:1,
			                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                    }); 
							}
						}, function(err) {
							// 处理失败的结果
// console.log(err)
							layer.msg('注册失败!',{icon: 5},{
			                          offset:['40%'],
			                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  }); 
						})
					}else{
						layer.msg('验证码错误!',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  }); 
					}
				}else{
					layer.msg('请输入合法字符!',{icon: 5},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
				}
				
			},
        }
})
// 登陆页面Layer
	var login_component = Vue.extend({
	template:`<div id="loginBox" style="display: none;">
			<fieldset class="layui-elem-field layui-field-title"
				style="margin-top: 20px; margin-left: 90px; width: 320px;">
				<legend>最左——拉近你我</legend>
			</fieldset>
			<div class="layui-form-item" style="margin-top: 30px;">
				<label class="layui-form-label">邮箱</label>
				<div class="layui-input-block">
					<input type="text" v-model="loginBox_userEmail" id="user_name"
						lay-verify="title" autocomplete="off" placeholder="请设置用户名"
						class="layui-input">
				</div>
			</div>

			<div class="layui-form-item" style="margin-top: 30px;">
				<label class="layui-form-label">密码</label>
				<div class="layui-input-block">
					<input type="password" v-model="loginBox_userPassword" id="user_email"
						lay-verify="required" placeholder="可用于登陆和找回密码" autocomplete="off"
						class="layui-input">
				</div>
			</div>
			<div id="btn_zq" style="margin-top: 30px;">
				<button class="layui-btn layui-btn-lg" v-on:click="login_user">登陆</button>
				<button class="layui-btn layui-btn-lg">取消</button>
			</div>
		</div>`,
	data(){
	      return {
	    	  loginBox_userEmail:'',
	    	  loginBox_userPassword:''
	      }
	    },
  mounted(){
        },
        methods:{
        	// 登陆事件
			login_user : function() {
// console.log("执行登陆事件");
				var data = {
					userEmail : this.loginBox_userEmail,
					userPassword : this.loginBox_userPassword
				};
				var url = '/tbxt/login';
				this.$http.post(url, data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
// console.log(res.body)
					if(res.body=='loginSuccess'){
						sessionStorage.setItem('userAcount',this.loginBox_userEmail); // 存入一个值
						sessionStorage.setItem('userPassword',this.loginBox_userPassword); // 存入一个值
						layer.msg('登陆成功!',{icon: 6},{
	                          offset:['40%'],
	                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                    }); 
						setTimeout(function(){
							location.href="/tbxt/tieba.html";
						},500);
					}else if(res.body=='banned'){
						layer.msg('该账户已被封禁!',{icon: 5},{
	                          offset:['40%'],
	                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                    }); 
					}else{
						layer.msg('邮箱或者密码错误!',{icon: 7},{
	                          offset:['40%'],
	                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                    }); 
					}
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('登陆失败!',{icon: 5},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
				})

			},
        }
})
Vue.component('toplable_a',toplable_component)
Vue.component('sjx_post_component',sjx_post_component)
Vue.component('creat_post_component',creat_post_component)
Vue.component('register_component',register_component)
Vue.component('login_component',login_component)
// 1.创建一个组件构造器
var vm = new Vue(
		{
			el : '#mainIndex',
			data : {
				userInfo:{
					userNickname : '',
					userLevel:'',
					userEmail:'',
					userGender:'',
					userCreattime:'',
					userPassword:'',
				},
				announceContent:'',
				PerSonReadCount:'',
				PerSonGreadCount:'',
				PerSonPostCount:'',
				toplable_list : [ '网页', '新闻', '贴吧', '知道', '视频', '音乐', '图片',
						'地图', '文库' ],
				sjx_postList :[],
				GreatIcon_color :'',
				register_result : null,
				postList:{
					DTOBarAndPic:{
						post:{
							postAuthor:'',
							postCreattime:'',
							postContent:'',
							postCategory:''
						}
					}
				},
				barId:'',
				postByGreatReadedDTOList:{
					post_pictureList:{
						pictureId:'',
						pictureName:''
					},
					post:{
						postId: '',
						postBarId: '',
						postUserId: '',
						postTitle: '',
						postContent: '',
						postAuthor: '',
						postCreattime: ''
					},
					post_bar:{
						barId: '',
						barName: ''
					}
				},
				readed:'',
				great:'',
				post_topicList:{
					userId:'',
					topicContent:'',
				},
				comments_topicContent:'',
				pictureList:'',
				pass_postId:'',
				barPic_name:'',
				seacherBarName:'',
				wjmm_email:'',
				wjmm_newpassword:'',
				wjmm_yzm:'',
				jdmm_oldpassword:'',
				jdmm_newpassword:'',
				jdmm_email:'',
			},
		 components: {
			 'post_view_component':post_view_component,
			 /* 'post_barView_component':post_barView_component */
				  },
			// vue载入后执行获取session方法
			mounted(){ 
				this.$nextTick(function () {
					var that=this;
			        $.ajax({
			          type:"post",
			          url:'/tbxt/requestSession',
			          headers:{
			              'Accept': '*/*',
			              'Content-Type': 'application/x-www-form-urlencoded'
			            },
			          success:function(data){
			        	  if(data.length>0){
			        		 data = JSON.parse(data);
			        		 that.userInfo.userNickname = data.userNickname;
			        		 that.userInfo.userLevel = data.userLevel;
			        		 that.userInfo.userEmail = data.userEmail;
			        		 that.userInfo.userGender = data.userGender;
			        		 that.userInfo.userCreattime = data.userCreattime.substr(0, data.userCreattime.length - 8);  ;
			        		 that.userInfo.userPassword = data.userPassword;
			        		 $('#myloginoo').hide();
			        	  }else{
			        		  that.userInfo.userNickname = '未登录'
			        		  $('#myinfooo').hide();
			        		  $('#logoutooo').hide();
			        	  }
			          }
			        })
			      })
			    },
			methods : {
				// 打开登陆模态框
				open_login : function(){
					layui.use(['layer'],function () {
						var layer = layui.layer,$=layui.$;
						layer.open({
								type:1,// 类型
								area:['500px','360px'],// 定义宽和高
								title:'账号登陆',// 题目
								shadeClose:false,// 点击遮罩层关闭
								content: $('#loginBox')// 打开的内容
						});
					})
				},
				// 修改用户信息
				update_user : function(){
					this.userInfo.userNickname = this.userInfo.userNickname.trim();
					if(this.userInfo.userNickname != ''){
						var aa = sessionStorage.getItem('userAcount'); // 存入一个值
						var bb = sessionStorage.getItem('userPassword'); // 存入一个值
						var cc = $('#SexSelect option:selected') .val()
// console.log('性别=='+cc);
						var data = {
								'userNickname':this.userInfo.userNickname,
								'userGender':cc
							}
// console.log('update');
							var url = '/tbxt/UpdateUser';
							this.$http.post(url,data,{
								emulateJSON : true
							}).then(function(res) {
								if(res.bodyText == 'Update'){
									layer.msg('更新信息成功！',{icon: 1},{
				                        offset:['40%'],
				                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
				                  });
									layer.close(layer.index-1)
									
									var data = {
					userEmail : aa,
					userPassword : bb
				};
				var url = '/tbxt/login';
				this.$http.post(url, data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
// console.log(res.body)
					if(res.body=='loginSuccess'){
						setTimeout(function(){
							location.href="/tbxt/tieba.html";
						},500);
					}else if(res.body=='banned'){
						layer.msg('该账户已被封禁!',{icon: 5},{
	                          offset:['40%'],
	                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                    }); 
					}else{
						layer.msg('邮箱或者密码错误!',{icon: 7},{
	                          offset:['40%'],
	                          time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                    }); 
					}
				}, function(err) {
					// 处理失败的结果
// console.log(err)
					layer.msg('登陆失败!',{icon: 5},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
				})
									
								}
							}, function(err) {
								// 处理失败的结果
								layer.msg('数据异常',{icon: 5},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  }); 
							})	
					}else{
						layer.msg('用户名不能为空',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  }); 
					}
					
				},
				// 打开个人信息页面
				open_my_info : function() {
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '400px', '450px' ],// 定义宽和高
							title : '个人信息',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#my_info_Box')
						// 打开的内容
						});
					})
				},
				wjmm : function(){
					$('#jdmm').show();
					$('#wjmm').hide();
				},
				jdmm : function(){
					$('#wjmm').show();
					$('#jdmm').hide();
				},
				// 修改密码
				open_my_mima : function(){
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '400px', '450px' ],// 定义宽和高
							title : '修改密码',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#xiugaiMM')
						// 打开的内容
						});
					})
				},
				// 忘记密码的修改密码方法
				wjmm_update : function(){
					var regPassword=/^[0-9]{6}$/;   /* 定义验证表达式 */
					if(regPassword.test(this.wjmm_newpassword)){
						if(this.yzm == this.wjmm_yzm){
							var data = {
								'userEmail':this.wjmm_email,
								'userPassword':this.wjmm_newpassword,
							}
							var url = '/tbxt/UpdateWjPassword';
	        				this.$http.post(url, data, {
	        					emulateJSON : true
	        				}).then(function(res) {
	        					if(res.bodyText == 'Update'){
	        						layer.msg('更新密码成功!',{icon: 1},{
		                                offset:['40%'],
		                                time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                          }); 
	            					layer.close(layer.index-1);
	        					}else{
	        						layer.msg('该邮箱账户不存在!',{icon: 5},{
		                                offset:['40%'],
		                                time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                          }); 
	        					}
	        				}, function(err) {
	        					// 处理失败的结果
	        					layer.msg('数据异常!',{icon: 5},{
	                                offset:['40%'],
	                                time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                          }); 
	        				})
						}else{
							layer.msg('验证码错误!',{icon: 5},{
	                            offset:['40%'],
	                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                      }); 
						}
					}else{
						layer.msg('新密码格式不对!',{icon: 5},{
                            offset:['40%'],
                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                      }); 
					}
				},
				// 记得密码的修改密码方法
				jdmm_update : function(){
					var regPassword=/^[0-9]{6}$/;   /* 定义验证表达式 */
					var regEmail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; /* 校验邮件地址是否合法 */
					var url = '/tbxt/UpdateJdPassword';
					if(regEmail.test(this.jdmm_email)){
						if(regPassword.test(this.jdmm_newpassword)){
							var data = {
								'userEmail': this.jdmm_email,
								'userOldPassword':this.jdmm_oldpassword,
								'userNewPassword':this.jdmm_newpassword,
							}
							this.$http.post(url, data, {
								emulateJSON : true
							}).then(function(res) {
								switch(res.bodyText){
								case 'Update':
								layer.msg('密码更新成功!',{icon: 1},{
		                            offset:['40%'],
		                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                      });
								layer.close(layer.index-1);
								break;
								case 'passwordError':
								layer.msg('旧密码错误!',{icon: 5},{
		                            offset:['40%'],
		                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                      });
								break;
								case 'emailNull':
								layer.msg('该邮箱账户不存在!',{icon: 5},{
		                            offset:['40%'],
		                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                      });
								break;
								}
							}, function(err) {
								
							})
						}else{
						layer.msg('新密码格式错误!',{icon: 5},{
                            offset:['40%'],
                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                      });
						}
					}else{
						layer.msg('邮箱格式不对!',{icon: 5},{
                            offset:['40%'],
                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                      }); 
					}
			
				},
				// 发送修改密码的验证码
				sendXGyzm : function(){
//		        console.log("发送邮箱");
        		var regEmail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; /* 校验邮件地址是否合法 */
            		if(regEmail.test(this.wjmm_email)){
            			$('#yzm_btn11').hide();
            			$('#yzm_btn22').show();
            			var data = {
            				'userEmail':this.wjmm_email,
            			}
            			var url = '/tbxt/sendXGEmail';
        				this.$http.post(url, data, {
        					emulateJSON : true
        				}).then(function(res) {
        					this.yzm = res.bodyText;
        				}, function(err) {
        					// 处理失败的结果
        					layer.msg('数据异常!',{icon: 5},{
                                offset:['40%'],
                                time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                          }); 
        				})
            		}else{
            			layer.msg('邮箱格式错误!',{icon: 5},{
                            offset:['40%'],
                            time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                      }); 
            		}
				},
				// 注销用户
				logout : function(){
					var url = '/tbxt/logout';
					this.$http.post(url).then(function(res) {
						// 处理成功的结果
// console.log("注销==="+res.body)
						if(res.body=='logoutSuccess'){
							layer.msg('成功退出!',{icon: 1},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  }); 
							setTimeout(function(){
								location.href="/tbxt/tieba.html";
							},1000);
						}else{
							layer.msg('退出异常',{icon: 5},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  }); 
						}
					}, function(err) {
						// 处理失败的结果
						layer.msg('退出异常',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  }); 
					})
				},
				SYopen_fatie : function(){
					layer.msg('该功能只能在进入相关贴吧内使用~',{icon: 7},{
                        offset:['40%'],
                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
                  }); 
				},
				// 打开发帖页面
				open_fatie:function(){
					var url = '/tbxt/requestSession';
					this.$http.post(url, {
						emulateJSON : true
					}).then(function(res) {
						if(res.body==''){
							layer.msg('请先登录',{icon: 7},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  }); 
						}else{
							layui.use(['layer'],function () {
								var layer = layui.layer,$=layui.$;
								var index = layer.open({
										type:1,// 类型
										area:['1330px','600px'],// 定义宽和高
										title:'发表新帖',// 题目
										shadeClose:false,// 点击遮罩层关闭
										content: $('#fatie_Box')// 打开的内容
								});
						})
						} 
					}, function(err) {
						// 处理失败的结果
						layer.msg('获取个人动态信息失败',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  }); 
					})	
				},
				// 打开个人动态页面
				open_myinfozx:function(){
					var url = '/tbxt/GetpostByuserId';
					this.$http.post(url, {
						emulateJSON : true
					}).then(function(res) {
						if(res.body=='Getpost_error'){
							layer.msg('请先登录!',{icon: 7},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  });
						}else{
							setTimeout(function(){ 
								location.href="/tbxt/infozx.html";
							}
							,500);
						} 
					}, function(err) {
						// 处理失败的结果
						layer.msg('获取个人动态信息失败',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					})	
				},
				// 打开评论框
				open_comment_w : function() {
					
					var url = '/tbxt/requestSession';
					this.$http.post(url).then(function(res) {
						// 处理成功的结果
						if(res.body==''){
							layer.msg('检测到账号未登录',{icon: 7},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  });
						}else{
							layui.use([ 'layer' ], function() {
								var layer = layui.layer, $ = layui.$;
								var index = layer.open({
									type : 1,// 类型
									area : [ '800px', '450px' ],// 定义宽和高
									title : '评论界面',// 题目
									shadeClose : false,// 点击遮罩层关闭
									content : $('#comments_Box')
								// 打开的内容
								});
							})
						}
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('评论功能出现异常',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					})
					
				},
				// 评论功能
				tijiao_comments_click : function(index_comments){
					var url = '/tbxt/CommentsAdd';
					var postId = vm.pass_postId
					var topicContent = vm.comments_topicContent.trim();
// console.log("评论功能===获取topicContent=="+vm.comments_topicContent);
// console.log("评论功能===postId，topicContent=="+postId+"=="+topicContent);
					var data = {
						'postId': postId,
						'topicContent':topicContent
					}
					if(topicContent != ''){
						this.$http.post(url, data,{
							emulateJSON : true
						}).then(function(res) {
// console.log("====="+res.body);
							 switch(res.body){
							     case 'success':
							       layer.msg('评论成功！',{icon: 1},{
				                        offset:['40%'],
				                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
				                  });
// console.log("kkkkkkkkkkkk")
							       $("#comments_shafa").hide();
			                	  var url2 = '/tbxt/GetpostByPostId';
									vm.$http.post(url2,data,{
										emulateJSON : true,
									}).then(function(res) {
										if(res.body.DTOtopic != null){
											vm.post_topicList = res.body.DTOtopic.post_topicList;
										}
									}, function(err) {
										// 处理失败的结果
// console.log(err)
										layer.msg('数据异常！',{icon: 5},{
						                        offset:['40%'],
						                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
						                  });
									})	
// console.log("rrrrrrrrrrr")
									layer.close(layer.index-1); // 它获取的始终是最新弹出的某个层，值是由layer内部动态递增计算的
							       break;
							     case 'session_null':
							       layer.msg('未登录！',{icon: 7},{
				                        offset:['40%'],
				                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
				                  });
							       break;  
							     default:
							     layer.msg('评论出现异常！',{icon: 5},{
				                        offset:['40%'],
				                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
				                  });
							       break;
						   }
						}, function(err) {
							// 处理失败的结果
							 layer.msg('获取个人动态信息失败！',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						})
					}else{
						layer.msg('评论内容不能为空！',{icon: 7},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					}
				},
				// 打开模态框
				open_register : function() {
					// $("[name='testname']").val("xxxxxxxxxxxxxxx");//向模态框中赋值
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '500px', '450px' ],// 定义宽和高
							title : '欢迎加入',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#registerBox')
						// 打开的内容
						});
					})
				},
				// 判断点赞
				judge_great : function(postId){
					postId = vm.pass_postId
					var url = '/tbxt/greatJudge';
// console.log("judge_great.点赞id==="+postId);
					var data = {
						'postId': postId,
					}
					this.$http.post(url, data,{
						emulateJSON : true
					}).then(function(res) {
// console.log("成功进入点赞判断逻辑");
						 switch(res.body){
						     case 'great_0':
						       document.getElementById("great_icon_jb").style.color="#999999"; 
						       this.$options.methods.great_add(postId);
						       layer.msg('点赞成功!',{icon: 1},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
						     case 'great_1':
						       document.getElementById("great_icon_jb").style.color="#009688";
						       this.$options.methods.great_del(postId);
						       layer.msg('取消点赞!！',{icon: 1},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
						     case 'session_null':
						       layer.msg('账号检测请登录!',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
						     default:
						     layer.msg('数据异常!',{icon: 5},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('数据异常!',{icon: 5},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					})
				},
				// 点赞
				great_add : function(postId){
					var url = '/tbxt/greatAdd';
// console.log("click_great点赞id==="+postId);
					var data = {
							'postId': postId,
					}
					vm.$http.post(url, data,{
						emulateJSON : true
					}).then(function(res) {
						 switch(res.body){
						     case 'great_add':
						    	 var url2 = '/tbxt/GetgreatNum';
						    	 vm.$http.post(url2, data,{
										emulateJSON : true
									}).then(function(res) {
// console.log("二次异步得到点赞==="+JSON.stringify(res.body));
										document.getElementById("great_icon_jb").style.color="#009688";
										vm.great = res.body.post_greatList.length
									}, function(err) {
										// 处理失败的结果
// console.log(err)
										layer.msg('获取个人动态信息失败!',{icon: 7},{
					                        offset:['40%'],
					                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
					                  });
									})	 
						       break;
						     case 'session_null':
						       layer.msg('未登录!',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
						     default:
						     layer.msg('数据异常!',{icon: 5},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						 layer.msg('获取个人动态信息失败!',{icon: 7},{
		                        offset:['40%'],
		                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		                  });
					})	
				},
				// 取消点赞
				great_del : function(postId){
					var url = '/tbxt/greatDel';
// console.log("click_great点赞id==="+postId);
					var data = {
							'postId': postId,
					}
					vm.$http.post(url, data,{
						emulateJSON : true
					}).then(function(res) {
						 switch(res.body){
						     case 'great_del':
						    	 var url2 = '/tbxt/GetgreatNum';
						    	 vm.$http.post(url2, data,{
										emulateJSON : true
									}).then(function(res) {
// console.log("二次异步得到点赞==="+JSON.stringify(res.body));
										document.getElementById("great_icon_jb").style.color="#999999";
										if(res.body == null || res.body == 'null'){
											vm.great = '0'
										}else{
											vm.great = res.body.post_greatList.length
										}
									}, function(err) {
										// 处理失败的结果
// console.log(err)
										layer.msg('获取个人动态信息失败!',{icon: 7},{
					                        offset:['40%'],
					                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
					                  });
									})	 
						       break;
						     case 'del_error':
						       layer.msg('点赞异常!',{icon: 5},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						       break; 
						     default:
						       break;
					   }
					}, function(err) {
						// 处理失败的结果
// console.log(err)
						layer.msg('获取个人动态信息失败',{icon: 7},{
	                        offset:['40%'],
	                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
	                  });
					})	
				},
				searchBar : function(){
// console.log(vm.seacherBarName);
					var data = {
						'barName':vm.seacherBarName
					}
					var url = '/tbxt/queryBarByName'
					this.$http.post(url, data,{
						emulateJSON : true
					}).then(function(res) {
// console.log(res.body);
						if(res.body != ''){
								sessionStorage.setItem('barId',res.body.barId); // 存入一个值
								setTimeout(function() {
									location.href="/tbxt/barExtend.html"
								}, 50);
							}else{
							 layer.msg('暂无该贴吧信息！',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
							}
						}, function(err) {
							// 处理失败的结果
							 layer.msg('获取个人动态信息失败！',{icon: 7},{
			                        offset:['40%'],
			                        time: 1000 // 2秒关闭（如果不配置，默认是3秒）
			                  });
						})
				},
				// 删除评论
				deleteTopic : function(topicId){
					layer.confirm('确认删除该条评论？', {
		  				  btn: ['确定', '取消'] // 可以无限个按钮
		  				,yes: function(index, layero){
		  				    // 按钮【按钮一】的回调
		  					var url2 = '/tbxt/deleteTopic';
		  					var data = {
		  							'topicId': topicId
		  					}
		  					vm.$http.post(url2, data,{
		  						emulateJSON : true
		  					}).then(function(res) {
		  						if(res.bodyText == 'success'){
		  							layer.msg('删除成功!',{icon: 1},{
		  	  		                    offset:['40%'],
		  	  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		  	  		              }); 
		  							var postid = sessionStorage.getItem('toPost'); // 存入一个值
		  							var data = {
		  									'postId': postid
		  							}
		  							var url = '/tbxt/GetpostByPostId';
		  							vm.$http.post(url,data,{
		  								emulateJSON : true,
		  							}).then(function(res) {
		  								vm.postList = res.body
		  								if(res.body.DTOreaded != null){
		  									vm.readed = res.body.DTOreaded.countRead
		  								}else{
		  									vm.readed = '0'
		  								}
		  								if(res.body.DTOgreat == null){
		  									vm.great = '0'
		  								}else{
		  									vm.great = res.body.DTOgreat.post_greatList.length
		  								}
		  								if(res.body.DTOBarAndPic.post_pictureList != null){
		  									vm.pictureList = res.body.DTOBarAndPic.post_pictureList
		  								}
		  								if(res.body.DTOtopic != null){
		  									vm.post_topicList = res.body.DTOtopic.post_topicList;
		  									$("#comments_shafa").hide();
		  								}else{
		  									vm.post_topicList=false;
		  								}
		  								vm.pass_postId = postid;
		  								if(res.body.judgePostUser == 1){
		  									setTimeout(function(){
		  									$('.delTopic').show();
		  								}, 10);
		  								}
		  							}, function(err) {
		  								// 处理失败的结果
// console.log(err)
		  								layer.msg('获取帖子动态信息失败!',{icon: 5},{
		  				                    offset:['40%'],
		  				                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		  				              }); 
		  							})	
		  							
		  							
		  						}else{
		  							layer.msg('数据异常!',{icon: 1},{
		  	  		                    offset:['40%'],
		  	  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		  	  		              }); 
		  						}
		  					}, function(err) {
		  						// 处理失败的结果
		  						layer.msg('数据异常!',{icon: 7},{
		  		                    offset:['40%'],
		  		                    time: 1000 // 2秒关闭（如果不配置，默认是3秒）
		  		              }); 
		  					})
		  					
		  				  }
		  				  ,btn2: function(index, layero){
		  				    // 按钮【按钮三】的回调
		  					  layer.close(index)
		  				  }
		  				});
				},
			}
		})

layui.use('layedit', function() {
	var layedit = layui.layedit;
	layedit.build('comments_textarea2'); // 建立编辑器,使v-model失效,暂时不用
});

layui.use([ 'carousel', 'form' ], function() {
	var carousel = layui.carousel;
	var form = layui.form;

	// 常规轮播
	carousel.render({
		elem : '#rec_left',
		arrow : 'always',
		width : '680px',
		height : '208px',
		full : false,
		anim : 'fade',
		overflow : 'visible',
	});
})
layui.use('element', function() {
	var element = layui.element; // 导航的hover效果、二级菜单等功能，需要依赖element模块
	// 监听导航点击
	element.on('nav(demo)', function(elem) {
		// console.log(elem)
		layer.msg(elem.text());
	});
});

// 发表帖子加图片
// 发帖上传图片事件
$('#photo_xx1').click(function(){
	 $('#file1').click();
});$('#photo_xx2').click(function(){
	 $('#file2').click();
});$('#photo_xx3').click(function(){
	 $('#file3').click();
});$('#photo_xx4').click(function(){
	 $('#file4').click();
});$('#photo_xx5').click(function(){
	 $('#file5').click();
});$('#photo_xx6').click(function(){
	 $('#file6').click();
});$('#photo_xx7').click(function(){
	 $('#file7').click();
});$('#photo_xx8').click(function(){
	 $('#file8').click();
});$('#photo_xx9').click(function(){
	 $('#file9').click();
});

$('#file1').on('change', function (e) {
	var file1 = document.getElementById("file1")
	if(file1.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file1.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx1').src=this.result;}
	}
})
$('#file2').on('change', function (e) {
	var file2 = document.getElementById("file2")
	if(file2.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file2.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx2').src=this.result;}
	}
})
$('#file3').on('change', function (e) {
	var file3 = document.getElementById("file3")
	if(file3.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file3.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx3').src=this.result;}
	}
})
$('#file4').on('change', function (e) {
	var file4 = document.getElementById("file4")
	if(file4.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file4.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx4').src=this.result;}
	}
})
$('#file5').on('change', function (e) {
	var file5 = document.getElementById("file5")
	if(file5.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file5.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx5').src=this.result;}
	}
})
$('#file6').on('change', function (e) {
	var file6 = document.getElementById("file6")
	if(file6.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file6.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx6').src=this.result;}
	}
})
$('#file7').on('change', function (e) {
	var file7 = document.getElementById("file7")
	if(file7.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file7.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx7').src=this.result;}
	}
})
$('#file8').on('change', function (e) {
	var file8 = document.getElementById("file8")
	if(file8.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file8.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx8').src=this.result;}
	}
})
$('#file9').on('change', function (e) {
	var file9 = document.getElementById("file9")
	if(file9.files[0]!=null){
		var reader = new FileReader();
	    // 将文件以二进制形式进行读入页面
		reader.readAsDataURL(file9.files[0]);
		reader.onload=function (e) {
		document.getElementById('photo_xx9').src=this.result;}
	}
})


