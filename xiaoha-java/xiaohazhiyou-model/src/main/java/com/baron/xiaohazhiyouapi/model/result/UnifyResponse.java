package com.baron.xiaohazhiyouapi.model.result;


import com.baron.xiaohazhiyouapi.model.exception.CustomExceptionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

/**
 * @Auther: dingjn
 * @Desc: 统一响应类
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UnifyResponse<T> implements Serializable {

    /* 状态码 */
    private int status;
    /* 消息 */
    private String message;
    /* 实体 */
    private T data;

    private static final int SUCCESS_CODE = 200;
    private static final String SUCCESS_MSG = "success";


    public UnifyResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public UnifyResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public UnifyResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public UnifyResponse(int status, T data) {
        this.status = status;
        this.data = data;
    }


    public static <T> UnifyResponse<T> success() {
        return new UnifyResponse<T>(SUCCESS_CODE, SUCCESS_MSG);
    }

    public static <T> UnifyResponse<T> success(T data) {
        return new UnifyResponse<T>(SUCCESS_CODE, SUCCESS_MSG, data);
    }

    public static <T> UnifyResponse<T> success(String message, T data) {
        return new UnifyResponse<T>(SUCCESS_CODE, message, data);
    }

    public static <T> UnifyResponse<T> error(int status, String message) {
        return new UnifyResponse<T>(status, message);
    }

    public static <T> UnifyResponse<T> error(String message) {
        return new UnifyResponse<T>(400, message);
    }

    public static <T> UnifyResponse<T> error(CustomExceptionType customExceptionType, String message) {
        return new UnifyResponse<T>(customExceptionType.getCode(), message);
    }

    /**
     * 是否成功 不返回给前端.
     */
    @JsonIgnore
    public boolean isSuccess() {
        return status == 1;
    }
}

