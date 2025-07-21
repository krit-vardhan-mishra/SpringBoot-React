package com.just_for_fun.wellbeing_waitlist_backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.just_for_fun.wellbeing_waitlist_backend.service.PatientServiceImpl;
import com.just_for_fun.wellbeing_waitlist_backend.entity.Patient;
import com.just_for_fun.wellbeing_waitlist_backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    @Autowired
    private PatientServiceImpl patientService;

    @Autowired
    private PatientRepository patientRepository;

    private static final String ADMIN_PASSWORD = "root";

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        try {
            patientService.addPatient(patient);
            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to register patient. Patient already exists. " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getPatients(@RequestParam(required = false) Boolean cured) {
        List<Patient> patients;

        if (cured != null) {
            patients = patientService.findByCured(cured);
            if (patients.isEmpty()) {
                return new ResponseEntity<>(
                        Map.of("message", "No patients found with cured = " + cured),
                        HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } else {
            patients = patientService.findAll();
            if (patients.isEmpty()) {
                return new ResponseEntity<>(
                        Map.of("message", "No patients found"),
                        HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(patients, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> validatePasswordAndShowDetails(@RequestBody Map<String, String> credentials) {
        String password = credentials.get("password");
        if (ADMIN_PASSWORD != null && ADMIN_PASSWORD.equals(password)) {
            List<Patient> patients = patientRepository.findAll();
            return new ResponseEntity<>(patients, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                    Map.of("error", "Incorrect Password. Access Denied."),
                    HttpStatus.UNAUTHORIZED);
        }
    }

}