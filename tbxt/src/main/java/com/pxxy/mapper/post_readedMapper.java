package com.pxxy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.pxxy.pojo.post_readed;

public interface post_readedMapper {
    int deleteByPrimaryKey(String readedId);

    int insert(post_readed record);

    int insertSelective(post_readed record);

    post_readed selectByPrimaryKey(String readedId);

    int updateByPrimaryKeySelective(post_readed record);

    int updateByPrimaryKey(post_readed record);
    
    List<post_readed> judgeRead(@Param("userId")String userId,@Param("postId")String postId);
    
    int CountReaded(String postId);
    int CountReadByuser(String postId);
}