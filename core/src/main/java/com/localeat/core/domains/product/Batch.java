package com.localeat.core.domains.product;

import com.localeat.core.domains.slaughter.Animal;

import javax.persistence.*;

/**
 * A batch is a set of available products, produced from a given {@link Animal}.<br>
 * The quantity of products that constitutes a batch is limited by animal's weight.<br>
 * For each batch, a unit price is given.<br>
 * <br>
 * The unit for the quantity is the number of products.<br>
 * <br>
 * The unit price is tax free.<br>
 */
@Entity
@Table(name = "batches")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "batch_id_generator")
    @SequenceGenerator(name="batch_id_generator", sequenceName = "batch_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Product product;

    /** the available quantity of products for this batch */
    private int quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
