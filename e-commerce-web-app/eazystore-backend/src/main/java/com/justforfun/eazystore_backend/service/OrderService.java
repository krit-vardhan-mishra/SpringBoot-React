package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.OrderRequestDto;

public interface OrderService {
    void createOrder(OrderRequestDto orderRequest);
}
