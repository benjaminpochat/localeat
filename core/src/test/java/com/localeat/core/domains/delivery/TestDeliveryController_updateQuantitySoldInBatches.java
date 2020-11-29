package com.localeat.core.domains.delivery;

import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
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
public class TestDeliveryController_updateQuantitySoldInBatches {

    @Autowired
    private DeliveryController deliveryController;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Test
    public void should_reduce_quantity_to_sold() {
        // given
        Delivery delivery = deliveryRepository.findById(1L).orElseThrow();

        // when
        deliveryController.updateQuantitySoldInBatches(delivery);

        // then
        Batch batch = batchRepository.findById(1L).orElseThrow();
        Assertions.assertThat(batch.getQuantitySold()).isEqualTo(30);
    }
}
