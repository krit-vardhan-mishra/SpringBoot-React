package com.justforfun.eazystore_backend.dto;

import java.math.BigDecimal;

public record OrderItemResponseDto(String productName, Integer quantity, BigDecimal price, String imageUrl) {

}