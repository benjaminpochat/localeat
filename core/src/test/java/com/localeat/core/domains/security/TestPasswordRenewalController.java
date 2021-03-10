package com.localeat.core.domains.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;

@EnableConfigurationProperties
@Profile("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, args = "--localeat.smtp.disableEmailNotifications=true")
@Sql(value = {
        "/sql/create/com/localeat/domains/security/schema.sql",
        "/sql/create/com/localeat/domains/security/security_test_data.sql",
        "/sql/create/com/localeat/domains/farm/farm_test_data.sql",
        "/sql/create/com/localeat/domains/actor/breeder_test_data.sql"
}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {
        "/sql/delete/com/localeat/domains/clear_data.sql"
}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class TestPasswordRenewalController {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void renewPassword_should_return_401_if_email_not_known(){
        // when
        ResponseEntity<String> response = restTemplate.getForEntity("/passwordRenewal/bob.marcel@gmail.com/customer-area", String.class);

        // then
        assertThat(response.getStatusCodeValue()).isEqualTo(403);
        assertThat(response.getBody()).contains("No account for email address bob.marcel@gmail.com.");
    }

    @Test
    public void renewPassword_should_return_200_if_email_known(){
        // when
        ResponseEntity<String> response = restTemplate.getForEntity("/passwordRenewal/benjamin@ferme-du-ruisseau.fr/customer-area", String.class);

        // then
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }
}
