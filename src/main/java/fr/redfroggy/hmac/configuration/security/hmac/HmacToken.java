package fr.redfroggy.hmac.configuration.security.hmac;

/**
 * HMAC Token
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class HmacToken {

    private String token;

    private String secret;

    private String jwt;


    public HmacToken(String token, String secret, String jwt) {
        this.token = token;
        this.secret = secret;
        this.jwt = jwt;
    }

    public String getToken() {
        return token;
    }

    public String getSecret() {
        return secret;
    }

    public String getJwt() {
        return jwt;
    }
}
