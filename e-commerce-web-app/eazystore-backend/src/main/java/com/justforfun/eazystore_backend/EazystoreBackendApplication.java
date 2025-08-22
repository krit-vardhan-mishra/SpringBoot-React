package com.justforfun.eazystore_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import com.justforfun.eazystore_backend.dto.ContactInfoDto;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
@EnableConfigurationProperties(ContactInfoDto.class)
public class EazystoreBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EazystoreBackendApplication.class, args);
    }

}
