package com.justforfun.eazystore_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class EazystoreBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EazystoreBackendApplication.class, args);
    }

}
