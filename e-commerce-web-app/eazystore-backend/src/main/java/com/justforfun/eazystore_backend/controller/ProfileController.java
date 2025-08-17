package com.justforfun.eazystore_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justforfun.eazystore_backend.dto.ProfileRequestDto;
import com.justforfun.eazystore_backend.dto.ProfileResponseDto;
import com.justforfun.eazystore_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/")
    public ResponseEntity<ProfileResponseDto> getProfile() {
        ProfileResponseDto responseDto = profileService.getProfile();
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/")
    public ResponseEntity<ProfileResponseDto> updateProfile(@Validated @RequestBody ProfileRequestDto profileRequestDto) {
        ProfileResponseDto responseDto = profileService.updateProfile(profileRequestDto);
        return ResponseEntity.ok(responseDto);
    }
    
}