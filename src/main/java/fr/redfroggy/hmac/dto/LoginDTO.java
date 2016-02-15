package fr.redfroggy.hmac.dto;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Login DTP
 * Created by Michael DESIGAUD on 14/02/2016.
 */
public class LoginDTO {

    @NotEmpty
    private String login;

    @NotEmpty
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
