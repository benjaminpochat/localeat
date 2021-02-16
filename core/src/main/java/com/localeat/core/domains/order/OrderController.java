package com.localeat.core.domains.order;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.delivery.DeliveryController;
import com.localeat.core.domains.delivery.DeliveryRepository;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.websocket.server.PathParam;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryController deliveryController;

    @Autowired
    private OrderNotificationToCustomerService orderNotificationToCustomerService;

    @Autowired
    private OrderNotificationToBreederService orderNotificationToBreederService;

    @PostMapping(path = "/accounts/{account}/orders")
    public Order createOrder(@PathParam("account") Account account, @RequestBody Order order){
        Customer customer = (Customer) account.getActor();
        order.setCustomer(customer);
        Delivery delivery = deliveryRepository.findById(order.getDelivery().getId()).orElseThrow();
        deliveryController.updateQuantitySoldInBatches(delivery);
        Order orderSaved = orderRepository.save(order);
        orderNotificationToBreederService.notify(orderSaved);
        orderNotificationToCustomerService.notify(orderSaved);
        return orderSaved;
    }

    @GetMapping(path= "/accounts/{account}/orders")
    public Iterable<Order> getOrders(@PathParam("account") Account account) {
        if (account.getActor() instanceof Customer) {
            Customer customer = (Customer) account.getActor();
            return orderRepository.findByCustomer(customer);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "customer account expected");
    }
}
