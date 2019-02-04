package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.user;
import com.pxxy.DTO.PostUserDTO;
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

	public user queryByManaUserEmail(String userEmail) {
		user user = userMapper.queryByManaUserEmail(userEmail);
		return user;
	}

	public PostUserDTO queryAllUser() {
		// TODO Auto-generated method stub
		PostUserDTO postUserDTO = userMapper.queryAllUser();
		return postUserDTO;
	}
	
	public PostUserDTO queryAllUserFY(int preNum,int pageSize) {
		PostUserDTO postUserDTO = userMapper.queryAllUserFY(preNum,pageSize);
		return postUserDTO;
	}
	public user selectByPrimaryKey(String userId) {
		user user = userMapper.selectByPrimaryKey(userId);
		return user;
	}

	public int updateByPrimaryKeySelective(user record) {
		int i = userMapper.updateByPrimaryKeySelective(record);
		return i;
	}

	public PostUserDTO queryUserBykw(String userNickname) {
		PostUserDTO postUserDTO = userMapper.queryUserBykw(userNickname);
		return postUserDTO;
	}

	public void tranferIn(String userId1, String userId2, String userLevel) {
		user user1 = userMapper.selectByPrimaryKey(userId1);
		user user2 = userMapper.selectByPrimaryKey(userId2);
		user1.setUserLevel("-"+userLevel);
		user2.setUserLevel(userLevel);
		userMapper.updateByPrimaryKeySelective(user1);
		int i=1/0;
		userMapper.updateByPrimaryKeySelective(user2);
		
	}
}
