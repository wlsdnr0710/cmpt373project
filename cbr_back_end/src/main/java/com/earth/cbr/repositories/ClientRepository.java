package com.earth.cbr.repositories;

import com.earth.cbr.models.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findByfirstNameContaining(Pageable pageable, String firstName);
    Page<Client> findBylastNameContaining(Pageable pageable, String lastName);
    Page<Client> findBycbrWorkerId(Pageable pageable, Long cbrWorkerId);
    Page<Client> findByzoneContaining(Pageable pageable, String zone);
    Page<Client> findByvillageNumber(Pageable pageable, Integer villageNumber);
}
