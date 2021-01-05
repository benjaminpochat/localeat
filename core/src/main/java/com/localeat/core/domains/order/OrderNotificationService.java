package com.localeat.core.domains.order;

import com.localeat.core.commons.EmailService;
import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.actor.BreederRepository;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.slaughter.Slaughter;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderNotificationService {

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private BreederRepository breederRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private EmailService emailService;

    public void notifyByMail(Order order) {
        Slaughter slaughter = slaughterRepository.findByDelivery(order.getDelivery());
        Iterable<Breeder> breeders = breederRepository.findBreedersByFarm(slaughter.getAnimal().getFinalFarm());
        String recipient = StreamSupport.stream(breeders.spliterator(), false).map(Breeder::getEmail).collect(Collectors.joining(","));
        String subject = "nouvelle commande !";
        String body = String.format(
                "<div>La commande n° %s a été enregistrée</div>"
                        + "<div><ul>"
                        + "<li>Montant de la commande : %s €TTC</li>"
                        + "<li>Quantité commandée : %s kg</li>"
                        + "</ul></div>",
                order.getId(),
                order.getOrderedItems().stream()
                        .mapToDouble(item -> {
                            Batch batch = batchRepository.findById(item.getBatch().getId()).orElseThrow();
                            return item.getQuantity() * batch.getProduct().getUnitPrice() * batch.getProduct().getNetWeight();
                        })
                        .sum(),
                order.getOrderedItems().stream().mapToDouble(item -> {
                    Batch batch = batchRepository.findById(item.getBatch().getId()).orElseThrow();
                    return item.getQuantity() * batch.getProduct().getNetWeight();
                }).sum());
        sendMail(recipient, subject, body);
    }

    void sendMail(String recipient, String subject, String body) {
        emailService.sendMail(recipient, subject, body);
    }
}
