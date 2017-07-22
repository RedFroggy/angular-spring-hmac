package fr.redfroggy.hmac.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Jpa user authority
 * Created by michael on 25/06/17.
 */
@Entity
@Table(name = "authority", schema = "public")
public class Authority {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
