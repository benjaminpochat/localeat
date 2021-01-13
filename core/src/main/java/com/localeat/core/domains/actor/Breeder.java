package com.localeat.core.domains.actor;


import com.localeat.core.domains.farm.Farm;
import com.localeat.core.domains.security.Role;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "breeders")
public class Breeder extends Actor {

    @ManyToOne
    private Farm farm;

    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    @Override
    public Role getRole() {
        return Role.BREEDER;
    }
}
