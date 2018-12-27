package com.pxxy.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.announces;
import com.pxxy.pojo.huati;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;

public interface post_barService {

	int insert(post_bar record);
	PostUserDTO selectAllBar();	//��ѯ��������
	int updateByPrimaryKeySelective(post_bar record);	//�������
	post_bar queryBarPic(String barId);	//��ѯ����ͼƬ
	List<post_picture> querySlidePic();	//�ֲ�ͼ����
	int updateByPrimaryKeySelective(post_picture record);
	announces selectAnnouncesByKey(String announceId);
	PostUserDTO selectBarByKW(String barName,int preNum, int pageSize);	//�ؼ��ֲ��
	post_bar queryBarByName(String barName);	//����name��bar
	int insertGG(announces record);	//��ӹ���
	int updateGG(announces record);	//�༭����
	PostUserDTO selectAnnounceBack();	//��ѯ���й���
	PostUserDTO selectAllBarFY(int preNum,int pageSize);
	
}
