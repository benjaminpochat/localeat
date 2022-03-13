package com.localeat.core.domains.pdf;

import com.localeat.core.domains.slaughter.AnimalBreed;
import com.localeat.core.domains.slaughter.AnimalType;
import com.localeat.core.domains.slaughter.Slaughter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.localeat.core.domains.slaughter.Animal;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;

class TestProductElementLabelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestOrderLabelService.class);

    @TempDir
    File outputFolder;

    @Test
    void generatePDF_should_produce_a_correct_pdf() throws IOException, URISyntaxException {
        // given
        var service = new ProductElementLabelService();
        var slaughter = new Slaughter();
        slaughter.setCuttingDate(LocalDate.of(2022, 3, 11));
        var animal = new Animal();
        animal.setIdentificationNumber("FR1234578912");
        animal.setAnimalType(AnimalType.BEEF_HEIFER);
        animal.setBreed(AnimalBreed.BEEF_CHAROLAIS);
        animal.setCertifiedLabelRouge(true);
        slaughter.setAnimal(animal);

        // when
        ByteArrayOutputStream outputStream = service.generatePDF(new ProductElementLabelService.Arguments(slaughter, List.of("Bavette (steaks)")));

        // then
        File productElementLabelFile = new File(outputFolder, "product_element_labels.pdf");
        FileOutputStream fileOutputStream = new FileOutputStream(productElementLabelFile);
        outputStream.writeTo(fileOutputStream);
        fileOutputStream.flush();
        LOGGER.info(String.format("PDF file at %s", productElementLabelFile.getAbsolutePath()));
        LOGGER.info("Test end.");
    }

}