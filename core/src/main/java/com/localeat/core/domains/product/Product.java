package com.localeat.core.domains.product;

import com.localeat.core.domains.slaughter.Animal;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product implements com.localeat.model.domains.product.Product<Animal> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_generator")
    @SequenceGenerator(name="product_id_generator", sequenceName = "product_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String description;

    private float price;

    private byte[] photo;

    @OneToOne(cascade = CascadeType.ALL)
    private Animal animal;

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

    @Override
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
