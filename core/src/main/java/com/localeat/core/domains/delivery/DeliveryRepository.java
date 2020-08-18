package com.localeat.core.domains.delivery;

import com.localeat.core.domains.farm.Farm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DeliveryRepository extends CrudRepository<Delivery, Long> {
    @Query("SELECT d FROM Slaughter s " +
            "INNER JOIN s.delivery d " +
            "INNER JOIN s.animal a " +
            "WHERE a.finalFarm = :farm")
    Iterable<Delivery> findByFarm(@Param("farm") Farm farm);
}
