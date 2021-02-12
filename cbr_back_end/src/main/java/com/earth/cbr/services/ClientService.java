package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.exceptions.InvalidDataException;
import com.earth.cbr.exceptions.MissingRequiredKeyException;
import com.earth.cbr.models.Client;

import javax.validation.Valid;
import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client addClient(@Valid Client client) throws Exception;
    void deleteClientById(Long id);
}
