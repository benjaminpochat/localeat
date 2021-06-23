package com.localeat.core.domains.order;

import com.localeat.core.commons.EmailService;
import com.localeat.core.commons.NotificationService;
import com.localeat.core.config.http.HttpConfig;
import com.localeat.core.domains.actor.BreederRepository;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.delivery.DeliveryRepository;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.slaughter.Slaughter;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.util.Optional.ofNullable;

@Service
public class OrderNotificationToCustomerService implements NotificationService<Order> {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderNotificationToCustomerService.class);

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private BreederRepository breederRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OrderService orderService;

    @Autowired
    HttpConfig httpConfig;

    @Override
    public EmailService getEmailService() {
        return emailService;
    }

    @Override
    public String getSubject(Order order) {
        return "Confirmation de votre commande sur ViandeEnDirect.eu";
    }

    @Override
    public String getRecipient(Order order) {
        return order.getCustomer().getEmail();
    }

    @Override
    public String getBodyTemplatePath() {
        return "html/notification/notification_to_customer_body_template.html";
    }

    @Override
    public Object[] getTemplateValues(Order order) {
        Slaughter slaughter = slaughterRepository.findByDelivery(order.getDelivery());
        Delivery delivery = deliveryRepository.findById(slaughter.getDelivery().getId()).orElseThrow();
        Object[] bodyTemplateValues = {
                order.getId(),
                httpConfig.getUserInterfaceUrl(),
                orderService.getTotalPrice(order),
                orderService.getTotalWeight(order),
                delivery.getDeliveryStart(),
                delivery.getDeliveryEnd(),
                delivery.getDeliveryAddress().getName(),
                ofNullable(delivery.getDeliveryAddress().getAddressLine1()).orElse(""),
                ofNullable(delivery.getDeliveryAddress().getAddressLine2()).orElse(""),
                ofNullable(delivery.getDeliveryAddress().getAddressLine3()).orElse(""),
                ofNullable(delivery.getDeliveryAddress().getAddressLine4()).orElse(""),
                delivery.getDeliveryAddress().getZipCode(),
                delivery.getDeliveryAddress().getCity()
        };
        return bodyTemplateValues;
    }
}
