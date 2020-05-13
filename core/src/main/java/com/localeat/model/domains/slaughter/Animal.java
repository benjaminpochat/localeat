package com.localeat.model.domains.slaughter;

public interface Animal<AT extends AnimalType> {
    AT getAnimalType();
    String getIdentificationNumber();
    String getFinalFarm();
    float getLiveWeight();
    float getMeatWeight();
}
