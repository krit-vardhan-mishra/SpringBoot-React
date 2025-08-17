package com.justforfun.eazystore_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 5, max = 30, message = "The length of the name should be between 5 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email address must be a valid value")
    private String email;

    @NotBlank(message = "Mobile Number cannot be empty")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Street is required")
    @Size(min = 5, max = 50, message = "The length of the street should be between 5 and 50 characters")
    private String street;

    @NotBlank(message = "City is required")
    @Size(min = 3, max = 30, message = "The length of the city should be between 3 and 30 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(min = 2, max = 30, message = "The length of the state should be between 2 and 30 characters")
    private String state;

    @NotBlank(message = "Postal Code is required")
    @Pattern(regexp = "^\\d{5}$", message = "Postal code must be exactly 5 digits")
    private String postalCode;

    @NotBlank(message = "Country is required")
    @Size(min = 2, max = 2, message = "The length of the country should be exactly 2 characters")
    private String country;

}