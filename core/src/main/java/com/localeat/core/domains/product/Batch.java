package com.localeat.core.domains.product;

import com.localeat.core.domains.slaughter.Animal;

import javax.persistence.*;

/**
 * A batch is a set of available products, produced from a given {@link Animal}.<br>
 * The quantity of products that constitutes a batch is limited by animal's weight.<br>
 * For each batch, a unit price is given.<br>
 * <br>
 * The unit for the quantity and the unit price is always "kilograms".
 */
@Entity
@Table(name = "batches")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "batch_id_generator")
    @SequenceGenerator(name="batch_id_generator", sequenceName = "batch_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Animal animal;

    /** the available quantity of products for this batch */
    private int quantity;

    private float unitPrice;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(float unitPrice) {
        this.unitPrice = unitPrice;
    }
}
