package com.localeat.core.domains.slaughter;


import com.localeat.core.domains.delivery.Delivery;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "slaughters")
public class Slaughter {

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
    private String slaughterPlace;
    private String slaughterHouse;
    private String cuttingPlace;
    private String cuttingButcher;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public LocalDate getSlaughterDate() {
        return slaughterDate;
    }

    public void setSlaughterDate(LocalDate slaughterDate) {
        this.slaughterDate = slaughterDate;
    }

    public LocalDate getCuttingDate() {
        return cuttingDate;
    }

    public void setCuttingDate(LocalDate cuttingDate) {
        this.cuttingDate = cuttingDate;
    }

    public String getSlaughterPlace() {
        return slaughterPlace;
    }

    public void setSlaughterPlace(String slaughterPlace) {
        this.slaughterPlace = slaughterPlace;
    }

    public String getSlaughterHouse() {
        return slaughterHouse;
    }

    public void setSlaughterHouse(String slaughterHouse) {
        this.slaughterHouse = slaughterHouse;
    }

    public String getCuttingPlace() {
        return cuttingPlace;
    }

    public void setCuttingPlace(String cuttingPlace) {
        this.cuttingPlace = cuttingPlace;
    }

    public String getCuttingButcher() {
        return cuttingButcher;
    }

    public void setCuttingButcher(String cuttingButcher) {
        this.cuttingButcher = cuttingButcher;
    }
}
