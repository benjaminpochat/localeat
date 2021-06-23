package com.localeat.core.domains.payment;

/**
 * A representation of the payment transaction in the payment external service
 */
public interface PaymentTransaction {

    public PaymentStatus getPaymentStatus();
}
