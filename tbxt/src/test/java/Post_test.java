import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.postMapper;
import com.pxxy.service.postService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath*:spring/applicationContext-transaction.xml", "classpath*:spring/applicationContext-mybatis.xml","classpath*:spring/applicationContext.xml"})
public class Post_test {

	@Autowired
	private  postMapper postMapper;
	
	@Autowired
	private postService postService;
	
	@Test
	public void test22() {
		postService.test();
	}
	
	@Test
	public void test11() {
		String userId = "e7f19db3-8a3a-472c-891a-b7ae776cfd01";
		PostUserDTO PostUserDTO = postMapper.queryPostByUserId(userId);
		System.out.println("PostUserDTO"+PostUserDTO);
		System.out.println("获取的barList的长度=="+PostUserDTO.getPost_barList().size());
		System.out.println("PostUserDTOBar===="+PostUserDTO.getPostList().get(0).getPostTitle());
		System.out.println("PostUserDTOBar===="+PostUserDTO.getPostList().get(1).getPostTitle());
		System.out.println("PostUserDTOBar===="+PostUserDTO.getPostList().get(2).getPostTitle());
	}
}
