package com.pxxy.service;

import java.util.List;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;

public interface post_barService {

	int insert(post_bar record);
	PostUserDTO selectAllBar();	//²éÑ¯ËùÓĞÌù°É
	int updateByPrimaryKeySelective(post_bar record);	//·â½ûÌù°É
	post_bar queryBarPic(String barId);	//²éÑ¯Ìù°ÉÍ¼Æ¬
	List<post_picture> querySlidePic();	//ÂÖ²¥Í¼¹ÜÀí
	int updateByPrimaryKeySelective(post_picture record);
}
