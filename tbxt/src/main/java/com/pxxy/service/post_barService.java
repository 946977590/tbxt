package com.pxxy.service;

import java.util.List;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;

public interface post_barService {

	int insert(post_bar record);
	PostUserDTO selectAllBar();	//��ѯ��������
	int updateByPrimaryKeySelective(post_bar record);	//�������
	post_bar queryBarPic(String barId);	//��ѯ����ͼƬ
	List<post_picture> querySlidePic();	//�ֲ�ͼ����
	int updateByPrimaryKeySelective(post_picture record);
}
