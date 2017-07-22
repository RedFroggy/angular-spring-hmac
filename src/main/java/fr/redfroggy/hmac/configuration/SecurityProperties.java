package fr.redfroggy.hmac.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Security properties
 * Created by michael on 21/06/17.
 */
@ConfigurationProperties(prefix = "security")
public class SecurityProperties {

    private Jwt jwt;
    private Hmac hmac;

    public Jwt getJwt() {
        return jwt;
    }

    public void setJwt(Jwt jwt) {
        this.jwt = jwt;
    }

    public Hmac getHmac() {
        return hmac;
    }

    public void setHmac(Hmac hmac) {
        this.hmac = hmac;
    }

    public static class Jwt {

        private String secret;

        private Integer maxAge;

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }

        public Integer getMaxAge() {
            return maxAge;
        }

        public void setMaxAge(Integer maxAge) {
            this.maxAge = maxAge;
        }
    }

    public static class Hmac {

        private String secret;

        public String getSecret() {
            return secret;
        }

        public void setSecret(String secret) {
            this.secret = secret;
        }
    }
}
