package com.localeat.core.domains.order;

import com.localeat.core.domains.actor.Customer;
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

    @PostMapping(path = "/accounts/{account}/orders")
    public Order createOrder(@PathParam("account") Account account, @RequestBody Order order){
        Customer customer = (Customer) account.getActor();
        order.setCustomer(customer);
        return orderRepository.save(order);
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
