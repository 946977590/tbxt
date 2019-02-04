package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

public interface userService {
	
	 int insert(user user);	//����û�
	 user selectByPrimaryKey(String userId);
	 user queryByUserEmail(String uerEmail); //�û���½
	 user queryByManaUserEmail(String userEmail);
	 PostUserDTO queryAllUser();	//��ѯ������Ա֮�����л�Ա
	 PostUserDTO queryAllUserFY(int preNum,int pageSize);	//��ҳ��ѯ������Ա֮�����л�Ա
	 int updateByPrimaryKeySelective(user record);
	 PostUserDTO queryUserBykw(String userNickname);
	 //spring�������
	 void tranferIn(String userId1,String userId2,String userLevel);
}
