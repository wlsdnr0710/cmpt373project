package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.models.Physiotherapy;
import com.earth.cbr.services.PhysiotherapyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/physiotherapy")
public class PhysiotherapyController {
    @Autowired
    private PhysiotherapyService physiotherapyService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllPhysiotherapy() {
        List<Physiotherapy> physiotherapyList = physiotherapyService.getAllPhysiotherapy();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", physiotherapyList);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getPhysiotherapyById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if (physiotherapyService.getPhysiotherapyById(id) == null) {
            throw new ObjectDoesNotExistException("Physiotherapy with that ID does not exist");
        }
        Physiotherapy physiotherapy = physiotherapyService.getPhysiotherapyById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", physiotherapy);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addPhysiotherapy(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject physiotherapyJSON = payload.getJSONObject("data");

        if (physiotherapyJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Physiotherapy data");
        }
        String physiotherapyString = physiotherapyJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Physiotherapy physiotherapy = JSON.parseObject(physiotherapyString, Physiotherapy.class);

        Physiotherapy addedPhysiotherapy = physiotherapyService.addPhysiotherapy(physiotherapy);

        // Need to tell front-end the new Physiotherapy's id
        // so front-end can update the UI
        responseJson.put("id", addedPhysiotherapy.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updatePhysiotherapyById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject physiotherapyJSON = payload.getJSONObject("data");

        if (physiotherapyJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Physiotherapy data");
        }

        if(physiotherapyService.getPhysiotherapyById(physiotherapyJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Physiotherapy with that ID does not exist");
        }

        String physiotherapyString = physiotherapyJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Physiotherapy physiotherapy = JSON.parseObject(physiotherapyString, Physiotherapy.class);

        Physiotherapy updatedPhysiotherapy = physiotherapyService.updatePhysiotherapyById(physiotherapy);

        // get Physiotherapy's id to update UI
        responseJson.put("id", updatedPhysiotherapy.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deletePhysiotherapyById(@PathVariable Long id)
            throws ObjectDoesNotExistException {
        if(physiotherapyService.getPhysiotherapyById(id) == null) {
            throw new ObjectDoesNotExistException("Physiotherapy with that ID does not exist");
        }

        physiotherapyService.deletePhysiotherapyById(id);
        return ResponseEntity.ok().body(null);
    }
}
