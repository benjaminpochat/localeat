package com.localeat.core.domains.security;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Account getAccountByUsername(String username);

    @Query("SELECT a FROM Account a " +
            "INNER JOIN a.actor act " +
            "WHERE act.email = :email")
    Iterable<Account> findByEmail(@Param("email") String email);
}
