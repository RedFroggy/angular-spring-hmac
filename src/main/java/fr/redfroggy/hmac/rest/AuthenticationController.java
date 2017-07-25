package fr.redfroggy.hmac.rest;

import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.service.AuthenticationService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Authentication rest controller
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate")
    public UserDTO authenticate(@RequestBody LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) throws Exception{
        return authenticationService.authenticate(loginDTO, request, response);
    }

    @GetMapping("/authenticate")
    public String authenticate(HttpServletRequest request) {
        return request.getRemoteUser();
    }
}
