package com.pxxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pxxy.pojo.post_bar;
import com.pxxy.mapper.post_barMapper;
import com.pxxy.service.post_barService;

@Service
public class post_barServiceImpl implements post_barService {

	@Autowired 
	private post_barMapper post_barMapper;
	public int insert(post_bar record) {
	int a =	post_barMapper.insert(record);
	System.out.println("service====bar成功插入"+a+"条数据");
		return a;
	}

}
