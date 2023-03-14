package com.localeat.core.domains.order;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.payment.Payment;
import com.localeat.core.domains.payment.PaymentController;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.security.AccountRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import static com.localeat.core.domains.order.OrderStatus.SUBMITTED;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(value = {
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
public class TestOrderController {

    @Autowired
    private OrderController orderController;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Test
    public void createOrder_should_not_increase_quantity_sold_before_payment() {
        // given
        Account account = accountRepository.findById(3L).orElseThrow();

        Delivery delivery = new Delivery();
        delivery.setId(1L);

        Batch batch = new Batch();
        batch.setId(1L);

        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(2);
        orderItem.setBatch(batch);

        Order order = new Order();
        order.setDelivery(delivery);
        order.addToOrderedItems(orderItem);

        // when
        orderController.createOrder(account, order);

        // then
        Batch batchLoaded = batchRepository.findById(1L).orElseThrow();
        assertThat(batchLoaded.getQuantitySold()).isEqualTo(30);
        assertThat(order.getStatus()).isEqualTo(SUBMITTED);
    }
}
