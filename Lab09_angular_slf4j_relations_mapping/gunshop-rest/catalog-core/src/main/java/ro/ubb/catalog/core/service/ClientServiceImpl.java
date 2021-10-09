package ro.ubb.catalog.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.ubb.catalog.core.model.Client;
import ro.ubb.catalog.core.model.GunProvider;
import ro.ubb.catalog.core.model.GunType;
import ro.ubb.catalog.core.model.validators.ClientValidator;
import ro.ubb.catalog.core.repository.ClientRepository;
import ro.ubb.catalog.core.repository.GunProviderRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//import ro.ubb.catalog.core.repository.GunTypeRepository;

@Service
public class ClientServiceImpl implements ClientService {

    public static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    @Autowired
    private ClientValidator validator;

    @Autowired
    private ClientRepository clientRepository;

//    @Autowired
//    private GunTypeRepository gunTypeRepository;

    @Autowired
    private GunProviderRepository gunProviderRepository;

    @Override
    public List<Client> getAllClients() {
        logger.trace("getAllClients - method entered");
        return clientRepository.findAll();
    }

    @Override
    public Client addClient(String name, LocalDate dateOfBirth) {
        Client client = new Client();
        client.setName(name);
        client.setDateOfBirth(dateOfBirth);
        logger.trace("addClient - method entered; client = {}", client);
        validator.validate(client);
        Client clientAdded = clientRepository.save(client);
        logger.trace("addClient - method finished; client = {}", clientAdded);
        return clientAdded;
    }

    @Override
    public void deleteClient(Long id) {
        logger.trace("deleteClient - method entered; client = {}", clientRepository.findById(id));
        clientRepository.deleteById(id);
        logger.trace("deleteClient - method finished");
    }

    @Override
    @Transactional
    public Client updateClient(Long id, String name, LocalDate dateOfBirth, Set<Long> gunTypes) {
        Client client = new Client();
        client.setId(id);
        client.setName(name);
        client.setDateOfBirth(dateOfBirth);
//        client.
//        TODO client.addGunTypes(gunTypes);
        logger.trace("updateClient - method entered; client = {}", client);
        validator.validate(client);
        Client updateClient = clientRepository.findById(client.getId()).orElseThrow();
        updateClient.setName(client.getName());
        updateClient.setDateOfBirth(client.getDateOfBirth());
        logger.trace("updateClient - method finished; client = {}", updateClient);
        return client;
    }

    @Override
    public Client getClientById(Long id) {
        logger.trace("getClientById - method entered={}", id);
        Client clientById = clientRepository.findById(id).orElseThrow();
        logger.trace("getClientById - method finished; result={}", clientById);
        return clientById;
    }

    @Override
    public List<Client> getAllClientsBornBefore(LocalDate date) {
        logger.trace("getAllClientsBornBefore - method entered; date={}", date);
        List<Client> clientsBornBefore = clientRepository.findClientsByDateOfBirthBefore(date);
        logger.trace("getAllClientsBornBefore - method finished; result={}", clientsBornBefore);
        return clientsBornBefore;
    }

    @Override
    public Set<GunType> getGunTypesOfClient(Long id) {
        logger.trace("getGunTypesOfClient - method entered={}", id);
        Client clientById = clientRepository.findById(id).orElse(null);
        if (clientById != null){
            return clientById.getGunTypes();
        }else{
            return new HashSet<>();
        }
    }

    @Override
    public GunType rentGunType(Long clientId, String gunTypeName, Long price) {
        // get all gunTypes from the gunProviderRepository
        List<GunProvider> gunProviders = gunProviderRepository.findAll();
        List<GunType> gunTypes = new ArrayList<>();
        gunProviders.forEach(gunProvider -> gunTypes.addAll(gunProvider.getGunTypes()));

        GunType gunType = gunTypes
                .stream()
                .filter(eachGunType -> eachGunType.getName().equals(gunTypeName))
                .findAny()
                .orElseThrow();

        Client client = clientRepository.findById(clientId).orElseThrow();
        if (price > 0){
            // add the rental with a price assigned
            client.addPrice(gunType, price);
        }else{
            // add the rental without a price assigned
            client.addGunType(gunType);
        }

        return gunType;
    }
}
