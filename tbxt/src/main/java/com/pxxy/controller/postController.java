package com.pxxy.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;
import java.util.Iterator;

import javax.servlet.ServletOutputStream;
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
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		String user_id = sessionUser.getUserId();
		System.out.println("获取的files==="+files.length);
		if(files!=null && files.length>0){  
            //循环获取file数组中得文件  
            for(int i = 0;i<files.length;i++){  
                MultipartFile file = files[i];  
                //保存文件  
                post_picture post_picture = new post_picture();
                String storePath= "D:\\AUPLOAD\\images";//存放我们上传的文件路径
                Date date = new Date();
                String pictureId = UUID.randomUUID().toString();
                String ctime = date.toLocaleString().toString();
                String fileName = file.getOriginalFilename();
                String pic_name = pictureId+fileName;	//生成唯一的图片名字
                File filepath = new File(storePath, fileName);
                post_picture.setPictureName(pic_name);
                post_picture.setPictureCreattime(ctime);
                post_picture.setPictureId(pictureId);
                post_picture.setPictureIsdelete("0");
                post_picture.setPictureBelong(user_id);
                int a = post_pictureService.insert(post_picture);
                System.out.println("插入"+a+"post图片!!");
                
                if (!filepath.getParentFile().exists()) {

                    filepath.getParentFile().mkdirs();//如果目录不存在，创建目录
                }
                try {
                    file.transferTo(new File(storePath+File.separator+pic_name));//把文件写入目标文件地址
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
				System.out.println("controller=====post成功插入" + a + "条数据");
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
            //循环获取file数组中得文件  
            for(int i = 0;i<files.length;i++){  
                MultipartFile file = files[i];  
                //保存文件  
                post_picture post_picture = new post_picture();
                String storePath= "D:\\AUPLOAD\\images";//存放我们上传的文件路径
                Date date = new Date();
                String pictureId = UUID.randomUUID().toString();
                String ctime = date.toLocaleString().toString();
                String fileName = file.getOriginalFilename();
                String pic_name = pictureId+fileName;	//生成唯一的图片名字
                File filepath = new File(storePath, fileName);
                post_picture.setPictureName(pic_name);
                post_picture.setPictureCreattime(ctime);
                post_picture.setPictureId(pictureId);
                post_picture.setPictureIsdelete("0");
                post_picture.setPictureBelong("暂无");
                int a = post_pictureService.insert(post_picture);
                System.out.println("插入"+a+"post图片");
                
                if (!filepath.getParentFile().exists()) {

                    filepath.getParentFile().mkdirs();//如果目录不存在，创建目录
                }
                try {
                    file.transferTo(new File(storePath+File.separator+pic_name));//把文件写入目标文件地址
                } catch (Exception e) {

                    e.printStackTrace();
                }
            } 
            return "success";//返回到成功的页面
        } else {

            return "error";//返回到失败的页面
        }

    }
    
    //根据用户id查询相关post
    @RequestMapping(value = "/GetpostByuserId", method = RequestMethod.POST)
	@ResponseBody
	public void GetpostByuserId(HttpServletRequest request, HttpServletResponse response
			) throws IOException {
    	HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
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
    
  //测试首页推荐post
    @RequestMapping(value = "/GetpostViewByTest", method = RequestMethod.POST)
	@ResponseBody
	public void GetpostViewByTest(HttpServletRequest request, HttpServletResponse response
			) throws IOException {
    	HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		if(sessionUser!=null) {
			String userId = sessionUser.getUserId();
			PostUserDTO PostUserDTO = postService.queryPostViewByTest(userId);
			Gson gson = new Gson();
			String res = gson.toJson(PostUserDTO);
			pw.write(res);
		}
		pw.flush();
		pw.close();
    }
    
    //二进制展示图片
    @RequestMapping(value = "/IoReadImage", method = RequestMethod.GET)
	@ResponseBody
    public String IoReadImage(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(required = false) String pictureName) throws IOException {
		System.out.println("====ppp");
		pictureName = new String(pictureName.getBytes("ISO8859-1"), "UTF-8");//瑙ｅ喅鍥剧墖涓枃璺緞涔辩爜
		String linkurl = "D:\\AUPLOAD\\images\\" + pictureName;
		FileInputStream in = new FileInputStream(linkurl);
		ServletOutputStream out = null;
		response.setContentType("image/png");
		try {
			out = response.getOutputStream();
			int len = 0;
			byte[] buffer = new byte[1024 * 10];
			while ((len = in.read(buffer)) != -1) {
				out.write(buffer, 0, len);
			}
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			out.close();
			in.close();
		}
		return null;
	}
    
  //根据Postid查询post详情页
    @RequestMapping(value = "/GetpostByPostId", method = RequestMethod.POST)
	@ResponseBody
	public void GetpostByPostId(HttpServletRequest request, HttpServletResponse response,@RequestParam String postId
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		PostUserDTO postUserDTO = postService.queryPostLayer(postId);
		System.out.println(postUserDTO);
		Gson gson = new Gson();
		String res = gson.toJson(postUserDTO);
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
}