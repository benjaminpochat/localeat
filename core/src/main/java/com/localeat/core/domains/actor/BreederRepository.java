package com.localeat.core.domains.actor;

import com.localeat.core.domains.farm.Farm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BreederRepository extends CrudRepository<Breeder, Long> {
    @Query("SELECT b FROM Breeder b " +
            "WHERE b.farm = :farm")
    Iterable<Breeder> findBreedersByFarm(@Param("farm") Farm farm);
}
