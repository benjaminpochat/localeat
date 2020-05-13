package com.localeat.core.domains.slaughter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class SlaughterController {
    @Autowired
    private SlaughterRepository slaughterRepository;

    @PostMapping(path = "/slaughters")
    public Slaughter setSlaughter(@Valid @RequestBody Slaughter slaughter){
        return slaughterRepository.save(slaughter);
    }

    @GetMapping(path = "/slaughters")
    public Iterable<Slaughter> getAllSlaughter(){
        return slaughterRepository.findAll();
    }

    @GetMapping(path = "/slaughters/{id}")
    public Optional<Slaughter> getSlaughter(@PathVariable Long id){
        return slaughterRepository.findById(id);
    }


}
