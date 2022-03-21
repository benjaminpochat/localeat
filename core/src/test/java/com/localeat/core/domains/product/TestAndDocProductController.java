package com.localeat.core.domains.product;

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

@SpringBootTest
@ExtendWith({SpringExtension.class})
@Sql(value = {
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_template_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestAndDocProductController {
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    @Test
    public void getProductTemplatesByBreeder() throws Exception {
        // when, then
        this.mockMvc
                .perform(get("/accounts/1/productTemplates"))
                .andExpect(status().isOk())
                .andExpect(content().json("[ {\n" +
                        "  \"id\" : 1,\n" +
                        "  \"name\" : \"colis 'tutti frutti'\",\n" +
                        "  \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "  \"unitPrice\" : 13.5,\n" +
                        "  \"netWeight\" : 10,\n" +
                        "  \"farm\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"name\" : \"La ferme de la Riviere\"\n" +
                        "  }\n" +
                        "} ]"));
    }


    @Test
    public void createProductTemplate() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"name\" : \"colis 'miam miam'\",\n" +
                "  \"description\" : \"un assortiment de viandes succulentes\",\n" +
                "  \"unitPrice\" : 11.0,\n" +
                "  \"photo\" : {},\n" +
                "  \"netWeight\" : 5,\n" +
                "  \"farm\" : {\n" +
                "    \"id\" : 1,\n" +
                "    \"name\" : \"La ferme de la Riviere\"\n" +
                "  }\n" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/accounts/1/productTemplates")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    public void getProductsByBreeder() throws Exception {
        // when, then
        this.mockMvc
                .perform(get("/accounts/1/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("[ {\n" +
                        "  \"id\" : 1,\n" +
                        "  \"name\" : \"colis 'tutti frutti'\",\n" +
                        "  \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "  \"unitPrice\" : 13.5,\n" +
                        "  \"netWeight\" : 10,\n" +
                        "  \"farm\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"name\" : \"La ferme de la Riviere\"\n" +
                        "  }\n" +
                        "} ]"));
    }

    @Test
    public void createProduct() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"name\" : \"colis 'miam miam'\",\n" +
                "  \"description\" : \"un assortiment de viandes succulentes\",\n" +
                "  \"unitPrice\" : 11.0,\n" +
                "  \"photo\" : {},\n" +
                "  \"netWeight\" : 5,\n" +
                "  \"farm\" : {\n" +
                "    \"id\" : 1,\n" +
                "    \"name\" : \"La ferme de la Riviere\"\n" +
                "  }\n" +
                "}";

        // when, then
        this.mockMvc
                .perform(post("/accounts/1/products")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }
}