package com.justforfun.eazystore_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.constants.ApplicationConstants;
import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.dto.ContactResponseDto;
import com.justforfun.eazystore_backend.exception.ResourceNotFoundException;
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
        contact.setStatus(ApplicationConstants.OPEN_MESSAGE);
        return contact;
    }

    @Override
    public List<ContactResponseDto> getAllOpenMessages() {
        List<Contact> contacts = contactRepository.findByStatus(ApplicationConstants.OPEN_MESSAGE);
        return contacts.stream()
                .map(this::mapToContactResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateMessageStatus(Long contactId, String status) {
        Contact contact = contactRepository.findById(contactId).orElseThrow(
                () -> new ResourceNotFoundException("Contact", "ContactID", contactId.toString()));
        contact.setStatus(status);
        contactRepository.save(contact);
    }

    private ContactResponseDto mapToContactResponseDto(Contact contact) {
        return new ContactResponseDto(
                contact.getContactId(),
                contact.getName(),
                contact.getEmail(),
                contact.getMessage(),
                contact.getStatus());
    }

}
