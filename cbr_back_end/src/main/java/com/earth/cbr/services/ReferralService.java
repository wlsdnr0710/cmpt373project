package com.earth.cbr.services;

import com.earth.cbr.models.Referral;

import javax.validation.Valid;
import java.util.List;

public interface ReferralService {
    List<Referral> getAllReferrals();
    Referral getReferralById(Long id);
    Referral updateReferralById(@Valid Referral referral);
    Referral addReferral(@Valid Referral referral);
    void deleteReferralById(Long id);
}
