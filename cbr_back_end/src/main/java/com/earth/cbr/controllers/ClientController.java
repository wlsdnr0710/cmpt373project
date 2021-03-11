package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.ObjectDoesNotExist;
import com.earth.cbr.exceptions.MissingRequiredDataObjectException;
import com.earth.cbr.models.Client;
import com.earth.cbr.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<JSONObject> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping
    public ResponseEntity<JSONObject> getAllClientsSort5() {
        List<Client> clients = clientService.getTop5ByOrderByRiskSumDesc();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}")
    public ResponseEntity<JSONObject> getClientsByPage(@PathVariable int pageNumber, @PathVariable int pageSize) {
        Page<Client> clients = clientService.getClientsByPage(pageNumber, pageSize);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/sortBy/{sortBy}/ascending/{sortOrder}")
    public ResponseEntity<JSONObject> getClientsByPageSorted(@PathVariable int pageNumber, @PathVariable int pageSize,
                                                             @PathVariable String sortBy, @PathVariable boolean sortOrder) {
        Page<Client> clients = clientService.getClientsByPageSorted(pageNumber, pageSize, sortBy, sortOrder);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/filterBy/{filterBy}/filter/{filter}")
    public ResponseEntity<JSONObject> getClientsByPageFiltered(@PathVariable int pageNumber, @PathVariable int pageSize,
                                                               @PathVariable String filterBy, @PathVariable String filter) {
        Page<Client> clients = clientService.getClientsByPageFiltered(pageNumber, pageSize, filterBy, filter);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/pageNumber/{pageNumber}/pageSize/{pageSize}/filterBy/{filterBy}/filter/{filter}/sortBy/{sortBy}/ascending/{sortOrder}")
    public ResponseEntity<JSONObject> getClientsByPageFilteredAndSorted(@PathVariable int pageNumber, @PathVariable int pageSize,
                                                                        @PathVariable String filterBy, @PathVariable String filter,
                                                                        @PathVariable String sortBy, @PathVariable boolean sortOrder) {
        Page<Client> clients = clientService.getClientsByPageFilteredAndSorted(pageNumber, pageSize, filterBy, filter, sortBy, sortOrder);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", clients);
        return ResponseEntity.ok().body(responseJson);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getClientById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(clientService.getClientById(id) == null) {
            throw new ObjectDoesNotExist("Client with that ID does not exist");
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

        Client addedClient = clientService.addClient(client);

        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", addedClient.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @PutMapping
    public ResponseEntity<JSONObject> updateClientById(@RequestBody JSONObject payload)
            throws MissingRequiredDataObjectException, ObjectDoesNotExist {
        JSONObject clientJSON = payload.getJSONObject("data");

        if (clientJSON == null) {
            throw new MissingRequiredDataObjectException("Missing data object containing Client data");
        }

        if(clientService.getClientById(clientJSON.getLong("id")) == null) {
            throw new ObjectDoesNotExist("Client with that ID does not exist");
        }

        String clientString = clientJSON.toJSONString();

        JSONObject responseJson = new JSONObject();
        Client client = JSON.parseObject(clientString, Client.class);

        Client updatedClient = clientService.updateClientById(client);

        // get client's id to update UI
        responseJson.put("id", updatedClient.getId());
        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteClientById(@PathVariable Long id) throws ObjectDoesNotExist {
        if(clientService.getClientById(id) == null) {
            throw new ObjectDoesNotExist("Client with that ID does not exist");
        }

        clientService.deleteClientById(id);
        return ResponseEntity.ok().body(null);
    }
}
