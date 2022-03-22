package com.localeat.core.domains.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(value = {
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql"
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestAuthenticationController {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Test
    public void getAuthentication() throws Exception {
        // when
        ResponseEntity<String> response = restTemplate
                .withBasicAuth("benjamin", "1501")
                .getForEntity("/authentication", String.class);

        // then
        var jwtTestUtils = new JwtTestUtils();
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getHeaders()).containsKey("Set-Cookie");
        String jwtCookie = jwtTestUtils.getJwtCookie(response);
        assertThat(jwtCookie).isNotNull();
        Account account = jwtTestUtils.getAccountFromJwt(jwtCookie, jwtDecoder);
        assertThat(account.getUsername()).isEqualTo("benjamin");
        assertThat(account.getId()).isEqualTo(1);
    }

}
