package com.earth.cbr.services;

import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.WorkerCreateAccountCodeInvalid;
import com.earth.cbr.models.Worker;
import com.earth.cbr.models.WorkerCreateAccountCode;
import com.earth.cbr.repositories.WorkerCreateAccountCodeRepository;
import com.earth.cbr.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class WorkerServiceImpl implements WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    @Autowired
    private WorkerCreateAccountCodeRepository workerCreateAccountCodeRepository;

    private int numCreateAccountCode = 6;

    private static Random rand = new Random();

    @Override
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    @Override
    public Worker getWorkerByUsername(String username) {
        Optional<Worker> workerOptional = workerRepository.findByUsername(username);
        Worker worker = workerOptional.orElse(null);
        return worker;
    }

    @Override
    public Worker getWorkerByContactNumber(String contactNumber) {
        Optional<Worker> workerOptional = workerRepository.findByPhone(contactNumber);
        Worker worker = workerOptional.orElse(null);
        return worker;
    }

    @Override
    public Worker getWorkerById(Long id) {
        Optional<Worker> workerOptional = workerRepository.findById(id);
        Worker worker = workerOptional.orElse(null);
        return worker;
    }

    @Override
    public Worker addWorker(@Valid Worker worker) {
        return workerRepository.save(worker);
    }

    @Override
    public Worker updateWorkerById(@Valid Worker worker) { return workerRepository.save(worker); }

    @Override
    public void deleteWorkerById(Long id) {
        workerRepository.deleteById(id);
    }

    @Override
    public WorkerCreateAccountCode generateAndSaveWorkerCreateAccountCode() {
        WorkerCreateAccountCode code = generateWorkerCreateAccountCode();
        workerCreateAccountCodeRepository.save(code);
        return code;
    }

    private WorkerCreateAccountCode generateWorkerCreateAccountCode() {
        WorkerCreateAccountCode code = new WorkerCreateAccountCode();
        code = setCreateAccountCodeFields(code);
        return code;
    }

    private WorkerCreateAccountCode setCreateAccountCodeFields(WorkerCreateAccountCode code) {
        code.setCode(generateRandomAlphanumericCodes(numCreateAccountCode));
        code.setCreatedDate(new Date());
        code.setUsed(false);
        return code;
    }

    private String generateRandomAlphanumericCodes(int numCodes) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < numCodes; i++) {
            sb.append(generateOneAlphanumericCode());
        }
        return sb.toString();
    }

    private String generateOneAlphanumericCode() {
        CoinFace coinFace = flipCoin();
        if (coinFace == CoinFace.HEAD) {
            return generateOneRandomNumericCode();
        } else {
            return generateOneRandomAlphabeticalCode();
        }
    }

    private CoinFace flipCoin() {
        int head = 0;
        int coin = rand.nextInt(2);
        if (coin == head) {
            return CoinFace.HEAD;
        } else {
            return CoinFace.TAIL;
        }
    }

    private enum CoinFace {
        HEAD,
        TAIL
    }

    private String generateOneRandomNumericCode() {
        char base = '0';
        int limit = 10;
        char code = (char) (base + rand.nextInt(limit));
        return String.valueOf(code);
    }

    private String generateOneRandomAlphabeticalCode() {
        char base = 'a';
        int limit = 26;
        char code = (char) (base + rand.nextInt(limit));
        return String.valueOf(code);
    }

    @Override
    public void useWorkerCreateAccountCodeByWorker(String code, Long workerId) throws WorkerCreateAccountCodeInvalid {
        validateCreateAccountCode(code);
        WorkerCreateAccountCode workerCreateAccountCode = getUnusedWorkerCreateAccountCodeByCode(code);
        workerCreateAccountCode = setWorkerCreateAccountCodeAsUsedByWorker(workerCreateAccountCode, workerId);
        workerCreateAccountCodeRepository.save(workerCreateAccountCode);
    }

    private WorkerCreateAccountCode setWorkerCreateAccountCodeAsUsedByWorker(WorkerCreateAccountCode code, Long workerId) {
        code.setUsedByWorkerId(workerId);
        code.setUsed(true);
        return code;
    }

    @Override
    public void validateCreateAccountCode(String code) throws WorkerCreateAccountCodeInvalid {
        WorkerCreateAccountCode workerCreateAccountCode = getUnusedWorkerCreateAccountCodeByCode(code);
        if (workerCreateAccountCode == null) {
            throw new WorkerCreateAccountCodeInvalid("Worker account create code is not valid.");
        }
    }

    private WorkerCreateAccountCode getUnusedWorkerCreateAccountCodeByCode(String code) {
        return workerCreateAccountCodeRepository.findByCodeAndIsUsed(code, false);
    }
}
