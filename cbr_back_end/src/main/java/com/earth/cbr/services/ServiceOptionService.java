package com.earth.cbr.services;

import com.earth.cbr.models.ServiceOption;

import javax.validation.Valid;
import java.util.List;

public interface ServiceOptionService {
    List<ServiceOption> getAllServiceOptions();
    List<ServiceOption> getAllServiceOptionsByType(ServiceOption.Type type);
    ServiceOption getServiceOptionById(Long id);
    ServiceOption addServiceOption(@Valid ServiceOption serviceOption);
    ServiceOption updateServiceOptionById(@Valid ServiceOption serviceOption);
    void deleteServiceOptionById(Long id);
}
