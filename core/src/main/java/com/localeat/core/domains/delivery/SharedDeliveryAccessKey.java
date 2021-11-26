package com.localeat.core.domains.delivery;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.Entity;

@Entity
@JsonTypeName("Shared")
public class SharedDeliveryAccessKey extends DeliveryAccessKey{
    private String key;

    public SharedDeliveryAccessKey() {
    }

    public SharedDeliveryAccessKey(String key) {
        this.key = key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
