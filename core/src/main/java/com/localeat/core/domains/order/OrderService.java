package com.localeat.core.domains.order;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.delivery.DeliveryRepository;
import com.localeat.core.domains.delivery.QuantitySoldForDeliveryService;
import com.localeat.core.domains.payment.Payment;
import com.localeat.core.domains.payment.PaymentRepository;
import com.localeat.core.domains.payment.PaymentStatus;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private QuantitySoldForDeliveryService quantitySoldForDeliveryService;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderNotificationToBreederService orderNotificationToBreederService;

    @Autowired
    private OrderNotificationToCustomerService orderNotificationToCustomerService;

    public Order createOrder(Order order, Customer customer) {
        order.setCustomer(customer);
        order.getOrderedItems().forEach(orderItem -> orderItem.setOrder(order));
        Delivery delivery = deliveryRepository.findById(order.getDelivery().getId()).orElseThrow();
        Order orderSaved = orderRepository.save(order);
        createPayment(orderSaved);
        quantitySoldForDeliveryService.updateQuantitySoldInBatches(delivery);
        return order;
    }

    private void createPayment(Order orderSaved) {
        Payment payment = new Payment();
        payment.setOrder(orderSaved);
        payment.setStatus(PaymentStatus.PROCESSING);
        payment.setAmount(getTotalPrice(orderSaved));
        paymentRepository.save(payment);
    }

    public float getTotalPrice(Order order) {
        return (float) order.getOrderedItems().stream()
                .mapToDouble(item -> {
                    Batch batch = batchRepository.findById(item.getBatch().getId()).orElseThrow();
                    return item.getQuantity() * batch.getProduct().getUnitPrice() * batch.getProduct().getNetWeight();
                })
                .sum();
    }

    public float getTotalWeight(Order order) {
        return (float) order.getOrderedItems().stream().mapToDouble(item -> {
            Batch batch = batchRepository.findById(item.getBatch().getId()).orElseThrow();
            return item.getQuantity() * batch.getProduct().getNetWeight();
        }).sum();
    }

    public void confirmOrder(Order order) {
        order.setStatus(OrderStatus.PAYED);
        order = orderRepository.save(order);
        quantitySoldForDeliveryService.updateQuantitySoldInBatches(order.getDelivery());
        orderNotificationToBreederService.notify(order);
        orderNotificationToCustomerService.notify(order);
    }

    public void abortOrder(Order order) {
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        quantitySoldForDeliveryService.updateQuantitySoldInBatches(order.getDelivery());
    }
}
