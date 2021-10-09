package ro.ubb.catalog.core.model;

import lombok.*;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GunType extends BaseEntity<Long> {

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "category", nullable = false)
    private Category category;

    @ManyToOne
    private GunProvider gunProvider;


    @OneToMany(mappedBy = "gunType", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Rental> rentals = new HashSet<>();


    public Set<Client> getClients() {
        return Collections.unmodifiableSet(
                rentals.stream()
                        .map(Rental::getClient)
                        .collect(Collectors.toSet())
        );
    }

    public void addClient(Client client) {
        Rental rental = new Rental();
        rental.setClient(client);
        rental.setGunType(this);
        rentals.add(rental);
    }

    public void addPrice(Client client, Long price) {
        Rental rental = new Rental();
        rental.setClient(client);
        rental.setGunType(this);
        rental.setPrice(price);
        rentals.add(rental);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GunType other = (GunType) o;
        return name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "GunType{" +
                "name='" + name + '\'' +
                ", category=" + category +
                ", gunProvider=" + gunProvider +
                '}';
    }
}
