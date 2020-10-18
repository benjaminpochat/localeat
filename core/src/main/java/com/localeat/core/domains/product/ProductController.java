package com.localeat.core.domains.product;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping(path = "/accounts/{account}/products")
    public Iterable<Product> getBreedersProduct(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return productRepository.findByFarm(breeder.getFarm());
    }

}
