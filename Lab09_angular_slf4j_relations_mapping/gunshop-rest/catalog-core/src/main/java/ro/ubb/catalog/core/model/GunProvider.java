package ro.ubb.catalog.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GunProvider extends BaseEntity<Long> {

    private String name; // attendance
    private String speciality;
    private int reputation;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gunProvider", fetch = FetchType.EAGER)
    private List<GunType> gunTypes;

    public List<GunType> getGunTypes() {
        return gunTypes;
    }

    @Override
    public String toString() {
        return "GunProvider{" +
                "name='" + name + '\'' +
                ", speciality='" + speciality + '\'' +
                ", reputation=" + reputation +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GunProvider other = (GunProvider) o;

        return name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

}
