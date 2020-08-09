package com.localeat.core.domains.security;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Account getAccountByUsername(String username);
}
