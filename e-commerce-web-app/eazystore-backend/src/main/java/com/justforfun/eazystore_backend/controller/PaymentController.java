package com.justforfun.eazystore_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.justforfun.eazystore_backend.dto.PaymentIntentRequestDto;
import com.justforfun.eazystore_backend.dto.PaymentIntentResponseDto;
import com.justforfun.eazystore_backend.service.impl.PaymentServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceImpl paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponseDto> createPayment(@RequestBody PaymentIntentRequestDto paymentRequest) {
        PaymentIntentResponseDto paymentResponse = paymentService.createPayment(paymentRequest);
        return ResponseEntity.ok(paymentResponse);
    }

}
