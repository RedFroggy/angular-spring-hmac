package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.SecurityProperties;
import fr.redfroggy.hmac.configuration.security.SecurityUtils;
import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.configuration.security.hmac.HmacToken;
import fr.redfroggy.hmac.configuration.security.hmac.HmacUtils;
import fr.redfroggy.hmac.domain.User;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mapper.UserMapper;
import fr.redfroggy.hmac.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Authentication service
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@Service
@SuppressWarnings("unchecked")
public class AuthenticationService {

    public static final String ACCESS_TOKEN_COOKIE = "access_token";
    public static final String JWT_CLAIM_LOGIN = "login";

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    /**
     * Authenticate a user in Spring Security
     * The following headers are set in the response:
     * - X-TokenAccess: JWT
     * - X-Secret: Generated secret in base64 using SHA-256 algorithm
     * - WWW-Authenticate: Used algorithm to encode secret
     * The authenticated user in set ine the Spring Security context
     * The generated secret is stored in a static list for every user
     * @param loginDTO credentials
     * @param request http request
     * @param response http response
     * @return access token
     * @throws HmacException hmac exception
     */
    public UserDTO authenticate(LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) throws HmacException {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getLogin(),loginDTO.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Get Hmac signed token
        Map<String,String> customClaims = new HashMap<>();
        customClaims.put(SecurityUtils.ENCODING_CLAIM_PROPERTY, HmacUtils.HMAC_SHA_256);
        customClaims.put(JWT_CLAIM_LOGIN, loginDTO.getLogin());

        //Get jwt secret from properties
        String jwtSecret = securityProperties.getJwt().getSecret();

        //Get hmac secret from config
        String hmacSharedSecret = securityProperties.getHmac().getSecret();

        // Jwt is generated using the secret defined in configuration file
        HmacToken hmacToken = SecurityUtils.getSignedToken(jwtSecret,loginDTO.getLogin(), SecurityService.JWT_TTL,customClaims);

        // Add jwt as a cookie
        Cookie jwtCookie = new Cookie(ACCESS_TOKEN_COOKIE,hmacToken.getJwt());
        jwtCookie.setPath(request.getContextPath().length() > 0 ? request.getContextPath() : "/");
        jwtCookie.setMaxAge(securityProperties.getJwt().getMaxAge());
        //Cookie cannot be accessed via JavaScript
        jwtCookie.setHttpOnly(true);

        // Add shared secret and encoding method in headers
        response.setHeader(HmacUtils.X_SECRET, hmacSharedSecret);
        response.setHeader(HttpHeaders.WWW_AUTHENTICATE, HmacUtils.HMAC_SHA_256);

        //Set JWT as a cookie
        response.addCookie(jwtCookie);

        User user = userRepository.findByLogin(loginDTO.getLogin());
        return userMapper.userToUserDTO(user);
    }
}
