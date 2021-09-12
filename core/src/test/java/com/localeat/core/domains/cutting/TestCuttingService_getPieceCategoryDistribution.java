package com.localeat.core.domains.cutting;

import com.localeat.core.domains.slaughter.Animal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.offset;

@SpringBootTest
public class TestCuttingService_getPieceCategoryDistribution {

    @Autowired
    CuttingService cuttingService;

    @Test
    public void should_return_the_whole_animal(){
        // given
        var animal = new Animal();
        animal.setLiveWeight(500);
        cuttingService.updateMeatWeight(animal);

        // when
        Map<PieceCategory, Float> animalPieceCategoryDistribution = cuttingService.getPieceCategoryDistribution(animal);

        // then
        var totalMeatWeight = animalPieceCategoryDistribution.entrySet().stream().map(entry -> entry.getValue()).reduce(0f, Float::sum);
        assertThat(totalMeatWeight).isEqualTo(animal.getMeatWeight(), offset(0.01f));
    }
}
