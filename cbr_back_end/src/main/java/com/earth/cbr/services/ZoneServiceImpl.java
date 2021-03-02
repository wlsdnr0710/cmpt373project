package com.earth.cbr.services;

import com.earth.cbr.models.Zone;
import com.earth.cbr.repositories.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ZoneServiceImpl implements ZoneService{

    @Autowired
    private ZoneRepository zoneRepository;

    @Override
    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    @Override
    public Zone getZoneById(Long id) {
        Optional<Zone> zoneOptional = zoneRepository.findById(id);
        Zone zone = zoneOptional.orElse(null);
        return zone;
    }

    @Override
    public Zone addZone(@Valid Zone zone) {
        return zoneRepository.save(zone);
    }

    @Override
    public Zone updateZone(@Valid Zone zone) {
        return zoneRepository.save(zone);
    }

    @Override
    public void deleteZoneById(Long id) {
        zoneRepository.deleteById(id);
    }
}
