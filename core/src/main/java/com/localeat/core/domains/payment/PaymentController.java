package com.localeat.core.domains.payment;

import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

@RestController
public class PaymentController {

    @Autowired
    private MolliePaymentTransactionService paymentService;

    @PostMapping(path = "/accounts/{account}/orders/{order}/payments")
    public Payment savePayment(@PathParam("account") Account account, @PathParam("order") Order order) {
        return paymentService.createPayment(account, order);
    }

    @PostMapping(path = "/paymentTransactions")
    public void notifyPaymentTransactionChange(@RequestParam(name = "id") String transactionId){
        paymentService.updatePayment(transactionId);
    }

}
