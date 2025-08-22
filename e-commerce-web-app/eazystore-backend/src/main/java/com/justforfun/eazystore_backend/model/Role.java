package com.justforfun.eazystore_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends BaseModal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<Customer> customers = new LinkedHashSet<>();

}