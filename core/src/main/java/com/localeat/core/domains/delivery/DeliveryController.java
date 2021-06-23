package com.localeat.core.domains.delivery;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.order.*;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private QuantitySoldForDeliveryService quantitySoldForDeliveryService;

    @GetMapping(path = "/accounts/{account}/deliveries")
    public Iterable<Delivery> getBreedersDeliveries(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return deliveryRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/deliveries")
    public Iterable<Delivery> getPublicDeliveries(){
        return deliveryRepository.findPublicDeliveries();
    }

    @GetMapping(path = "/deliveries/{delivery}/animals")
    public Animal getAnimalForDelivery(@PathVariable Delivery delivery){
        return slaughterRepository.findByDelivery(delivery).getAnimal();
    }

    @GetMapping(path = "/deliveries/{delivery}/quantitySold")
    public Float getQuantitySoldForDelivery(@PathVariable Delivery delivery){
        return quantitySoldForDeliveryService.calculatePercentageSold(delivery);
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/orders")
    public Iterable<Order> getDeliveryOrders(@PathVariable Account account, @PathVariable Delivery delivery){
        checkDeliveryAccount(account, delivery);
        return orderRepository.getOrdersByDelivery(delivery);
    }

    @PostMapping(path = "/accounts/{account}/deliveries/{delivery}/orders")
    public Order saveDeliveryOrder(@PathVariable Account account, @PathVariable Delivery delivery, @Valid @RequestBody Order order){
        checkDeliveryAccount(account, delivery);
        return orderRepository.save(order);
    }

    private void checkDeliveryAccount(@PathVariable Account account, @PathVariable Delivery delivery) {
        Breeder breeder = (Breeder) account.getActor();
        Iterable<Delivery> authorizedDeliveries = deliveryRepository.findByFarm(breeder.getFarm());
        if (StreamSupport.stream(authorizedDeliveries.spliterator(), false).noneMatch(delivery::equals)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    String.format("account %s not authorized to access delivery %s", account.getId(), delivery.getId()));
        }
    }



}
