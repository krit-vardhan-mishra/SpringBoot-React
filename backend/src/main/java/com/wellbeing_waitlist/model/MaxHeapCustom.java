package com.wellbeing_waitlist.model;

import java.util.*;
import java.util.concurrent.*;

import com.wellbeing_waitlist.repository.PatientRepository;
import jakarta.annotation.PreDestroy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MaxHeapCustom {

    private final PriorityBlockingQueue<Patient> maxHeap;
    private final ConcurrentHashMap<String, Patient> patientMap;
    private final PatientRepository patientRepository;

    public MaxHeapCustom(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
        this.maxHeap = new PriorityBlockingQueue<>(11, Comparator.comparingInt(Patient::getEmergencyLevel).reversed());
        this.patientMap = new ConcurrentHashMap<>();
    }

    private String generateUniqueKey(Patient patient) {
        return patient.getName() + "-" + patient.getAge() + "-" + patient.getGender() + "-" + patient.getProblem();
    }

    public synchronized void insert(Patient patient) {
        String uniqueKey = generateUniqueKey(patient);
        if (!patientMap.containsKey(uniqueKey)) {
            maxHeap.add(patient);
            patientMap.put(uniqueKey, patient);
            System.out.println("Patient added to Max Heap: " + patient.toString());
        } else {
            System.out.println("Patient with Name already exists." + patient.getName());
        }
    }

    public synchronized Patient extractMax() {
        Patient maxPatient = maxHeap.poll();
        if (maxPatient != null) {
            String uniqueKey = generateUniqueKey(maxPatient);
            patientMap.remove(uniqueKey);
            System.out.println("Extracted max patient from Max Heap: " + maxPatient.getName());

            List<Patient> updatedPatients = new ArrayList<>();
            while (!maxHeap.isEmpty()) {
                Patient patient = maxHeap.poll();
                increaseEmergencyLevel(patient);
                updatedPatients.add(patient);
            }

            for (Patient patient : updatedPatients) {
                maxHeap.add(patient);
                patientRepository.save(patient);
            }

            maxPatient.setCured(true);
            patientRepository.save(maxPatient);
            System.out.println("Marked patient as cured in database: " + maxPatient.getName());
        }
        return maxPatient;
    }

    private void increaseEmergencyLevel(Patient patient) {
        int currentLevel = patient.getEmergencyLevel();
        int age = patient.getAge();
        int increaseFactor = 5;

        if (currentLevel > 60) {
            increaseFactor += 3;
        }
        if (age > 60) {
            increaseFactor += 2;
        }

        int increasedLevel = currentLevel + increaseFactor;
        patient.setEmergencyLevel(increasedLevel);
    }

    public boolean contains(Patient patient) {
        String uniqueKey = generateUniqueKey(patient);
        return patientMap.containsKey(uniqueKey);
    }

    public List<Patient> getPatientsInHeap() {
        return new ArrayList<>(maxHeap);
    }

    // Auto-extracts every 20 seconds
    @Scheduled(fixedRate = 20000)
    public void autoExtract() {
        System.out.println("Auto-extracting patient with highest emergency level...");
        Patient maxPatient = extractMax();

        if (maxPatient != null) {
            System.out.println("Auto-extracted patient: " + maxPatient.getName());
        } else {
            System.out.println("No patients to extract.");
        }
    }

    @PreDestroy
    public void onDestroy() {
        System.out.println("Shutting down MaxHeapCustom...");
    }
}
