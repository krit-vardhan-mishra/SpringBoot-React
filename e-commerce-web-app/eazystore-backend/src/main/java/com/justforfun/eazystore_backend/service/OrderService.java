package com.justforfun.eazystore_backend.service;

import java.util.List;

import com.justforfun.eazystore_backend.dto.OrderRequestDto;
import com.justforfun.eazystore_backend.dto.OrderResponseDto;
import com.justforfun.eazystore_backend.model.Order;

public interface OrderService {

    void createOrder(OrderRequestDto orderRequest);
    List<OrderResponseDto> getCustomerOrders();
    List<OrderResponseDto> getAllPendingOrders();
    Order updateOrderStatus(Long orderId, String orderStatus);

}