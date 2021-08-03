package com.localeat.core.domains.payment;

import com.localeat.core.domains.delivery.QuantitySoldForDeliveryService;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderService;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.localeat.core.domains.order.OrderStatus.SUBMITTED;

@Service
abstract class PaymentTransactionService {

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private QuantitySoldForDeliveryService quantitySoldForDeliveryService;

    public Payment createPayment(Account account, Order order) {
        var payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(orderService.getTotalPrice(order));
        payment.setStatus(PaymentStatus.PROCESSING);
        createPaymentTransaction(payment, account);
        return paymentRepository.save(payment);
    }

    abstract void createPaymentTransaction(Payment payment, Account account);

    public void updatePayment(String transactionId) {
        PaymentStatus paymentStatus = fetchPaymentStatus(transactionId.trim());
        Payment payment = paymentRepository.findByTransactionId(transactionId.trim());
        Order order = payment.getOrder();
        payment.setStatus(paymentStatus);
        payment = paymentRepository.save(payment);
        if (order.getStatus().equals(SUBMITTED) && payment.isValidated()) {
            orderService.confirmOrder(payment.getOrder());
        } else if (order.getStatus().equals(SUBMITTED) && payment.isFailed()) {
            orderService.abortOrder(payment.getOrder());
        }
        quantitySoldForDeliveryService.updateQuantitySoldInBatches(order.getDelivery());
    }

    abstract PaymentStatus fetchPaymentStatus(String transactionId);
}
