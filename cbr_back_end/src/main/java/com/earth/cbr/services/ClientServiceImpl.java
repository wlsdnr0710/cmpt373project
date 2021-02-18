package com.earth.cbr.services;

import com.earth.cbr.models.Client;
import com.earth.cbr.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
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
    public Page<Client> getClientsByPage(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return clientRepository.findAll(pageable);
    }

    @Override
    public Page<Client> getClientsByPageSorted(int pageNumber, int pageSize, String sortBy, boolean order) {
        Pageable pageable;
        if(order = true) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }
        return clientRepository.findAll(pageable);
    }

    @Override
    public Page<Client> getClientsByPageSearch(int pageNumber, int pageSize, String SearchBy, String search) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Client> searchedClient = null;

        switch (SearchBy) {
            case "firstName":
                searchedClient = clientRepository.findByfirstNameContaining(pageable, search);
                break;
            case "lastName":
                searchedClient = clientRepository.findBylastNameContaining(pageable, search);
                break;
            case "cbrWorkerId":
                searchedClient = clientRepository.findBycbrWorkerIdContaining(pageable, search);
                break;
            case "zone":
                searchedClient = clientRepository.findByzoneContaining(pageable, search);
                break;
            case "villageNumber":
                searchedClient = clientRepository.findByvillageNumberContaining(pageable, search);
                break;
            default:
                searchedClient = null;
        }

        return searchedClient;
    }

    @Override
    public Client getClientById(Long id) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        Client client = clientOptional.get();
        return client;
    }

    @Override
    public Client addClient(@Valid Client client) {
        return clientRepository.save(client);
    }

    @Override
    public void deleteClientById(Long id) {
        clientRepository.deleteById(id);
    }
}
