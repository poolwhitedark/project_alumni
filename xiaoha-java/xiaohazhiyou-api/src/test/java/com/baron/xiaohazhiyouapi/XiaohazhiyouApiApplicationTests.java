package com.baron.xiaohazhiyouapi;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

import com.baron.xiaohazhiyouapi.mapper.MajorMapper;
import com.baron.xiaohazhiyouapi.mapper.UserAuthMapper;
import com.baron.xiaohazhiyouapi.model.entity.UserAuth;
import com.baron.xiaohazhiyouapi.model.req.RegisterReq;
import com.baron.xiaohazhiyouapi.service.UserAuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;

@SpringBootTest
class XiaohazhiyouApiApplicationTests {
    @Resource
    UserAuthService userAuthService;
    @Resource
    MajorMapper majorMapper;
    @Resource
    UserAuthMapper userAuthMapper;
    private String outputDir = "F:/xiaohazhiyou/wuYang/src/main/java";


    @Test
    void contextLoads() {
        AutoGenerator autoGenerator = new AutoGenerator();
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDbType(DbType.MYSQL);
        dataSourceConfig.setUrl("jdbc:mysql://47.99.190.97:3306/xiaohazhiyou?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC");
        dataSourceConfig.setDriverName("com.mysql.cj.jdbc.Driver");
        dataSourceConfig.setUsername("root");
        dataSourceConfig.setPassword("MyNewPass4!");
        autoGenerator.setDataSource(dataSourceConfig);
        GlobalConfig globalConfig=new GlobalConfig();
        globalConfig.setOutputDir(outputDir);
        globalConfig.setOpen(false);
        globalConfig.setFileOverride(true);
        globalConfig.setActiveRecord(true);
        globalConfig.setEnableCache(false);
        globalConfig.setBaseResultMap(true);
        globalConfig.setBaseColumnList(false);
        globalConfig.setAuthor("WuYang");
        globalConfig.setServiceName("%sService");
        autoGenerator.setGlobalConfig(globalConfig);
        PackageConfig packageConfig = new PackageConfig();
        packageConfig.setParent("com.example.demo");
//        packageConfig.setModuleName("generator");
        packageConfig.setController("");
        packageConfig.setService("service");
        packageConfig.setServiceImpl("service.impl");
        packageConfig.setMapper("mapper");
        packageConfig.setEntity("entity");
        autoGenerator.setPackageInfo(packageConfig);
        StrategyConfig strategyConfig = new StrategyConfig();
        strategyConfig.setEntityLombokModel(true);
        strategyConfig.setNaming(NamingStrategy.underline_to_camel);
        strategyConfig.setColumnNaming(NamingStrategy.underline_to_camel);
        autoGenerator.setStrategy(strategyConfig);
        autoGenerator.execute();
    }
@Test
    void testMapper(){
    UserAuth byUserId = userAuthMapper.findByUserId(101);
    System.out.println(byUserId);
}
@Test
    void fd(){
    RegisterReq registerReq = new RegisterReq();
    registerReq.setLoginName("54");
    registerReq.setCode("1532");
    registerReq.setLoginPwd("dsf");
    userAuthService.register(registerReq);
}
@Test
    void df(){
    UserAuth byIdentity = userAuthMapper.findByIdentity("15857172791");
    System.out.println(byIdentity);
}
    @Test
    void ss(){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        System.out.println(bCryptPasswordEncoder.encode("huoxuba0"));
    }
//    @Test
//    void dsf(){
//        animals.use();
//    }
    @Test
    void sdf(){

    }
}
