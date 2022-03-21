package com.localeat.core.domains.security;

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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
@SpringBootTest
@ExtendWith({SpringExtension.class})
public class TestAndDocAccountController {

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    @Test
    public void createUser() throws Exception {
        // given
        var requestBody = "{\n" +
                "  \"password\": \"p4s5W0Rd\",\n" +
                "  \"role\": \"CUSTOMER\",\n" +
                "  \"account\": {\n" +
                "    \"actor\": {\n" +
                "      \"@type\": \"Customer\",\n" +
                "      \"firstName\": \"Catherine\",\n" +
                "      \"phoneNumber\": \"(+33) 04 23 45 67 89\",\n" +
                "      \"name\": \"DESTIVEL\",\n" +
                "      \"email\": \"catherine.destivel@montagne.fr\"\n" +
                "    },\n" +
                "    \"username\": \"catherine\"\n" +
                "  }\n" +
                "}";

        // when / then
        this.mockMvc
                .perform(post("/account")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }
}
