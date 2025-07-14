package com.justforfun.eazystore_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ProductDto {

    private Long productId;
    private String title;
    private String subTitle;
    private float price;
    private int popularity;
    private String imageUrl;
    private Instant createdAt;
}
