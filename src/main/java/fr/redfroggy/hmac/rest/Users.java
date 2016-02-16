package fr.redfroggy.hmac.rest;

import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Users resource
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
public class Users {

    @RequestMapping("/users")
    public List<UserDTO> query(){
        return MockUsers.getUsers();
    }
}
