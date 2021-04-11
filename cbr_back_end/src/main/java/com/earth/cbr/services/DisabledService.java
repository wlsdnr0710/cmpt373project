package com.earth.cbr.services;

import com.earth.cbr.models.Disabled;

import javax.validation.Valid;
import java.util.List;

public interface DisabledService {
    List<Disabled> getAllDisableds();
    Integer getAllDisabilitiesByZoneIdCount(Long disabilityId, Integer zoneId);
    Integer getAllDisabilitiesCount(Long disabilityId);
    Disabled getDisabledById(Long id);
    Disabled addDisabled(@Valid Disabled disabled);
    Disabled updateDisabledById(@Valid Disabled disabled);
    void deleteDisabledById(Long id);
}
