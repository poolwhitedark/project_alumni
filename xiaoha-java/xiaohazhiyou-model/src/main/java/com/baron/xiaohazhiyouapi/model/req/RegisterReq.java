package com.baron.xiaohazhiyouapi.model.req;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@ApiModel("注册请求")
public class RegisterReq {
    @NotBlank(message = "请输入手机号")
    @Pattern(regexp = "^1\\d{10}$", message = "手机号格式错误")
    private String loginName;
    @NotBlank(message = "请输入密码")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$", message = "密码长度为6-16位,包含字母和数字")
    private String loginPwd;
    @NotBlank(message = "请输入验证码")
    @ApiModelProperty("验证码")
    private String code;

}
