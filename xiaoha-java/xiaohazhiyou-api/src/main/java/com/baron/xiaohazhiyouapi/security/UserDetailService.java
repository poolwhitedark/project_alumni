package com.baron.xiaohazhiyouapi.security;

import com.baron.xiaohazhiyouapi.mapper.UserAuthMapper;
import com.baron.xiaohazhiyouapi.model.JwtUser;
import com.baron.xiaohazhiyouapi.model.entity.UserAuth;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserDetailService implements UserDetailsService {
    @Resource
    UserAuthMapper userAuthMapper;
    @Override
    public JwtUser loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuth userAuth = userAuthMapper.findByIdentity(username);
        return new JwtUser(userAuth.getUserId(), userAuth.getIdentity(), userAuth.getCredential(), userAuth.getAuthType());
    }
}
