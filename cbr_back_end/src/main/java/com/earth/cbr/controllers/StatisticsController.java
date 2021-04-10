package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Disability;
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
    private DisabledService disabledService;

    @Autowired
    private DisabilityService disabilityService;

    @Autowired
    private RiskHistoryService riskHistoryService;

    @Admin
    @GetMapping(value = "/countAll")
    public ResponseEntity<JSONObject> getAllCounts() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();

        JSONObject header = new JSONObject();
        header.put("header0", "Clients");
        header.put("header1", "Visits");
        header.put("header2", "Referrals");
        header.put("header3", "Outstanding Referrals");
        header.put("length", 4);
        items.add(header);

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        total.put("column0", clientService.getAllClientsCount());
        total.put("column1", visitService.getAllVisitsCount());
        total.put("column2", referralService.getAllReferralsCount());
        total.put("column3", referralService.getAllOutstandingReferralsCount());
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

        JSONObject header = new JSONObject();
        header.put("header0", "Clients");
        header.put("header1", "Visits");
        header.put("header2", "Referrals");
        header.put("header3", "Outstanding Referrals");
        header.put("length", 4);
        items.add(header);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", clientService.getAllClientsByZoneCount(Math.toIntExact(zone.getId())));
            element.put("column1", visitService.getAllVisitsByZoneCount(Math.toIntExact(zone.getId())));
            element.put("column2", referralService.getAllReferralsByZoneIdCount(Math.toIntExact(zone.getId())));
            element.put("column3", referralService.getAllOutstandingReferralsByZoneIdCount(Math.toIntExact(zone.getId())));
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

        JSONObject header = new JSONObject();
        header.put("header0", "Referrals");
        header.put("header1", "Outstanding Referrals");
        header.put("length", 2);
        items.add(header);

        for(Worker worker : workers) {
            JSONObject element = new JSONObject();
            element.put("name", worker.getFirstName() + " " + worker.getLastName());
            element.put("column0", referralService.getAllReferralsByWorkerIdCount(worker.getId()));
            element.put("column1", referralService.getAllOutstandingReferralsByWorkerIdCount(worker.getId()));
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

        JSONObject header = new JSONObject();
        header.put("header0", "Critical");
        header.put("header1", "High");
        header.put("header2", "Medium");
        header.put("header3", "Low");
        header.put("length", 4);
        items.add(header);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(1, Math.toIntExact(zone.getId())));
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

        JSONObject header = new JSONObject();
        header.put("header0", "Critical");
        header.put("header1", "High");
        header.put("header2", "Medium");
        header.put("header3", "Low");
        header.put("length", 4);
        items.add(header);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(1, Math.toIntExact(zone.getId())));
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

        JSONObject header = new JSONObject();
        header.put("header0", "Critical");
        header.put("header1", "High");
        header.put("header2", "Medium");
        header.put("header3", "Low");
        header.put("length", 4);
        items.add(header);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countDisabilities")
    public ResponseEntity<JSONObject> getAllDisabilitiesByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();
        List<Disability> disabilities = disabilityService.getAllDisabilities();

        JSONObject header = new JSONObject();

        Integer count = 0;
        for(Disability disability : disabilities) {
            header.put("header" + count, disability.getType());
            count++;
        }
        header.put("length", count);
        items.add(header);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            count = 0;
            for(Disability disability : disabilities) {
                Long id = disability.getId();
                element.put("column" + count, disabledService.getAllDisabledsByZoneIdCount(id, Math.toIntExact(zone.getId())));
                count++;
            }
            items.add(element);
        }

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }
}
