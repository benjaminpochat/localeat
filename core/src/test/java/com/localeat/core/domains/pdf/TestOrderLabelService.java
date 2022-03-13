package com.localeat.core.domains.pdf;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.product.Batch;
import com.localeat.core.domains.product.Product;
import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;

import static com.localeat.core.domains.order.OrderStatus.PAYED;
import static com.localeat.core.domains.slaughter.AnimalBreed.BEEF_LIMOUSIN;
import static com.localeat.core.domains.slaughter.AnimalType.*;

class TestOrderLabelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestOrderLabelService.class);

    @TempDir
    File outputFolder;

    @Test
    void generatePDF_with_an_order_with_one_single_item_should_produce_a_correct_pdf() throws IOException, URISyntaxException {
        // given
        Slaughter slaughter = new Slaughter();
        Animal animal = new Animal();
        animal.setAnimalType(BEEF_HEIFER);
        animal.setBreed(BEEF_LIMOUSIN);
        animal.setIdentificationNumber("FR1234578912");
        animal.setCertifiedLabelRouge(true);
        animal.setBirthDate(LocalDate.of(2016, 12, 25));
        animal.setBirthFarm("EARL de l'Etoile");
        animal.setBirthPlace("57580 Béchy");
        slaughter.setAnimal(animal);
        slaughter.setSlaughterDate(LocalDate.of(2022, 2, 20));
        slaughter.setSlaughterHouse("Abattoir Rachal");
        slaughter.setSlaughterPlace("57000 Metz");
        slaughter.setCuttingDate(LocalDate.of(2022, 3, 11));
        slaughter.setCuttingButcher("Ets Gamet");
        slaughter.setCuttingPlace("54800 Conflans");
        OrderLabelService orderLabelService = new OrderLabelService();
        Delivery delivery = createDelivery();
        Order orderWithOneSingleItem = createOrderWithOneSingleItem();
        Order orderWithTwoItem = createOrderWithTwoItems();
        delivery.setOrders(new HashSet<>());
        delivery.getOrders().add(orderWithOneSingleItem);
        delivery.getOrders().add(orderWithTwoItem);
        slaughter.setDelivery(delivery);

        // when
        ByteArrayOutputStream outputStream = orderLabelService.generatePDF(slaughter);

        // then
        File orderLabelFile = new File(outputFolder, "order_labels.pdf");
        FileOutputStream fileOutputStream = new FileOutputStream(orderLabelFile);
        outputStream.writeTo(fileOutputStream);
        fileOutputStream.flush();
        LOGGER.info(String.format("PDF file at %s", orderLabelFile.getAbsolutePath()));
        LOGGER.info("Test end.");
    }

    private Delivery createDelivery() {
        Delivery delivery = new Delivery();
        delivery.setName("CAS METZ REGIE (offre réservée aux bénéficiaires)");
        delivery.setDeliveryStart(LocalDateTime.of(2022, 3, 11, 16, 45));
        delivery.setDeliveryEnd(LocalDateTime.of(2022, 3, 11, 18, 0));
        return delivery;
    }

    private Order createOrderWithOneSingleItem() {
        Order order = new Order();
        Customer customer = createCustomer();
        order.setId(11L);
        order.setCustomer(customer);
        order.setStatus(PAYED);
        createOrderItem(order, createBatchOfProduct(createProduct()));
        return order;
    }

    private Order createOrderWithTwoItems() {
        Order order = new Order();
        Customer customer = createCustomer();
        order.setId(12L);
        order.setCustomer(customer);
        order.setStatus(PAYED);
        createOrderItem(order, createBatchOfProduct(createProduct()));
        createOrderItem(order, createBatchOfProduct(createAnotherProduct()));
        return order;
    }

    private void createOrderItem(Order order, Batch batch) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(order);
        orderItem.setQuantity(1);
        orderItem.setBatch(batch);
        order.addToOrderedItems(orderItem);
    }

    private Customer createCustomer() {
        Customer customer = new Customer();
        customer.setName("PIGNON");
        customer.setFirstName("François");
        customer.setPhoneNumber("0612345678");
        return customer;
    }

    private Batch createBatchOfProduct(Product product) {
        Batch batch = new Batch();
        batch.setQuantity(1);
        batch.setProduct(product);
        return batch;
    }

    private Product createProduct() {
        Product product = new Product();
        product.setName("Colis tradition");
        product.setNetWeight(10);
        product.setDescription("Le colis cuisson rapide est composé de :\n" +
                "- 1 côte de boeuf\n" +
                "- 1 rosbeef\n" +
                "- 4 kg de steaks (paquets de 2 ou 4)\n" +
                "- 1 roti\n" +
                "- 4,5 kg de steaks hachés (paquets de 2 ou 4)\n" +
                "\n" +
                "Les quantités peuvent varier légèrement.");
        return product;
    }

    private Product createAnotherProduct() {
        Product product = new Product();
        product.setName("Filet");
        product.setNetWeight(0.5f);
        product.setDescription("Les filets sont vendus à l'unité, pour un poids d'environ 500g.\n" +
                "Le paiement à la commande est calculé pour un poids de 500g.\n" +
                "Le prix définitif est calculé après la découpe, à la pesée.\n" +
                "Le solde est réglé ou remboursé à la livraison en chèque ou espèces.");
        return product;
    }
}
