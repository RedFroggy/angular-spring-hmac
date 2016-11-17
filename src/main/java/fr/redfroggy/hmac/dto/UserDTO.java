package fr.redfroggy.hmac.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.List;

/**
 * User DTO
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Integer id;

    @NotEmpty
    private String login;

    @JsonIgnore
    private String password;

    @NotEmpty
    private List<String> authorities;

    @JsonIgnore
    private String publicSecret;

    @JsonIgnore
    private String privateSecret;

    private Profile profile;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }

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

    public String getPublicSecret() {
        return publicSecret.replace("\n","").replace("\r","");
    }

    public void setPublicSecret(String publicSecret) {
        this.publicSecret = publicSecret;
    }

    public void setPrivateSecret(String privateSecret) {
        this.privateSecret = privateSecret;
    }

    public String getPrivateSecret() {
        return privateSecret;
    }
}