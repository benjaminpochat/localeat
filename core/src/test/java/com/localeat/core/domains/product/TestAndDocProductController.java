package com.localeat.core.domains.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
@Transactional
@Sql({
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
        "/sql/create/com/localeat/domains/product/product_test_data.sql",
})

public class TestAndDocProductController {
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    public void getOrderByCustomer() throws Exception {
        // when, then
        this.mockMvc
                .perform(get("/accounts/1/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("[ {\n" +
                        "  \"id\" : 1,\n" +
                        "  \"name\" : \"colis 'tutti frutti'\",\n" +
                        "  \"description\" : \"un assortiment de steaks, de rotis, et de morceaux a bouillir\",\n" +
                        "  \"unitPrice\" : 13.5,\n" +
                        "  \"quantity\" : 10,\n" +
                        "  \"photo\" : null,\n" +
                        "  \"farm\" : {\n" +
                        "    \"id\" : 1,\n" +
                        "    \"name\" : \"La ferme de la Riviere\",\n" +
                        "    \"description\" : \"La ferme de la Riviere est un elevage d'excellence\"\n" +
                        "  }\n" +
                        "} ]"))
                .andDo(document(
                        "get-products-by-breeder",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }
}