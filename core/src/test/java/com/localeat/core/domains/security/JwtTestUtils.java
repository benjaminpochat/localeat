package com.localeat.core.domains.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JwtTestUtils {

    public String getJwtCookie(ResponseEntity<String> result) {
        return result.getHeaders().get("Set-Cookie").stream().filter(s -> s.startsWith("jwt=")).findFirst().orElse(null);
    }

    public String getJwtFromCookie(String jwtCookie) {
        Pattern jwtCookieRegexPattern = Pattern.compile("jwt=([^;]*);.*");
        Matcher matcher = jwtCookieRegexPattern.matcher(jwtCookie);
        matcher.matches();
        return matcher.group(1);
    }

    public String getJwtFromCookie(ResponseEntity<String> result){
        return getJwtFromCookie(getJwtCookie(result));
    }

    public Account getAccountFromJwt(String jwtCookie, JwtDecoder jwtDecoder) throws com.fasterxml.jackson.core.JsonProcessingException {
        String jwtEncoded = getJwtFromCookie(jwtCookie);
        Jwt jwt = jwtDecoder.decode(jwtEncoded);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jwt.getClaimAsString("account"), Account.class);
    }
}
