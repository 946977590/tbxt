package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

public interface userService {
	
	 int insert(user user);	//����û�
	 
	 user queryByUserEmail(String uerEmail); //�û���½
	 user queryByManaUserEmail(String userEmail);
	 PostUserDTO queryAllUser();	//��ѯ������Ա֮�����л�Ա
}
