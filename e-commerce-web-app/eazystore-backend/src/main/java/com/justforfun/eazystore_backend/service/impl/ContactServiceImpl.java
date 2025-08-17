package com.justforfun.eazystore_backend.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.model.Contact;
import com.justforfun.eazystore_backend.repository.ContactRepository;
import com.justforfun.eazystore_backend.service.ContactService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public boolean saveContact(ContactDto contactDto) {
        Contact contact = transformToEntity(contactDto);
        contactRepository.save(contact);
        return true;
    }

    private Contact transformToEntity(ContactDto contactDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactDto, contact);
        return contact;
    }

}
