package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

public interface userService {
	
	 int insert(user user);	//����û�
	 user selectByPrimaryKey(String userId);
	 user queryByUserEmail(String uerEmail); //�û���½
	 user queryByManaUserEmail(String userEmail);
	 PostUserDTO queryAllUser();	//��ѯ������Ա֮�����л�Ա
	 int updateByPrimaryKeySelective(user record);
}
