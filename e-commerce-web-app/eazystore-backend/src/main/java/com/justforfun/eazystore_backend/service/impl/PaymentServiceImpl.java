package com.justforfun.eazystore_backend.service.impl;

import org.springframework.stereotype.Service;

import com.justforfun.eazystore_backend.dto.PaymentIntentRequestDto;
import com.justforfun.eazystore_backend.dto.PaymentIntentResponseDto;
import com.justforfun.eazystore_backend.service.PaymentService;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Override
    public PaymentIntentResponseDto createPayment(PaymentIntentRequestDto paymentRequest) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(paymentRequest.amount())
                    .setCurrency(paymentRequest.currency())
                    .addPaymentMethodType("card").build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return new PaymentIntentResponseDto(paymentIntent.getClientSecret());
        } catch (Exception e) {
            throw new RuntimeException("Failed to create payment intent: ", e);
        }
    }

}