package com.baron.xiaohazhiyouapi.model.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class FeedBackReq {
    @NotBlank(message = "不能为空")
    private String phone;
    private  String content;

}
