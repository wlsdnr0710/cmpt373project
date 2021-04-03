package com.earth.cbr.repositories;

import com.earth.cbr.models.RequiredServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequiredServicesRepository extends JpaRepository<RequiredServices, Long> {
}
