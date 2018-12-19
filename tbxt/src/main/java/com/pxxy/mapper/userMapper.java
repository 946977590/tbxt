package com.pxxy.mapper;

import com.pxxy.DTO.PostUserDTO;
import com.pxxy.pojo.user;

public interface userMapper {
    int deleteByPrimaryKey(String userId);

    int insert(user record);

    int insertSelective(user record);

    user selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(user record);

    int updateByPrimaryKey(user record);
    
    user queryByUserEmail(String userEmail);
    user queryByManaUserEmail(String userEmail);
    PostUserDTO queryAllUser();
}