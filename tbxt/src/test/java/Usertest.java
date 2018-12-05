import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pxxy.pojo.post;
import com.pxxy.pojo.user;
import com.pxxy.mapper.postMapper;
import com.pxxy.mapper.userMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath*:spring/applicationContext-transaction.xml", "classpath*:spring/applicationContext-mybatis.xml","classpath*:spring/applicationContext.xml"})
public class Usertest {

	@Autowired
	private  userMapper userMapper;
	
	/*	@Autowired
	private  postMapper postMapper;*/
	
	@Test
	public void test2() {
		System.out.println("========");
		user user = new user();
		user.setUserId("781");
		user.setUserNickname("xixi");
		System.out.println("获取user的昵称为"+user.getUserNickname());
		int a = userMapper.insert(user);
		System.out.println("成功插入"+a+"数据"+user.getUserNickname());
	}
	
	@Test
	public void testWrite() {
		System.out.println("==009881=");
	}
	
	/*@Test
	public void testselectByPrimaryKey(String postId) {
		postId = "123";
		post post = postMapper.selectByPrimaryKey(postId);
		System.out.println("postId=="+post);
		
	}*/
	
}
