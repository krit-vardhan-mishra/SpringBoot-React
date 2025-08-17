package com.justforfun.eazystore_backend.dto;

import java.math.BigDecimal;

public record OrderItemDto(Long productId, Integer quantity, BigDecimal price) {
}