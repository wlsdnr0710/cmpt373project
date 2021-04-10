package com.earth.cbr.repositories;

import com.earth.cbr.models.ServiceDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceDescriptionRepository extends JpaRepository<ServiceDescription, Long> {
    List<ServiceDescription> findAllByServiceOptionIdAndVisitZone(Long serviceOptionId, Integer zoneId);
}
