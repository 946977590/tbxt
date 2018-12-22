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
<title>吧内详情</title>
<link rel="stylesheet" href="${path}css/index.css" />
<link rel="stylesheet" href="${path}layui/css/layui.css" />
<link rel="stylesheet" href="${path}css/blog.css">
<link rel="stylesheet" href="${path}css/toastr.css">
<script src="${path}js/vue.min.js"></script>
<script src="${path}js/vue-resource.js"></script>
<script src="${path}layui/layui.js"></script>
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
							class="layui-nav-img">{{userInfo.userNickname}}</a>
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
					<li class="layui-nav-item" ><a href="javascript:;"  style="font-size: 20px;float:right;margin-right: 30px;" class="layui-icon layui-icon-flag">最左社区</a></li>
					<li class="layui-nav-item" style="float:right;margin-right: 40px;"><a href="javascript:;"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-edit" @click="open_fatie">发帖</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="javascript:;"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-search">寻吧</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="javascript:;"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-log" @click="open_myinfozx">我的动态</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="tieba.jsp"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-link">最左首页</a></li>
				</ul>
			</div>
		</div>
	</div>
		
		<!-- ====================================top_box===================================== -->
		<div id="head_inner">
			<div class="seacher_logo">
				<span id="zuizuo">最左</span><i id="seacheRlogo" class="layui-icon layui-icon-user">拉近你我</i>
			</div>
			<div class="seacher_ipt">
				<input type="text" placeholder="搜你所想" class="layui-input">
			</div>
			<div class="seacher_btn">
				<button class="layui-btn layui-btn-normal">进入贴吧</button>
			</div>
			<div class="seacher_btn_post">
				<button class="layui-btn layui-btn-primary">创建贴吧</button>
			</div>
		</div>
		
		
		<div id="rec">
			<div id="rec_left" class="layui-carousel" lay-filter="test1">
				<div carousel-item="">
					<div>
						<img src="${path}img/pxxylogo.jpg"
							style="width: 100%; height: 100%;" />
					</div>
					<div>
						<img src="${path}img/432.jpg" style="width: 100%; height: 100%;" />
					</div>
					<div>
						<img src="${path}img/pxxylogo.jpg"
							style="width: 100%; height: 100%;" />
					</div>
					<div>
						<img src="${path}img/432.jpg" style="width: 100%; height: 100%;" />
					</div>
					<div>
						<img src="${path}img/pxxylogo.jpg"
							style="width: 100%; height: 100%;" />
					</div>
				</div>
			</div>
			<div id="rec_right">
				<img class="barPic" alt="" src="http://localhost:8080/tbxt/IoReadImage?pictureName=c38ce30c-aaa6-49b3-88f5-16ec798977f92015021114290564.jpg">
			</div>
		</div>

		<div id="sec">

			<!-- =====================中间部分===============================-->
			<div class="bar_right-sec">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 10px; margin-left: 20px; width: 76s0px;">
					<legend>吧内动态</legend>
				</fieldset>
				<div class="right-sec_tiezi_barinfo">
					<div class="loading_icon">
					<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop layui-icon-loading" style="display:inline-block"></i>
						<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="display:inline-block"></i>
					</div>
					<component1 /> 
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
		<div id="comments_Box" style="display: none;">
			<div class="comments-form" action="">
				<div class="layui-form-item layui-form-text"
					style="background-color: #FFFFFF">
					<textarea placeholder="发贴记得遵守贴吧相关规则奥~" id="comments_textarea"
							v-model="comments_topicContent" class="layui-textarea"></textarea>
				</div>
				<button id="btn_comments_tj" @click="tijiao_comments_click" class="layui-btn">提交</button>
			</div>
		</div>

		<!-- ==========================帖子layer页面===================== -->
		<div>
			<div class="lay-blog" id="tiezi_Box" style="display: none;" >
				<div class="loading_icon">
						<i class="layui-icon layui-icon-loading"></i>
				</div>
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
								<p class="comment_title">{{postList.DTOBarAndPic.post.postTitle}}</p>
								<p class="comment_content">{{postList.DTOBarAndPic.post.postContent}}</p>
								<img v-for="item in pictureList" :key="item" :src=" 'http://localhost:8080/tbxt/IoReadImage?pictureName='+item.pictureName " 
								style="width: 200px;padding:5px; height: 130px;float: left;margin-left: 1px;"
									alt=""> 
								<div class="count layui-clear">
									<span class="pull-left">阅读 <em>{{readed}}</em></span> <span
										class="pull-right like"><i class="layui-icon layui-icon-praise" @click="judge_great" id="great_icon_jb"></i><em v-if="great">{{great}}</em></span>
								</div>
							</div>
						</div>
						<a name="comment"> </a>
						<div class="comt layui-clear">
							<a href="javascript:;" class="pull-left">评论</a> <a
								href="javascript:;" v-on:click="" class="pull-right"  @click="open_comment_w">写评论</a>
						</div>
						<div id="comments_shafa">
								<i class="layui-icon layui-icon-reply-fill" style="font-size: 25px;color: rgb(153, 153, 153);">目前还没人评论哟，快来抢沙发~</i>
						</div>
						<div id="LAY-msg-box" v-if="post_topicList">
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
	</div>
	</div>
	</div>
	<script type="text/javascript" src="${path}js/toastr.js"></script>
	<script src="${path}js/index.js"></script>
</body>
</html>

