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
		System.out.println("������"+a+"������");
		return a;
	}

	public user queryByUserEmail(String userEmail) {
		// TODO Auto-generated method stub
		user user = userMapper.queryByUserEmail(userEmail);
		System.out.println("login��ѯ������user��=="+user);
		return user;
	}

}
