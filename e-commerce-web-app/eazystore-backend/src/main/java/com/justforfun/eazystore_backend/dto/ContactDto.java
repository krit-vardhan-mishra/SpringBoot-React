package com.justforfun.eazystore_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDto {
    private String name;
    private String email;
    private String mobileNumber;
    private String message;
}
