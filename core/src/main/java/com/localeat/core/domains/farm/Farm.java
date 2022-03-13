package com.localeat.core.domains.farm;

import com.localeat.core.domains.delivery.Address;

import javax.persistence.*;

@Entity
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "farm_id_generator")
    @SequenceGenerator(name="farm_id_generator", sequenceName = "farm_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    Long id;

    String name;

    String slideshowUrl;

    @ManyToOne
    Address address;

    String identificationNumber;
    private String phoneNumber;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setSlideshowUrl(String slideshowUrl) {
        this.slideshowUrl = slideshowUrl;
    }

    public String getSlideshowUrl() {
        return slideshowUrl;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}
