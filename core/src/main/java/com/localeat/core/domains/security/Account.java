package com.localeat.core.domains.security;


import com.localeat.core.domains.actor.Actor;

import javax.persistence.*;

/**
 * Wrapper class that gathers : <ul>
 *     <li>an actor, a business object that holds the data necessary for localeat business</li>
 *     <li>a user identifier, that matches with the identifier used by SpringSecurity's class {@link org.springframework.security.core.userdetails.User}</li>
 * </ul>
 */
@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_id_generator")
    @SequenceGenerator(name="account_id_generator", sequenceName = "account_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String username;

    @OneToOne
    private Actor actor;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Actor getActor() {
        return actor;
    }

    public void setActor(Actor actor) {
        this.actor = actor;
    }
}
