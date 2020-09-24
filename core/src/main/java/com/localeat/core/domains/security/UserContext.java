package com.localeat.core.domains.security;

public class UserContext {
    Account account;
    String password;
    Role role;

    public Account getAccount() {
        return account;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }
}
