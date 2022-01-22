package com.localeat.core.domains.delivery;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.product.Batch;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "deliveries")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_id_generator")
    @SequenceGenerator(name="delivery_id_generator", sequenceName = "delivery_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;
    
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    private Address deliveryAddress;

    private LocalDateTime deliveryStart;

    private LocalDateTime deliveryEnd;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name="delivery_available_batches")
    private Set<Batch> availableBatches;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Order> orders;

    @OneToOne(cascade = CascadeType.ALL)
    private DeliveryAccessControl accessControl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Set<Batch> getAvailableBatches() {
        return availableBatches;
    }

    public void setAvailableBatches(Set<Batch> availableBatches) {
        this.availableBatches = availableBatches;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public LocalDateTime getDeliveryStart() {
        return deliveryStart;
    }

    public void setDeliveryStart(LocalDateTime deliveryStart) {
        this.deliveryStart = deliveryStart;
    }

    public LocalDateTime getDeliveryEnd() {
        return deliveryEnd;
    }

    public void setDeliveryEnd(LocalDateTime deliveryEnd) {
        this.deliveryEnd = deliveryEnd;
    }

    public DeliveryAccessControl getAccessControl() {
        return accessControl;
    }

    public void setAccessControl(DeliveryAccessControl accessControl) {
        this.accessControl = accessControl;
    }
}
