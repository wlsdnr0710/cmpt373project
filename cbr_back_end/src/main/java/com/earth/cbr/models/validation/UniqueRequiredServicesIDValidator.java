package com.earth.cbr.models.validation;

import com.earth.cbr.models.RequiredServices;
import com.earth.cbr.repositories.ReferralRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

// TODO: Fix validator to inject the ReferralRepository
public class UniqueRequiredServicesIDValidator
        implements ConstraintValidator<UniqueRequiredServicesID, RequiredServices> {
    @Autowired
    private ReferralRepository referralRepository;

    @Override
    public void initialize(UniqueRequiredServicesID constraintAnnotation){}

    @Override
    public boolean isValid(RequiredServices requiredServices, ConstraintValidatorContext context){
        Long requiredServicesId = requiredServices.getId();
        return !referralRepository.findByRequiredServicesId(requiredServicesId).isPresent();
    }
}
