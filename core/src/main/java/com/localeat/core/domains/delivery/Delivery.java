package com.localeat.core.domains.delivery;

import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.product.Product;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "deliveries")
public class Delivery implements com.localeat.model.domains.delivery.Delivery<Order, Address, Product> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_id_generator")
    @SequenceGenerator(name="delivery_id_generator", sequenceName = "delivery_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Address deliveryAddress;

    private LocalDateTime deliveryStart;

    private LocalDateTime deliveryEnd;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="delivery_available_products")
    private Set<Product> availableProducts;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Order> orders;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    @Override
    public Set<Product> getAvailableProducts() {
        return availableProducts;
    }

    public void setAvailableProducts(Set<Product> availableProducts) {
        this.availableProducts = availableProducts;
    }

    @Override
    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    @Override
    public LocalDateTime getDeliveryStart() {
        return deliveryStart;
    }

    public void setDeliveryStart(LocalDateTime deliveryStart) {
        this.deliveryStart = deliveryStart;
    }

    @Override
    public LocalDateTime getDeliveryEnd() {
        return deliveryEnd;
    }

    public void setDeliveryEnd(LocalDateTime deliveryEnd) {
        this.deliveryEnd = deliveryEnd;
    }
}
