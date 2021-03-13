package com.earth.cbr.repositories;

import com.earth.cbr.models.RiskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskHistoryRepository extends JpaRepository<Disability, Long> {
}
