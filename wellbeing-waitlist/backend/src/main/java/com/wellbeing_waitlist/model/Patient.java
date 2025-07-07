package com.wellbeing_waitlist.model;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Table(name="patient")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "problem")
    private String problem;

    @Column(name = "emergency_level")
    private int emergencyLevel;

    @Column(name = "arrival_time")
    private Timestamp arrivalTime;

    @Column(name = "cured")
    private boolean cured;

    public Patient() { }

    public Patient(String name, int age, String gender, String problem) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.problem = problem;
        this.arrivalTime = new Timestamp(System.currentTimeMillis());
        this.cured = false;
    }

    @Override
    public String toString() {
        return "Patient [id=" + id + ", name=" + name + ", age=" + age +
                ", gender=" + gender + ", problem=" + problem +
                ", emergencyLevel=" + emergencyLevel + ", arrivalTime=" + arrivalTime +
                ", cured=" + cured + "]";
    }
}