package com.pxxy.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pxxy.pojo.user;

public class UserInterceptor extends HandlerInterceptorAdapter{

	@Override
	//在业务处理器处理请求之前被调用
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("preHandle=====");
		HttpSession session = request.getSession();
		user user = (user) session.getAttribute("userMana");
		if(!user.getUserEmail().equals("123")) {
			request.getRequestDispatcher("/loginBack.html").forward(request, response);;
			System.out.println("拦截请求==============");
			return false;	//终止请求
		}
		return true;
	}

	@Override
	//在业务处理器处理请求执行完成后,生成视图之前执行
	public void postHandle(
			HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
			throws Exception {
		System.out.println("postHandle=====");
		HttpSession session = request.getSession();
		user user = (com.pxxy.pojo.user) session.getAttribute("userMana");
		if(user.getUserEmail().equals("123")) {
			System.out.println("卧槽，是管理员登录了！！！");
		}
	}

	@Override
	//在DispatcherServlet完全处理完请求后被调用，可用于清理资源等。返回处理（已经渲染了页面）
	public void afterCompletion(
			HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		System.out.println("afterCompletion=====");
	}
	
}
