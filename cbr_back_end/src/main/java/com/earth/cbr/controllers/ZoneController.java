package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Zone;
import com.earth.cbr.services.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/zone")
public class ZoneController {
    @Autowired
    private ZoneService zoneService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllZones() {
        List<Zone> zones = zoneService.getAllZones();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", zones);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getZoneById(@PathVariable Long id){
        Zone zone = zoneService.getZoneById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", zone);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addZone(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject zoneJSON = payload.getJSONObject("data");

        if (zoneJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Zone data");
        }
        String zoneString = zoneJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Zone zone = JSON.parseObject(zoneString, Zone.class);

        Zone addedZone = zoneService.addZone(zone);

        // Need to tell front-end the new zone's id
        // so front-end can update the UI
        responseJson.put("id", addedZone.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateZone(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject zoneJSON = payload.getJSONObject("data");

        if (zoneJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Zone data");
        }
        String zoneString = zoneJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Zone zone = JSON.parseObject(zoneString, Zone.class);

        Zone updatedZone = zoneService.updateZone(zone);

        // Need to tell front-end the new zone's id
        // so front-end can update the UI
        responseJson.put("id", updatedZone.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping
    public ResponseEntity<JSONObject> deleteZoneById(@RequestBody JSONObject payload) {
        Integer zoneIdInt = (Integer) payload.get("id");
        Long zoneId = Long.valueOf(zoneIdInt);
        zoneService.deleteZoneById(zoneId);
        return ResponseEntity.ok().body(null);
    }
}
