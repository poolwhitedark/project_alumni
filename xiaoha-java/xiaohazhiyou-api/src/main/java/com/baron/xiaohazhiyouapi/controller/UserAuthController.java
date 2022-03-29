package com.baron.xiaohazhiyouapi.controller;

import com.baron.xiaohazhiyouapi.model.req.LoginReq;
import com.baron.xiaohazhiyouapi.model.req.RegisterReq;
import com.baron.xiaohazhiyouapi.model.result.UnifyResponse;
import com.baron.xiaohazhiyouapi.service.UserAuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;

@Api(tags = "用户服务Api")
@RestController
public class UserAuthController {
    @Resource
    UserAuthService userAuthService;
    @Autowired
    @Qualifier("authenticationManagerBean")
    AuthenticationManager authenticationManager;

  @ApiOperation(value = "注册",httpMethod = "POST")
  @PostMapping("/register")
    public UnifyResponse<String> register(@Valid @RequestBody RegisterReq registerReq){
      userAuthService.register(registerReq);
      return UnifyResponse.success("注册成功");

  }
@ApiOperation(value = "登录",httpMethod = "POST")
    @PostMapping("/login")
    public UnifyResponse<String>login(@Valid @RequestBody LoginReq loginReq){
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
    return UnifyResponse.success("login ");
}
@ApiOperation(value = "测试",httpMethod = "GET")
    @GetMapping("/test")
    public UnifyResponse<String> test(){
      return UnifyResponse.success("text");
}

}
