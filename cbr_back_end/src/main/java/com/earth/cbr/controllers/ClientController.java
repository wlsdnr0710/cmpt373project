package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ColumnNotFoundException;
import com.earth.cbr.exceptions.ObjectDoesNotExistException;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Client;
import com.earth.cbr.models.Zone;
import com.earth.cbr.models.authentication.Admin;
import com.earth.cbr.services.ClientService;
import com.earth.cbr.services.ZoneService;
import com.earth.cbr.utilities.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @Autowired
    private ZoneService zoneService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @Admin
    @GetMapping(value = "/count")
    public ResponseEntity<JSONObject> getAllVisitsCount() {
        Long visitCount = clientService.getAllClientsCount();
        JSONObject responseJson = new JSONObject();
        List<JSONObject> items = new ArrayList<>();
        List<Zone> zones = zoneService.getAllZones();

        for(Zone zone : zones) {
            JSONObject element = new JSONObject();
            element.put("name", zone.getName());
            element.put("count", clientService.getAllClientsByZoneCount(Math.toIntExact(zone.getId())));
            items.add(element);
        }

        JSONObject total = new JSONObject();
        total.put("name", "TOTAL");
        total.put("count", clientService.getAllClientsCount());
        items.add(total);

        responseJson.put("data", new JSONArray(Collections.singletonList(items)));
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/top5")
    public ResponseEntity<JSONObject> getTop5ClientsWithHighestRisk() {
        List<Client> clients = clientService.getTop5ClientsWithHighestRisk();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}")
    public ResponseEntity<JSONObject> getClientsByPage(@PathVariable int pageNumber, @PathVariable int pageSize) {
        Page<Client> clients = clientService.getClientsByPage(pageNumber - 1 , pageSize);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/sortBy/{sortBy}/ascending/{sortOrder}")
    public ResponseEntity<JSONObject> getClientsByPageSorted(@PathVariable int pageNumber,
                                                             @PathVariable int pageSize,
                                                             @PathVariable String sortBy,
                                                             @PathVariable boolean sortOrder) throws ColumnNotFoundException {
        Page<Client> clients = null;

        try {
            clients = clientService.getClientsByPageSorted(pageNumber - 1, pageSize, sortBy, sortOrder);
        } catch (PropertyReferenceException e){
            throw new ColumnNotFoundException("Cannot sort based on this column");
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/filterBy/{filterBy}/searchBy/{searchBy}")
    public ResponseEntity<JSONObject> getClientsByPageFiltered(@PathVariable int pageNumber,
                                                               @PathVariable int pageSize,
                                                               @PathVariable String filterBy,
                                                               @PathVariable String searchBy) throws ColumnNotFoundException {
        Page<Client> clients = null;

        try {
            clients = clientService.getClientsByPageFiltered(pageNumber - 1, pageSize, filterBy, searchBy);
        } catch (PropertyReferenceException e) {
            throw new ColumnNotFoundException("Cannot search based on this column");
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/filterBy/{filterBy}/searchBy/{searchBy}/sortBy/{sortBy}/ascending/{sortOrder}")
    public ResponseEntity<JSONObject> getClientsByPageFilteredAndSorted(@PathVariable int pageNumber,
                                                                        @PathVariable int pageSize,
                                                                        @PathVariable String filterBy,
                                                                        @PathVariable String searchBy,
                                                                        @PathVariable String sortBy,
                                                                        @PathVariable boolean sortOrder) throws ColumnNotFoundException {
        Page<Client> clients = null;

        try {
            clients = clientService.getClientsByPageFilteredAndSorted(pageNumber - 1,
                                                                        pageSize,
                                                                        filterBy,
                                                                        searchBy,
                                                                        sortBy,
                                                                        sortOrder);
        } catch (PropertyReferenceException e) {
            throw new ColumnNotFoundException("Cannot search/sort based on this column");
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getClientById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(clientService.getClientById(id) == null) {
            throw new ObjectDoesNotExistException("Client with that ID does not exist");
        }

        Client client = clientService.getClientById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", client);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addClient(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException {
        JSONObject clientJSON = payload.getJSONObject("data");

        if (clientJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Client data");
        }
        String clientString = clientJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Client client = JSON.parseObject(clientString, Client.class);

        client.setContactNumber(Utility.formatPhoneNumber(client.getContactNumber()));
        client.setCaregiverContact(Utility.formatPhoneNumber(client.getCaregiverContact()));

        Client addedClient = clientService.addClient(client);

        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", addedClient.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateClientById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExistException {
        JSONObject clientJSON = payload.getJSONObject("data");

        if (clientJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Client data");
        }

        if(clientService.getClientById(clientJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExistException("Client with that ID does not exist");
        }

        String clientString = clientJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Client client = JSON.parseObject(clientString, Client.class);

        client.setContactNumber(Utility.formatPhoneNumber(client.getContactNumber()));
        client.setCaregiverContact(Utility.formatPhoneNumber(client.getCaregiverContact()));

        Client updatedClient = clientService.updateClientById(client);

        // get client's id to update UI
        responseJson.put("id", updatedClient.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteClientById(@PathVariable Long id) throws ObjectDoesNotExistException {
        if(clientService.getClientById(id) == null) {
            throw new ObjectDoesNotExistException("Client with that ID does not exist");
        }

        clientService.deleteClientById(id);
        return ResponseEntity.ok().body(null);
    }
}
