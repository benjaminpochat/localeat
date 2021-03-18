package com.localeat.core.domains.delivery;

import org.springframework.stereotype.Service;

@Service
public class QuantitySoldForDeliveryService {
    public float calculatePercentageSold(Delivery delivery) {
        return delivery.getOrders().stream()
                .flatMap(order -> order.getOrderedItems().stream())
                .map(item -> item.getQuantity() * item.getUnitPrice())
                .reduce(0f, Float::sum);
    }
}
