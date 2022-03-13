package com.localeat.core.domains.pdf;

import com.localeat.core.domains.slaughter.Animal;
import com.localeat.core.domains.slaughter.Slaughter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ProductElementLabelService extends PDFService<ProductElementLabelService.Arguments> {

    private String productLabelCSS;
    private String productLabelTemplate;

    public ProductElementLabelService() throws URISyntaxException, IOException {
        productLabelTemplate = getTemplate();
        productLabelCSS = getCSS();
    }

    @Override
    protected String getTemplatePath() {
        return "html/pdf/product_element_label_template.html";
    }

    @Override
    protected String getCSSPath() {
        return "html/pdf/product_element_label_template.css";
    }

    @Override
    //TODO convert arguments type in record in Java 17
    protected String getContentAsHtml(ProductElementLabelService.Arguments arguments) {
        var htmlStart = String.format("<html><meta charset=\"UTF-8\"/><head><style type=\"text/css\">%s</style></head><body>", productLabelCSS);
        var htmlEnd = "</body></html>";
        return arguments.elementsNames.stream()
                .map(elementName -> String.format(productLabelTemplate, getLabelsAsHtml(arguments.slaughter, elementName)))
                .collect(Collectors.joining("", htmlStart, htmlEnd));
    }

    private String getLabelsAsHtml(Slaughter slaughter, String elementName) {
        Animal animal = slaughter.getAnimal();
        return String.format(
                        "                <table>\n" +
                        "                    <tr>\n" +
                        "                        <td>%1$s race %2$s</td>\n" +
                        "                        <td rowspan=\"2\">\n" +
                        "                            <img src=\"data:image/jpg;base64, %7$s\" class=\"certification-images\"></img>\n" +
                        "                        </td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td>%3$s</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td colspan=\"2\" class=\"element-name\">\n" +
                        "                            %4$s\n" +
                        "                        </td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td colspan=\"2\">\n" +
                        "                            DLC : %5$td/%5$tm/%5$tY\n" +
                        "                        </td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td colspan=\"2\">\n" +
                        "                            DLC congelé : %6$td/%6$tm/%6$tY\n" +
                        "                        </td>\n" +
                        "                    </tr>\n" +
                        "                </table>",
                StringUtils.capitalize(animal.getAnimalType().getLabel(Locale.FRENCH)),
                animal.getBreed().getLabel(Locale.FRENCH),
                animal.getIdentificationNumber(),
                elementName,
                slaughter.getCuttingDate().plusDays(10),
                slaughter.getCuttingDate().plusYears(1),
                getLabelRougeLogoAsBase64(animal));
    }

    public static class Arguments {
        private Slaughter slaughter;
        private List<String> elementsNames;

        public Arguments(Slaughter slaughter, List<String> elementsNames) {
            this.slaughter = slaughter;
            this.elementsNames = elementsNames;
        }
    }

}
