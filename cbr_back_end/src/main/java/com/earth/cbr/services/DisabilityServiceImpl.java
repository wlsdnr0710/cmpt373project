package com.earth.cbr.services;

import com.earth.cbr.models.Disability;
import com.earth.cbr.repositories.DisabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class DisabilityServiceImpl implements DisabilityService {

    @Autowired
    private DisabilityRepository disabilityRepository;

    @Override
    public List<Disability> getAllDisabilities() {
        return disabilityRepository.findAll();
    }

    @Override
    public Disability getDisabilityById(Long id) {
        Optional<Disability> disabilityOptional = disabilityRepository.findById(id);
        Disability disability = disabilityOptional.orElse(null);
        return disability;
    }

    @Override
    public Disability addDisability(@Valid Disability disability) {
        return disabilityRepository.save(disability);
    }

    @Override
    public Disability updateDisabilityById(@Valid Disability disability) {
        return disabilityRepository.save(disability);
    }

    @Override
    public void deleteDisabilityById(Long id) {
        disabilityRepository.deleteById(id);
    }
}
