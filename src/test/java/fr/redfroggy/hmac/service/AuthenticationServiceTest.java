package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.UserDTO;
import org.junit.Assert;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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

    @Mock
    private HttpServletRequest httpRequest;

    private User getSecurityUser(String login, String password){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new User(login,password, authorities);
    }

    @Test
    public void authenticate() throws HmacException{

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin("admin");
        loginDTO.setPassword("frog");

        User securityUser = getSecurityUser(loginDTO.getLogin(),loginDTO.getPassword());

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getLogin(),loginDTO.getPassword());

        PowerMockito.when(userDetailsService.loadUserByUsername(loginDTO.getLogin())).thenReturn(securityUser);
        PowerMockito.when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class))).thenReturn(token);

        UserDTO userDTO = authenticationService.authenticate(loginDTO, httpRequest, httpResponse);
        Assert.assertNotNull(userDTO);
        Assert.assertNotNull(userDTO.getProfile());
        Assert.assertNotNull(userDTO.getLogin());
        Assert.assertNotNull(userDTO.getPassword());

        Mockito.verify(authenticationManager,Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
        Mockito.verify(userDetailsService,Mockito.times(1)).loadUserByUsername(loginDTO.getLogin());
        Mockito.verify(httpResponse,Mockito.times(3)).setHeader(Mockito.anyString(),Mockito.anyString());
    }

    @Test
    public void logout(){

        Integer userId = 1;

        PowerMockito.mockStatic(SecurityContextHolder.class);
        UsernamePasswordAuthenticationToken passwordAuthenticationToken = PowerMockito.mock(UsernamePasswordAuthenticationToken.class);
        SecurityContextImpl securityContext = PowerMockito.mock(SecurityContextImpl.class);

        Mockito.when(securityContext.getAuthentication()).thenReturn(passwordAuthenticationToken);
        Mockito.when(passwordAuthenticationToken.isAuthenticated()).thenReturn(true);
        Mockito.when(SecurityContextHolder.getContext()).thenReturn(securityContext);
        Mockito.when(passwordAuthenticationToken.getPrincipal()).thenReturn(new User("login","password", Collections.singletonList(new SimpleGrantedAuthority("ADMIN"))));

    }

    @Test
    public void authenticateByToken(){

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin("admin");
        loginDTO.setPassword("frog");

        User securityUser = getSecurityUser(loginDTO.getLogin(),loginDTO.getPassword());
        PowerMockito.when(userDetailsService.loadUserByUsername(loginDTO.getLogin())).thenReturn(securityUser);

        //authenticationService.tokenAuthentication(loginDTO.getLogin());
        Assert.assertNotNull(SecurityContextHolder.getContext());
        Assert.assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        Assert.assertNotNull(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        Assert.assertNotNull(SecurityContextHolder.getContext().getAuthentication().getPrincipal().getClass().isAssignableFrom(User.class));
        Assert.assertEquals(SecurityContextHolder.getContext().getAuthentication().getPrincipal(),securityUser);
    }
}
