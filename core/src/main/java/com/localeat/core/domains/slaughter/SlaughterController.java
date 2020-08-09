package com.localeat.core.domains.slaughter;

import com.localeat.core.domains.security.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class SlaughterController {
    @Autowired
    private SlaughterRepository slaughterRepository;

    @PostMapping(path = "/accounts/{account}/slaughters")
    public Slaughter setSlaughter(@PathVariable Account account, @Valid @RequestBody Slaughter slaughter){
        return slaughterRepository.save(slaughter);
    }

    @GetMapping(path = "/accounts/{account}/slaughters")
    public Iterable<Slaughter> getAllSlaughter(@PathVariable Account account){
        return slaughterRepository.findAll();
    }

    @GetMapping(path = "/accounts/{account}/slaughters/{id}")
    public Optional<Slaughter> getSlaughter(@PathVariable Account account, @PathVariable Long id){
        return slaughterRepository.findById(id);
    }
}
