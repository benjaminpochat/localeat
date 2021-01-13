package com.localeat.core.config.security.filter;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;

import static java.time.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME;

public class NotExpiredTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        if (isTokenExpired(jwtAuthenticationToken)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Access denied : the token is expired");
            return;
        }
        filterChain.doFilter(request, response);
    }

    private boolean isTokenExpired(JwtAuthenticationToken jwtAuthenticationToken) {
        String expirationAsString = (String) jwtAuthenticationToken.getTokenAttributes().get("expiration");
        Instant expiration = Instant.from(ISO_OFFSET_DATE_TIME.parse(expirationAsString));
        return expiration.isBefore(Instant.now());
    }
}
