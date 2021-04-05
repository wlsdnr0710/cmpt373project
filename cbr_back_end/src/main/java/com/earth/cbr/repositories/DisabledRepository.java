package com.earth.cbr.repositories;

import com.earth.cbr.models.Disabled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisabledRepository extends JpaRepository<Disabled, Long> {
    List<Disabled> findAllByDisabilityIdAndClientZone(Long disabilityId, Integer zoneId);
}
