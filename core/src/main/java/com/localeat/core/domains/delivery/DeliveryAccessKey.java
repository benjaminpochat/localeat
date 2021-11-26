package com.localeat.core.domains.delivery;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value= PassePartoutDeliveryAccessKey.class, name = "PassePartout"),
        @JsonSubTypes.Type(value= SharedDeliveryAccessKey.class, name = "Shared")})
public abstract class DeliveryAccessKey {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_access_key_id_generator")
    @SequenceGenerator(name="delivery_access_key_id_generator", sequenceName = "delivery_access_key_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}