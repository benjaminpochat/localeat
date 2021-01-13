package com.localeat.core.config.security;

import com.localeat.core.config.security.filter.AuthorizedAccountFilter;
import com.localeat.core.config.security.filter.NotExpiredTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationFilter;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@Order(2)
public class TokenSecurityConfig  extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthenticationEntryPoint authenticationEntryPoint;
        http.cors()
            .and()
                .authorizeRequests()
                .antMatchers("/accounts/**")
                .authenticated()
            .and()
                .antMatcher("/accounts/**")
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .addFilterAfter(new AuthorizedAccountFilter(), BearerTokenAuthenticationFilter.class)
                .addFilterAfter(new NotExpiredTokenFilter(), BearerTokenAuthenticationFilter.class)
                ;
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(LocalEatRSAKey.getRSAPublicKey()).build();
    }

}
