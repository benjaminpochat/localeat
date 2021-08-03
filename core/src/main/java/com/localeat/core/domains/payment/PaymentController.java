package com.localeat.core.domains.payment;

import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
public class PaymentController {

    @Autowired
    private PaymentTransactionService paymentTransactionService;

    @PostMapping(path = "/accounts/{account}/orders/{order}/payments")
    public Payment createPayment(@PathParam("account") Account account, @PathParam("order") Order order) {
        return paymentTransactionService.createPayment(account, order);
    }

    @PostMapping(path = "/paymentTransactions")
    public void storePaymentTransactionChange(@RequestParam(name = "id") String transactionId){
        paymentTransactionService.updatePayment(transactionId);
    }

}
