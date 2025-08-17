package com.justforfun.eazystore_backend.service;

import com.justforfun.eazystore_backend.dto.PaymentIntentRequestDto;
import com.justforfun.eazystore_backend.dto.PaymentIntentResponseDto;

public interface PaymentService {
    PaymentIntentResponseDto createPayment(PaymentIntentRequestDto paymentRequest);
}