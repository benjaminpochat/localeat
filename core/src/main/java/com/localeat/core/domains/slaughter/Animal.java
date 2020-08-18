package com.localeat.core.domains.slaughter;


import com.localeat.core.domains.farm.Farm;

import javax.persistence.*;

@Entity
@Table(name = "animals")
class Animal implements com.localeat.model.domains.slaughter.Animal<AnimalType, Farm> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "animal_id_generator")
    @SequenceGenerator(name="animal_id_generator", sequenceName = "animal_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private AnimalType animalType;

    private float liveWeight;

    private float meatWeight;

    @ManyToOne
    private Farm finalFarm;

    private String identificationNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public AnimalType getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalType animalType) {
        this.animalType = animalType;
    }

    @Override
    public float getLiveWeight() {
        return liveWeight;
    }

    public void setLiveWeight(float liveWeight) {
        this.liveWeight = liveWeight;
    }

    @Override
    public float getMeatWeight() {
        return meatWeight;
    }

    public void setMeatWeight(float meatWeight) {
        this.meatWeight = meatWeight;
    }

    @Override
    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    @Override
    public Farm getFinalFarm() {
        return finalFarm;
    }

    public void setFinalFarm(Farm finalFarm) {
        this.finalFarm = finalFarm;
    }
}
