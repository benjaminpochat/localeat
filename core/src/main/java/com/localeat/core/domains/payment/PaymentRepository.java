package com.localeat.core.domains.payment;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends CrudRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p " +
            "WHERE p.transactionId = :transactionId ")
    Payment findByTransactionId(@Param("transactionId") String transactionId);
}
