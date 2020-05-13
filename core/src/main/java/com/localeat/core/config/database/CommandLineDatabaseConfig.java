package com.localeat.core.config.database;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile({"prod"})
public class CommandLineDatabaseConfig {

    @Value("${datasource_url}")
    private String url;

    @Value("${datasource_username}")
    private String userName;

    @Value("${datasource_password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder
                .create()
                .username(userName)
                .password(password)
                .url(url)
                .build();
    }
}
