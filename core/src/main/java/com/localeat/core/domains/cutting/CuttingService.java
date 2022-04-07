package com.localeat.core.domains.cutting;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.Product;
import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.localeat.core.domains.cutting.PieceCategory.*;
import static com.localeat.core.domains.cutting.Shaping.GROS_MORCEAUX;
import static com.localeat.core.domains.cutting.Shaping.HACHI;
import static com.localeat.core.domains.cutting.Shaping.ROTI;
import static com.localeat.core.domains.cutting.Shaping.STEAK_HACHE;
import static com.localeat.core.domains.cutting.Shaping.TRANCHE;
import static com.localeat.core.domains.cutting.Shaping.UNDEFINED;


@Service
public class CuttingService {

    Map<PieceCategory, Float> getPieceCategoryPercentage() {
        Map<PieceCategory, Float> categoryDistribution = new HashMap<>();
        categoryDistribution.put(FILET, 0.0234f);
        categoryDistribution.put(FAUX_FILET, 0.0384f);
        categoryDistribution.put(COTE, 0.1019f);
        categoryDistribution.put(BASSE_COTE, 0.0381f);
        categoryDistribution.put(RUMSTEAK, 0.0396f);
        categoryDistribution.put(STEAK_PREMIUM, 0.1857f);
        categoryDistribution.put(STEAK_STANDARD, 0.0579f);
        categoryDistribution.put(BAVETTE, 0.0301f);
        categoryDistribution.put(BOURGUIGNON, 0.1755f);
        categoryDistribution.put(PALERON, 0.0606f);
        categoryDistribution.put(JARRET, 0.0803f);
        categoryDistribution.put(PLAT_DE_COTE, 0.1626f);
        categoryDistribution.put(QUEUE, 0.0059f);
        return categoryDistribution;
    }

    Map<PieceCategory, Set<Shaping>> getPieceCategoryShapings() {
        Map<PieceCategory, Set<Shaping>> availableShapings = new HashMap<>();
        availableShapings.put(FILET, Set.of(ROTI, TRANCHE));
        availableShapings.put(FAUX_FILET, Set.of(TRANCHE));
        availableShapings.put(COTE, Set.of(TRANCHE));
        availableShapings.put(BASSE_COTE, Set.of(ROTI, HACHI, STEAK_HACHE));
        availableShapings.put(RUMSTEAK, Set.of(TRANCHE, ROTI));
        availableShapings.put(STEAK_PREMIUM, Set.of(HACHI, STEAK_HACHE, TRANCHE));
        availableShapings.put(STEAK_STANDARD, Set.of(HACHI, STEAK_HACHE, TRANCHE));
        availableShapings.put(BAVETTE, Set.of(TRANCHE));
        availableShapings.put(BOURGUIGNON, Set.of(HACHI, STEAK_HACHE, GROS_MORCEAUX));
        availableShapings.put(PALERON, Set.of(ROTI, HACHI, STEAK_HACHE));
        availableShapings.put(JARRET, Set.of(GROS_MORCEAUX));
        availableShapings.put(PLAT_DE_COTE, Set.of(HACHI, STEAK_HACHE));
        availableShapings.put(QUEUE, Set.of(GROS_MORCEAUX));
        return availableShapings;
    }

    public void updateMeatWeight(Animal animal) {
        //source rendement moyen : https://www.la-viande.fr/economie-metiers/economie/chiffres-cles-viande-bovine/rendement-type-vache-allaitante
        // NE VAUT QUE POUT LES VACHES ALAITTANTES, PLUTOT CHAROLAISES
        animal.setMeatWeight(animal.getLiveWeight() * 0.36f);
    }

