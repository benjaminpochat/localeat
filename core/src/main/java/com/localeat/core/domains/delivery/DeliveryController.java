package com.localeat.core.domains.delivery;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @GetMapping(path = "/accounts/{account}/deliveries")
    public Iterable<Delivery> getAllDeliveries(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return deliveryRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/deliveries")
    public Iterable<Delivery> getAllDeliveries(){
        return deliveryRepository.findAll();
    }

}
