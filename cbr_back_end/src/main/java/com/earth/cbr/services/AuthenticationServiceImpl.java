package com.earth.cbr.services;

import com.earth.cbr.models.authentication.Credential;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Override
    public boolean isCredentialValid(Credential credential) {
        return true;
    }

    @Override
    public String getAuthenticationToken(Credential credential) {
        return "JWT token";
    }
}
