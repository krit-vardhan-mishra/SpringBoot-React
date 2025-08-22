package com.justforfun.eazystore_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record OrderResponseDto(Long orderId, String orderStatus, BigDecimal totalPrice, String createdAt, List<OrderItemResponseDto> items) {

}
