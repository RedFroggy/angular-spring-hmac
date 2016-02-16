package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.security.SecurityUser;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.Profile;
import fr.redfroggy.hmac.dto.UserDTO;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Authentication service test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RunWith(PowerMockRunner.class)
@PowerMockIgnore("javax.crypto.*")
@PrepareForTest({SecurityContextHolder.class})
public class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private HttpServletResponse httpResponse;

    @Test
    public void authenticate() throws Exception{

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin("admin");
        loginDTO.setPassword("frog");

        SecurityUser securityUser = getSecurityUser(loginDTO.getLogin(),loginDTO.getPassword());

        PowerMockito.when(userDetailsService.loadUserByUsername(loginDTO.getLogin())).thenReturn(securityUser);
        UserDTO userDTO = authenticationService.authenticate(loginDTO, httpResponse);
        Assert.assertNotNull(userDTO);
        Assert.assertEquals(userDTO.getLogin(),loginDTO.getLogin());
        Assert.assertNotNull(userDTO.getAuthorities());
        Assert.assertTrue(!userDTO.getAuthorities().isEmpty());

        Mockito.verify(authenticationManager,Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
    }

    private SecurityUser getSecurityUser(String login, String password){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new SecurityUser(1,login,password, Profile.ADMIN,authorities);
    }
}
