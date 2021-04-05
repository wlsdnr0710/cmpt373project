package com.earth.cbr.services;

import com.earth.cbr.models.Disabled;
import com.earth.cbr.repositories.DisabledRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class DisabledServiceImpl implements DisabledService {

    @Autowired
    private DisabledRepository disabledRepository;

    @Override
    public List<Disabled> getAllDisableds() {
        return disabledRepository.findAll();
    }

    @Override
    public Long getAllDisabledsCount() {
        return disabledRepository.count();
    }

    @Override
    public Integer getAllDisabledsByZoneIdCount(Long disabilityId, Integer zoneId) {
        return disabledRepository.findAllByDisabilityIdAndClientZone(disabilityId, zoneId).size();
    }

    @Override
    public Disabled getDisabledById(Long id) {
        Optional<Disabled> disabledOptional = disabledRepository.findById(id);
        Disabled disabled = disabledOptional.orElse(null);
        return disabled;
    }

    @Override
    public Disabled addDisabled(@Valid Disabled disabled) {
        return disabledRepository.save(disabled);
    }

    @Override
    public Disabled updateDisabledById(@Valid Disabled disabled) {
        return disabledRepository.save(disabled);
    }

    @Override
    public void deleteDisabledById(Long id) {
        disabledRepository.deleteById(id);
    }
}
