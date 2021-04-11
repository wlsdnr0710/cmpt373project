package com.earth.cbr.repositories;

import com.earth.cbr.models.ServiceDescription;
import com.earth.cbr.models.ServiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceDescriptionRepository extends JpaRepository<ServiceDescription, Long> {
    List<ServiceDescription> findAllByServiceOptionIdAndVisitZoneAndServiceOptionType(Long serviceOptionId, Integer zoneId, ServiceOption.Type type);
    List<ServiceDescription> findAllByServiceOptionIdAndServiceOptionType(Long serviceOptionId, ServiceOption.Type type);
}
