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
 * @since 2020-10-10
 */
@Data
  @EqualsAndHashCode(callSuper = false)
  @Accessors(chain = true)
@Builder
public class FeedBack extends Model<FeedBack> {

    private static final long serialVersionUID=1L;

      @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

      /**
     * 内容
     */
      private String content;

      /**
     * 手机号
     */
      private String phone;

    private LocalDateTime createTime;


    @Override
    protected Serializable pkVal() {
          return this.id;
      }

}
