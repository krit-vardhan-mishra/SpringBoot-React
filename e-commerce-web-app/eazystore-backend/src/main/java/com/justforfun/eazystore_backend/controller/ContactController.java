package com.justforfun.eazystore_backend.controller;

import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/")
    public String saveContact(@RequestBody ContactDto contactDto) {
        boolean isSaved = contactService.saveContact(contactDto);
        return (isSaved ? "Request processed successfully...!" : "An error occurred. Please try again or contact Dev team." );
    }

}