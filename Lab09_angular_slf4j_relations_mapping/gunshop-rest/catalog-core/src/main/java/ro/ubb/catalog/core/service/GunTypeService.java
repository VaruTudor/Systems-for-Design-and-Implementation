package ro.ubb.catalog.core.service;

import ro.ubb.catalog.core.model.Category;
import ro.ubb.catalog.core.model.GunType;

import java.util.List;

public interface GunTypeService {
    List<GunType> getAllGunTypes();
    List<GunType> filterGunTypesByCategory(Category category);

    GunType saveGunType(GunType gunType);
    void deleteGunType(Long id);
    GunType updateGunType(GunType gunType);

    GunType getGunTypeById(Long id);
}
