package com.baron.xiaohazhiyouapi.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baron.xiaohazhiyouapi.model.entity.UserAuth;

/**
 * <p>
 * 用户认证表 Mapper 接口
 * </p>
 *
 * @author WuYang
 * @since 2020-09-29
 */
public interface  UserAuthMapper extends BaseMapper<UserAuth> {
    UserAuth findByUserId(Integer userId);
    UserAuth findByIdentity(String identity);

}
