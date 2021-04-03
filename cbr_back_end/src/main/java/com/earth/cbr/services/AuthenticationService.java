package com.earth.cbr.services;

import com.earth.cbr.models.authentication.Credential;
import com.earth.cbr.models.authentication.PhoneAuthentication;

public interface AuthenticationService {
    boolean isCredentialValid(Credential credential);
    boolean isPhoneAuthenticationValid(PhoneAuthentication phoneAuthentication);
    String getAuthenticationTokenByCredential(Credential credential);
    String getAuthenticationTokenByPhoneVerify(PhoneAuthentication phoneAuthentication);
}
