package com.localeat.core.domains.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.Product;

import javax.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_id_generator")
    @SequenceGenerator(name="order_item_id_generator", sequenceName = "order_item_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Batch batch;

    @ManyToOne
    @JsonBackReference
    private Order order;

    private Float unitPrice;

    private Float quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Batch getBatch() {
        return batch;
    }

    public void setBatch(Batch batch) {
        this.batch = batch;
    }

    public Float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }


}
