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
	public void test11() {
		String postId = "7eff2242-a10c-4300-b6fa-764868dcf35f";
		PostUserDTO PostUserDTO = postService.queryPostLayer(postId);
		System.out.println("PostUserDTO"+PostUserDTO);
		
	}
}
