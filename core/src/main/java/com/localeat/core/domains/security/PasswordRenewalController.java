package com.localeat.core.domains.security;

import com.localeat.core.commons.EmailService;
import com.localeat.core.config.http.HttpConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.util.Arrays;
import java.util.stream.StreamSupport;

import static com.localeat.core.domains.security.JSONWebTokenService.FIFTEEN_MINUTES;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestController
public class PasswordRenewalController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PasswordRenewalController.class);

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    JSONWebTokenService jsonWebTokenService;

    @Autowired
    HttpConfig httpConfig;

    @GetMapping(path = "/passwordRenewal/{email}/{destinationRoute}")
    public void renewPassword(@PathVariable String email, @PathVariable String destinationRoute){
        Account account = StreamSupport.stream(accountRepository.findByEmail(email).spliterator(), false).findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, String.format("No account for email address %s.", email)));
        String passwordRenewalUrl = getPasswordRenewalUrl(account, email, destinationRoute);
        try {
            emailService.sendMail(
                    email,
                    "Renouvelez votre mot de passe",
                    String.format(
                            "Vous avez demandé le renouvellement de votre mot de passe.<br><br>" +
                            "Pour renouveler votre mot de passe, veuillez cliquer sur ce lien : " +
                            "<a href=\"%s\">je renouvelle mon mot de passe</a>",
                            passwordRenewalUrl));
        } catch (MessagingException messagingException) {
            LOGGER.error("An exception occured while sending an email.", messagingException);
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR);
        }
        LOGGER.debug("An password renewal email has been sent to %s.", email);
    }

    private String getPasswordRenewalUrl(Account account, String authenticationName, String destinationRoute) {
        String jwt = jsonWebTokenService.generateJSONWebToken(
                account,
                authenticationName,
                Arrays.asList(account.getActor().getRole().name()), FIFTEEN_MINUTES);
        return String.format("%s/password-renewal?token=%s&destinationRoute=%s", httpConfig.getUserInterfaceUrl(), jwt, destinationRoute);
    }
}
