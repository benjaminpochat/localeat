package com.localeat.core.domains.security;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.actor.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.validation.Valid;
import java.util.Arrays;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path = "/account")
    @Transactional
    public Account createAccount(@Valid @RequestBody AccountContext accountContext){
        isAccountContextValid(accountContext);
        if (Role.CUSTOMER.equals(accountContext.role)){
            Account account = accountContext.getAccount();
            Customer customer = (Customer) account.getActor();
            customerRepository.save(customer);
            accountRepository.save(account);
            User user = new User(account.getUsername(), passwordEncoder.encode(accountContext.getPassword()), Arrays.asList(new SimpleGrantedAuthority(accountContext.getRole().name())));
            UserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
            userDetailsManager.createUser(user);
            return account;
        }
        return null;
    }

    private void isAccountContextValid(@RequestBody @Valid AccountContext userContext) {
        Account account = userContext.getAccount();
        if(accountRepository.getAccountByUsername(account.getUsername()) != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "username already used");
        }
        if(userContext.getPassword() == null || userContext.getPassword().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "password empty");
        }
        if(account.getUsername() == null || account.getUsername().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username empty");
        }
        if(account.getActor().getEmail() == null || account.getActor().getEmail().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email empty");
        }
        if(account.getActor().getPhoneNumber() == null || account.getActor().getPhoneNumber().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "phone number empty");
        }
        if(account.getActor().getName() == null || account.getActor().getName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name empty");
        }
        if(account.getActor().getFirstName() == null || account.getActor().getFirstName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "first name empty");
        }
    }
}
