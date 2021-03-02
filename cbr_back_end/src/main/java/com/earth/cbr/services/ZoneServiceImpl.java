package com.earth.cbr.services;

import com.earth.cbr.models.Zone;
import com.earth.cbr.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZoneServiceImpl implements ZoneService{

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    public List<Zone> getAllZones() {
        return null;
    }

    @Override
    public Zone getZoneById(Long id) {
        return null;
    }

    @Override
    public Zone addZone(Zone zone) {
        return null;
    }

    @Override
    public Zone updateZoneById(Long id, Zone zone) {
        return null;
    }

    @Override
    public void deleteZoneById(Long id) {
        return;
    }
}
