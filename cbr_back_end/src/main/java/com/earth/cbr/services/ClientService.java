package com.earth.cbr.services;

import com.earth.cbr.models.Client;
import org.springframework.data.domain.Page;

import javax.validation.Valid;
import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(Long id);
    Page<Client> getClientsByPage(Integer pageNumber, Integer pageSize);
    Page<Client> getClientsByPageSorted(Integer pageNumber, Integer pageSize, String sortBy, Boolean ascending);
    Page<Client> getClientsByPageFiltered(Integer pageNumber, Integer pageSize, String filterBy, String searchBy);
    Page<Client> getClientsByPageFilteredAndSorted(Integer pageNumber,
                                                   Integer pageSize,
                                                   String filterBy,
                                                   String searchBy,
                                                   String sortBy,
                                                   Boolean ascending);
    List<Client> getTop5ClientsWithHighestRisk();
    Long getAllClientsCount();
    Integer getAllClientsByWorkerIdCount(Long workerId);
    Integer getAllClientsByZoneIdCount(Integer zoneId);
    Client updateClientById(@Valid Client client);
    Client addClient(@Valid Client client);
    void deleteClientById(Long id);
}
