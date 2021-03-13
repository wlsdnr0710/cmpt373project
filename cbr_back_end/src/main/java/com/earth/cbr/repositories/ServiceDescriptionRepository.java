package com.earth.cbr.repositories;

import com.earth.cbr.models.ServiceDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceDescriptionRepository extends JpaRepository<ServiceDescription, Long> {

}
