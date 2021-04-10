package com.earth.cbr.services;

import com.earth.cbr.models.ServiceDescription;
import com.earth.cbr.models.ServiceOption;

import javax.validation.Valid;
import java.util.List;

public interface ServiceDescriptionService {
    List<ServiceDescription> getAllServiceDescriptions();
    ServiceDescription getServiceDescriptionById(Long id);
    Integer getAllServiceOptionsByServiceOptionTypeCount(Long serviceOptionId, ServiceOption.Type type);
    Integer getAllServiceOptionsByZoneIdAndServiceOptionTypeCount(Long serviceOptionId, Integer zoneId, ServiceOption.Type type);
    ServiceDescription addServiceDescription(@Valid ServiceDescription serviceDescription);
    ServiceDescription updateServiceDescriptionById(@Valid ServiceDescription serviceDescription);
    void deleteServiceDescriptionById(Long id);
}
