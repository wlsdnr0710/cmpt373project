package com.earth.cbr.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.earth.cbr.models.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.Date;

@Service
public class TokenServiceImpl implements TokenService {
    // TODO: Change this secret when on production
    private String tokenSecret = "0eqk di3!@)310edqw-[lkd";
    private Algorithm algorithm = Algorithm.HMAC256(tokenSecret);
    private JWTVerifier jwtVerifier = JWT.require(algorithm).build();

    private long DEFAULT_TOKEN_VALID_DAYS = 1;
    private long REMEMBER_PASSWORD_TOKEN_VALID_DAYS = 30;

    @Autowired
    private WorkerService workerService;

    @Override
    public String getTokenForWorkerWithRememberPassword(Worker worker, Boolean rememberPass) {
        long token_valid_days = DEFAULT_TOKEN_VALID_DAYS;
        if (rememberPass) {
            token_valid_days = REMEMBER_PASSWORD_TOKEN_VALID_DAYS;
        }
        Long id = worker.getId();
        String username = worker.getUsername();
        Date expiredDate = getExpireDateSinceToday(token_valid_days);

        String token = JWT.create()
                .withAudience(String.valueOf(id), username)
                .withExpiresAt(expiredDate)
                .sign(algorithm);

        return token;
    }

    @Override
    public Long getWorkerIdFromToken(String token) {
        try {
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            Long id = Long.valueOf(decodedJWT.getAudience().get(0));
            return id;
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    @Override
    public String getWorkerUsernameFromToken(String token) {
        try {
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            String username = decodedJWT.getAudience().get(1);
            return username;
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    @Override
    public Boolean doesWorkerHaveAdminRole(String token) {
        Long id = getWorkerIdFromToken(token);
        if (id == null) {
            return false;
        }

        Worker worker = workerService.getWorkerById(id);
        if (worker == null) {
            return false;
        }

        if (worker.getRole() == Worker.Role.ADMIN) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Date getExpireDateSinceToday(Long days) {
        Instant instant = ZonedDateTime.now().plusDays(DEFAULT_TOKEN_VALID_DAYS).toInstant();
        Date expiredDate = Date.from(instant);
        return expiredDate;
    }

    @Override
    public boolean doesTokenHasValidWorker(String token) {
        Long id = getWorkerIdFromToken(token);
        if (id == null) {
            return false;
        }

        Worker worker = workerService.getWorkerById(id);
        if (worker == null) {
            return false;
        }

        return true;
    }
}
