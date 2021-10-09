package ro.ubb.catalog.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.ubb.catalog.core.model.Category;
import ro.ubb.catalog.core.model.GunProvider;
import ro.ubb.catalog.core.model.GunType;
import ro.ubb.catalog.core.model.validators.GunTypeValidator;
import ro.ubb.catalog.core.repository.GunProviderRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class GunTypeServiceImpl implements GunTypeService {

    public static final Logger logger = LoggerFactory.getLogger(GunTypeService.class);

    @Autowired
    private GunTypeValidator validator;

//    @Autowired
//    private GunTypeRepository gunTypeRepository;

    @Autowired
    private GunProviderRepository gunProviderRepository;

    @Override
    public List<GunType> getAllGunTypes() {
        logger.trace("getAllGunTypes - method entered");
        List<GunProvider> gunProviders = gunProviderRepository.findAll();

        List<GunType> gunTypes = new ArrayList<>();
        gunProviders.forEach(gunProvider -> gunTypes.addAll(gunProvider.getGunTypes()));
        return gunTypes;
    }

    @Override
    public GunType saveGunType(GunType gunType){
        logger.trace("addGunType - method entered; gunType = {}", gunType);
        validator.validate(gunType);

        GunProvider gunProvider = gunProviderRepository.findByName(gunType.getGunProvider().getName()).get(0);
        List<GunType> allGunTypesByProvider = gunProvider.getGunTypes();
        allGunTypesByProvider.add(gunType);
        gunProvider.setGunTypes(allGunTypesByProvider);
        gunProviderRepository.save(gunProvider);

        return gunType;
    }

    @Override
    public void deleteGunType(Long id) {
        var emptyGunTypeList = new ArrayList<GunType>();
        var gunProviders = gunProviderRepository.findAll();

        for(GunProvider gunProvider: gunProviders){
            var gunTypesOfGunProvider = gunProvider.getGunTypes();
            var isRemoved = gunTypesOfGunProvider.removeIf(
                    gunType -> gunType.getId().equals(id)
            );

            if(isRemoved){
                emptyGunTypeList.addAll(gunTypesOfGunProvider);
                gunProvider.setGunTypes(emptyGunTypeList);
                gunProviderRepository.deleteById(gunProvider.getId());
                gunProviderRepository.save(gunProvider);
            }
        }
    }

    @Override
    @Transactional
    public GunType updateGunType(GunType gunType) {
        logger.trace("updateGunType - method entered; gunType = {}", gunType);
        validator.validate(gunType);
//        GunType gunTypeUpdate = gunTypeRepository.findById(gunType.getId()).orElseThrow();
//        gunTypeUpdate.setName(gunType.getName());
//        gunTypeUpdate.setCategory(gunType.getCategory());
//        gunTypeUpdate.setGunProvider(gunType.getGunProvider());
//        logger.trace("updateGunType - method finished; gunTypeUpdate = {}", gunTypeUpdate);
        return gunType;
    }

    @Override
    public GunType getGunTypeById(Long id) {
        logger.trace("getGunTypeById - method entered; id = {}", id);
//        GunType result = gunTypeRepository.findById(id).orElseThrow();
//        logger.trace("getGunTypeById - method finished; result = {}", result);
//        return result;
        return new GunType();
    }

    @Override
    public List<GunType> filterGunTypesByCategory(Category category) {
        logger.trace("filterGunTypesByCategory - method entered; category = {}", category);
//        List<GunType> result = gunTypeRepository.findByCategory(category);
//        logger.trace("filterGunTypesByCategory - method finished; result = {}", result);
//        return result;
        return new ArrayList<>();
    }
}