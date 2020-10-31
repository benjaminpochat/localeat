package com.localeat.core.config.database;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile({"dev"})
public class PropertiesDatabaseConfig {

    @Autowired
    private DataSourceProperties dataSourceProperties;

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        var dataSource = new HikariDataSource();
        dataSource.setUsername(dataSourceProperties.getUsername());
        dataSource.setPassword(dataSourceProperties.getPassword());
        dataSource.setJdbcUrl(dataSourceProperties.getUrl());
        dataSource.setAutoCommit(false);
        return dataSource;
    }
}