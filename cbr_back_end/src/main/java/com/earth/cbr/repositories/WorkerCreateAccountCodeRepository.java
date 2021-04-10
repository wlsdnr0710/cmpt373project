package com.earth.cbr.repositories;

import com.earth.cbr.models.WorkerCreateAccountCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerCreateAccountCodeRepository extends JpaRepository<WorkerCreateAccountCode, Long> {
    WorkerCreateAccountCode findByCodeAndIsUsed(String code, Boolean isUsed);
}
