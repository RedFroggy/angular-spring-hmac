package fr.redfroggy.hmac.service;

import fr.redfroggy.hmac.configuration.security.hmac.HmacRequester;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * Hmac Requester service
 * Created by Michael DESIGAUD on 16/02/2016.
 */
@Service
public class DefaultHmacRequester implements HmacRequester{

    @Override
    public Boolean canVerify(HttpServletRequest request) {
        return request.getRequestURI().contains("/api") && !request.getRequestURI().contains("/api/authenticate");
    }

    @Override
    public String getPublicSecret(String iss) {
        UserDTO userDTO = MockUsers.findById(Integer.valueOf(iss));
        if(userDTO != null){
            return userDTO.getPublicSecret();
        }
        return null;
    }

    @Override
    public Boolean isSecretInBase64() {
        return true;
    }
}
