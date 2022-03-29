package com.baron.xiaohazhiyouapi.mapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MajorMapperTest {
    @Resource
    MajorMapper majorMapper;
@Test
    void ss(){
    List<String> dsf = majorMapper.selectListByName("大数据");
    System.out.println(dsf);

}
}