package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.ServiceOption;
import com.earth.cbr.models.Worker;
import com.earth.cbr.models.Zone;
import com.earth.cbr.models.authentication.Admin;
import com.earth.cbr.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/statistics/")
public class StatisticsController {
    @Autowired
    private VisitService visitService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private WorkerService workerService;

    @Autowired
    private ReferralService referralService;

    @Autowired
    private ZoneService zoneService;

    @Autowired
    private ServiceDescriptionService serviceDescriptionService;

    @Autowired
    private ServiceOptionService serviceOptionService;

    @Autowired
    private DisabilityService disabilityService;

    @Autowired
    private RiskHistoryService riskHistoryService;

    @Admin
    @GetMapping(value = "/countAll")
    public ResponseEntity<JSONObject> getAllCounts() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        total.put("clientCount", clientService.getAllClientsCount());
        total.put("visitCount", visitService.getAllVisitsCount());
        total.put("referralCount", referralService.getAllReferralsCount());
        total.put("outstandingReferralCount", referralService.getAllOutstandingReferralsCount());
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countByZone")
    public ResponseEntity<JSONObject> getAllCountsByZone() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("clientCount", clientService.getAllClientsByZoneCount(Math.toIntExact(zone.getId())));
            element.put("visitCount", visitService.getAllVisitsByZoneCount(Math.toIntExact(zone.getId())));
            element.put("referralCount", referralService.getAllReferralsByZoneIdCount(Math.toIntExact(zone.getId())));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countByWorker")
    public ResponseEntity<JSONObject> getAllReferralsByWorkerCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Worker> workers = workerService.getAllWorkers();

        for(Worker worker : workers) {
            JSONObject element = new JSONObject();
            element.put("name", worker.getFirstName() + " " + worker.getLastName());
            element.put("referralCount", referralService.getAllReferralsByWorkerIdCount(worker.getId()));
            element.put("outstandingReferralCount", referralService.getAllOutstandingReferralsByWorkerIdCount(worker.getId()));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countHealthRisk")
    public ResponseEntity<JSONObject> getAllHealthRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("criticalCount", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("highCount", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("mediumCount", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("lowCount", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countSocialRisk")
    public ResponseEntity<JSONObject> getAllSocialRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("criticalCount", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("highCount", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("mediumCount", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("lowCount", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countEducationRisk")
    public ResponseEntity<JSONObject> getAllEducationRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("criticalCount", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("highCount", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("mediumCount", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("lowCount", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }
}
