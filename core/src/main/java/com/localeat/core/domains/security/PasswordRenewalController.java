package com.localeat.core.domains.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.StreamSupport;

@RestController
public class PasswordRenewalController {

    @Autowired
    AccountRepository accountRepository;

    @PostMapping(path = "/passwordRenewal/{email}")
    public String renewPassword(@PathVariable String email){
        Account account = StreamSupport.stream(accountRepository.findByEmail(email).spliterator(), false).findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("No account for email address %s.", email)));
        // TODO : générer un token et envoyer un mail
        return String.format("An email has been sent to %s.", email);
    }
}
