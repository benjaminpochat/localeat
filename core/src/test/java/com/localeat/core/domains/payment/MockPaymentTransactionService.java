package com.localeat.core.domains.payment;

import com.localeat.core.domains.security.Account;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import static com.localeat.core.domains.payment.PaymentStatus.ABORTED;
import static com.localeat.core.domains.payment.PaymentStatus.VALIDATED;

@Service
@Profile("test")
public class MockPaymentTransactionService extends PaymentTransactionService{

    @Override
    public void createPaymentTransaction(Payment payment, Account account) {
        payment.setTransactionId(String.valueOf(payment.getOrder().getOrderedItems().size()));
    }

    @Override
    public PaymentStatus fetchPaymentStatus(String transactionId) {
        return Integer.valueOf(transactionId) % 2 == 0 ? VALIDATED : ABORTED;
    }
}
