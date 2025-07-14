package com.justforfun.eazystore_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Entity
@Table
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Product {

    @Id
    private Long productId;
    private String title;
    private String subTitle;
    private float price;
    private int popularity;
    private String imageUrl;
    private Instant createdAt;
    private String createdBy;
    private Instant updatedAt;
    private String updatedBy;
}