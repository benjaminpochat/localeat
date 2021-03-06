package com.localeat.core.domains.order;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends CrudRepository<Order, Long> {
    @Query("SELECT o FROM Order o " +
            "WHERE o.customer = :customer ")
    Iterable<Order> findByCustomer(@Param("customer") Customer customer);

    @Query("SELECT o FROM Order o " +
            "WHERE o.delivery = :delivery ")
    Iterable<Order> getOrdersByDelivery(@Param("delivery") Delivery delivery);
}
