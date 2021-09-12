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
import static com.localeat.core.domains.cutting.Shaping.UNDEFINED;


@Service
public class CuttingService {

    private Map<PieceCategory, Float> getPieceCategoryPercentage() {
        Map<PieceCategory, Float> categoryDistribtion = new HashMap<>();
        categoryDistribtion.put(FILET, 0.0234f);
        categoryDistribtion.put(FAUX_FILET, 0.0384f);
        categoryDistribtion.put(COTE, 0.1019f);
        categoryDistribtion.put(BASSE_COTE, 0.0381f);
        categoryDistribtion.put(RUMSTEAK, 0.0396f);
        categoryDistribtion.put(STEAK_PREMIUM, 0.1857f);
        categoryDistribtion.put(STEAK_STANDARD, 0.0579f);
        categoryDistribtion.put(BAVETTE, 0.0301f);
        categoryDistribtion.put(BOURGUIGNON, 0.1755f);
        categoryDistribtion.put(PALERON, 0.0606f);
        categoryDistribtion.put(JARRET, 0.0803f);
        categoryDistribtion.put(PLAT_DE_COTE, 0.1626f);
        categoryDistribtion.put(QUEUE, 0.0059f);
        return categoryDistribtion;
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
        completeCuttinPlanWithUndefinedShapings(cuttingPlan, slaughter.getAnimal());
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

    private void completeCuttinPlanWithUndefinedShapings(CuttingPlan cuttingPlan, Animal animal) {
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
