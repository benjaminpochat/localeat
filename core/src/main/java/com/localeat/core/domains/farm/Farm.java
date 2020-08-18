package com.localeat.core.domains.farm;

import javax.persistence.*;

@Entity
@Table(name = "farms")
public class Farm implements com.localeat.model.domains.farm.Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "farm_id_generator")
    @SequenceGenerator(name="farm_id_generator", sequenceName = "farm_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    Long id;

    String farmName;

    String farmDescription;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    @Override
    public String getFarmName() {
        return farmName;
    }

    public void setFarmDescrition(String farmDescrition) {
        this.farmDescription = farmDescrition;
    }

    @Override
    public String getFarmDescription() {
        return farmDescription;
    }
}
