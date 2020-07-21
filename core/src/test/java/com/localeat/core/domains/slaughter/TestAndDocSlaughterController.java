package com.localeat.core.domains.slaughter;

import com.localeat.commons.GenericBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static java.time.Month.JANUARY;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@Transactional
public class TestAndDocSlaughterController {
    private MockMvc mockMvc;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void getAllSlaughters() throws Exception {
        // given
        var animal1 = GenericBuilder.of(Animal::new)
                .with(Animal::setAnimalType, AnimalType.BEEF_CHAROLLAIS)
                .with(Animal::setFinalFarm, "Ferme du Ruisseau")
                .with(Animal::setIdentificationNumber, "ABCD")
                .build();
        var slaughter1 = GenericBuilder.of(Slaughter::new)
                .with(Slaughter::setSlaughterDate, LocalDate.of(2020, JANUARY, 1))
                .with(Slaughter::setAnimal, animal1)
                .build();
        var animal2 = GenericBuilder.of(Animal::new)
                .with(Animal::setAnimalType, AnimalType.BEEF_LIMOUSINE)
                .with(Animal::setFinalFarm, "Gaec des 3 frères")
                .with(Animal::setIdentificationNumber, "EFGH")
                .build();
        var slaughter2 = GenericBuilder.of(Slaughter::new)
                .with(Slaughter::setSlaughterDate, LocalDate.of(2020, JANUARY, 15))
                .with(Slaughter::setAnimal, animal2)
                .build();
        slaughterRepository.save(slaughter1);
        slaughterRepository.save(slaughter2);

        // when, then
        this.mockMvc
                .perform(get("/slaughters"))
                .andExpect(status().isOk())
                .andDo(document(
                        "get-all-slaughters",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

    @Test
    public void createSlaughter() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"animal\" : {\n" +
                "    \"animalType\" : \"BEEF_CHAROLLAIS\",\n" +
                "    \"finalFarm\" : \"Ferme du Ruisseau\",\n" +
                "    \"identificationNumber\" : \"ABCD\"\n" +
                "  },\n" +
                "  \"slaughterDate\" : \"2020-01-01\"\n" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/slaughters")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andDo(document(
                        "create-slaughter",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

    @Test
    public void createSlaughterWithDelivery() throws Exception {
        // given
        var requestBody = "{" +
                "\"animal\":{" +
                "   \"animalType\":null," +
                "   \"liveWeight\":200," +
                "   \"meatWeight\":80," +
                "   \"finalFarm\":null," +
                "   \"identificationNumber\":null" +
                "   }," +
                "\"delivery\":{" +
                "   \"address\":{" +
                "       \"addressLine1\":\"3 rue des pommiers\"," +
                "       \"city\":\"Juan-les-Pins\"" +
                "   }," +
                "   \"availableProducts\":[" +
                "       {\"price\":\"13\"}" +
                "   ]" +
                "}," +
                "\"slaughterDate\":\"2020-07-27\"," +
                "\"cuttingDate\":null" +
                "}";
        this.mockMvc.perform(post("/slaughters")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody));

        // when, then
        this.mockMvc
                .perform(post("/slaughters")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andDo(document(
                        "create-slaughter",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

}
