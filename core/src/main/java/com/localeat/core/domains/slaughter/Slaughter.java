package com.localeat.core.domains.slaughter;


import com.localeat.core.domains.delivery.Delivery;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "slaughters")
public class Slaughter implements com.localeat.model.domains.slaughter.Slaughter<Animal, Delivery> {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "slaughter_id_generator")
    @SequenceGenerator(name="slaughter_id_generator", sequenceName = "slaughter_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Animal animal;

    @OneToOne(cascade = CascadeType.ALL)
    private Delivery delivery;

    private LocalDate slaughterDate;

    private LocalDate cuttingDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    @Override
    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    @Override
    public LocalDate getSlaughterDate() {
        return slaughterDate;
    }

    public void setSlaughterDate(LocalDate slaughterDate) {
        this.slaughterDate = slaughterDate;
    }

    @Override
    public LocalDate getCuttingDate() {
        return cuttingDate;
    }

    public void setCuttingDate(LocalDate cuttingDate) {
        this.cuttingDate = cuttingDate;
    }
}
