package com.earth.cbr.services;

import com.earth.cbr.models.RequiredServices;
import com.earth.cbr.repositories.RequiredServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public class RequiredServicesServiceImpl {
    @Autowired
    RequiredServicesRepository requiredServicesRepository;

    List<RequiredServices> getAllRequiredServices() {
        return requiredServicesRepository.findAll();
    }

    RequiredServices getRequiredServicesById(Long id) {
        Optional<RequiredServices> requiredServicesOptional = requiredServicesRepository.findById(id);
        RequiredServices requiredServices = requiredServicesOptional.orElse(null);
        return requiredServices;
    }

    RequiredServices updateRequiredServicesById(@Valid RequiredServices requiredServices) {
        return requiredServicesRepository.save(requiredServices);
    }

    RequiredServices addRequiredServices(@Valid RequiredServices requiredServices) {
        return requiredServicesRepository.save(requiredServices);
    }

    void deleteRequiredServicesById(Long id) {
        requiredServicesRepository.deleteById(id);
    }
}
