package com.earth.cbr.repositories;

import com.earth.cbr.models.Disabled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisabledRepository extends JpaRepository<Disabled, Long> {
}
