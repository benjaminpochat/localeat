package com.localeat.core.domains.delivery;

import com.localeat.core.domains.order.*;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static com.localeat.core.domains.order.OrderStatus.BOOKED;
import static com.localeat.core.domains.order.OrderStatus.PAYED;

@Service
public class QuantitySoldForDeliveryService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private BatchRepository batchRepository;

    public float calculatePercentageSold(Delivery delivery) {
        List<Order> orders = new ArrayList<>();
        orderRepository.getOrdersByDelivery(delivery).spliterator().forEachRemaining(orders::add);
        float totalWeightSold = orders.stream()
                .filter(order -> Stream.of(PAYED, BOOKED).anyMatch(status -> status.equals(order.getStatus())))
                .flatMap(order -> order.getOrderedItems().stream())
                .map(item -> item.getQuantity() * item.getBatch().getProduct().getNetWeight())
                .reduce(0f, Float::sum);
        float totalWeightToSold = slaughterRepository.findByDelivery(delivery).getAnimal().getMeatWeight();
        return totalWeightSold / totalWeightToSold;
    }

    public void updateQuantitySoldInBatches(Delivery delivery) {
        StreamSupport.stream(orderItemRepository.findByDelivery(delivery).spliterator(), false)
                .filter(orderItem -> Stream.of(PAYED, BOOKED).anyMatch(status -> status.equals(orderItem.getOrder().getStatus())))  // Stream<Order>
                .collect(Collectors.groupingBy(OrderItem::getBatch, Collectors.summingInt(OrderItem::getQuantity)))  // Map<Batch, Long>
                .entrySet()
                .forEach(entry -> {
                    Batch summingBatch = entry.getKey();
                    Batch deliveryBatch = delivery.getAvailableBatches().stream().filter(batch -> batch.getId().equals(summingBatch.getId())).findFirst().orElseThrow();
                    deliveryBatch.setQuantitySold(entry.getValue().intValue());
                    batchRepository.save(deliveryBatch);
                });
    }
}
