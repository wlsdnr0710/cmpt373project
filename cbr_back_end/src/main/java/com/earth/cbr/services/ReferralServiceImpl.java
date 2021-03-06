package com.earth.cbr.services;

import com.earth.cbr.models.Referral;
import com.earth.cbr.repositories.ReferralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ReferralServiceImpl implements ReferralService {
    @Autowired
    private ReferralRepository referralRepository;

    @Override
    public List<Referral> getAllReferrals() {
        return referralRepository.findAll();
    }

    @Override
    public List<Referral> getAllReferralsByClientId(Long clientId) {
        return referralRepository.findAllByClientId(clientId);
    }

    @Override
    public Long getAllReferralsCount() {
        return referralRepository.count();
    }

    @Override
    public Integer getAllReferralsByZoneIdCount(Integer zoneId) {
        return referralRepository.findAllByClientZone(zoneId).size();
    }

    @Override
    public Integer getAllReferralsByWorkerIdCount(Long workerId) {
        return referralRepository.findAllByWorkerId(workerId).size();
    }

    @Override
    public List<Referral> getAllReferralsByClientIdSortedByDate(Long clientId) {
        return referralRepository.findAllByClientIdOrderByDateDesc(clientId);
    }

    @Override
    public List<Referral> getAllOutstandingReferralsSortedByDate() {
        return referralRepository.findAllByIsResolvedFalseOrderByDateAsc();
    }

    @Override
    public Integer getAllOutstandingReferralsByWorkerIdCount(Long workerId) {
        return referralRepository.findAllByWorkerIdAndIsResolvedFalse(workerId).size();
    }

    @Override
    public Integer getAllOutstandingReferralsCount() {
        return referralRepository.findAllByIsResolvedFalseOrderByDateAsc().size();
    }

    @Override
    public Integer getAllOutstandingReferralsByZoneIdCount(Integer zoneId) {
        return referralRepository.findAllByClientZoneAndIsResolvedFalse(zoneId).size();
    }

    @Override
    public Referral getReferralById(Long id) {
        Optional<Referral> referralOptional = referralRepository.findById(id);
        Referral referral = referralOptional.orElse(null);
        return referral;
    }

    @Override
    public Referral addReferral(@Valid Referral referral) {
        return referralRepository.save(referral);
    }

    @Override
    public Referral updateReferralById(@Valid Referral referral) { return referralRepository.save(referral); }

    @Override
    public void deleteReferralById(Long id) {
        referralRepository.deleteById(id);
    }
}
