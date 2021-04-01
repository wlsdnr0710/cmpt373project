package com.earth.cbr.services;

import com.earth.cbr.models.Worker;

import java.util.Date;

public interface TokenService {
    String getTokenForWorkerWithRememberPassword(Worker worker, Boolean rememberPass);
    Long getWorkerIdFromToken(String token);
    String getWorkerUsernameFromToken(String token);
    Boolean doesWorkerHaveAdminRole(String token);
    Date getExpireDateSinceToday(Long days);
    boolean doesTokenHasValidWorker(String token);
}
