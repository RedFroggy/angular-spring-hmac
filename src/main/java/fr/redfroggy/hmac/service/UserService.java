package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.domain.User;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.exceptions.UserNotFoundException;
import fr.redfroggy.hmac.mapper.ProfileMapper;
import fr.redfroggy.hmac.mapper.UserMapper;
import fr.redfroggy.hmac.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * User service class
 * Created by michael on 20/06/17.
 */
@Service
@Transactional
@SuppressWarnings("unchecked")
public class UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private ProfileMapper profileMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper, ProfileMapper profileMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.profileMapper = profileMapper;
    }

    public List<UserDTO> getUsers() {
        List<User> users =  userRepository.findAll();
        return userMapper.usersToUsersDTO(users);
    }

    public UserDTO findById(Long id) {
        User user = userRepository.findOne(id);
        if(user == null) {
            throw new UserNotFoundException("User '"+id+"' not found");
        }
        return userMapper.userToUserDTO(user);
    }

    public UserDTO updateUser(UserDTO userDTO) {
        User currentUser = userRepository.findByLogin(userDTO.getLogin());
        if(currentUser == null) {
            throw new UserNotFoundException("User '"+userDTO.getLogin()+"' not found");
        }
        currentUser.setProfile(profileMapper.ProfileDTOToProfile(userDTO.getProfile()));

        currentUser = userRepository.saveAndFlush(currentUser);

        return userMapper.userToUserDTO(currentUser);
    }
}
