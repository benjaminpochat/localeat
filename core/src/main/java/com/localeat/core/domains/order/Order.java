package com.localeat.core.domains.order;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;

import javax.persistence.*;
import java.util.Set;

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

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "order")
    @JsonManagedReference
    private Set<OrderItem> orderedItems;

    @OneToOne
    private Delivery delivery;

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
        return orderedItems;
    }

    public void setOrderedItems(Set<OrderItem> orderedItems) {
        this.orderedItems = orderedItems;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }
}
