package com.localeat.core.domains.order;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import static org.mockito.Mockito.*;

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
        "/sql/delete/com/localeat/domains/order/test_data.sql",
        "/sql/delete/com/localeat/domains/delivery/test_data.sql",
        "/sql/delete/com/localeat/domains/slaughter/test_data.sql",
        "/sql/delete/com/localeat/domains/actor/test_data.sql",
        "/sql/delete/com/localeat/domains/farm/test_data.sql",
        "/sql/delete/com/localeat/domains/security/test_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestOrderNotificationService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderNotificationService service;

    @Test
    public void notifyByMail_should_format_a_mail_correctly() {
        // given
        OrderNotificationService spyedService = spy(service);
        doNothing().when(spyedService).sendMail(anyString(), anyString(), anyString());
        Order order = orderRepository.findById(1L).orElseThrow();

        // when
        spyedService.notifyByMail(order);

        // then
        verify(spyedService).sendMail(
                eq("benjamin@ferme-du-ruisseau.fr"),
                eq("nouvelle commande !"),
                eq("<div>La commande n° 1 a été enregistrée</div><div><ul><li>Montant de la commande : 1350.0 €TTC</li><li>Quantité commandée : 100.0 kg</li></ul></div>"));
    }
}
