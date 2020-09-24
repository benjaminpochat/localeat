package com.localeat.core.domains.security;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.actor.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import javax.validation.Valid;
import java.util.Arrays;

import static com.localeat.core.domains.security.Role.CUSTOMER;

@RestController
public class UserController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path = "/users")
    public User createUser(@Valid @RequestBody UserContext userContext){
        if (Role.CUSTOMER.equals(userContext.role)){
            Customer customer = (Customer) userContext.getAccount().getActor();
            customerRepository.save(customer);
            accountRepository.save(userContext.getAccount());
            User user = new User(userContext.getAccount().getUsername(), passwordEncoder.encode(userContext.getPassword()), Arrays.asList(new SimpleGrantedAuthority(userContext.getRole().name())));
            UserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
            userDetailsManager.createUser(user);
            return user;
        }
        return null;
    }
}
