package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.security.SecurityUser;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Hmac user details service
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@Component
public class HmacUserDetailsService implements UserDetailsService{

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDTO userDTO = MockUsers.findByUsername(username);
        if (userDTO == null) {
            throw new UsernameNotFoundException("User "+username+" not found");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        if(!userDTO.getAuthorities().isEmpty()){
            for(String authority : userDTO.getAuthorities()){
                authorities.add(new SimpleGrantedAuthority(authority));
            }
        }

        return new SecurityUser(userDTO.getId(),userDTO.getLogin(),userDTO.getPassword(),userDTO.getProfile(),authorities);
    }
}
