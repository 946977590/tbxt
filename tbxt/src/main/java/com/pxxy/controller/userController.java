package com.pxxy.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
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
import com.pxxy.utils.SendEmail;
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
	//发送注册验证码
	@RequestMapping(value="/sendEmail",method=RequestMethod.POST)
	@ResponseBody
	public String sendEmail(@RequestParam String userEmail,@RequestParam String userNickname) throws IOException{
		int a = (int) (Math.random()*1000000);
		String verifyCode = String.valueOf(a);
		try {
			SendEmail.sendEmail(userEmail, userNickname, verifyCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return verifyCode;
	}
	//发送修改密码验证码
	@RequestMapping(value="/sendXGEmail",method=RequestMethod.POST)
	@ResponseBody
	public String sendXGEmail(@RequestParam String userEmail) throws IOException{
		user user = userService.queryByUserEmail(userEmail);
		String userNickname = user.getUserNickname();
		int a = (int) (Math.random()*1000000);
		String verifyCode = String.valueOf(a);
		try {
			SendEmail.sendEmail(userEmail, userNickname, verifyCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return verifyCode;
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
			if(user.getUserIsdelete().equals("0") || user.getUserIsdelete().equals("9")) {
				if(user.getUserPassword().equals(userPassword)) {
					session.setAttribute("user", user);
					pw.write("loginSuccess");
				}else {
					pw.write("loginError");
				}
			}else {
				pw.write("banned");
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
		PrintWriter pw = response.getWriter();
		pw.write(res);
	}
	
	@RequestMapping(value="/queryAllUser",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryAllUser() {
		PostUserDTO postUserDTO = userService.queryAllUser();
		return postUserDTO;
	}
	@RequestMapping(value="/queryAllUserFY",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryAllUserFY(@RequestParam int preNum,@RequestParam int pageSize) {
		PostUserDTO postUserDTO = userService.queryAllUserFY(preNum,pageSize);
		return postUserDTO;
	}
	
	//关键字查询
	@RequestMapping(value="/queryUserByKW",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryUserByKW(@RequestParam String userNickname) {
		PostUserDTO postUserDTO = userService.queryUserBykw(userNickname);
		System.out.println("postUserDTO="+postUserDTO);
		return postUserDTO;
	}
	
	@RequestMapping(value="/queryUserById",method=RequestMethod.POST)
	@ResponseBody
	public user queryUserById(@RequestParam String userId) {
		user user = userService.selectByPrimaryKey(userId);
		return user;
	}
	
	//封禁用户
	@RequestMapping(value="/BannedUser",method=RequestMethod.POST)
	@ResponseBody
	public String BannedUser(@RequestParam String userId) {
		user user = new user();
		user.setUserId(userId);
		user.setUserIsdelete("1");
		Date date = new Date();
		String userModifytime = date.toLocaleString().toString();
		user.setUserModifytime(userModifytime);
		userService.updateByPrimaryKeySelective(user);
		return "banned";
	}
	//解除封禁
	@RequestMapping(value="/ReBannedUser",method=RequestMethod.POST)
	@ResponseBody
	public String ReBannedUser(@RequestParam String userId) {
		user user = new user();
		user.setUserId(userId);
		user.setUserIsdelete("0");
		Date date = new Date();
		String userModifytime = date.toLocaleString().toString();
		user.setUserModifytime(userModifytime);
		userService.updateByPrimaryKeySelective(user);
		return "Rebanned";
	}
	//更新用户信息
	@RequestMapping(value="/UpdateUser",method=RequestMethod.POST)
	@ResponseBody
	public String UpdateUser(HttpServletRequest request,@RequestParam String userNickname,@RequestParam String userGender) {
		HttpSession session = request.getSession();
		user user1 = (user) session.getAttribute("user");
		user user = new user();
		Date date = new Date();
		String userModifytime = date.toLocaleString().toString();
		user.setUserId(user1.getUserId());
		user.setUserModifytime(userModifytime);
		user.setUserGender(userGender);
		user.setUserNickname(userNickname);
		userService.updateByPrimaryKeySelective(user);
		return "Update";
	}
	//记得密码的===修改密码
	@RequestMapping(value="/UpdateJdPassword",method=RequestMethod.POST)
	@ResponseBody
	public String UpdateUserPassword(@RequestParam String userEmail,@RequestParam String userOldPassword
			,@RequestParam String userNewPassword) {
		user user1 = userService.queryByUserEmail(userEmail);
		if(user1 != null) {
			String oldpassword = user1.getUserPassword();
			if(userOldPassword.equals(oldpassword)) {
				user1.setUserPassword(userNewPassword);
				userService.updateByPrimaryKeySelective(user1);
				return "Update";
			}else {
				return "passwordError";
			}
		}else {
			return "emailNull";
		}
		
	}
	//忘记密码的===修改密码
	@RequestMapping(value="/UpdateWjPassword",method=RequestMethod.POST)
	@ResponseBody
	public String UpdateWjPassword(@RequestParam String userEmail,@RequestParam String userPassword) {
		user user1 = userService.queryByUserEmail(userEmail);
		if(user1 != null) {
			user1.setUserPassword(userPassword);
			userService.updateByPrimaryKeySelective(user1);
			return "Update";
		}else {
			return "emailNull";
		}
		
	}
	//根据id查nickname
	@RequestMapping(value="/findName",method=RequestMethod.POST)
	@ResponseBody
	public user findName(HttpServletRequest request) {
		HttpSession session = request.getSession();
		user user1 = (user) session.getAttribute("user");
		user user2 = userService.selectByPrimaryKey(user1.getUserId());
		return user2;
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
	@RequestMapping(value="/skipto_huatiList",method=RequestMethod.GET)
	public String skipto_huatiList() {
		return "huatiList";
	}
}
