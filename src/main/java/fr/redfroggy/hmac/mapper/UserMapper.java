package fr.redfroggy.hmac.mapper;

import fr.redfroggy.hmac.domain.User;
import fr.redfroggy.hmac.dto.UserDTO;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * User and UserDto mapper
 * Created by michael on 25/06/17.
 */
@Mapper(componentModel = "spring", uses = ProfileMapper.class)
public interface UserMapper {

    UserDTO userToUserDTO(User user);

    List<UserDTO> usersToUsersDTO(List<User> users);
}

