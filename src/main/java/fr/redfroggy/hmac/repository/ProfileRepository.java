package fr.redfroggy.hmac.repository;

import fr.redfroggy.hmac.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * User profile repository
 * Created by michael on 22/07/17.
 */
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
