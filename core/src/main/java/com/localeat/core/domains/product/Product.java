package com.localeat.core.domains.product;

import com.localeat.core.domains.farm.Farm;

import javax.persistence.*;

/**
 * A product is something that can be sold by a {@link Farm}.
 * To be sold, a {@link Batch} of products must created and exposed to customers.
 * <br>
 * The unit for quantity is kilograms.
 * The unit price is tax free.
 * The unit price is per kilogram.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_generator")
    @SequenceGenerator(name="product_id_generator", sequenceName = "product_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String name;

    private String description;

    private float unitPrice;

    private float quantity;

    /** the product's photo, base64 encoded  */
    @Lob
    private String photo;

    @ManyToOne
    private Farm farm;

    public Product(String id) {
        this.id = Long.valueOf(id);
    }

    public Product(){
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

}
