package fr.redfroggy.hmac.configuration.security.hmac;

import javax.servlet.http.HttpServletRequest;

/**
 * Hmac verification interface
 * Created by Michael DESIGAUD on 16/02/2016.
 */
public interface HmacRequester {

    /**
     * Check if its possible to verify the request
     * @param request htp reqsuest
     * @return true if possible, false otherwise
     */
    Boolean canVerify(HttpServletRequest request);

    /**
     * Get the stored public secret (locally,remotely,cache,etc..)
     * @param iss issuer
     * @return secret key
     */
    String getPublicSecret(String iss);

    /**
     * Is the secret encoded in base 64
     * @return true if encoded in base 64 , false otherwise
     */
    Boolean isSecretInBase64();
}
