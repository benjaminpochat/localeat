package com.localeat.core.domains.payment;


import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderController;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.order.OrderRepository;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.security.AccountRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import static com.localeat.core.domains.order.OrderStatus.CANCELLED;
import static com.localeat.core.domains.order.OrderStatus.PAYED;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(value = {
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/customer_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/address_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
        "/sql/create/com/localeat/domains/slaughter/slaughter_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/delivery_test_data.sql",
        "/sql/create/com/localeat/domains/order/order_test_data.sql",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
/**
 * Uses the {@link MockPaymentTransactionService} implementation for {@link PaymentTransactionService} bean,
 * which rejects the payment if an order contains 1 order item,
 * and accepts the payment id an order contains more than 1 item.
 */
public class TestPaymentController {

    @Autowired
    private OrderController orderController;

    @Autowired
    private PaymentController paymentController;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void storePaymentTransactionChange_should_increase_quantity_sold_if_payment_is_accepted() {
        // given
        Account account = accountRepository.findById(3L).orElseThrow();

        Delivery delivery = new Delivery();
        delivery.setId(1L);

        Batch batch = new Batch();
        batch.setId(1L);

        OrderItem orderItem1 = new OrderItem();
        orderItem1.setQuantity(1);
        orderItem1.setBatch(batch);

        OrderItem orderItem2 = new OrderItem();
        orderItem2.setQuantity(1);
        orderItem2.setBatch(batch);

        Order order = new Order();
        order.setDelivery(delivery);
        // MockPaymentTransactionService accepts the payment if the order contains more than 1 item
        order.addToOrderedItems(orderItem1);
        order.addToOrderedItems(orderItem2);
        orderController.createOrder(account, order);
        Payment payment = paymentController.createPayment(account, order);

        // when
        paymentController.storePaymentTransactionChange(payment.getTransactionId());

        // then
        Batch batchLoaded = batchRepository.findById(1L).orElseThrow();
        assertThat(batchLoaded.getQuantitySold()).isEqualTo(32);
        Order orderReloaded = orderRepository.findById(order.getId()).orElseThrow();
        assertThat(orderReloaded.getStatus()).isEqualTo(PAYED);
    }

    @Test
    public void storePaymentTransactionChange_should_not_increase_quantity_sold_if_payment_is_refused() {
        // given
        Account account = accountRepository.findById(3L).orElseThrow();

        Delivery delivery = new Delivery();
        delivery.setId(1L);

        Batch batch = new Batch();
        batch.setId(1L);

        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(1);
        orderItem.setBatch(batch);

        Order order = new Order();
        order.setDelivery(delivery);
        // MockPaymentTransactionService accepts the payment if the order contains only 1 item
        order.addToOrderedItems(orderItem);
        orderController.createOrder(account, order);
        Payment payment = paymentController.createPayment(account, order);

        // when
        paymentController.storePaymentTransactionChange(payment.getTransactionId());

        // then
        Batch batchLoaded = batchRepository.findById(1L).orElseThrow();
        assertThat(batchLoaded.getQuantitySold()).isEqualTo(30);
        Order orderReloaded = orderRepository.findById(order.getId()).orElseThrow();
        assertThat(orderReloaded.getStatus()).isEqualTo(CANCELLED);
    }
}
