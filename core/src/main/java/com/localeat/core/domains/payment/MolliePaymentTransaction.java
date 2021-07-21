package com.localeat.core.domains.payment;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.Locale;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;
import static com.localeat.core.domains.payment.PaymentStatus.*;

/**
 * A representation of the payment resource in Mollie's payment API (https://docs.mollie.com/reference/v2/payments-api/create-payment)
 */
@Entity
@JsonInclude(NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MolliePaymentTransaction implements PaymentTransaction {

    @Override
    @JsonIgnore
    public PaymentStatus getPaymentStatus() {
        return status.getLocaleatPaymentStatus();
    }

    @Id
    private String id;

    @Enumerated(EnumType.STRING)
    private MolliePaymentStatus status;

    @Embedded
    private Amount amount;

    private String description;

    private String redirectUrl;

    private String webhookUrl;

    @JsonAlias("_links")
    private Links links;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MolliePaymentStatus getStatus() {
        return status;
    }

    public void setStatus(MolliePaymentStatus status) {
        this.status = status;
    }

    public Amount getAmount() {
        return amount;
    }

    public void setAmount(Amount amount) {
        this.amount = amount;
    }

    public void setAmount(float value, Currency currency) {
        this.amount = new Amount(value, currency);

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getWebhookUrl() {
        return webhookUrl;
    }

    public void setWebhookUrl(String webhookUrl) {
        this.webhookUrl = webhookUrl;
    }


    public Links getLinks() {
        return links;
    }

    public void setLinks(Links links) {
        this.links = links;
    }

    @JsonIgnore
    public String getPaymentUrl() {
        return links.getPaymentUrl().getHref();
    }

    @Embeddable
    public class Amount {

        private String value;

        private Currency currency;

        public Amount() {
        }

        public Amount(float value, Currency currency) {
            this.value = String.format(Locale.US, "%.2f",value);
            this.currency = currency;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public Currency getCurrency() {
            return currency;
        }

        public void setCurrency(Currency currency) {
            this.currency = currency;
        }
    }

    @Embeddable
    public class Links {
        @JsonAlias("checkout")
        private Link paymentUrl;

        public Links() {
        }

        public Link getPaymentUrl() {
            return paymentUrl;
        }

        public void setPaymentUrl(Link paymentUrl) {
            this.paymentUrl = paymentUrl;
        }

        @Embeddable
        public class Link {
            private String href;
            private String type;

            public Link() {
            }

            public String getHref() {
                return href;
            }

            public void setHref(String href) {
                this.href = href;
            }

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }
        }
    }

    public enum Currency {
        EUR,USD;
    }

    public enum MolliePaymentStatus {
        open(PROCESSING),
        cancelled(PROCESSING),
        pending(PROCESSING),
        authorized(PROCESSING),
        expired(ABORTED),
        failed(ABORTED),
        paid(VALIDATED);

        MolliePaymentStatus(PaymentStatus localeatPaymentStatus) {
            this.localeatPaymentStatus = localeatPaymentStatus;
        }

        public PaymentStatus getLocaleatPaymentStatus() {
            return localeatPaymentStatus;
        }

        private PaymentStatus localeatPaymentStatus;
    }
}
