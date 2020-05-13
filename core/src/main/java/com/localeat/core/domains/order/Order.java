package com.localeat.core.domains.order;

import com.localeat.core.domains.customer.Customer;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.product.Product;

import javax.persistence.*;
import java.util.Map;

@Entity
@Table(name = "orders")
public class Order implements com.localeat.model.domains.order.Order<Customer, Product, Delivery> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id_generator")
    @SequenceGenerator(name="order_id_generator", sequenceName = "order_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @OneToOne
    private Customer customer;

    @ElementCollection
    @CollectionTable(name="ordered_items", joinColumns=@JoinColumn(name="order_id"))
    @MapKeyColumn(name="product_id")
    @Column(name="ordered_quantity")
    private Map<Product, Integer> orderedItems;

    @OneToOne
    private Delivery delivery;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public Map<Product, Integer> getOrderedItems() {
        return orderedItems;
    }

    public void setOrderedItems(Map<Product, Integer> orderedItems) {
        this.orderedItems = orderedItems;
    }

    @Override
    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }
}
