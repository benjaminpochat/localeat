package com.localeat.core.domains.order;

import com.localeat.core.domains.delivery.Delivery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
    @Query("SELECT i FROM OrderItem i "
            + "INNER JOIN i.order o "
            + "WHERE o.delivery = :delivery ")
    Iterable<OrderItem> findByDelivery(@Param("delivery") Delivery delivery);

}
