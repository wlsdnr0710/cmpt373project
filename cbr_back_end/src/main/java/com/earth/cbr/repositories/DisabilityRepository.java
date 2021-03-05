package com.earth.cbr.repositories;

import com.earth.cbr.models.Disability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DisabilityRepository extends JpaRepository<Disability, Long> {
}
