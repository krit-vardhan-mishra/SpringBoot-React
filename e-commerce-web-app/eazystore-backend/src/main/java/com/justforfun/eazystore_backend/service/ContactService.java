package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.ContactDto;

public interface ContactService {
    abstract boolean saveContact(ContactDto contactDto);
}
