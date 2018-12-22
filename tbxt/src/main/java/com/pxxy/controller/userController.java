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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.servlet.ModelAndView;

import com.pxxy.service.userService;
import com.google.gson.Gson;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

@Controller
@SessionScope
@SessionAttributes
public class userController {

	@Autowired
	private userService userService;
	
	//用户注册
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
		System.out.println("用户注册的nick==="+userNickname);
		String result = "";
		user CheckUser = userService.queryByUserEmail(userEmail);
		try {
			if(CheckUser == null) 
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
				user.setUserGender("1");
				user.setUserCreattime(ctime);
				userService.insert(user);
				session.setAttribute("user", user);
				result = "register_success";
				
			}else {
				result = "error";
			}
			pw.write(result);
			
		} catch (Exception e) {
			System.out.println("查询user出错");
			pw.write(result);
		}
		pw.flush();
		pw.close();
	}
	
	//获取session并判断
	@RequestMapping(value="/requestSession",method=RequestMethod.POST)
	@ResponseBody
	public void requestSession(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user");
		if(sessionUser!=null) {
			Gson gson = new Gson();
			pw.write(gson.toJson(sessionUser));
		}else{
			pw.write("");
		}
		pw.flush();
		pw.close();
		
	}
	//用户登陆
	@RequestMapping(value="/login",method=RequestMethod.POST)
	@ResponseBody
	public void login(HttpServletRequest request,HttpServletResponse response,
			@RequestParam String userEmail,@RequestParam String userPassword)
		throws IOException{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		response.setContentType("text/html;charset=utf-8");
		ModelAndView modelAndView = new ModelAndView();
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
	
	//注销用户
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
			pw.write("logoutSuccess");
		}
		
	//注销用户
	@RequestMapping(value="/ManaLogin",method=RequestMethod.POST)
	@ResponseBody
	public void ManaLogin(HttpServletRequest request,HttpServletResponse response,
			@RequestParam String userEmail,@RequestParam String passWord)
		throws IOException{
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET,POST");
		response.setContentType("text/html;charset=utf-8");
		HttpSession session = request.getSession();
		ModelAndView modelAndView = new ModelAndView();
		String res = "";
		user user = userService.queryByManaUserEmail(userEmail);
		if(user != null) {
			if(user.getUserPassword().equals(passWord)) {
				res = "success";
				session.setAttribute("user", user);
			}else {
				res = "password_error";
			}
		}else {
			res = "user_null";
		}
//		return res;
		PrintWriter pw = response.getWriter();
		pw.write(res);
		/*System.out.println("00000000000000000000000");
		String s ="dd";
		modelAndView.addObject("res",res);
		modelAndView.setViewName("backStage");
		return res;*/
	}
	
	@RequestMapping(value="/queryAllUser",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryAllUser() {
		PostUserDTO postUserDTO = userService.queryAllUser();
		return postUserDTO;
	}
	
	
	
	@RequestMapping(value="/skipto_backStage",method=RequestMethod.GET)
	public ModelAndView skipto_back() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("backStage");
		return modelAndView;
		
	}
	@RequestMapping(value="/skipto_announcement",method=RequestMethod.GET)
	public String skipto_announcement() {
		return "announcement";
	}
	@RequestMapping(value="/skipto_barCreat",method=RequestMethod.GET)
	public String skipto_barCreat() {
		return "barCreat";
	}
	@RequestMapping(value="/skipto_carousel",method=RequestMethod.GET)
	public String skipto_carousel() {
		return "carousel";
	}
	@RequestMapping(value="/skipto_postBarList",method=RequestMethod.GET)
	public String skipto_postBarList() {
		return "postBarList";
	}
	@RequestMapping(value="/skipto_postList",method=RequestMethod.GET)
	public String skipto_postList() {
		return "postList";
	}
	@RequestMapping(value="/skipto_userList",method=RequestMethod.GET)
	public String skipto_userList() {
		return "userList";
	}
	@RequestMapping(value="/skipto_picManage",method=RequestMethod.GET)
	public String skipto_picManage() {
		return "picManage";
	}
}
