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
<title>最左——拉近你我</title>
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
					<li class="layui-nav-item" style="float:right;"><a href="infozx.jsp"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-log" >我的动态</a></li>
					<li class="layui-nav-item" style="float:right;"><a href="tieba.jsp"  style="font-size: 20px;margin-left: 50px;" class="layui-icon layui-icon-link">最左首页</a></li>
				</ul>
			</div>
		</div>
	</div>
		
		<!-- ====================================top_box===================================== -->
		<div id="head_inner">
			<div class="seacher_logo"></div>
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
			<div id="rec_right"></div>
		</div>

		<div id="sec">
			<div class="left-sec">
				<div id="my_tieba_box">
					<div id="my_tieba_mod">
						<fieldset class="layui-elem-field layui-field-title"
							style="margin-top: 10px; margin-left: 20px;">
							<legend>我在最左</legend>
						</fieldset>
						<img src="img/psb.jpg"
							style="width: 80px; height: 80px; float: left; margin-left: 10px; border-style: groove; border-color: #EFEFEF;" />
						<a class="layui-icon layui-icon-username"
							style="font-size: 30px; color: #1E9FFF; float: left; margin-left: 10px;"></a><span>{{userNickname}}</span>
						<br>
						<br> <br> <span>会员等级:vip</span>
					</div>
					<div id="like_tiebas">
						<div id="like_tiebas_titile_box">
							<div id="like_tiebas_titile">
								<span style="color: #8D8D8D;">爱逛的吧</span><a
									class="layui-icon layui-icon-set-fill" style="color: #8D8D8D;"></a>
							</div>
						</div>
						<div id="like_tiebas_content">
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">萍院吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
							<div class="tb_cate_boxs">
								<button class="layui-btn layui-btn-radius layui-btn-normal">李毅吧</button>
							</div>
						</div>
						<div>
							<i class="layui-icon layui-icon-more"
								style="font-size: 40px; color: #1E9FFF;"></i>
						</div>

					</div>
				</div>
				<div id="tieba_category_box">
					<div id="tieba_category_title">
						<fieldset class="layui-elem-field layui-field-title"
							style="margin-top: 20px; margin-left: 20px;">
							<legend style="font-weight: bold; font-size: small;">贴吧分类</legend>
						</fieldset>
					</div>
					<div id="tieba_category_content">
						<div id="movie_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-website" style="color: #1E9FFF;"></a><span>看电影</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="mingxing_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-rate-solid"
									style="color: #1E9FFF;"></a><span>娱乐明星</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="tiyu_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-group" style="color: #1E9FFF;"></a><span>体育</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="xiaoshuo_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-read" style="color: #1E9FFF;"></a><span>小说</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="zongyi_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-cellphone"
									style="color: #1E9FFF;"></a><span>爱综艺</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="dianshiju_cate">
							<div class="cate_titile">
								<a class="layui-icon layui-icon-template-1"
									style="color: #1E9FFF;"></a><span>追剧狂</span>
							</div>
							<br />
							<br />
							<div class="zi_cate_content">
								<a class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a> <a
									class="zi_cate_content_name">香港电影</a>
							</div>
						</div>
						<div id="cate_more">
							<button class="layui-btn layui-btn-lg layui-btn-normal">查看更多</button>
						</div>
					</div>
				</div>
			</div>

			<!-- =====================最右===============================-->

			<div class="side-sec">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 10px; margin-left: 20px; width: 200px;">
					<legend>话题热议榜</legend>
				</fieldset>
				<div class="top_list_hot">
					<ul class="top_list_hot_list">
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number1">1</p> <a href=""
							class="top_list_hot_list_item_name">热议榜热议榜热议榜热议榜1</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number1">2</p> <a href=""
							class="top_list_hot_list_item_name">热议榜2</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number1">3</p> <a href=""
							class="top_list_hot_list_item_name">热议榜3</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number">4</p> <a href=""
							class="top_list_hot_list_item_name">热议榜4</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number">5</p> <a href=""
							class="top_list_hot_list_item_name">热议榜5</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number">6</p> <a href=""
							class="top_list_hot_list_item_name">热议榜6</a> <span
							class="topic_num">1221</span></li>
						<li class="top_list_hot_list_item"><p
								class="top_list_hot_item_number">7</p> <a href=""
							class="top_list_hot_list_item_name">热议榜7</a> <span
							class="topic_num">1221</span></li>
					</ul>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div class="gonggao">
					<button class="layui-btn layui-btn-lg">公告板</button>
					<img src="${path}img/gonggao02.jpg"
						style="width: 220px; height: 90px; margin-top: 10px;" />
					<ul class="gonggao_list">
						<li class="gonggao_list_item"><a href=""
							class="gonggao_list_item_name">贴吧开展“恋童”专项清理行动
								贴吧开展“恋童”专项清理行动贴吧开展“恋童”专项清理行动</a></li>
						<li class="gonggao_list_item"><a href=""
							class="gonggao_list_item_name">贴吧开展“网络相约自残自杀”专项清理行动</a></li>
					</ul>
				</div>
			</div>

			<!-- =====================中间部分===============================-->
			<div class="right-sec">
				<fieldset class="layui-elem-field layui-field-title"
					style="margin-top: 10px; margin-left: 20px; width: 460px;">
					<legend>热门动态</legend>
				</fieldset>
				<div class="right-sec_tiezi">
					<post_view_component  /> 
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

		<!-- ==========================帖子layer页面===================== -->
		<div><post_layer_component /></div>

	</div>
	</div>
	<script type="text/javascript" src="${path}js/toastr.js"></script>
	<script src="${path}js/index.js"></script>
</body>
</html>

