package com.earth.cbr.services;

import com.earth.cbr.models.ServiceOption;
import com.earth.cbr.repositories.ServiceOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceOptionServiceImpl implements ServiceOptionService{

    @Autowired
    private ServiceOptionRepository serviceOptionRepository;

    @Override
    public List<ServiceOption> getAllServiceOptions() {
        return serviceOptionRepository.findAll();
    }

    @Override
    public ServiceOption getServiceOptionById(Long id) {
        Optional<ServiceOption> serviceOptionOptional = serviceOptionRepository.findById(id);
        ServiceOption serviceOption = serviceOptionOptional.orElse(null);
        return serviceOption;
    }

    @Override
    public ServiceOption addServiceOption(@Valid ServiceOption serviceOption) {
        return serviceOptionRepository.save(serviceOption);
    }

    @Override
    public ServiceOption updateServiceOptionById(@Valid ServiceOption serviceOption) {
        return serviceOptionRepository.save(serviceOption);
    }

    @Override
    public void deleteServiceOptionById(Long id) {
        serviceOptionRepository.deleteById(id);
    }
}
