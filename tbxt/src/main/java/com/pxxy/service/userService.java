package com.pxxy.service;

import com.pxxy.pojo.user;

public interface userService {

	 int insert(user user);	//添加用户
	 
	 user queryByUserEmail(String userId); //用户登陆
}
