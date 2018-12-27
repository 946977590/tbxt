package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

public interface userService {
	
	 int insert(user user);	//添加用户
	 user selectByPrimaryKey(String userId);
	 user queryByUserEmail(String uerEmail); //用户登陆
	 user queryByManaUserEmail(String userEmail);
	 PostUserDTO queryAllUser();	//查询除管理员之外所有会员
	 PostUserDTO queryAllUserFY(int preNum,int pageSize);	//分页查询除管理员之外所有会员
	 int updateByPrimaryKeySelective(user record);
	 PostUserDTO queryUserBykw(String userNickname);
}
