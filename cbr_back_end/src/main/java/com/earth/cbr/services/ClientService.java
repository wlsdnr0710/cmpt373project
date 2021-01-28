package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Client;

import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client addClient(JSONObject payload);
    void deleteClientById(Long id);
}
