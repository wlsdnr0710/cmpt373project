package com.earth.cbr.repositories;

import com.earth.cbr.models.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findByFirstNameContaining(Pageable pageable, String firstName);
    Page<Client> findByLastNameContaining(Pageable pageable, String lastName);
    Page<Client> findAllByCbrWorkerId(Pageable pageable, Long cbrWorkerId);
    Page<Client> findAllByZone(Pageable pageable, Integer zone);
    Page<Client> findByVillageNumber(Pageable pageable, Integer villageNumber);
}
