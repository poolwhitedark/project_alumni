package com.baron.xiaohazhiyouapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baron.xiaohazhiyouapi.model.entity.Major;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface MajorMapper extends BaseMapper<Major> {
    @Select("select name from major where name like CONCAT('%',#{name},'%') limit 10")
    List<String> selectListByName(String name);
}
