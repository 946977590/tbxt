package com.pxxy.test;
import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pxxy.pojo.user;
import com.pxxy.mapper.userMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={ "classpath*:spring/applicationContext-transaction.xml", "classpath*:spring/applicationContext-mybatis.xml","classpath*:spring/applicationContext.xml"})
public class test {

	@Resource
	private  userMapper userMapper;
	
	@Test
	public void test2() {
		System.out.println("========");
		user user = new user();
		user.setUserId("28");
		user.setUserNickname("niuniu");
		System.out.println("获取user的昵称为"+user.getUserNickname());
		userMapper.insert(user);
		System.out.println("成功插入数据");
	}
	
	@Test
	public void jj() {
		System.out.println("123121312");
	}
	
	/*public static void main(String[] args) {
		System.out.println("========");
		user user = new user();
		user.setUserId("21");
		user.setUserNickname("niuniu");
		System.out.println("获取user的昵称为"+user.getUserNickname());
		userMapper.insert(user);
		System.out.println("成功插入数据");
	}*/
}
