package com.localeat.core.domains.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(value = {
        "/sql/create/com/localeat/domains/security/schema.sql"
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/actor/test_data.sql",
        "/sql/delete/com/localeat/domains/security/test_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestUserController {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void createUser(){
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
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
        HttpEntity request = new HttpEntity(requestBody, headers);

        // when
        ResponseEntity<String> userCreationResponse = restTemplate
                .postForEntity("/users", request, String.class);

        // then
        assertThat(userCreationResponse.getStatusCodeValue()).isEqualTo(200);
        ResponseEntity<String> authenticationResponse = restTemplate
                .withBasicAuth("catherine", "p4s5W0Rd")
                .getForEntity("/authentication", String.class);
        assertThat(authenticationResponse.getStatusCodeValue()).isEqualTo(200);

    }
}
