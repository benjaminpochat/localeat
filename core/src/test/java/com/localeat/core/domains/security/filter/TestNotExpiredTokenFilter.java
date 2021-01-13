package com.localeat.core.domains.security.filter;

import com.localeat.core.domains.security.Account;
import com.localeat.core.domains.security.AccountRepository;
import com.localeat.core.domains.security.JSONWebTokenService;
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

import java.time.Duration;
import java.util.Arrays;

import static com.localeat.core.domains.security.Role.BREEDER;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(value = {
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql",
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/order/test_data.sql",
        "/sql/delete/com/localeat/domains/actor/test_data.sql",
        "/sql/delete/com/localeat/domains/farm/test_data.sql",
        "/sql/delete/com/localeat/domains/security/test_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestNotExpiredTokenFilter {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JSONWebTokenService jsonWebTokenService;

    @Autowired
    private AccountRepository accountRepository;

    @Test
    public void should_respond_http_401_if_jwt_expired() throws Exception {
        Account account = accountRepository.getAccountByUsername("benjamin");
        String jwt = jsonWebTokenService.generateJSONWebToken(account, "benjamin", Arrays.asList(BREEDER.name()), Duration.ofSeconds(0));
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
        assertThat(slaughtersResponse.getStatusCodeValue()).isEqualTo(401);
        assertThat(slaughtersResponse.getBody()).contains("Access denied : the token is expired");
    }

    @Test
    public void should_respond_http_200_if_jwt_not_expired() throws Exception {
        Account account = accountRepository.getAccountByUsername("benjamin");
        String jwt = jsonWebTokenService.generateJSONWebToken(account, "benjamin", Arrays.asList(BREEDER.name()), Duration.ofSeconds(60));
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
    public void should_respond_http_401_if_jwt_with_expiration_date_hacked() throws Exception {
        Account account = accountRepository.getAccountByUsername("benjamin");
        String jwt = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYmVuamFtaW4iLCJleHBpcmF0aW9uIjoiMjEyMS0wMS0xMlQyMjozMzozNy4zODI0MDIiLCJhdXRob3JpdGllcyI6WyJCUkVFREVSIl0sImFjY291bnQiOnsiYWN0b3IiOnsiZmlyc3ROYW1lIjoiQmVuamFtaW4iLCJwaG9uZU51bWJlciI6IigrMzMpIDAxIDIzIDQ1IDY3IDg5IiwibmFtZSI6IlJJVklFUkUiLCJmYXJtIjp7Im5hbWUiOiJMYSBmZXJtZSBkZSBsYSBSaXZpZXJlIiwiZGVzY3JpcHRpb24iOiJMYSBmZXJtZSBkZSBsYSBSaXZpZXJlIGVzdCB1biBlbGV2YWdlIGQnZXhjZWxsZW5jZSIsImlkIjoxfSwiaWQiOjEsImVtYWlsIjoiYmVuamFtaW5AZmVybWUtZHUtcnVpc3NlYXUuZnIifSwiaWQiOjEsInVzZXJuYW1lIjoiYmVuamFtaW4ifX0.WcbzlZkjchRaMlf1hb5hUM-YdsHlY_kIhuwqErtUf6c";
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
        assertThat(slaughtersResponse.getStatusCodeValue()).isEqualTo(401);
    }
}