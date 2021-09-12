package com.localeat.core.domains.cutting;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.Product;
import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static com.localeat.core.domains.cutting.PieceCategory.*;
import static com.localeat.core.domains.cutting.Shaping.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.offset;

@SpringBootTest
public class TestCuttingService_getCuttingPlan {

    @Autowired
    CuttingService cuttingService;

    @Test
    public void getCuttingPlan_should_return_expected_plan() throws ProductForSameSlaughterWithDifferentPieceCategoryException {
        // given
        var slaughter = new Slaughter();
        var animal = new Animal();
        animal.setLiveWeight(550);
        slaughter.setAnimal(animal);
        var delivery = new Delivery();
        slaughter.setDelivery(delivery);

        var product = new Product();
        product.setNetWeight(12);
        product.setShaping(FAUX_FILET, TRANCHE);
        product.setShaping(COTE, TRANCHE);
        product.setShaping(BASSE_COTE, ROTI);
        product.setShaping(RUMSTEAK, ROTI);
        product.setShaping(STEAK_STANDARD, TRANCHE);
        product.setShaping(STEAK_PREMIUM, TRANCHE);
        product.setShaping(BAVETTE, TRANCHE);
        product.setShaping(BOURGUIGNON, GROS_MORCEAUX);
        product.setShaping(PALERON, ROTI);
        product.setShaping(JARRET, GROS_MORCEAUX);
        product.setShaping(PLAT_DE_COTE, STEAK_HACHE);

        Batch batch = new Batch();
        batch.setProduct(product);
        batch.setQuantity(16);
        delivery.addToAvailableBatchs(batch);

        List<OrderItem> orderItems = new ArrayList<>();
        IntStream.rangeClosed(1, 16).forEach(i -> {
            var orderItem = new OrderItem();
            orderItem.setBatch(batch);
            orderItem.setQuantity(1);
            orderItems.add(orderItem);
            var order = new Order();
            order.addToOrderedItems(orderItem);
            delivery.addToOrders(order);
        });
        cuttingService.updateMeatWeight(animal);

        // when
        CuttingPlan cuttingPlan = cuttingService.getCuttingPlan(slaughter);

        // then
        assertThat(cuttingPlan.getWeight(FILET, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FILET, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FILET, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FILET, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FILET, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FILET, UNDEFINED)).isEqualTo(4.63f, offset(0.01f));

        assertThat(cuttingPlan.getWeight(FAUX_FILET, TRANCHE)).isEqualTo(7.60f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FAUX_FILET, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FAUX_FILET, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FAUX_FILET, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FAUX_FILET, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(FAUX_FILET, UNDEFINED)).isEqualTo(0f, offset(0.01f));

        assertThat(cuttingPlan.getWeight(COTE, TRANCHE)).isEqualTo(20.18f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(COTE, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(COTE, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(COTE, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(COTE, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(COTE, UNDEFINED)).isEqualTo(0f, offset(0.01f));

        assertThat(cuttingPlan.getWeight(BASSE_COTE, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BASSE_COTE, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BASSE_COTE, ROTI)).isEqualTo(7.54f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BASSE_COTE, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BASSE_COTE, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BASSE_COTE, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(RUMSTEAK, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(RUMSTEAK, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(RUMSTEAK, ROTI)).isEqualTo(7.84f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(RUMSTEAK, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(RUMSTEAK, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(RUMSTEAK, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, TRANCHE)).isEqualTo(36.77f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_PREMIUM, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, TRANCHE)).isEqualTo(11.46f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(STEAK_STANDARD, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(BAVETTE, TRANCHE)).isEqualTo(5.96f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BAVETTE, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BAVETTE, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BAVETTE, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BAVETTE, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BAVETTE, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(BOURGUIGNON, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BOURGUIGNON, GROS_MORCEAUX)).isEqualTo(34.75f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BOURGUIGNON, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BOURGUIGNON, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BOURGUIGNON, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(BOURGUIGNON, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(PALERON, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PALERON, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PALERON, ROTI)).isEqualTo(12, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PALERON, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PALERON, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PALERON, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(JARRET, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(JARRET, GROS_MORCEAUX)).isEqualTo(15.9f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(JARRET, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(JARRET, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(JARRET, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(JARRET, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, STEAK_HACHE)).isEqualTo(32.19f, offset(0.01f));
        assertThat(cuttingPlan.getWeight(PLAT_DE_COTE, UNDEFINED)).isEqualTo(0, offset(0.01f));

        assertThat(cuttingPlan.getWeight(QUEUE, TRANCHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(QUEUE, GROS_MORCEAUX)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(QUEUE, ROTI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(QUEUE, HACHI)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(QUEUE, STEAK_HACHE)).isEqualTo(0, offset(0.01f));
        assertThat(cuttingPlan.getWeight(QUEUE, UNDEFINED)).isEqualTo(1.17f, offset(0.01f));

        Float cuttingPlanTotalWeight = cuttingPlan.getElements().stream().map(CuttingPlan.CuttingPlanElement::getWeight).reduce(0f, Float::sum);
        assertThat(cuttingPlanTotalWeight).isEqualTo(animal.getMeatWeight(), offset(0.01f));

    }
}
