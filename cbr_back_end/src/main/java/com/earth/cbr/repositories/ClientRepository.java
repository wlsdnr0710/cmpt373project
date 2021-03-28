package com.earth.cbr.repositories;

import com.earth.cbr.models.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findAllByFirstNameContaining(Pageable pageable, String firstName);
    Page<Client> findAllByLastNameContaining(Pageable pageable, String lastName);
    Page<Client> findAllByCbrWorkerId(Pageable pageable, Long cbrWorkerId);
    Page<Client> findAllByZone(Pageable pageable, Integer zone);
    Page<Client> findAllByVillageNumber(Pageable pageable, Integer villageNumber);
    @Query(value = "SELECT *, (health_risk + social_risk + education_risk) AS risk_sum FROM `client` c join " +
            "risk_history r on r.client_id = c.id WHERE `date` IN (SELECT MAX(`date`) FROM risk_history GROUP BY client_id) " +
            "ORDER BY risk_sum DESC LIMIT 5", nativeQuery = true)
    List<Client> findTop5ClientsWithHighestRisk();
    @Query(value = "SELECT * FROM `client` c join `referral` r on c.id = r.client_id " +
            "WHERE is_resolved = 0 ORDER BY `date` ASC", nativeQuery = true)
    List<Client> findOutstandingReferralsByDate();
}
