import java.util.List;
import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pxxy.DTO.PostByGreatReadedDTO;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.postMapper;
import com.pxxy.pojo.post_great;
import com.pxxy.service.postService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath*:spring/applicationContext-transaction.xml", "classpath*:spring/applicationContext-mybatis.xml","classpath*:spring/applicationContext.xml"})
public class Post_test {

	@Autowired
	private  postMapper postMapper;
	
	@Autowired
	private postService postService;
	
	
	@Test
	public void test11() {
		String postId = "7eff2242-a10c-4300-b6fa-764868dcf35f";
		String userId = "e7f19db3-8a3a-472c-891a-b7ae776cfd01";
		post_great great = postMapper.judgeGreat(postId, userId);
//		post_great great2 = postMapper.judgeGreat2(postId,userId);
		System.out.println("great"+great);
		
	}
	
	@Test
	public void test12() {
		String postId = "7eff2242-a10c-4300-b6fa-764868dcf35f";
		String userId = "e7f19db3-8a3a-472c-891a-b7ae776cfd01";
		String greatId = "9";
//		postMapper.delGreat(greatId);
		postMapper.greatAdd(postId, userId, greatId);
		System.out.println("删除数据成功！");
	}
	
	@Test
	public void test13() {
		ArrayList postIdList = (ArrayList) postMapper.queryTopPostId();
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postIdList.set(i, postId);
		}
		System.out.println("postIdList=="+postIdList.get(0));
	}
	
	@Test
	public void test14() {
		String postId = "89de8ef1-d8f6-4457-8fcd-733fe01e2c33";
		PostByGreatReadedDTO postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
		System.out.println("postByGreatReadedDTO===="+postByGreatReadedDTO);
	}
	
	@Test
	public void test15() {
		PostUserDTO postUserDTO = new PostUserDTO();
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		//获取相关postId数组集合
		ArrayList postIdList = (ArrayList) postMapper.queryTopPostId();
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		System.out.println("Service层======postIdList==="+postIdList);
		//根据相关id获取对应的post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
			postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		}
		System.out.println("postUserDTO=="+postUserDTO);
	}
	
	@Test
	public void test16() {
		PostUserDTO postUserDTO = new PostUserDTO();
		PostByGreatReadedDTO postByGreatReadedDTO = new PostByGreatReadedDTO();
		//获取相关postId数组集合
		String barId = "123";
		ArrayList postIdList = (ArrayList) postMapper.queryBarPostId(barId);
		List<PostByGreatReadedDTO> postByGreatReadedDTOList = new ArrayList<PostByGreatReadedDTO>();
		System.out.println("Service层======postIdList==="+postIdList);
		//根据相关id获取对应的post
		for(int i=0;i<postIdList.size();i++) {
			String postId = (String) postIdList.get(i);
			postByGreatReadedDTO = postMapper.queryPostViewByGreatReaded(postId);
			postByGreatReadedDTOList.add(postByGreatReadedDTO);
			postUserDTO.setPostByGreatReadedDTOList(postByGreatReadedDTOList);
		}
		System.out.println("postUserDTO=="+postUserDTO);
	}
}
