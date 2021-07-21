package com.localeat.core.config.payment;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "localeat.payment")
public class PaymentConfig {
    private String molliePaymentAPIKey;

    public String getMolliePaymentAPIKey() {
        return molliePaymentAPIKey;
    }

    public void setMolliePaymentAPIKey(String molliePaymentAPIKey) {
        this.molliePaymentAPIKey = molliePaymentAPIKey;
    }
}
