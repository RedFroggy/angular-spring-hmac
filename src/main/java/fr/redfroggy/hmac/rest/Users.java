package fr.redfroggy.hmac.rest;

import fr.redfroggy.hmac.dto.Profile;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
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

    @RequestMapping("/users/{id}")
    public UserDTO query(@PathVariable Integer id){
        return MockUsers.findById(id);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public UserDTO update(@RequestBody @Valid UserDTO userDTO){
        return MockUsers.update(userDTO);
    }

    @RequestMapping("/users/profiles")
    public List<String> getProfiles(){
        List<String> profiles = new ArrayList<>();
        for(Profile profile: Profile.values()){
            profiles.add(profile.name());
        }
        return profiles;
    }
}
