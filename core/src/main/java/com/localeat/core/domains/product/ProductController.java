package com.localeat.core.domains.product;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping(path = "/accounts/{account}/products")
    public Product getBreedersProduct(@PathVariable Account account, @RequestBody Product product){
        Breeder breeder = (Breeder) account.getActor();
        product.setFarm(breeder.getFarm());
        return productRepository.save(product);
    }

    @GetMapping(path = "/accounts/{account}/products")
    public Iterable<Product> getBreedersProduct(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return productRepository.findByFarm(breeder.getFarm());
    }

}
