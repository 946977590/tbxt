package com.pxxy.service;

import com.pxxy.pojo.user;

public interface userService {

	 int insert(user user);	//����û�
	 
	 user queryByUserEmail(String userId); //�û���½
}
