package com.earth.cbr.controllers;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Client;
import com.earth.cbr.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(value = "/{id}")
    public ResponseEntity<JSONObject> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", client);
        return ResponseEntity.ok().body(responseJson);
    }

    @PostMapping
    public ResponseEntity<JSONObject> addClient(@RequestBody Client client) {
        Client addedClient = clientService.addClient(client);

        JSONObject responseJson = new JSONObject();
        // Need to tell front-end the new client's id
        // so front-end can update the UI
        responseJson.put("id", addedClient.getId());

        return ResponseEntity.ok().body(responseJson);
    }

    @DeleteMapping
    public ResponseEntity<JSONObject> deleteClient(@RequestBody JSONObject payload) {
        Integer clientIdInt = (Integer) payload.get("id");
        Long clientId = Long.valueOf(clientIdInt);
        clientService.deleteClientById(clientId);
        return ResponseEntity.ok().body(null);
    }
}
