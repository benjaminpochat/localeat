package com.localeat.core.domains.delivery;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@ExtendWith({SpringExtension.class})
@Sql(value = {
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/actor/customer_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/address_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
        "/sql/create/com/localeat/domains/slaughter/slaughter_test_data.sql",
        "/sql/create/com/localeat/domains/delivery/delivery_test_data.sql",
        "/sql/create/com/localeat/domains/order/order_test_data.sql",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestAndDocDeliveryController {

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    @Test
    public void getAllPublicDeliveriesWithoutAccessKey() throws Exception {
        // given
        // -> See SQL files executed

        // when, then
        this.mockMvc
                .perform(get("/deliveries")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id==1)]", not(empty())))
                .andExpect(jsonPath("$[?(@.id==2)]", not(empty())))
                .andExpect(jsonPath("$[?(@.id==3)]", empty()));
    }

    @Test
    public void getAllPublicDeliveriesWithAccessKey() throws Exception {
        // given
        // -> See SQL files executed

        // when, then
        this.mockMvc
                .perform(get("/deliveries?sharedKey=ACCESS")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id==1)]", not(empty())))
                .andExpect(jsonPath("$[?(@.id==2)]", not(empty())))
                .andExpect(jsonPath("$[?(@.id==3)]", not(empty())));
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
                        "    \"quantity\" : 20.0\n" +
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
                        "} ]"));
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
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void saveDeliveryOrder() throws Exception {
        // given
        String requestBody =
                "{\n" +
                "  \"id\" : 1,\n" +
                "  \"status\" : \"PAYED\""+
                "  }";

        // when, then
        this.mockMvc
                .perform(post("/accounts/1/deliveries/1/orders")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }
}
