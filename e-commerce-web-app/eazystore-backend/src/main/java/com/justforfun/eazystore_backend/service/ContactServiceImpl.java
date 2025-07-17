package com.justforfun.eazystore_backend.service;

import java.time.Instant;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.model.Contact;
import com.justforfun.eazystore_backend.repository.ContactRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactDto contactDto) {
        try {
            Contact contact = transformToEntity(contactDto);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactDto.getName());
            contactRepository.save(contact);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    private Contact transformToEntity(ContactDto contactDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactDto, contact);
        return contact;
    }

}
