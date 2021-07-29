package com.localeat.core.domains.security;

import com.localeat.core.config.security.LoginPasswordSecurityConfig;
import com.localeat.core.config.security.TokenSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

import static com.localeat.core.domains.security.JSONWebTokenService.ONE_WEEK;

@RestController
public class AuthenticationController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    JSONWebTokenService jsonWebTokenService;

    private Account getAccount(UserDetails userDetails){
        return accountRepository.getAccountByUsername(userDetails.getUsername());
    }

    /**
     * The path of this resource is protected in {@link LoginPasswordSecurityConfig}.
     * It is allowed only if the request has a valid couple login / password.
     *
     * It should be accessed when the user logs in for the first time.
     *
     * @param response
     */
    @GetMapping(path = "/authentication")
    public void authenticate(HttpServletResponse response){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        Account account = getAccount((UserDetails) securityContext.getAuthentication().getPrincipal());
        String jwt = jsonWebTokenService.generateJSONWebToken(account, authentication, ONE_WEEK);
        response.addCookie(getJwtCookie(jwt, ONE_WEEK));
    }

    /**
     * The path of this resource is protected in {@link TokenSecurityConfig}.
     * It is allowed only if the request has a valid token.
     *
     * It should be accessed when the valid token is close to expire,
     * in order to get a new valid token with the expiration postponed.
     *
     * @param response
     */
    @GetMapping(path= "/accounts/{id}/authentication")
    public void refreshAuthentication(HttpServletResponse response) {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String jwtAuthenticationTokenRefreshed = jsonWebTokenService.generateJSONWebToken(jwtAuthenticationToken.getToken().getClaims(), ONE_WEEK);
        Cookie cookie = getJwtCookie(jwtAuthenticationTokenRefreshed, ONE_WEEK);
        response.addCookie(cookie);
    }

    @GetMapping(path = "/clearAuthentication")
    public void clearAuthenticationAnonymously(HttpServletRequest request, HttpServletResponse response) {
        clearJwtCookie(response);
        clearSession(request);
    }

    @DeleteMapping(path = "/accounts/{id}/authentication")
    public void clearAuthentication(HttpServletRequest request, HttpServletResponse response) {
        clearJwtCookie(response);
        clearSession(request);
    }

    private Cookie getJwtCookie(String jwt, Duration expirationDelay) {
        Cookie jwtCookie = new Cookie("jwt", jwt);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(Long.valueOf(expirationDelay.getSeconds()).intValue());
        return jwtCookie;
    }

    private void clearJwtCookie(HttpServletResponse response) {
        response.addCookie(getJwtCookie("", Duration.ofSeconds(0)));
    }

    private void clearSession(HttpServletRequest request) {
        request.getSession().invalidate();
    }
}
