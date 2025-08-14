package com.justforfun.eazystore_backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String mobileNumber;
}
