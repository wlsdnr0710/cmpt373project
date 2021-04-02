package com.earth.cbr.repositories;

import com.earth.cbr.models.Referral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReferralRepository extends JpaRepository<Referral, Long> {
    Optional<Referral> findByRequiredServicesId(Long requiredServicesId);
    List<Referral> findAllByClientId(Long clientId);
    List<Referral> findAllByWorkerId(Long workerId);
    List<Referral> findAllByClientIdOrderByDateDesc(Long clientId);
    List<Referral> findAllByIsResolvedFalseOrderByDateAsc();
}
