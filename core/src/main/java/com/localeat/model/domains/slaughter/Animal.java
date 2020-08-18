package com.localeat.model.domains.slaughter;

import com.localeat.model.domains.farm.Farm;

public interface Animal<T extends AnimalType, F extends Farm> {
    T getAnimalType();
    String getIdentificationNumber();
    F getFinalFarm();
    float getLiveWeight();
    float getMeatWeight();
}
