package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.user;
import com.pxxy.mapper.userMapper;
import com.pxxy.service.userService;

@Service
public class userServiceImpl implements userService {

	@Autowired
	private userMapper userMapper;
	
	public int insert(user user) {
		// TODO Auto-generated method stub
		int a = userMapper.insert(user);
		System.out.println("插入了"+a+"条数据");
		return a;
	}

	public user queryByUserEmail(String userEmail) {
		// TODO Auto-generated method stub
		user user = userMapper.queryByUserEmail(userEmail);
		System.out.println("login查询出来的user是=="+user);
		return user;
	}

}
