package com.localeat.model.domains.slaughter;

import com.localeat.model.domains.delivery.Delivery;
import java.time.LocalDate;

public interface Slaughter<A extends Animal, D extends Delivery> {
    public A getAnimal();
    public LocalDate getSlaughterDate();
    public D getDelivery();
}
