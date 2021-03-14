package com.earth.cbr.repositories;

import com.earth.cbr.models.ServiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOptionRepository extends JpaRepository<ServiceOption, Long> {

}
