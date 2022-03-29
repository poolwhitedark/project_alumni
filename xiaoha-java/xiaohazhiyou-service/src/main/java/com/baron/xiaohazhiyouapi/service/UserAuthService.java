package com.baron.xiaohazhiyouapi.service;

import com.baron.xiaohazhiyouapi.mapper.UserAuthMapper;
import com.baron.xiaohazhiyouapi.mapper.UserMapper;
import com.baron.xiaohazhiyouapi.model.constants.TypeConstant;
import com.baron.xiaohazhiyouapi.model.entity.UserAuth;
import com.baron.xiaohazhiyouapi.model.entity.Users;
import com.baron.xiaohazhiyouapi.model.req.RegisterReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class UserAuthService {
    @Resource
    UserMapper userMapper;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Resource
    UserAuthMapper userAuthMapper;

    @Transactional
    public void register(RegisterReq req) {
        Users users = Users.builder()
                .address("")
                .avatar("")
                .gender("")
                .introduce("")
                .nickname("")
                .school("")
                .major("")
                .identityType(0)
                .occupation("")
                .occupationDesc("")
                .build();
        userMapper.insert(users);
        UserAuth userAuth=UserAuth.builder()
                .userId(users.getId())
                .identity(req.getLoginName())
                .credential(req.getLoginPwd())
                .authType(TypeConstant.AuthType.PHONE)
                .credential(passwordEncoder.encode(req.getLoginPwd())).build();
        userAuthMapper.insert(userAuth);

    }
}