    public Map<PieceCategory, Float> getPieceCategoryDistribution(Animal animal){
        return getPieceCategoryPercentage().entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> entry.getKey(),
                        entry -> animal.getMeatWeight() * entry.getValue()));
    }

    /**
     * Postulat :
     * - tous les produits vendus contiennent les mêmes catégories de pièces
     * - certaines catégories de pièce peuvent être écartées de la vente (ex. le filet)
     *
     * @param slaughter
     * @return
     */
    public CuttingPlan getCuttingPlan(Slaughter slaughter) throws ProductForSameSlaughterWithDifferentPieceCategoryException {
        var cuttingPlan =  new CuttingPlan();
        Delivery delivery = slaughter.getDelivery();
        checkAllProductsContainsSamePieceCategories(slaughter);
        List<PieceCategory> pieceCategoriesInProducts = getPieceCategoriesInProduct(delivery);
        Map<PieceCategory, Float> pieceCategoryPercentagesInProducts = getPieceCategoryDistributionInProducts(pieceCategoriesInProducts);
        List<OrderItem> allOrderItemsSold = getAllOrderItemsSold(delivery);
        fillCuttingPlanWithOrderItemsSold(cuttingPlan, slaughter.getAnimal(), delivery, allOrderItemsSold, pieceCategoryPercentagesInProducts);
        completeCuttingPlanWithUndefinedShapings(cuttingPlan, slaughter.getAnimal());
        return cuttingPlan;
    }

    public void checkAllProductsContainsSamePieceCategories(Slaughter slaughter) throws ProductForSameSlaughterWithDifferentPieceCategoryException {
        Delivery delivery = slaughter.getDelivery();
        List<Product> products = delivery.getAvailableBatches().stream()
                .map(Batch::getProduct)
                .collect(Collectors.toList());
        Collection<PieceCategory> pieceCategoriesForFirstProduct = products.get(0).getPieceCategories();
        products.remove(0);
        boolean productsWithDifferentPieceCategories = products.stream().anyMatch(product ->
                !product.getPieceCategories().containsAll(pieceCategoriesForFirstProduct)
                        || !pieceCategoriesForFirstProduct.containsAll(product.getPieceCategories()));

        if (productsWithDifferentPieceCategories) {
            throw new ProductForSameSlaughterWithDifferentPieceCategoryException(slaughter);
        }
    }

    public List<PieceCategory> getPieceCategoriesInProduct(Delivery delivery) {
        return delivery.getAvailableBatches().stream()
                .flatMap(batch -> batch.getProduct().getPieceCategories().stream())
                .distinct()
                .collect(Collectors.toList());
    }

    public Map<PieceCategory, Float> getPieceCategoryDistributionInProducts(List<PieceCategory> pieceCategoriesInProducts) {
        Map<PieceCategory, Float> pieceCategoryDistributionInProducts = new HashMap<>();
        Map<PieceCategory, Float> allPieceCategoryDistribution = getPieceCategoryPercentage();
        pieceCategoriesInProducts.forEach(pieceCategory -> pieceCategoryDistributionInProducts.put(pieceCategory, allPieceCategoryDistribution.get(pieceCategory)));
        return pieceCategoryDistributionInProducts;
    }

    public List<OrderItem> getAllOrderItemsSold(Delivery delivery) {
        return delivery.getOrders().stream()
                .flatMap(order -> order.getOrderedItems().stream())
                .collect(Collectors.toList());
    }

    public void fillCuttingPlanWithOrderItemsSold(CuttingPlan cuttingPlan, Animal animal, Delivery delivery, List<OrderItem> allOrderItemsSold, Map<PieceCategory, Float> pieceCategoryPercentagesInProducts) {
        allOrderItemsSold.stream()
                .forEach(orderItem -> {
                    pieceCategoryPercentagesInProducts.keySet().forEach(pieceCategory -> {
                        cuttingPlan.setWeight(pieceCategory,
                                orderItem.getBatch().getProduct().getShaping(pieceCategory),
                                // option 1 : la quantité est basée sur la quantité de produit vendu par rapport à la quantité de produits mis en vente
                                //   la quantité totale de produit mise en vente doit correspondre à la quantité de viande sur l'animal
                                animal.getMeatWeight() * pieceCategoryPercentagesInProducts.get(pieceCategory) * orderItem.getQuantity() / delivery.getAvailableBatches().stream().map(Batch::getQuantity).reduce(0, Integer::sum));
                                // option 2 : la quantité est basée sur la quantité de produits vendus et du poids de viande dans chaque produit
                                //   ca permet de ne pas définir à l'avance le nombre de produits mis en vente
                                // pieceCategoryPercentagesInProducts.get(pieceCategory) * orderItem.getBatch().getProduct().getNetWeight() * orderItem.getQuantity());
                    });
                });
    }

    private void completeCuttingPlanWithUndefinedShapings(CuttingPlan cuttingPlan, Animal animal) {
        Map<PieceCategory, Float> meatWeightPerPieceCategoryInAnimal = getPieceCategoryDistribution(animal);
        Map<PieceCategory, Float> meatWeightPerPieceCategoryInCuttingPlan = Arrays.stream(values())
                .collect(Collectors.toMap(
                        Function.identity(),
                        pieceCategory -> Arrays.stream(Shaping.values())
                                .filter(shaping -> !shaping.equals(UNDEFINED))
                                .map(shaping -> cuttingPlan.getWeight(pieceCategory, shaping))
                                .reduce(0f, Float::sum)
                ));
        Map<PieceCategory, Float> meatWeightUndefinedPerPieceCategory = Arrays.stream(values())
                .collect(Collectors.toMap(
                        Function.identity(),
                        pieceCategory -> meatWeightPerPieceCategoryInAnimal.get(pieceCategory) - meatWeightPerPieceCategoryInCuttingPlan.get(pieceCategory)
                ));
        Arrays.stream(values()).forEach(pieceCategory -> cuttingPlan.setWeight(pieceCategory, UNDEFINED, meatWeightUndefinedPerPieceCategory.get(pieceCategory)));
    }
}
