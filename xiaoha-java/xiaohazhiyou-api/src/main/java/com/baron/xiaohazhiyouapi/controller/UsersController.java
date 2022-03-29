package com.baron.xiaohazhiyouapi.controller;

import com.baron.xiaohazhiyouapi.mapper.MajorMapper;
import com.baron.xiaohazhiyouapi.model.result.UnifyResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@Api(tags = "用户基本信息服务")
public class UsersController {
    @Resource
    MajorMapper majorMapper;

    @ApiOperation(value = "选择专业" ,httpMethod = "GET")
    @GetMapping("/major")
    public UnifyResponse<List<String>>selectMajor(String name){
        List<String> strings = majorMapper.selectListByName(name);
        return UnifyResponse.success(strings);
    }


}
