package com.justforfun.eazystore_backend.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.justforfun.eazystore_backend.constants.ApplicationConstants;
import com.justforfun.eazystore_backend.model.Customer;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment environment;

    public String generateToken(Authentication authentication) {
        String jwt = "";
        String secret = environment.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Customer fetchedCustomer = (Customer) authentication.getPrincipal();
        jwt = Jwts.builder()
                .issuer("Eazy Store").subject("JWT Token")
                .claim("username", fetchedCustomer.getName())
                .claim("email", fetchedCustomer.getEmail())
                .claim("mobileNumber", fetchedCustomer.getMobileNumber())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + 60 * 60 * 1000))
                .signWith(secretKey).compact();
        return jwt;
    }

}