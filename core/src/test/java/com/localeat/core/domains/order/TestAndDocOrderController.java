package com.localeat.core.domains.order;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith({SpringExtension.class})
@Sql(value = {
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/customer_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/address_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
        "/sql/create/com/localeat/domains/slaughter/slaughter_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/delivery_test_data.sql",
        "/sql/create/com/localeat/domains/order/order_test_data.sql",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)

public class TestAndDocOrderController {

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    @Test
    public void createOrder() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"orderedItems\": [" +
                "    {" +
                "       \"batch\" : {\"id\":\"1\"}," +
                "       \"quantity\" : 5" +
                "    }" +
                "  ]," +
                "  \"delivery\" : {" +
                "    \"id\" : \"1\"" +
                "  }," +
                "  \"status\" : \"BOOKED\"" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/accounts/3/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    public void getOrderByCustomer() throws Exception {
        // when, then
        this.mockMvc
                .perform(get("/accounts/3/orders"))
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
                        "      \"id\" : 1,\n" +
                        "      \"quantity\" : 50,\n" +
                        "      \"quantitySold\" : 0,\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"unitPrice\" : 13.5,\n" +
                        "        \"netWeight\" : 10,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : {\n" +
                        "           \"id\" : 1,\n" +
                        "           \"name\" : \"La ferme de la Riviere\"\n" +
                        "        }\n" +
                        "      }\n" +
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
                        "      \"addressLine1\" : \"2 rue des pommiers\",\n" +
                        "      \"addressLine2\" : null,\n" +
                        "      \"addressLine3\" : null,\n" +
                        "      \"addressLine4\" : null\n" +
                        "    },\n" +
                        "    \"deliveryStart\" : \"2050-01-01T18:00:00\",\n" +
                        "    \"deliveryEnd\" : \"2050-01-01T20:00:00\",\n" +
                        "    \"availableBatches\" : [ {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"quantity\" : 50,\n" +
                        "      \"quantitySold\" : 0,\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"unitPrice\" : 13.5,\n" +
                        "        \"netWeight\" : 10,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : {\n" +
                        "           \"id\" : 1,\n" +
                        "           \"name\" : \"La ferme de la Riviere\"\n" +
                        "        }\n" +
                        "      }\n" +
                        "    } ],\n" +
                        "    \"orders\" : [ ]\n" +
                        "  }\n" +
                        "}, {\n" +
                        "  \"id\" : 2,\n" +
                        "  \"customer\" : {\n" +
                        "    \"@type\" : \"Customer\",\n" +
                        "    \"name\" : \"WALTER\",\n" +
                        "    \"firstName\" : \"Virginie\",\n" +
                        "    \"email\" : \"virginie@mail.fr\",\n" +
                        "    \"phoneNumber\" : \"04 32 10 98 87\",\n" +
                        "    \"orders\" : [ ]\n" +
                        "  },\n" +
                        "  \"orderedItems\" : [ {\n" +
                        "    \"id\" : 2,\n" +
                        "    \"batch\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"quantity\" : 50,\n" +
                        "      \"quantitySold\" : 0,\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"unitPrice\" : 13.5,\n" +
                        "        \"netWeight\" : 10,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : {\n" +
                        "           \"id\" : 1,\n" +
                        "           \"name\" : \"La ferme de la Riviere\"\n" +
                        "        }\n" +
                        "      }\n" +
                        "    },\n" +
                        "    \"unitPrice\" : 12.0,\n" +
                        "    \"quantity\" : 5.0\n" +
                        "  } ],\n" +
                        "  \"delivery\" : {\n" +
                        "    \"id\" : 2,\n" +
                        "    \"deliveryAddress\" : {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"name\" : \"Chez Bob\",\n" +
                        "      \"city\" : \"Atlantic\",\n" +
                        "      \"zipCode\" : \"10000\",\n" +
                        "      \"addressLine1\" : \"2 rue des pommiers\",\n" +
                        "      \"addressLine2\" : null,\n" +
                        "      \"addressLine3\" : null,\n" +
                        "      \"addressLine4\" : null\n" +
                        "    },\n" +
                        "    \"deliveryStart\" : \"2050-01-08T18:00:00\",\n" +
                        "    \"deliveryEnd\" : \"2050-01-08T20:00:00\",\n" +
                        "    \"availableBatches\" : [ {\n" +
                        "      \"id\" : 1,\n" +
                        "      \"quantity\" : 50,\n" +
                        "      \"quantitySold\" : 0,\n" +
                        "      \"product\" : {\n" +
                        "        \"id\" : 1,\n" +
                        "        \"name\" : \"colis 'tutti frutti'\",\n" +
                        "        \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "        \"unitPrice\" : 13.5,\n" +
                        "        \"netWeight\" : 10,\n" +
                        "        \"photo\" : null,\n" +
                        "        \"farm\" : {\n" +
                        "           \"id\" : 1,\n" +
                        "           \"name\" : \"La ferme de la Riviere\"\n" +
                        "        }\n" +
                        "      }\n" +
                        "    } ],\n" +
                        "    \"orders\" : [ ]\n" +
                        "  }\n" +
                        "} ]"));
    }
}
