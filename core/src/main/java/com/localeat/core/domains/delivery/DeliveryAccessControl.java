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
        @JsonSubTypes.Type(value= PublicDeliveryAccessControl.class, name = "Public"),
        @JsonSubTypes.Type(value= SharedKeyDeliveryAccessControl.class, name = "SharedKey")})
public abstract class DeliveryAccessControl<K extends DeliveryAccessKey> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "delivery_access_control_id_generator")
    @SequenceGenerator(name="delivery_access_control_id_generator", sequenceName = "delivery_access_control_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    abstract boolean isAllowed(K key);

    public abstract K buildAccessKey(String key);
}
