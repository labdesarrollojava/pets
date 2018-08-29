package es.lab.pets.repository;

import es.lab.pets.domain.Owner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Owner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
