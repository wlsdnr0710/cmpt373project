package com.earth.cbr.services;

import com.earth.cbr.models.Physiotherapy;
import com.earth.cbr.models.Physiotherapy;
import com.earth.cbr.repositories.PhysiotherapyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class PhysiotherapyServiceImpl implements PhysiotherapyService {
    @Autowired
    private PhysiotherapyRepository physiotherapyRepository;

    @Override
    public List<Physiotherapy> getAllPhysiotherapys() {
        return physiotherapyRepository.findAll();
    }

    @Override
    public Physiotherapy getPhysiotherapyById(Long id) {
        Optional<Physiotherapy> physiotherapyOptional = physiotherapyRepository.findById(id);
        Physiotherapy physiotherapy = physiotherapyOptional.get();
        return physiotherapy;
    }

    @Override
    public Physiotherapy addPhysiotherapy(@Valid Physiotherapy physiotherapy) {
        return physiotherapyRepository.save(physiotherapy);
    }

    @Override
    public Physiotherapy updatePhysiotherapyById(@Valid Physiotherapy physiotherapy) { return physiotherapyRepository.save(physiotherapy); }

    @Override
    public void deletePhysiotherapyById(Long id) {
        physiotherapyRepository.deleteById(id);
    }
}
