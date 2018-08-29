package es.lab.pets.repository;

import es.lab.pets.domain.Pet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

}
