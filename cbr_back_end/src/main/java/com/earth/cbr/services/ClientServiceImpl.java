package com.earth.cbr.services;

import com.alibaba.fastjson.JSONObject;
import com.earth.cbr.models.Client;
import com.earth.cbr.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(Long id) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        Client client = clientOptional.get();
        return client;
    }

    @Override
    public Client addClient(JSONObject payload) {
        String clientFirstName = (String) payload.get("first_name");
        String clientLastName = (String) payload.get("last_name");
        Client client = new Client(clientFirstName, clientLastName);
        return clientRepository.save(client);
    }

    @Override
    public void deleteClientById(Long id) {
        clientRepository.deleteById(id);
    }
}
