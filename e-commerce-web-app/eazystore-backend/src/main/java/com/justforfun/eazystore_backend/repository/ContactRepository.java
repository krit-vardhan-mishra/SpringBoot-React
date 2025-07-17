package com.justforfun.eazystore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.justforfun.eazystore_backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> { }
