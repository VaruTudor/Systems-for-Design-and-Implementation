package ro.ubb.catalog.core.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Client extends BaseEntity<Long> {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "date_of_birth", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "d/M/yyyy")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate dateOfBirth;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Rental> rentals = new HashSet<>();

    public Set<GunType> getGunTypes(){
        rentals = rentals == null ? new HashSet<>(): rentals;
        return Collections.unmodifiableSet(
                this.rentals.stream().
                        map(Rental::getGunType).
                        collect(Collectors.toSet())
        );
    }

    public void addGunType(GunType gunType){
        Rental rental = new Rental();
        rental.setGunType(gunType);
        rental.setClient(this);
        rentals.add(rental);
    }

    public void addGunTypes(Set<GunType> gunTypes){
        gunTypes.forEach(this::addGunType);
    }

    public void addPrice(GunType gunType, Long price){
        Rental rental = new Rental();
        rental.setGunType(gunType);
        rental.setClient(this);
        rental.setPrice(price);
        rentals.add(rental);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Client other = (Client) o;

        return name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
