package com.pxxy.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.io.ResolverUtil.IsA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.annotation.SessionScope;

import com.pxxy.service.userService;
import com.pxxy.pojo.user;

@Controller
@SessionScope
public class userController {

	@Autowired
	private userService userService;
	
	//�û�ע��
	@RequestMapping(value="/register",method=RequestMethod.POST)
	@ResponseBody
	public void login(HttpServletRequest request,HttpServletResponse response,
		@RequestParam String userEmail,@RequestParam String userPassword
		,@RequestParam String userNickname)
		throws IOException{
		HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String xx = request.getParameter("userEmail");
		String result = "";
		System.out.println("xx==="+xx);
		try {
			if(userEmail != null && !userEmail.isEmpty() 
				&& userNickname != null && !userNickname.isEmpty()
				&& userPassword != null && !userPassword.isEmpty()) 
			{
				String userId = UUID.randomUUID().toString();
				Date date = new Date();
				String ctime = date.toLocaleString().toString();
				user user = new user();
				user.setUserId(userId);
				user.setUserEmail(userEmail);
				user.setUserNickname(userNickname);
				user.setUserPassword(userPassword);
				user.setUserLevel("0");
				user.setUserIsdelete("0");
				System.out.println("ctime===="+ctime);
				user.setUserCreattime(ctime);
				userService.insert(user);
				session.setAttribute("user", user);
				result = "register_success";
				
			}else {
				result = "error";
			}
			pw.write(result);
			
		} catch (Exception e) {
			System.out.println("��ѯuser����");
			pw.write(result);
		}
		pw.flush();
		pw.close();
	}
	
	//��ȡsession���ж�
	@RequestMapping(value="/requestSession",method=RequestMethod.POST)
	@ResponseBody
	public void requestSession(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user");
		if(sessionUser!=null) {
			String sessionName = sessionUser.getUserNickname();
			pw.write(sessionName);
		}else{
			pw.write("");
		}
		pw.flush();
		pw.close();
		
	}
	//�û���½
	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	public void login(HttpServletRequest request,HttpServletResponse response,
			@RequestParam String userEmail,@RequestParam String userPassword)
		throws IOException{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		response.setContentType("text/html;charset=utf-8");
		HttpSession session = request.getSession();
		PrintWriter pw = response.getWriter();
		user user = userService.queryByUserEmail(userEmail);
		if(user!=null) {
			if(user.getUserPassword().equals(userPassword)) {
				session.setAttribute("user", user);
				pw.write("loginSuccess");
			}else {
				pw.write("loginError");
			}
		}else {
			pw.write("loginError");
		}
	}
	
	//ע���û�
		@RequestMapping(value="/logout",method=RequestMethod.POST)
		@ResponseBody
		public void logout(HttpServletRequest request,HttpServletResponse response)
			throws IOException{
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods", "GET,POST");
			response.setContentType("text/html;charset=utf-8");
			HttpSession session = request.getSession();
			PrintWriter pw = response.getWriter();
			session.removeAttribute("user");
			System.out.println("ִ���˳�=------");
			pw.write("logoutSuccess");
		}
}
