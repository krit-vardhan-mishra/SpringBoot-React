package com.justforfun.eazystore_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.justforfun.eazystore_backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByStatus(String status);
 }
