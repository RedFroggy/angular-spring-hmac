package fr.redfroggy.hmac.mock;

import fr.redfroggy.hmac.dto.Profile;
import fr.redfroggy.hmac.dto.UserDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Mock users
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class MockUsers {

    public static List<UserDTO> users = new ArrayList<>();

    public static void mock(){
        UserDTO admin = new UserDTO();
        admin.setId(1);
        admin.setLogin("admin");
        admin.setProfile(Profile.ADMIN);
        admin.setPassword("frog");
        admin.setAuthorities(Arrays.asList("ROLE_ADMIN","ROLE_MANAGER","ROLE_USER"));
        users.add(admin);

        UserDTO user = new UserDTO();
        user.setId(2);
        user.setLogin("user");
        user.setProfile(Profile.USER);
        user.setPassword("frog");
        user.setAuthorities(Arrays.asList("ROLE_USER"));
        users.add(user);

        UserDTO manager = new UserDTO();
        manager.setId(3);
        manager.setLogin("manager");
        manager.setProfile(Profile.MANAGER);
        manager.setPassword("frog");
        manager.setAuthorities(Arrays.asList("ROLE_MANAGER","ROLE_USER"));
        users.add(manager);

    }

    /**
     * Find a user by username
     * @param username username
     * @return a UserDTO if found, null otherwise
     */
    public static UserDTO findByUsername(String username){
        for(UserDTO userDTO : users){
            if(userDTO.getLogin().equals(username)){
                return userDTO;
            }
        }
        return null;
    }

    /**
     * Find a user by id
     * @param id user id
     * @return a UserDTO if found, null otherwise
     */
    public static UserDTO findById(Integer id){
        for(UserDTO userDTO : users){
            if(userDTO.getId().equals(id)){
                return userDTO;
            }
        }
        return null;
    }
}
