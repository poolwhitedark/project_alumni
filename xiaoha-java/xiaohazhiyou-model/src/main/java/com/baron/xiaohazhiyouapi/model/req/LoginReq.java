package com.baron.xiaohazhiyouapi.model.req;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class LoginReq {
    @Pattern(regexp = "^1\\d{10}$", message = "手机号格式错误")
    @NotBlank(message = "用户名不能为空")
    @ApiModelProperty("手机号/用户名")
    private String username;
    @NotBlank(message = "密码不能为空")
    @ApiModelProperty("密码")
    private String password;

//    @ApiModelProperty("经度")
//    private String lng;
//
//    @ApiModelProperty("纬度")
//    private String lat;
//
//    @ApiModelProperty("1-账号密码登录 2-验证码登录")
//    private Integer type;
//
//    @ApiModelProperty("验证码")
//    private String vcode;
    //
//    @ApiModelProperty("wx.login()获得的code，非cloudID")
//    private String code;
//
//    private String rawData;
//
//    private String signature;
}
