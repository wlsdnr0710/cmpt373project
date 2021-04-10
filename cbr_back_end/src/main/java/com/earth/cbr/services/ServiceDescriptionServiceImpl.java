package com.earth.cbr.services;

import com.earth.cbr.models.ServiceDescription;
import com.earth.cbr.models.ServiceOption;
import com.earth.cbr.repositories.ServiceDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceDescriptionServiceImpl implements ServiceDescriptionService{

    @Autowired
    private ServiceDescriptionRepository serviceDescriptionRepository;

    @Override
    public List<ServiceDescription> getAllServiceDescriptions() {
        return serviceDescriptionRepository.findAll();
    }

    @Override
    public ServiceDescription getServiceDescriptionById(Long id) {
        Optional<ServiceDescription> serviceDescriptionDescriptional = serviceDescriptionRepository.findById(id);
        ServiceDescription serviceDescription = serviceDescriptionDescriptional.orElse(null);
        return serviceDescription;
    }

    @Override
    public Integer getAllServiceOptionsByServiceOptionTypeCount(Long serviceOptionId, ServiceOption.Type type) {
        return serviceDescriptionRepository.findAllByServiceOptionIdAndServiceOptionType(serviceOptionId, type).size();
    }

    @Override
    public Integer getAllServiceOptionsByZoneIdAndServiceOptionTypeCount(Long serviceOptionId, Integer zoneId, ServiceOption.Type type) {
        return serviceDescriptionRepository.findAllByServiceOptionIdAndVisitZoneAndServiceOptionType(serviceOptionId, zoneId, type).size();
    }

    @Override
    public ServiceDescription addServiceDescription(@Valid ServiceDescription serviceDescription) {
        return serviceDescriptionRepository.save(serviceDescription);
    }

    @Override
    public ServiceDescription updateServiceDescriptionById(@Valid ServiceDescription serviceDescription) {
        return serviceDescriptionRepository.save(serviceDescription);
    }

    @Override
    public void deleteServiceDescriptionById(Long id) {
        serviceDescriptionRepository.deleteById(id);
    }
}
