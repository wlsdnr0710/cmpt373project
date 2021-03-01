package com.earth.cbr.services;

import com.earth.cbr.models.Referral;
import com.earth.cbr.models.Referral;
import com.earth.cbr.repositories.ReferralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Referral getReferralById(Long id) {
        Optional<Referral> referralOptional = referralRepository.findById(id);
        Referral referral = referralOptional.get();
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
