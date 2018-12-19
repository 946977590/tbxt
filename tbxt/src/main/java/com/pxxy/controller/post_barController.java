package com.pxxy.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.pxxy.service.post_barService;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.user;

@Controller
public class post_barController {

	@Autowired
	private post_barService post_barService;
	
	
	@RequestMapping(value="/postBarCreat",method=RequestMethod.POST)
	@ResponseBody
	public String postBarCreat(HttpServletRequest request,HttpServletResponse response,
		@RequestParam String barName,@RequestParam(required=false) String barLeader
		,@RequestParam(required = false) MultipartFile file,
		@RequestParam(required=false) String barSign,@RequestParam String barCategory)
		throws IOException{
		HttpSession session = request.getSession();
		post_bar post_bar = new post_bar();
		user sessionUser = (user) session.getAttribute("user");	//session未登录
//		PrintWriter pw = response.getWriter();
		String barPicture = "";
		String res = "";
		if(file != null) {
			String storePath= "D:\\AUPLOAD\\images";//存放我们上传的文件路径
			String fileName = file.getOriginalFilename();
			String pictureId = UUID.randomUUID().toString();
			File filepath = new File(storePath, fileName);
			barPicture = pictureId+fileName;	//生成唯一的图片名字
			if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();//如果目录不存在，创建目录
            }
            try {
                file.transferTo(new File(storePath+File.separator+barPicture));//把文件写入目标文件地址 separator:系统分隔符
            } catch (Exception e) {

                e.printStackTrace();
            }
		}
		if(sessionUser.getUserNickname()!=null) {
			String barId = UUID.randomUUID().toString();
			Date date = new Date();
			String ctime = date.toLocaleString().toString();
			post_bar.setBarCategory(barCategory);
			post_bar.setBarCreattime(ctime);
			post_bar.setBarId(barId);
			post_bar.setBarIsdelete("0");
			post_bar.setBarLeader(barLeader);
			post_bar.setBarSign(barSign);
			post_bar.setBarName(barName);
			post_bar.setBarPicture(barPicture);
			if(post_bar !=null) {
				int a = post_barService.insert(post_bar);
				return "success";
			}else {
				return  "error";
			}
		}else {
			return "sessionError";
		}
		/*pw.write(res);
		pw.flush();
		pw.close();*/
	}
	
	@RequestMapping(value="/queryAllBarInBack",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO querAllBar() {
		PostUserDTO postUserDTO = post_barService.selectAllBar();
		return postUserDTO;
	}
	
}
