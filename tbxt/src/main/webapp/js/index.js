  //准备一个空的实例对象
  var Event = new Vue();
//头部导航栏组件
var toplable_component = Vue.extend({
	props: ['content', 'index'],
	template : '<li class="layui-nav-item"><a href="">{{content}} </a> </li>'
})

//个人动态时间线
var sjx_post_component = Vue.extend({
	template:`<ul class="layui-timeline">
	<li class="layui-timeline-item" v-for="item in list" :key="item">
	<i class="layui-icon layui-timeline-axis"></i>
	<div class="layui-timeline-content layui-text">
	<div class="layui-timeline-title">{{item.postCreattime}} {{item.postTitle}}</div>
	</div>
	</li></ul>`,
	data(){
	      return {
	        list:'',
	      }
	    },
  mounted(){
        	var url = 'http://localhost:8080/tbxt/GetpostByuserId';
			this.$http.post(url, {
				emulateJSON : true
			}).then(function(res) {
				if(res.body=='Getpost_error'){
					toastr.error("获取个人动态信息失败!");
				}else{
					this.list = res.body.postList
//					console.log(JSON.stringify(res.body));
				} 
			}, function(err) {
				// 处理失败的结果
				console.log(err)
				toastr.error("获取个人动态信息失败!");
			})	
        },
        methods:{
        }
})
//首页中间部分帖子预览展示
var post_view_component = Vue.extend({
	template:`
		<div class="right-sec_tiezi_info">
			<a href="" class="right-sec_tieba_name"
				style="font-size: 20px; float: left; margin-left: 20px;" v-if="list">{{list.post_bar.barName}}</a>
			<br />
			<br />
			<a href="javascript:;" class="right-sec_tiezi_title"
				style="font-size: 15px; float: left;; margin-left: 20px; color: #009688;" v-on:click="open_tiezi(list.post.postId)" v-if="list">{{list.post.postTitle}}</a> <br />
			<br />
			<div class="right-sec_tiezi_content">
				<a href=""
					style="font-size: 13px; float: left; display: inline; margin-left: 20px; color: #8D8D8D" v-if="list">{{list.post.postContent}}</a>
			</div>
			<div class="right-sec_tiezi_photo_box" v-if="list">
				<img class="right-sec_tiezi_photo" v-for="item in pictureList" :key="item" :src=" 'http://localhost:8080/tbxt/IoReadImage?pictureName='+item.pictureName " />
			</div>
		</div>
		<div class="right-sec_tiezi_author_info_box">
			<div class="right-sec_tiezi_author_info" style="color: #C2C2C2;">
				<a class="layui-icon layui-icon-username"
					style="font-size: 14px;" v-if="list">{{list.post.postAuthor}}</a> <a
					class="layui-icon layui-icon-tree" style="font-size: 14px;" v-if="list">{{post_data}}</a>
			</div>
		</div>
	`,
		data(){
		      return {
		        list:'',
		        post_data:'',
		        postid:''
		      }
		    },
	  created(){
	        	var url = 'http://localhost:8080/tbxt/GetpostViewByTest';
				this.$http.post(url, {
					emulateJSON : true
				}).then(function(res) {
					if(res.body=='Getpost_error'){
						toastr.error("获取个人动态信息失败!");
					}else{
//						console.log("中间帖子预览"+JSON.stringify(res.body));
						this.list = res.body;
						this.pictureList = res.body.post_pictureList;
//						console.log(JSON.stringify(this.list));
						this.post_data = this.list.post.postCreattime.substr(0,this.list.post.postCreattime.length-8);
//						console.log("this.post_data=="+this.pictureList[0].pictureName);
					} 
				}, function(err) {
					// 处理失败的结果
					console.log(err)
					toastr.error("获取个人动态信息失败!");
				})	
	        },
	        methods:{
	        	// 打开帖子
				open_tiezi : function(postid) {
					this.postid = postid;
					console.log("获取的帖子id是==="+this.postid)
					Event.$emit('postid',this.postid)
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
	        }
	})
	
//帖子Layer页面
	var post_layer_component = Vue.extend({
		template:`
		<div v-if="postList">
			<div class="lay-blog" id="tiezi_Box" style="display: none;" >
			<div class="container-wrap">
				<div class="container container-message container-details">
					<div class="contar-wrap">
						<div class="item">
							<div class="item-box  layer-photos-demo1 layer-photos-demo">
								<div class="layui-input-block" id="user_post_img">
									<img class="info-img" src="img/psb.jpg" style="float: left;"
										alt="">
									<h5 style="text-align: left;">
										<span>{{postList.DTOBarAndPic.post.postAuthor}}</span>
									</h5>
									<h5 style="text-align: left;">
										发布于：<span>{{postList.DTOBarAndPic.post.postCreattime}}</span>
									</h5>
								</div>
								<p class="comment_content">{{postList.DTOBarAndPic.post.postContent}}</p>
								<img v-for="item in pictureList" :key="item" :src=" 'http://localhost:8080/tbxt/IoReadImage?pictureName='+item.pictureName " 
								style="width: 200px;padding:5px; height: 130px;float: left;margin-left: 1px;"
									alt=""> 
								<div class="count layui-clear">
									<span class="pull-left">阅读 <em>{{readed}}</em></span> <span
										class="pull-right like"><i
										class="layui-icon layui-icon-praise"></i><em>{{great}}</em></span>
								</div>
							</div>
						</div>
						<a name="comment"> </a>
						<div class="comt layui-clear">
							<a href="javascript:;" class="pull-left">评论</a> <a
								href="javascript:;" v-on:click="open_comment_w" class="pull-right">写评论</a>
						</div>
						<div id="LAY-msg-box">
							<div class="info-item" v-for="item in post_topicList" :key="item">
								<img class="info-img" src="img/psb.jpg" alt="">
								<div class="info-text">
									<p class="title count">
										<span class="name">{{item.userId}}</span> <span class="info-img like"><i
											class="layui-icon layui-icon-praise"></i>5.8万</span>
									</p>
									<p class="info-intr">{{item.topicContent}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		`,
		data(){
			return {
				postList:'',
		        readed:'',
		        great:'',
		        pictureList:'',
		        data2:'',
		        postid:''
		      }
		},
		mounted(){
			Event.$on('postid', function (data2) {
		        this.postid = data2;
	        })
	        console.log("this.data2=================="+postid);
			var data = {
					'postId':'7eff2242-a10c-4300-b6fa-764868dcf35f' 
			}
			var url = 'http://localhost:8080/tbxt/GetpostByPostId';
			this.$http.post(url,data,{
				emulateJSON : true,
			}).then(function(res) {
				this.postList = res.body
				this.readed = res.body.DTOreaded.post_readedList.length
				this.great = res.body.DTOgreat.post_greatList.length
				this.pictureList = res.body.DTOBarAndPic.post_pictureList
				this.post_topicList = res.body.DTOtopic.post_topicList;
//				console.log("postList=="+JSON.stringify(this.postList))
//				console.log("2=="+JSON.stringify(this.readed))
//				console.log("3=="+JSON.stringify(this.great))
//				console.log("4=="+JSON.stringify(this.pictureList))
//				console.log("5=="+JSON.stringify(this.post_topicList))
			}, function(err) {
				// 处理失败的结果
				console.log(err)
				toastr.error("获取帖子动态信息失败!");
			})	
		},
		methods:{
			// 打开评论框
			open_comment_w : function() {
				layui.use([ 'layer' ], function() {
					var layer = layui.layer, $ = layui.$;
					layer.open({
						type : 1,// 类型
						area : [ '1000px', '550px' ],// 定义宽和高
						title : '评论界面',// 题目
						shadeClose : false,// 点击遮罩层关闭
						content : $('#comments_Box')
					// 打开的内容
					});
				})
			},
		}
	})
//评论区Layer
	var comment_component = Vue.extend({
	template:`
		<div id="comments_Box" style="display: none;">
			<form class="layui-form" action="">
				<div class="layui-form-item layui-form-text"
					style="background-color: #FFFFFF">
					<textarea id="comments_textarea" placeholder="写点什么啊"></textarea>
				</div>
				<button id="btn_comments_tj" v-on:click="" class="layui-btn">提交</button>
			</form>
		</div>
	`,
	data(){
	      return {
	      }
	    },
  mounted(){
        },
        methods:{
        }
})
//个人信息页面Layer
	var myinfo_component = Vue.extend({
	template:`<div id="my_info_Box" style="display: none;">
			<form class="layui-form" action="">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 20px; margin-left: 90px; width: 800px;">
					<legend>展示自我</legend>
				</fieldset>
				<div class="layui-form-item">
					<label class="layui-form-label">用户名</label>
					<div class="layui-input-block">
						<input type="text" name="my_info_user_name" id="my_info_user_name"
							lay-verify="title" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">邮箱</label>
					<div class="layui-input-block">
						<input type="text" name="my_info_user_email"
							id="my_info_user_email" lay-verify="required" autocomplete="off"
							class="layui-input">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">性别</label>
					<div class="layui-input-inline">
						<input type="radio" name="sex" value="男" title="男" checked="">
						<input type="radio" name="sex" value="女" title="女">
					</div>
				</div>

				<div class="layui-form-item">
					<label class="layui-form-label">会员等级</label>
					<div class="layui-input-block">
						<input type="text" name="my_info_user_level"
							id="my_info_user_level" lay-verify="required" autocomplete="off"
							class="layui-input">
					</div>
				</div>

				<div class="layui-form-item layui-form-text">
					<label class="layui-form-label">个性说明</label>
					<div class="layui-input-block">
						<textarea placeholder="写点什么介绍介绍自己吧~" id="my_info_gexing_textarea"
							class="layui-textarea"></textarea>
					</div>
				</div>

				<div class="layui-form-item">
					<div class="layui-input-block">
						<button id="btn_bc" class="layui-btn" lay-submit=""
							lay-filter="demo1">保存修改</button>
					</div>
				</div>

			</form>
		</div>`,
	data(){
	      return {
	      }
	    },
  mounted(){
        },
        methods:{
        	
        }
})
//发帖页面Layer
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
				<div class="layui-form-item">
					<label class="layui-form-label">取个标题吧</label>
					<div class="layui-input-block">
						<input type="text" id="fatie_title" v-model="creat_tie_title"
							lay-verify="title" autocomplete="off" class="layui-input">
					</div>
				</div>

				<div class="layui-form-item layui-form-text">
					<label class="layui-form-label"></label>
					<div class="layui-input-block" style="width: 660px;">
						<textarea placeholder="发贴记得遵守贴吧相关规则奥~" id="fatie_textarea"
							v-model="creat_tie_content" class="layui-textarea"></textarea>
					</div>
				</div>
			</div>

			<div class="fatie_right">
				<div class="fatie_photo_box" id="fatie_photo_box">
					<input type="file" id="file1" name="file1"  style="display: none">
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
	      }
	    },
  mounted(){
        },
        methods:{
        	//发帖
			tie_creat: function(){
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
				formData.append('postTitle', this.creat_tie_title);
				formData.append('postContent', this.creat_tie_content);
				console.log("file1.files[0]=="+file1.files[0]);
				console.log("file1.files[1]=="+file2.files[0]);
				formData.append('files', file1.files[0]);
				formData.append('files', file2.files[0]);
				formData.append('files', file3.files[0]);
				formData.append('files', file4.files[0]);
				formData.append('files', file5.files[0]);
				formData.append('files', file6.files[0]);
				formData.append('files', file7.files[0]);
				formData.append('files', file8.files[0]);
				formData.append('files', file9.files[0]);
				var url = 'http://localhost:8080/tbxt/postCreat';
				this.$http.post(url, formData, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					console.log(res.body)
					if(res.body=='success'){
						toastr.success("发帖成功!");
						/*setTimeout(function(){
							location.href="/tbxt/tieba.jsp";
						},1000);*/
					}else if(res.body=='sessionError'){
						toastr.error("未登录状态!");
					}else{
						toastr.error("发帖出现错误!");
					}
				}, function(err) {
					// 处理失败的结果
					console.log(err)
					toastr.error("登陆失败!");
				})
				
			},
        }
})
//注册页面Layer
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
						autocomplete="off" placeholder="请设置用户名" class="layui-input">
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
						placeholder="请设置登陆密码" autocomplete="off" class="layui-input">
				</div>
				<div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>
			</div>

			<div class="layui-form-item">
				<label class="layui-form-label">验证码</label>
				<div class="layui-input-inline">
					<input type="text" name="verifiy_code" id="verifiy_code"
						lay-verify="required" placeholder="请输入验证码" autocomplete="off"
						class="layui-input">
				</div>
				<button class="layui-btn layui-btn-primary ">获取验证码</button>
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
	      }
	    },
  mounted(){
        },
        methods:{
        	// 注册事件
			register_user : function() {
				var data = {
					userNickname : this.registerBox_userNickname,
					userEmail : this.registerBox_userEmail,
					userPassword : this.registerBox_userPassword
				};
				var url = 'http://localhost:8080/tbxt/register';
				console.log("====");
				console.log("userNickname" + this.registerBox_userNickname
						+ "userEmail" + this.registerBox_userEmail
						+ "userPassword" + this.registerBox_userPassword);
				this.$http.post(url, data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					console.log(res.body)
					if(res.body=='register_success'){
						toastr.success("注册成功!");
						setTimeout(function(){
							location.href="/tbxt/tieba.jsp";
						},1000);
					}else{
						toastr.error("注册失败!");
					}
				}, function(err) {
					// 处理失败的结果
					console.log(err)
					toastr.error("注册失败!");
				})

			},
        }
})
//登陆页面Layer
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
					<input type="text" v-model="loginBox_userPassword" id="user_email"
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
        	//登陆事件
			login_user : function() {
				console.log("执行登陆事件");
				var data = {
					userEmail : this.loginBox_userEmail,
					userPassword : this.loginBox_userPassword
				};
				var url = 'http://localhost:8080/tbxt/login';
				this.$http.post(url, data, {
					emulateJSON : true
				}).then(function(res) {
					// 处理成功的结果
					console.log(res.body)
					if(res.body=='loginSuccess'){
						toastr.success("登陆成功!");
						setTimeout(function(){
							location.href="/tbxt/tieba.jsp";
						},1000);
					}else{
						toastr.error("邮箱或者密码错误!");
					}
				}, function(err) {
					// 处理失败的结果
					console.log(err)
					toastr.error("登陆失败!");
				})

			},
        }
})
Vue.component('toplable_a',toplable_component)
Vue.component('sjx_post_component',sjx_post_component)
Vue.component('comment_component',comment_component)
Vue.component('myinfo_component',myinfo_component)
Vue.component('creat_post_component',creat_post_component)
Vue.component('register_component',register_component)
Vue.component('login_component',login_component)

