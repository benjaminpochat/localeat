package com.localeat.core.config.http;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "localeat.http")
public class HttpConfig {
    private String domainName;
    private int backendPort = 8080;
    private int frontendPort = 80;
    private String protocol = "http";

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public int getBackendPort() {
        return backendPort;
    }

    public void setBackendPort(int backendPort) {
        this.backendPort = backendPort;
    }

    public int getFrontendPort() {
        return frontendPort;
    }

    public void setFrontendPort(int frontendPort) {
        this.frontendPort = frontendPort;
    }

    public String getFrontendUrl() {
        return String.format("%s://%s:%s", protocol, domainName, frontendPort);
    }

    public String getBackendUrl() {
        return String.format("%s://%s:%s", protocol, domainName, backendPort);
    }
}
