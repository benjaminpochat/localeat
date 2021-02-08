package com.localeat.core.domains.product;

import com.localeat.core.domains.farm.Farm;
import com.localeat.core.domains.image.Image;

import javax.persistence.*;

/**
 * A product template facilitates the creation of a new {@link Product} to be sold.
 */
@Entity
@Table(name = "product_templates")
public class ProductTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_template_id_generator")
    @SequenceGenerator(name="product_template_id_generator", sequenceName = "product_template_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String name;

    private String description;

    private float unitPrice;

    private float netWeight;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Image photo;

    @ManyToOne
    private Farm farm;

    public ProductTemplate(Long id) {
        this.id = id;
    }

    public ProductTemplate() {
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

    public float getNetWeight() {
        return netWeight;
    }

    public void setNetWeight(float netWeight) {
        this.netWeight = netWeight;
    }

    public Image getPhoto() {
        return photo;
    }

    public void setPhoto(Image photo) {
        this.photo = photo;
    }

    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }
}
