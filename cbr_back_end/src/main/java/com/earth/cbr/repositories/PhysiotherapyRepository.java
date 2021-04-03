package com.earth.cbr.repositories;

import com.earth.cbr.models.Physiotherapy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysiotherapyRepository extends JpaRepository<Physiotherapy, Long> {
}
