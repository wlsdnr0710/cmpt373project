package com.earth.cbr.services;

import com.earth.cbr.models.RequiredServices;
import com.earth.cbr.repositories.RequiredServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class RequiredServicesServiceImpl implements RequiredServicesService {
    @Autowired
    RequiredServicesRepository requiredServicesRepository;

    @Override
    public List<RequiredServices> getAllRequiredServices() {
        return requiredServicesRepository.findAll();
    }

    @Override
    public RequiredServices getRequiredServicesById(Long id) {
        Optional<RequiredServices> requiredServicesOptional = requiredServicesRepository.findById(id);
        RequiredServices requiredServices = requiredServicesOptional.orElse(null);
        return requiredServices;
    }

    @Override
    public RequiredServices updateRequiredServicesById(@Valid RequiredServices requiredServices) {
        return requiredServicesRepository.save(requiredServices);
    }

    @Override
    public RequiredServices addRequiredServices(@Valid RequiredServices requiredServices) {
        return requiredServicesRepository.save(requiredServices);
    }

    @Override
    public void deleteRequiredServicesById(Long id) {
        requiredServicesRepository.deleteById(id);
    }
}
