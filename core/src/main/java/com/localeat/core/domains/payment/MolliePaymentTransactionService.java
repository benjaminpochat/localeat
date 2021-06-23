package com.localeat.core.domains.payment;

import com.localeat.core.commons.RestTemplateLoggingInterceptor;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderService;
import com.localeat.core.domains.order.OrderStatus;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.security.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigurationMetadata;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static com.localeat.core.domains.order.OrderStatus.BOOKED;
import static com.localeat.core.domains.payment.MolliePaymentTransaction.Currency.EUR;


@Service
/**
 * See https://docs.mollie.com/payments/accepting-payments
 */
public class MolliePaymentTransactionService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AccountRepository accountRepository;

    public Payment createPayment(Account account, Order order) {
        var payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(orderService.getTotalPrice(order));
        payment.setStatus(PaymentStatus.PROCESSING);
        payment.setTransactionId(createMolliePaymentTransaction(payment, account).getId());
        return paymentRepository.save(payment);
    }

    /**
     * Localeat creates a payment on the Mollie platform by calling the Payments API with the amount and description, and with a URL we should redirect the customer to after the payment is made.
     * The API responds with the unique ID and the unique checkout URL for the newly created payment. Your website stores the id, links it to the customer’s order and redirects the customer to the checkout URL (present in _links.checkout).
     */
    private MolliePaymentTransaction createMolliePaymentTransaction(Payment payment, Account account){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders requestHeaders = new HttpHeaders();
        //TODO : mettre la clé dans un paramètre externe
        requestHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer test_Wqwg9z7fDfCd9tRJQKfwQCh6TMrxfy");
        MolliePaymentTransaction transaction = getMolliePaymentTransaction(payment, account);
        var request = RequestEntity.post(URI.create("https://api.mollie.com/v2/payments"))
                .headers(requestHeaders)
                .contentType(MediaType.APPLICATION_JSON)
                .body(transaction);
        ResponseEntity<MolliePaymentTransaction> responseEntity = restTemplate.postForEntity("https://api.mollie.com/v2/payments", request, MolliePaymentTransaction.class);
        MolliePaymentTransaction paymentTransaction = responseEntity.getBody();
        return paymentTransaction;
    }

    private MolliePaymentTransaction getMolliePaymentTransaction(Payment payment, Account account) {
        MolliePaymentTransaction transaction = new MolliePaymentTransaction();
        transaction.setAmount(payment.getAmount(), EUR);
        transaction.setDescription(String.format("payment for order %s", payment.getOrder().getId()));
        //TODO : implémenter la route
        //TODO : mettre la racine de l'url dans un paramètre externe
        transaction.setRedirectUrl(String.format("http://viandeendirect.eu/customer-area/orders/%s", payment.getOrder().getId()));
        //TODO : mettre la racine de l'url dans un paramètre externe
        transaction.setWebhookUrl("http://viandeendirect.eu:8080/paymentTransactions/");
        return transaction;
    }

    /**
     * When the payment is made, Mollie will send you a webhook informing Localeat about the payment’s status change. You can configure the webhook URL per profile in your Mollie account, or per payment in the API request.
     * In response to your webhook being called your application just needs to issue a 200 OK status. From that response Mollie can tell that your processing of the new status was successful – for any other response we keep trying.
     */
    public void updatePayment(String transactionId) {
        PaymentTransaction transaction = fetchPaymentStatus(transactionId.trim());
        Payment payment = paymentRepository.findByTransactionId(transactionId.trim());
        Order order = payment.getOrder();
        payment.setStatus(transaction.getPaymentStatus());
        payment = paymentRepository.save(payment);
        if (order.getStatus().equals(BOOKED) && payment.isValidated()) {
            orderService.confirmOrder(payment.getOrder());
        } else if (order.getStatus().equals(BOOKED) && payment.isFailed()) {
            orderService.abortOrder(payment.getOrder());
        }
    }

    /**
     * When Localeat processes the webhook, it fetches the payment status from the Mollie API.
     * Once the status is paid, your website can send out a confirmation email to the customer and start the order fulfilment.
     * @param transactionId
     */
    private PaymentTransaction fetchPaymentStatus(String transactionId){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders requestHeaders = new HttpHeaders();
        //TODO : mettre la clé dans un paramètre externe
        requestHeaders.add(HttpHeaders.AUTHORIZATION, "Bearer test_Wqwg9z7fDfCd9tRJQKfwQCh6TMrxfy");
        var httpEntity = new HttpEntity<>(requestHeaders);
        MolliePaymentTransaction transaction = restTemplate.exchange(String.format("https://api.mollie.com/v2/payments/%s",transactionId), HttpMethod.GET, httpEntity, MolliePaymentTransaction.class).getBody();
        return transaction;
    }
}
