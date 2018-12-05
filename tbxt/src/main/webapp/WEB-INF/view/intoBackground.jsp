<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%  
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
request.setAttribute("path", basePath);  
%>
<%-- <%@taglib uri="/struts-tags" prefix="s" %>   --%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<title>exhibition后台管理</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta http-equiv="Access-Control-Allow-Origin" content="*">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="${path}layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="${path}layui/css/modules/layer/default/layer.css" />
	<link rel="stylesheet" href="${path}css/main.css" media="all" />
	<link rel="stylesheet" href="<%=basePath %>css/toastr.css">
	<link rel="stylesheet" href="<%=basePath %>css/bootstrap.min.css">
	<script type="text/javascript" src="<%=basePath %>js/jquery-3.1.1.min.js"></script>	
	<script src="<%=basePath %>js/bootstrap.min.js"></script>
</head>
<body class="main_body">
	<div class="layui-layout layui-layout-admin">
		<!-- 顶部 -->
		<div class="layui-header header">
			<div class="layui-main">
				<cite href="#" class="logo">贴吧-后台管理</cite >
				<!-- 搜索 -->
				
			    <ul class="layui-nav top_menu">
			    	<li class="layui-nav-item"  id="showNotice" pc  >
						<cite id="helloday" disabled="true"></cite>
					</li>
			    	
					<li class="layui-nav-item" pc>
						<a href="javascript:;">
							<img src="${path}images/pai.jpg" class="layui-circle" width="35" height="35">
							<cite><s:property value="#session.admin_session.username" /></cite>
						</a>
						<dl class="layui-nav-child">	
							<dd><a href="javascript:;" onclick="logout();"><i class="iconfont icon-loginout"></i><cite>退出</cite></a></dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
		<!-- 左侧导航 -->
		<div class="layui-side layui-bg-black">
			<div class="user-photo">
				<a class="img" title="我的头像" ><img src="${path}images/pai.jpg"></a>
				<p>你好！<span class="userName"><s:property value="#session.admin_session.username" /></span>, 欢迎登录</p>
			</div>
			<div class="navBar layui-side-scroll">
				<ul class="layui-nav layui-nav-tree">
					<li class="layui-nav-item">
  					  <a href="javascript:;"><cite class="title1">作品管理</cite></a>
   						 <dl class="layui-nav-child">
    					 <dd><a href="${pageContext.request.contextPath }/skip/skip_intoProductionList;" target="qqq"><cite class="title1">作品列表</cite></a></dd>
     					 <dd><a href="${pageContext.request.contextPath }/skip/skip_intoProductionAdd;" target="qqq"><cite class="title1">新增作品</cite></a></dd>
    					</dl>
  					</li>
					<li class="layui-nav-item">
  					  <a href="javascript:;"><cite class="title1">分类管理</cite></a>
   						 <dl class="layui-nav-child">
    					 <dd><a href="${pageContext.request.contextPath }/skip/skip_intoCategoryList;" target="qqq"><cite class="title1">分类列表</cite></a></dd>
     					 <dd><a href="${pageContext.request.contextPath }/skip/skip_intoCategoryAdd;" target="qqq"><cite class="title1">新增分类</cite></a></dd>
    					</dl>
  					</li>
  					<li class="layui-nav-item">
  					  <a href="javascript:;"><cite class="title1">新闻管理</cite></a>
   						 <dl class="layui-nav-child">
    					 <dd><a href="${pageContext.request.contextPath }/skip/skip_intoNewsList;" target="qqq"><cite class="title1">新闻列表</cite></a></dd>
     					 <dd><a href="" data-toggle="modal" data-target="#myModal" target="qqq"><cite class="title1">新增新闻</cite></a></dd>
    					</dl>
  					</li>
				</ul>
			</div>
		</div>


		<!-- 右侧内容 -->
		<div class="layui-body layui-form">
			<div class="layui-tab marg0" lay-filter="bodyTab">
				<ul class="layui-tab-title top_tab">
					<li class="layui-this" lay-id=""><i ><cite class="gettitle1">后台首页</cite></i></li>
				</ul>
				<div class="layui-tab-content clildFrame">
					<div class="layui-tab-item layui-show">
						<iframe src="${pageContext.request.contextPath }/intoMemberList" name="qqq"></iframe>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div class="layui-footer footer">
			 <span>Copyright @ 2018-2019 PingXiangXueYuan All Right Reserve</span>
			 <span>萍乡学院版权所有</span>
		</div>
	</div>


	<script type="text/javascript" src="<%=basePath %>layui/layui.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/index.js"></script> 
	<script type="text/javascript" src="<%=basePath %>js/toastr.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/login/login.js"></script>
	<script type="text/javascript" src="<%=basePath %>layui/lay/modules/layer.js" ></script>
	<script type="text/javascript" src="<%=basePath %>js/login/show_time.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/news/newsAdd.js"></script>
	<script type="text/javascript">
	layui.use('element', function(){
		  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
		  
		  //监听导航点击
		  element.on('nav(demo)', function(elem){
		    console.log(elem)
		    layer.msg(elem.text());
		  });
		});
	</script>

</body>
</html>