package com.localeat.core.domains.payment;

import com.localeat.core.config.http.HttpConfig;
import com.localeat.core.config.payment.PaymentConfig;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.security.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

import static com.localeat.core.domains.payment.MolliePaymentTransaction.Currency.EUR;

/**
 * See https://docs.mollie.com/payments/accepting-payments
 */
@Service
@Profile("!test")
public class MolliePaymentTransactionService extends PaymentTransactionService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    HttpConfig httpConfig;

    @Autowired
    PaymentConfig paymentConfig;

    /**
     * Localeat creates a payment on the Mollie platform by calling the Payments API with the amount and description, and with a URL we should redirect the customer to after the payment is made.
     * The API responds with the unique ID and the unique checkout URL for the newly created payment. Your website stores the id, links it to the customer’s order and redirects the customer to the checkout URL (present in _links.checkout).
     */
    @Override
    public void createPaymentTransaction(Payment payment, Account account){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", paymentConfig.getMolliePaymentAPIKey()));
        MolliePaymentTransaction transaction = getMolliePaymentTransaction(payment, account);
        var request = RequestEntity.post(URI.create("https://api.mollie.com/v2/payments"))
                .headers(requestHeaders)
                .contentType(MediaType.APPLICATION_JSON)
                .body(transaction);
        ResponseEntity<MolliePaymentTransaction> responseEntity = restTemplate.postForEntity("https://api.mollie.com/v2/payments", request, MolliePaymentTransaction.class);
        MolliePaymentTransaction paymentTransaction = responseEntity.getBody();
        payment.setTransactionId(paymentTransaction.getId());
        payment.setPaymentUrl(paymentTransaction.getPaymentUrl());
    }

    private MolliePaymentTransaction getMolliePaymentTransaction(Payment payment, Account account) {
        MolliePaymentTransaction transaction = new MolliePaymentTransaction();
        transaction.setAmount(payment.getAmount(), EUR);
        transaction.setDescription(String.format("payment for order %s", payment.getOrder().getId()));
        transaction.setRedirectUrl(String.format("%s/customer-area/orders/%s", httpConfig.getFrontendUrl(), payment.getOrder().getId()));
        transaction.setWebhookUrl(String.format("%s/paymentTransactions/", httpConfig.getBackendUrl()));
        return transaction;
    }

    @Override
    public PaymentStatus fetchPaymentStatus(String transactionId){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", paymentConfig.getMolliePaymentAPIKey()));
        var httpEntity = new HttpEntity<>(requestHeaders);
        MolliePaymentTransaction transaction = restTemplate.exchange(String.format("https://api.mollie.com/v2/payments/%s",transactionId), HttpMethod.GET, httpEntity, MolliePaymentTransaction.class).getBody();
        return transaction.getPaymentStatus();
    }
}
