package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Hmac user details service
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@Service
public class HmacUserDetailsService implements UserDetailsService{

    private UserRepository userRepository;

    public HmacUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        fr.redfroggy.hmac.domain.User user = userRepository.findByLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("User "+username+" not found");
        }

        return new User(user.getLogin(),user.getPassword(), user.getGrantedAuthorities());
    }
}
