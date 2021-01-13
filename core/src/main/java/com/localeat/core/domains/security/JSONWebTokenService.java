package com.localeat.core.domains.security;

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
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.time.format.DateTimeFormatter.ISO_INSTANT;

//TODO : using standard jwt attributes ("exp" instead of "expiration" in claims, etc...),
// and trying to remove the multiple versions of generateJSONWebToken
@Service
public class JSONWebTokenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);
    public static final Duration FIFTEEN_MINUTES = Duration.ofMinutes(15);
    public static final Duration ONE_HOUR = Duration.ofHours(1);

    public String generateJSONWebToken(Map<String, Object> claims, Duration expirationDelay) {
        JWSSigner signer = new RSASSASigner(LocalEatRSAKey.getRSAPrivateKey());
        Instant expirationDate = Instant.now().plus(expirationDelay);
        JWTClaimsSet.Builder claimSetBuilder = new JWTClaimsSet.Builder();
        claimSetBuilder.claim("expiration", ISO_INSTANT.format(expirationDate));
        claims.entrySet().stream().filter(entry -> !entry.getKey().equals("expiration")).forEach(entry -> claimSetBuilder.claim(entry.getKey(), entry.getValue()));
        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.RS256).build(),
                claimSetBuilder.build());
        try {
            signedJWT.sign(signer);
        } catch (JOSEException e) {
            LOGGER.error("Error while signing Json Web Token", e);
        }
        return signedJWT.serialize();
    }

    public String generateJSONWebToken(Account account, Authentication authentication, Duration expirationDelay) {
        List<String> authorities = authentication.getAuthorities().stream().map(Object::toString).collect(Collectors.toList());
        return generateJSONWebToken(account, authentication.getName(), authorities, expirationDelay);
    }

    public String generateJSONWebToken(Account account, String authenticationName, List<String> authorities, Duration expirationDelay) {
        return generateJSONWebToken(Map.of(
                JwtClaimNames.SUB, authenticationName,
                "authorities", authorities,
                "account", account), expirationDelay);
    }
}