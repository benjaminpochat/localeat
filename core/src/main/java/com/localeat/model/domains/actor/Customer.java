package com.localeat.model.domains.actor;

import com.localeat.model.domains.order.Order;

import java.util.Collection;

public interface Customer<O extends Order> extends Actor {
    public Collection<O> getOrders();
}
