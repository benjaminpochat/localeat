package com.localeat.core.domains.actor;


import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.localeat.core.domains.farm.Farm;

import javax.persistence.*;

@Entity
@Table(name = "breeders")
public class Breeder extends Actor implements com.localeat.model.domains.actor.Breeder {

    @ManyToOne
    private Farm farm;

    @Override
    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }
}
