package com.justforfun.eazystore_backend.dto;

public record LoginResponseDto(String message, UserDto user, String jwtToken) { }