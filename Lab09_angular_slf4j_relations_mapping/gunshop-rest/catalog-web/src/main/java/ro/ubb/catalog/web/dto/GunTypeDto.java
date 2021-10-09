package ro.ubb.catalog.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.ubb.catalog.core.model.Category;
import ro.ubb.catalog.core.model.GunProvider;

import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GunTypeDto extends BaseDto{

    private String name;
    private Category category;
    private GunProviderDto gunProvider;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GunTypeDto that = (GunTypeDto) o;

        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "GunTypeDto{" +
                "name='" + name + '\'' +
                ", category=" + category +
                ", gunProviderDto=" + gunProvider +
                '}';
    }

}
