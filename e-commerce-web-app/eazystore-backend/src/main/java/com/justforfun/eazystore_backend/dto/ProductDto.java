package com.justforfun.eazystore_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
public class ProductDto {

    private Long productId;
    private String title;
    private String subTitle;
    private BigDecimal price;
    private int popularity;
    private String imageUrl;
    private Instant createdAt;
}
