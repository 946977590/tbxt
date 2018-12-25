package com.pxxy.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;
import java.util.List;

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
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_bar;
import com.pxxy.pojo.post_picture;
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
		user sessionUser = (user) session.getAttribute("user");	//sessionδ��¼
//		PrintWriter pw = response.getWriter();
		String barPicture = "";
		String res = "";
		if(file != null) {
			String storePath= "D:\\AUPLOAD\\images";//��������ϴ����ļ�·��
			String fileName = file.getOriginalFilename();
			String pictureId = UUID.randomUUID().toString();
			File filepath = new File(storePath, fileName);
			barPicture = pictureId+fileName;	//����Ψһ��ͼƬ����
			if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();//���Ŀ¼�����ڣ�����Ŀ¼
            }
            try {
                file.transferTo(new File(storePath+File.separator+barPicture));//���ļ�д��Ŀ���ļ���ַ separator:ϵͳ�ָ���
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
	
	//����Barid��ѯ����ͼƬ
	@RequestMapping(value="/queryBarPic",method=RequestMethod.POST)
	@ResponseBody
	public post_bar queryBarPic(@RequestParam String barId) {
		post_bar post_bar = post_barService.queryBarPic(barId);
		return post_bar;
	}
	
	//��ѯ�ֲ�ͼ
	@RequestMapping(value="/querySlidePic",method=RequestMethod.POST)
	@ResponseBody
	public List<post_picture> querySlidePic() {
		List<post_picture> list = post_barService.querySlidePic();
		return list;
	}
	
	//�ֲ�ͼ����
	@RequestMapping(value = "/slideManage", method = RequestMethod.POST)
	@ResponseBody
	public String slideManage(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(required = false) MultipartFile[] files,@RequestParam List<?> pictureIdList) throws IOException {
		HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		post post = new post();
		user sessionUser = (user) session.getAttribute("user"); // sessionδ��¼���򲻿ɷ���
		String user_id = sessionUser.getUserId();
		String postId = UUID.randomUUID().toString();
		String pictureId = "";
		if(files!=null && files.length>0){  
            //ѭ����ȡfile�����е��ļ�  
            for(int i = 0;i<files.length;i++){  
                MultipartFile file = files[i];  
                //�����ļ�  
                if(file != null) {
                	  post_picture post_picture = new post_picture();
                      String storePath= "D:\\AUPLOAD\\images";//��������ϴ����ļ�·��
                      Date date = new Date();
                      String ctime = date.toLocaleString().toString();
                      String fileName = file.getOriginalFilename();
                      String pic_name = pictureId+fileName;	//����Ψһ��ͼƬ����
                      File filepath = new File(storePath, fileName);
                      post_picture.setPictureName(pic_name);
                      post_picture.setPictureCreattime(ctime);
                      pictureId = (String) pictureIdList.get(i);
                      post_picture.setPictureId(pictureId);
                      post_picture.setPictureIsdelete("8");
                      post_picture.setPictureBelong(postId);
                      int a = post_barService.updateByPrimaryKeySelective(post_picture);
//      		        System.out.println("����"+a+"postͼƬ!!");
                      if (!filepath.getParentFile().exists()) {

                          filepath.getParentFile().mkdirs();//���Ŀ¼�����ڣ�����Ŀ¼
                      }
                      try {
                          file.transferTo(new File(storePath+File.separator+pic_name));//���ļ�д��Ŀ���ļ���ַ
                      } catch (Exception e) {
                          e.printStackTrace();
                      }
                }
            }  
            return "updateSuccess";
        }else {
        	return "fileNull";
        }

	}
}
