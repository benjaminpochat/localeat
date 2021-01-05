package com.localeat.core.config.email;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Properties;

@ConfigurationProperties("localeat.smtp")
public class EmailProperties {
    private boolean authentication;
    private boolean startTls;
    private String host;
    private String port;
    private String sslTrust;

    public boolean isAuthentication() {
        return authentication;
    }

    public void setAuthentication(boolean authentication) {
        this.authentication = authentication;
    }

    public boolean isStartTls() {
        return startTls;
    }

    public void setStartTls(boolean startTls) {
        this.startTls = startTls;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getSslTrust() {
        return sslTrust;
    }

    public void setSslTrust(String sslTrust) {
        this.sslTrust = sslTrust;
    }

    public Properties getProperties() {
        var properties = new Properties();
        properties.put("mail.smtp.auth", authentication);
        properties.put("mail.smtp.starttls.enable", startTls);
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.ssl.trust", sslTrust);
        return properties;
    }
}
