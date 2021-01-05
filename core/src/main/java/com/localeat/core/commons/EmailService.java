package com.localeat.core.commons;

import com.localeat.core.config.email.EmailConfig;
import com.localeat.core.config.security.LocalEatRSAKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.mail.*;
import javax.mail.internet.MimeMessage;

@Controller
public class EmailController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    EmailConfig emailConfig;

    public void sendMail(String recipient, String subject, String body) {
        Session session = Session.getInstance(emailConfig.getProperties(),  new SimpleAuthenticator());

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom("la.viande.en.direct@gmail.com");
            msg.setRecipients(Message.RecipientType.TO, recipient);
            msg.setSubject(subject);
            msg.setText(body, "UTF-8", "html");
            Transport.send(msg, emailConfig.getUserName(), emailConfig.getPassword());
        } catch (MessagingException mex) {
            LOGGER.error("send mail failed", mex);
        }
    }

    private class SimpleAuthenticator extends Authenticator {
    }
}
