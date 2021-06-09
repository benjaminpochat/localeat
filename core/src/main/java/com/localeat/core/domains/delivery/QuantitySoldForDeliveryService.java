package com.localeat.core.domains.delivery;

import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderRepository;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuantitySoldForDeliveryService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    public float calculatePercentageSold(Delivery delivery) {
        List<Order> orders = new ArrayList<>();
        orderRepository.getOrdersByDelivery(delivery).spliterator().forEachRemaining(orders::add);
        float totalWeightSold = orders.stream()
                .flatMap(order -> order.getOrderedItems().stream())
                .map(item -> item.getQuantity() * item.getBatch().getProduct().getNetWeight())
                .reduce(0f, Float::sum);
        float totalWeightToSold = slaughterRepository.findByDelivery(delivery).getAnimal().getMeatWeight();
        return totalWeightSold / totalWeightToSold;
    }
}
