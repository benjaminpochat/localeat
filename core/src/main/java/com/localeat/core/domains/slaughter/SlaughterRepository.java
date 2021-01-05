package com.localeat.core.domains.slaughter;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.farm.Farm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SlaughterRepository extends CrudRepository<Slaughter, Long> {
    @Query("SELECT s FROM Slaughter s " +
            "INNER JOIN s.animal a " +
            "WHERE a.finalFarm = :farm")
    Iterable<Slaughter> findByFarm(@Param("farm") Farm farm);

    @Query("SELECT s FROM Slaughter s " +
            "WHERE s.delivery = :delivery")
    Slaughter findByDelivery(@Param("delivery") Delivery delivery);
}
