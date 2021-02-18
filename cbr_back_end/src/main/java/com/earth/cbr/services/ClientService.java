package com.earth.cbr.services;

import com.earth.cbr.models.Client;
import org.springframework.data.domain.Page;

import javax.validation.Valid;
import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Page<Client> getClientsByPage(int pageNumber, int pageSize);
    Page<Client> getClientsByPageSorted(int pageNumber, int pageSize, String sortBy, boolean ascending);
    Page<Client> getClientsByPageFiltered(int pageNumber, int pageSize, String filterBy, String filter);
    Client addClient(@Valid Client client);
    void deleteClientById(Long id);
}