// 1.创建一个组件构造器
var vm = new Vue(
		{
			el : '#mainIndex',
			data : {
				userNickname : '',
				toplable_list : [ '网页', '新闻', '贴吧', '知道', '视频', '音乐', '图片',
						'地图', '文库' ],
				sjx_postList :[],
				register_result : null,
			},
		 components: {
				 'post_view_component':post_view_component,
				 'post_layer_component':post_layer_component,
				  },
			//vue载入后执行获取session方法
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
			        		  that.userNickname = data;
			        	  }else{
			        		  that.userNickname = '未登录'
			        	  }
			          }
			        })
			      })
			    },
			methods : {
				//打开登陆模态框
				open_login : function(){
					layui.use(['layer'],function () {
						var layer = layui.layer,$=layui.$;
						layer.open({
								type:1,//类型
								area:['500px','360px'],//定义宽和高
								title:'账号登陆',//题目
								shadeClose:false,//点击遮罩层关闭
								content: $('#loginBox')//打开的内容
						});
					})
				},
				// 打开个人信息页面
				open_my_info : function() {
					layui.use([ 'layer' ], function() {
						var layer = layui.layer, $ = layui.$;
						layer.open({
							type : 1,// 类型
							area : [ '1000px', '550px' ],// 定义宽和高
							title : '个人信息',// 题目
							shadeClose : false,// 点击遮罩层关闭
							content : $('#my_info_Box')
						// 打开的内容
						});
					})
				},
				//注销用户
				logout : function(){
					var url = '/tbxt/logout';
					this.$http.post(url).then(function(res) {
						// 处理成功的结果
						console.log("注销==="+res.body)
						if(res.body=='logoutSuccess'){
							toastr.success("成功退出!");
							setTimeout(function(){
								location.href="/tbxt/tieba.jsp";
							},1000);
						}else{
							toastr.error("退出异常!");
						}
						

					}, function(err) {
						// 处理失败的结果
						console.log(err)
						toastr.error("退出异常!");
					})
				},
				//打开发帖页面
				open_fatie:function(){
					layui.use(['layer'],function () {
							var layer = layui.layer,$=layui.$;
							layer.open({
									type:1,//类型
									area:['1330px','600px'],//定义宽和高
									title:'发表新帖',//题目
									shadeClose:false,//点击遮罩层关闭
									content: $('#fatie_Box')//打开的内容
							});
					})
				},
				// 打开注册模态框
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
				
			}
		})

layui.use('layedit', function() {
	var layedit = layui.layedit;
	layedit.build('comments_textarea'); // 建立编辑器
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

	//监听导航点击
	element.on('nav(demo)', function(elem) {
		//console.log(elem)
		layer.msg(elem.text());
	});
});

//发表帖子加图片
//发帖上传图片事件 
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


