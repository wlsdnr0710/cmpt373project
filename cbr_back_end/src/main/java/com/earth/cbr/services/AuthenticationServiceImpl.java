package com.earth.cbr.services;

import com.earth.cbr.models.Worker;
import com.earth.cbr.models.authentication.Credential;
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
    public String getAuthenticationToken(Credential credential) {
        Worker worker = workerService.getWorkerByUsername(credential.username);
        //TODO: change params to add valid days
        return tokenService.getTokenForWorker(worker);
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
