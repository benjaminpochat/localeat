package com.localeat.core.domains.cutting;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.Product;
import com.localeat.core.domains.slaughter.Slaughter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static com.localeat.core.domains.cutting.PieceCategory.*;
import static com.localeat.core.domains.cutting.Shaping.ROTI;
import static com.localeat.core.domains.cutting.Shaping.TRANCHE;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class TestCuttingService_checkAllProductsContainsSamePieceCategories {

    @Autowired
    CuttingService cuttingService;

    @Test
    public void should_return_without_an_exception() throws ProductForSameSlaughterWithDifferentPieceCategoryException {
        // given
        var slaughter = new Slaughter();
        var delivery = new Delivery();
        slaughter.setDelivery(delivery);
        var productBig = new Product();
        productBig.setNetWeight(12);
        productBig.setShaping(FAUX_FILET, TRANCHE);
        productBig.setShaping(COTE, TRANCHE);
        productBig.setShaping(BASSE_COTE, ROTI);
        Batch batchOfProductsBig = new Batch();
        batchOfProductsBig.setProduct(productBig);
        delivery.addToAvailableBatchs(batchOfProductsBig);

        var productSmall = new Product();
        productSmall.setNetWeight(6);
        productSmall.setShaping(FAUX_FILET, TRANCHE);
        productSmall.setShaping(COTE, TRANCHE);
        productSmall.setShaping(BASSE_COTE, ROTI);
        Batch batchOfProductsSmall = new Batch();
        batchOfProductsSmall.setProduct(productSmall);
        delivery.addToAvailableBatchs(batchOfProductsSmall);

        // when / then
        cuttingService.checkAllProductsContainsSamePieceCategories(slaughter);
    }

    @Test
    public void should_throw_an_exception() {
        // given
        var slaughter = new Slaughter();
        var delivery = new Delivery();
        slaughter.setDelivery(delivery);
        var productBig = new Product();
        productBig.setNetWeight(12);
        productBig.setShaping(FAUX_FILET, TRANCHE);
        productBig.setShaping(COTE, TRANCHE);
        productBig.setShaping(BASSE_COTE, ROTI);
        Batch batchOfProductsBig = new Batch();
        batchOfProductsBig.setProduct(productBig);
        delivery.addToAvailableBatchs(batchOfProductsBig);

        var productSmall = new Product();
        productSmall.setNetWeight(6);
        productSmall.setShaping(FAUX_FILET, TRANCHE);
        productSmall.setShaping(COTE, TRANCHE);
        Batch batchOfProductsSmall = new Batch();
        batchOfProductsSmall.setProduct(productSmall);
        delivery.addToAvailableBatchs(batchOfProductsSmall);

        // when / then
        assertThatThrownBy(() -> cuttingService.checkAllProductsContainsSamePieceCategories(slaughter)).isInstanceOf(ProductForSameSlaughterWithDifferentPieceCategoryException.class);
    }
}
