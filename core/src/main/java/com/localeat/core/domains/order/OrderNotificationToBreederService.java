package com.localeat.core.domains.order;

import com.localeat.core.commons.EmailService;
import com.localeat.core.commons.NotificationService;
import com.localeat.core.config.http.HttpConfig;
import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.actor.BreederRepository;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.slaughter.Slaughter;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderNotificationToBreederService implements NotificationService<Order> {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderNotificationToBreederService.class);

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private BreederRepository breederRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OrderService orderService;

    @Autowired
    HttpConfig httpConfig;

    @Override
    public String getSubject(Order object) {
        return "Nouvelle commande sur ViandeEnDirect.eu";
    }

    @Override
    public String getRecipient(Order order) {
        Slaughter slaughter = slaughterRepository.findByDelivery(order.getDelivery());
        Iterable<Breeder> breeders = breederRepository.findBreedersByFarm(slaughter.getAnimal().getFinalFarm());
        return StreamSupport.stream(breeders.spliterator(), false).map(Breeder::getEmail).collect(Collectors.joining(","));
    }

    @Override
    public String getBodyTemplatePath() {
        return "html/notification/notification_to_breeder_body_template.html";
    }

    @Override
    public EmailService getEmailService() {
        return emailService;
    }

    @Override
    public Object[] getTemplateValues(Order order) {
        Object[] templateValues = {
                order.getId(),
                httpConfig.getFrontendUrl(),
                order.getCustomer().getFirstName(),
                order.getCustomer().getName(),
                order.getCustomer().getEmail(),
                order.getCustomer().getPhoneNumber(),
                orderService.getTotalPrice(order),
                orderService.getTotalWeight(order)
        };
        return templateValues;
    }
}
