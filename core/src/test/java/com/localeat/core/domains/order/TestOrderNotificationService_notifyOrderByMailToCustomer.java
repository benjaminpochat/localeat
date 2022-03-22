package com.localeat.core.domains.order;

import com.localeat.core.config.http.HttpConfig;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import static org.mockito.Mockito.*;

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
public class TestOrderNotificationService_notifyOrderByMailToCustomer {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderNotificationToCustomerService service;

    @Autowired
    HttpConfig httpConfig;

    @Test
    public void should_format_a_mail_correctly() {
        // given
        OrderNotificationToCustomerService spyedService = spy(service);
        doNothing().when(spyedService).sendMail(anyString(), anyString(), anyString());
        Order order = orderRepository.findById(1L).orElseThrow();

        // when
        spyedService.notify(order);

        // then
        ArgumentCaptor<String> mailBodyCaptor = ArgumentCaptor.forClass(String.class);
        verify(spyedService).sendMail(
                eq("virginie@mail.fr"),
                eq("Confirmation de votre commande sur ViandeEnDirect.eu"),
                mailBodyCaptor.capture());
        String mailBody = mailBodyCaptor.getValue();
        String cleanMailBody = mailBody.replaceAll("( {4})*", "");
        Assertions.assertThat(cleanMailBody).isEqualTo(String.format("<meta charset=\"UTF-8\">" +
            "<div>La commande n° 1 a été enregistrée sur <a href='%s'>ViandeEnDirect.eu</a>.</div>" +
            "<div>" +
                "<ul>" +
                    "<li>Montant de la commande : 1350.0 €TTC</li>" +
                    "<li>Quantité commandée : 100.0 kg</li>" +
                    "<li>Date et heure de la livraison : le 01/01/2050 entre 18:00 et 20:00</li>" +
                    "<li>Adresse de la livraison :<br>" +
                        "Chez Bob<br>" +
                        "2 rue des pommiers<br>" +
                        "<br>" +
                        "<br>" +
                        "<br>" +
                        "10000<br>" +
                        "Atlantic<br>" +
                    "</li>" +
                "</ul>" +
            "</div>", httpConfig.getFrontendUrl()));
    }
}