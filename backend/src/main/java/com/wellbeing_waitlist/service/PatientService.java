package com.wellbeing_waitlist.service;

import com.wellbeing_waitlist.model.Patient;
import com.wellbeing_waitlist.repository.PatientRepository;
import com.wellbeing_waitlist.service.EmergencyLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final EmergencyLevelService emergencyLevelService;

    @Autowired
    public PatientService(PatientRepository patientRepository, EmergencyLevelService emergencyLevelService) {
        this.patientRepository = patientRepository;
        this.emergencyLevelService = emergencyLevelService;
    }

    public void addPatient(Patient patient) {
        int emergencyLevel = emergencyLevelService.calculateEmergencyLevel(patient.getProblem());
        patient.setEmergencyLevel(emergencyLevel);
        patientRepository.save(patient);
    }
}

