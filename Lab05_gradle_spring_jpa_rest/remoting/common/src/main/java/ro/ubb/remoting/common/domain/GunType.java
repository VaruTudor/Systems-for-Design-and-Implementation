package ro.ubb.remoting.common.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@ToString(callSuper = true)
@NoArgsConstructor
@Entity
public class GunType extends BaseEntity<Long>{

    private String name;
    private Category category;
    private long gunProviderID;

    public GunType(Long id, String name, Category category, long gunProviderID) {
        super();
        super.setId(id);
        this.name = name;
        this.category = category;
        this.gunProviderID = gunProviderID;
    }

    public GunType(String name, Category category, long gunProviderID) {
        this.name = name;
        this.category = category;
        this.gunProviderID = gunProviderID;
    }
}
