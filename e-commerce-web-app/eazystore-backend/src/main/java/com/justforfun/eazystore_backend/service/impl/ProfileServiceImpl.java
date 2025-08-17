package com.justforfun.eazystore_backend.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.dto.AddressDto;
import com.justforfun.eazystore_backend.dto.ProfileRequestDto;
import com.justforfun.eazystore_backend.dto.ProfileResponseDto;
import com.justforfun.eazystore_backend.model.Address;
import com.justforfun.eazystore_backend.model.Customer;
import com.justforfun.eazystore_backend.repository.CustomerRepository;
import com.justforfun.eazystore_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final CustomerRepository customerRepository;
    
    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthenticatedCustomer();
        return mapCustomerToProfileResponseDto(customer);
    }

    public Customer getAuthenticatedCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return customerRepository.findByEmail(email).orElseThrow(
            () -> new UsernameNotFoundException("User not found")
        );
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto profileResponseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, profileResponseDto);
        if (customer.getAddress() != null) {
            AddressDto addressDto = new AddressDto(); 
            BeanUtils.copyProperties(customer.getAddress(), addressDto);
            profileResponseDto.setAddress(addressDto);
        }
        return profileResponseDto;
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto) {
        Customer customer = getAuthenticatedCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(profileRequestDto.getEmail().trim());
        BeanUtils.copyProperties(profileRequestDto, customer);
        Address address = customer.getAddress();
        if (address == null) {
            address = new Address();
            customer.setAddress(address);
        }
        address.setStreet(profileRequestDto.getStreet());
        address.setCity(profileRequestDto.getCity());
        address.setState(profileRequestDto.getState());
        address.setPostalCode(profileRequestDto.getPostalCode());
        address.setCountry(profileRequestDto.getCountry());
        customer.setAddress(address);
        customer = customerRepository.save(customer);
        ProfileResponseDto profileResponseDto = mapCustomerToProfileResponseDto(customer);
        profileResponseDto.setEmailUpdated(isEmailUpdated);
        return profileResponseDto;
    }
}