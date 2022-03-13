package com.localeat.core.domains.order;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.EAGER;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id_generator")
    @SequenceGenerator(name="order_id_generator", sequenceName = "order_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Customer customer;

    @OneToMany(fetch = EAGER, cascade = {ALL}, mappedBy = "order")
    @JsonManagedReference
    private Set<OrderItem> orderedItems = new HashSet<>();

    @OneToOne
    private Delivery delivery;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDateTime paymentDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<OrderItem> getOrderedItems() {
        return Collections.unmodifiableSet(orderedItems);
    }

    public void setOrderedItems(Set<OrderItem> orderedItems) {
        this.orderedItems.clear();
        this.orderedItems.addAll(orderedItems);
    }

    public void addToOrderedItems(OrderItem orderedItem) {
        this.orderedItems.add(orderedItem);
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
