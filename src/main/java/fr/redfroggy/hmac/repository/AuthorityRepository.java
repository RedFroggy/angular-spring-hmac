package fr.redfroggy.hmac.repository;

import fr.redfroggy.hmac.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Authority entity repository
 * Created by michael on 25/06/17.
 */
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
