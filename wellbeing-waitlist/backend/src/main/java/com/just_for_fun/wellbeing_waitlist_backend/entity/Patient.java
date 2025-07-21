package com.just_for_fun.wellbeing_waitlist_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "patient")
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

    @Column(name = "cured", nullable = false)
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

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Patient other = (Patient) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (age != other.age)
            return false;
        if (gender == null) {
            if (other.gender != null)
                return false;
        } else if (!gender.equals(other.gender))
            return false;
        if (problem == null) {
            if (other.problem != null)
                return false;
        } else if (!problem.equals(other.problem))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + age;
        result = prime * result + ((gender == null) ? 0 : gender.hashCode());
        result = prime * result + ((problem == null) ? 0 : problem.hashCode());
        return result;
    }
}