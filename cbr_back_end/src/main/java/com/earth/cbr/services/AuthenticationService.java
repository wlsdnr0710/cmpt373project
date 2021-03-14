package com.earth.cbr.services;

import com.earth.cbr.models.authentication.Credential;

public interface AuthenticationService {
    boolean isCredentialValid(Credential credential);
    String getAuthenticationToken(Credential credential);
}
