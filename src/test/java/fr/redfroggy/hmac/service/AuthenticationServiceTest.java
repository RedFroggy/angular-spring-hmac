package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.SecurityProperties;
import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mapper.UserMapper;
import fr.redfroggy.hmac.repository.UserRepository;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
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

    @Mock
    private HttpServletRequest httpRequest;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private SecurityProperties securityProperties;

    private User getSecurityUser(String login, String password){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new User(login,password, authorities);
    }

    @Before
    public void setUp() {
       SecurityProperties.Jwt jwt = PowerMockito.mock(SecurityProperties.Jwt.class);
       SecurityProperties.Hmac hmac = PowerMockito.mock(SecurityProperties.Hmac.class);
       PowerMockito.when(securityProperties.getJwt()).thenReturn(jwt);
       PowerMockito.when(securityProperties.getHmac()).thenReturn(hmac);
       PowerMockito.when(jwt.getSecret()).thenReturn("f09cce0a0753496b9baaae70b343a15f");
       PowerMockito.when(hmac.getSecret()).thenReturn("e2aab888483944eb908a26572f26c5d5");

       PowerMockito.when(httpRequest.getContextPath()).thenReturn("/");
    }

    @Test
    public void authenticate() throws HmacException{

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin("admin");
        loginDTO.setPassword("frog");

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDTO.getLogin(),loginDTO.getPassword());

        fr.redfroggy.hmac.domain.User newUser = new fr.redfroggy.hmac.domain.User();
        PowerMockito.when(userRepository.findByLogin(loginDTO.getLogin())).thenReturn(newUser);
        PowerMockito.when(userMapper.userToUserDTO(newUser)).thenReturn(new UserDTO());
        PowerMockito.when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class))).thenReturn(token);

        UserDTO userDTO = authenticationService.authenticate(loginDTO, httpRequest, httpResponse);
        Assert.assertNotNull(userDTO);

        Mockito.verify(userRepository,Mockito.times(1)).findByLogin(loginDTO.getLogin());
        Mockito.verify(userMapper,Mockito.times(1)).userToUserDTO(Mockito.any(fr.redfroggy.hmac.domain.User.class));
        Mockito.verify(authenticationManager,Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
        Mockito.verify(httpResponse,Mockito.times(2)).setHeader(Mockito.anyString(),Mockito.anyString());
        Mockito.verify(httpResponse,Mockito.times(1)).addCookie(Mockito.any(Cookie.class));
    }
}
