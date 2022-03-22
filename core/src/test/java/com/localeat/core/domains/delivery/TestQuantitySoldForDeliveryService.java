package com.localeat.core.domains.delivery;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Sql({
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/actor/customer_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/address_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
        "/sql/create/com/localeat/domains/slaughter/slaughter_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/delivery_test_data.sql",
        "/sql/create/com/localeat/domains/order/order_test_data.sql",
})
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestQuantitySoldForDeliveryService {

    @Autowired
    private QuantitySoldForDeliveryService quantitySoldForDeliveryService;

    @Test
    public void calculatePercentageSold_should_return_the_right_quantity(){
        // given
        var delivery = new Delivery();
        delivery.setId(1L);

        // when
        Float quantitySold = quantitySoldForDeliveryService.calculatePercentageSold(delivery);

        // then
        Assertions.assertThat(quantitySold).isEqualTo(0.75f);
    }
}
