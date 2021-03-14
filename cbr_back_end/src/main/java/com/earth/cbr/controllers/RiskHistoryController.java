package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.RiskHistory;
import com.earth.cbr.services.RiskHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/riskHistory")
public class RiskHistoryController {
    @Autowired
    private RiskHistoryService riskHistoryService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllRiskHistories() {
        List<RiskHistory> riskHistories = riskHistoryService.getAllRiskHistories();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", riskHistories);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getRiskHistoryById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(riskHistoryService.getRiskHistoryById(id) == null) {
            throw new ObjectDoesNotExistException("Risk History with that ID does not exist");
        }

        RiskHistory riskHistory = riskHistoryService.getRiskHistoryById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", riskHistory);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addRiskHistory(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject riskHistoryJSON = payload.getJSONObject("data");

        if (riskHistoryJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Risk History data");
        }
        String riskHistoryString = riskHistoryJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        RiskHistory riskHistory = JSON.parseObject(riskHistoryString, RiskHistory.class);
        
        RiskHistory addedRiskHistory = riskHistoryService.addRiskHistory(riskHistory);

        // Need to tell front-end the new risk history's id
        // so front-end can update the UI
        responseJson.put("id", addedRiskHistory.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateRiskHistoryById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject riskHistoryJSON = payload.getJSONObject("data");

        if (riskHistoryJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Risk History data");
        }

        if(riskHistoryService.getRiskHistoryById(riskHistoryJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Risk History with that ID does not exist");
        }

        String riskHistoryString = riskHistoryJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        RiskHistory riskHistory = JSON.parseObject(riskHistoryString, RiskHistory.class);

        RiskHistory updatedRiskHistory = riskHistoryService.updateRiskHistoryById(riskHistory);

        // Need to tell front-end the new risk history's id
        // so front-end can update the UI
        responseJson.put("id", updatedRiskHistory.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteRiskHistoryById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(riskHistoryService.getRiskHistoryById(id) == null) {
            throw new ObjectDoesNotExistException("Risk History with that ID does not exist");
        }

        riskHistoryService.deleteRiskHistoryById(id);
        return ResponseEntity.ok().body(null);
    }
}
