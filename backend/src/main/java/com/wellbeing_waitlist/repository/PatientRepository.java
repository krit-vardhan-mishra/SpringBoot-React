package com.wellbeing_waitlist.repository;

import com.wellbeing_waitlist.model.Patient;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByCured(boolean cured);
}