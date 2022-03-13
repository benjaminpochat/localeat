package com.localeat.core.domains.delivery;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderItemRepository;
import com.localeat.core.domains.order.OrderRepository;
import com.localeat.core.domains.pdf.OrderBillService;
import com.localeat.core.domains.pdf.OrderLabelService;
import com.localeat.core.domains.pdf.ProductElementLabelService;
import com.localeat.core.domains.product.BatchRepository;
import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import com.localeat.core.domains.slaughter.SlaughterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.springframework.http.MediaType.APPLICATION_PDF;
import static org.springframework.http.MediaType.APPLICATION_PDF_VALUE;

@RestController
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private QuantitySoldForDeliveryService quantitySoldForDeliveryService;

    @Autowired
    private OrderBillService orderBillService;

    @Autowired
    private OrderLabelService orderLabelService;

    @Autowired
    private ProductElementLabelService productElementLabelService;

    @GetMapping(path = "/deliveries")
    public Iterable<Delivery> getPublicDeliveries(@RequestParam(value = "sharedKey", defaultValue = "") String sharedKey){
        return StreamSupport.stream(deliveryRepository.findPublicDeliveries().spliterator(), false)
                .filter(delivery -> {
                    DeliveryAccessControl accessControl = delivery.getAccessControl();
                    // TODO : revoir la construction de la clé pour qu'elle ne dépende pas de la delivery
                    DeliveryAccessKey accessKey = accessControl.buildAccessKey(sharedKey);
                    return delivery.getAccessControl().isAllowed(accessKey);
                })
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/deliveries/{delivery}/animals")
    public Animal getAnimalForDelivery(@PathVariable Delivery delivery){
        return slaughterRepository.findByDelivery(delivery).getAnimal();
    }

    @GetMapping(path = "/deliveries/{delivery}/quantitySold")
    public Float getQuantitySoldForDelivery(@PathVariable Delivery delivery){
        return quantitySoldForDeliveryService.calculatePercentageSold(delivery);
    }

    @GetMapping(path = "/delivery/{delivery}/accessControl/type")
    public String getAccessControlType(@PathVariable Delivery delivery) {
        return delivery.getAccessControl().getClass().getSimpleName();
    }

    @PostMapping(path = "/deliveries/{delivery}/accessControl/{sharedKey}")
    public void isAccessAllowed(@PathVariable Delivery delivery, @Valid @RequestBody SharedDeliveryAccessKey key) {
        SharedKeyDeliveryAccessControl accessControl = (SharedKeyDeliveryAccessControl) delivery.getAccessControl();
        if(!accessControl.isAllowed(key)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "no valid key has been given to access this delivery");
        }
    }

    @GetMapping(path = "/accounts/{account}/deliveries")
    public Iterable<Delivery> getBreedersDeliveries(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return deliveryRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/orders")
    public Iterable<Order> getDeliveryOrders(@PathVariable Account account, @PathVariable Delivery delivery){
        checkDeliveryAccount(account, delivery);
        return orderRepository.getOrdersByDelivery(delivery);
    }

    @PostMapping(path = "/accounts/{account}/deliveries/{delivery}/orders")
    public Order saveDeliveryOrder(@PathVariable Account account, @PathVariable Delivery delivery, @Valid @RequestBody Order order){
        checkDeliveryAccount(account, delivery);
        return orderRepository.save(order);
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/bills", produces = APPLICATION_PDF_VALUE)
    public byte[] getBills(@PathVariable Account account, @PathVariable Delivery delivery) throws IOException {
        checkDeliveryAccount(account, delivery);
        Slaughter slaughter = slaughterRepository.findByDelivery(delivery);
        orderRepository.getOrdersByDelivery(delivery).forEach(order -> delivery.getOrders().add(order));
        return orderBillService.generatePDF(new OrderBillService.Arguments(slaughter, 1)).toByteArray();
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/ordersLabels", produces = APPLICATION_PDF_VALUE)
    public byte[] getOrdersLabels(@PathVariable Account account, @PathVariable Delivery delivery) throws IOException {
        checkDeliveryAccount(account, delivery);
        Slaughter slaughter = slaughterRepository.findByDelivery(delivery);
        orderRepository.getOrdersByDelivery(delivery).forEach(order -> delivery.getOrders().add(order));
        return orderLabelService.generatePDF(slaughter).toByteArray();
    }

    @GetMapping(path = "/accounts/{account}/deliveries/{delivery}/productElementsLabels/{elementsNames}")
    public byte[] getProductElementsLabels(@PathVariable Account account, @PathVariable Delivery delivery, @PathVariable String elementsNames) throws IOException {
        checkDeliveryAccount(account, delivery);
        Slaughter slaughter = slaughterRepository.findByDelivery(delivery);
        return productElementLabelService.generatePDF(new ProductElementLabelService.Arguments(slaughter, Arrays.asList(elementsNames.split("§")))).toByteArray();
    }

    private void checkDeliveryAccount(@PathVariable Account account, @PathVariable Delivery delivery) {
        Breeder breeder = (Breeder) account.getActor();
        Iterable<Delivery> authorizedDeliveries = deliveryRepository.findByFarm(breeder.getFarm());
        if (StreamSupport.stream(authorizedDeliveries.spliterator(), false).noneMatch(delivery::equals)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    String.format("account %s not authorized to access delivery %s", account.getId(), delivery.getId()));
        }
    }
}
