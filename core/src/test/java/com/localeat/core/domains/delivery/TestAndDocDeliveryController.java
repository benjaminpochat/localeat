package com.localeat.core.domains.delivery;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;



@SpringBootTest
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@Transactional
@Sql({
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/actor/customer_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/address_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
        "/sql/create/com/localeat/domains/slaughter/slaughter_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/delivery_test_data.sql",
        "/sql/create/com/localeat/domains/order/order_test_data.sql",
})
public class TestAndDocDeliveryController {

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void getOrdersByDelivery() throws Exception {
        // given
        // -> See SQL files executed

        // when, then
        this.mockMvc
                .perform(get("/accounts/1/deliveries/1/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[ {\n" +
                        "  \"id\" : 1,\n" +
                        "  \"customer\" : {\n" +
                        "    \"@type\" : \"Customer\",\n" +
                        "    \"name\" : \"WALTER\",\n" +
                        "    \"firstName\" : \"Virginie\",\n" +
                        "    \"email\" : \"virginie@mail.fr\",\n" +
                        "    \"phoneNumber\" : \"04 32 10 98 87\",\n" +
                        "    \"orders\" : [ ]\n" +
                        "  },\n" +
                        "  \"orderedItems\" : [ {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"batch\" : {\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"price\" : 13.5,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : null\n" +
                        "      },\n" +
                        "      \"animal\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"animalType\" : null,\n" +
                        "        \"liveWeight\" : 850.0,\n" +
                        "        \"meatWeight\" : 400.0,\n" +
                        "        \"finalFarm\" : {\n" +
                        "          \"id\" : 1,\n" +
                        "          \"name\" : \"La ferme de la Riviere\",\n" +
                        "          \"description\" : \"La ferme de la Riviere est un elevage d'excellence\"\n" +
                        "        },\n" +
                        "        \"identificationNumber\" : \"1234\"\n" +
                        "      },\n" +
                        "      \"quantity\" : 10,\n" +
                        "      \"unitPrice\" : 12.0\n" +
                        "    },\n" +
                        "    \"unitPrice\" : 13.0,\n" +
                        "    \"quantity\" : 10.0\n" +
                        "  } ],\n" +
                        "  \"delivery\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"deliveryAddress\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"name\" : \"Chez Bob\",\n" +
                        "      \"city\" : \"Atlantic\",\n" +
                        "      \"zipCode\" : \"10000\",\n" +
                        "      \"addressLine1\" : \"2 rue des pommier\",\n" +
                        "      \"addressLine2\" : null,\n" +
                        "      \"addressLine3\" : null,\n" +
                        "      \"addressLine4\" : null\n" +
                        "    },\n" +
                        "    \"deliveryStart\" : \"2020-01-01T20:00:00\",\n" +
                        "    \"deliveryEnd\" : \"2020-01-01T18:00:00\",\n" +
                        "    \"availableBatches\" : [ {\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"price\" : 13.5,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : null\n" +
                        "      },\n" +
                        "      \"animal\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"animalType\" : null,\n" +
                        "        \"liveWeight\" : 850.0,\n" +
                        "        \"meatWeight\" : 400.0,\n" +
                        "        \"finalFarm\" : {\n" +
                        "          \"id\" : 1,\n" +
                        "          \"name\" : \"La ferme de la Riviere\",\n" +
                        "          \"description\" : \"La ferme de la Riviere est un elevage d'excellence\"\n" +
                        "        },\n" +
                        "        \"identificationNumber\" : \"1234\"\n" +
                        "      },\n" +
                        "      \"quantity\" : 10,\n" +
                        "      \"unitPrice\" : 12.0\n" +
                        "    } ],\n" +
                        "    \"orders\" : [ ]\n" +
                        "  }\n" +
                        "}, {\n" +
                        "  \"id\" : 3,\n" +
                        "  \"customer\" : {\n" +
                        "    \"@type\" : \"Customer\",\n" +
                        "    \"name\" : \"WILSON\",\n" +
                        "    \"firstName\" : \"Jerome\",\n" +
                        "    \"email\" : \"jerome@mail.fr\",\n" +
                        "    \"phoneNumber\" : \"06 98 87 65 21\",\n" +
                        "    \"orders\" : [ ]\n" +
                        "  },\n" +
                        "  \"orderedItems\" : [ {\n" +
                        "    \"id\" : 3,\n" +
                        "    \"batch\" : {\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"price\" : 13.5,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : null\n" +
                        "      },\n" +
                        "      \"animal\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"animalType\" : null,\n" +
                        "        \"liveWeight\" : 850.0,\n" +
                        "        \"meatWeight\" : 400.0,\n" +
                        "        \"finalFarm\" : {\n" +
                        "          \"id\" : 1,\n" +
                        "          \"name\" : \"La ferme de la Riviere\",\n" +
                        "          \"description\" : \"La ferme de la Riviere est un elevage d'excellence\"\n" +
                        "        },\n" +
                        "        \"identificationNumber\" : \"1234\"\n" +
                        "      },\n" +
                        "      \"quantity\" : 10,\n" +
                        "      \"unitPrice\" : 12.0\n" +
                        "    },\n" +
                        "    \"unitPrice\" : 12.0,\n" +
                        "    \"quantity\" : 20.0\n" +
                        "  } ],\n" +
                        "  \"delivery\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"deliveryAddress\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"name\" : \"Chez Bob\",\n" +
                        "      \"city\" : \"Atlantic\",\n" +
                        "      \"zipCode\" : \"10000\",\n" +
                        "      \"addressLine1\" : \"2 rue des pommier\",\n" +
                        "      \"addressLine2\" : null,\n" +
                        "      \"addressLine3\" : null,\n" +
                        "      \"addressLine4\" : null\n" +
                        "    },\n" +
                        "    \"deliveryStart\" : \"2020-01-01T20:00:00\",\n" +
                        "    \"deliveryEnd\" : \"2020-01-01T18:00:00\",\n" +
                        "    \"availableBatches\" : [ {\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"price\" : 13.5,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : null\n" +
                        "      },\n" +
                        "      \"animal\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"animalType\" : null,\n" +
                        "        \"liveWeight\" : 850.0,\n" +
                        "        \"meatWeight\" : 400.0,\n" +
                        "        \"finalFarm\" : {\n" +
                        "          \"id\" : 1,\n" +
                        "          \"name\" : \"La ferme de la Riviere\",\n" +
                        "          \"description\" : \"La ferme de la Riviere est un elevage d'excellence\"\n" +
                        "        },\n" +
                        "        \"identificationNumber\" : \"1234\"\n" +
                        "      },\n" +
                        "      \"quantity\" : 10,\n" +
                        "      \"unitPrice\" : 12.0\n" +
                        "    } ],\n" +
                        "    \"orders\" : [ ]\n" +
                        "  }\n" +
                        "} ]"))
                .andDo(document(
                        "get-orders-by-delivery",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

    @Test
    public void getOrdersByDeliveryWithUnauthorizedAccount() throws Exception {
        // given
        // -> See SQL files executed

        // when, then
        this.mockMvc
                .perform(get("/accounts/2/deliveries/1/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andDo(document(
                        "get-orders-by-delivery-with-unauthorized-account",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

}
