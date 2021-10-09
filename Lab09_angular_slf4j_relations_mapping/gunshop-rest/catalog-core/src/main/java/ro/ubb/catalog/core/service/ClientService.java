package ro.ubb.catalog.core.service;

import ro.ubb.catalog.core.model.Client;
import ro.ubb.catalog.core.model.GunType;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ClientService {
    List<Client> getAllClients();
    List<Client> getAllClientsBornBefore(LocalDate date);
    Set<GunType> getGunTypesOfClient(Long id);

    GunType rentGunType(Long clientId, String gunTypeName, Long price);
    Client addClient(String name, LocalDate dateOfBirth);
    void deleteClient(Long id);
    Client updateClient(Long id, String name, LocalDate dateOfBirth, Set<Long> gunTypes);

    Client getClientById(Long id);



}
