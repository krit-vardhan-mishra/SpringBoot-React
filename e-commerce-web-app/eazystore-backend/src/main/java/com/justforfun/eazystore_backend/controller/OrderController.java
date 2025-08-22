package com.justforfun.eazystore_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justforfun.eazystore_backend.dto.OrderRequestDto;
import com.justforfun.eazystore_backend.dto.OrderResponseDto;
import com.justforfun.eazystore_backend.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto requestDto) {
        orderService.createOrder(requestDto);
        return ResponseEntity.ok("Order created successfully...!");
    }

    @GetMapping("/")
    public ResponseEntity<List<OrderResponseDto>> loadCustomerOrders() {
        return ResponseEntity.ok(orderService.getCustomerOrders());
    }

}
