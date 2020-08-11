package com.localeat.core.config.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class AuthorizedAccountFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accountIdInUri = getAccountIdInUri(request);
        String accountIdInToken = getAccountIdInToken();
        if (accountIdInToken.isEmpty()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Access denied : unable to determine account id in token");
            return;
        }
        if (accountIdInUri.isEmpty()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Access denied : unable to determine account id in uri");
            return;
        }
        if (!Objects.equals(accountIdInUri, accountIdInToken)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Access denied : account id in the uri request is different from account id in token");
            return;
        }
        filterChain.doFilter(request, response);
    }

    private String getAccountIdInUri(HttpServletRequest request) {
        Pattern uriPattern = Pattern.compile("/accounts/(.*)/(.*)");
        Matcher uriPatterneMatcher = uriPattern.matcher(request.getRequestURI());
        if (uriPatterneMatcher.matches()) {
            return uriPatterneMatcher.group(1);
        }
        return "";
    }

    private String getAccountIdInToken() {
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        if (jwtAuthenticationToken == null) {
            return "";
        }
        Map account = (Map) jwtAuthenticationToken.getTokenAttributes().get("account");
        if (account == null) {
            return "";
        }
        return account.get("id").toString();
    }
}
