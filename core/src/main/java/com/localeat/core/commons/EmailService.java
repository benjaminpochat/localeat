package com.localeat.core.commons;

import com.localeat.core.config.email.EmailConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    EmailConfig emailConfig;

    public void sendMail(String recipient, String subject, String body) throws MessagingException {
        if (emailConfig.isDisableEmailNotifications()){
            LOGGER.warn("email notifications have been disabled");
            return;
        }
        Session session = Session.getInstance(emailConfig.getProperties(),  new SimpleAuthenticator());
        MimeMessage msg = new MimeMessage(session);
        msg.setFrom("la.viande.en.direct@gmail.com");
        msg.setRecipients(Message.RecipientType.TO, recipient);
        msg.setSubject(subject);
        msg.setText(body, "UTF-8", "html");
        Transport.send(msg, emailConfig.getUserName(), emailConfig.getPassword());
    }

    private class SimpleAuthenticator extends Authenticator {
    }
}
