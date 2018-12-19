package com.pxxy.service;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;

public interface post_barService {

	int insert(post_bar record);
	PostUserDTO selectAllBar();	//²éÑ¯ËùÓĞÌù°É
}
