package com.wellbeing_waitlist.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.wellbeing_waitlist.service.EmergencyLevelService;
import com.wellbeing_waitlist.service.PatientService;
import com.wellbeing_waitlist.model.Patient;
import com.wellbeing_waitlist.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class PatientController {

    @Autowired
    private EmergencyLevelService emergencyLevelService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private PatientRepository patientRepository;

    private static final String ADMIN_PASSWORD = "root";

    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    @GetMapping("/admin-login")
    public String showAdminLoginPage(Model model) {
        return "admin-login";
    }

    // Updated to receive JSON data with @RequestBody
    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        try {
            patientService.addPatient(patient);
            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    Map.of("error", "Failed to register patient: " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/details")
    public ResponseEntity<List<Patient>> showPatientDetails() {
        List<Patient> patients = patientRepository.findAll();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<Patient>> showHomePage() {
        List<Patient> patients = patientRepository.findAll();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients(@RequestParam(required = false) Boolean cured) {
        List<Patient> patients;

        if (cured != null) {
            patients = patientService.findByCured(cured);
        } else {
            patients = patientService.findAll();
        }

        if (patients.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/patients/{id}")
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

    @PostMapping("/patients")
    public ResponseEntity<?> savePatient(@RequestBody Patient patient) {
        try {
            int emergencyLevel = emergencyLevelService.calculateEmergencyLevel(patient.getProblem());
            patient.setEmergencyLevel(emergencyLevel);
            patientRepository.save(patient);
            return new ResponseEntity<>(patient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Error saving patient: " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

}