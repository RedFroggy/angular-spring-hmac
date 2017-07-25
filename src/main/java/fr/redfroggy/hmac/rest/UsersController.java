package fr.redfroggy.hmac.rest;

import fr.redfroggy.hmac.domain.Profile;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.repository.ProfileRepository;
import fr.redfroggy.hmac.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Users resource
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
public class UsersController {
    
    private UserService userService;
    private ProfileRepository profileRepository;

    public UsersController(UserService userService, ProfileRepository profileRepository) {
        this.userService = userService;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/users")
    public List<UserDTO> query(){
        return userService.getUsers();
    }

    @GetMapping("/users/{id}")
    public UserDTO findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @PutMapping(value = "/users/{id}")
    public UserDTO update(@RequestBody @Valid UserDTO userDTO){
        return userService.updateUser(userDTO);
    }

    @GetMapping("/users/profiles")
    public List<Profile> getProfiles(){
        return profileRepository.findAll();
    }
}
