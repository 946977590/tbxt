package com.pxxy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostByGreatReadedDTO;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;

public interface postMapper {
    int deleteByPrimaryKey(String postId);

    int insert(post record);

    int insertSelective(post record);

    post selectByPrimaryKey(String postId);

    int updateByPrimaryKeySelective(post record);

    int updateByPrimaryKey(post record);
    
    PostUserDTO queryPostByUserId(String userId);	//�����û�id��ѯ���post�����Ϣ
    
    PostUserDTO queryPostViewByTest(String userId);	//������ҳ�Ƽ�post
    
    DTOgreat queryPostLayer_great(String postId);	//Post����  ����
    
    DTOreaded queryPostLayer_readed(String postId);	//Post����  �Ķ�
    
    DTOtopic queryPostLayer_Topic(String postId);	//Post����  ����
    
    DTOBarAndPic queryPostLayer_BarAndPic(String postId);	//Post���� ����-ͼƬ
    
    post_great judgeGreat(@Param("postId")String postId,@Param("userId")String userId);			//�����ж�
    
    void greatAdd(@Param("greatId")String greatId,@Param("postId")String postId,@Param("userId")String userId);	//����
    
    void delGreat(String greatId);		//ɾ������
    
    void commentAdd(@Param("topicId")String topicId,@Param("postId")String postId,@Param("userId")String userId,@Param("bUserId")String bUserId,@Param("topicContent")String topicContent);//��������
    
    List<?> queryTopPostId();
    
    PostByGreatReadedDTO queryPostViewByGreatReaded(String postId);
    List<?> queryBarPostId(String barId);
    PostUserDTO queryAllBar(); 			//��ѯ��������
}