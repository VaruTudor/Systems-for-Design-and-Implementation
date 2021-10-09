package ro.ubb.catalog.web.dto;

import lombok.*;

import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GunProviderDto extends BaseDto{
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GunProviderDto that = (GunProviderDto) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "GunProviderDto{" +
                "name='" + name + '\'' +
                ", speciality='" + speciality + '\'' +
                ", reputation=" + reputation +
                '}';
    }

    private String name;
    private String speciality;
    private int reputation;
}
