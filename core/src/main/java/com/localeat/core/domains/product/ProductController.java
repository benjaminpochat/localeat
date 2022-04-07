package com.localeat.core.domains.product;

import com.localeat.core.domains.actor.Breeder;
import com.localeat.core.domains.image.Image;
import com.localeat.core.domains.image.ImageRepository;
import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.StreamSupport;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTemplateRepository productTemplateRepository;

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping(path = "/accounts/{account}/products")
    public Product saveBreedersProduct(@PathVariable Account account, @RequestBody Product product){
        Breeder breeder = (Breeder) account.getActor();
        product.setFarm(breeder.getFarm());
        imageRepository.save(product.getPhoto());
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
        if( template.getPhoto() != null ) {
            imageRepository.save(template.getPhoto());
        }
        return productTemplateRepository.save(template);
    }

    @GetMapping(path = "/accounts/{account}/productTemplates")
    public Iterable<ProductTemplate> getBreedersProductTemplates(@PathVariable Account account){
        Breeder breeder = (Breeder) account.getActor();
        return productTemplateRepository.findByFarm(breeder.getFarm());
    }

    @GetMapping(path = "/products/{product}/photo")
    public Image getProductPhoto(@PathVariable Product product) {
        return imageRepository.findById(product.getPhoto().getId()).get();
    }

    @GetMapping(path = "/accounts/{account}/productTemplates/{productTemplate}/photo")
    public Image getProductTemplateImage(@PathVariable Account account, @PathVariable ProductTemplate productTemplate) {
        Breeder breeder = (Breeder) account.getActor();
        Iterable<ProductTemplate> breedersTemplates = productTemplateRepository.findByFarm(breeder.getFarm());
        if (StreamSupport.stream(breedersTemplates.spliterator(), false).noneMatch(breedersTemplate -> breedersTemplate.equals(productTemplate))){
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    String.format("account %s not authorized to access product template %s", account.getId(), productTemplate.getId()));
        }
        return productTemplate.getPhoto();
    }

}
