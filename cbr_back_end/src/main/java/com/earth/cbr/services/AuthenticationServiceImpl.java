package com.earth.cbr.services;

import com.earth.cbr.models.Worker;
import com.earth.cbr.models.authentication.Credential;
import com.earth.cbr.models.authentication.PhoneAuthentication;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private WorkerService workerService;

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean isCredentialValid(Credential credential) {
        return areUsernamePasswordValid(credential.username, credential.password);
    }

    @Override
    public String getAuthenticationTokenByCredential(Credential credential) {
        Worker worker = workerService.getWorkerByUsername(credential.username);
        //TODO: change params to add valid days
        return tokenService.getTokenForWorker(worker);
    }

    @Override
    public String getAuthenticationTokenByPhoneVerify(PhoneAuthentication phoneAuthentication){
        Worker worker = workerService.getWorkerByContactNumber(phoneAuthentication.contactNumber);
        //TODO: change params to add valid days
        return tokenService.getTokenForWorker(worker);
    }

    public boolean isPhoneAuthenticationValid(PhoneAuthentication phoneAuthentication){
        return areFirebaseVerificationValid(phoneAuthentication.firebaseVerifyCode) && isPhoneNumberValid(phoneAuthentication.contactNumber);
    }

    private boolean isPhoneNumberValid (String contactNumber){
        Worker worker = workerService.getWorkerByContactNumber(contactNumber);
        return worker != null;
    }

    private boolean areFirebaseVerificationValid (String firebaseVerifyCode){
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(firebaseVerifyCode);
            return true;
        } catch (FirebaseAuthException e){
            return false;
        }
    }

    private boolean areUsernamePasswordValid(String username, String password) {
        if (!doesUsernameExist(username)) {
            return false;
        }
        Worker worker = workerService.getWorkerByUsername(username);
        return worker.getPassword().equals(password) ? true : false;
    }

    private boolean doesUsernameExist(String username) {
        Worker worker = workerService.getWorkerByUsername(username);
        return worker != null ? true : false;
    }
}
