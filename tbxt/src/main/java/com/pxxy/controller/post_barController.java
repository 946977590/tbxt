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
import com.pxxy.pojo.announces;
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
		@RequestParam String barName,@RequestParam(required = false) MultipartFile file,
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
			post_bar.setBarLeader("CharmK");
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
	@RequestMapping(value="/queryAllBarInBackFY",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO querAllBarFY(@RequestParam int preNum,@RequestParam int pageSize) {
		PostUserDTO postUserDTO = post_barService.selectAllBarFY(preNum, pageSize);
		return postUserDTO;
	}
	//�ؼ��ֲ�bar
	@RequestMapping(value="/queryAllBarByKW",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryAllBarByKW(@RequestParam String barName,@RequestParam int preNum,@RequestParam int pageSize) {
		PostUserDTO postUserDTO = post_barService.selectBarByKW(barName,preNum,pageSize);
//		System.out.println("postUserDTO="+postUserDTO);
		return postUserDTO;
	}
	//���bar
	@RequestMapping(value="/BannedBar",method=RequestMethod.POST)
	@ResponseBody
	public String BannedBar(@RequestParam String barId) {
		post_bar post_bar = new post_bar();
		post_bar.setBarId(barId);
		post_bar.setBarIsdelete("1");
		post_barService.updateByPrimaryKeySelective(post_bar);
		return "banned";
	}
	//������
	@RequestMapping(value="/ReBannedBar",method=RequestMethod.POST)
	@ResponseBody
	public String ReBannedBar(@RequestParam String barId) {
		post_bar post_bar = new post_bar();
		post_bar.setBarId(barId);
		post_bar.setBarIsdelete("0");
		post_barService.updateByPrimaryKeySelective(post_bar);
		return "Rebanned";
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
	
	//����id�鹫��
	@RequestMapping(value="/queryGGByid",method=RequestMethod.POST)
	@ResponseBody
	public announces queryGGByid(@RequestParam String announceId) {
		announces announces = post_barService.selectAnnouncesByKey(announceId);
		return announces;
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
	//��ӹ���
	@RequestMapping(value="/announcesAdd",method=RequestMethod.POST)
	@ResponseBody
	public String announcesAdd(@RequestParam 
			String announceTitle,@RequestParam String announceContent) 
	{
		String announceId = UUID.randomUUID().toString();
		Date date = new Date();
		String announceCreattime = date.toLocaleString().toString();
		announces announces = new announces();
		announces.setAnnounceContent(announceContent);
		announces.setAnnounceId(announceId);
		announces.setAnnounceCreattime(announceCreattime);
		announces.setAnnounceTitle(announceTitle);
		post_barService.insertGG(announces);
		return "success";
	}
	
	//���Ĺ���
	@RequestMapping(value="/announcesUpdate",method=RequestMethod.POST)
	@ResponseBody
	public String announcesUpdate(@RequestParam String announceId,
			@RequestParam String announceTitle,@RequestParam String announceContent) 
	{
		announces announces = new announces();
		Date date = new Date();
		String announceModifytime = date.toLocaleString().toString();
		announces.setAnnounceId(announceId);
		announces.setAnnounceContent(announceContent);
		announces.setAnnounceId(announceId);
		announces.setAnnounceModifytime(announceModifytime);
		announces.setAnnounceTitle(announceTitle);
		post_barService.updateGG(announces);
		return "success";
	}
	
	//��ѯ����ById
	@RequestMapping(value="/GetAnnouncesBy",method=RequestMethod.POST)
	@ResponseBody
	public announces GetAnnouncesBy(@RequestParam String announceId) 
	{
		announces announces = post_barService.selectAnnouncesByKey(announceId);
		return announces;
	}
	
	//���bar
	@RequestMapping(value="/BannedAnnounce",method=RequestMethod.POST)
	@ResponseBody
	public String BannedAnnounce(@RequestParam String announceId) {
		announces announces = new announces();
		announces.setAnnounceId(announceId);
		announces.setAnnounceIsdelete("1");
		post_barService.updateGG(announces);
		return "banned";
	}
	//������
	@RequestMapping(value="/ReBannedAnnounce",method=RequestMethod.POST)
	@ResponseBody
	public String ReBannedAnnounce(@RequestParam String announceId) {
		announces announces = new announces();
		announces.setAnnounceId(announceId);
		announces.setAnnounceIsdelete("0");
		post_barService.updateGG(announces);
		return "Rebanned";
	}
	
	//�����ֲ�ͼ��������
	@RequestMapping(value="/updateSlideHuati",method=RequestMethod.POST)
	@ResponseBody
	public String updateSlideHuati(@RequestParam String pictureId,@RequestParam String pictureBelong) {
		post_picture post_picture = new post_picture();
		post_picture.setPictureId(pictureId);
		post_picture.setPictureBelong(pictureBelong);
		post_barService.updateByPrimaryKeySelective(post_picture);
		return "success";
	}
	
	//����name��ѯ����
	@RequestMapping(value="/queryBarByName",method=RequestMethod.POST)
	@ResponseBody
	public post_bar queryBarByName(@RequestParam String barName) {
		post_bar post_bar = post_barService.queryBarByName(barName);
		if(post_bar != null) {
			return post_bar;
		}else {
			return null;
		}
	}
	
	//��ѯ���й���
	@RequestMapping(value="/queryAnnounceBack",method=RequestMethod.POST)
	@ResponseBody
	public PostUserDTO queryAnnounceBack() {
		PostUserDTO postUserDTO = post_barService.selectAnnounceBack();
		return postUserDTO;
	}
	
}
