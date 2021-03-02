package com.earth.cbr.services;

import com.earth.cbr.models.Zone;

import javax.validation.Valid;
import java.util.List;

public interface ZoneService {
    List<Zone> getAllZones();
    Zone getZoneById(Long id);
    Zone addZone(@Valid Zone zone);
    Zone updateZone(@Valid Zone zone);
    void deleteZoneById(Long id);
}
