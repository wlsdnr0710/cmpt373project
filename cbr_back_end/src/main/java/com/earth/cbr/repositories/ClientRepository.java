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
    Page<Client> findBycbrWorkerIdContaining(Pageable pageable, String cbrWorkerId);
    Page<Client> findByzoneContaining(Pageable pageable, String zone);
    Page<Client> findByvillageNumberContaining(Pageable pageable, String villageNumber);
}
