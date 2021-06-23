package com.localeat.core.domains.order;

import com.localeat.core.domains.actor.Customer;
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

    @Autowired
    private OrderService createOrderService;

    @PostMapping(path = "/accounts/{account}/orders")
    public Order createOrder(@PathParam("account") Account account, @RequestBody Order order){
        Customer customer = (Customer) account.getActor();
        Order orderSaved = createOrderService.createOrder(order, customer);
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

    @GetMapping(path= "/accounts/{account}/orders/{order}")
    public Order getOrders(@PathParam("account") Account account, @PathParam("order") Order order) {
        if (!(account.getActor() instanceof Customer)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "customer account expected");
        }
        if (!order.getCustomer().equals(account.getActor())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "no access to this order");
        }
        return order;
    }
}
