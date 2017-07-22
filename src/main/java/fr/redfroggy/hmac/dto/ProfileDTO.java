package fr.redfroggy.hmac.dto;

import java.util.List;

/**
 * Profile DTO
 * Created by michael on 22/07/17.
 */
public class ProfileDTO {

    private Long id;

    private String name;

    private List<AuthorityDTO> authorities;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<AuthorityDTO> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<AuthorityDTO> authorities) {
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
