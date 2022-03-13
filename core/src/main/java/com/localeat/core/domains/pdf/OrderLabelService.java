package com.localeat.core.domains.pdf;

import com.localeat.core.domains.delivery.Delivery;
import com.localeat.core.domains.order.Order;
import com.localeat.core.domains.slaughter.Slaughter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.stream.Collectors;

import static java.util.Locale.FRENCH;

@Service
public class OrderLabelService extends PDFService<Slaughter> {

    private String labelTemplate;
    private String labelCSS;

    public OrderLabelService() throws URISyntaxException, IOException {
        labelTemplate = getTemplate();
        labelCSS = getCSS();
    }

    @Override
    protected String getTemplatePath() {
        return "html/pdf/order_label_template.html";
    }

    @Override
    protected String getCSSPath() {
        return "html/pdf/order_label_template.css";
    }

    @Override
    protected String getContentAsHtml(Slaughter slaughter) {
        var delivery = slaughter.getDelivery();
        var htmlStart = String.format("<html><meta charset=\"UTF-8\"/><head><style type=\"text/css\">%s</style></head><body>", labelCSS);
        var htmlEnd = "</body></html>";
        return delivery.getOrders().stream()
                .filter(order -> order.getStatus().isSold())
                .map(order -> this.getOrderLabel(order, delivery, slaughter))
                .collect(Collectors.joining("", htmlStart, htmlEnd));
    }

    private String getOrderLabel(Order order, Delivery delivery, Slaughter slaughter) {
        return String.format(labelTemplate,
                delivery.getDeliveryStart(),
                order.getId(),
                String.format("%s %s (%s)", order.getCustomer().getFirstName(), order.getCustomer().getName(), order.getCustomer().getPhoneNumber()),
                order.getOrderedItems().stream().map(orderItem -> String.format("<tr><td>%s</td><td>x %s</td><td>%s</td><td>%s kg</td></tr>",
                                orderItem.getBatch().getProduct().getName(),
                                orderItem.getQuantity(),
                                orderItem.getBatch().getProduct().getDescription().replaceAll("\n", "<br/>"),
                                orderItem.getBatch().getProduct().getNetWeight()))
                        .collect(Collectors.joining()),
                slaughter.getCuttingDate().plusDays(10),
                slaughter.getCuttingDate().plusYears(1),
                slaughter.getAnimal().getAnimalType().getLabel(FRENCH),
                slaughter.getAnimal().getBreed().getLabel(FRENCH),
                slaughter.getAnimal().getIdentificationNumber(),
                getLabelRougeLogoAsBase64(slaughter.getAnimal()),
                slaughter.getAnimal().getBirthDate(),
                slaughter.getAnimal().getBirthPlace(),
                slaughter.getAnimal().getBirthFarm(),
                slaughter.getSlaughterDate(),
                slaughter.getSlaughterHouse(),
                slaughter.getSlaughterPlace(),
                slaughter.getCuttingDate(),
                slaughter.getCuttingButcher(),
                slaughter.getCuttingPlace(),
                getViandeEnDirectLogoAsBase64());
    }
}
