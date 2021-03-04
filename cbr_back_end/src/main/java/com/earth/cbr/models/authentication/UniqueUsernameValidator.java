package com.earth.cbr.models.authentication;
import com.earth.cbr.repositories.WorkerRepository;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    @Autowired
    private WorkerRepository WorkerRepository;

    @Override
    public void initialize(UniqueUsername constraintAnnotation){}

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context){
        return WorkerRepository.findByUsername(username) == null;
    }
}
