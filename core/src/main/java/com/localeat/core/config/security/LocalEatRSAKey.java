package com.localeat.core.config.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class LocalEatRSAKey {

    private static final Logger LOGGER = LoggerFactory.getLogger(LocalEatRSAKey.class);

    private RSAKey key;

    private LocalEatRSAKey() {
        RSAKeyGenerator keyGenerator = new RSAKeyGenerator(RSAKeyGenerator.MIN_KEY_SIZE_BITS);
        try {
            key = keyGenerator.generate();
            LOGGER.debug("RSA key has been successfully generated.");
            LOGGER.debug("RSA public key is " + key.toRSAPublicKey());
        } catch (JOSEException e) {
            LOGGER.error("Error while generating a new RSA key");
        }
    }

    private static LocalEatRSAKey localEatKey = new LocalEatRSAKey();

    public static RSAPublicKey getRSAPublicKey() {
        try {
            return localEatKey.key.toRSAPublicKey();
        } catch (JOSEException e) {
            LOGGER.error("Error while retreiving public RSA key", e);
            return null;
        }
    }

    public static RSAPrivateKey getRSAPrivateKey() {
        try {
            return localEatKey.key.toRSAPrivateKey();
        } catch (JOSEException e) {
            LOGGER.error("Error while retreiving private RSA key", e);
            return null;
        }
    }

}
