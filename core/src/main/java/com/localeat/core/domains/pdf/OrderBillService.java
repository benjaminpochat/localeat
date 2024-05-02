package com.localeat.core.domains.pdf;

import com.localeat.core.domains.actor.Customer;
import com.localeat.core.domains.farm.Farm;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.order.OrderItem;
import com.localeat.core.domains.slaughter.Slaughter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class OrderBillService extends PDFService<OrderBillService.Arguments> {

    private String billTemplate;
    private String billCSS;

    public OrderBillService() throws URISyntaxException, IOException {
        billTemplate = getTemplate();
        billCSS = getCSS();
    }

    @Override
    protected String getTemplatePath() {
        return "html/pdf/order_bill_template.html";
    }

    @Override
    protected String getCSSPath() {
        return "html/pdf/order_bill_template.css";
    }

    @Override
    protected String getContentAsHtml(Arguments arguments) {
        var delivery = arguments.slaughter.getDelivery();
        var htmlStart = String.format("<html><meta charset=\"UTF-8\"/><head><style type=\"text/css\">%s</style></head><body>", billCSS);
        var htmlEnd = "</body></html>";
        AtomicInteger billIdStart = new AtomicInteger(arguments.billIdStart);
        return delivery.getOrders().stream()
                .filter(order -> order.getStatus().isSold())
                .sorted(Comparator.comparing(Order::getId))
                .map(order -> this.getOrderBill(order, arguments.slaughter, billIdStart.getAndIncrement()))
                .collect(Collectors.joining("", htmlStart, htmlEnd));
    }

    private String getOrderBill(Order order, Slaughter slaughter, int billId) {
        Farm farm = slaughter.getAnimal().getFinalFarm();
        Customer customer = order.getCustomer();
        return String.format(billTemplate,
                farm.getName(),
                farm.getAddress().getAddressLines().stream().map(element -> "<div>"+element+"</div>" ).collect(Collectors.joining()),
                farm.getAddress().getZipCode(),
                farm.getAddress().getCity(),
                farm.getIdentificationNumber(),
                farm.getPhoneNumber(),
                customer.getFirstName(),
                customer.getName(),
                customer.getPhoneNumber(),
                slaughter.getDelivery().getId().toString() + "-" + billId,
                LocalDate.now(),
                order.getOrderedItems().stream().map(item -> String.format("<tr><td>%s</td><td class=\"align-right\">%s</td><td class=\"align-right\">%.2f €</td><td class=\"align-right\">%.2f €</td></tr>",
                        item.getBatch().getProduct().getName(),
                        item.getQuantity(),
                        getItemPriceWithoutTax(item),
                        item.getQuantity() * getItemPriceWithoutTax(item))).collect(Collectors.joining()),
                getTotalPriceWithoutTax(order),
                getTotalTax(order),
                getTotalPriceWithTax(order),
                order.getPaymentDate(),
                slaughter.getDelivery().getDeliveryStart()
                );
    }

    private double getTotalPriceWithoutTax(Order order) {
        return order.getOrderedItems().stream()
                .map(item -> getItemPriceWithoutTax(item) * item.getQuantity())
                .mapToDouble(price -> (double) price)
                .sum();
    }

    private double getTotalTax(Order order) {
        return getTotalPriceWithoutTax(order) * 0.055f;
    }

    private Object getTotalPriceWithTax(Order order) {
        return getTotalPriceWithoutTax(order) + getTotalTax(order);
    }

    private float getItemPriceWithoutTax(OrderItem item) {
        return item.getUnitPrice() * item.getBatch().getProduct().getNetWeight() / 1.055f;
    }

    public static class Arguments {
        private Slaughter slaughter;
        private int billIdStart;

        public Arguments(Slaughter slaughter, int orderIdStart) {
            this.slaughter = slaughter;
            this.billIdStart = orderIdStart;
        }
    }
}
