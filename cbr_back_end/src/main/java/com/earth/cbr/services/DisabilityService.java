package com.earth.cbr.services;

import com.earth.cbr.models.Disability;

import javax.validation.Valid;
import java.util.List;

public interface DisabilityService {
    List<Disability> getAllDisabilities();
    Disability getDisabilityById(Long id);
    Disability addDisability(@Valid Disability disability);
    Disability updateDisabilityById(@Valid Disability disability);
    void deleteDisabilityById(Long id);
}
