package com.earth.cbr.services;

import com.earth.cbr.models.Worker;

import java.util.Date;

public interface TokenService {
    String getTokenForWorker(Worker worker);
    Long getWorkerIdFromToken(String token);
    String getWorkerUsernameFromToken(String token);
    Date getExpireDateSinceToday(Long days);
    boolean doesTokenHasValidWorker(String token);
}