package com.localeat.core.domains.actor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Actor implements com.localeat.model.domains.actor.Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "actor_id_generator")
    @SequenceGenerator(name="actor_id_generator", sequenceName = "actor_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    private String name;

    private String firstName;

    private String email;

    private String phoneNumber;

    @Override
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
