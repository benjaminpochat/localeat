package com.localeat.core.domains.farm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@RestController
public class FarmController {

    @Autowired
    FarmRepository farmRepository;

    @GetMapping(path = "/farms/random/slideshowurl")
    public String getRandomFarmSlideShowUrl() {
        List<Farm> farms = new ArrayList<>();
        farmRepository.findAll().forEach(farm -> {
            if (farm.getSlideshowUrl() != null && !farm.getSlideshowUrl().isEmpty()) {
                farms.add(farm);
            }
        });
        if(farms.isEmpty()) {
            return null;
        }
        Farm farm = farms.get(ThreadLocalRandom.current().nextInt(0, farms.size()));
        return farm.getSlideshowUrl();
    }
}
