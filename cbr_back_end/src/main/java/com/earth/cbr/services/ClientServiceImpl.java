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

    private enum columns {
        firstName, lastName, cbrWorkerId, zone, villageNumber
    }

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Page<Client> getClientsByPage(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return clientRepository.findAll(pageable);
    }

    @Override
    public Page<Client> getClientsByPageSorted(Integer pageNumber, Integer pageSize, String sortBy, Boolean ascending) {
        Pageable pageable;

        if(ascending == true) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }

        return clientRepository.findAll(pageable);
    }

    @Override
    public Page<Client> getClientsByPageFiltered(Integer pageNumber, Integer pageSize, String filterBy, String filter) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Client> filteredClients = null;

        switch (columns.valueOf(filterBy)) {
            case firstName:
                filteredClients = clientRepository.findByFirstNameContaining(pageable, filter);
                break;
            case lastName:
                filteredClients = clientRepository.findByLastNameContaining(pageable, filter);
                break;
            case cbrWorkerId:
                filteredClients = clientRepository.findAllByCbrWorkerId(pageable, Long.parseLong(filter));
                break;
            case zone:
                filteredClients = clientRepository.findAllByZone(pageable, Integer.parseInt(filter));
                break;
            case villageNumber:
                filteredClients = clientRepository.findByVillageNumber(pageable, Integer.parseInt(filter));
                break;
            default:
                filteredClients = null;
        }

        return filteredClients;
    }

    @Override
    public Page<Client> getClientsByPageFilteredAndSorted(Integer pageNumber, Integer pageSize, String filterBy,
                                                          String filter, String sortBy, Boolean ascending) {
        Pageable pageable;
        Page<Client> filteredClients = null;

        if(ascending == true) {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        }

        switch (columns.valueOf(filterBy)) {
            case firstName:
                filteredClients = clientRepository.findByFirstNameContaining(pageable, filter);
                break;
            case lastName:
                filteredClients = clientRepository.findByLastNameContaining(pageable, filter);
                break;
            case cbrWorkerId:
                filteredClients = clientRepository.findAllByCbrWorkerId(pageable, Long.parseLong(filter));
                break;
            case zone:
                filteredClients = clientRepository.findAllByZone(pageable, Integer.parseInt(filter));
                break;
            case villageNumber:
                filteredClients = clientRepository.findByVillageNumber(pageable, Integer.parseInt(filter));
                break;
            default:
                filteredClients = null;
        }

        return filteredClients;
    }

    @Override
    public Client getClientById(Long id) {
        Optional<Client> clientOptional = clientRepository.findById(id);
        Client client = clientOptional.orElse(null);
        return client;
    }

    @Override
    public Client addClient(@Valid Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClientById(@Valid Client client) { return clientRepository.save(client); }

    @Override
    public void deleteClientById(Long id) {
        clientRepository.deleteById(id);
    }
}
