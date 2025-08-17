package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.ProfileRequestDto;
import com.justforfun.eazystore_backend.dto.ProfileResponseDto;

public interface ProfileService {
    ProfileResponseDto getProfile();
    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}