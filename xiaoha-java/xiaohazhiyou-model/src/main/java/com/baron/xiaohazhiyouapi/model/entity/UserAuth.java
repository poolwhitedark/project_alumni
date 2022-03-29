package com.baron.xiaohazhiyouapi.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户认证表
 * </p>
 *
 * @author WuYang
 * @since 2020-09-29
 */
@Data
  @EqualsAndHashCode(callSuper = false)
  @Accessors(chain = true)
@Builder
public class UserAuth extends Model<UserAuth> {

    private static final long serialVersionUID=1L;

      @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 用户id
     */
      private Integer userId;

      /**
     * 标识（手机号或者邮箱或者用户名，第三方的唯一标识）
     */
      private String identity;

      /**
     * 密码（站内的保存密码，第三方的保存token或者不保存）
     */
      private String credential;

      /**
     * 类型(phone、email、username、weixin、qq、miniweixin)
     */
      private String authType;

      /**
     * 创建时间
     */
      private LocalDateTime createTime;


    @Override
    protected Serializable pkVal() {
          return this.id;
      }

}
