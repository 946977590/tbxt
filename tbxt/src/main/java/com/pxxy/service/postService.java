package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;

public interface postService {

	int creatPost(post record);	//��������
	PostUserDTO queryPostByUserId(String postId);	//�����û�id��ѯ���post�����Ϣ
	PostUserDTO queryPostViewByTest(String userId);	//������ҳ�Ƽ�post
	
    PostUserDTO queryPostLayer(String postId);	//Post���� ����
    
}
