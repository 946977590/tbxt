package com.pxxy.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
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
import com.google.gson.GsonBuilder;
import com.pxxy.DTO.DTOBarAndPic;
import com.pxxy.DTO.DTOgreat;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.huati;
import com.pxxy.pojo.post;
import com.pxxy.pojo.post_great;
import com.pxxy.pojo.post_picture;
import com.pxxy.pojo.post_readed;
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
			@RequestParam(required = false) String postBarId,@RequestParam(required = false) String postCategory, @RequestParam(required = false) String postTitle,
			@RequestParam(required = false) String postContent,@RequestParam(required = false) MultipartFile[] files) throws IOException {
		HttpSession session = request.getSession();
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		post post = new post();
//		System.out.println("postCategory==="+postCategory);
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		String user_id = sessionUser.getUserId();
		String postId = UUID.randomUUID().toString();
//		System.out.println("获取的files==="+files.length);
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
                post_picture.setPictureBelong(postId);
                int a = post_pictureService.insert(post_picture);
//                System.out.println("插入"+a+"post图片!!");
                
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
//		System.out.println("postController====postContent==" + postContent);
		if (sessionUser.getUserNickname() != null) {
			String postAuthor = sessionUser.getUserNickname();
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
			post.setPostCategory(postCategory);
			huati huati = new huati();
			if(postCategory != null) {
				String huatiId = UUID.randomUUID().toString();
				huati.setHuatiId(huatiId);
				huati.setHuatiContent(postCategory);
				huati.setHuatiPostId(postId);
				huati.setHuatiUserId(user_id);
				huati.setHuatiIsdelete("0");
				postService.insertHuati(huati);
			}
			if (post != null) {
				int a = postService.creatPost(post);
//				System.out.println("controller=====post成功插入" + a + "条数据");
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
//                System.out.println("插入"+a+"post图片");
                
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
//		System.out.println("sessionUsersessionUser==="+sessionUser);
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
//		System.out.println("====ppp");
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
//		if(postUserDTO.getDTOgreat() == null) {
//			postUserDTO.setDTOgreat(dTOgreat);
//		}
//		System.out.println(postUserDTO);
		Gson gson = new GsonBuilder().serializeNulls().create();	//防止Gson转Json对象空属性丢失
		String res = gson.toJson(postUserDTO);
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
  //判断点赞情况
    @RequestMapping(value = "/greatJudge", method = RequestMethod.POST)
	@ResponseBody
	public void greatJudge(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(required = false) String userId,@RequestParam String postId
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		if(sessionUser != null) {
			userId = sessionUser.getUserId();
//			System.out.println("页面获取的postId为==="+postId);
//			System.out.println("页面获取的userId为==="+userId);
			post_great great = postService.judgeGreat(postId, userId);
//			System.out.println("great===="+great);
			if(great !=null) {
				res="great_1";
			}else {
				res="great_0";
			}
		}else {
			res="session_null";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
    //点赞
    @RequestMapping(value = "/greatAdd", method = RequestMethod.POST)
	@ResponseBody
	public void greatAdd(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String postId
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		if(sessionUser != null) {
			String userId = sessionUser.getUserId();
			String greatId2 = UUID.randomUUID().toString();
//			System.out.println("点赞postId==="+postId);
			postService.greatAdd(greatId2, postId, userId);
//			System.out.println("点赞数据添加成功");
			res = "great_add";
		}else {
			res = "session_null";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
  //取消点赞
    @RequestMapping(value = "/greatDel", method = RequestMethod.POST)
	@ResponseBody
	public void greatDel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String postId
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		if(sessionUser != null) {
			String userId = sessionUser.getUserId();
			post_great great = postService.judgeGreat(postId, userId);
			if(great!=null) {
				String greatId = great.getGreatId();
				postService.delGreat(greatId);
//				System.out.println("点赞数据删除成功");
				res = "great_del";
			}else {
				res = "del_error";
			}
		}else {
			res = "session_null";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
  //获取点赞数量
    @RequestMapping(value = "/GetgreatNum", method = RequestMethod.POST)
	@ResponseBody
	public void GetgreatNum(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String postId
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
//		System.out.println("点赞postId==="+postId);
		DTOgreat DTO_great = postService.queryPostLayer_great(postId);
		Gson gson = new GsonBuilder().serializeNulls().create();
		res = gson.toJson(DTO_great);
//		System.out.println("DTO_greatDTO_greatDTO_great==="+DTO_great);
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
  //评论
    @RequestMapping(value = "/CommentsAdd", method = RequestMethod.POST)
	@ResponseBody
	public void CommentsAdd(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String postId,@RequestParam(required=false) String bUserId,@RequestParam String topicContent
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		HttpSession session = request.getSession();
		user sessionUser = (user) session.getAttribute("user"); // session未登录，则不可发帖
		if(sessionUser != null) {
			String userId = sessionUser.getUserId();
			String topicId = UUID.randomUUID().toString();
			postService.commentAdd(topicId, postId, userId, bUserId, topicContent);
			res = "success";
		}else {
			res = "session_null";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
  //贴吧首页post推荐
    @RequestMapping(value = "/queryTopPostView", method = RequestMethod.POST)
	@ResponseBody
	public void queryTopPostView(HttpServletRequest request, HttpServletResponse response
			) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		Gson gson = new Gson();
		PostUserDTO postUserDTO = postService.queryTopPostView();
		if(postUserDTO != null) {
			res = gson.toJson(postUserDTO);
		}else {
			res = "error";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
    //贴吧内部post详情
    @RequestMapping(value = "/queryBarPostView", method = RequestMethod.POST)
	@ResponseBody
	public void queryBarPostView(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String barId) throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		Gson gson = new Gson();
		PostUserDTO postUserDTO = postService.queryBarPostView(barId);
		if(postUserDTO != null) {
			res = gson.toJson(postUserDTO);
		}else {
			res = "error";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
    //查询所有贴吧  ==首页左侧
    @RequestMapping(value = "/queryAllBar", method = RequestMethod.POST)
	@ResponseBody
	public void queryAllBar(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
    	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter pw = response.getWriter();
		String res = "";
		Gson gson = new Gson();
		PostUserDTO postUserDTO = postService.queryAllBar();
		if(postUserDTO != null) {
			res = gson.toJson(postUserDTO);
		}else {
			res = "error";
		}
		pw.write(res);
		pw.flush();
		pw.close();
    }
    
  //后台查询所有帖子
    @RequestMapping(value = "/selectAllPostInBack", method = RequestMethod.POST)
   	@ResponseBody
   	public DTOBarAndPic selectAllPostInBack() {
    	DTOBarAndPic DTOBarAndPic = postService.selectAllPostInBack();
    	return DTOBarAndPic;
    }
    
  //后台查询所有公告
    @RequestMapping(value = "/selectAllAnnounces", method = RequestMethod.POST)
   	@ResponseBody
   	public PostUserDTO selectAllAnnounces() {
    	PostUserDTO postUserDTO = postService.selectAllAnnounce();
    	return postUserDTO;
    }
  //封禁帖子
  	@RequestMapping(value="/BannedPost",method=RequestMethod.POST)
  	@ResponseBody
  	public String BannedPost(@RequestParam String postId) {
  		post post = new post();
  		post.setPostId(postId);
  		post.setPostIsdelete("1");
  		postService.updateByPrimaryKeySelective(post);
  		return "banned";
  	}
  	//解除封禁
  	@RequestMapping(value="/ReBannedPost",method=RequestMethod.POST)
  	@ResponseBody
  	public String ReBannedPost(@RequestParam String postId) {
  		post post = new post();
  		post.setPostId(postId);
  		post.setPostIsdelete("0");
  		postService.updateByPrimaryKeySelective(post);
  		return "Rebanned";
  	}
  	
  	//根据id查post
  	@RequestMapping(value="/queryPostById",method=RequestMethod.POST)
  	@ResponseBody
  	public post queryPostById(@RequestParam String postId) {
  		post post = postService.selectByPrimaryKey(postId);
  		return post;
  	}
  	
  //查询图库
  	@RequestMapping(value="/queryAllPic",method=RequestMethod.POST)
  	@ResponseBody
  	public List<post_picture> queryAllPic() {
  		List<post_picture> list = postService.queryAllPic();
  		return list;
  	}
  	
  //删图
  	@RequestMapping(value="/delPic",method=RequestMethod.POST)
  	@ResponseBody
  	public String delPic(@RequestParam String pictureId) {
  		post_picture post_picture = new post_picture();
  		post_picture.setPictureId(pictureId);
  		post_picture.setPictureIsdelete("1");
  		postService.deletePic(post_picture);
  		return "success";
  	}
  	
  	//已读功能
  	@RequestMapping(value="/AddRead",method=RequestMethod.POST)
  	@ResponseBody
  	public String AddRead(HttpServletRequest request,HttpServletResponse response,@RequestParam String postId) {
  		HttpSession session = request.getSession();
  		user userSession = (user) session.getAttribute("user");
  		String  userId = "";
  		if(userSession != null) {
  			userId = userSession.getUserId();
  			List<post_readed> post_readedList = postService.judgeRead(userId,postId);
//			System.out.println("post_readed1===="+post_readedList);
//			System.out.println("postId"+postId);
  			if(post_readedList.size()==0) {
  				String readedId = UUID.randomUUID().toString();
  	  			post_readed post_readed2 = new post_readed();
  	  			post_readed2.setPostId(postId);
  	  			post_readed2.setReadedId(readedId);
  	  			post_readed2.setUserId(userId);
  	  			postService.PostreadAdd(post_readed2);
//	  	  		System.out.println("Readed");
	  	  		return "success";
  			}else {
//  				System.out.println("HaveReaded");
  				return "HaveReaded";
  			}
  		}else {
  			return "SessionError";
  		}
  	}
  	
  //查询热门话题
  	@RequestMapping(value="/queryHotHuati",method=RequestMethod.POST)
  	@ResponseBody
  	public List<huati> queryHotHuati() {
  		List<huati> list = postService.queryHotHuati();
  		return list;
  	}
}