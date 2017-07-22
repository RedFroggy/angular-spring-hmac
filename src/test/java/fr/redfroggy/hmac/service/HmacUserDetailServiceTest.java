package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.dto.UserDTO;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * HmacUserDetailService test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class HmacUserDetailServiceTest {

    @InjectMocks
    private HmacUserDetailsService hmacUserDetailsService;

    @Test
    public void loadByUserName(){
        String username = "admin";
        UserDetails userDetails = hmacUserDetailsService.loadUserByUsername(username);
        Assert.assertNotNull(userDetails);
        Assert.assertTrue(userDetails.getClass().isAssignableFrom(User.class));

        /*User securityUser = (User) userDetails;
        UserDTO userDTO = MockUsers.findByUsername(username);
        Assert.assertNotNull(userDTO);
        Assert.assertEquals(userDTO.getLogin(),securityUser.getUsername());
        Assert.assertNotNull(userDTO.getPassword());
        Assert.assertNotNull(securityUser.getAuthorities());
        Assert.assertTrue(!securityUser.getAuthorities().isEmpty());*/
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadByWrongUserName(){
        hmacUserDetailsService.loadUserByUsername("unknown");
    }
}
