package com.baron.xiaohazhiyouapi.Text;

import org.springframework.stereotype.Component;

@Component
public class Dogs implements Animals {
    @Override
    public void use() {
        System.out.println("狗"+Dogs.class.getSimpleName());
    }
}
