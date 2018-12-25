package com.pxxy.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.user;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.post_barMapper;
import com.pxxy.mapper.post_pictureMapper;
import com.pxxy.service.post_barService;

@Service
public class post_barServiceImpl implements post_barService {

	@Autowired 
	private post_barMapper post_barMapper;
	
	@Autowired 
	private post_pictureMapper post_pictureMapper;
	
	public int insert(post_bar record) {
	int a =	post_barMapper.insert(record);
//	System.out.println("service====bar成功插入"+a+"条数据");
		return a;
	}
	
	//查询所有贴吧
	public PostUserDTO selectAllBar() {
		PostUserDTO postUserDTO = post_barMapper.selectAllBar();
		return postUserDTO;
	}

	public int updateByPrimaryKeySelective(post_bar record) {
		int i = post_barMapper.updateByPrimaryKeySelective(record);
		return i;
	}

	public post_bar queryBarPic(String barId) {
		post_bar post_bar = post_barMapper.queryBarPic(barId);
		return post_bar;
	}

	public List<post_picture> querySlidePic() {
		List<post_picture> list = post_pictureMapper.querySlidePic();
		return list;
	}

	public int updateByPrimaryKeySelective(post_picture record) {
		int i = post_pictureMapper.updateByPrimaryKeySelective(record);
		return i;
	}
		
}
