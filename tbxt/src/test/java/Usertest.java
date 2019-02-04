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
	
	@Autowired
	private com.pxxy.service.userService userService;
	
	@Test
	public void test2() {
		System.out.println("========");
		int a = (int) (Math.random()*1000000);
//	    for(int j = 0; j< 10; j++){
//	        System.out.println((int)((Math.random()*9+1)*100000));
//	    }
	    System.out.println("a=="+a);
	}
	
	@Test
	public void testWrite() {
		String userId1="014f8208-2618-4753-8fc8-4fae30efa9e1";
		String userId2="hh";
		user user1 = userMapper.selectByPrimaryKey(userId1);
		user user2 = userMapper.selectByPrimaryKey(userId2);
		System.out.println("==user1="+user1);
		System.out.println("==user2="+user2);
	}
	
	/*@Test
	public void testselectByPrimaryKey(String postId) {
		postId = "123";
		post post = postMapper.selectByPrimaryKey(postId);
		System.out.println("postId=="+post);
		
	}*/
	
	@Test
	public void testTranfer() {
		userService.tranferIn("f931b368-1dea-44b5-bea6-7366c0533448", "e7f19db3-8a3a-472c-891a-b7ae776cfd01", "10");
	}
}
