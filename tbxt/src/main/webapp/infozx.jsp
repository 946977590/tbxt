<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("path", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>最左——个人信息社区中心</title>
<link rel="stylesheet" href="${path}layui/css/layui.css" />
<link rel="stylesheet" href="${path}css/index.css?v=1" />
<link rel="stylesheet" href="${path}css/blog.css">
<link rel="stylesheet" href="${path}css/toastr.css">
<script src="${path}layui/layui.js"></script>
<script src="${path}js/vue.min.js"></script>
<script src="${path}js/vue-resource.js"></script>
<script src="${path}js/jquery-3.1.1.min.js"></script>
</head>
<body>
	<div id="mainIndex">
		<div id="fu_top_box">
		<div id="top_box">
			<div class="top_userBar">
				<ul class="layui-nav layui-bg-green">
					<li class="layui-nav-item" id="message-info"><a href="infozx.jsp">信息中心<span
							class="layui-badge-dot"></span></a></li>
					<li class="layui-nav-item" id="my-info" lay-unselect=""><a
						href="javascript:;"><img src="${path}img/psb.jpg"
							class="layui-nav-img">{{userNickname}}</a>
						<dl class="layui-nav-child">
							<dd>
								<a href="javascript:;" @click="open_login">立即登陆</a>
							</dd>
							<dd>
								<a href="javascript:;" @click="open_fatie">发帖</a>
							</dd>
							<dd>
								<a href="javascript:;" @click="open_my_info">修改信息</a>
							</dd>
							<dd>
								<a href="javascript:;" @click="open_tiezi">查看帖子</a>
							</dd>
							<dd>
								<a href="javascript:;" @click="open_register">注册新账号</a>
							</dd>
							<dd>
								<a href="javascript:;" @click="logout">退了</a>
							</dd>
						</dl></li>
				</ul>
			</div>

			<div class="top_lable">
				<ul class="layui-nav layui-bg-green">
					<!-- <toplable_a v-for="(item,index) of toplable_list" :key="index"
						:content="item" :index="index"> </toplable_a> -->
					<li class="layui-nav-item" ><a href="javascript:;"  style="font-size: 20px;float:right;margin-right: 30px;" class="layui-icon layui-icon-female">最左社区</a></li>
					<li class="layui-nav-item" style="float:right;margin-right: 40px;"><a href="javascript:;"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-edit" @click="open_fatie">发帖</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="javascript:;"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-search">寻吧</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="infozx.jsp"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-log">我的动态</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="tieba.jsp"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-link">最左首页</a></li>
				</ul>
			</div>
		</div>
	</div>
		<!-- ====================================top_box===================================== -->
		<div id="tie_read_great">
			<button id="fatie_number1" class="layui-btn layui-btn-lg layui-btn-normal">
				<a id="great_icon" class="layui-icon layui-icon-edit">发帖</a>
				<br><span>1231</span>
			</button>	
			<button id="read_number1" class="layui-btn layui-btn-lg layui-btn-normal">
				<a id="great_icon" class="layui-icon layui-icon-star">已读</a>
				<br><span>1231</span>
			</button>	
				
			<button id="great_number1" class="layui-btn layui-btn-lg layui-btn-normal">
				<a id="great_icon" class="layui-icon layui-icon-praise">获赞</a>
				<br><span>1231</span>
			</button>
			
			
		</div>
		
		<div id="info_box">
			<div id="duanzi_sjx">
			<fieldset class="layui-elem-field layui-field-title"
				style="margin-top: 30px;">
				<legend>我的时间轴：记录每一刻</legend>
			</fieldset>
			<sjx_post_component />
			</div>
		
		<div id="grxx">
			<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 30px; margin-left: 90px; width: 400px;">
					<legend>我的大事件</legend>
				</fieldset>
				<ul class="layui-timeline">
				<li class="layui-timeline-item"><i
					class="layui-icon layui-timeline-axis"></i>
					<div class="layui-timeline-content layui-text">
						<div class="layui-timeline-title">2018年,天外飞牛用户加入最左,欢迎你成为我们大家庭的一份子</div>
					</div>
				</li>
				</ul>
				<div id="userimg">
					<img id="userimg_touxiang" src="img/psb.jpg"/>
					<a class="layui-icon layui-icon-username"style="font-size: 50px; color: #1E9FFF; float: left;margin-left: 25px; margin-top: 10px;"></a>
						<span style="color:#666;float: left;margin-left: 15px;margin-top: 10px;">{{userNickname}}<span><br><br>
						</span>会员等级:vip</span>
				</div>
		</div>
		</div>
		





		<!-- ==========================登陆页面模态框===================== -->
		<div id="loginBox" style="display: none;">
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
				<button class="layui-btn layui-btn-lg" @click="login_user">登陆</button>
				<button class="layui-btn layui-btn-lg">取消</button>
			</div>
		</div>

		<!-- ==========================注册页面模态框===================== -->
		<div id="registerBox" style="display: none;">
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
				<button class="layui-btn layui-btn-lg" @click="register_user">注册</button>
				<button class="layui-btn layui-btn-lg">取消</button>
			</div>
		</div>

		<!-- ==========================发帖页面模态框===================== -->
		<div id="fatie_Box" style="display: none;">
			<div class="layui-form-item">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 20px; margin-left: 90px; width: 800px;">
					<legend style="font-size: 15px;">
						发贴请遵守 <a href="" style="font-weight: bold">贴吧相关协议</a>
					</legend>
				</fieldset>

				<!-- <form action="/tbxt/springUpload" enctype="multipart/form-data"
					method="post">
					<table>
						<tr>
							<td>请选择文件：</td>
							<td><input type="file" id="file133" name="files"></td>
							<td><input type="file" name="files"></td>
						</tr>
						<tr>
							<td>开始上传</td>
							<td><input type="submit" value="上传"></td>
						</tr>
					</table>
				</form> -->

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
					<input type="file" id="file1" name="file1" style="display: none">
					<input type="file" id="file2" style="display: none"> <input
						type="file" id="file3" style="display: none"> <input
						type="file" id="file4" style="display: none"> <input
						type="file" id="file5" style="display: none"> <input
						type="file" id="file6" style="display: none"> <input
						type="file" id="file7" style="display: none"> <input
						type="file" id="file8" style="display: none"> <input
						type="file" id="file9" style="display: none">
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx1" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx2" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx3" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx4" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx5" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx6" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx7" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx8" src="img/sc.jpg">
					</div>
					<div class="fatie_photos">
						<img alt="点击上传图片" class="photo_xx" id="photo_xx9" src="img/sc.jpg">
					</div>
				</div>
			</div>


			<div class="layui-form-item">
				<div class="fatie_btn">
					<button class="layui-btn layui-btn-lg" @click="tie_creat">发布</button>
					<button class="layui-btn layui-btn-lg">取消</button>
				</div>
			</div>

		</div>

		<!-- ==========================个人信息页面模态框===================== -->
		<div id="my_info_Box" style="display: none;">
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
		</div>

		<!-- ==========================评论区页面===================== -->
		<div id="comments_Box" style="display: none;">
			<form class="layui-form" action="">
				<div class="layui-form-item layui-form-text"
					style="background-color: #FFFFFF">
					<textarea id="comments_textarea" placeholder="写点什么啊"></textarea>
				</div>
				<button id="btn_comments_tj" @click="oo" class="layui-btn">提交</button>
			</form>
		</div>

		<!-- ==========================帖子页面===================== -->
		<div class="lay-blog" id="tiezi_Box" style="display: none;">
			<div class="container-wrap">
				<div class="container container-message container-details">
					<div class="contar-wrap">
						<div class="item">
							<div class="item-box  layer-photos-demo1 layer-photos-demo">
								<div class="layui-input-block" id="user_post_img">
									<img class="info-img" src="img/疯狂动物城.jpg" style="float: left;"
										alt="">
									<h5 style="text-align: left;">
										<span>VIP用户</span>
									</h5>
									<h5 style="text-align: left;">
										发布于：<span>刚刚</span>
									</h5>
								</div>
								<p class="comment_content">父亲有双粗糙的大手掌，手把手教我走路、骑车，却会在该放手的时刻果断地放开让自己去大胆尝试，那个时候期望快快长大，能够做自己想做的事，不用受父亲的“控制”。父亲是智慧树，他无所不知、无所不晓，虽然你有十万个为什么，但是也难不倒他。</p>
								<img src="img/pxxylogo.jpg" style="width: 200px; height: 130px;"
									alt=""> <img src="img/pxxylogo.jpg"
									style="width: 200px; height: 130px;" alt=""> <img
									src="img/pxxylogo.jpg" style="width: 200px; height: 130px;"
									alt=""> <img src="img/pxxylogo.jpg"
									style="width: 200px; height: 130px;" alt=""> <img
									src="img/pxxylogo.jpg" style="width: 200px; height: 130px;"
									alt=""> <img src="img/pxxylogo.jpg"
									style="width: 200px; height: 130px;" alt=""> <img
									src="img/pxxylogo.jpg" style="width: 200px; height: 130px;"
									alt=""> <img src="img/pxxylogo.jpg"
									style="width: 200px; height: 130px;" alt=""> <img
									src="img/pxxylogo.jpg" style="width: 200px; height: 130px;"
									alt="">
								<div class="count layui-clear">
									<span class="pull-left">阅读 <em>100000+</em></span> <span
										class="pull-right like"><i
										class="layui-icon layui-icon-praise"></i><em>999</em></span>
								</div>
							</div>
						</div>
						<a name="comment"> </a>
						<div class="comt layui-clear">
							<a href="javascript:;" class="pull-left">评论</a> <a
								href="javascript:;" @click="open_comment_w" class="pull-right">写评论</a>
						</div>
						<div id="LAY-msg-box">
							<div class="info-item">
								<img class="info-img" src="img/疯狂动物城.jpg" alt="">
								<div class="info-text">
									<p class="title count">
										<span class="name">用户1</span> <span class="info-img like"><i
											class="layui-icon layui-icon-praise"></i>5.8万</span>
									</p>
									<p class="info-intr">这是条评论1</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	
	<script type="text/javascript" src="${path}js/toastr.js"></script>
	<script src="${path}js/index.js"></script>
</body>
</html>
