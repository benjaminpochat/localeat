package com.localeat.core.domains.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = {
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/test_data.sql"
    })
public class TestAuthorizedAccountFilter {

    @Autowired
    private TestRestTemplate restTemplate;

    private String jwt;

    @BeforeEach
    public void authenticate() {
        ResponseEntity<String> authenticationResponse = restTemplate
                .withBasicAuth("benjamin", "1501")
                .getForEntity("/authentication", String.class);
        var jwtTestUtils = new JwtTestUtils();
        jwt = jwtTestUtils.getJwtFromCookie(authenticationResponse);
    }

    @Test
    public void should_respond_http_200_if_account_id_in_uri_and_in_token_are_equals() throws Exception {
        // given
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Authorization", "Bearer " + jwt);

        // when
        ResponseEntity<String> slaughtersResponse = restTemplate
                .exchange(
                        "/accounts/1/slaughters",
                        HttpMethod.GET,
                        new HttpEntity<Object>(headers),
                        String.class);

        // then
        assertThat(slaughtersResponse.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void should_respond_http_401_if_account_id_in_uri_and_in_token_are_different() throws Exception {
        // given
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Authorization", "Bearer " + jwt);

        // when
        ResponseEntity<String> slaughtersResponse = restTemplate
                .exchange(
                        "/accounts/2/slaughters",
                        HttpMethod.GET,
                        new HttpEntity<Object>(headers),
                        String.class);

        // then
        assertThat(slaughtersResponse.getStatusCodeValue()).isEqualTo(401);
    }

    @Test
    public void should_respond_http_401_if_no_token_is_given_in_headers() throws Exception {
        // given
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();

        // when
        ResponseEntity<String> slaughtersResponse = restTemplate
                .exchange(
                        "/accounts/1/slaughters",
                        HttpMethod.GET,
                        new HttpEntity<Object>(headers),
                        String.class);

        // then
        assertThat(slaughtersResponse.getStatusCodeValue()).isEqualTo(401);
    }
}
