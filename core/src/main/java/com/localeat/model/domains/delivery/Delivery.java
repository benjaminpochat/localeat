package com.localeat.model.domains.delivery;

import com.localeat.model.domains.order.Order;
import com.localeat.model.domains.product.Product;

import java.time.LocalDateTime;
import java.util.Collection;

public interface Delivery<O extends Order, A extends Address, P extends Product> {
    public LocalDateTime getDeliveryDate();
    public A getDeliveryAddress();
    public Collection<P> getAvailableProducts();
    public Collection<O> getOrders();
}
