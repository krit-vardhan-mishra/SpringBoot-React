package com.wellbeing_waitlist.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="patient")
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public int getEmergencyLevel() {
        return emergencyLevel;
    }

    public void setEmergencyLevel(int emergencyLevel) {
        this.emergencyLevel = emergencyLevel;
    }

    public Timestamp getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Timestamp arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public boolean isCured() {
        return cured;
    }

    public void setCured(boolean cured) {
        this.cured = cured;
    }

    @Override
    public String toString() {
        return "Patient [id=" + id + ", name=" + name + ", age=" + age +
                ", gender=" + gender + ", problem=" + problem +
                ", emergencyLevel=" + emergencyLevel + ", arrivalTime=" + arrivalTime +
                ", cured=" + cured + "]";
    }
}
