package com.localeat.core.domains.product;

import com.localeat.core.domains.farm.Farm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductTemplateRepository extends CrudRepository<ProductTemplate, Long> {
    @Query("SELECT p FROM ProductTemplate p " +
            "WHERE p.farm = :farm")
    Iterable<ProductTemplate> findByFarm(@Param("farm") Farm farm);

}
