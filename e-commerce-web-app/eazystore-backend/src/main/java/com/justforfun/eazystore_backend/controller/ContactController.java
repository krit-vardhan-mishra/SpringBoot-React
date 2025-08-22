package com.justforfun.eazystore_backend.controller;

import com.justforfun.eazystore_backend.dto.ContactDto;
import com.justforfun.eazystore_backend.dto.ContactInfoDto;
import com.justforfun.eazystore_backend.service.ContactService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final ContactInfoDto contactInfoDto;

    @PostMapping("/")
    public ResponseEntity<String> saveContact(@Valid @RequestBody ContactDto contactDto) {
        contactService.saveContact(contactDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Request processed successfully...!");
    }

    @GetMapping("/")
    public ResponseEntity<ContactInfoDto> getContact() {
        return ResponseEntity.ok(contactInfoDto);
    }
    

}