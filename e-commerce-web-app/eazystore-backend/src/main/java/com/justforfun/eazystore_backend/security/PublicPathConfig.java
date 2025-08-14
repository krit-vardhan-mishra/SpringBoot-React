package com.justforfun.eazystore_backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PublicPathConfig {

    @Bean
    List<String> publicPaths() {
        return List.of(
                "/api/v1/products/**",
                "/api/v1/contacts/**",
                "/api/v1/auth/**"
        );
    }

}