package com.localeat.core.domains.order;

public enum OrderStatus {
    SUBMITTED,
    BOOKED,
    PAYED,
    DELIVERED,
    CANCELLED;

    public boolean isSold() {
        return this.equals(BOOKED) || this.equals(PAYED) || this.equals(DELIVERED);
    }
}
