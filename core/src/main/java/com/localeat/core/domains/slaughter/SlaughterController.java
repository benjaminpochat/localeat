package com.localeat.core.domains.slaughter;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.product.Product;
import com.localeat.core.domains.product.ProductRepository;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class SlaughterController {
    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping(path = "/accounts/{account}/slaughters")
    public Slaughter setSlaughter(@PathVariable Account account, @Valid @RequestBody Slaughter slaughter){
        Breeder breeder = (Breeder) account.getActor();
        slaughter.getAnimal().setFinalFarm(breeder.getFarm());
        Slaughter savedSlaughter = slaughterRepository.save(slaughter);
        setAnimalToDeliveredProducts(savedSlaughter);
        return savedSlaughter;
    }

    private void setAnimalToDeliveredProducts(Slaughter savedSlaughter) {
        if(savedSlaughter.getDelivery() != null) {
            savedSlaughter.getDelivery().getAvailableProducts().forEach(product -> {
                product.setAnimal(savedSlaughter.getAnimal());
                productRepository.save(product);
            });
        }
    }

    @GetMapping(path = "/accounts/{account}/slaughters")
    public Iterable<Slaughter> getAllSlaughter(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return slaughterRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/accounts/{account}/slaughters/{id}")
    public Optional<Slaughter> getSlaughter(@PathVariable Account account, @PathVariable Long id){
        return slaughterRepository.findById(id);
    }
}
