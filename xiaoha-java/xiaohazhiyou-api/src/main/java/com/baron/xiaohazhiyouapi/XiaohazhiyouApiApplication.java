package com.baron.xiaohazhiyouapi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan(basePackages = {"com.baron.xiaohazhiyouapi.mapper"})
@SpringBootApplication
public class XiaohazhiyouApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(XiaohazhiyouApiApplication.class, args);
    }

}
