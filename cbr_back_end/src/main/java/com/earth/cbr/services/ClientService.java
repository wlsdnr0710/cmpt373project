package com.earth.cbr.services;

import com.earth.cbr.models.Client;

import javax.validation.Valid;
import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Client addClient(@Valid Client client);
    void deleteClientById(Long id);
}
