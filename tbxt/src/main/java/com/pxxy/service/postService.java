package com.pxxy.service;

import org.apache.ibatis.annotations.Param;

import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;

public interface postService {

	int creatPost(post record);	//��������
	PostUserDTO queryPostByUserId(String postId);	//�����û�id��ѯ���post�����Ϣ
	PostUserDTO queryPostViewByTest(String userId);	//������ҳ�Ƽ�post
	
	DTOgreat queryPostLayer_great(String postId);	//Post����  ����
    PostUserDTO queryPostLayer(String postId);	//Post���� ����
    post_great judgeGreat(String postId,String userId);			//�����ж�
    void greatAdd(String greatId,String postId,String userId);	//����
    void delGreat(String greatId);		//ȡ������
    void commentAdd(String topicId,String postId,String userId,String bUserId,String topicContent);//��������
    
    PostUserDTO queryTopPostView();	//������ҳ�����Ƽ�
    PostUserDTO queryBarPostView(String barId);	//������������
    PostUserDTO queryAllBar(); 			//��ѯ��������
}
