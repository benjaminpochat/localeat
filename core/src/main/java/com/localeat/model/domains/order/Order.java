package com.localeat.model.domains.order;

import com.localeat.model.domains.actor.Customer;
import com.localeat.model.domains.delivery.Delivery;
import com.localeat.model.domains.product.Product;

import java.util.Map;

public interface Order<C extends Customer, P extends Product, D extends Delivery> {
    public C getCustomer();

    public Map<P, Integer> getOrderedItems();

    public D getDelivery();
}
