package fr.redfroggy.hmac.mapper;

import fr.redfroggy.hmac.domain.Authority;
import fr.redfroggy.hmac.dto.AuthorityDTO;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Authority mapper
 * Created by michael on 22/07/17.
 */
@Mapper(componentModel = "spring")
public interface AuthorityMapper {

    AuthorityDTO authorityToAuthorityDTO(Authority authority);

    Authority authorityDTOToAuthority(AuthorityDTO authority);

    List<AuthorityDTO> authoritiesToAuthoritiesDTO(List<Authority> users);
}
