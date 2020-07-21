package com.localeat.core.domains.delivery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @GetMapping(path = "/deliveries")
    public Iterable<Delivery> getAllDeliveries(){
        return deliveryRepository.findAll();
    }

}
