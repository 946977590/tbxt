//头部导航栏组件
var toplable_component = Vue.extend({
	props: ['content', 'index'],
	template : '<li class="layui-nav-item"><a href="">{{content}} </a> </li>'
})
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
					console.log(JSON.stringify(res.body));
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

var post_view_component = Vue.extend({
	template:`<div class="right-sec_tiezi_info">
						<a href="" class="right-sec_tieba_name"
							style="font-size: 20px; float: left; margin-left: 20px;">萍院吧</a>
						<br />
						<br />
						<a href="" class="right-sec_tiezi_title"
							style="font-size: 15px; float: left;; margin-left: 20px; color: #009688;">如果给你一个选择，
							让你花费你现在所有积蓄回到5年前，...</a> <br />
						<br />
						<div class="right-sec_tiezi_content">
							<a href=""
								style="font-size: 13px; float: left; display: inline; margin-left: 20px; color: #8D8D8D">这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容....</a>
						</div>
						<div class="right-sec_tiezi_photo_box">
							<img class="right-sec_tiezi_photo" src="img/pxxylogo.jpg" />
						</div>
					</div>
					<div class="right-sec_tiezi_author_info_box">
						<div class="right-sec_tiezi_author_info" style="color: #C2C2C2;">
							<a class="layui-icon layui-icon-username"
								style="font-size: 14px;">牛牛</a> <a
								class="layui-icon layui-icon-tree" style="font-size: 14px;">2018.9.18</a>
						</div>
					</div>`,
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
	
Vue.component('toplable_a',toplable_component)
Vue.component('sjx_post_component',sjx_post_component)
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
				creat_tie_content :'',
				creat_tie_title :'',
				registerBox_userNickname : '',
				registerBox_userEmail : '',
				registerBox_userPassword : '',
				loginBox_userEmail : '',
				loginBox_userPassword : '',
				reday:false,
			},
//			 components: {
//				 'sjx_post_component':sjx_post_component
//				  },
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
				// 打开帖子
				open_tiezi : function() {
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
				//
				oo : function() {
					console.log("==9==1");
				},
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
				// 注册事件
				register_user : function() {
					console.log("1212121====");
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


