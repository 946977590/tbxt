package com.pxxy.service;

import java.util.List;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.huati;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.post_readed;

public interface postService {

	post selectByPrimaryKey(String postId);
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
    DTOBarAndPic selectAllPostInBack();	//��̨��ѯ��������
    PostUserDTO selectAllAnnounce();	//��ѯ���й���
    int updateByPrimaryKeySelective(post record);	//����post
    List<post_picture> queryAllPic();
    int deletePic(post_picture post_picture);
    int PostreadAdd(post_readed record);		//�Ѷ�����
    List<post_readed> judgeRead(String userId,String postId);	//�жϸ��û��Ƿ��������
    int insertHuati(huati record);	//���뻰��
    List<huati> queryHotHuati();	//���Ż����Ƽ�
}
