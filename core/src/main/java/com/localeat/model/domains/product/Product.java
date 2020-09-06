package com.localeat.model.domains.product;

import com.localeat.model.domains.slaughter.Animal;

public interface Product<A extends Animal> {
    public String getDescription();
    public float getPrice();
    public byte[] getPhoto();
    public A getAnimal();
}
