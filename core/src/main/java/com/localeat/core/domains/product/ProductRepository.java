package com.localeat.core.domains.product;

import com.localeat.core.domains.farm.Farm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends CrudRepository<Product, Long> {
    @Query("SELECT p FROM Product p " +
            "WHERE p.farm = :farm")
    Iterable<Product> findByFarm(@Param("farm") Farm farm);
}
