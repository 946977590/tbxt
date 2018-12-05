import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.pxxy.DTO.PostUserDTO;
import com.pxxy.mapper.post_barMapper;
import com.pxxy.pojo.post;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath*:spring/applicationContext-transaction.xml", "classpath*:spring/applicationContext-mybatis.xml","classpath*:spring/applicationContext.xml"})
public class Post_bartest {

	@Autowired
	private  post_barMapper post_barMapper;
	
	@Test
	public void test22() {
		System.out.println("==009881=");
	}
	
}
