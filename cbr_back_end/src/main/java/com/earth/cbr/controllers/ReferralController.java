package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.Referral;
import com.earth.cbr.services.ReferralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/referral")
public class ReferralController {
    @Autowired
    private ReferralService referralService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllReferrals() {
        List<Referral> referrals = referralService.getAllReferrals();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", referrals);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/clientId/{clientId}")
    public ResponseEntity<JSONObject> getAllReferralsByClientId(@PathVariable Long clientId)
            throws ObjectDoesNotExistException {
        if (referralService.getReferralById(clientId) == null) {
            throw new ObjectDoesNotExistException("Client not associated with any referrals");
        }
        List<Referral> referrals = referralService.getAllReferralsByClientId(clientId);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", referrals);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/clientId/{clientId}/sortByDate")
    public ResponseEntity<JSONObject> getAllReferralsByIsResolvedFalseSortedByDate(@PathVariable Long clientId)
            throws ObjectDoesNotExistException {
        if (referralService.getReferralById(clientId) == null) {
            throw new ObjectDoesNotExistException("Client not associated with any referrals");
        }
        List<Referral> referrals = referralService.getAllReferralsByClientIdSortedByDate(clientId);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", referrals);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/outstandingReferrals")
    public ResponseEntity<JSONObject> getAllOutstandingReferralsSortedByDate()
            throws ObjectDoesNotExistException {
        List<Referral> referrals = referralService.getAllOutstandingReferralsSortedByDate();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", referrals);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getReferralById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if (referralService.getReferralById(id) == null) {
            throw new ObjectDoesNotExistException("Referral with that ID does not exist");
        }
        Referral referral = referralService.getReferralById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", referral);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addReferral(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject referralJSON = payload.getJSONObject("data");

        if (referralJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Referral data");
        }
        String referralString = referralJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Referral referral = JSON.parseObject(referralString, Referral.class);

        Referral addedReferral = referralService.addReferral(referral);

        // Need to tell front-end the new Referral's id
        // so front-end can update the UI
        responseJson.put("id", addedReferral.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateReferralById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject referralJSON = payload.getJSONObject("data");

        if (referralJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Referral data");
        }

        if(referralService.getReferralById(referralJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Referral with that ID does not exist");
        }

        String referralString = referralJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Referral referral = JSON.parseObject(referralString, Referral.class);

        Referral updatedReferral = referralService.updateReferralById(referral);

        // get Referral's id to update UI
        responseJson.put("id", updatedReferral.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteReferralById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if(referralService.getReferralById(id) == null) {
            throw new ObjectDoesNotExistException("Referral with that ID does not exist");
        }

        referralService.deleteReferralById(id);
        return ResponseEntity.ok().body(null);
    }
}
