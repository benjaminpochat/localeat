package com.localeat.core.domains.product;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTemplateRepository productTemplateRepository;

    @PostMapping(path = "/accounts/{account}/products")
    public Product saveBreedersProduct(@PathVariable Account account, @RequestBody Product product){
        Breeder breeder = (Breeder) account.getActor();
        product.setFarm(breeder.getFarm());
        return productRepository.save(product);
    }

    @GetMapping(path = "/accounts/{account}/products")
    public Iterable<Product> getBreedersProducts(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return productRepository.findByFarm(breeder.getFarm());
    }

    @PostMapping(path = "/accounts/{account}/productTemplates")
    public ProductTemplate saveBreedersProductTemplate(@PathVariable Account account, @RequestBody ProductTemplate template){
        Breeder breeder = (Breeder) account.getActor();
        template.setFarm(breeder.getFarm());
        return productTemplateRepository.save(template);
    }

    @GetMapping(path = "/accounts/{account}/productTemplates")
    public Iterable<ProductTemplate> getBreedersProductTemplates(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return productTemplateRepository.findByFarm(breeder.getFarm());
    }

}
