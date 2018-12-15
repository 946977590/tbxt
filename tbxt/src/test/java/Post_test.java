import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
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
}
