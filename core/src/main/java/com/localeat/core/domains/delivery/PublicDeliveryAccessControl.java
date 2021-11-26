package com.localeat.core.domains.delivery;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.Entity;

@Entity
@JsonTypeName("Public")
public class PublicDeliveryAccessControl extends DeliveryAccessControl<PassePartoutDeliveryAccessKey> {
    @Override
    public boolean isAllowed(PassePartoutDeliveryAccessKey key) {
        return true;
    }

    @Override
    public PassePartoutDeliveryAccessKey buildAccessKey(String key) {
        return new PassePartoutDeliveryAccessKey();
    }
}
