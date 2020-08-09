package com.localeat.core.domains.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql({
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/test_data.sql"
})
public class TestAuthenticationController {

    private MockMvc mockMvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Test
    public void getAuthentication() throws Exception {
        // when
        ResponseEntity<String> result = restTemplate
                .withBasicAuth("benjamin", "1501")
                .getForEntity("/authentication", String.class);

        // then
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
        assertThat(result.getHeaders()).containsKey("Set-Cookie");
        String jwtCookie = result.getHeaders().get("Set-Cookie").stream().filter(s -> s.startsWith("jwt=")).findFirst().orElse(null);
        assertThat(jwtCookie).isNotNull();
        Account account = getAccountFromJwt(jwtCookie);
        assertThat(account.getUsername()).isEqualTo("benjamin");
        assertThat(account.getId()).isEqualTo(1);
    }

    private Account getAccountFromJwt(String jwtCookie) throws com.fasterxml.jackson.core.JsonProcessingException {
        Pattern jwtCookieRegexPattern = Pattern.compile("jwt=([^;]*);.*");
        Matcher matcher = jwtCookieRegexPattern.matcher(jwtCookie);
        matcher.matches();
        String jwtEncoded = matcher.group(1);
        Jwt jwt = jwtDecoder.decode(jwtEncoded);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jwt.getClaimAsString("account"), Account.class);
    }
}
