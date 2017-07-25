package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.domain.Authority;
import fr.redfroggy.hmac.domain.Profile;
import fr.redfroggy.hmac.repository.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

/**
 * HmacUserDetailService test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class HmacUserDetailServiceTest {

    @InjectMocks
    private HmacUserDetailsService hmacUserDetailsService;

    @Mock
    private UserRepository userRepository;

    @Test
    public void loadByUserName(){
        String username = "admin";

        fr.redfroggy.hmac.domain.User user = new fr.redfroggy.hmac.domain.User();
        user.setLogin(username);
        user.setPassword("password");

        Profile profile = new Profile();
        profile.setName("ADMIN");

        Authority authority = new Authority();
        authority.setId(1L);
        authority.setName("ROLE_ADMIN");
        profile.setAuthorities(Collections.singletonList(authority));

        user.setProfile(profile);
        Mockito.when(userRepository.findByLogin(username)).thenReturn(user);

        UserDetails userDetails = hmacUserDetailsService.loadUserByUsername(username);
        Assert.assertNotNull(userDetails);
        Assert.assertTrue(userDetails.getClass().isAssignableFrom(User.class));
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadByWrongUserName(){
        hmacUserDetailsService.loadUserByUsername("unknown");
    }
}
