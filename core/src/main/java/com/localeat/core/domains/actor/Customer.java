package com.localeat.core.domains.actor;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.localeat.core.domains.order.Order;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "customers")
public class Customer extends Actor implements com.localeat.model.domains.actor.Customer<Order> {

    @OneToMany
    private Collection<Order> orders;

    @Override
    public Collection<Order> getOrders() {
        return orders;
    }

    public void setOrders(Collection<Order> orders) {
        this.orders = orders;
    }
}
