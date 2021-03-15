package com.earth.cbr.services;

import com.earth.cbr.models.Physiotherapy;

import javax.validation.Valid;
import java.util.List;

public interface PhysiotherapyService {
    List<Physiotherapy> getAllPhysiotherapy();
    Physiotherapy getPhysiotherapyById(Long id);
    Physiotherapy updatePhysiotherapyById(@Valid Physiotherapy physiotherapy);
    Physiotherapy addPhysiotherapy(@Valid Physiotherapy physiotherapy);
    void deletePhysiotherapyById(Long id);
}
