package com.justforfun.eazystore_backend.service;

import java.util.List;

import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.dto.ContactResponseDto;

public interface ContactService {
    abstract boolean saveContact(ContactDto contactDto);
    abstract List<ContactResponseDto> getAllOpenMessages();
    abstract void updateMessageStatus(Long contactId, String status);
}
