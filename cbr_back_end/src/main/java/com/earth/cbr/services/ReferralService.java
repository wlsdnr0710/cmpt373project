package com.earth.cbr.services;

import com.earth.cbr.models.Referral;

import javax.validation.Valid;
import java.util.List;

public interface ReferralService {
    List<Referral> getAllReferrals();
    List<Referral> getAllReferralsByClientId(Long clientId);
    Long getAllReferralsCount();
    Integer getAllReferralsByWorkerIdCount(Long workerId);
    Integer getAllReferralsByZoneIdCount(Integer zoneId);
    List<Referral> getAllReferralsByClientIdSortedByDate(Long clientId);
    List<Referral> getAllOutstandingReferralsSortedByDate();
    Integer getAllOutstandingReferralsCount();
    Integer getAllOutstandingReferralsByWorkerIdCount(Long workerId);
    Referral getReferralById(Long id);
    Referral updateReferralById(@Valid Referral referral);
    Referral addReferral(@Valid Referral referral);
    void deleteReferralById(Long id);
}
