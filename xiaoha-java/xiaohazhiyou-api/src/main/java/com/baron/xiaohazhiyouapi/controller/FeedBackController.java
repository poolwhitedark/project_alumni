package com.baron.xiaohazhiyouapi.controller;

import com.baron.xiaohazhiyouapi.mapper.FeedBackMapper;
import com.baron.xiaohazhiyouapi.model.entity.FeedBack;
import com.baron.xiaohazhiyouapi.model.req.FeedBackReq;
import com.baron.xiaohazhiyouapi.model.result.UnifyResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@Api(tags = "用户反馈")
public class FeedBackController {
    @Resource
    FeedBackMapper feedBackMapper;

    @ApiOperation(value = "提交反馈",httpMethod = "POST")
    @PostMapping("/feed_back")
    public UnifyResponse<String> commitFeedBack(@RequestBody @Valid FeedBackReq feedBackReq){
      if (feedBackReq.getContent().length()<10){
          return UnifyResponse.error("字太少了");
      }
        feedBackMapper.insert(  FeedBack.builder().phone(feedBackReq.getPhone()).content(feedBackReq.getContent()).build());
        return UnifyResponse.success("提交成功");
    }
}
