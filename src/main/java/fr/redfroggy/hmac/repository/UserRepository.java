package fr.redfroggy.hmac.repository;

import fr.redfroggy.hmac.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * User entity repository
 * Created by michael on 20/06/17.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByLogin(String login);
}
