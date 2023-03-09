package com.localeat.core.domains.pdf;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.delivery.Address;
import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.farm.Farm;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.order.OrderStatus;
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
import java.time.LocalDateTime;
import java.util.HashSet;

class TestOrderBillService {


    private static final Logger LOGGER = LoggerFactory.getLogger(TestOrderBillService.class);

    @TempDir
    File outputFolder;


    @Test
    void generatePDF_should_produce_a_correct_pdf() throws URISyntaxException, IOException {
        // given
        var service = new OrderBillService();
        var slaughter = new Slaughter();
        var delivery = new Delivery();
        delivery.setId(1l);
        delivery.setDeliveryStart(LocalDateTime.of(2022, 3, 11, 16, 45));
        slaughter.setDelivery(delivery);
        Batch batch1 = getProductBatch1();
        Batch batch2 = getProductBatch2();
        var animal = new Animal();
        animal.setFinalFarm(getFarm());
        slaughter.setAnimal(animal);
        delivery.setOrders(new HashSet<>());
        Order orderWithOneProduct = getOrderWithOneProduct(delivery, batch1);
        delivery.getOrders().add(orderWithOneProduct);
        Order orderWithSeveralProducts = getOrderWithSeveralProducts(delivery, batch1, batch2);
        delivery.getOrders().add(orderWithSeveralProducts);

        // when
        ByteArrayOutputStream outputStream = service.generatePDF(new OrderBillService.Arguments(slaughter, 1));

        // then
        File productElementLabelFile = new File(outputFolder, "product_element_labels.pdf");
        FileOutputStream fileOutputStream = new FileOutputStream(productElementLabelFile);
        outputStream.writeTo(fileOutputStream);
        fileOutputStream.flush();
        LOGGER.info(String.format("PDF file at %s", productElementLabelFile.getAbsolutePath()));
        LOGGER.info("Test end.");
    }

    private Order getOrderWithOneProduct(Delivery delivery, Batch batch) {
        var order = new Order();

        var item = new OrderItem();
        item.setBatch(batch);
        item.setUnitPrice(165f);
        item.setQuantity(2);

        order.setStatus(OrderStatus.PAYED);
        order.setId(23l);
        order.addToOrderedItems(item);
        order.setPaymentDate(LocalDateTime.of(2022, 2, 8, 16, 45));

        Customer customer = getCustomerBob();
        order.setCustomer(customer);

        return order;
    }

    private Order getOrderWithSeveralProducts(Delivery delivery, Batch batch1, Batch batch2) {
        var order = new Order();

        var item1 = new OrderItem();
        item1.setBatch(batch1);
        item1.setUnitPrice(165f);
        item1.setQuantity(1);
        order.addToOrderedItems(item1);

        var item2 = new OrderItem();
        item2.setBatch(batch2);
        item2.setUnitPrice(82.5f);
        item2.setQuantity(3);
        order.addToOrderedItems(item2);

        order.setStatus(OrderStatus.PAYED);
        order.setId(26l);
        order.setPaymentDate(LocalDateTime.of(2022, 2, 10, 16, 45));

        Customer customer = getCustomerBill();
        order.setCustomer(customer);

        return order;
    }

    private Batch getProductBatch1() {
        var batch = new Batch();
        var product = new Product();
        product.setName("Colis tradition");
        product.setNetWeight(10);
        batch.setProduct(product);
        return batch;
    }

    private Batch getProductBatch2() {
        var batch = new Batch();
        var product = new Product();
        product.setName("Petit colis steaks");
        product.setNetWeight(5);
        batch.setProduct(product);
        return batch;
    }

    private Farm getFarm() {
        var farm = new Farm();
        farm.setName("La ferme des pommiers");
        Address address = new Address("5 rue des pommiers", "12345", "Moppier sur Cider");
        farm.setAddress(address);
        farm.setIdentificationNumber("123456789");
        farm.setPhoneNumber("0123456789");
        return farm;
    }

    private Customer getCustomerBob() {
        var customer = new Customer();
        customer.setName("SINCLAIR");
        customer.setFirstName("Bob");
        customer.setPhoneNumber("0612345678");
        return customer;
    }

    private Customer getCustomerBill() {
        var customer = new Customer();
        customer.setName("BAROUD");
        customer.setFirstName("Bill");
        customer.setPhoneNumber("0698765432");
        return customer;
    }
}