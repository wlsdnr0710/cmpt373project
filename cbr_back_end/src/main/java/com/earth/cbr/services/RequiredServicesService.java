package com.earth.cbr.services;

import com.earth.cbr.models.RequiredServices;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

public interface RequiredServicesService {
    List<RequiredServices> getAllRequiredServices();
    RequiredServices getRequiredServicesById(Long id);
    RequiredServices updateRequiredServicesById(@Valid RequiredServices requiredServices);
    RequiredServices addRequiredServices(@Valid RequiredServices requiredServices);
    void deleteRequiredServicesById(Long id);
}
