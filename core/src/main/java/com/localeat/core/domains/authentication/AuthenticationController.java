package com.localeat.core.domains.authentication;

import com.localeat.core.config.security.LocalEatRSAKey;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthenticationController {

    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping(path = "/authentication")
    public String authenticate(){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        return generateJSONWebToken(authentication);
    }

    private String generateJSONWebToken(Authentication authentication){
        List<String> authenticationsAsString = authentication.getAuthorities().stream().map(authority -> authority.toString()).collect(Collectors.toList());
        JWSSigner signer = new RSASSASigner(LocalEatRSAKey.getRSAPrivateKey());
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .claim("name", authentication.getName())
                .claim("authorities", authenticationsAsString)
                .build();
        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.RS256).build(),
                claimsSet);
        try {
            signedJWT.sign(signer);
        } catch (JOSEException e) {
            logger.error("Error while signing Json Web Token", e);
        }
        return signedJWT.serialize();
    }
}
