package com.baron.xiaohazhiyouapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baron.xiaohazhiyouapi.model.entity.Users;

public interface UserMapper extends BaseMapper<Users> {
    Users findUserById(Integer userId);
}
