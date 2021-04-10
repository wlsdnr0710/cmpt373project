package com.earth.cbr.services;

import com.earth.cbr.models.ServiceDescription;

import javax.validation.Valid;
import java.util.List;

public interface ServiceDescriptionService {
    List<ServiceDescription> getAllServiceDescriptions();
    ServiceDescription getServiceDescriptionById(Long id);
    Integer getAllServiceOptionsByZoneIdCount(Long serviceOptionId, Integer zoneId);
    ServiceDescription addServiceDescription(@Valid ServiceDescription serviceDescription);
    ServiceDescription updateServiceDescriptionById(@Valid ServiceDescription serviceDescription);
    void deleteServiceDescriptionById(Long id);
}
