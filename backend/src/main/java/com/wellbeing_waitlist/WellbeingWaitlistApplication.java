package com.wellbeing_waitlist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@EnableJpaRepositories
@SpringBootApplication(scanBasePackages = "com.wellbeing_waitlist")
public class WellbeingWaitlistApplication {

    public static void main(String[] args) {
        SpringApplication.run(WellbeingWaitlistApplication.class, args);
    }

    @Bean
    CommandLineRunner preloadPythonModel() {
        return args -> {
            System.out.println("Preloading Python model...");
            try {
                File scriptFile = new File("src/main/resources/scripts/EmergencyLevel.py");
                System.out.println("Script path: " + scriptFile.getCanonicalPath());
                System.out.println("Script exists: " + scriptFile.exists());

                ProcessBuilder pb = new ProcessBuilder("python", scriptFile.getCanonicalPath(), "test");
                pb.redirectErrorStream(true);
                Process process = pb.start();

                // Read output and error streams
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println("Python output: " + line);
                    }
                }

                int exitCode = process.waitFor();

                if (exitCode == 0) {
                    System.out.println("Python model loaded successfully.");
                } else {
                    System.err.println("Python model preload failed with exit code: " + exitCode);
                }
            } catch (IOException | InterruptedException e) {
                System.err.println("Failed to preload Python model: " + e.getMessage());
                e.printStackTrace();
                Thread.currentThread().interrupt();
            }
        };
    }
}