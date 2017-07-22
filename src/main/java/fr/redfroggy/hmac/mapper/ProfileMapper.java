package fr.redfroggy.hmac.mapper;

import fr.redfroggy.hmac.domain.Profile;
import fr.redfroggy.hmac.dto.ProfileDTO;
import org.mapstruct.Mapper;

/**
 * Profile mapper
 * Created by michael on 22/07/17.
 */
@Mapper(componentModel = "spring", uses = AuthorityMapper.class)
public interface ProfileMapper {

    ProfileDTO profileToProfileDTO(Profile profile);

    Profile ProfileDTOToProfile(ProfileDTO profile);
}
