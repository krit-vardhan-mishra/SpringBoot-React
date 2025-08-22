package com.justforfun.eazystore_backend.repository;

import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.justforfun.eazystore_backend.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Cacheable("roles")
    Optional<Role> findByName(String name);
}
