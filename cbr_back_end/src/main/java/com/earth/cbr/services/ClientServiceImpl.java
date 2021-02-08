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
        String firstName = (String) payload.get("firstName");
        String lastName = (String) payload.get("lastName");
        Integer birthDate = Integer.parseInt((String) payload.get("birthDate"));
        Character gender = ((String) payload.get("gender")).charAt(0);
        String image = (String) payload.get("image");
        String zone = (String) payload.get("zone");
        Integer villageNumber = Integer.parseInt((String) payload.get("villageNumber"));
        Integer signupDate = Integer.parseInt((String) payload.get("signupDate"));
        String contactNumber = (String) payload.get("contactNumber");
        Long cbrWorkerId = Long.parseLong((String) payload.get("cbrWorkerId"));
        String caregiverContact = (String) payload.get("caregiverContact");
        String requiredServices = (String) payload.get("requiredServices");
        String goals = (String) payload.get("goals");

        Client client = new Client(firstName, lastName,birthDate, gender, image, zone, villageNumber, signupDate,
                contactNumber, cbrWorkerId, caregiverContact, requiredServices, goals);
        
        return clientRepository.save(client);
    }

    @Override
    public void deleteClientById(Long id) {
        clientRepository.deleteById(id);
    }
}
