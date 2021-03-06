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
		<div><login_component /></div>
		

		<!-- ==========================注册页面模态框===================== -->
		<div><register_component /></div>

		<!-- ==========================发帖页面模态框===================== -->
		<div><creat_post_component /></div>

		<!-- ==========================个人信息页面模态框===================== -->
		 <div><myinfo_component /></div>
		

		<!-- ==========================评论区页面===================== -->
		<div><comment_component /></div>

		<!-- ==========================帖子页面===================== -->
		<div><post_layer_component /></div>

	</div>
	
	<script type="text/javascript" src="${path}js/toastr.js"></script>
	<script src="${path}js/index.js"></script>
</body>
</html>
