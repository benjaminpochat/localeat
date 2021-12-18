package com.localeat.core.domains.delivery;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.*;

@Entity
@JsonTypeName("SharedKey")
public class SharedKeyDeliveryAccessControl extends DeliveryAccessControl<SharedDeliveryAccessKey> {

    @OneToOne(cascade = CascadeType.ALL)
    private SharedDeliveryAccessKey sharedKey;

    public SharedDeliveryAccessKey getSharedKey() {
        return sharedKey;
    }

    public void setSharedKey(SharedDeliveryAccessKey sharedKey) {
        this.sharedKey = sharedKey;
    }

    @Override
    public boolean isAllowed(SharedDeliveryAccessKey key) {
        return this.sharedKey != null && this.sharedKey.getKey().equalsIgnoreCase(key.getKey());
    }

    @Override
    public SharedDeliveryAccessKey buildAccessKey(String key) {
        return new SharedDeliveryAccessKey(key);
    }
}
