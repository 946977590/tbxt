package com.pxxy.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.pxxy.service.postService;
import com.pxxy.service.post_pictureService;
import com.google.gson.Gson;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.user;

@Controller
public class postController {

	@Autowired
	private postService postService;
	
	@Autowired
	private post_pictureService post_pictureService;

	@RequestMapping(value = "/postCreat", method = RequestMethod.POST)
	@ResponseBody
	public void postCreat(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(required = false) String postBarId, @RequestParam String postTitle,
			@RequestParam String postContent,@RequestParam(required = false) MultipartFile[] files) throws IOException {
		HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		post post = new post();
		user sessionUser = (user) session.getAttribute("user"); // sessionδ��¼���򲻿ɷ���
		String user_id = sessionUser.getUserId();
		System.out.println("��ȡ��files==="+files.length);
		if(files!=null && files.length>0){  
            //ѭ����ȡfile�����е��ļ�  
            for(int i = 0;i<files.length;i++){  
                MultipartFile file = files[i];  
                //�����ļ�  
                post_picture post_picture = new post_picture();
                String storePath= "D:\\AUPLOAD\\images";//��������ϴ����ļ�·��
                Date date = new Date();
                String pictureId = UUID.randomUUID().toString();
                String ctime = date.toLocaleString().toString();
                String fileName = file.getOriginalFilename();
                String pic_name = pictureId+fileName;	//����Ψһ��ͼƬ����
                File filepath = new File(storePath, fileName);
                post_picture.setPictureName(pic_name);
                post_picture.setPictureCreattime(ctime);
                post_picture.setPictureId(pictureId);
                post_picture.setPictureIsdelete("0");
                post_picture.setPictureBelong(user_id);
                int a = post_pictureService.insert(post_picture);
                System.out.println("����"+a+"postͼƬ!!");
                
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
		System.out.println("postController====postContent==" + postContent);
		if (sessionUser.getUserNickname() != null) {
			String postAuthor = sessionUser.getUserNickname();
			String postId = UUID.randomUUID().toString();
			Date date = new Date();
			String ctime = date.toLocaleString().toString();
			post.setPostAuthor(postAuthor);
			post.setPostContent(postContent);
			post.setPostId(postId);
			post.setPostIsdelete("0");
			post.setPostBarId("123");
			post.setPostUserId(user_id);
			post.setPostTitle(postTitle);
			post.setPostCreattime(ctime);
			if (post != null) {
				int a = postService.creatPost(post);
				System.out.println("controller=====post�ɹ�����" + a + "������");
				pw.write("success");
			} else {
				pw.write("error");
			}
		} else {
			pw.write("sessionError");
		}
		pw.flush();
		pw.close();
	}

    @RequestMapping(value="/springUpload",method=RequestMethod.POST)
    public String upload(@RequestParam("files") MultipartFile[] files,
            HttpServletRequest request){

    	if(files!=null && files.length>0){  
            //ѭ����ȡfile�����е��ļ�  
            for(int i = 0;i<files.length;i++){  
                MultipartFile file = files[i];  
                //�����ļ�  
                post_picture post_picture = new post_picture();
                String storePath= "D:\\AUPLOAD\\images";//��������ϴ����ļ�·��
                Date date = new Date();
                String pictureId = UUID.randomUUID().toString();
                String ctime = date.toLocaleString().toString();
                String fileName = file.getOriginalFilename();
                String pic_name = pictureId+fileName;	//����Ψһ��ͼƬ����
                File filepath = new File(storePath, fileName);
                post_picture.setPictureName(pic_name);
                post_picture.setPictureCreattime(ctime);
                post_picture.setPictureId(pictureId);
                post_picture.setPictureIsdelete("0");
                post_picture.setPictureBelong("����");
                int a = post_pictureService.insert(post_picture);
                System.out.println("����"+a+"postͼƬ");
                
                if (!filepath.getParentFile().exists()) {

                    filepath.getParentFile().mkdirs();//���Ŀ¼�����ڣ�����Ŀ¼
                }
                try {
                    file.transferTo(new File(storePath+File.separator+pic_name));//���ļ�д��Ŀ���ļ���ַ
                } catch (Exception e) {

                    e.printStackTrace();
                }
            } 
            return "success";//���ص��ɹ���ҳ��
        } else {

            return "error";//���ص�ʧ�ܵ�ҳ��
        }

    }
    
    //�����û�id��ѯ���post
    @RequestMapping(value = "/GetpostByuserId", method = RequestMethod.POST)
	@ResponseBody
	public void GetpostByuserId(HttpServletRequest request, HttpServletResponse response
			) throws IOException {
    	HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		user sessionUser = (user) session.getAttribute("user"); // sessionδ��¼���򲻿ɷ���
		if(sessionUser!=null) {
			String user_id = sessionUser.getUserId();
			PostUserDTO PostUserDTO = postService.queryPostByUserId(user_id);
			Gson gson = new Gson();
			String res = gson.toJson(PostUserDTO);
			pw.write(res);
		}else {
			pw.write("Getpost_error");
		}
		
		
    }
}