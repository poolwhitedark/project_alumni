package com.baron.xiaohazhiyouapi.Text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BussinessPerson implements Person{
    @Autowired
    Animals animals=null;
    @Override
    public void service() {
        animals.use();
    }

    @Override
    public void setAnimals() {
      this.animals=animals;
    }
}
