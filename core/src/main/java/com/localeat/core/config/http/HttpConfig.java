package com.localeat.core.config.http;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "localeat.http")
public class HttpConfig {
    private String userInterfaceUrl;

    public String getUserInterfaceUrl() {
        return userInterfaceUrl;
    }

    public void setUserInterfaceUrl(String userInterfaceUrl) {
        this.userInterfaceUrl = userInterfaceUrl;
    }
}
