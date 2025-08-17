package com.justforfun.eazystore_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequestDto(BigDecimal totalPrice, String paymentId, String paymentStatus, List<OrderItemDto> items) {
}