package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Disability;
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
    private DisabledService disabledService;

    @Autowired
    private DisabilityService disabilityService;

    @Autowired
    private RiskHistoryService riskHistoryService;

    @Admin
    @GetMapping(value = "/countByZone")
    public ResponseEntity<JSONObject> getAllCountsByZone() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        JSONObject headers = new JSONObject();
        headers.put("header0", "Zone");
        headers.put("header1", "Clients");
        headers.put("header2", "Visits");
        headers.put("header3", "Referrals");
        headers.put("header4", "Outstanding Referrals");
        headers.put("length", 5);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", clientService.getAllClientsByZoneIdCount(Math.toIntExact(zone.getId())));
            element.put("column1", visitService.getAllVisitsByZoneIdCount(Math.toIntExact(zone.getId())));
            element.put("column2", referralService.getAllReferralsByZoneIdCount(Math.toIntExact(zone.getId())));
            element.put("column3", referralService.getAllOutstandingReferralsByZoneIdCount(Math.toIntExact(zone.getId())));
            items.add(element);
        }

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
    @GetMapping(value = "/countByWorker")
    public ResponseEntity<JSONObject> getAllReferralsByWorkerCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Worker> workers = workerService.getAllWorkers();

        JSONObject headers = new JSONObject();
        headers.put("header0", "Worker");
        headers.put("header1", "Clients");
        headers.put("header2", "Visits");
        headers.put("header3", "Referrals");
        headers.put("header4", "Outstanding Referrals");
        headers.put("length", 5);
        items.add(headers);

        for(Worker worker : workers) {
            JSONObject element = new JSONObject();
            element.put("name", worker.getFirstName() + " " + worker.getLastName());
            element.put("column0", clientService.getAllClientsByWorkerIdCount(worker.getId()));
            element.put("column1", visitService.getAllVisitsByWorkerIdCount(worker.getId()));
            element.put("column2", referralService.getAllReferralsByWorkerIdCount(worker.getId()));
            element.put("column3", referralService.getAllOutstandingReferralsByWorkerIdCount(worker.getId()));
            items.add(element);
        }

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
    @GetMapping(value = "/countHealthRisk")
    public ResponseEntity<JSONObject> getAllHealthRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        JSONObject headers = new JSONObject();
        headers.put("header0", "Zone");
        headers.put("header1", "Critical");
        headers.put("header2", "High");
        headers.put("header3", "Medium");
        headers.put("header4", "Low");
        headers.put("length", 5);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryByHealthRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        total.put("column0", riskHistoryService.getRiskHistoryByHealthRisk(4));
        total.put("column1", riskHistoryService.getRiskHistoryByHealthRisk(3));
        total.put("column2", riskHistoryService.getRiskHistoryByHealthRisk(2));
        total.put("column3", riskHistoryService.getRiskHistoryByHealthRisk(1));
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countSocialRisk")
    public ResponseEntity<JSONObject> getAllSocialRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        JSONObject headers = new JSONObject();
        headers.put("header0", "Zone");
        headers.put("header1", "Critical");
        headers.put("header2", "High");
        headers.put("header3", "Medium");
        headers.put("header4", "Low");
        headers.put("length", 5);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryBySocialRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        total.put("column0", riskHistoryService.getRiskHistoryBySocialRisk(4));
        total.put("column1", riskHistoryService.getRiskHistoryBySocialRisk(3));
        total.put("column2", riskHistoryService.getRiskHistoryBySocialRisk(2));
        total.put("column3", riskHistoryService.getRiskHistoryBySocialRisk(1));
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countEducationRisk")
    public ResponseEntity<JSONObject> getAllEducationRisksByZoneCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        JSONObject headers = new JSONObject();
        headers.put("header0", "Zone");
        headers.put("header1", "Critical");
        headers.put("header2", "High");
        headers.put("header3", "Medium");
        headers.put("header4", "Low");
        headers.put("length", 5);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("column0", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(4, Math.toIntExact(zone.getId())));
            element.put("column1", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(3, Math.toIntExact(zone.getId())));
            element.put("column2", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(2, Math.toIntExact(zone.getId())));
            element.put("column3", riskHistoryService.getRiskHistoryByEducationRiskAndClientZone(1, Math.toIntExact(zone.getId())));
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        total.put("column0", riskHistoryService.getRiskHistoryByEducationRisk(4));
        total.put("column1", riskHistoryService.getRiskHistoryByEducationRisk(3));
        total.put("column2", riskHistoryService.getRiskHistoryByEducationRisk(2));
        total.put("column3", riskHistoryService.getRiskHistoryByEducationRisk(1));
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countDisabilities")
    public ResponseEntity<JSONObject> getAllDisabilitiesCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();
        List<Disability> disabilities = disabilityService.getAllDisabilities();

        JSONObject headers = new JSONObject();
        Integer count = 1;
        headers.put("header0", "Zone");
        for(Disability disability : disabilities) {
            headers.put("header" + count, disability.getType());
            count++;
        }
        headers.put("length", count);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            count = 0;
            for(Disability disability : disabilities) {
                Integer disabilityCount = disabledService.getAllDisabilitiesByZoneIdCount(disability.getId(), Math.toIntExact(zone.getId()));
                element.put("column" + count, disabilityCount);
                count++;
            }
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        count = 0;
        for(Disability disability : disabilities) {
            total.put("column" + count, disabledService.getAllDisabilitiesCount(disability.getId()));
            count++;
        }
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countHealthServices")
    public ResponseEntity<JSONObject> getAllHealthServicesCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();
        List<ServiceOption> serviceOptions = serviceOptionService.getAllServiceOptionsByType(ServiceOption.Type.HEALTH);

        JSONObject headers = new JSONObject();
        Integer count = 1;
        headers.put("header0", "Zone");
        for(ServiceOption serviceOption : serviceOptions) {
            headers.put("header" + count, serviceOption.getName());
            count++;
        }
        headers.put("length", count);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            count = 0;
            for(ServiceOption serviceOption : serviceOptions) {
                element.put("column" + count, serviceDescriptionService.getAllServiceOptionsByZoneIdAndServiceOptionTypeCount(
                        serviceOption.getId(), Math.toIntExact(zone.getId()), ServiceOption.Type.HEALTH));
                count++;
            }
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        count = 0;
        for(ServiceOption serviceOption : serviceOptions) {
            total.put("column" + count, serviceDescriptionService.getAllServiceOptionsByServiceOptionTypeCount(
                    serviceOption.getId(), ServiceOption.Type.HEALTH));
            count++;
        }
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countSocialServices")
    public ResponseEntity<JSONObject> getAllSocialServicesCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();
        List<ServiceOption> serviceOptions = serviceOptionService.getAllServiceOptionsByType(ServiceOption.Type.SOCIAL);

        JSONObject headers = new JSONObject();
        Integer count = 1;
        headers.put("header0", "Zone");
        for(ServiceOption serviceOption : serviceOptions) {
            headers.put("header" + count, serviceOption.getName());
            count++;
        }
        headers.put("length", count);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            count = 0;
            for(ServiceOption serviceOption : serviceOptions) {
                element.put("column" + count, serviceDescriptionService.getAllServiceOptionsByZoneIdAndServiceOptionTypeCount(
                        serviceOption.getId(), Math.toIntExact(zone.getId()), ServiceOption.Type.SOCIAL));
                count++;
            }
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        count = 0;
        for(ServiceOption serviceOption : serviceOptions) {
            total.put("column" + count, serviceDescriptionService.getAllServiceOptionsByServiceOptionTypeCount(
                    serviceOption.getId(), ServiceOption.Type.SOCIAL));
            count++;
        }
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/countEducationServices")
    public ResponseEntity<JSONObject> getAllEducationServicesCount() {
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();
        List<ServiceOption> serviceOptions = serviceOptionService.getAllServiceOptionsByType(ServiceOption.Type.EDUCATION);

        JSONObject headers = new JSONObject();
        Integer count = 1;
        headers.put("header0", "Zone");
        for(ServiceOption serviceOption : serviceOptions) {
            headers.put("header" + count, serviceOption.getName());
            count++;
        }
        headers.put("length", count);
        items.add(headers);

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            count = 0;
            for(ServiceOption serviceOption : serviceOptions) {
                element.put("column" + count, serviceDescriptionService.getAllServiceOptionsByZoneIdAndServiceOptionTypeCount(
                        serviceOption.getId(), Math.toIntExact(zone.getId()), ServiceOption.Type.EDUCATION));
                count++;
            }
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "Total");
        count = 0;
        for(ServiceOption serviceOption : serviceOptions) {
            total.put("column" + count, serviceDescriptionService.getAllServiceOptionsByServiceOptionTypeCount(
                    serviceOption.getId(), ServiceOption.Type.EDUCATION));
            count++;
        }
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }
}
