package com.earth.cbr.repositories;

import com.earth.cbr.models.Referral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Long> {
    Optional<Referral> findByRequiredServicesId(Long requiredServicesId);
}
