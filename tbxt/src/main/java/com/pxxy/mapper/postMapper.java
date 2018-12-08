package com.pxxy.mapper;

import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.DTOreaded;
import com.pxxy.DTO.DTOtopic;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
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
}