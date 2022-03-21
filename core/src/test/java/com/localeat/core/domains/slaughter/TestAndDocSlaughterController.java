package com.localeat.core.domains.slaughter;

import com.localeat.core.commons.GenericBuilder;
import com.localeat.core.domains.farm.Farm;
import com.localeat.core.domains.farm.FarmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static java.time.Month.JANUARY;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@ExtendWith({SpringExtension.class})
@Sql(value = {
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql"
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestAndDocSlaughterController {
    private MockMvc mockMvc;

    @Autowired
    private SlaughterRepository slaughterRepository;

    @Autowired
    private FarmRepository farmRepository;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    @Test
    public void getAllSlaughters() throws Exception {
        // given
        Farm farm1 = farmRepository.findById(1L).orElse(null);
        Farm farm2 = farmRepository.findById(2L).orElse(null);
        var animal1 = GenericBuilder.of(Animal::new)
                .with(Animal::setAnimalType, AnimalType.BEEF_HEIFER)
                .with(Animal::setBreed, AnimalBreed.BEEF_CHAROLAIS)
                .with(Animal::setFinalFarm, farm1)
                .with(Animal::setIdentificationNumber, "ABCD")
                .build();
        var slaughter1 = GenericBuilder.of(Slaughter::new)
                .with(Slaughter::setSlaughterDate, LocalDate.of(2020, JANUARY, 1))
                .with(Slaughter::setAnimal, animal1)
                .build();
        var animal2 = GenericBuilder.of(Animal::new)
                .with(Animal::setAnimalType, AnimalType.BEEF_COW)
                .with(Animal::setBreed, AnimalBreed.BEEF_LIMOUSIN)
                .with(Animal::setFinalFarm, farm2)
                .with(Animal::setIdentificationNumber, "EFGH")
                .build();
        var slaughter2 = GenericBuilder.of(Slaughter::new)
                .with(Slaughter::setSlaughterDate, LocalDate.of(2020, JANUARY, 15))
                .with(Slaughter::setAnimal, animal2)
                .build();
        var animal3 = GenericBuilder.of(Animal::new)
                .with(Animal::setAnimalType, AnimalType.BEEF_BULL)
                .with(Animal::setBreed, AnimalBreed.BEEF_LIMOUSIN)
                .with(Animal::setFinalFarm, farm1)
                .with(Animal::setIdentificationNumber, "IJKL")
                .build();
        var slaughter3 = GenericBuilder.of(Slaughter::new)
                .with(Slaughter::setSlaughterDate, LocalDate.of(2020, JANUARY, 15))
                .with(Slaughter::setAnimal, animal3)
                .build();
        slaughterRepository.save(slaughter1);
        slaughterRepository.save(slaughter2);
        slaughterRepository.save(slaughter3);

        // when, then
        this.mockMvc
                .perform(get("/accounts/1/slaughters"))
                .andExpect(status().isOk())
                .andExpect(content().json("[ {\n" +
                        "  \"id\" : 1,\n" +
                        "  \"animal\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"breed\" : \"BEEF_CHAROLAIS\",\n" +
                        "    \"animalType\" : \"BEEF_HEIFER\",\n" +
                        "    \"liveWeight\" : 0.0,\n" +
                        "    \"meatWeight\" : 0.0,\n" +
                        "    \"finalFarm\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"name\" : \"La ferme de la Riviere\"\n" +
                        "    },\n" +
                        "    \"identificationNumber\" : \"ABCD\"\n" +
                        "  },\n" +
                        "  \"delivery\" : null,\n" +
                        "  \"slaughterDate\" : \"2020-01-01\",\n" +
                        "  \"cuttingDate\" : null\n" +
                        "}, {\n" +
                        "  \"id\" : 3,\n" +
                        "  \"animal\" : {\n" +
                        "    \"id\" : 3,\n" +
                        "    \"breed\" : \"BEEF_LIMOUSIN\",\n" +
                        "    \"animalType\" : \"BEEF_BULL\",\n" +
                        "    \"liveWeight\" : 0.0,\n" +
                        "    \"meatWeight\" : 0.0,\n" +
                        "    \"finalFarm\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"name\" : \"La ferme de la Riviere\"\n" +
                        "    },\n" +
                        "    \"identificationNumber\" : \"IJKL\"\n" +
                        "  },\n" +
                        "  \"delivery\" : null,\n" +
                        "  \"slaughterDate\" : \"2020-01-15\",\n" +
                        "  \"cuttingDate\" : null\n" +
                        "} ]"));
    }

    @Test
    public void createSlaughter() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"animal\" : {\n" +
                "    \"animalType\" : \"BEEF_VEAL\",\n" +
                "    \"animalBreed\" : \"BEEF_CHAROLAIS\",\n" +
                "    \"finalFarm\" : {\"id\" : 2},\n" +
                "    \"identificationNumber\" : \"ABCD\"\n" +
                "  },\n" +
                "  \"slaughterDate\" : \"2020-01-01\"\n" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/accounts/2/slaughters")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    public void createSlaughterWithDelivery() throws Exception {
        // given
        var requestBody = "{" +
                "\"animal\":{" +
                "   \"animalType\":null," +
                "   \"liveWeight\":200," +
                "   \"meatWeight\":80," +
                "    \"finalFarm\" : {\"id\" : 2},\n" +
                "   \"identificationNumber\":null" +
                "   }," +
                "\"delivery\":{" +
                "   \"address\":{" +
                "       \"addressLine1\":\"3 rue des pommiers\"," +
                "       \"city\":\"Juan-les-Pins\"" +
                "   }," +
                "   \"availableBatches\":[" +
                "       {\"unitPrice\":\"13\"}" +
                "   ]" +
                "}," +
                "\"slaughterDate\":\"2020-07-27\"," +
                "\"cuttingDate\":null" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/accounts/1/slaughters")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }

}
