package com.localeat.core.domains.slaughter;

enum AnimalType implements com.localeat.model.domains.slaughter.AnimalType {
    BEEF_LIMOUSINE,
    BEEF_CHAROLLAIS;

    @Override
    public String getName() {
        return name();
    }
}
