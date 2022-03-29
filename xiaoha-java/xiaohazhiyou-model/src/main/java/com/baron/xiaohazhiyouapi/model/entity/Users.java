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
 * 
 * </p>
 *
 * @author WuYang
 * @since 2020-09-29
 */
@Data
@Builder
  @EqualsAndHashCode(callSuper = false)
  @Accessors(chain = true)
public class Users extends Model<Users> {

    private static final long serialVersionUID=1L;

      /**
     * 主键

     */
        @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 昵称
     */
      private String nickname;

      /**
     * 地址
     */
      private String address;

      /**
     * 头像
     */
      private String avatar;

      /**
     * 个性签名
     */
      private String introduce;

      /**
     * 性别
     */
      private String gender;

      /**
     * 喜好方向
     */
      private String prefer;

      /**
     * 学校
     */
      private String school;

      /**
     * 专业
     */
      private String major;

      /**
     * 职业
     */
      private String occupation;

      /**
     * 经纬度
     */
      private String lngLat;

      /**
     * 职业生涯描述
     */
      private String occupationDesc;

      /**
     * 是否公开 0-否 1-是
     */
      private Boolean isShow;

      /**
     * 身份 1-学生 2-职友
     */
      private Integer identityType;

    private String status;

    private String answer5;

    private String answer28;

    private String answer93;

    private String homeAddress;

    private String classes;

    private String education;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;


    @Override
    protected Serializable pkVal() {
          return this.id;
      }

}
