package com.localeat.core.domains.delivery;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.order.*;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping(path = "/accounts/{account}/deliveries")
    public Iterable<Delivery> getBreedersDeliveries(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return deliveryRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/deliveries")
    public Iterable<Delivery> getPublicDeliveries(){
        return deliveryRepository.findPublicDeliveries();
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/orders")
    public Iterable<Order> getDeliveryOrders(@PathVariable Account account, @PathVariable Delivery delivery){
        Breeder breeder = (Breeder) account.getActor();
        Iterable<Delivery> authorizedDeliveries = deliveryRepository.findByFarm(breeder.getFarm());
        if (StreamSupport.stream(authorizedDeliveries.spliterator(), false).noneMatch(delivery::equals)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    String.format("account #{} not authorized to access delivery #{}", new Object[]{account.getId(), delivery.getId()}));
        }
        return orderRepository.getOrdersByDelivery(delivery);
    }

    public void updateQuantitySoldInBatches(Delivery delivery) {
        StreamSupport.stream(orderItemRepository.findByDelivery(delivery).spliterator(), false)
                .filter(orderItem -> !OrderStatus.CANCELLED.equals(orderItem.getOrder().getStatus()))                // Stream<Order>
                .collect(Collectors.groupingBy(OrderItem::getBatch, Collectors.summingInt(OrderItem::getQuantity)))  // Map<Batch, Long>
                .entrySet()
                .forEach(entry -> {
                    Batch batch = entry.getKey();
                    batch.setQuantitySold(entry.getValue().intValue());
                    batchRepository.save(batch);
                });
    }
}
