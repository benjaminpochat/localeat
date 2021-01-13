package com.localeat.core.domains.actor;

import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.security.Role;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;

@Entity
@Table(name = "customers")
public class Customer extends Actor {

    @OneToMany
    private Collection<Order> orders;

    public Collection<Order> getOrders() {
        return orders;
    }

    public void setOrders(Collection<Order> orders) {
        this.orders = orders;
    }

    @Override
    public Role getRole() {
        return Role.CUSTOMER;
    }

}
