package com.earth.cbr.services;

import com.earth.cbr.models.Zone;

import java.util.List;

public interface ZoneService {
    List<Zone> getAllZones();
    Zone getZoneById(Long id);
    Zone addZone(Zone zone);
    Zone updateZoneById(Long id, Zone zone);
    void deleteZoneById(Long id);
}
