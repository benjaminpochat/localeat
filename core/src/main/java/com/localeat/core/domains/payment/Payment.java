package com.localeat.core.domains.payment;

import com.localeat.core.domains.order.Order;

import javax.persistence.*;

import static com.localeat.core.domains.payment.PaymentStatus.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_id_generator")
    @SequenceGenerator(name="payment_id_generator", sequenceName = "payment_id_seq", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Order order;

    private String transactionId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private float amount;

    private String paymentUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public boolean isProcessing() {
        return PROCESSING.equals(getStatus());
    }

    public boolean isValidated() {
        return VALIDATED.equals(getStatus());
    }

    public boolean isFailed() {
        return ABORTED.equals(getStatus());
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public void setPaymentUrl(String paymentUrl) {
        this.paymentUrl = paymentUrl;
    }

    public String getPaymentUrl() {
        return paymentUrl;
    }
}
